<template>
  <cometchat-document-bubble
    :iconURL="iconURL"
    :title="title"
    :URL="URL"
    :subtitle="subtitle"
    :buttonText="buttonText"
    :documentStyle="documentStyle"
    :hideSeparator="hideSeparator"
    :iconAlignment="iconAlignment"
    :ccClicked="ccClicked"
  ></cometchat-document-bubble>
</template>

<script lang="ts">
import { MessageBubbleAlignment } from "uikit-utils-lerna";
import { defineComponent, PropType } from "vue";
import "my-cstom-package-lit";

export default defineComponent({
  name: "CometChatDocumentExtensionBubble",
  components: {},
  props: {
    iconURL: { type: String },
    title: { type: String },
    URL: { type: String },
    subtitle: { type: String },
    buttonText: { type: String },
    documentStyle: { type: null },
    hideSeparator: { type: Boolean, default: false },
    iconAlignment: { type: Object as PropType<MessageBubbleAlignment> },
    listeners: { type: null },
    ccClicked: { type: null },
  },
  setup(props, context) {
    return {};
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
