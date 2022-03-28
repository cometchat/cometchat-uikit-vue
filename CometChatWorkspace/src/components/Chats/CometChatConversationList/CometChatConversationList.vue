<template>
  <div :style="styles.wrapperStyle">

    <div
      v-if="conversationList.length === 0 && message === localize('LOADING')"
      :style="styles.messageContainerStyle"
    >
      <div v-if="customView?.loading" v-bind="$props">{{customView.loading}}</div>
      <div v-else :style="styles.loadingStyle" class="loading__style"></div>
    </div>

    <div
      v-else-if="conversationList.length === 0 && message === localize('NO_CHATS_FOUND')"
      :style="styles.messageContainerStyle"
    >
      <div v-if="customView?.empty" v-bind="$props">{{customView.empty}}</div>
      <div v-else :style="styles.messageTextStyle">
        {{ message }}
      </div>
    </div>

    <div
      v-else-if="conversationList.length === 0 && message === localize('SOMETHING_WRONG')"
      :style="styles.messageContainerStyle"
    >
      <div v-if="customView?.error" v-bind="$props">{{customView.error}}</div>
      <div v-else :style="styles.messageTextStyle">
        {{ message }}
      </div>
    </div>

    <div
      :style="styles.chatsListStyle"
      class="chats__list"
      v-else-if="conversationList.length != 0"
      @scroll="handleScroll($event)"
    >
      <div v-for="(conversation, i) in conversationList" :key="i">
        <CometChatConversationListItem
          :key="conversation.id"
          :inputData="conversationListConfig(conversation).inputData"
          :border="conversationListConfig(conversation).border"
          :conversation="conversation"
          :isActive="conversationListConfig(conversation).isActive"
          :background="conversationListConfig(conversation).background"
          :hideAvatar="conversationListConfig(conversation).hideAvatar"
          :hideStatusIndicator="
            conversationListConfig(conversation).hideStatusIndicator
          "
          :hideUnreadCount="
            conversationListConfig(conversation).hideUnreadCount
          "
          :hideReceipt="conversationListConfig(conversation).hideReceipt"
          :showTypingIndicator="
            conversationListConfig(conversation).showTypingIndicator
          "
          :typingIndicatorText="
            conversationListConfig(conversation).typingIndicatorText
          "
          :hideThreadIndicator="
            conversationListConfig(conversation).hideThreadIndicator
          "
          :threadIndicatorText="localize('IN_A_THREAD')"
          :hideGroupActionMessages="
            conversationListConfig(conversation).hideGroupActionMessages
          "
          :hideDeletedMessages="
            conversationListConfig(conversation).hideDeletedMessages
          "
          :showDeleteConversation="
            conversationListConfig(conversation).showDeleteConversation
          "
          :configurations="this.configurations"
        />
      </div>
      <div v-if="isDelete">
        <CometChatBackdrop :isOpen="isDelete" :onClick="cancelDelete">
          <CometChatConfirmDialog
            :isOpen="isDelete"
            :onConfirm="deleteConversation"
            :onCancel="cancelDelete"
            :width="'50%'"
          />
        </CometChatBackdrop>
      </div>
    </div>
  </div>
</template>

<!--eslint-disable-->
<script>
import { CometChat } from "@cometchat-pro/chat";

import { ConversationListManager } from "./controller";

import {
  DEFAULT_OBJECT_PROP,
  DEFAULT_STRING_PROP,
  DEFAULT_BOOLEAN_PROP,
  DEFAULT_ARRAY_PROP,
  DEFAULT_NUMBER_PROP,
} from "../";
import {
  CometChatConversationListItem,
  CometChatConfirmDialog,
  CometChatBackdrop,
  localize,
  CometChatSoundManager,
} from "../../Shared/";

import * as style from "./style";
import { CometChatConversationConstants } from "../CometChatConversationConstants";
import { CometChatConversationEvents } from "../CometChatConversationEvents";
import { CometChatMessageReceiverType, hasOwnProperty } from "../../Messages";
import { conversationType } from "../conversationType";
import reloadIcon from "./resources/spinner.svg";

/**
 * Displays a list of conversation.
 *
 * @displayName CometChatConversationList
 */
export default {
  name: "CometChatConversationList",
  components: {
    CometChatConversationListItem,
    CometChatConfirmDialog,
    CometChatBackdrop,
  },
  props: {
    /** Active conversation object */
    activeConversation: { ...DEFAULT_OBJECT_PROP, default: {} },
    /** Filter conversation list, fetch only user/group conversations */
    conversationType: {
      ...DEFAULT_STRING_PROP,
      default: CometChatConversationConstants.conversationType["both"],
    },
    userAndGroupTags: { ...DEFAULT_BOOLEAN_PROP, default: true },
    tags: { ...DEFAULT_ARRAY_PROP, default: [] },
    limit: { ...DEFAULT_NUMBER_PROP, default: 30 },
    style: {
      ...DEFAULT_OBJECT_PROP,
      default: {
        width: "100%",
        height: "100%",
        background: "transparent",
        border: "none",
        cornerRadius: "0",
        loadingIconTint: "",
        emptyTextFont: "",
        emptyTextColor: "",
        errorTextFont: "",
        errorTextColor: "",
      },
    },
    customView: {
      ...DEFAULT_OBJECT_PROP,
      default: {
        loading: "",
        empty: "",
        error: "",
      },
    },
    loadingIconURL: {...DEFAULT_STRING_PROP, default: reloadIcon },
    emptyText: {...DEFAULT_STRING_PROP, default: localize("NO_CHATS_FOUND") },
    errorText: {...DEFAULT_STRING_PROP, default: localize("SOMETHING_WRONG") },
    hideError: { ...DEFAULT_BOOLEAN_PROP, default: false },
    onErrorCallback: { ...DEFAULT_STRING_PROP, default: "" },
    configurations: { ...DEFAULT_OBJECT_PROP, default: {} },
  },
  data() {
    return {
      loggedInUser: null,
      incrementUnreadCount: true,
      conversationListManager: new ConversationListManager(this),
      conversationList: [],
      fetchStatus: false,
      callbackData: null,
      message: localize("LOADING"),
      isDelete: false,
      conversationToBeDeleted: null,
      handlers: {},
    };
  },
  watch: {
    /**
     * One true watcher that updates state on props update.
     */
    propsWatcher: {
      handler(_, { callbackData }) {
        if (this.callbackData !== callbackData) {
          const handler = this.handlers[this.callbackData?.name];

          if (!handler) {
            return false;
          }

          return handler(...this.callbackData?.args);
        }
      },
      deep: true,
    },
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        wrapperStyle: style.wrapperStyle(this),
        chatsListStyle: style.chatsListStyle(
          this.configurations?.background || this.style?.background
        ),
        messageContainerStyle: style.messageContainerStyle(),
        messageTextStyle: style.messageTextStyle(),
        loadingStyle: style.loadingStyle(this)
      };
    },
    /**
     * Computed object, made of props, for watcher.
     */
    propsWatcher() {
      return {
        callbackData: this.callbackData,
      };
    },
    localize() {
      return localize;
    },
  },
  methods: {
    conversationListConfig(conversation) {
      const inputData =
        this.configurations?.conversationListItemConfiguration?.inputData ||
        CometChatConversationConstants.inputData;
      const style = this.configurations?.conversationListItemConfiguration
        ?.style || {
        width: "100%",
        height: "auto",
        background: "transparent",
        border: "1px solid rgba(20, 20, 20, 10%)",
        cornerRadius: "0px",
        titleColor: "rgba(20,20,20)",
        titleFont: "600 15px Inter",
        subTitleColor: "rgba(20, 20, 20, 60%)",
        subTitleFont: "400 13px Inter, sans-serif",
        typingIndicatorTextColor: "rgba(20, 20, 20, 60%)",
        typingIndicatorTextFont: "400 13px Inter, sans-serif",
        threadIndicatorTextColor: "rgba(20, 20, 20, 60%)",
        threadIndicatorTextFont: "400 13px Inter, sans-serif",
      };

      const hideStatusIndicator =
        this.configurations?.conversationListItemConfiguration
          ?.hideStatusIndicator || false;
      const hideAvatar =
        this.configurations?.conversationListItemConfiguration?.hideAvatar ||
        false;
      const hideUnreadCount =
        this.configurations?.conversationListItemConfiguration
          ?.hideUnreadCount || false;

      let hideReceipt = false;
      if (
        this.configurations?.conversationListItemConfiguration?.hideReceipt !==
        undefined
      ) {
        hideReceipt =
          this.configurations?.ConversationListItemConfiguration?.hideReceipt;
      } else if (conversation.showTypingIndicator) {
        hideReceipt = true;
      }

      const hideThreadIndicator =
        this.configurations?.conversationListItemConfiguration
          ?.hideThreadIndicator || false;
      const hideGroupActionMessages =
        this.configurations?.conversationListItemConfiguration
          ?.hideGroupActionMessages || false;
      const hideDeletedMessages =
        this.configurations?.conversationListItemConfiguration
          ?.hideDeletedMessages || false;
      const showDeleteConversation =
        this.configurations?.conversationListItemConfiguration
          ?.showDeleteConversation || true;

      let isActive =
        conversation?.conversationId ===
        this?.activeConversation?.conversationId
          ? true
          : false;

      let showTypingIndicator;
      if (
        this.configurations?.conversationListItemConfiguration
          ?.showTypingIndicator !== true
      ) {
        showTypingIndicator = false;
      } else {
        if (conversation.showTypingIndicator === undefined) {
          showTypingIndicator = false;
        } else {
          showTypingIndicator = conversation.showTypingIndicator;
        }
      }

      const typingIndicatorText = conversation.typingIndicatorText
        ? conversation.typingIndicatorText
        : "";

      return {
        typingIndicatorText: typingIndicatorText,
        hideStatusIndicator: hideStatusIndicator,
        hideAvatar: hideAvatar,
        hideUnreadCount: hideUnreadCount,
        hideReceipt: hideReceipt,
        showTypingIndicator: showTypingIndicator,
        hideThreadIndicator: hideThreadIndicator,
        hideGroupActionMessages: hideGroupActionMessages,
        hideDeletedMessages: hideDeletedMessages,
        showDeleteConversation: showDeleteConversation,
        style: style,
        isActive: isActive,
        inputData: inputData,
      };
    },
    conversationCallback(listenerName, ...args) {
      this.callbackData = { name: listenerName, args: [...args] };
    },
    /**
     *
     * Mark the incoming message as delivered
     */
    markMessageAsDelivered(message) {
      if (hasOwnProperty(message, "deliveredAt") === false) {
        CometChat.markAsDelivered(message);
      }
    },
    /**
     *
     * If the incoming message is 1-1 conversation, and the conversation type filter is set to groups return false
     * If the incoming message is group conversation, and the conversation type filter is set to users return false
     * else return true
     *
     */
    filterByConversationType(message) {
      if (this.conversationType !== conversationType["both"]) {
        if (
          (this.conversationType === conversationType["users"] &&
            message.receiverType === CometChat.RECEIVER_TYPE.GROUP) ||
          (this.conversationType === conversationType["groups"] &&
            message.receiverType === CometChat.RECEIVER_TYPE.USER)
        ) {
          return false;
        }
      }

      return true;
    },
    /**
     *
     * Converting message object received in the listener callback to conversation object
     */
    getConversationFromMessage(message) {
      return new Promise((resolve, reject) => {
        CometChat.CometChatHelper.getConversationFromMessage(message)
          .then((conversation) => {
            let conversationKey = this.conversationList.findIndex(
              (c) => c.conversationId === conversation.conversationId
            );
            if (conversationKey > -1) {
              resolve({
                conversationKey: conversationKey,
                conversationId: conversation.conversationId,
                conversationType: conversation.conversationType,
                conversationWith: conversation.conversationWith,
                conversation: this.conversationList[conversationKey],
                conversations: [...this.conversationList],
              });
            }

            resolve({
              conversationKey: conversationKey,
              conversationId: conversation.conversationId,
              conversationType: conversation.conversationType,
              conversationWith: conversation.conversationWith,
              conversation: conversation,
              conversations: [...this.conversationList],
            });
          })
          .catch((error) => reject(error));
      });
    },
    getUnreadMessageCount(message, conversation = {}) {
      // need to discuss w mayur
      let unreadMessageCount = conversation.unreadMessageCount
        ? Number(conversation.unreadMessageCount)
        : 0;

      if (this.incrementUnreadCount === true) {
        unreadMessageCount = this.shouldIncrementCount(message)
          ? ++unreadMessageCount
          : unreadMessageCount;
      } else {
        unreadMessageCount = 0;
      }

      return unreadMessageCount;
    },
    /**
     *
     * If the message is sent by the logged in user, return false
     * If the message has category message or has incrementUnreadCount key in the metadata with value set to true, return true else return false
     *
     */
    shouldIncrementCount(message) {
      if (message?.sender?.uid === this.loggedInUser?.uid) {
        return false;
      }

      if (
        message.category === CometChat.CATEGORY_MESSAGE ||
        (message.metadata &&
          message.metadata.incrementUnreadCount &&
          message.metadata.incrementUnreadCount) === true
      ) {
        return true;
      }

      return false;
    },
    /**
     * play notification sound for incoming messages
     */
    playNotificationSound(message) {
      /**
       * If unreadcount is not incremented, don't play notification sound
       */
      if (!this.shouldIncrementCount(message)) {
        return false;
      }

      /**
       * If group action messages are hidden, and the incoming message is of category `action` and type `groupMember`, don't play notification sound
       */
      const hideGroupActionMessages =
        this.configurations?.ConversationListItemConfiguration
          ?.hideGroupActionMessages;
      if (
        hideGroupActionMessages === true &&
        message.category === CometChat.CATEGORY_ACTION &&
        message.type === CometChat.ACTION_TYPE.TYPE_GROUP_MEMBER
      ) {
        return false;
      }

      if (
        this.activeConversation &&
        this.activeConversation.conversationType &&
        this.activeConversation.conversationWith
      ) {
        const receiverType = message.getReceiverType();
        const receiverId =
          receiverType === CometChat.RECEIVER_TYPE.USER
            ? message.getSender().getUid()
            : message.getReceiverId();

        if (
          receiverId !== this.activeConversation.conversationWith?.uid &&
          receiverId !== this.activeConversation.conversationWith?.guid
        ) {
          CometChatSoundManager.play(
            CometChatSoundManager.Sound.incomingMessageFromOther
          );
        }
      } else {
        CometChatSoundManager.play(
          CometChatSoundManager.Sound.incomingMessageFromOther
        );
      }

      // CometChatSoundManager.play(CometChatSoundManager.Sound["incomingmessage"],
      // "https://proxy.notificationsounds.com/message-tones/pristine-609/download/file-sounds-1150-pristine.mp3");
    },
    /**
     *
     * When a user goes online/ offline
     */
    handleUsers(user) {
      const conversationKey = this.conversationList.findIndex(
        (eachConversation) =>
          eachConversation.conversationType &&
          eachConversation.conversationType === CometChat.RECEIVER_TYPE.USER &&
          eachConversation.conversationWith &&
          eachConversation.conversationWith.uid &&
          eachConversation.conversationWith.uid === user.uid
      );

      if (conversationKey > -1) {
        let conversations = [...this.conversationList];
        let conversation = conversations[conversationKey];
        let conversationWith = {
          ...conversation.conversationWith,
          status: user.getStatus(),
        };

        let newConversation = {
          ...conversation,
          conversationWith: conversationWith,
        };
        conversations.splice(conversationKey, 1, newConversation);
        this.conversationList = conversations;
      }
    },
    /**
     *
     * When a text message / media message / custom message is received
     */
    handleMessages(...options) {
      const message = options[0];
      /**
       * marking the incoming messages as read
       */
      this.markMessageAsDelivered(message);

      /**
       * If the incoming message is 1-1 and the conversation type filter is set to group, return false
       * OR
       * If the incoming message is group and the conversation type filter is set to "users", return false
       * ELSE
       * return true
       */
      if (this.filterByConversationType() === false) {
        return false;
      }

      this.getConversationFromMessage(message).then((response) => {
        const {
          conversationKey,
          conversationId,
          conversationType,
          conversationWith,
          conversation,
          conversations,
        } = response;

        const lastMessage = { ...conversation.lastMessage, ...message };

        if (conversationKey > -1) {
          const unreadMessageCount = this.getUnreadMessageCount(
            message,
            conversation
          );

          const newConversation = new CometChat.Conversation(
            conversationId,
            conversationType,
            lastMessage,
            conversationWith,
            unreadMessageCount
          );
          conversations.splice(conversationKey, 1);
          conversations.unshift(newConversation);
          this.conversationList = conversations;

          //play notification sound
          this.playNotificationSound(message);
        } else {
          const unreadMessageCount = this.getUnreadMessageCount(message);
          const newConversation = new CometChat.Conversation(
            conversationId,
            conversationType,
            lastMessage,
            conversationWith,
            unreadMessageCount
          );
          conversations.unshift(newConversation);
          this.conversationList = conversations;

          //play notification sound
          this.playNotificationSound(message);
        }
      });
    },
    /**
     * Listener callback when a message is edited, deleted or updated
     */
    handleMessageActions(...options) {
      const message = options[0];

      this.getConversationFromMessage(message).then((response) => {
        const {
          conversationKey,
          conversationId,
          conversationType,
          conversationWith,
          conversation,
          conversations,
        } = response;

        if (
          conversationKey > -1 &&
          conversation.lastMessage.id === message.id
        ) {
          const lastMessage = { ...conversation.lastMessage, ...message };
          const unreadMessageCount = this.getUnreadMessageCount(
            message,
            conversation
          );

          const newConversation = new CometChat.Conversation(
            conversationId,
            conversationType,
            lastMessage,
            conversationWith,
            unreadMessageCount
          );
          conversations.splice(conversationKey, 1, newConversation);
          this.conversationList = conversations;
        }
      });
    },
    /**
     *
     * Listener callback when a message is read
     */
    handleMessageReadActions(...options) {
      const messageReceipt = options[0];

      let conversationKey = this.conversationList.findIndex(
        (conversation) =>
          messageReceipt?.receiverType === conversation?.conversationType &&
          (messageReceipt?.receiver === conversation?.conversationWith?.uid ||
            messageReceipt?.receiver === conversation?.conversationWith?.guid)
      );

      if (conversationKey > -1) {
        const conversations = { ...this.conversationList };
        const conversation = conversations[conversationKey];
        let unreadMessageCount = conversation.unreadMessageCount;

        /**
         * If the message id in the read receipt is greater than or equal to the lastmessage id, set unreadmessagecount to 0
         */
        if (messageReceipt?.messageId >= conversation?.lastMessage?.id) {
          unreadMessageCount = 0;
        }

        const newConversation = new CometChat.Conversation(
          conversation.conversationId,
          conversation.conversationType,
          conversation.lastMessage,
          conversation.conversationWith,
          unreadMessageCount
        );

        conversations.splice(conversationKey, 1, newConversation);
        this.conversationList = conversations;
      }
    },
    /**
     *
     * Listener callback when a user joins/added to the group
     */
    handleGroupMemberAddition(...options) {
      const message = options[0];
      const newUser = options[1];
      const group = options[3];

      this.getConversationFromMessage(message).then((response) => {
        const {
          conversationKey,
          conversationId,
          conversationType,
          conversationWith,
          conversation,
          conversations,
        } = response;

        if (conversationKey > -1) {
          const lastMessage = { ...conversation.lastMessage, ...message };
          const newConversationWith = { ...conversationWith, ...group };
          const unreadMessageCount = conversation.unreadMessageCount;

          const newConversation = new CometChat.Conversation(
            conversationId,
            conversationType,
            lastMessage,
            newConversationWith,
            unreadMessageCount
          );
          conversations.splice(conversationKey, 1, newConversation);
          this.conversationList = conversations;
        } else if (this.loggedInUser?.uid === newUser.uid) {
          /**
           * If the loggedin user is added to the group, add the conversation to the chats list
           */
          const lastMessage = { ...message };
          const newConversationWith = {
            ...conversationWith,
            ...group,
            hasJoined: true,
          };
          const unreadMessageCount = conversation.unreadMessageCount;

          const newConversation = new CometChat.Conversation(
            conversationId,
            conversationType,
            lastMessage,
            newConversationWith,
            unreadMessageCount
          );

          conversations.unshift(newConversation);
          this.conversationList = conversations;
        }
      });
    },
    /**
     *
     * Listener callback when a member is kicked from / has left the group
     */
    handleGroupMemberRemoval(...options) {
      const message = options[0];
      const removedUser = options[1];
      const group = options[3];

      this.getConversationFromMessage(message).then((response) => {
        const {
          conversationKey,
          conversationId,
          conversationType,
          conversationWith,
          conversation,
          conversations,
        } = response;

        if (conversationKey > -1) {
          /**
           * If the loggedin user is removed from the group, remove the conversation from the chats list
           */
          if (this.loggedInUser?.uid === removedUser.uid) {
            conversations.splice(conversationKey, 1);
            this.conversationList = conversations;
          } else {
            const lastMessage = { ...conversation.lastMessage, ...message };
            const newConversationWith = { ...conversationWith, ...group };
            const unreadMessageCount = conversation.unreadMessageCount;

            const newConversation = new CometChat.Conversation(
              conversationId,
              conversationType,
              lastMessage,
              newConversationWith,
              unreadMessageCount
            );

            conversations.splice(conversationKey, 1, newConversation);
            this.conversationList = conversations;
          }
        }
      });
    },
    /**
     *
     * Listener callback when a member is banned from the group
     */
    handleGroupMemberBan(...options) {
      const message = options[0];
      const removedUser = options[1];
      const group = options[3];

      this.getConversationFromMessage(message).then((response) => {
        const {
          conversationKey,
          conversationId,
          conversationType,
          conversationWith,
          conversation,
          conversations,
        } = response;

        if (conversationKey > -1) {
          /**
           * If the loggedin user is banned from the group, remove the conversation from the chats list
           */
          if (this.loggedInUser?.uid === removedUser.uid) {
            conversations.splice(conversationKey, 1);
            this.conversationList = conversations;
          } else {
            const lastMessage = { ...conversation.lastMessage, ...message };
            const newConversationWith = { ...conversationWith, ...group };
            const unreadMessageCount = conversation.unreadMessageCount;

            const newConversation = new CometChat.Conversation(
              conversationId,
              conversationType,
              lastMessage,
              newConversationWith,
              unreadMessageCount
            );

            conversations.splice(conversationKey, 1, newConversation);
            this.conversationList = conversations;
          }
        }
      });
    },
    /**
     *
     * Listener callback when a group member scope is updated
     */
    handleGroupMemberScopeChange(...options) {
      const message = options[0];
      const user = options[1];
      const newScope = options[2];
      const group = options[4];

      this.getConversationFromMessage(message).then((response) => {
        const {
          conversationKey,
          conversationId,
          conversationType,
          conversationWith,
          conversation,
          conversations,
        } = response;

        if (conversationKey > -1) {
          const lastMessage = { ...conversation.lastMessage, ...message };
          const unreadMessageCount = conversation.unreadMessageCount;

          if (this.loggedInUser?.uid === user.uid) {
            const newConversationWith = {
              ...conversationWith,
              ...group,
              scope: newScope,
            };

            const newConversation = new CometChat.Conversation(
              conversationId,
              conversationType,
              lastMessage,
              newConversationWith,
              unreadMessageCount
            );

            conversations.splice(conversationKey, 1);
            conversations.unshift(newConversation);
            this.conversationList = conversations;
          } else {
            let newConversationWith = { ...conversationWith, ...group };

            const newConversation = new CometChat.Conversation(
              conversationId,
              conversationType,
              lastMessage,
              newConversationWith,
              unreadMessageCount
            );

            conversations.splice(conversationKey, 1, newConversation);
            this.conversationList = conversations;
          }
        }
      });
    },
    /**
     *
     * Listener callback for typing events
     */
    handleTyping(...options) {
      const typingData = options[0];
      const typingStarted = options[1];
      const conversations = [...this.conversationList];

      let conversationKey = conversations.findIndex(
        (conversation) =>
          conversation?.conversationType === typingData?.receiverType &&
          ((conversation?.conversationType === CometChat.RECEIVER_TYPE.USER &&
            conversation.conversationWith?.uid === typingData?.sender?.uid) ||
            (conversation.conversationType === CometChat.RECEIVER_TYPE.GROUP &&
              conversation.conversationWith?.guid === typingData?.receiverId))
      );

      if (conversationKey > -1) {
        let typingIndicatorText = "";
        if (typingStarted) {
          typingIndicatorText =
            typingData?.receiverType === CometChat.RECEIVER_TYPE.GROUP
              ? `${typingData?.sender?.name} ${localize("IS_TYPING")}`
              : localize("IS_TYPING");
        }

        const conversation = this.conversationList[conversationKey];
        const newConversation = {
          ...conversation,
          showTypingIndicator: typingStarted,
          typingIndicatorText,
        };

        conversations.splice(conversationKey, 1, newConversation);
        this.conversationList = conversations;
      }
    },
    handleScroll(event) {
      const bottom =
        Math.round(
          event.currentTarget.scrollHeight - event.currentTarget.scrollTop
        ) === Math.round(event.currentTarget.clientHeight);
      if (bottom) {
        this.getConversationsList(this.conversationListManager).then(
          (conversations) => {
            this.conversationList = [
              ...conversations,
              ...this.conversationList,
            ];
          }
        );
      }
    },
    clickHandler() {
      // CometChatConversationList.listeners.(element => {
      // });;
    },
    /**
     * Remove conversation from the conversationlist upon delete
     */
    removeConversation(conversation) {
      const conversationKey = this.conversationList.findIndex(
        (c) => c.conversationId === conversation.conversationId
      );

      if (conversationKey > -1) {
        const newConversationList = [...this.conversationList];
        newConversationList.splice(conversationKey, 1);
        this.conversationList = newConversationList;
      }
    },
    deleteConversation() {
      return new Promise((resolve, reject) => {
        const conversationWith =
          this.conversationToBeDeleted.conversationType ===
          CometChatMessageReceiverType.group
            ? this.conversationToBeDeleted?.conversationWith?.guid
            : this.conversationToBeDeleted?.conversationWith?.uid;
        CometChat.deleteConversation(
          conversationWith,
          this.conversationToBeDeleted.conversationType
        )
          .then((deletedConversation) => {
            CometChatConversationEvents.emit(
              "onDeleteConversationSuccess",
              this.conversationToBeDeleted
            );
            this.removeConversation(this.conversationToBeDeleted);
            resolve(deletedConversation);
          })
          .catch((error) => {
            CometChatConversationEvents.emit(
              "onError",
              this.conversationToBeDeleted
            );
            reject(error);
          });
      });
    },
    confirmDelete(conversation) {
      this.conversationToBeDeleted = conversation;
      this.isDelete = true;
    },
    cancelDelete() {
      this.isDelete = false;
    },
    getConversationsList(conversationListManager) {
      return new Promise((resolve, reject) => {
        this.loading = true;
        conversationListManager
          .fetchNextConversation()
          .then((conversations) => {
            this.loading = false;
            resolve(conversations)
          })
          .catch((error) => {
            this.loading = false;
            this.onErrorCallback(error);
            reject(error);
          });
      });
    },
    loginUser() {
      CometChat.getLoggedinUser().then(
        (user) => {
          this.loggedInUser = user;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    setInitialData() {
      this.loginUser();
      this.handlers = {
        onUserOnline: this.handleUsers,
        onUserOffline: this.handleUsers,
        onTextMessageReceived: this.handleMessages,
        onMediaMessageReceived: this.handleMessages,
        onCustomMessageReceived: this.handleMessages,
        onIncomingCallReceived: this.handleMessages,
        onIncomingCallCancelled: this.handleMessages,
        messageEdited: this.handleMessageActions,
        onMessageDeleted: this.handleMessageActions,
        messageRead: this.handleMessageReadActions,
        onMemberAddedToGroup: this.handleGroupMemberAddition,
        onGroupMemberJoined: this.handleGroupMemberAddition,
        onGroupMemberKicked: this.handleGroupMemberRemoval,
        onGroupMemberLeft: this.handleGroupMemberRemoval,
        onGroupMemberBanned: this.handleGroupMemberBan,
        onGroupMemberScopeChanged: this.handleGroupMemberScopeChange,
        onTypingStarted: this.handleTyping,
        onTypingEnded: this.handleTyping,
      };

      this.conversationListManager.attachListeners(this.conversationCallback);

      this.getConversationsList(this.conversationListManager)
        .then((conversations) => {
          if (
            this.conversationList.length === 0 &&
            conversations.length === 0
          ) {
            this.message = localize("NO_CHATS_FOUND");
          } else {
            this.message = "";
          }

          this.conversationList = [...this.conversationList, ...conversations];
        })
        .catch((error) => {
          this.message = localize("SOMETHING_WRONG");
        });
    },
    addCometChatListeners() {
      CometChatConversationEvents.addListener(
        CometChatConversationEvents.onDeleteConversation,
        "onDeleteConversation",
        this.confirmDelete
      );
    },
    removeCometChatListeners() {
      CometChatConversationEvents.removeListener(
        CometChatConversationEvents.onDeleteConversation,
        "onDeleteConversation"
      );
    },
  },
  beforeMount() {
    this.setInitialData();
    this.addCometChatListeners();
  },
  beforeDestroy() {
    this.removeCometChatListeners();
  },
  beforeUnmount() {
    this.removeCometChatListeners();
  },
};
</script>