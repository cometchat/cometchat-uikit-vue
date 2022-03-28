<template>
  <div :style="styles.message">
    <p :style="styles.messageTxt">{{ messageText }}</p>
  </div>
</template>
<script>
import { CometChat } from "@cometchat-pro/chat";

import {
  DEFAULT_OBJECT_PROP,
} from "../";

import * as style from "./style";
import { localize } from '../../Shared';

/**
 * Message bubble for action messages.
 *
 * @displayName CometChatActionMessageBubble
 */
export default {
  name: "CometChatActionMessageBubble",
  props: {
    /**
     * The message object.
     */
    message: { ...DEFAULT_OBJECT_PROP },
    /**
     * Current logged in user.
     */
    loggedInUser: { ...DEFAULT_OBJECT_PROP },
  },
  computed: {
    /**
     * Computed styles for the bubble.
     */
    styles() {
      return {
        message: style.callMessageStyle(),
        messageTxt: style.callMessageTxtStyle(),
      };
    },
    /**
     * The computed message text to display.
     */
    messageText() {
      const call = this.message;
      const loggedInUser = this.loggedInUser;

      let message = null;
      switch (call.status) {
        case CometChat.CALL_STATUS.INITIATED: {
          message = localize('CALL_INITIATED');
          if (call.type === CometChat.CALL_TYPE.AUDIO) {
            if (call.receiverType === CometChat.RECEIVER_TYPE.USER) {
              message =
                call.callInitiator.uid === loggedInUser.uid
                  ? localize('OUTGOING_AUDIO_CALL')
                  : localize('INCOMING_AUDIO_CALL');
            } else if (call.receiverType === CometChat.RECEIVER_TYPE.GROUP) {
              if (call.action === CometChat.CALL_STATUS.INITIATED) {
                message =
                  call.callInitiator.uid === loggedInUser.uid
                    ? localize('OUTGOING_AUDIO_CALL')
                    : localize('INCOMING_AUDIO_CALL');
              } else if (call.action === CometChat.CALL_STATUS.REJECTED) {
                message =
                  call.sender.uid === loggedInUser.uid
                    ? localize('CALL_REJECTED')
                    : `${call.sender.name} ${localize('REJECTED_CALL')}`;
              }
            }
          } else if (call.type === CometChat.CALL_TYPE.VIDEO) {
            if (call.receiverType === CometChat.RECEIVER_TYPE.USER) {
              message =
                call.callInitiator.uid === loggedInUser.uid
                  ? localize('OUTGOING_VIDEO_CALL')
                  : localize('INCOMING_VIDEO_CALL');
            } else if (call.receiverType === CometChat.RECEIVER_TYPE.GROUP) {
              if (call.action === CometChat.CALL_STATUS.INITIATED) {
                message =
                  call.callInitiator.uid === loggedInUser.uid
                    ? localize('OUTGOING_VIDEO_CALL')
                    : localize('INCOMING_VIDEO_CALL');
              } else if (call.action === CometChat.CALL_STATUS.REJECTED) {
                message =
                  call.sender.uid === loggedInUser.uid
                    ? localize('CALL_REJECTED')
                    : `${call.sender.name} ${localize('REJECTED_CALL')}`;
              }
            }
          }
          break;
        }
        case CometChat.CALL_STATUS.ONGOING: {
          if (call.receiverType === CometChat.RECEIVER_TYPE.USER) {
            message = localize('CALL_ACCEPTED');
          } else if (call.receiverType === CometChat.RECEIVER_TYPE.GROUP) {
            if (call.action === CometChat.CALL_STATUS.ONGOING) {
              message =
                call.sender.uid === loggedInUser.uid
                  ? localize('CALL_ACCEPTED')
                  : `${call.sender.name} ${localize('JOINED')}`;
            } else if (call.action === CometChat.CALL_STATUS.REJECTED) {
              message =
                call.sender.uid === loggedInUser.uid
                  ? localize('CALL_REJECTED')
                  : `${call.sender.name} ${localize('REJECTED_CALL')}`;
            } else if (call.action === "left") {
              message =
                call.sender.uid === loggedInUser.uid
                  ? `${localize('YOU')} ${localize('LEFT_THE_CALL')}`
                  : `${call.sender.name} ${localize('LEFT_THE_CALL')}`;
            }
          }

          break;
        }
        case CometChat.CALL_STATUS.UNANSWERED: {
          message = localize('CALL_UNANSWERED');
          if (
            call.type === CometChat.CALL_TYPE.AUDIO &&
            (call.receiverType === CometChat.RECEIVER_TYPE.USER ||
              call.receiverType === CometChat.RECEIVER_TYPE.GROUP)
          ) {
            message =
              call.callInitiator.uid === loggedInUser.uid
                ? localize('UNANSWERED_AUDIO_CALL')
                : localize('MISSED_AUDIO_CALL');
          } else if (
            call.type === CometChat.CALL_TYPE.VIDEO &&
            (call.receiverType === CometChat.RECEIVER_TYPE.USER ||
              call.receiverType === CometChat.RECEIVER_TYPE.GROUP)
          ) {
            message =
              call.callInitiator.uid === loggedInUser.uid
                ? localize('UNANSWERED_VIDEO_CALL')
                : localize('MISSED_VIDEO_CALL');
          }
          break;
        }
        case CometChat.CALL_STATUS.REJECTED:
          message = localize('CALL_REJECTED');
          break;
        case CometChat.CALL_STATUS.CANCELLED:
          message = localize('CALL_CANCELLED');
          break;
        case CometChat.CALL_STATUS.ENDED:
          message = localize('CALL_ENDED');
          break;
        case CometChat.CALL_STATUS.BUSY:
          message = localize('CALL_BUSY');
          break;
        default:
          break;
      }
      return message;
    },
  },
};
</script>