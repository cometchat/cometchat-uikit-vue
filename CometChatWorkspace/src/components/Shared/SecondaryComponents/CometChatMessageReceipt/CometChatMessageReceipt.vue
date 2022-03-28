<template>
  <i :style="styles.iconStyle" class="message__receipt"></i>
</template>
<script>
import {
  DEFAULT_OBJECT_PROP,
  DEFAULT_STRING_PROP,
} from "./resources/constants";


import blueDoubleTick from "./resources/message-read.svg";
import greyDoubleTick from "./resources/message-delivered.svg";
import greyTick from "./resources/message-sent.svg";
import waiting from "./resources/wait.svg";
import errorTick from "./resources/warning-small.svg";

import { iconStyle } from "./style";
import { CometChat } from "@cometchat-pro/chat";

/**
 * Shows the read receipt for a given messageObject.
 *
 * @displayName CometChatMessageReceipt
 */
export default {
  name: "CometChatMessageReceipt",
  props: {
    messageObject: { ...DEFAULT_OBJECT_PROP, default: null },
    messageWaitIcon: { ...DEFAULT_STRING_PROP, default: "" },
    messageSentIcon: { ...DEFAULT_STRING_PROP, default: "" },
    messageDeliveredIcon: { ...DEFAULT_STRING_PROP, default: "" },
    messageReadIcon: { ...DEFAULT_STRING_PROP, default: "" },
    messageErrorIcon: { ...DEFAULT_STRING_PROP, default: "" },
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        iconStyle: iconStyle(this.ticks.ticks),
      };
    },
    /**
     * computes the tick image.
     */
    ticks() {
      let ticks = null;
      let receiptText = null;

      /**
       * Show custom icon from
       */
      if (this.messageErrorIcon) {
        ticks = this.messageErrorIcon;
        receiptText = "ERROR";
      } else if (this.messageReadIcon) {
        ticks = this.messageReadIcon;
        receiptText = "SEEN";
      } else if (this.messageDeliveredIcon) {
        ticks = this.messageDeliveredIcon;
        receiptText = "DELIVERED";
      } else if (this.messageSentIcon) {
        ticks = this.messageSentIcon;
        receiptText = "SENT";
      } else if (this.messageWaitIcon) {
        ticks = this.messageWaitIcon;
        receiptText = "SENDING";
      } else if (this.messageObject) {
        /**
         * Show default receipt icons
         */
        if (this.messageObject.receiverType === CometChat.RECEIVER_TYPE.GROUP) {
          if (this.messageObject.error) {
            ticks = errorTick;
            receiptText = "ERROR";
          } else if (this.messageObject.sentAt) {
            ticks = greyTick;
            receiptText = "SENT";
          } else {
            ticks = waiting;
            receiptText = "SENDING";
          }
        } else if (this.messageObject.error) {
          ticks = errorTick;
          receiptText = "ERROR";
        } else if (this.messageObject.readAt) {
          ticks = blueDoubleTick;
          receiptText = "SEEN";
        } else if (this.messageObject.deliveredAt) {
          ticks = greyDoubleTick;
          receiptText = "DELIVERED";
        } else if (this.messageObject.sentAt) {
          ticks = greyTick;
          receiptText = "SENT";
        } else {
          ticks = waiting;
          receiptText = "SENDING";
        }
      }
        
      return {
        ticks: ticks,
        receiptText: receiptText,
      };
    },
  },
};
</script>