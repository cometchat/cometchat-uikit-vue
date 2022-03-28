<template>
  <CometChatBubbleTemplate v-bind="$props">
    <div
      :style="styles.messageKitBlockStyle"
      class="message_kit__blocks"
    >
      <img
        class="message__message-blocks"
        :style="styles.messageBlockStyle"
        :src="imageUrl"
        :alt="imageUrl"
      />
    </div>
  </CometChatBubbleTemplate>
</template>

<!--eslint-disable-->
<script>
import * as style from "./style";
import srcIcon from "./resources/1px.png";
import CometChatBubbleTemplate from "../CometChatBubbleTemplate/CometChatBubbleTemplate"
import {   
  DEFAULT_OBJECT_PROP,
  DEFAULT_STRING_PROP,
  DEFAULT_ARRAY_PROP,
  getExtensionsData, 
  hasOwnProperty, 
  metadataKey 
} from "../";

/**
 * Message bubble for sent image messages.
 *
 * @displayName CometChatImageBubble
 */
export default {
  name: "CometChatImageBubble",
  components: {
    CometChatBubbleTemplate,
  },
  props: {
    /**
     * Current logged in user.
     */
    loggedInUser: { ...DEFAULT_OBJECT_PROP, default: null },
    /**
     * width.
     */
    width: { ...DEFAULT_STRING_PROP, default: "100%" },
    /**
     * height.
     */
    height: { ...DEFAULT_STRING_PROP, default: "auto" },
    /**
     * cornerradius.
     */
    cornerRadius: { ...DEFAULT_STRING_PROP, default: "12px" },
    /**
     * backgroundColor.
     */
    backgroundColor: { ...DEFAULT_STRING_PROP, default: "rgb(246, 246, 246)" },
    /**
     * borderWidth.
     */
    border: { ...DEFAULT_STRING_PROP, default: "0 none" },
    /**
     * avatar.
     */
    avatar: { ...DEFAULT_STRING_PROP, default: null },
    /**
     * username.
     */
    userName: { ...DEFAULT_STRING_PROP, default: null },
    /**
     * usernameFont.
     */
    usernameFont: {
      ...DEFAULT_STRING_PROP,
      default: "600 13px Inter,sans-serif",
    },
    /**
     * usernameColor.
     */
    usernameColor: { ...DEFAULT_STRING_PROP, default: "#39f" },
    /**
     * messageAlignment.
     */
    messageAlignment: { ...DEFAULT_STRING_PROP, default: "leftAligned" },
    /**
     * messageTimeAlignment.
     */
    messageTimeAlignment: { ...DEFAULT_STRING_PROP, default: "bottom" },
    /**
     * text.
     */
    text: { ...DEFAULT_STRING_PROP, default: "" },
    /**
     * textFont.
     */
    textFont: { ...DEFAULT_STRING_PROP, default: "400 15px Inter,sans-serif" },
    /**
     * textColor.
     */
    textColor: { ...DEFAULT_STRING_PROP, default: "#141414" },
    /**
     * The message object.
     */
    messageObject: { ...DEFAULT_OBJECT_PROP, default: null },
    /**
     * The message messageOptions.
     */
    messageOptions: { ...DEFAULT_ARRAY_PROP, default: [] },
    /**
     * imageURL.
     */
    imageURL: { ...DEFAULT_STRING_PROP, default: "" },
  },
  data() {
    return {
      imageUrl: srcIcon,
    };
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        messageKitBlockStyle: style.messageKitBlockStyle(this),
        messageBlockStyle: style.messageBlockStyle(this),
      };
    },
  },
  methods: {
    getImage() {
      if (this.imageURL && this.imageURL.length) {
        this.imageUrl = this.imageURL;
      } else if (this.messageObject) {
        const thumbnailGenerationExtensionData = getExtensionsData(
          this.messageObject,
          metadataKey.extensions.thumbnailGeneration
        );
        if (
          thumbnailGenerationExtensionData &&
          !hasOwnProperty(thumbnailGenerationExtensionData, "error")
        ) {
          const mq = window.matchMedia(
            "(min-width: 320px) and (max-width: 767px)"
          );
          mq.addListener(() => {
            const imageToDownload = this.pickImage(
              thumbnailGenerationExtensionData
            );
            let img = new Image();
            img.src = imageToDownload;
            img.onload = () => {
              this.imageUrl = img.src;
            };
          });

          const imageToDownload = this.pickImage(
            thumbnailGenerationExtensionData
          );

          this.downloadImage(imageToDownload)
            .then((response) => {
              let img = new Image();
              img.src = imageToDownload;
              img.onload = () => {
                this.imageUrl = img.src;
              };
            })
            .catch((error) => console.error(error));
        } else {
          this.setMessageImageUrl().then((imageUrl) => {
            if (imageUrl !== this.imageURL) {
              this.imageUrl = imageUrl;
            }
          });
        }
      }
    },
    pickImage(thumbnailGenerationObject) {
      const smallUrl = thumbnailGenerationObject["url_small"];
      const mediumUrl = thumbnailGenerationObject["url_medium"];

      const mq = window.matchMedia("(min-width: 320px) and (max-width: 767px)");

      let imageToDownload = mediumUrl;
      if (mq.matches) {
        imageToDownload = smallUrl;
      }

      return imageToDownload;
    },
    downloadImage(imgUrl) {
      return new Promise((resolve, reject) => {
        let timer;
        const xhr = new XMLHttpRequest();
        xhr.open("GET", imgUrl, true);
        xhr.responseType = "blob";

        xhr.onload = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              timer = null;
              resolve(imgUrl);
            } else if (xhr.status === 403) {
              timer = setTimeout(() => {
                this.downloadImage(imgUrl)
                  .then((response) => resolve(imgUrl))
                  .catch((error) => reject(error));
              }, 800);
            }
          } else {
            reject(xhr.statusText);
          }
        };

        xhr.onerror = (event) =>
          reject(new Error("There was a network error.", event));
        xhr.ontimeout = (event) =>
          reject(new Error("There was a timeout error.", event));
        xhr.send();
      });
    },
    setMessageImageUrl() {
      return new Promise((resolve) => {
        let img = new Image();

        if (
          this.messageObject &&
          this.messageObject.data &&
          this.messageObject.data.attachments &&
          typeof this.messageObject.data.attachments === "object" &&
          this.messageObject.data.attachments.length
        ) {
          img.src = this.messageObject.data.attachments[0]?.url;
        } else if (
          this.messageObject.data.file || this.messageObject.file
        ) {
          const reader = new FileReader();
          reader.onload = function () {
            img.src = reader.result;
          };

          reader.readAsDataURL(this.messageObject.data.file || this.messageObject.file);
        }

        img.onload = () => resolve(img.src);
      });
    },
  },
  mounted() {
    this.getImage();
    window.addEventListener("resize", this.getImage());
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getImage());
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.getImage());
  },
};
</script>