<template>
  <li
    v-if="loggedInUser?.uid !== messageObject?.sender?.uid"
    :style="styles.pollAnswerStyle"
    @click="answerPoll(pollOption[0])"
  >
    <div :style="styles.pollPercentStyle"></div>
    <div :style="styles.answerWrapperStyle">
      <i
        v-if="pollOption[1].voters && pollOption[1].voters[loggedInUser?.uid]"
        :style="styles.checkIconStyle"
      ></i>
      <span>{{ width }}</span>
      <p>{{ pollOption[1].text }}</p>
    </div>
  </li>
  <li
    v-else
    :style="styles.pollAnswerStyle"
  >
    <div :style="styles.pollPercentStyle"></div>
    <div :style="styles.answerWrapperStyle">
      <i
        v-if="pollOption[1].voters && pollOption[1].voters[loggedInUser?.uid]"
        :style="styles.checkIconStyle"
      ></i>
      <span>{{ width }}</span>
      <p>{{ pollOption[1].text }}</p>
    </div>
  </li>
</template>

<script>
import { CometChat } from "@cometchat-pro/chat";
import { DEFAULT_OBJECT_PROP } from "../..";
import {
  DEFAULT_NUMBER_PROP,
  DEFAULT_STRING_PROP,
} from "../../../../resources/constants";
import checkImg from "./resources/checkmark.svg";
import * as style from "./style";

/**
 * Option view used to create polls.
 *
 * @displayName CometChatPollOptionsBubble
 */
export default {
  name: "CometChatPollOptionsBubble",
  props: {
    /**
     * Option value.
     */
    pollOption: { ...DEFAULT_OBJECT_PROP, default: {} },
    /**
     * voteCount.
     */
    voteCount: { ...DEFAULT_NUMBER_PROP, default: 0 },
    /**
     * pollOptionsFont.
     */
    pollOptionsFont: { ...DEFAULT_STRING_PROP, default: "" },
    /**
     * pollOptionsColor.
     */
    pollOptionsColor: { ...DEFAULT_STRING_PROP, default: "rgb(230, 230, 230)" },
    /**
     * pollOptionsBackgroundColor.
     */
    pollOptionsBackgroundColor: { ...DEFAULT_STRING_PROP, default: "#fff" },
    /**
     * loggedInUser.
     */
    loggedInUser: { ...DEFAULT_OBJECT_PROP, default: {} },
    /**
     * messageObject
     */
    messageObject: { ...DEFAULT_OBJECT_PROP, default: {} },
  },
  data() {
    return {
      width: "0%",
    };
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        pollAnswerStyle: style.pollAnswerStyle(this),
        checkIconStyle: style.checkIconStyle(checkImg),
        pollPercentStyle: style.pollPercentStyle(this.width),
        answerWrapperStyle: style.answerWrapperStyle(this),
      };
    },
  },
  methods: {
    calculateWidth() {
      if (this.voteCount) {
        const fraction = this.pollOption[1]?.count / this.voteCount;
        this.width = fraction.toLocaleString("en", { style: "percent" });
      }
    },
    /**
     * Answers the poll
     */
    async answerPoll(selectedOption) {
      try {
        const message = await CometChat.callExtension(
          "polls",
          "POST",
          "v2/vote",
          {
            vote: selectedOption,
            id: this.pollOption[0],
          }
        );

        this.emitAction("pollAnswered", { message });
      } catch (error) {
        this.logError("answerPoll error", error);
      }
    },
  },
  mounted() {
    this.calculateWidth();
  },
};
</script>