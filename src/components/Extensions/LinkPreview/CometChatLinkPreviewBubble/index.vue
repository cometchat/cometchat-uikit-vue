<template>
  <link-preview
    :title="title"
    :description="description"
    :URL="URL"
    :image="image"
    :favIconURL="favIconURL"
    :linkPreviewStyle="linkPreviewStyle"
    v-on="listeners ? listeners : {}"
  >
    <cometchat-text-bubble
      :text="text"
      :textStyle="textStyle"
    ></cometchat-text-bubble>
  </link-preview>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "my-cstom-package-lit";
import { LinkPreviewStyle } from "uikit-utils-lerna";
import { TextBubbleStyle } from "my-cstom-package-lit";

export default defineComponent({
  name: "CometChatLinkPreviewBubble",
  components: {},
  props: {
    title: { type: String },
    description: { type: String },
    URL: { type: String },
    image: { type: String },
    favIconURL: { type: String },
    linkPreviewStyle: { type: LinkPreviewStyle },
    textStyle: { type: TextBubbleStyle },
    text: { type: String },
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
