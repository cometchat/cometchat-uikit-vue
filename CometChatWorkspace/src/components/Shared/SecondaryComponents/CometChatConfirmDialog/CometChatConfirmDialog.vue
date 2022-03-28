<template>
  <div class="confirm__dialog" :style="styles.dialogWrapperStyle">
    <div
      :style="styles.dialogLoadingWrapperStyle"
      class="dialog__loading__wrapper"
    >
      <div :style="styles.dialogLoadingStyle" class="dialog__loading"></div>
    </div>
    <div class="dialog__form" :style="styles.dialogFormStyle">
      <div class="dialog__error" :style="styles.dialogErrorStyle">
        Something went wrong!
      </div>
      <div class="dialog__message" :style="styles.dialogMessageStyle">
        {{ messageText }}
      </div>
      <div class="dialog__buttons" :style="styles.dialogButtonStyle">
        <button
          type="button"
          class="button__confirm"
          :style="styles.buttonCancelStyle"
          @click="onCancel"
        >
          {{ cancelButtonText }}
        </button>
        <button
          type="button"
          class="button__cancel"
          :style="styles.buttonConfirmStyle"
          @click="onConfirmClick"
        >
          {{ confirmButtonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  DEFAULT_STRING_PROP,
  DEFAULT_BOOLEAN_PROP,
  DEFAULT_FUNCTION_PROP,
} from "./resources/constants";
import * as style from "./style";
import loadingIcon from "./resources/loading.svg";

/**
 * Cometchat confirm dialog.
 *
 * @displayName CometChatConfirmDialog
 */
export default {
  name: "CometChatConfirmDialog",
  props: {
    isOpen: { ...DEFAULT_BOOLEAN_PROP, default: false },
    confirmButtonText: { ...DEFAULT_STRING_PROP, default: "Yes" },
    cancelButtonText: { ...DEFAULT_STRING_PROP, default: "No" },
    messageText: { ...DEFAULT_STRING_PROP, default: "Are you sure?" },
    onConfirm: { ...DEFAULT_FUNCTION_PROP, default: () => {} },
    onCancel: { ...DEFAULT_FUNCTION_PROP, default: () => {} },
    background: { ...DEFAULT_STRING_PROP, default: "white" },
    width: { ...DEFAULT_STRING_PROP, default: "100%" },
    height: { ...DEFAULT_STRING_PROP, default: "100%" },
  },
  data() {
    return {
      state: "initial",
    };
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        dialogBackdropStyle: style.dialogBackdropStyle(this),
        dialogLoadingWrapperStyle: style.dialogLoadingWrapperStyle(this.state),
        dialogLoadingStyle: style.dialogLoadingStyle(loadingIcon),
        dialogWrapperStyle: style.dialogWrapperStyle(this),
        dialogFormStyle: style.dialogFormStyle(this.state),
        dialogErrorStyle: style.dialogErrorStyle(this.state),
        dialogMessageStyle: style.dialogMessageStyle(),
        dialogButtonStyle: style.dialogButtonStyle(),
        buttonConfirmStyle: style.buttonConfirmStyle(),
        buttonCancelStyle: style.buttonCancelStyle(),
      };
    },
  },
  methods: {
    onConfirmClick(event) {
      this.state = "loading";
      this.onConfirm(event)
        .then((response) => {
          console.log("response", response);
          this.state = "done";
        })
        .catch((error) => {
          console.log("error", error);
          this.state = "error";
        });
    },
  },
};
</script>