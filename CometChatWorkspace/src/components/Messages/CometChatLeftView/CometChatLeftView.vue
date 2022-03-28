<template>

  <!--If messageAlignment is left-->
  <div
    v-if="messageAlignment === STRINGS_messageAlignment.leftAligned"
    :style="styles.messageLeftGutterStyle"
    class="message_kit__gutter__left"
  >
    <div :style="styles.messageAvatarStyle" class="message_kit__avatar">
      <CometChatAvatar v-if="getAvatar" :image="getAvatar" />
    </div>
  </div>

  <!--Else if the message sender is not same as logged in user i.e. message receiver -->
  <div
    v-else-if="
      messageAlignment !== STRINGS_messageAlignment.leftAligned &&
      loggedInUser?.uid !== messageObject?.sender?.uid &&
      messageObject?.receiverType === STRINGS_CometChatMessageReceiverType.group
    "
    :style="styles.messageLeftGutterStyle"
    class="message_kit__gutter__left"
  >
    <div :style="styles.messageAvatarStyle" class="message_kit__avatar">
      <CometChatAvatar v-if="getAvatar" :image="getAvatar" />
    </div>
  </div>

  <!--Else-->
  <div
    v-else-if="
      messageAlignment !== STRINGS_messageAlignment.leftAligned &&
      loggedInUser?.uid === messageObject?.sender?.uid
    "
    :style="styles.messageLeftGutterStyle"
    class="message_kit__gutter__left"
  >
    <div
      v-if="messageTimeAlignment === STRINGS_messageTimeAlignment.top"
      :style="styles.messageTimestampStyle" 
      class="message_kit__username_bar"
    >
      <CometChatDate :timeStamp="messageObject?._composedAt || messageObject?.sentAt" :timeFormat="'hh:mm am/pm'" />
    </div>
    <slot><!--Message goes here--></slot>
    
    <CometChatMessageReactions :messageObject="messageObject" :loggedInUser="loggedInUser" />

    <div
      :style="styles.messageReplyReceiptStyle"
      class="message_kit__reply__receipt_bar"
    >
      <!--Message Replis ::TBD--> 
      
      <!--Message receipt style if else block starts-->
      <div
        v-if="messageTimeAlignment === STRINGS_messageTimeAlignment.top"
        :style="styles.messageKitReceiptStyle" 
        class="message_kit__receipt_bar"
      >
        <CometChatMessageReceipt :messageObject="messageObject" :loggedInUser="loggedInUser" />
      </div>
      <div
        v-else
        :style="styles.messageKitReceiptStyle" 
        class="message_kit__receipt_bar"
      >
        <CometChatDate :timeStamp="messageObject?._composedAt || messageObject?.sentAt" :timeFormat="'hh:mm am/pm'" />
        <CometChatMessageReceipt :messageObject="messageObject" :loggedInUser="loggedInUser" />
      </div>
      <!--Message receipt style if else block ends-->
      
    </div>
  </div>
</template>

<!--eslint-disable-->
<script>
import {
  DEFAULT_OBJECT_PROP,
  DEFAULT_STRING_PROP,
  DEFAULT_ARRAY_PROP,
} from "../";

import {
  CometChatAvatar,
  CometChatMessageReceipt,
  CometChatDate,
} from "../../Shared";
import CometChatMessageReactions from "../Extensions/CometChatMessageReactions/CometChatMessageReactions";
import CometChatThreadedMessageReplyCount from "../CometChatThreadedMessageReplyCount/CometChatThreadedMessageReplyCount";

import * as style from "./style";

import { CometChatMessageReceiverType, messageAlignment, messageTimeAlignment } from '../CometChatMessageConstants';

/**
 * Message bubble for sent image messages.
 *
 * @displayName CometChatLeftView
 */
export default {
  name: "CometChatLeftView",
  components: {
    CometChatAvatar,
    CometChatDate,
    CometChatMessageReceipt,
    CometChatMessageReactions,
    CometChatThreadedMessageReplyCount,
  },
  props: {
    /**
     * Current logged in user.
     */
    loggedInUser: { ...DEFAULT_OBJECT_PROP },
    /**
     * width.
     */
    width: { ...DEFAULT_STRING_PROP, default: "100%" },
    /**
     * height.
     */
    height: { ...DEFAULT_STRING_PROP, default: "auto" },
    /**
     * cornerradius.
     */
    cornerRadius: { ...DEFAULT_STRING_PROP, default: "12px" },
    /**
     * backgroundColor.
     */
    backgroundColor: { ...DEFAULT_STRING_PROP, default: "" },
    /**
     * borderWidth.
     */
    border: { ...DEFAULT_STRING_PROP, default: "0 none" },
    /**
     * avatar.
     */
    avatar: { ...DEFAULT_STRING_PROP, default: null },
    /**
     * username.
     */
    userName: { ...DEFAULT_STRING_PROP, default: null },
    /**
     * usernameFont.
     */
    usernameFont: { ...DEFAULT_STRING_PROP, default: "600 13px Inter,sans-serif" },
    /**
     * usernameColor.
     */
    usernameColor: { ...DEFAULT_STRING_PROP, default: "#39f" },
    /**
     * messageAlignment.
     */
    messageAlignment: { ...DEFAULT_STRING_PROP, default: "standard" },
    /**
     * messageTimeAlignment.
     */
    messageTimeAlignment: { ...DEFAULT_STRING_PROP, default: "top" },
    /**
     * text.
     */
    text: { ...DEFAULT_STRING_PROP, default: "" },
    /**
     * textFont.
     */
    textFont: { ...DEFAULT_STRING_PROP, default: "400 15px Inter,sans-serif" },
    /**
     * textColor.
     */
    textColor: { ...DEFAULT_STRING_PROP, default: "#fff" },
    /**
     * The message object.
     */
    messageObject: { ...DEFAULT_OBJECT_PROP, default: null },
    /**
     * The message messageOptions.
     */
    messageOptions: { ...DEFAULT_ARRAY_PROP, default: [] },
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        messageTimestampStyle: style.messageTimestampStyle(this),
        messageKitReceiptStyle: style.messageKitReceiptStyle(this),
        messageLeftGutterStyle: style.messageLeftGutterStyle(this),
        messageAvatarStyle: style.messageAvatarStyle(),
        messageReplyReceiptStyle: style.messageReplyReceiptStyle(this),
      };
    },
    getAvatar() {
      let _avatar = null;
      if (this.avatar && this.avatar.length) {
        _avatar = this.avatar;
      } else if (this.messageObject && this.messageObject?.sender) {
        _avatar = this.messageObject?.sender?.avatar;
      }

      return _avatar;
    },
    STRINGS_CometChatMessageReceiverType() {
      return CometChatMessageReceiverType;
    },
    STRINGS_messageAlignment() {
      return messageAlignment
    },
    STRINGS_messageTimeAlignment() {
      return messageTimeAlignment
    }
  },
};
</script>