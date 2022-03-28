<template>
  <CometChatBubbleTemplate v-bind="$props">
    <div :style="styles.messageKitBlockStyle" class="message_kit__blocks">
      <p
        class="message__message-blocks"
        :style="styles.messageBlockStyle"
        v-html="getMessageText()"
      ></p>
    </div>
  </CometChatBubbleTemplate>
</template>
<script>
import twemoji from "twemoji";
import CometChatBubbleTemplate from "../CometChatBubbleTemplate/CometChatBubbleTemplate";
import {   
  DEFAULT_STRING_PROP,
  DEFAULT_OBJECT_PROP,
  DEFAULT_ARRAY_PROP,
  getExtensionsData,
  hasOwnProperty,
  linkify
} from "../";
import * as style from "./style";

/**
 * Message bubble for sent text messages.
 *
 * @displayName CometChatTextBubble
 */
export default {
  name: "CometChatTextBubble",
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
    textColor: { ...DEFAULT_STRING_PROP, default: "#141414" },
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
      isHovering: false,
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
      };
    },
  },
  methods: {
    /**
     * Returns parsed message text.
     */
    getMessageText() {
      let messageText = "";
      if (this.text && this.text.length) {
        messageText = this.text;
      } else {
        if (!this.messageObject) {
          messageText = null;
        }

        if (!this.messageObject.text) {
          messageText = null;
        }

        messageText = this.messageObject.text;

        //xss extensions data
        const xssData = getExtensionsData(this.messageObject, "xss-filter");
        if (
          xssData &&
          hasOwnProperty(xssData, "sanitized_text") &&
          hasOwnProperty(xssData, "hasXSS") &&
          xssData.hasXSS === "yes"
        ) {
          messageText = xssData.sanitized_text;
        }

        //datamasking extensions data
        const maskedData = getExtensionsData(
          this.messageObject,
          "data-masking"
        );
        if (
          maskedData &&
          hasOwnProperty(maskedData, "data") &&
          hasOwnProperty(maskedData.data, "sensitive_data") &&
          hasOwnProperty(maskedData.data, "message_masked") &&
          maskedData.data.sensitive_data === "yes"
        ) {
          messageText = maskedData.data.message_masked;
        }

        //profanity extensions data
        const profaneData = getExtensionsData(
          this.messageObject,
          "profanity-filter"
        );
        if (
          profaneData &&
          hasOwnProperty(profaneData, "profanity") &&
          hasOwnProperty(profaneData, "message_clean") &&
          profaneData.profanity === "yes"
        ) {
          messageText = profaneData.message_clean;
        }
      }

      if(messageText) {
        const formattedText = linkify(messageText);
        const emojiParsedMessage = twemoji.parse(formattedText, {
          folder: "svg",
          ext: ".svg",
        });
        return emojiParsedMessage;
      }
    },
  },
};
</script>
<style>
.emoji {
  width: 24px;
  height: 24px;
  display: inline-block;
  margin: 0px 1px;
}
</style>