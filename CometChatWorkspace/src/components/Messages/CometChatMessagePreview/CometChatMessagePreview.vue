<template>
  <div :style="styles.editPreviewContainerStyle">
    <div :style="styles.previewHeadingStyle">
      <div :style="styles.previewTextStyle">{{ localize("EDIT_MESSAGE") }}</div>
      <span :style="styles.previewCloseStyle" @click="onClose"></span>
    </div>
    <div>{{ messageText }}</div>
  </div>
</template>
<script>
import {
  DEFAULT_STRING_PROP,
  DEFAULT_OBJECT_PROP,
} from "..";

import * as style from "./style";

import closeIcon from "./resources/close.svg";
import { getExtensionsData, hasOwnProperty } from "../CometChatMessageHelper";
import { metadataKey } from "../CometChatMessageConstants";
import {localize} from "../../Shared"
/**
 * Displays a preview of available smart replies.
 *
 * @displayName CometChatMessagePreview
 */
export default {
  name: "CometChatMessagePreview",
  props: {
    border: { ...DEFAULT_STRING_PROP, default: "1px solid rgb(234, 234, 234)" },
    background: { ...DEFAULT_STRING_PROP, default: "#fff" },
    messageObject: { ...DEFAULT_OBJECT_PROP, default: null },
    closeIconURL: { ...DEFAULT_STRING_PROP, default: closeIcon },
    closeIconTint: { ...DEFAULT_STRING_PROP, default: "#39f" },
  },
  data() {
    return {
      messageText: "",
    };
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        editPreviewContainerStyle: style.editPreviewContainerStyle(this),
        previewHeadingStyle: style.previewHeadingStyle(),
        previewTextStyle: style.previewTextStyle(),
        previewCloseStyle: style.previewCloseStyle(this),
      };
    },
    localize() {
      return localize;
    }
  },
  methods: {
    getMessageText() {
      this.messageText = this.messageObject.text;

      //xss extensions data
      const xssData = getExtensionsData(
        this.messageObject,
        metadataKey.extensions.xssfilter
      );
      if (
        xssData &&
        hasOwnProperty(xssData, "sanitized_text") &&
        hasOwnProperty(xssData, "hasXSS") &&
        xssData.hasXSS === "yes"
      ) {
        this.messageText = xssData.sanitized_text;
      }

      //datamasking extensions data
      const maskedData = getExtensionsData(
        this.messageObject,
        metadataKey.extensions.datamasking
      );
      if (
        maskedData &&
        hasOwnProperty(maskedData, "data") &&
        hasOwnProperty(maskedData.data, "sensitive_data") &&
        hasOwnProperty(maskedData.data, "message_masked") &&
        maskedData.data.sensitive_data === "yes"
      ) {
        this.messageText = maskedData.data.message_masked;
      }

      //profanity extensions data
      const profaneData = getExtensionsData(
        this.messageObject,
        metadataKey.extensions.profanityfilter
      );
      if (
        profaneData &&
        hasOwnProperty(profaneData, "profanity") &&
        hasOwnProperty(profaneData, "message_clean") &&
        profaneData.profanity === "yes"
      ) {
        this.messageText = profaneData.message_clean;
      }
    },
  },
  beforeMount() {
    this.getMessageText();
  },
};
</script>