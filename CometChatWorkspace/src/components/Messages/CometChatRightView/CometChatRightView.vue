<template>
  <!--V-if block starts-->
  <div
    v-if="messageAlignment === STRINGS_messageAlignment.leftAligned"
    :style="styles.messageRightGutterStyle"
    class="message_kit__gutter__right"
  >
    <!--Username style if else block start-->
    <div
      v-if="messageTimeAlignment === STRINGS_messageTimeAlignment.top"
      :style="styles.messageTimestampStyle"
      class="message_kit__username_bar"
    >
      <span
        v-if="getName"
        :style="styles.messageSenderStyle"
        class="message_kit__sender"
      >
        {{ getName }}
      </span>
      <CometChatDate
        :timeStamp="messageObject?._composedAt || messageObject?.sentAt"
        :timeFormat="'hh:mm am/pm'"
      />
    </div>

    <div
      v-else
      :style="styles.messageTimestampStyle"
      class="message_kit__username_bar"
    >
      <span
        v-if="getName"
        :style="styles.messageSenderStyle"
        class="message_kit__sender"
      >
        {{ getName }}
      </span>
    </div>

    <!--Username style if else block ends-->

    <slot><!--Message goes here--></slot>

    <CometChatMessageReactions
      :messageObject="messageObject"
      :loggedInUser="loggedInUser"
    />

    <div
      :style="styles.messageReplyReceiptStyle"
      class="message_kit__reply__receipt_bar"
    >
      <!--Message Replis ::TBD-->

      <!--Message receipt style if else block starts-->
      <div
        v-if="
          messageTimeAlignment === STRINGS_messageTimeAlignment.top &&
          loggedInUser?.uid === messageObject?.sender?.uid
        "
        :style="styles.messageKitReceiptStyle"
        class="message_kit__receipt_bar"
      >
        <CometChatMessageReceipt
          :messageObject="messageObject"
          :loggedInUser="loggedInUser"
        />
      </div>
      <div
        v-else-if="messageTimeAlignment !== STRINGS_messageTimeAlignment.top"
        :style="styles.messageKitReceiptStyle"
        class="message_kit__receipt_bar"
      >
        <CometChatMessageReceipt
          v-if="loggedInUser?.uid === messageObject?.sender?.uid"
          :messageObject="messageObject"
          :loggedInUser="loggedInUser"
        />
        <CometChatDate
          :timeStamp="messageObject?._composedAt || messageObject?.sentAt"
          :timeFormat="'hh:mm am/pm'"
        />
      </div>
      <!--Message receipt style if else block ends-->
    </div>
  </div>
  <!--V-if block ends-->

  <!--v-else block starts-->
  <div
    v-else-if="
      messageAlignment !== STRINGS_messageAlignment.leftAligned &&
      loggedInUser?.uid !== messageObject?.sender?.uid
    "
    :style="styles.messageRightGutterStyle"
    class="message_kit__gutter__right"
  >
    <!--Username style if else block start-->
    <div
      v-if="messageTimeAlignment === STRINGS_messageTimeAlignment.top"
      :style="styles.messageTimestampStyle"
      class="message_kit__username_bar"
    >
      <span
        v-if="
          getName &&
          messageObject?.receiverType ===
            STRINGS_CometChatMessageReceiverType.group
        "
        :style="styles.messageSenderStyle"
        class="message_kit__sender"
      >
        {{ getName }}
      </span>
      <CometChatDate
        :timeStamp="messageObject?._composedAt || messageObject?.sentAt"
        :timeFormat="'hh:mm am/pm'"
      />
    </div>

    <div
      v-else-if="
        messageTimeAlignment !== STRINGS_messageTimeAlignment.top
      "
      :style="styles.messageTimestampStyle"
      class="message_kit__username_bar"
    >
      <span
        v-if="
          getName &&
          messageObject?.receiverType ===
            STRINGS_CometChatMessageReceiverType.group
        "
        :style="styles.messageSenderStyle"
        class="message_kit__sender"
      >
        {{ getName }}
      </span>
    </div>
    <!--Username style if else block ends-->

    <slot><!--Message goes here--></slot>

    <CometChatMessageReactions
      :messageObject="messageObject"
      :loggedInUser="loggedInUser"
    />

    <div
      :style="styles.messageReplyReceiptStyle"
      class="message_kit__reply__receipt_bar"
    >
      <!--Message Replis ::TBD-->

      <!--Message receipt style if else block starts-->
      <div
        v-if="messageTimeAlignment !== STRINGS_messageTimeAlignment.top"
        :style="styles.messageKitReceiptStyle"
        class="message_kit__receipt_bar"
      >
        <CometChatDate
          :timeStamp="messageObject?._composedAt || messageObject?.sentAt"
          :timeFormat="'hh:mm am/pm'"
        />
      </div>
      <!--Message receipt style if else block ends-->
    </div>
  </div>
  <!--V-else block ends-->
</template>

<!--eslint-disable-->
<script>
import {
  DEFAULT_OBJECT_PROP,
  DEFAULT_STRING_PROP,
  DEFAULT_ARRAY_PROP,
} from "../";

import { CometChatMessageReceipt, CometChatDate } from "../../Shared";
import CometChatMessageReactions from "../Extensions/CometChatMessageReactions/CometChatMessageReactions";
import CometChatThreadedMessageReplyCount from "../CometChatThreadedMessageReplyCount/CometChatThreadedMessageReplyCount";

import * as style from "./style";

import {
  CometChatMessageReceiverType,
  messageAlignment,
  messageTimeAlignment,
} from "../CometChatMessageConstants";

/**
 * Message bubble for sent image messages.
 *
 * @displayName CometChatRightView
 */
export default {
  name: "CometChatRightView",
  components: {
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
    usernameFont: {
      ...DEFAULT_STRING_PROP,
      default: "600 13px Inter,sans-serif",
    },
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
        messageRightGutterStyle: style.messageRightGutterStyle(),
        messageSenderStyle: style.messageSenderStyle(this),
        messageReplyReceiptStyle: style.messageReplyReceiptStyle(this),
      };
    },
    getName() {
      let _name = null;
      if (this.userName && this.userName.length) {
        _name = this.userName;
      } else if (
        this.messageObject &&
        this?.messageObject?.sender &&
        this?.messageObject?.sender?.name
      ) {
        _name = this?.messageObject?.sender?.name;
      }

      return _name;
    },
    STRINGS_CometChatMessageReceiverType() {
      return CometChatMessageReceiverType;
    },
    STRINGS_messageAlignment() {
      return messageAlignment;
    },
    STRINGS_messageTimeAlignment() {
      return messageTimeAlignment;
    },
  },
};
</script>