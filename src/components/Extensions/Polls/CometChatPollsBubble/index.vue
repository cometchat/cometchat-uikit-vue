<template>
  <polls-bubble
    :pollStyle="pollStyle"
    :pollQuestion="pollQuestion"
    :pollId="pollId"
    :senderUid="senderUid"
    :loggedInUser="loggedInUser"
    :metadata="metadata"
  ></polls-bubble>
</template>

<script lang="ts">
import { PollsBubbleStyle } from "uikit-utils-lerna";
import { defineComponent } from "vue";
import "my-cstom-package-lit";
import { CometChat } from "@cometchat-pro/chat";

export default defineComponent({
  name: "CometChatPollsBubble",
  components: {},
  props: {
    pollStyle: { type: PollsBubbleStyle },
    pollQuestion: { type: null },
    pollId: { type: null },
    senderUid: { type: null },
    loggedInUser: { type: CometChat.User },
    metadata: { type: null },
  },
  setup(props, context) {
    return {};
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
