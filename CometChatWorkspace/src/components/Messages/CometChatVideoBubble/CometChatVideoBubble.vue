<template>
  <CometChatBubbleTemplate v-bind="$props">
    <div :style="styles.messageKitBlockStyle" class="message_kit__blocks">
      <div :style="styles.messageBlockStyle" class="message__message-blocks">
        <video
          class="message__message-video"
          :style="styles.messageBlockVideoStyle"
          controls
          :src="videoUrl"
        ></video>
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
/**
 * Message bubble for sent Video messages.
 *
 * @displayName CometChatVideoBubble
 */
export default {
  name: "CometChatVideoBubble",
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
     * videoURL.
     */
    videoURL: { ...DEFAULT_STRING_PROP, default: "" },
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
      videoUrl: "",
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
        messageBlockVideoStyle: style.messageBlockVideoStyle(this),
      };
    },
  },
  methods: {
    getVideoFile() {
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
      }
    },
    getFileData() {
      if (this.videoURL && this.videoURL.length) {
        this.videoUrl = this.videoURL;
      } else if (this.messageObject) {
        const fileData = this.getVideoFile();
        if (fileData) {
          this.videoUrl = fileData.url || window.URL.createObjectURL(fileData);;
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