<template>
  <cometchat-text-bubble
    :text="text"
    :textStyle="textStyle"
  ></cometchat-text-bubble>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CometChatTextBubble",
  components: {},
  props: {
    text: { type: String, default: null },
    textStyle: { type: null },
  },
  setup(props, context) {
    return {};
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
