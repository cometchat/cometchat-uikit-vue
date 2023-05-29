<template>
  <image-moderation
    :message="message"
    :imageModerationStyle="imageModerationStyle"
    v-on="listeners ? listeners : {}"
  >
    <CometChatImageBubble
      :src="src"
      :placeholderImage="placeholderImage"
    ></CometChatImageBubble
  ></image-moderation>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import CometChatImageBubble from "../../../shared/Views/CometChatImageBubble/index.vue";
import "my-cstom-package-lit";

export default defineComponent({
  name: "CometChatImageModerationBubble",
  components: { CometChatImageBubble },
  props: {
    message: { type: null },
    imageModerationStyle: { type: null },
    src: { type: null },
    placeholderImage: { type: null },
    listeners: { type: null },
  },
  setup(props, context) {
    return {};
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
