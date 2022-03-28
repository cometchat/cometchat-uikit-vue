<template>
  <span class="presence" :style="styles" />
</template>
<script>
import { DEFAULT_STRING_PROP, DEFAULT_OBJECT_PROP } from "./resources/constants";

/**
 * Displays user presence status.
 *
 * @displayName CometChatStatusIndicator
 */
export default {
  name: "CometChatStatusIndicator",
  props: {
    /**
     * width of the component.
     */
    width: { ...DEFAULT_STRING_PROP, default: "14px" },
    /**
     * height of the component.
     */
    height: { ...DEFAULT_STRING_PROP, default: "14px" },
    /**
     * Border of the component.
     */
    border: { ...DEFAULT_STRING_PROP, default: "2px solid white" },
    /**
     * Corner radius of the component.
     */
    cornerRadius: { ...DEFAULT_STRING_PROP, default: "50%" },
    /**
     * Style
     */
    style: { ...DEFAULT_OBJECT_PROP, default: null },
    /**
     * background imahge of the component.
     */
    backgroundImage: { ...DEFAULT_STRING_PROP, default: "" },
    /**
     * background color of the component.
     */
    backgroundColor: { ...DEFAULT_STRING_PROP, default: "" },
    
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {

      return {
        border: this.border,
        borderRadius: this.cornerRadius,
        backgroundColor: this.backgroundColor,
        backgroundImage: `url(${this.backgroundImage})`,
        backgroundSize: 'cover',
        width: this.width,
        height: this.height,
        display: "inline-block",
        ...this.style,
      };
    },
  },
};
</script>
