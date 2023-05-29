<template>
  <cometchat-audio-bubble
    :src="audioUrl"
    :audioStyle="audioStyle"
  ></cometchat-audio-bubble>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CometChatAudioBubble",
  components: {},
  props: {
    audioUrl: { type: String, default: null },
    audioStyle: { type: null },
  },
  setup(props, context) {
    return {};
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
