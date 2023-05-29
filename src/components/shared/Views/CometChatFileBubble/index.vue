<template>
  <cometchat-file-bubble
    :downloadIconURL="downloadIconURL"
    :subtitle="subtitle"
    :titles="title"
    :fileURL="fileURL"
  ></cometchat-file-bubble>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CometChatFileBubble",
  components: {},
  props: {
    downloadIconURL: { type: String, default: null },
    subtitle: { type: String },
    title: { type: String },
    fileURL: { type: String },
  },
  setup(props, context) {
    return {};
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
