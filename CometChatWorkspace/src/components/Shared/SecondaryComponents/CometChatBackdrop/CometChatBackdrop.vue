<template>
  <div
    v-if="isOpen"
    :style="styles.backdropStyle"
    class="modal__backdrop"
    @click="onClick"
  >
    <div :style="styles.dialogStyle" class="modal__dialog">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import {
  DEFAULT_BOOLEAN_PROP,
  DEFAULT_FUNCTION_PROP, 
  DEFAULT_OBJECT_PROP,
} from "./resources/constants";
import * as style from "./style";

/**
 * Displays a backdrop, for modals.
 *
 * @displayName CometChatBackdrop
 */
export default {
  name: "CometChatBackdrop",
  props: {
    isOpen: {...DEFAULT_BOOLEAN_PROP, default: false },
    style: {...DEFAULT_OBJECT_PROP, default: {} },
    onClick: {...DEFAULT_FUNCTION_PROP, default: () => {} },
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        backdropStyle: style.backdropStyle(this),
        dialogStyle: style.dialogStyle(),
      };
    },
  },
};
</script>