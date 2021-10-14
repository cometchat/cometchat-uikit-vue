<template>
  <div :style="styles.chatWrapper" class="cometchat__main__chat">
    <comet-chat-message-header
      :item="item"
      :type="type"
      :sidebar="sidebar"
      :theme="themeValue"
      :logged-in-user="loggedInUser"
      @action="actionHandler"
    />
    <comet-chat-message-list
      :item="item"
      :type="type"
      :theme="themeValue"
      ref="messageListRef"
      :messages="messageList"
      :logged-in-user="loggedInUser"
      :messageconfig="messageconfig"
      :scroll-to-bottom="scrollToBottom"
      @action="actionHandler"
    />
    <div v-if="canShowLiveReaction" :style="styles.reactionsWrapper">
      <comet-chat-live-reactions 
        :reaction="reactionName" 
        :theme="themeValue" 
      />
    </div>

    <comet-chat-message-composer
      :item="item"
      :type="type"
      :theme="themeValue"
      :smart-reply="replyPreview"
      :message-to-edit="messageToBeEdited"
      @action="actionHandler"
    />
    <div v-if="canShowNewMessageIndicator">
      <cometchat-new-message-indicator
        :theme="themeValue"
        :unreadMessages="unreadMessages"
        @action="actionHandler" 
      />
    </div>
    
  </div>
</template>

<!--eslint-disable-->
<script>
import {
  DEFAULT_ARRAY_PROP,
  DEFAULT_OBJECT_PROP,
  DEFAULT_STRING_PROP,
  DEFAULT_BOOLEAN_PROP,
} from "../../../resources/constants";

import * as enums from "../../../util/enums";

import {
  propertyCheck,
  cometChatCommon,
  cometChatMessage,
} from "../../../mixins/";

import CometChatMessageComposer from "../CometChatMessageComposer/CometChatMessageComposer";
import CometChatMessageHeader from "../CometChatMessageHeader/CometChatMessageHeader";
import CometChatLiveReactions from "../CometChatLiveReactions/CometChatLiveReactions";
import CometChatMessageList from "../CometChatMessageList/CometChatMessageList";

import { theme } from "../../../resources/theme";

import * as style from "./style";

import { incomingMessageAlert } from "../../../resources/audio/";
import cometchatNewMessageIndicator from '../CometChatNewMessageIndicator/index.vue';
import { CometChat } from '@cometchat-pro/chat';
import { CometChatEvent } from '../../../util/CometChatEvent';

/**
 * Displays message list with message composer and header.
 *
 * @displayName CometChatMessages
 */
export default {
  name: "CometChatMessages",
  mixins: [propertyCheck, cometChatCommon, cometChatMessage],
  components: {
    CometChatMessageList,
    CometChatLiveReactions,
    CometChatMessageHeader,
    CometChatMessageComposer,
    cometchatNewMessageIndicator,
  },
  props: {
    /**
     * The selected chat item object.
     */
    item: { ...DEFAULT_OBJECT_PROP },
    /**
     * Type of chat item.
     */
    type: { ...DEFAULT_STRING_PROP },
    /**
     * Theme of the UI.
     */
    theme: { ...DEFAULT_OBJECT_PROP },
    /**
     * Wheter to show sidebar.
     */
    sidebar: { ...DEFAULT_BOOLEAN_PROP },
    /**
     * The current call message.
     */
    callMessage: { ...DEFAULT_OBJECT_PROP },
    /**
     * List of group messages.
     */
    groupMessages: { ...DEFAULT_ARRAY_PROP },
    /**
     * Current logged in user.
     */
    loggedInUser: { ...DEFAULT_OBJECT_PROP },
    /**
     * @ignore
     */
    messageconfig: { ...DEFAULT_OBJECT_PROP },
    /**
     * Action data from listener.
     */
    actionFromListener: { ...DEFAULT_OBJECT_PROP },
    /**
     * The composed thread message.
     */
    composedThreadMessage: { ...DEFAULT_OBJECT_PROP },
    /**
     * The type of reaction.
     */
    reaction: { ...DEFAULT_STRING_PROP, default: "heart" },
  },
  data() {
    return {
      messageList: [],
      unreadMessages: [],
      replyPreview: null,
      scrollToBottom: true,
      reactionName: "heart",
      messageToBeEdited: null,
      showLiveReaction: false,
    };
  },
  watch: {
    /**
     * One true watcher that updates state on props update.
     */
    propsForWatcher: {
      handler(_, prevProps) {
        const idKey = this.type === "user" ? "uid" : "guid";

        if (prevProps.item[idKey] !== this.item[idKey]) {
          this.messageList = [];
          this.unreadMessages = [];
          this.scrollToBottom = true;
          this.messageToBeEdited = null;
        } else if (prevProps.type !== this.type) {
          this.messageList = [];
          this.unreadMessages = [];
          this.scrollToBottom = true;
          this.messageToBeEdited = null;
        } else if (
          prevProps.composedThreadMessage !== this.composedThreadMessage
        ) {
          this.updateReplyCount(this.composedThreadMessage);
        } else if (prevProps.callMessage !== this.callMessage) {
          this.actionHandler({
            action: "callUpdated",
            message: this.callMessage,
          });
        } else if (prevProps.actionFromListener !== this.actionFromListener) {
          this.actionHandler({ ...this.actionFromListener });
        } else if (prevProps.groupMessages !== this.groupMessages) {
          this.appendMessage(this.groupMessages);
        }
      },
      deep: true,
    },
  },
  computed: {
    /**
     * Theme computed using default theme and theme coming from prop.
     */
    themeValue() {
      return Object.assign({}, theme, this.theme);
    },
    /**
     * Computed styles for the component.
     */ styles() {
      return {
        reactionsWrapper: style.reactionsWrapperStyle(),
        chatWrapper: style.chatWrapperStyle(this.themeValue),
      };
    },
    /**
     * Whether it can show live reactions.
     */
    canShowLiveReaction() {
      return this.item.blockedByMe ? false : this.showLiveReaction;
    },
    /**
     * Whether it can show new message button.
     */
    canShowNewMessageIndicator() {
      return this.unreadMessages.length > 0 ? true : false;
    },
    /**
     * Computed object, made of props, for watcher.
     */
    propsForWatcher() {
      return {
        item: this.item,
        type: this.type,
        callMessage: this.callMessage,
        groupMessages: this.groupMessages,
        actionFromListener: this.actionFromListener,
        composedThreadMessage: this.composedThreadMessage,
      };
    },
  },
  methods: {
    /**
     * Handler for action events
     */
    actionHandler({
      key,
      group,
      action,
      options,
      message,
      reaction,
      messages,
    }) {
      switch (action) {
        case "customMessageReceived":
        case "messageReceived":
          if (messages[0].parentMessageId) {
            this.updateReplyCount(messages);
          } else {
            if (messages[0].type !== "extension_poll") {
              this.smartReplyPreview(messages);
            }
            this.appendMessage(messages);
          }

          this.playAudio();

          break;
        case "messageUpdated":
          this.scrollToBottom = false;
          this.updateMessages(messages);
          break;
        case "messageFetched":
          this.prependMessages(messages);
          break;
        case "messageRefreshed":
          this.messageList = [...messages];
          break;
        case "messageFetchedAgain":
          this.scrollToBottom = true;
          this.prependMessages(messages);
          break;
        case "messageDeleted":
          this.removeMessages(messages);
          break;
        case "deleteMessage":
          this.deleteMessage(message);
          break;
        case "editMessage":
          this.replyPreview = null;
          this.editMessage(message);
          break;
        case "messageEdited":
          this.scrollToBottom = false;
          this.messageEdited(message);
          break;
        case "gotEditedMessage":
          this.emitAction("messageEdited", { message });
          break;
        case "clearEditPreview":
          this.messageToBeEdited = null;
          break;
        case "groupUpdated":
          this.groupUpdated(message, key, group, options);
          break;
        case "callUpdated":
          this.callUpdated(message);
          break;
        case "pollAnswered":
          this.updatePollMessage(message);
          break;
        case "pollCreated":
          this.appendMessage(messages);
          break;
        case "messageRead":
        case "viewMessageThread":
        case "viewActualImage":
          this.emitAction(action, { message });
          break;
        case "audioCall":
        case "videoCall":
        case "viewDetail":
        case "menuClicked":
          this.emitAction(action);
          break;
        case "sendReaction":
          this.toggleReaction(true);
          break;
        case "showReaction":
          this.showReaction(reaction);
          break;
        case "stopReaction":
          this.toggleReaction(false);
          break;
        default:
          break;
      }
    },
    /**
     * Toggles reaction view
     */
    toggleReaction(flag) {
      this.showLiveReaction = flag;
    },
    /**
     * Shows reaction
     */
    showReaction(reaction) {
      if (!this.hasProperty(reaction, "data")) {
        return;
      }

      if (
        !this.hasProperty(reaction.data || {}, "type") ||
        !this.hasProperty(reaction.data || {}, "reaction")
      ) {
        return;
      }

      if (!this.hasProperty(enums.LIVE_REACTIONS, reaction.data.reaction)) {
        return;
      }

      if (reaction.data.type === enums.LIVE_REACTION_KEY) {
        this.reactionName = reaction.data.reaction;
        this.showLiveReaction = true;
      }
    },
    /**
     * Updates reply count
     */
    updateReplyCount(messages) {
      const receivedMessage = messages[0];
      const messageList = [...this.messageList];
      const parentMessageId = receivedMessage.parentMessageId ?? null;

      let messageKey = messageList.findIndex((m) => m.id === parentMessageId);

      if (messageKey > -1) {
        const messageObj = messageList[messageKey];
        let replyCount = messageObj.replyCount ? messageObj.replyCount : 0;
        replyCount = replyCount + 1;

        const newMessageObj = Object.assign({}, messageObj, {
          replyCount: replyCount,
        });

        messageList.splice(messageKey, 1, newMessageObj);
        this.messageList = messageList;
        this.scrollToBottom = false;
      }
    },
    /**
     * Refreshing messages
     */
    refreshingMessages() {
      this.messageList = [];
      this.messageToBeEdited = ""; 
      this.replyPreview = null; 
      this.liveReaction = false; 
      this.messageToReact = null;
      CometChatEvent.triggerHandler(enums.EVENTS["CLEAR_UNREAD_MESSAGES_TRIGGERED"], {});
    },
    /**
     * 
     * Handle new messages 
     */
    newMessagesArrived(newMessage) {
      let unreadMessages = [...this.unreadMessages];
      unreadMessages.push(newMessage[0]);
      this.unreadMessages = unreadMessages;

      CometChatEvent.triggerHandler(enums.EVENTS["NEW_MESSAGES_TRIGGERED"], { unreadMessages: unreadMessages });
    },
    /**
     * Jump to new messages on click of new message button
     */
    jumpToMessages() {

      if (this.unreadMessages.length === 0) {
        return false;
      }
  
      let unreadMessages = [...this.unreadMessages];
      let messageList = [...this.messageList];
      messageList = messageList.concat(unreadMessages);

      CometChatEvent.triggerHandler(enums.EVENTS["CLEAR_UNREAD_MESSAGES_TRIGGERED"], {});

      if (messageList.length > enums.EVENTS["MAX_MESSAGE_COUNT"]) {
        if (this.$refs.messageListRef) {
          this.$refs.messageListRef.reInitializeMessageBuilder();
        }
      } else {
        this.markMessagesAsRead(true);
      }
    },
    /**
     * Mark new messages as read
     */
    markMessagesAsRead(scrollToBottom) {
      if (this.unreadMessages.length === 0) {
        return false;
      }
  
      let unreadMessages = [...this.unreadMessages];
      let messageList = [...this.messageList];
  
      unreadMessages.forEach(unreadMessage => {
        if (unreadMessage.receiverType === CometChat.RECEIVER_TYPE.USER) {
          if (this.$refs.messageListRef) {
            messageList.push(unreadMessage);
            this.$refs.messageListRef.markMessageAsRead(unreadMessage);
          }
        } else if (unreadMessage.receiverType === CometChat.RECEIVER_TYPE.GROUP) {
          if (this.$refs.messageListRef) {
            messageList.push(unreadMessage);
            this.$refs.messageListRef.markMessageAsRead(unreadMessage);
          }
        }
      });
 
      this.messageList = messageList
      this.scrollToBottom = scrollToBottom
      this.unreadMessages = []
    },
    callUpdated(message) {
      this.appendMessage([message]);
    },
    groupUpdated(message, key, group, options) {
      this.appendMessage([message]);

      this.emitAction("groupUpdated", { message, key, group, options });
    },
    /**
     * Updates poll message
     */
    updatePollMessage(message) {
      this.findMessage(message, (messageKey, messageList) => {
        const messageObj = messageList[messageKey];

        const metadataObj = {
          "@injected": { extensions: { polls: message.poll } },
        };

        const newMessageObj = { ...messageObj, metadata: metadataObj };

        messageList.splice(messageKey, 1, newMessageObj);
        this.updateMessages(messageList);
      });
    },
    /**
     * Plays audio
     */
    playAudio() {
      if (this.canPlayAudio) {
        this.audio.currentTime = 0;
        this.audio.play();
      }
    },
    // scrollMessageList() {
    //   this.$nextTick(() => {
    //     if (this.$refs && this.$refs.messageListRef) {
    //       this.$refs.messageListRef.scrollListToBottom();
    //     }
    //   });
    // },
    /**
     * CometChat Events Listeners
     */
    cometChatEventListeners() {
      CometChatEvent.on(enums.EVENTS["NEW_MESSAGES"], (args) => this.newMessagesArrived(args.messages));
      CometChatEvent.on(enums.EVENTS["REFRESHING_MESSAGES"], () => this.refreshingMessages());
      CometChatEvent.on(enums.EVENTS["CLEAR_UNREAD_MESSAGES"], () => this.jumpToMessages());
      CometChatEvent.on(enums.EVENTS["NEW_MESSAGE_CLICKED"], () => this.jumpToMessages());
      CometChatEvent.on(enums.EVENTS["MESSAGE_COMPOSED"], ({messages}) => this.appendMessage(messages));
      CometChatEvent.on(enums.EVENTS["MESSAGE_SENT"], ({messages}) => {
        this.messageSent(messages);
        CometChatEvent.triggerHandler(enums.EVENTS["UPDATED_LAST_MESSAGES"], { ...messages[0] });
      });
      CometChatEvent.on(enums.EVENTS["ERROR_IN_SENDING_MESSAGE"], ({messages}) => {
        this.messageSent(messages);
      });
    },
    cometChatRemoveEventListeners() {
      CometChatEvent.remove(enums.EVENTS["NEW_MESSAGES"]);
      CometChatEvent.remove(enums.EVENTS["REFRESHING_MESSAGES"]);
      CometChatEvent.remove(enums.EVENTS["CLEAR_UNREAD_MESSAGES"]);
      CometChatEvent.remove(enums.EVENTS["NEW_MESSAGE_CLICKED"]);
      CometChatEvent.remove(enums.EVENTS["MESSAGE_COMPOSED"]);
      CometChatEvent.remove(enums.EVENTS["MESSAGE_SENT"]);
      CometChatEvent.remove(enums.EVENTS["ERROR_IN_SENDING_MESSAGE"]);
    }
  },
  beforeDestroy() {
    this.cometChatRemoveEventListeners();
  },
  beforeUnmount() {
    this.cometChatRemoveEventListeners();
  },
  mounted() {
    this.reactionName = this.reaction;
    this.audio = new Audio(incomingMessageAlert);

    this.cometChatEventListeners()
          
  },
};
</script>
<style scoped>
.cometchat__main__chat * {
  box-sizing: border-box;
  font-family: var(--chat-wrapper-font-family) !important;
}
</style>