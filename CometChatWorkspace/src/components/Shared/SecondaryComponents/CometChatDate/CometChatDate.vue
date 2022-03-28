<template>
  <span :style="styles.timeStyle">
    {{ setDate }}
  </span>
</template>
<script>
import {
  DEFAULT_NUMBER_PROP,
  DEFAULT_STRING_PROP,
  monthNames,
  weekNames,
} from "./resources/constants";

import { timeStyle } from "./style";

/**
 * Shows the date.
 *
 * @displayName CometChatDate
 */
export default {
  name: "CometChatDate",
  props: {
    /**
     * timeStamp.
     */
    timeStamp: { ...DEFAULT_NUMBER_PROP, default: 0 },
    /**
     * timeFont.
     */
    timeFont: { ...DEFAULT_STRING_PROP, default: "500 11px Inter,sans-serif" },
    /**
     * timeColor.
     */
    timeColor: { ...DEFAULT_STRING_PROP, default: "rgba(20, 20, 20, 40%)" },
    /**
     * timeFormat.
     */
    timeFormat: { ...DEFAULT_STRING_PROP, default: "days" },
    /**
     * backgroundColor.
     */
    backgroundColor: { ...DEFAULT_STRING_PROP, default: "transparent" },
    /**
     * cornerRadius.
     */
    cornerRadius: { ...DEFAULT_STRING_PROP, default: null },
  },
  data() {
    return {
      curGmtTime: new Date(),
      gmtTime: new Date(this.timeStamp * 1000),
      lastDigit: new Date(this.timeStamp * 1000).getDate() % 10,
      stampDate: new Date(this.timeStamp * 1000).getDate(),
    };
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        timeStyle: timeStyle(this),
      };
    },
    // setDate() {
    //   let messageDate = null;
    //   switch (this.timeFormat) {
    //     case "CONVERSATION_LIST":
    //       messageDate = dateFormat(new Date(this.timeStamp), "shortTime");
    //       break;
    //     case "MESSAGE_LIST":
    //       messageDate = dateFormat(new Date(this.timeStamp), "shortTime");
    //       break;
    //     case "MESSAGE_BUBBLE":
    //       messageDate = dateFormat(new Date(this.timeStamp) * 1000, "shortTime");
    //       break;
    //     case "CALL_LIST":
    //       break;
    //     default:
    //       break;
    //   }
    //   return messageDate
    // },
    setDate() {
      let messageDate = null;
      switch (this.timeFormat) {
        case "dd:mm:yyyy": {
          messageDate = this.dateWithYear(this.lastDigit, this.gmtTime);
          break;
        }
        case "hh:mm am/pm": {
          messageDate = this.twelveHours(this.gmtTime);
          break;
        }
        case "hh:mm": {
          messageDate = this.twentyFourHours(this.gmtTime);
          break;
        }
        case "dd:mm:yyyy,hh:mm am/pm": {
          messageDate = this.dateWithTimeTwelveHours(
            this.lastDigit,
            this.gmtTime
          );
          break;
        }
        case "dd:mm:yyyy,hh:mm": {
          messageDate = this.dateWithTimeTwentyFourHours(
            this.lastDigit,
            this.gmtTime
          );
          break;
        }
        case "dd:mm": {
          messageDate = this.conversationList(this.lastDigit, this.gmtTime);
          break;
        }
        case "days": {
          messageDate = this.getDays(this.gmtTime, this.curGmtTime);
          break;
        }
        default:
          break;
      }
      return messageDate;
    },
  },
  methods: {
    //check date in same week or not
    isDateInThisWeek(date) {
      const todayObj = new Date();
      const todayDate = todayObj.getDate();
      const todayDay = todayObj.getDay();
      //get first date of week
      const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));
      //get last date of week
      const lastDayOfWeek = new Date(firstDayOfWeek);
      lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
      // if date is equal or within the first and last dates of the week
      return date >= firstDayOfWeek && date <= lastDayOfWeek;
    },

    //"DD:MM:YYYY"
    dateWithYear(lastDigit, gmtTime) {
      let dateStr = "";
      if (lastDigit === 1) {
        dateStr = this.stampDate + "st";
      } else if (lastDigit === 2) {
        dateStr = this.stampDate + "nd";
      } else if (lastDigit === 3) {
        dateStr = this.stampDate + "rd";
      } else {
        dateStr = this.stampDate + "th";
      }
      return (
        dateStr +
        " " +
        monthNames[gmtTime.getMonth()].slice(0, 3) +
        " " +
        gmtTime.getFullYear()
      );
    },

    //HH:MM AM/PM
    twelveHours(gmtTime) {
      let timeWithSec = gmtTime.toLocaleTimeString("en-US");
      let lastIndex = timeWithSec.lastIndexOf(":");
      let timeWithoutSec =
        timeWithSec.slice(0, lastIndex) + timeWithSec.slice(lastIndex + 3);
      return timeWithoutSec;
    },

    //HH:MM
    twentyFourHours(gmtTime) {
      return gmtTime.getHours() + ":" + gmtTime.getMinutes();
    },

    //weekdays or "DD:MM:YYYY"
    getDays(gmtTime, curGmtTime) {
      let day = "";
      if (this.isDateInThisWeek(gmtTime)) {
        if (gmtTime.getDate() === curGmtTime.getDate()) {
          day = "Today";
        } else if (gmtTime.getDate() + 1 === curGmtTime.getDate()) {
          day = "Yesterday";
        } else {
          day = weekNames[gmtTime.getDay()];
        }
      } else if (gmtTime.getDate() + 1 === curGmtTime.getDate()) {
        day = "Yesterday";
      } else {
        day = this.dateWithYear(this.lastDigit, gmtTime);
      }
      return day;
    },

    //Date with time "29th Nov 2021, 4:29 PM"
    dateWithTimeTwelveHours(lastDigit, gmtTime) {
      let dateStr = "";
      if (lastDigit === 1) {
        dateStr = this.stampDate + "st";
      } else if (lastDigit === 2) {
        dateStr = this.stampDate + "nd";
      } else if (lastDigit === 3) {
        dateStr = this.stampDate + "rd";
      } else {
        dateStr = this.stampDate + "th";
      }
      let fullDate =
        dateStr +
        " " +
        monthNames[gmtTime.getMonth()].slice(0, 3) +
        " " +
        gmtTime.getFullYear();
      return fullDate + ", " + this.twelveHours(gmtTime);
    },

    //date with "29th Nov 2021, 16:29"
    dateWithTimeTwentyFourHours(lastDigit, gmtTime) {
      return (
        this.dateWithYear(lastDigit, gmtTime) +
        ", " +
        this.twentyFourHours(gmtTime)
      );
    },

    //conversationlist " '29th Jan' or Today/Yesterday"
    shortTime(lastDigit, gmtTime) {
      let dateStr = "";
      if (lastDigit === 1) {
        dateStr = this.stampDate + "st";
      } else if (lastDigit === 2) {
        dateStr = this.stampDate + "nd";
      } else if (lastDigit === 3) {
        dateStr = this.stampDate + "rd";
      } else {
        dateStr = this.stampDate + "th";
      }
      return dateStr + " " + monthNames[gmtTime.getMonth()].slice(0, 3);
    },

    conversationList(lastDigit, gmtTime) {
      let day = "";
      if (
        gmtTime.getMonth() === this.curGmtTime.getMonth() &&
        gmtTime.getFullYear() === this.curGmtTime.getFullYear()
      ) {
        if (gmtTime.getDate() === this.curGmtTime.getDate()) {
          day = "Today";
        } else if (gmtTime.getDate() + 1 === this.curGmtTime.getDate()) {
          day = "Yesterday";
        } else {
          day = this.shortTime(lastDigit, gmtTime);
        }
      } else {
        day = this.shortTime(lastDigit, gmtTime);
      }
      return day;
    },
  },
};
</script>