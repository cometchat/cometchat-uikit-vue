<template>
  <cometchat-image-bubble
    :src="src"
    :placeholderImage="placeholderImage"
    :imageStyle="{ height: '200px', ...imageStyle }"
    @cc-image-clicked="openImageInFullScreen"
  ></cometchat-image-bubble>
  <full-screen-viewer
    @cc-close-clicked="closeImageInFullScreen"
    v-if="openFullscreenView"
    :URL="imageurlToOpen"
    :closeIconURL="Close2xIcon"
    :fullScreenViewerStyle="fullScreenViewerStyle"
  >
  </full-screen-viewer>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import "my-cstom-package-lit";
import { Close2xIcon } from "../../../../assets";
import { FullScreenViewerStyle } from "my-cstom-package-lit";

export default defineComponent({
  name: "CometChatImageBubble",
  components: {},
  props: {
    src: { type: String, default: null },
    placeholderImage: { type: null },
    imageStyle: { type: null },
    message: { type: null },
  },
  setup(props, context) {
    let openFullscreenView = ref(false);
    let imageurlToOpen = ref("");
    let fullScreenViewerStyle: FullScreenViewerStyle = {
      height: "100%",
      width: "100%",
      closeIconTint: "blue",
    };
    const openImageInFullScreen = (event: any) => {
      imageurlToOpen.value =
        props.message?.getAttachments()[0]?.getUrl() ?? event.detail.url;
      openFullscreenView.value = true;
    };

    const closeImageInFullScreen = () => {
      imageurlToOpen.value = "";
      openFullscreenView.value = false;
    };
    return {
      openImageInFullScreen,
      openFullscreenView,
      imageurlToOpen,
      Close2xIcon,
      fullScreenViewerStyle,
      closeImageInFullScreen,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
