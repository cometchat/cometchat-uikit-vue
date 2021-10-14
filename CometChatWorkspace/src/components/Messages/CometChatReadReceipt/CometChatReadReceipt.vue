<template>
  <span :style="styles.msgTimestampStyle">
    {{ messageTime }}
    <i :style="styles.iconStyle" class="message__timestamp__img"></i>
  </span>
</template>
<script>
import { DEFAULT_OBJECT_PROP, DEFAULT_STRING_PROP } from "../../../resources/constants";

import { propertyCheck, cometChatBubbles } from "../../../mixins/";

import blueDoubleTick from "./resources/message-read.svg";
import greyDoubleTick from "./resources/message-delivered.svg";
import greyTick from "./resources/message-sent.svg";
import sendingTick from "./resources/wait.svg";
import errorTick from "./resources/warning-small.svg";

import { msgTimestampStyle, iconStyle } from "./style";
import { CometChat } from '@cometchat-pro/chat';

/**
 * Shows the read receipt for a given message.
 *
 * @displayName CometChatReadReceipt
 */
export default {
  name: "CometChatReadReceipt",
  mixins: [propertyCheck, cometChatBubbles],
  props: {
    /**
     * Theme of the UI.
     */
    theme: { ...DEFAULT_OBJECT_PROP },
    /**
     * The message object/
     */
    message: { ...DEFAULT_OBJECT_PROP },
    /**
     * Message from.
     * @values sender, receiver
     */
    messageFrom: { ...DEFAULT_STRING_PROP },
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        msgTimestampStyle: msgTimestampStyle(this.theme),
        iconStyle: iconStyle(this.ticks.ticks, this.ticks.color),
      }
    },
    /**
     * computes the tick image.
     */
    ticks() {
      let ticks,
          receiptText = null,
          dateField = null,
          color = null;

      if (this.message.messageFrom === "sender") {
        if (this.message.receiverType === CometChat.RECEIVER_TYPE.GROUP) {
          if (this.message.error) {
          
            ticks = errorTick;
            receiptText = "ERROR";
            dateField = this.message._composedAt;
            color = this.theme.color.red;
          
          } else if (this.message.sentAt) {
            
            ticks = greyTick;
            receiptText = "SENT";
            dateField = this.message.sentAt;
            color = this.theme.secondaryTextColor;
          
          } else {
              
            ticks = sendingTick;
            receiptText = "SENDING";
            dateField = this.message._composedAt;
            color = this.theme.secondaryTextColor;
            
          }
        } else if (this.message.error) {
          ticks = errorTick;
          receiptText = "ERROR";
          dateField = this.message._composedAt;
          color = this.theme.color.red;
        } else if (this.message.readAt) {

          ticks = blueDoubleTick;
          receiptText = "SEEN";
          color = this.theme.color.blue;
          dateField = this.message.readAt;

        } else if (this.message.deliveredAt) {

          ticks = greyDoubleTick;
          receiptText = "DELIVERED";
          dateField = this.message.deliveredAt;
          color = this.theme.secondaryTextColor;
          
        } else if (this.message.sentAt) {
          
          ticks = greyTick;
          receiptText = "SENT";
          dateField = this.message.sentAt;
          color = this.theme.secondaryTextColor;

        } else {
          
          ticks = sendingTick;
          receiptText = "SENDING";
          dateField = this.message._composedAt;
          color = this.theme.secondaryTextColor;
        
        }
      }

      return {
        ticks: ticks,
        receiptText: receiptText,
        dateField: dateField,
        color: color
      };
    },

  },
};
</script>
<style scoped>
.message__timestamp__img {
  margin-left: 3px;
  display: inline-block;
  vertical-align: bottom;
}
</style>