<template>
  <smart-replies
    :smartReplyStyle="smartReplyStyle"
    :replies="replies"
    v-on="listeners ? listeners : {}"
  ></smart-replies>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CometChatSmartReplyBubble",
  components: {},
  props: {
    smartReplyStyle: { default: null },
    replies: { type: null },
    listeners: { type: null },
  },
  setup(props, context) {
    return {};
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
