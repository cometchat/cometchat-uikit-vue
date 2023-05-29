<template>
  <cometchat-backdrop :backdropStyle="backdropStyle">
    <cometchat-confirm-dialog
      :title="''"
      :messageText="warningText"
      :cancelButtonText="cancelText"
      :confirmButtonText="confirmText"
      :confirmDialogStyle="confirmDialogStyle"
      v-on:="listeners ? listeners : {}"
    >
    </cometchat-confirm-dialog>
  </cometchat-backdrop>
</template>

<script lang="ts">
//(cc-confirm-clicked)="onConfirmClick()"
//(cc-cancel-clicked)="onCancelClick()"

import { defineComponent } from "vue";
import "my-cstom-package-lit";
import { CometChat } from "@cometchat-pro/chat";

export default defineComponent({
  name: "CometChatConfirmDialogView",
  components: {},
  props: {
    backdropStyle: { type: CometChat.User },
    title: { type: CometChat.Group },
    //ccCloseClicked: this.triggerCloseEvent,
    warningText: { type: String },
    cancelText: { type: String },
    confirmText: { type: String },
    confirmDialogStyle: { type: String },
    listeners: {
      type: null,
    },
  },
  setup(props, context) {
    return {};
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
