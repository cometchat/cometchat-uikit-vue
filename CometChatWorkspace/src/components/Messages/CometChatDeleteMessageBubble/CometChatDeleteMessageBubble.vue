<template>
  <div :style="styles.messageContainer">
    <div :style="styles.messageWrapper">
      <template v-if="messageObject?.sender?.uid === loggedInUser?.uid">
        <div :style="styles.messageTextWrapper">
          <p :style="styles.messageText">
            {{ localize("YOU_DELETED_THIS_MESSAGE") }}
          </p>
        </div>
        <div :style="styles.messageInfoWrapper">
          <span :style="styles.messageTimeStamp">
            <CometChatDate :timeStamp="messageObject?.sentAt * 1000" :timeFormat="'hh:mm am/pm'" />
          </span>
        </div>
      </template>
      <template v-else>
        <div :style="styles.messageThumbnail" v-if="messageObject.receiverType === CometChatMessageReceiverType.group">
          <CometChatAvatar
            border-width="1px"
            corner-radius="50%"
            :image="message.sender.avatar"
          />
        </div>
        <div :style="styles.messageDetail">
          <div :style="styles.nameWrapper" v-if="messageObject.receiverType === CometChatMessageReceiverType.group">
            <span :style="styles.name">{{ message.sender.name }}</span>
          </div>
          <div :style="styles.messageTextWrapper">
            <p :style="styles.messageText">
              {{ localize("THIS_MESSAGE_DELETED") }}
            </p>
          </div>
          <div :style="styles.messageInfoWrapper">
            <span :style="styles.messageTimeStamp">
              <CometChatDate :timeStamp="messageObject?.sentAt * 1000" :timeFormat="'hh:mm am/pm'" />
            </span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import {
  DEFAULT_OBJECT_PROP,
  CometChatMessageReceiverType,
} from "../";
import { CometChatAvatar, CometChatDate, localize } from "../../Shared";

import * as style from "./style";

/**
 * Message bubble for deleted messages.
 *
 * @displayName CometChatDeleteMessageBubble
 */
export default {
  name: "CometChatDeleteMessageBubble",
  components: {
    CometChatAvatar,
    CometChatDate,
  },
  props: {
    /**
     *
     */
    messageObject: { ...DEFAULT_OBJECT_PROP },
    loggedInUser: { ...DEFAULT_OBJECT_PROP },
  },
  computed: {
    /**
     * Computed styles for the bubble.
     */
    styles() {
      return {
        messageTextWrapper: style.messageTextWrapperStyle(this),
        name: style.nameStyle(),
        messageText: style.messageTextStyle(),
        messageThumbnail: style.messageThumbnailStyle(),
        messageTimeStamp: style.messageTimeStampStyle(),
        messageWrapper: style.messageWrapperStyle(this),
        messageContainer: style.messageContainerStyle(this),
        nameWrapper: style.nameWrapperStyle(this),
        messageInfoWrapper: style.messageInfoWrapperStyle(this),
        messageDetail: style.messageDetailStyle(this),
      };
    },
    CometChatMessageReceiverType() {
      return CometChatMessageReceiverType;
    },
    localize() {
      return localize;
    }
  },
};
</script>