<template>
  <div>
    <comet-chat-backdrop :show="open" @click="onClose()" />
    <div :style="styles.imageWrapper" @click="onClose()">
      <img
        :src="computedImage"
        :style="styles.image"
        :alt="localize('FULL_SCREEN_VIEW')"
        @error="() => (error = true)"
      />
    </div>
  </div>
</template>
<script>
import { DEFAULT_OBJECT_PROP, DEFAULT_BOOLEAN_PROP, DEFAULT_FUNCTION_PROP } from "../";

import { CometChatBackdrop, localize } from "../../Shared";

import closeIcon from "./resources/close.png";
import srcIcon from "./resources/1px.png";

import * as style from "./style";

/**
 * Displays fullscreen image.
 *
 * @displayName CometChatImageViewer
 */
export default {
  name: "CometChatImageViewer",
  components: { CometChatBackdrop },
  props: {
    /**
     * Opens image viewer.
     */
    open: { ...DEFAULT_BOOLEAN_PROP },
    /**
     * The message object.
     */
    message: { ...DEFAULT_OBJECT_PROP },
    onClose: { ...DEFAULT_FUNCTION_PROP, default: () => {} },
  },
  data() {
    return {
      error: false,
    };
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        image: style.imageStyle(),
        imageWrapper: style.imageWrapperStyle(closeIcon),
      };
    },
    /**
     * Computed image based on error state.
     */
    computedImage() {
      return this.error ? srcIcon : this.message.data.url;
    },
    /**
     * Local string constants.
     */
    localize() {
      return localize;
    },
  },
};
</script>