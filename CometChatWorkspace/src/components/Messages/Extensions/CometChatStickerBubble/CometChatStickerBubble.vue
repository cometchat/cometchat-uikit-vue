<template>
  <CometChatBubbleTemplate v-bind="$props">
    <div
      :style="styles.messageKitBlockStyle"
      class="message_kit__blocks"
    >
      <img
        class="message__message-blocks"
        :style="styles.messageBlockStyle"
        v-if="stickerUrl"
        :src="stickerUrl"
        :alt="stickerUrl"
        @load="positionTooltip"
      />
    </div>
  </CometChatBubbleTemplate>
</template>

<!--eslint-disable-->
<script>
import {
  DEFAULT_OBJECT_PROP,
  DEFAULT_STRING_PROP,
  DEFAULT_ARRAY_PROP,
} from "../../";
import { CometChatBubbleTemplate } from "../../";
import * as style from "./style";

/**
 * Message bubble for sent image messages.
 *
 * @displayName CometChatStickerBubble
 */
export default {
  name: "CometChatStickerBubble",
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
     * border.
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
     * stickerURL.
     */
    stickerURL: { ...DEFAULT_STRING_PROP, default: "" },
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
      stickerUrl: "",
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
     * Parses the sticker data from message.
     */
    stickerData() {
      if (this.stickerURL && this.stickerURL.length) {
        this.stickerUrl = this.stickerURL;
      } else if (this.messageObject) {
        if (
          this.messageObject.data &&
          this.messageObject.data.customData &&
          this.messageObject.data.customData.sticker_url
        ) {
          this.stickerUrl = this.messageObject.data.customData.sticker_url;
        }
      }
    },
  },
  mounted() {
    this.stickerData();
    window.addEventListener("resize", this.stickerData);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.stickerData);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.stickerData);
  },
};
</script>