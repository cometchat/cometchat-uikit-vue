<template>
  <div :style="styles.getOuterViewStyle">
    <span :style="styles.getContainerStyle">
      <span :style="styles.getImageStyle" />
    </span>
  </div>
</template>

<script>
import { DEFAULT_STRING_PROP } from "./resources/constants";

import srcIcon from "./resources/default.jpg";
import * as style from "./style";

/**
 * Shared avatar component.
 *
 * @displayName CometChatAvatar
 */
export default {
  name: "CometChatAvatar",
  data() {
    return {
      imageURL: srcIcon,
    };
  },
  props: {
    /**
     * The corner radius for the avatar.
     */
    cornerRadius: { ...DEFAULT_STRING_PROP, default: "50%" },
    /**
     * The border for the avatar.
     */
    border: { ...DEFAULT_STRING_PROP, default: "" },
    /**
     * The backgroundColor for the avatar.
     */
    backgroundColor: { ...DEFAULT_STRING_PROP, default: "" },
    /**
     * The backgroundSize for the avatar.
     */
    backgroundSize: { ...DEFAULT_STRING_PROP, default: "cover" },
    /**
     * The outerView border for the avatar.
     */
    outerView: { ...DEFAULT_STRING_PROP, default: "2px solid #3399FF" },
    /**
     * outerViewSpacing
     */
    outerViewSpacing: { ...DEFAULT_STRING_PROP, default: "4px" },
    /**
     * The width for the avatar.
     */
    width: { ...DEFAULT_STRING_PROP, default: "40px" },
    /**
     * The height for the avatar.
     */
    height: { ...DEFAULT_STRING_PROP, default: "40px" },
    /**
     * The image source for the avatar.
     */
    image: { ...DEFAULT_STRING_PROP, default: "" },
    /**
     * The name source for the avatar.
     */
    name: { ...DEFAULT_STRING_PROP, default: "" },
    /**
     * The nameTextFont source for the avatar.
     */
    nameTextFont: { ...DEFAULT_STRING_PROP, default: "bold 80px Inter" },
    /**
     * The nameTextColor source for the avatar.
     */
    nameTextColor: { ...DEFAULT_STRING_PROP, default: "#ffffff" },
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        getOuterViewStyle: style.getOuterViewStyle(this),
        getImageStyle: style.getImageStyle(this, this.getImage()),
        getContainerStyle: style.getContainerStyle(this),
      };
    },
  },
  methods: {
    getImage() {
      let _image = this.imageURL;
      if (this.image && this.image.trim().length) {
        _image = this.image;
      } else if (this.name && this.name.trim().length) {
        const char = this.name.substring(0, 2).toUpperCase();
        const avatarImage = this.generateAvatar(char);
        _image = avatarImage;
      }
      return _image
    },
    generateAvatar(data) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = 200;
      canvas.height = 200;

      //Draw backgroundColor
      context.fillStyle = this.backgroundColor;
      context.fillRect(0, 0, canvas.width, canvas.height);

      //Draw text
      context.font = this.nameTextFont;
      context.fillStyle = this.nameTextColor;
      context.strokeStyle = "transparent";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(data, canvas.width / 2, canvas.height / 2);

      return canvas.toDataURL("image/svg");
    },
  },
};
</script>