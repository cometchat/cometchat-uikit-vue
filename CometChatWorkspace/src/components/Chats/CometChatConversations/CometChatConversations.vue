<template>
  <div :style="styles.containerStyle" class="cometchat__conversations">
    <div
      v-if="!hideStartConversation"
      :style="styles.startConversationBtnStyle"
    ></div>
    <CometChatListBase
      v-bind="$props"
    >
      <CometChatConversationList
        v-bind="$props"
        :style="listConfigStyle"
      />
    </CometChatListBase>
  </div>
</template>

<script>
import {
  DEFAULT_BOOLEAN_PROP,
  DEFAULT_OBJECT_PROP,
  DEFAULT_STRING_PROP,
} from "../";
import CometChatConversationList from "../CometChatConversationList/CometChatConversationList";
import {
  CometChatListBase,
  ConversationListConfiguration,
} from "../../Shared";

import * as style from "./style";
import backIcon from "./resources/back.svg";
import startConversationIcon from "./resources/create.svg";
import { CometChat } from "@cometchat-pro/chat";
import { CometChatConversationConstants } from '../CometChatConversationConstants';
/**
 * CometChatConversations is a container component that wraps and formats CometChatListBase component, with no behavior of its own.
 *
 * @displayName CometChatConversations
 * @version 1.0.0
 * @author CometChat
 */
export default {
  name: "CometChatConversations",
  components: {
    CometChatConversationList,
    CometChatListBase,
  },
  props: {
    /** Title of the listbase component */
    title: { ...DEFAULT_STRING_PROP, default: "Chats" },
    /** Active conversation */
    activeConversation: { ...DEFAULT_OBJECT_PROP, default: {} },
    /** Filter conversation list, fetch only user/group conversations */
    conversationType: { ...DEFAULT_STRING_PROP, default: CometChatConversationConstants.conversationType['both'] },
    style: {
      ...DEFAULT_OBJECT_PROP,
      default: {
        width: "100%",
        height: "100%",
        background: "#FFF",
        border: "1px solid #808080",
        cornerRadius: "0",
        titleFont: "700 22px Inter, sans-serif",
        titleColor: "#141414",
      },
    },
    /** Enable back button in the listbase component */
    showBackButton: { ...DEFAULT_BOOLEAN_PROP, default: false },
    backButton: {
      ...DEFAULT_OBJECT_PROP,
      default: {
        iconURL: backIcon,
        iconTint: "#3399FF",
      },
    },
    /** Enable start conversation button */
    hideStartConversation: { ...DEFAULT_BOOLEAN_PROP, default: true },
    startConversation: {
      ...DEFAULT_OBJECT_PROP,
      default: {
        iconURL: startConversationIcon,
        iconTint: "#3399FF",
      },
    },
    /** Disable search in the listbase component */
    hideSearch: { ...DEFAULT_BOOLEAN_PROP, default: true },
    search: {
      ...DEFAULT_OBJECT_PROP,
      default: {
        placeholder: "Search",
        border: "none",
        cornerRadius: "8px",
        background: "rgba(20, 20, 20, 4%)",
        textFont: "400 15px Inter, sans-serif",
        textColor: "rgba(20, 20, 20, 40%)",
        iconURL: "",
        iconTint: "#3399FF",
      },
    },
    /** Configurable options of child component */
    configurations: { ...DEFAULT_OBJECT_PROP, default: {} },
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        containerStyle: style.containerStyle(this),
        startConversationBtnStyle: style.startConversationBtnStyle(this),
      };
    },
  },
  methods: {
    getLoggedInUser() {
      return CometChat.getLoggedinUser();
    },
    listConfigStyle() {
      const conversationListConfig = new ConversationListConfiguration();
      return {
        background: this.configurations?.conversationListConfiguration?.style?.background ||
        conversationListConfig.background,
        width: this.configurations?.conversationListConfiguration?.style?.width ||
        conversationListConfig.width,
        height: this.configurations?.conversationListConfiguration?.style?.height ||
        conversationListConfig.height,
        border: this.configurations?.conversationListConfiguration?.style?.border ||
        conversationListConfig.border,
        cornerRadius: this.configurations?.conversationListConfiguration?.style?.cornerRadius ||
        conversationListConfig.cornerRadius,
        loadingIconTint: this.configurations?.conversationListConfiguration?.style?.loadingIconTint ||
        conversationListConfig.loadingIconTint,
        emptyTextFont: this.configurations?.conversationListConfiguration?.style?.emptyTextFont ||
        conversationListConfig.emptyTextFont,
        emptyTextColor: this.configurations?.conversationListConfiguration?.style?.emptyTextColor ||
        conversationListConfig.emptyTextColor,
        errorTextFont: this.configurations?.conversationListConfiguration?.style?.errorTextFont ||
        conversationListConfig.errorTextFont,
        errorTextColor: this.configurations?.conversationListConfiguration?.style?.errorTextColor ||
        conversationListConfig.errorTextColor,
      };
    },
    searchHandler() {
      //search is not implemented
      return false;
    },
  },
};
</script>