<template>
  <div :style="styles.chatWrapperStyle" class="main__chat">
    <CometChatMessageHeader
      :user="user"
      :group="group"
      :background="headerConfig?.background"
    />
    <CometChatMessageList
      ref="messageListRef"
      :loggedInUser="loggedInUser"
      :user="user"
      :group="group"
      :parentMessage="parentMessage"
      :messageAlignment="messageAlignment"
      :messageTimeAlignment="messageTimeAlignment"
      :messageFilterList="messageFilterList"
      :background="listConfig?.background"
    />
    <div v-if="viewLiveReaction" :style="styles.liveReactionWrapperStyle">
      <CometChatLiveReactions
        :reaction="liveReactionTemplate.reaction"
        :style="liveReactionTemplate.style"
      />
    </div>

    <CometChatMessageComposer
      ref="messageComposerRef"
      :user="user"
      :group="group"
      :parentMessage="parentMessage"
      :hideEmoji="hideEmoji"
      :emojiIconURL="emojiIconURL"
      :emojiIconTint="emojiIconTint"
      :hideLiveReaction="hideLiveReaction"
      :liveReaction="liveReaction"
      :liveReactionFont="liveReactionFont"
      :liveReactionColor="liveReactionColor"
      :hideAttachment="hideAttachment"
      :messageFilterList="messageFilterList"
      :background="composerConfig?.background"
      :placeholder="composerConfig?.placeholder"
      :sendButtonIconURL="composerConfig?.sendButtonIconURL"
    />
  </div>
</template>

<!--eslint-disable-->
<script>
import {
  DEFAULT_ARRAY_PROP,
  DEFAULT_OBJECT_PROP,
  DEFAULT_STRING_PROP,
  DEFAULT_BOOLEAN_PROP,
} from "../";

import CometChatMessageComposer from "../CometChatMessageComposer/CometChatMessageComposer";
import CometChatMessageHeader from "../CometChatMessageHeader/CometChatMessageHeader";
import CometChatLiveReactions from "../CometChatLiveReactions/CometChatLiveReactions";
import CometChatMessageList from "../CometChatMessageList/CometChatMessageList";

import * as style from "./style";

import cometchatNewMessageIndicator from "../CometChatNewMessageIndicator/index.vue";
import { CometChat } from "@cometchat-pro/chat";
import insertEmoticon from "./resources/emoji.svg";
import { CometChatMessageEvents } from "../CometChatMessageEvents";
import {
  messageConstants,
  messageStatus,
  metadataKey,
} from "../CometChatMessageConstants";
import { MessagesManager } from "./controller";
import {
  MessageHeaderConfiguration,
  MessageListConfiguration,
  MessageComposerConfiguration,
} from "../../Shared";

/**
 * Displays message list with message composer and header.
 *
 * @displayName CometChatMessages
 */
export default {
  name: "CometChatMessages",
  components: {
    CometChatMessageList,
    CometChatLiveReactions,
    CometChatMessageHeader,
    CometChatMessageComposer,
    cometchatNewMessageIndicator,
  },
  props: {
    user: { ...DEFAULT_OBJECT_PROP, default: null },
    group: { ...DEFAULT_OBJECT_PROP, default: null },
    parentMessage: { ...DEFAULT_OBJECT_PROP, default: null },
    hideDeletedMessage: { ...DEFAULT_BOOLEAN_PROP, default: false },
    hideCallActionMessage: { ...DEFAULT_BOOLEAN_PROP, default: false },
    hideGroupActionMessage: { ...DEFAULT_BOOLEAN_PROP, default: false },
    hideEmoji: { ...DEFAULT_BOOLEAN_PROP, default: false },
    emojiIconURL: { ...DEFAULT_STRING_PROP, default: insertEmoticon },
    emojiIconTint: {
      ...DEFAULT_STRING_PROP,
      default: "rgba(20, 20, 20, 0.46)",
    },
    hideLiveReaction: { ...DEFAULT_BOOLEAN_PROP, default: false },
    liveReaction: { ...DEFAULT_STRING_PROP, default: "❤️" },
    liveReactionFont: {
      ...DEFAULT_STRING_PROP,
      default: "400 18px Inter,sans-serif",
    },
    liveReactionColor: { ...DEFAULT_STRING_PROP, default: "#D7443E" },
    hideSendingOneOnOneMessage: { ...DEFAULT_BOOLEAN_PROP, default: false },
    hideSendingGroupMessage: { ...DEFAULT_BOOLEAN_PROP, default: false },
    hideAttachment: { ...DEFAULT_BOOLEAN_PROP, default: false },
    messageAlignment: { ...DEFAULT_STRING_PROP, default: "standard" },
    messageTimeAlignment: { ...DEFAULT_STRING_PROP, default: "bottom" },
    messageFilterList: { ...DEFAULT_ARRAY_PROP, default: [] },
    configurations: { ...DEFAULT_OBJECT_PROP, default: {} },
  },
  data() {
    return {
      headerConfig: {},
      listConfig: {},
      composerConfig: {},
      liveReactionTimeout: 0,
      loggedInUser: null,
      viewLiveReaction: false,
      liveReactionTemplate: null,
      messagesManager: new MessagesManager(),
    };
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        chatWrapperStyle: style.chatWrapperStyle(),
        liveReactionWrapperStyle: style.liveReactionWrapperStyle(),
      };
    },
  },
  methods: {
    /**
     * Preview message before edit
     */
    previewMessageForEdit(message) {
      if (this.$refs.messageComposerRef) {
        this.$refs.messageComposerRef.previewMessageForEdit(message);
      }
    },
    /**
     * Update message list on successfully editing the message
     */
    updateMessage(payload) {
      if (this.$refs.messageListRef) {
        this.$refs.messageListRef.updateMessage(payload.message);
      }
    },
    /**
     * Draft a message before sending
     */
    draftMessage(message) {
      if (this.$refs.messageComposerRef) {
        this.$refs.messageComposerRef.draftMessage(message);
      }
    },
    addNewMessage(payload) {
      if (this.$refs.messageListRef) {
        if (payload.status === messageStatus.inprogress) {
          this.$refs.messageListRef.addMessage(payload.message);
        } else if (payload.status === messageStatus.success) {
          this.$refs.messageListRef.updateMessageAsSent(payload.message);
        }
      }
    },
    messagesCallback(listener, message) {
      switch (listener) {
        case "onTransientMessageReceived":
          this.onTransientMessageReceived(message);
          break;
        default:
          break;
      }
    },
    onTransientMessageReceived(message) {
      if (message.data.type === metadataKey.liveReaction) {
        const payload = {
          reaction: message.data.reaction,
          style: {
            font: this.liveReactionFont,
            color: this.liveReactionColor,
          },
        };

        this.shareLiveReaction(payload);
      }
    },
    clearLiveReaction() {
      clearTimeout(this.liveReactionTimeout);
      this.viewLiveReaction = false;
    },
    shareLiveReaction(payload) {
      //if already live reaction in progress
      if (this.liveReactionTimeout) {
        return false;
      }
      this.viewLiveReaction = true;
      this.liveReactionTemplate = payload;

      //set timeout till the next share
      setTimeout(this.clearLiveReaction, messageConstants.liveReactionTimeout);
    },
    getConfig() {
      const messageHeaderConfig = new MessageHeaderConfiguration();
      this.headerConfig.background =
        this.configurations?.messageHeaderConfiguration?.background ||
        messageHeaderConfig.background;

      const messageListConfig = new MessageListConfiguration();
      this.listConfig.background =
        this.configurations?.messageListConfiguration?.background ||
        messageListConfig.background;

      const messageComposerConfig = new MessageComposerConfiguration();
      this.composerConfig.background =
        this.configurations?.messageComposerConfiguration?.background ||
        messageComposerConfig.background;
      this.composerConfig.placeholder =
        this.configurations?.messageComposerConfiguration?.placeholder ||
        messageComposerConfig.placeholder;
      this.composerConfig.sendButtonIconURL =
        this.configurations?.messageComposerConfiguration?.sendButtonIconURL ||
        messageComposerConfig.sendButtonIconURL;
    },
    cometChatEventListeners() {
      CometChatMessageEvents.addListener(
        CometChatMessageEvents.messageEdited,
        "messageEdited",
        this.updateMessage
      );
      CometChatMessageEvents.addListener(
        CometChatMessageEvents.onMessageError,
        "messageError",
        this.updateMessage
      );
      CometChatMessageEvents.addListener(
        CometChatMessageEvents.previewMessageForEdit,
        "previewMessageForEdit",
        this.previewMessageForEdit
      );
      CometChatMessageEvents.addListener(
        CometChatMessageEvents.onMessageSent,
        "messageSent",
        this.addNewMessage
      );
      CometChatMessageEvents.addListener(
        CometChatMessageEvents.onLiveReaction,
        "liveReactionId",
        this.shareLiveReaction
      );
    },
    cometChatRemoveEventListeners() {
      CometChatMessageEvents.removeListener(
        CometChatMessageEvents.messageEdited,
        "messageEdited"
      );
      CometChatMessageEvents.removeListener(
        CometChatMessageEvents.onMessageError,
        "messageError"
      );
      CometChatMessageEvents.removeListener(
        CometChatMessageEvents.previewMessageForEdit,
        "previewMessageForEdit"
      );
      CometChatMessageEvents.removeListener(
        CometChatMessageEvents.onMessageSent,
        "messageSent"
      );
      CometChatMessageEvents.removeListener(
        CometChatMessageEvents.onLiveReaction,
        "liveReactionId"
      );
    },
  },
  beforeDestroy() {
    this.cometChatRemoveEventListeners();
  },
  beforeUnmount() {
    this.cometChatRemoveEventListeners();
  },
  mounted() {
    //fetching logged in user
    CometChat.getLoggedinUser().then((user) => (this.loggedInUser = user));

    //attaching listeners for transient message
    this.messagesManager.attachListeners(this.messagesCallback);

    this.getConfig();
    this.cometChatEventListeners();
  },
};
</script>