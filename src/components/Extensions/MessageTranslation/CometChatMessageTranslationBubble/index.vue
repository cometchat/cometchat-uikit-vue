<template>
  <message-translation-bubble
    :translatedText="translatedText"
    :alignment="alignment"
    :messageTranslationStyle="messageTranslationStyle"
  >
    <cometchat-text-bubble
      :textStyle="textStyle"
      :text="text"
    ></cometchat-text-bubble
  ></message-translation-bubble>
</template>

<script lang="ts">
import {
  MessageBubbleAlignment,
  MessageTranslationStyle,
} from "uikit-utils-lerna";
import { defineComponent, PropType } from "vue";
import "my-cstom-package-lit";

export default defineComponent({
  name: "CometChatMessageTranslationBubble",
  components: {},
  props: {
    translatedText: { type: String },
    alignment: { type: Object as PropType<MessageBubbleAlignment> },
    messageTranslationStyle: { type: MessageTranslationStyle },
    textStyle: { type: null },
    text: { type: String },
  },
  setup(props, context) {
    return {};
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
