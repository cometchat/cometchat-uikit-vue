<template>
  <CometChatBubbleTemplate v-bind="$props">
    <div :style="styles.messageKitBlockStyle" class="message_kit__blocks">
      <div :style="styles.messageBlockStyle" class="message__message-blocks">
        <audio
          controls
          :style="styles.messageBlockAudioStyle"
          class="message__message-audio"
          :src="audioUrl"
        ></audio>
      </div>
    </div>
  </CometChatBubbleTemplate>
</template>

<!--eslint-disable-->
<script>
import CometChatBubbleTemplate from "../CometChatBubbleTemplate/CometChatBubbleTemplate";
import { 
  DEFAULT_OBJECT_PROP,
  DEFAULT_STRING_PROP,
  DEFAULT_ARRAY_PROP,
  getMetadataByKey, 
  hasOwnProperty, 
  metadataKey 
} from "../";
import * as style from "./style";
import audioIcon from "./resources/audio-file.svg";

/**
 * Message bubble for sent Audio messages.
 *
 * @displayName CometChatAudioBubble
 */
export default {
  name: "CometChatAudioBubble",
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
    height: { ...DEFAULT_STRING_PROP, default: "100%" },
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
      default: "600 12px Inter,sans-serif",
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
     * audioURL.
     */
    audioURL: { ...DEFAULT_STRING_PROP, default: "" },
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
     * subTitle.
     */
    subTitle: { ...DEFAULT_STRING_PROP, default: "" },
    /**
     * subTitleFont.
     */
    subTitleFont: {
      ...DEFAULT_STRING_PROP,
      default: "400 15px Inter,sans-serif",
    },
    /**
     * subTitleColor.
     */
    subTitleColor: { ...DEFAULT_STRING_PROP, default: "#141414" },
    /**
     * iconURL.
     */
    iconURL: { ...DEFAULT_STRING_PROP, default: audioIcon },
    /**
     * iconTint.
     */
    iconTint: { ...DEFAULT_STRING_PROP, default: "#39f" },
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
      audioUrl: "",
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
        messageBlockAudioStyle: style.messageBlockAudioStyle(this),
      };
    },
  },
  methods: {
    getAudioFile() {
      const fileMetadata = getMetadataByKey(
        this.messageObject,
        metadataKey.file
      );

      if (fileMetadata instanceof Blob) {
        return fileMetadata;
      } else if (
        hasOwnProperty(this.messageObject.data, "attachments") &&
        Array.isArray(this.messageObject.data.attachments) &&
        this.messageObject.data.attachments.length
      ) {
        return { ...this.messageObject.data.attachments[0] };
      } else if(hasOwnProperty(this.messageObject, "file")) {
        return this.messageObject.file
      }
    },
    getFileData() {
      if (this.audioURL && this.audioURL.length) {
        this.audioUrl = this.audioURL;
      } else if (this.messageObject) {
        const fileData = this.getAudioFile();
        if (fileData) {
          this.audioUrl = fileData.url || window.URL.createObjectURL(fileData);
        }
      }
    },
  },
  mounted() {
    this.getFileData();
    window.addEventListener("resize", this.getFileData);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getFileData);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.getFileData);
  },
};
</script>