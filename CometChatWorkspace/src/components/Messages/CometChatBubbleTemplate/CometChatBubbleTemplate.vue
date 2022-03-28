<template>
  <div
    :style="styles.messageHoverStyle"
    class="message_kit__hover"
    @mouseenter="showMessageOptions"
    @mouseleave="hideMessageOptions"
  >
    <div :style="styles.messageActionsStyle" class="message_kit__actions">
      <!--Message options starts-->
      <CometChatMenu
        v-if="isHovering"
        :menuNumber="3"
        :inputData="messageOptions"
        :style="CometChatMenuStyle"
        :menuStyle="CometChatMenuWrapperStyle"
      />
      <!--Message options ends-->

      <div :style="styles.messageGutterStyle" class="c-message_kit__gutter">
        <CometChatLeftView v-bind="$props">
          <slot></slot>
        </CometChatLeftView>
        <CometChatRightView v-bind="$props">
          <slot></slot>
        </CometChatRightView>
      </div>
    </div>
  </div>
</template>
<script>
import { CometChatMenu } from "../../Shared/";
import CometChatRightView from "../CometChatRightView/CometChatRightView";
import CometChatLeftView from "../CometChatLeftView/CometChatLeftView";
import {
  DEFAULT_STRING_PROP,
  DEFAULT_OBJECT_PROP,
  DEFAULT_ARRAY_PROP,
} from "../";
import * as style from "./style";

/**
 * Message bubble for sent text messages.
 *
 * @displayName CometChatBubbleTemplate
 */
export default {
  name: "CometChatBubbleTemplate",
  components: {
    CometChatMenu,
    CometChatLeftView,
    CometChatRightView,
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
    messageAlignment: { ...DEFAULT_STRING_PROP, default: "standard" },
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
  },
  data() {
    return {
      isHovering: false,
      CometChatMenuStyle: {
        position: "absolute",
        bottom: 0,
        right: 0,
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "4px",
      },
      CometChatMenuWrapperStyle: {
        border: "1px solid #ccc",
        borderRadius: "5px",
      },
    };
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        messageHoverStyle: style.messageHoverStyle(this),
        messageActionsStyle: style.messageActionsStyle(),
        messageGutterStyle: style.messageGutterStyle(),
      };
    },
  },
  methods: {
    showMessageOptions() {
      if (!this.isHovering) {
        this.isHovering = true;
      }
    },
    hideMessageOptions() {
      if (this.isHovering) {
        this.isHovering = false;
      }
    },
  },
};
</script>