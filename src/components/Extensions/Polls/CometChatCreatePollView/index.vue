<template>
  <cometchat-backdrop>
    <create-poll
      :user="user"
      :group="group"
      :createPollStyle="createPollStyle"
      :deleteIconURL="deleteIconURL"
      :closeIconURL="closeIconURL"
      :addAnswerIconURL="addAnswerIconURL"
      v-on="listeners ? listeners : {}"
    ></create-poll>
  </cometchat-backdrop>
</template>

<script lang="ts">
import { CreatePollStyle } from "uikit-utils-lerna";
import { defineComponent } from "vue";
import "my-cstom-package-lit";
import { CometChat } from "@cometchat-pro/chat";

export default defineComponent({
  name: "CometChatCreatePollView",
  components: {},
  props: {
    user: { type: CometChat.User },
    group: { type: CometChat.Group },
    //ccCloseClicked: this.triggerCloseEvent,
    createPollStyle: { type: CreatePollStyle },
    deleteIconURL: { type: String },
    closeIconURL: { type: String },
    addAnswerIconURL: { type: String },
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
