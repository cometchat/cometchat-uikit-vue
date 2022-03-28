<template>
  <span v-if="count && count > 0" :style="styles">{{ count }}</span>
</template>
<script>
import {
  DEFAULT_NUMBER_PROP,
  DEFAULT_STRING_PROP,
} from "./resources/constants";

/**
 * Shows a badge count.
 *
 * @displayName CometChatBadgeCount
 */
export default {
  name: "CometChatBadgeCount",
  props: {
    /**
     * The count value to display.
     */
    count: { ...DEFAULT_NUMBER_PROP, default: 0 },
    /**
     * Border of the component.
     */
    border: { ...DEFAULT_STRING_PROP, default: "1px solid transparent" },
    /**
     * Corner radius of the component.
     */
    cornerRadius: { ...DEFAULT_STRING_PROP, default: "11px" },
    /**
     * background color of the component.
     */
    background: { ...DEFAULT_STRING_PROP, default: "rgba(51, 153, 255, 1)" },
    /**
     * width of the component.
     */
    width: { ...DEFAULT_STRING_PROP, default: "24px" },
    /**
     * height of the component.
     */
    height: { ...DEFAULT_STRING_PROP, default: "20px" },
    /**
     * text color of the component.
     */
    textColor: { ...DEFAULT_STRING_PROP, default: "white" },
    /**
     * text font of the component.
     */
    textFont: { ...DEFAULT_STRING_PROP, default: "600 12px Inter" },
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        border: this.border,
				borderRadius: this.cornerRadius,
				backgroundColor: this.background,
				color: this.textColor,
				font: this.textFont,
				minWidth: this.width,
				height: this.height,
				textAlign: "center",
				display: "inline-block",
				padding: "2px 6px",
      }
    },
  },
};
</script>