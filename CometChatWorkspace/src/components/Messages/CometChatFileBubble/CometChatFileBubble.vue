<template>
  <CometChatBubbleTemplate v-bind="$props">
    <div :style="styles.messageKitBlockStyle" class="message_kit__blocks">
      <div :style="styles.messageBlockStyle" class="message__message-blocks">
        <div :style="styles.messageTitleStyle" class="message__message-title">
          <a
            rel="noopener noreferrer"
            target="_blank"
            :href="fileUrl"
            :style="styles.messageTitleLinkStyle"
          >
            {{ fileName }}
          </a>
        </div>
        <div
          v-if="fileSubTitle"
          :style="styles.messageSubTitleStyle"
          class="message__message-subtitle"
        >
          {{ fileSubTitle }}
        </div>
      </div>
      <div :style="styles.messageFileStyle" class="message__message-audiourl">
        <i
          :style="styles.messageFileIconStyle"
          class="message__message-audio-icon"
        >
        </i>
      </div>
    </div>
  </CometChatBubbleTemplate>
</template>

<!--eslint-disable-->
<script>
import * as style from "./style";

import fileUploadIcon from "./resources/file-upload.svg";
import CometChatBubbleTemplate from "../CometChatBubbleTemplate/CometChatBubbleTemplate";
import { 
  DEFAULT_OBJECT_PROP,
  DEFAULT_STRING_PROP,
  DEFAULT_ARRAY_PROP,
  getMetadataByKey,
  bytesToSize, 
  hasOwnProperty, 
  metadataKey 
} from "../";

/**
 * Message bubble for sent file messages.
 *
 * @displayName CometChatFileBubble
 */
export default {
  name: "CometChatFileBubble",
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
     * fileURL.
     */
    fileURL: { ...DEFAULT_STRING_PROP, default: "" },
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
    iconURL: { ...DEFAULT_STRING_PROP, default: fileUploadIcon },
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
      fileName: "",
      fileUrl: "",
      fileSubTitle: "",
      fileIcon: "",
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
        messageTitleStyle: style.messageTitleStyle(this),
        messageTitleLinkStyle: style.messageTitleLinkStyle(this),
        messageSubTitleStyle: style.messageSubTitleStyle(this),
        messageFileStyle: style.messageFileStyle(this),
        messageFileIconStyle: style.messageFileIconStyle(this.fileIcon, this),
      };
    },
  },
  methods: {
    getFile() {
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
    getIcon() {
      if (this.iconURL) {
        this.fileIcon = this.iconURL;
      } else {
        this.fileIcon = fileUploadIcon;
      }
    },
    getTitle() {
      if (this.title && this.title.length) {
        this.fileName = this.title;
      } else if (this.messageObject) {
        const fileData = this.getFile();
        if (fileData) {
          this.fileName = fileData.name;
        }
      }
    },
    getSubTitle() {
      if (this.subTitle && this.subTitle.length) {
        this.fileSubTitle = this.subTitle;
      } else if (this.messageObject) {
        const fileData = this.getFile();
        if (fileData) {
          this.fileSubTitle = bytesToSize(fileData.size);
        }
      }
    },
    getFileData() {
      if (this.fileURL && this.fileURL.length) {
        this.fileUrl = this.fileURL;
      } else if (this.messageObject) {
        const fileData = this.getFile();
        if (fileData) {
          this.fileUrl = fileData.url;
        }
      }
    },
  },
  mounted() {
    this.getIcon();
    this.getTitle();
    this.getSubTitle();
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