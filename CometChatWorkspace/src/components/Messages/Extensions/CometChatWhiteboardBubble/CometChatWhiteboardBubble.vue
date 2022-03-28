<template>
  <CometChatBubbleTemplate v-bind="$props">
    <div :style="styles.messageKitBlockStyle" class="message_kit__blocks">
      <div :style="styles.messageBlockStyle" class="message__message-blocks">
        <i :style="styles.messageIconStyle" class="message__message-icon"></i>
        <p :style="styles.messageTxtStyle" class="message__message-title">
          {{ title }}
        </p>
      </div>
      <ul :style="styles.messageBtnStyle" class="message__message-button">
        <li
          :style="styles.messageBtnItemStyle"
          @click="launchCollaborativeWhiteboard"
        >
          <p :style="styles.messageBtnItemTextStyle">{{ buttonText }}</p>
        </li>
      </ul>
    </div>
  </CometChatBubbleTemplate>
</template>

<!--eslint-disable-->
<script>
import {
  DEFAULT_OBJECT_PROP,
  DEFAULT_STRING_PROP,
  DEFAULT_ARRAY_PROP,
  metadataKey,
  getExtensionsData,
} from "../..";
import whiteboardIcon from "./resources/collaborative-whiteboard.svg";
import { CometChatBubbleTemplate } from "../..";
import * as style from "./style";

/**
 * Message bubble for sent image messages.
 *
 * @displayName CometChatWhiteboardBubble
 */
export default {
  name: "CometChatWhiteboardBubble",
  components: {
    CometChatBubbleTemplate,
  },
  props: {
    /**
     * Current logged in user.
     */
    loggedInUser: { ...DEFAULT_OBJECT_PROP, default: null },
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
    backgroundColor: { ...DEFAULT_STRING_PROP, default: "rgb(246, 246, 246)" },
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
    messageAlignment: { ...DEFAULT_STRING_PROP, default: "leftAligned" },
    /**
     * messageTimeAlignment.
     */
    messageTimeAlignment: { ...DEFAULT_STRING_PROP, default: "bottom" },
    /**
     * whiteboardURL.
     */
    whiteboardURL: { ...DEFAULT_STRING_PROP, default: "" },
    /**
     * title.
     */
    title: { ...DEFAULT_STRING_PROP, default: "" },
    /**
     * titleFont.
     */
    titleFont: { ...DEFAULT_STRING_PROP, default: "400 15px Inter,sans-serif" },
    /**
     * titleColor.
     */
    titleColor: { ...DEFAULT_STRING_PROP, default: "#141414" },
    /**
     * buttonText.
     */
    buttonText: { ...DEFAULT_STRING_PROP, default: "Launch" },
    /**
     * buttonTextFont.
     */
    buttonTextFont: {
      ...DEFAULT_STRING_PROP,
      default: "400 15px Inter,sans-serif",
    },
    /**
     * buttonTextColor.
     */
    buttonTextColor: { ...DEFAULT_STRING_PROP, default: "#39f" },
    /**
     * buttonBackgroundColor.
     */
    buttonBackgroundColor: { ...DEFAULT_STRING_PROP, default: "#fff" },
    /**
     * iconURL.
     */
    iconURL: { ...DEFAULT_STRING_PROP, default: whiteboardIcon },
    /**
     * iconTint.
     */
    iconTint: { ...DEFAULT_STRING_PROP, default: "#fff" },
    /**
     * The message object.
     */
    messageObject: { ...DEFAULT_OBJECT_PROP, default: null },
    /**
     * The message messageOptions.
     */
    messageOptions: { ...DEFAULT_ARRAY_PROP, default: [] },
  },
  data() {
    return {
      whiteboardUrl: "",
    };
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        messageKitBlockStyle: style.messageKitBlockStyle(this),
        messageBlockStyle: style.messageBlockStyle(this),
        messageIconStyle: style.messageIconStyle(this),
        messageTxtStyle: style.messageTxtStyle(this),
        messageBtnStyle: style.messageBtnStyle(this),
        messageBtnItemStyle: style.messageBtnItemStyle(this),
        messageBtnItemTextStyle: style.messageBtnItemTextStyle(this),
      };
    },
  },
  methods: {
    /**
     * Parses the whiteboard data from message.
     */
    whiteboardData() {
      if (this.whiteboardURL && this.whiteboardURL.length) {
        this.whiteboardUrl = this.whiteboardURL;
      } else if (this.messageObject) {
        const whiteboardData = getExtensionsData(
          this.messageObject,
          metadataKey.extensions.whiteboard
        );
        if (
          whiteboardData &&
          whiteboardData.board_url &&
          whiteboardData.board_url.trim().length
        ) {
          // Appending the username to the board_url
          const username = this.loggedInUser?.name.split(" ").join("_");
          this.whiteboardUrl = whiteboardData.board_url + "&username=" + username;
        }
      }
    },
    launchCollaborativeWhiteboard() {
      window.open(this.whiteboardUrl, "", "fullscreen=yes, scrollbars=auto");
    },
  },
  mounted() {
    this.whiteboardData();
    window.addEventListener("resize", this.whiteboardData);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.whiteboardData);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.whiteboardData);
  },
};
</script>