<template>
  <cometchat-callscreen
    :callscreenStyle="ongoingCallStyle"
    :callSettingsBuilder="callSettingsBuilder"
    :resizeIconHoverText="resizeIconHoverText"
    :sessionID="sessionID"
    :minimizeIconURL="minimizeIconURL"
    :maximizeIconURL="maximizeIconURL"
  ></cometchat-callscreen>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { CallscreenStyle } from "uikit-utils-lerna";

import { CometChat } from "@cometchat-pro/chat";
import "my-cstom-package-lit";

import { localize } from "uikit-resources-lerna";
import { ReduceSizeIcon, IncreaseSizeIcon } from "../../../assets";

export default defineComponent({
  name: "CometChatOngoingCall",
  components: {},
  props: {
    callSettingsBuilder: { type: CometChat.CallSettingsBuilder },
    sessionID: { type: String, default: "" },
    ongoingCallStyle: {
      type: CallscreenStyle,
      default: {
        maxHeight: "100%",
        maxWidth: "100%",
        border: "none",
        borderRadius: "0",
        background: "grey",
        minHeight: "400px",
        minWidth: "400px",
        minimizeIconTint: "white",
        maximizeIconTint: "white",
      },
    },
    resizeIconHoverText: { type: String, default: () => localize("RESIZE") },
    minimizeIconURL: { type: String, default: ReduceSizeIcon },
    maximizeIconURL: { type: String, default: IncreaseSizeIcon },
  },
  setup(props) {
    return {};
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
