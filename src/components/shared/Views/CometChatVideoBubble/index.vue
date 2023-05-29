<template>
  <cometchat-video-bubble
    :src="src"
    :videoStyle="videoStyle"
    :poster="poster"
  ></cometchat-video-bubble>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CometChatVideoBubble",
  components: {},
  props: {
    videoStyle: { type: null },
    src: { type: String, default: null },
    poster: { type: null },
  },
  setup(props, context) {
    return {};
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
