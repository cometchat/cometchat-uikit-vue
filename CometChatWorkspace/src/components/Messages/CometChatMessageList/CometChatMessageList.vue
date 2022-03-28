<template>
  <div class="chat__list" :style="styles.chatListStyle">
    <div
      v-if="decoratorMessage.length"
      :style="styles.decoratorMessageStyle"
      class="messages__decorator-message"
    >
      <p :style="styles.decoratorMessageTxtStyle" class="decorator-message">
        {{ decoratorMessage }}
      </p>
    </div>

    <div
      class="list__wrapper"
      :style="styles.listWrapperStyle"
      ref="messageListEndRef"
      @scroll="handleScroll"
    >
      <div
        v-for="eachMessage in messageList"
        :key="eachMessage._id || eachMessage.id"
        :class="`message__${eachMessage.type} message__kit__background`"
        :style="styles.messageBubbleStyle(eachMessage)"
      >
        <CometChatMessageBubble
          :key="eachMessage._id || eachMessage.id"
          :messageKey="eachMessage._id || eachMessage.id"
          :messageObject="eachMessage"
          :messageAlignment="messageAlignment"
          :messageTimeAlignment="messageTimeAlignment"
          :loggedInUser="loggedInUser"
          :messageFilterList="messageFilterList"
          :messageStyle="getMessageStyle()"
          :onMessageOptionClick="handleMessageOptionClick"
        />
      </div>
    </div>
  </div>
</template>

<!--eslint-disable-->
<script>
import { CometChat } from "@cometchat-pro/chat";

import {
  DEFAULT_ARRAY_PROP,
  DEFAULT_OBJECT_PROP,
  DEFAULT_STRING_PROP,
  DEFAULT_BOOLEAN_PROP,
} from "../";

import { MessageListManager } from "./controller";

import CometChatActionMessageBubble from "../CometChatActionMessageBubble/CometChatActionMessageBubble";
import CometChatDeleteMessageBubble from "../CometChatDeleteMessageBubble/CometChatDeleteMessageBubble";
import {
  CometChatTextBubble,
  CometChatImageBubble,
  CometChatFileBubble,
  CometChatAudioBubble,
  CometChatVideoBubble,
  CometChatMessageBubble,
} from "../";
import CometChatStickerBubble from "../Extensions/CometChatStickerBubble/CometChatStickerBubble";
import CometChatPollBubble from "../Extensions/CometChatPollBubble/CometChatPollBubble";

import * as style from "./style";
import {
  CometChatLocalize,
  CometChatSoundManager,
  localize,
} from "../../Shared";
import { CometChatMessageEvents } from "../CometChatMessageEvents";
import {
  CometChatCustomMessageTypes,
  CometChatMessageOptions,
  CometChatMessageReceiverType,
  messageAlignment,
  messageConstants,
} from "../CometChatMessageConstants";
import { hasOwnProperty } from "../CometChatMessageHelper";

/**
 * Displays list of messages.
 *
 * @displayName CometChatMessageList
 */
export default {
  name: "CometChatMessageList",
  components: {
    CometChatActionMessageBubble,
    CometChatDeleteMessageBubble,
    CometChatTextBubble,
    CometChatImageBubble,
    CometChatFileBubble,
    CometChatAudioBubble,
    CometChatVideoBubble,
    CometChatStickerBubble,
    CometChatPollBubble,
    CometChatMessageBubble,
  },
  props: {
    width: { ...DEFAULT_STRING_PROP, default: "100%" },
    height: { ...DEFAULT_STRING_PROP, default: "100%" },
    user: { ...DEFAULT_OBJECT_PROP, default: null },
    group: { ...DEFAULT_OBJECT_PROP, default: null },
    parentMessage: { ...DEFAULT_OBJECT_PROP, default: null },
    messageAlignment: { ...DEFAULT_STRING_PROP, default: "standard" },
    messageTimeAlignment: { ...DEFAULT_STRING_PROP, default: "bottom" },
    hideDeletedMessage: { ...DEFAULT_BOOLEAN_PROP, default: false },
    hideGroupActionMessage: { ...DEFAULT_BOOLEAN_PROP, default: false },
    hideCallActionMessage: { ...DEFAULT_BOOLEAN_PROP, default: false },
    messageFilterList: { ...DEFAULT_ARRAY_PROP, default: [] },
    background: { ...DEFAULT_STRING_PROP, default: "white" },
  },
  data() {
    return {
      messageListManager: new MessageListManager(this),
      handlers: {},
      loggedInUser: null,
      messageList: [],
      unreadMessageList: [],
      callbackData: null,
      decoratorMessage: localize("LOADING"),
      chatWith: null,
      chatWithType: null,
      chatWithId: null,
      messageCount: 0,
      lastScrollTop: 0,
    };
  },
  watch: {
    /**
     * One true watcher that updates state on props update.
     */
    propsWatcher: {
      handler(_, { user, group, messageList, parentMessageId, callbackData }) {
        const previousMessages = JSON.stringify(this.messageList);
        const currentMessages = JSON.stringify(messageList);

        if (this.user?.uid !== user?.uid) {
          this.reInitializeMessageBuilder();
        } else if (this.group?.guid !== group?.guid) {
          this.reInitializeMessageBuilder();
        } else if (this.parentMessageId !== parentMessageId) {
          this.reInitializeMessageBuilder();
        } else if (previousMessages !== currentMessages) {
          this.scrollToPosition();
        } else if (this.callbackData !== callbackData) {
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
    propsWatcher() {
      return {
        user: this.user,
        group: this.group,
        messageList: this.messageList,
        parentMessageId: this.parentMessageId,
        callbackData: this.callbackData,
      };
    },
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        chatListStyle: style.chatListStyle(this),
        listWrapperStyle: style.listWrapperStyle(),
        decoratorMessageStyle: style.decoratorMessageStyle(),
        decoratorMessageTxtStyle: style.decoratorMessageTxtStyle(),
        messageBubbleStyle: (eachMessage) =>
          style.messageBubbleStyle(this, this.loggedInUser, eachMessage),
      };
    },
  },
  methods: {
    /**Data set methods starts */
    setCallbackData(data) {
      this.callbackData = data;
    },
    setDecoratorMessage(data) {
      this.decoratorMessage = data;
    },
    setMessageList(data) {
      this.messageList = data;
    },
    setUnreadMessageList(data) {
      this.unreadMessageList = data;
    },
    /**Data set methods ends */
    messageListCallback(listenerName, ...args) {
      this.setCallbackData({ name: listenerName, args: [...args] });
    },
    errorHandler(errorCode) {},
    handleMessageOptionClick(option, message) {
      switch (option.id) {
        case CometChatMessageOptions.edit: {
          CometChatMessageEvents.emit(
            CometChatMessageEvents.previewMessageForEdit,
            message
          );
          break;
        }
        case CometChatMessageOptions.delete: {
          CometChat.deleteMessage(message.id)
            .then((deletedMessage) => {
              this.updateMessageAsDeleted(deletedMessage);
            })
            .catch((error) => this.errorHandler("SOMETHING_WRONG"));
          break;
        }
        case CometChatMessageOptions.translate: {
          break;
        }
        default:
          break;
      }
    },
    translateMessage(message) {
      const messageId = message.id;
      const messageText = message.text;

      let translateToLanguage = CometChatLocalize.getLocale();

      let translatedMessage = "";
      CometChat.callExtension("message-translation", "POST", "v2/translate", {
        msgId: messageId,
        text: messageText,
        languages: [translateToLanguage],
      })
        .then((result) => {
          if (
            hasOwnProperty(result, "language_original") &&
            result["language_original"] !== translateToLanguage
          ) {
            if (
              hasOwnProperty(result, "translations") &&
              result.translations.length
            ) {
              const messageTranslation = result.translations[0];
              if (hasOwnProperty(messageTranslation, "message_translated")) {
                translatedMessage = `\n(${messageTranslation["message_translated"]})`;
              }
            } else {
              //this.actionGenerated(enums.ACTIONS["ERROR"], [], "SOMETHING_WRONG");
            }
          } else {
            //this.actionGenerated(enums.ACTIONS["INFO"], [], "SAME_LANGUAGE_MESSAGE");
          }
        })
        .catch((error) => this.errorHandler("SOMETHING_WRONG"));
    },
    reInitializeMessageBuilder() {
      if (!this.parentMessage || !this.parentMessage.id) {
        this.messageCount = 0;
      }

      this.resetChatWindow();

      this.setDecoratorMessage(localize("LOADING"));
      this.messageListManager.removeListeners();

      if (this.parentMessage && this.parentMessage.id) {
        this.messageListManager = new MessageListManager(this);
      } else {
        this.messageListManager = new MessageListManager(this);
      }

      this.getMessages(this.messageListManager);
    },
    fetchMessages(MessageListManager) {
      const promise = new Promise((resolve, reject) => {
        MessageListManager.fetchPreviousMessages()
          .then((messageList) => {
            resolve(messageList);
          })
          .catch((error) => reject(error));
      });

      return promise;
    },
    getMessages(messageListManager) {
      this.fetchMessages(messageListManager)
        .then((messages) => {
          if (this.messageList.length === 0 && messages.length === 0) {
            this.setDecoratorMessage(localize("NO_MESSAGES_FOUND"));
          } else {
            this.setDecoratorMessage("");
          }

          this.messageHandler(messages, true);
          messageListManager.attachListeners(this.messageListCallback);
        })
        .catch((error) => {
          this.setDecoratorMessage(localize("SOMETHING_WRONG"));
        });
    },
    markMessageAsRead(message) {
      if (!message.readAt) {
        CometChat.markAsRead(message).catch((error) => {});
      }
    },
    handleNewMessages(message) {
      //handling dom lag - increment count only for main message list
      const messageReceivedHandler = (message) => {
        if (
          !message.parentMessageId &&
          (!this.parentMessage || !this.parentMessage.id)
        ) {
          ++this.messageCount;

          //if the user has not scrolled in chat window(scroll is at the bottom of the chat window)
          if (
            this.$refs.messageListEndRef &&
            this.$refs.messageListEndRef.scrollHeight -
              this.$refs.messageListEndRef.scrollTop -
              this.$refs.messageListEndRef.clientHeight <
              20
          ) {
            if (this.messageCount > messageConstants.maximumNumOfMessages) {
              this.reInitializeMessageBuilder();
            } else {
              this.markMessageAsRead(message);
              this.addMessage(message);
              //CometChatMessageEvents.emit(CometChatMessageEvents.messageReceived, message);
              //this.this.actionGenerated(enums.ACTIONS["MESSAGE_RECEIVED"], [message]);
            }
          } else {
            //if the user has scrolled up in chat window
            this.storeMessage(message);
            //CometChatMessageEvents.emit(CometChatMessageEvents.storeMessage, message);
            //this.this.actionGenerated(enums.ACTIONS["NEW_MESSAGES"], [message]);
          }
        } else if (
          this.parentMessage &&
          this.parentMessage.id &&
          message.parentMessageId
        ) {
          if (message.parentMessageId === this.parentMessage.id) {
            this.markMessageAsRead(message);
          }

          this.addMessage(message);
          //CometChatMessageEvents.emit(CometChatMessageEvents.messageReceived, message);
          //this.this.actionGenerated(enums.ACTIONS["MESSAGE_RECEIVED"], [message]);
        } else {
          this.addMessage(message);
          //CometChatMessageEvents.emit(CometChatMessageEvents.messageReceived, message);
          //this.this.actionGenerated(enums.ACTIONS["MESSAGE_RECEIVED"], [message]);
        }
      };

      /**
       * message receiver is chat window group
       */
      if (
        this.chatWithType === CometChatMessageReceiverType.group &&
        message.getReceiverType() === CometChatMessageReceiverType.group &&
        message.getReceiverId() === this.chatWith?.guid
      ) {
        messageReceivedHandler(message);
      } else if (
        this.chatWithType === CometChatMessageReceiverType.user &&
        message.getReceiverType() === CometChatMessageReceiverType.user
      ) {
        /**
         * If the message sender is chat window user and message receiver is logged-in user
         * OR
         * If the message sender is logged-in user and message receiver is chat window user
         */
        if (
          (message.getSender().uid === this.chatWith?.uid &&
            message.getReceiverId() === this.loggedInUser?.uid) ||
          (message.getSender().uid === this.loggedInUser?.uid &&
            message.getReceiverId() === this.chatWith?.uid)
        ) {
          messageReceivedHandler(message);
        }
      }
    },
    handleNewCustomMessages(message) {
      const customMessageReceivedHandler = (message) => {
        //handling dom lag - increment count only for main message list
        if (
          !message.parentMessageId &&
          (!this.parentMessage || !this.parentMessage.id)
        ) {
          ++this.messageCount;

          //if the user has not scrolled in chat window(scroll is at the bottom of the chat window)
          if (
            this.$refs.messageListEndRef &&
            this.$refs.messageListEndRef.scrollHeight -
              this.$refs.messageListEndRef.scrollTop ===
              this.$refs.messageListEndRef.clientHeight
          ) {
            if (this.messageCount > messageConstants.maximumNumOfMessages) {
              this.reInitializeMessageBuilder();
            } else {
              this.markMessageAsRead(message);
              this.addMessage(message);

              //CometChatMessageEvents.emit(CometChatMessageEvents.customMessageReceived, message);
              //this.this.actionGenerated(enums.ACTIONS["CUSTOM_MESSAGE_RECEIVED"], [message]);
            }
          } else {
            //if the user has scrolled in chat window
            this.storeMessage(message);
            //CometChatMessageEvents.emit(CometChatMessageEvents.storeMessage, message);
            //this.this.actionGenerated(enums.ACTIONS["NEW_MESSAGES"], [message]);
          }
        } else if (
          message.parentMessageId &&
          this.parentMessage.id &&
          message.parentMessageId
        ) {
          if (message.parentMessageId === this.parentMessage.id) {
            this.markMessageAsRead(message);
          }
          this.addMessage(message);
          //CometChatMessageEvents.emit(CometChatMessageEvents.customMessageReceived, message);
          //this.this.actionGenerated(enums.ACTIONS["CUSTOM_MESSAGE_RECEIVED"], [message]);
        } else {
          this.addMessage(message);
          //CometChatMessageEvents.emit(CometChatMessageEvents.customMessageReceived, message);
          //this.this.actionGenerated(enums.ACTIONS["CUSTOM_MESSAGE_RECEIVED"], [message]);
        }
      };

      //new custom messages
      if (
        this.chatWithType === CometChatMessageReceiverType.group &&
        message.getReceiverType() === CometChatMessageReceiverType.group &&
        this.loggedInUser.uid === message.getSender().uid &&
        message.getReceiverId() === this.chatWith?.guid &&
        (message.type === CometChatCustomMessageTypes.poll ||
          message.type === CometChatCustomMessageTypes.document ||
          message.type === CometChatCustomMessageTypes.whiteboard)
      ) {
        //showing polls, collaborative document and whiteboard for sender (custom message received listener for sender)
        this.addMessage(message);
        //CometChatMessageEvents.emit(CometChatMessageEvents.customMessageReceived, message);
        //this.this.actionGenerated(enums.ACTIONS["CUSTOM_MESSAGE_RECEIVED"], [message]);
      } else if (
        this.chatWithType === CometChatMessageReceiverType.group &&
        message.getReceiverType() === CometChatMessageReceiverType.group &&
        message.getReceiverId() === this.chatWith?.guid
      ) {
        customMessageReceivedHandler(
          message,
          CometChatMessageReceiverType.group
        );
      } else if (
        this.chatWithType === CometChatMessageReceiverType.user &&
        message.getReceiverType() === CometChatMessageReceiverType.user &&
        message.getSender().uid === this.chatWith?.uid
      ) {
        customMessageReceivedHandler(
          message,
          CometChatMessageReceiverType.user
        );
      } else if (
        this.chatWithType === CometChatMessageReceiverType.user &&
        message.getReceiverType() === CometChatMessageReceiverType.user &&
        this.loggedInUser.uid === message.getSender().uid &&
        message.getReceiverId() === this.chatWith?.uid &&
        (message.type === CometChatCustomMessageTypes.poll ||
          message.type === CometChatCustomMessageTypes.document ||
          message.type === CometChatCustomMessageTypes.whiteboard)
      ) {
        //showing polls, collaborative document and whiteboard for sender (custom message received listener for sender)
        this.addMessage(message);
        //CometChatMessageEvents.emit(CometChatMessageEvents.customMessageReceived, message);
        //this.this.actionGenerated(enums.ACTIONS["CUSTOM_MESSAGE_RECEIVED"], [message]);
      }
    },
    handleMessageDeliveryAndReadReceipt(messageReceipt) {
      //read receipts
      if (
        messageReceipt.getReceiverType() ===
          CometChatMessageReceiverType.user &&
        messageReceipt.getSender().getUid() === this.chatWith?.uid &&
        messageReceipt.getReceiver() === this.loggedInUser.uid
      ) {
        if (messageReceipt.getReceiptType() === "delivery") {
          this.updateMessageAsDelivered(messageReceipt);
          //CometChatMessageEvents.emit(CometChatMessageEvents.messageDelivered, messageReceipt);
          //this.this.actionGenerated(enums.ACTIONS["updateMessageAsDelivered"], messageList);
        } else if (messageReceipt.getReceiptType() === "read") {
          this.updateMessageAsRead(messageReceipt);
          //CometChatMessageEvents.emit(CometChatMessageEvents.messageRead, messageReceipt);
          //this.this.actionGenerated(enums.ACTIONS["updateMessageAsRead"], messageList);
        }
      } else if (
        messageReceipt.getReceiverType() ===
          CometChatMessageReceiverType.group &&
        messageReceipt.getReceiver() === this.chatWith?.guid
      ) {
        //not implemented
      }
    },
    handleMessageDelete(message) {
      if (
        this.chatWithType === CometChatMessageReceiverType.group &&
        message.getReceiverType() === CometChatMessageReceiverType.group &&
        message.getReceiverId() === this.chatWith?.guid
      ) {
        this.updateMessageAsDeleted(message);
        //CometChatMessageEvents.emit(CometChatMessageEvents.messageDeleted, message);
        //this.this.actionGenerated(enums.ACTIONS["ON_MESSAGE_DELETED"], [message]);
      } else if (
        this.chatWith === CometChatMessageReceiverType.user &&
        message.getReceiverType() === CometChatMessageReceiverType.user &&
        message.getSender().uid === this.chatWith?.uid
      ) {
        this.updateMessageAsDeleted(message);
        //CometChatMessageEvents.emit(CometChatMessageEvents.messageDeleted, message);
        //this.this.actionGenerated(enums.ACTIONS["ON_MESSAGE_DELETED"], [message]);
      }
    },
    handleMessageEdit(message) {
      if (
        this.chatWithType === CometChatMessageReceiverType.group &&
        message.getReceiverType() === CometChatMessageReceiverType.group &&
        message.getReceiverId() === this.chatWith?.guid
      ) {
        this.updateMessage(message);
        //CometChatMessageEvents.emit(CometChatMessageEvents.messageEdited, message);
        //this.this.actionGenerated(enums.ACTIONS["ON_MESSAGE_EDITED"], messageList, newMessageObj);
      } else if (
        this.chatWithType === CometChatMessageReceiverType.user &&
        message.getReceiverType() === CometChatMessageReceiverType.user &&
        this.loggedInUser.uid === message.getReceiverId() &&
        message.getSender().uid === this.chatWith?.uid
      ) {
        this.updateMessage(message);
        //CometChatMessageEvents.emit(CometChatMessageEvents.messageEdited, message);
        //this.this.actionGenerated(enums.ACTIONS["ON_MESSAGE_EDITED"], messageList, newMessageObj);
      } else if (
        this.chatWithType === CometChatMessageReceiverType.user &&
        message.getReceiverType() === CometChatMessageReceiverType.user &&
        this.loggedInUser.uid === message.getSender().uid &&
        message.getReceiverId() === this.chatWith?.uid
      ) {
        this.updateMessage(message);
        //CometChatMessageEvents.emit(CometChatMessageEvents.messageEdited, message);
        //this.this.actionGenerated(enums.ACTIONS["ON_MESSAGE_EDITED"], messageList, newMessageObj);
      }
    },
    handleNewGroupActionMessage(message) {
      if (
        this.chatWithType === CometChatMessageReceiverType.group &&
        message.getReceiverType() === CometChatMessageReceiverType.group &&
        message.getReceiverId() === this.chatWith?.guid
      ) {
        this.addGroupActionMessage(message);
        //CometChatMessageEvents.emit(CometChatMessageEvents.groupActionMessageReceived, message);
        //this.this.actionGenerated(key, message, null, group, options);
      }
    },
    handleNewCallActionMessage(message) {
      if (
        this.chatWithType === CometChatMessageReceiverType.group &&
        message.getReceiverType() === CometChatMessageReceiverType.group &&
        message.getReceiverId() === this.chatWith?.guid
      ) {
        this.addCallActionMessage(message);
        //CometChatMessageEvents.emit(CometChatMessageEvents.callActionMessageReceived, message);
        //this.this.actionGenerated(enums.ACTIONS["MESSAGE_RECEIVED"], [message]);
      } else if (
        this.chatWithType === CometChatMessageReceiverType.user &&
        message.getReceiverType() === CometChatMessageReceiverType.user &&
        message.getSender().uid === this.chatWith?.uid
      ) {
        this.addCallActionMessage(message);
        //CometChatMessageEvents.emit(CometChatMessageEvents.callActionMessageReceived, message);
        //this.this.actionGenerated(enums.ACTIONS["MESSAGE_RECEIVED"], [message]);
      }
    },
    messageHandler(messagelist, scroll) {
      try {
        this.messageCount = messagelist.length;

        messagelist.forEach((message) => {
          //if the sender of the message is not the loggedin user, mark the message as read.
          if (
            message.getSender().getUid() !== this.loggedInUser?.uid &&
            !message.readAt
          ) {
            if (message.getReceiverType() === CometChat.RECEIVER_TYPE.USER) {
              CometChat.markAsRead(message).catch((error) => {});
              CometChatMessageEvents.emit(
                CometChatMessageEvents.markMessageAsRead,
                message
              );

              //this.this.actionGenerated(enums.ACTIONS["MESSAGE_READ"], message);
            } else if (
              message.getReceiverType() === CometChatMessageReceiverType.group
            ) {
              CometChat.markAsRead(message).catch((error) => {});
              CometChatMessageEvents.emit(
                CometChatMessageEvents.markMessageAsRead,
                message
              );

              //this.this.actionGenerated(enums.ACTIONS["MESSAGE_READ"], message);
            }
          }
        });

        //lastScrollTop = messageListEndRef.scrollHeight;

        //update message list
        this.populateMessages(messagelist);
        if (scroll) {
          this.scrollToBottom();
        }

        //scrollToBottom ? populateMessagesAndScrollToBottom(messagelist) : populateMessages(messagelist);
        //CometChatMessageEvents.emit(emitAction, messagelist);

        //abort(don't return messagelist), when the chat window changes
        // if (prevChatWithIdRef && prevChatWithIdRef.current && prevChatWithIdRef.current === this.chatWithId) {
        //     CometChatMessageEvents.emit(emitAction, messagelist);
        //     //this.this.actionGenerated(enums.ACTIONS["MESSAGES_FETCHED"], messageList);
        // }
      } catch (e) {
        console.log(e);
      }
    },
    scrollToBottom(scrollHeight = 0) {
      this.$nextTick(() => {
        if (this.$refs && this.$refs.messageListEndRef) {
          this.$refs.messageListEndRef.scrollTop =
            this.$refs.messageListEndRef.scrollHeight - scrollHeight;
        }
      });
    },
    scrollToPosition() {
      this.scrollToBottom(this.lastScrollTop);
    },
    handleScroll(event) {
      this.$nextTick(() => {
        try {
          const scrollTop = event.currentTarget.scrollTop;
          const scrollHeight = event.currentTarget.scrollHeight;
          const clientHeight = event.currentTarget.clientHeight;

          this.lastScrollTop = scrollHeight - scrollTop;

          if (this.lastScrollTop === clientHeight) {
            this.scrolledToBottom();
            CometChatMessageEvents.emit(
              CometChatMessageEvents.scrolledToBottom,
              event
            );
          }

          const top = Math.round(scrollTop) === 0;
          if (top && this.messageList.length) {
            this.fetchMessages(this.messageListManager)
              .then((messageList) => this.messageHandler(messageList, false))
              .catch((error) => {
                //setDecoratorMessage(localize("SOMETHING_WRONG"));
              });
          }
        } catch (error) {
          this.logError("Error in scrolling", error);
        }
      });
    },
    draftMessage(message) {},
    /**
     * new text and custom message
     */
    addMessage(message) {
      CometChatSoundManager.play(CometChatSoundManager.Sound.outgoingMessage);

      if (message.parentMessageId) {
        this.updateRepliesCount(message);
      } else {
        this.appendMessage(message);
      }
    },
    /** Update replies count in the parent message */
    updateRepliesCount(message) {
      let messagelist = [...this.messageList];
      let messageKey = messagelist.findIndex(
        (m) => m.id === message.parentMessageId
      );
      if (messageKey > -1) {
        //const messageObject = new CometChat.BaseMessage({ ...this.messageList[messageKey] });
        const messageObject = { ...this.messageList[messageKey] };

        let replyCount = messageObject.getReplyCount()
          ? messageObject.getReplyCount()
          : 0;
        replyCount = replyCount + 1;
        messageObject.setReplyCount(replyCount);

        messagelist.splice(messageKey, 1, messageObject);
        this.setMessageList(messagelist);
      }
    },
    /** Append message to the message list and scroll to the bottom */
    appendMessage(message) {
      const messagelist = [...this.messageList];
      messagelist.push(message);
      this.setMessageList(messagelist);
      this.scrollToBottom();

      //setScrollToBottom(true);
    },
    storeMessage(message) {
      let unreadmessagelist = [...this.unreadMessageList];
      unreadmessagelist.push(message);
      this.setUnreadMessageList(unreadmessagelist);
    },
    /**
     * Update message as sent; show single grey tick
     */
    updateMessageAsSent(message) {
      const messagelist = [...this.messageList];

      let messageKey = messagelist.findIndex((m) => m._id === message._id);
      if (messageKey > -1) {
        const messageObject = { ...message };

        messagelist.splice(messageKey, 1, messageObject);
        messagelist.sort((a, b) => a.id - b.id);

        this.setMessageList(messagelist);
        this.scrollToBottom();
      }
    },
    /**
     * Update message as delivered; show double grey tick
     */
    updateMessageAsDelivered(message) {
      const messagelist = [...this.messageList];
      let messageKey = messagelist.findIndex((m) => m.id === message.messageId);
      if (messageKey > -1) {
        //const messageObject = new CometChat.BaseMessage({ ...this.messageList[messageKey] });
        const messageObject = { ...this.messageList[messageKey] };
        messageObject["deliveredAt"] = message.getDeliveredAt();
        messagelist.splice(messageKey, 1, messageObject);
        this.setMessageList(messagelist);
      }
    },
    /**
     * Update message as read; show double blue tick
     */
    updateMessageAsRead(message) {
      const messagelist = [...this.messageList];
      let messageKey = messagelist.findIndex((m) => m.id === message.messageId);

      if (messageKey > -1) {
        //const messageObject = new CometChat.BaseMessage({ ...this.messageList[messageKey] });

        const messageObject = { ...this.messageList[messageKey] };
        messageObject["readAt"] = message.getReadAt();
        messagelist.splice(messageKey, 1, messageObject);
        this.setMessageList(messagelist);

        //setScrollToBottom(false);
      }
    },
    /**
     * Update message as deleted; show deleted message bubble
     */
    updateMessageAsDeleted(message) {
      const messages = [...this.messageList];
      let messageKey = messages.findIndex((m) => m.id === message.id);
      if (messageKey > -1) {
        if (this.hideDeletedMessage) {
          messages.splice(messageKey, 1);
        } else {
          const messageObject = { ...messages[messageKey], ...message };
          //const newMessageObject = getCometChatMessage(messageObject);
          //newMessageObject.setDeletedAt(newMessageObject.getDeletedAt());
          messages.splice(messageKey, 1, messageObject);
        }

        this.setMessageList(messages);
        //setScrollToBottom(false);
      }
    },
    /**
     * Update message
     */
    updateMessage(message) {
      const messagelist = [...this.messageList];
      let messageKey = messagelist.findIndex((m) => m.id === message.id);

      if (messageKey > -1) {
        const messageObject = { ...this.messageList[messageKey], ...message };
        messagelist.splice(messageKey, 1, messageObject);

        this.setMessageList(messagelist);
        //setScrollToBottom(false);
      }
    },
    /**
     * append group action message
     */
    addGroupActionMessage(message) {
      if (this.hideGroupActionMessage) {
        return false;
      }

      this.appendMessage(message);
    },
    /**
     * append group action message
     */
    addCallActionMessage(message) {
      if (this.hideCallActionMessage) {
        return false;
      }

      this.appendMessage(message);
    },
    /**
     * update message list
     */
    populateMessages(messages) {
      const messagelist = [...messages, ...this.messageList];
      this.setMessageList(messagelist);
    },
    /**
     * update message list and scroll to bottom
     */
    // populateMessagesAndScrollToBottom(messages) {
    // 	const messagelist = [...this.messageList, ...messages];
    // 	this.setMessageList(messagelist);
    // 	this.setScrollToBottom(true);
    // },

    /**
     * Upon scrolling to bottom, reload the chat if messages cross the maximum count,
     * or else render and update (mark them as read) the stored messages
     */
    scrolledToBottom() {
      if (!this.unreadMessageList.length) {
        return false;
      }

      let unreadMessages = [...this.unreadMessageList];
      let messages = [...this.messageList];
      messages = messages.concat(unreadMessages);

      if (messages.length > messageConstants.maximumNumOfMessages) {
        this.reInitializeMessageBuilder();
      } else {
        this.updateStoredMessages();
      }
    },
    /**
     * upon scrolling to the bottom, update the unread messagess
     */
    updateStoredMessages() {
      let unreadMessages = [...this.unreadMessageList];
      let messages = [...this.messageList];

      unreadMessages.forEach((unreadMessage) => {
        //if (unreadMessage.receiverType === CometChat.RECEIVER_TYPE.USER || unreadMessage.receiverType === CometChat.RECEIVER_TYPE.GROUP) {
        messages.push(unreadMessage);
        this.markMessageAsRead(unreadMessage);
        //}
      });

      this.setMessageList(messages);
      this.setUnreadMessageList([]);
      this.scrollToBottom();
    },
    /**
     * reset message list
     */
    resetChatWindow() {
      this.setMessageList([]);
    },
    getMessageStyle(eachMessage) {
      let messageStyle = {};
      if (
        this.messageAlignment === messageAlignment.standard &&
        this.loggedInUser?.uid === eachMessage?.sender?.uid
      ) {
        messageStyle = {
          backgroundColor: "#39f",
          textColor: "#fff",
          textFont: "14px Inter, sans-serif",
          subTitleColor: "rgb(20,20,20)",
          subTitleFont: "14px Inter, sans-serif",
          cornerRadius: "12px",
          iconTint: "#fff",
          usernameFont: "600 13px Inter",
          usernameColor: "#3399ff",
          pollStyle: {
            voteCountColor: "#fff",
            voteCountFont: "400 13px Inter,sans-serif",
            pollOptionsFont: "400 15px Inter,sans-serif",
            pollOptionsColor: "#fff",
            pollOptionsBackgroundColor: "#fff",
          },
          documentStyle: {
            title: localize("SHARED_COLLABORATIVE_DOCUMENT"),
            titleFont: "14px Inter, sans-serif",
            titleColor: "#fff",
            buttonText: localize("LAUNCH"),
            buttonTextColor: "#39f",
            buttonTextFont: "600 14px Inter,sans-serif",
            buttonBackgroundColor: "#fff",
            iconColor: "#fff",
          },
          whiteboardStyle: {
            title: localize("CREATED_WHITEBOARD"),
            titleFont: "14px Inter, sans-serif",
            titleColor: "#fff",
            buttonText: localize("LAUNCH"),
            buttonTextColor: "#39f",
            buttonTextFont: "600 14px Inter,sans-serif",
            buttonBackgroundColor: "#fff",
            iconColor: "#fff",
          },
        };
      } else {
        messageStyle = {
          backgroundColor: "rgb(246, 246, 246)",
          textColor: "rgb(20, 20, 20)",
          textFont: "14px Inter, sans-serif",
          subTitleColor: "rgb(20,20,20)",
          subTitleFont: "14px Inter, sans-serif",
          cornerRadius: "12px",
          iconTint: "#39f",
          usernameFont: "600 13px Inter",
          usernameColor: "#3399ff",
          pollStyle: {
            voteCountColor: "rgb(20, 20, 20)",
            voteCountFont: "400 13px Inter,sans-serif",
            pollOptionsFont: "400 15px Inter,sans-serif",
            pollOptionsColor: "rgb(20, 20, 20)",
            pollOptionsBackgroundColor: "#fff",
          },
          documentStyle: {
            title: localize("SHARED_COLLABORATIVE_DOCUMENT"),
            titleFont: "14px Inter, sans-serif",
            titleColor: "rgb(20, 20, 20)",
            buttonText: localize("JOIN"),
            buttonTextColor: "#39f",
            buttonTextFont: "600 14px Inter,sans-serif",
            buttonBackgroundColor: "#fff",
            iconColor: "#39f",
          },
          whiteboardStyle: {
            title: localize("SHARED_COLLABORATIVE_WHITEBOARD"),
            titleFont: "14px Inter, sans-serif",
            titleColor: "rgb(20, 20, 20)",
            buttonText: localize("JOIN"),
            buttonTextColor: "#39f",
            buttonTextFont: "600 14px Inter,sans-serif",
            buttonBackgroundColor: "#fff",
            iconColor: "#39f",
          },
        };
      }

      return messageStyle;
    },
    setInitialData() {
      this.handlers = {
        onTextMessageReceived: this.handleNewMessages,
        onMediaMessageReceived: this.handleNewMessages,
        onCustomMessageReceived: this.handleNewCustomMessages,
        onMessagesDelivered: this.handleMessageDeliveryAndReadReceipt,
        onMessagesRead: this.handleMessageDeliveryAndReadReceipt,
        onMessageDeleted: this.handleMessageDelete,
        onMessageEdited: this.handleMessageEdit,
        onGroupMemberScopeChanged: this.handleNewGroupActionMessage,
        onGroupMemberKicked: this.handleNewGroupActionMessage,
        onGroupMemberBanned: this.handleNewGroupActionMessage,
        onGroupMemberUnbanned: this.handleNewGroupActionMessage,
        onMemberAddedToGroup: this.handleNewGroupActionMessage,
        onGroupMemberLeft: this.handleNewGroupActionMessage,
        onGroupMemberJoined: this.handleNewGroupActionMessage,
        onIncomingCallReceived: this.handleNewCallActionMessage,
        onIncomingCallCancelled: this.handleNewCallActionMessage,
        onOutgoingCallAccepted: this.handleNewCallActionMessage,
        onOutgoingCallRejected: this.handleNewCallActionMessage,
      };
      CometChat.getLoggedinUser().then((user) => (this.loggedInUser = user));

      if (this.user && this.user.uid) {
        this.chatWithType = CometChatMessageReceiverType.user;
        this.chatWith = this.user;
      } else if (this.group && this.group.guid) {
        this.chatWithType = CometChatMessageReceiverType.group;
        this.chatWith = this.group;
      }

      this.getMessages(this.messageListManager);
    },
  },
  beforeMount() {
    this.setInitialData();
  },
};
</script>