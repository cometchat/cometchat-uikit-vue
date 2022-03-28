<template>
  <div :style="styles.chatComposerStyle" class="chat__composer">
    <CometChatMessagePreview
      v-if="messagePreview"
      :messageObject="messagePreview.message"
      :onClose="closeMessagePreview"
    />
    <CometChatStickerKeyboard
      v-if="viewStickerTray"
      @click="sendSticker"
      :onClose="toggleStickersTray"
    />
    <CometChatEmojiKeyboard
      v-if="viewEmojiTray"
      :emojiClicked="onEmojiSelect"
    />
    <CometChatActionSheet
      v-if="viewActionSheet"
      :title="'Add to Chat'"
      :width="'305px'"
      :actions="actionSheetItems"
      :style="{
        position: 'absolute',
        zIndex: '3',
        left: '35px',
        bottom: '55px',
      }"
    />
    <input
      type="file"
      ref="fileInputRef"
      :style="styles.fileInputStyle"
      @change="fileInputChangeHandler"
    />
    <div :style="styles.composerInputStyle" class="composer__input">
      <div tabIndex="-1" :style="styles.inputInnerStyle" class="input__inner">
        <div
          :style="styles.messageInputStyle"
          class="input__message-input"
          contentEditable="true"
          :placeholder="placeholder"
          :dir="CometChatLocalize.getDir()"
          @input="inputChangeHandler"
          @blur="(event) => endTyping(event)"
          @keydown="sendMessageOnEnter"
          ref="messageInputRef"
        ></div>
        <div :style="styles.inputStickyStyle" class="input__sticky">
          <div
            v-if="viewAttachButton"
            :style="styles.stickyAttachButtonStyle"
            class="attachment__icon"
            @click="attachmentClickHandler"
            :title="CometChatLocalize.localize('ATTACH')"
          >
            <i :style="styles.attchButtonIconStyle"></i>
          </div>
          <div class="input__sticky__buttons" :style="styles.stickyButtonStyle">
            <div
              v-if="viewSticker"
              :title="CometChatLocalize.localize('STICKER')"
              :style="styles.stickerBtnStyle"
              class="button__sticker"
              @click="stickerClickHandler"
            >
              <i :style="styles.stickerBtnIconStyle"></i>
            </div>
            <div
              v-if="!this.hideEmoji"
              :title="CometChatLocalize.localize('EMOJI')"
              :style="styles.emojiButtonStyle"
              class="button__emoji"
              @click="emojiClickHandler"
            >
              <i :style="styles.emojiBtnIconStyle"></i>
            </div>
            <div
              v-if="!this.hideLiveReaction"
              :title="CometChatLocalize.localize('LIVE_REACTION')"
              :style="styles.reactionBtnStyle"
              class="button__reactions"
              @click="shareLiveReaction"
            >
              <i :title="liveReaction" :style="styles.reactionBtnIconStyle">
                {{ liveReaction }}
              </i>
            </div>
            <div
              v-if="messageInput.length"
              :title="CometChatLocalize.localize('SEND_MESSAGE')"
              :style="styles.sendButtonStyle"
              class="button__send"
              @click="sendTextMessage"
            >
              <i :style="styles.sendBtnIconStyle"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CometChatBackdrop :isOpen="viewCreatePoll">
      <CometChatCreatePoll
        :user="user"
        :group="group"
        :onClose="closeCreatePoll"
        :onSubmit="onPollSubmit"
      />
    </CometChatBackdrop>
  </div>
</template>
<script>
import { CometChat } from "@cometchat-pro/chat";
import {
  DEFAULT_ARRAY_PROP,
  DEFAULT_BOOLEAN_PROP,
  DEFAULT_OBJECT_PROP,
  DEFAULT_STRING_PROP,
} from "../";

import CometChatCreatePoll from "../Extensions/CometChatCreatePoll/CometChatCreatePoll";
import CometChatStickerKeyboard from "../CometChatStickerKeyboard/CometChatStickerKeyboard";

import { outgoingMessageAlert } from "../../../resources/audio/";

import roundedPlus from "./resources/add-circle-filled.svg";
import insertEmoticon from "./resources/emoji.svg";
import sendBtn from "./resources/send-message.svg";
// import stickerIcon from "./resources/stickers.svg";
import fileUploadIcon from "./resources/file-upload.svg";
import imageUploadIcon from "./resources/image.svg";
import audioUploadIcon from "./resources/audio-file.svg";
import videoUploadIcon from "./resources/video.svg";
import sharePollIcon from "./resources/polls.svg";
import shareCDocumentIcon from "./resources/collaborative-document.svg";
import shareCWhiteboardIcon from "./resources/collaborative-whiteboard.svg";
import shareLocationIcon from "./resources/location.svg";

import * as style from "./style";
import CometChatManager from "../../../util/controller";
import {
  CometChatCustomMessageTypes,
  CometChatMessageReceiverType,
  CometChatMessageTypes,
  messageConstants,
  messageStatus,
  metadataKey,
} from "../CometChatMessageConstants";
import { CometChatLocalize, CometChatSoundManager } from "../../Shared";
import CometChatMessagePreview from "../CometChatMessagePreview/CometChatMessagePreview";
import { CometChatActionSheet, CometChatBackdrop } from "../../Shared";
import CometChatEmojiKeyboard from "../CometChatEmojiKeyboard/CometChatEmojiKeyboard";
import {
  getExtensionsData,
  getUnixTimestamp,
  hasOwnProperty,
  ID,
} from "../CometChatMessageHelper";
import { CometChatMessageEvents } from "../CometChatMessageEvents";

/**
 * Used for composing all messages.
 *
 * @displayName CometChatMessageComposer
 */
export default {
  name: "CometChatMessageComposer",
  components: {
    CometChatCreatePoll,
    CometChatStickerKeyboard,
    CometChatMessagePreview,
    CometChatEmojiKeyboard,
    CometChatActionSheet,
    CometChatBackdrop,
  },
  props: {
    width: { ...DEFAULT_STRING_PROP, default: "100%" },
    height: { ...DEFAULT_STRING_PROP, default: "105px" },
    background: { ...DEFAULT_STRING_PROP, default: "rgb(255, 255, 255)" },
    border: { ...DEFAULT_STRING_PROP, default: "1px solid rgb(234, 234, 234)" },
    cornerRadius: { ...DEFAULT_STRING_PROP, default: "0 0 8px 8px" },
    inputCornerRadius: { ...DEFAULT_STRING_PROP, default: "8px" },
    placeholder: { ...DEFAULT_STRING_PROP, default: "Enter your message here" },
    placeholderFont: {
      ...DEFAULT_STRING_PROP,
      default: "400 15px Inter, sans-serif",
    },
    placeholderColor: {
      ...DEFAULT_STRING_PROP,
      default: "rgba(20, 20, 20, 0.6)",
    },
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
    hideAttachment: { ...DEFAULT_BOOLEAN_PROP, default: false },
    attachmentIconURL: { ...DEFAULT_STRING_PROP, default: roundedPlus },
    attachmentIconTint: {
      ...DEFAULT_STRING_PROP,
      default: "rgba(20, 20, 20, 0.46)",
    },
    hideMicrophone: { ...DEFAULT_BOOLEAN_PROP, default: true },
    microphoneIconURL: { ...DEFAULT_STRING_PROP, default: "" },
    microphoneIconTint: {
      ...DEFAULT_STRING_PROP,
      default: "rgba(20, 20, 20, 0.46)",
    },
    sendButtonIconURL: { ...DEFAULT_STRING_PROP, default: sendBtn },
    sendButtonIconTint: { ...DEFAULT_STRING_PROP, default: "#39f" },
    typingIndicator: { ...DEFAULT_BOOLEAN_PROP, default: true },
    user: { ...DEFAULT_OBJECT_PROP, default: null },
    group: { ...DEFAULT_OBJECT_PROP, default: null },
    messageFilterList: { ...DEFAULT_ARRAY_PROP, default: [] },
  },
  data() {
    return {
      loggedInUser: null,
      chatWith: null,
      chatWithId: null,
      messageInput: "",
      viewComposer: false,
      viewAttachButton: false,
      viewSticker: false,
      stickerTemplate: null,
      viewStickerTray: null,
      viewActionSheet: false,
      actionSheetItems: [],
      viewCreatePoll: false,
      viewEmojiTray: false,
      messagePreview: null,
      isTyping: null,
      liveReactionTimeout: 0,
      disabled: false,
    };
  },
  watch: {
    /**
     * Focuses the input anytime the selected item changes.
     */
    user: {
      handler() {
        if(Object.keys(this.user).length) {
          this.chatWithId = this.user?.uid;
          this.chatWith = CometChatMessageReceiverType.user;
        }
      },
      immediate: true,
    },
    group: {
      handler() {
        if(Object.keys(this.group).length) {
          this.chatWithId = this.group?.guid;
          this.chatWith = CometChatMessageReceiverType.group;
        }
      },
      immediate: true,
    },
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        chatComposerStyle: style.chatComposerStyle(this),
        composerInputStyle: style.composerInputStyle(this),
        inputInnerStyle: style.inputInnerStyle(this),
        messageInputStyle: style.messageInputStyle(this, this.disabled),
        inputStickyStyle: style.inputStickyStyle(
          this.disabled,
          this.viewAttachButton
        ),
        stickyAttachmentStyle: style.stickyAttachmentStyle(),
        attachmentIconStyle: style.attachmentIconStyle(),
        // filePickerStyle: style.filePickerStyle(this.state),
        fileListStyle: style.fileListStyle(),
        fileItemStyle: style.fileItemStyle(),
        stickyAttachButtonStyle: style.stickyAttachButtonStyle(),
        attchButtonIconStyle: style.attchButtonIconStyle(this),
        stickyButtonStyle: style.stickyButtonStyle(),
        emojiButtonStyle: style.emojiButtonStyle(),
        emojiBtnIconStyle: style.emojiBtnIconStyle(this),
        sendButtonStyle: style.sendButtonStyle(),
        sendBtnIconStyle: style.sendBtnIconStyle(this),
        reactionBtnStyle: style.reactionBtnStyle(),
        reactionBtnIconStyle: style.reactionBtnIconStyle(this),
        stickerBtnStyle: style.stickerBtnStyle(),
        stickerBtnIconStyle: style.stickerBtnIconStyle(
          this,
          this.stickerTemplate
        ),
        fileInputStyle: style.fileInputStyle(),
      };
    },
    CometChatLocalize() {
      return CometChatLocalize;
    },
  },
  methods: {
    getMessageFilterData() {
      if(Object.keys(this.user).length) {
        this.chatWithId = this.user?.uid;
        this.chatWith = CometChatMessageReceiverType.user;
      } else if(Object.keys(this.group).length) {
        this.chatWithId = this.group?.guid;
        this.chatWith = CometChatMessageReceiverType.group;
      }
      
      //if message filter list is empty, hide attachment icon and show message input box
      if (this.messageFilterList.length === 0) {
        this.viewComposer = true;
        if (!this.hideAttachment) {
          this.viewAttachButton = false;
        }
      }

      //if stickers is part of message filter list
      const stickerMessageTemplate = this.messageFilterList.find(
        (messageTemplate) => {
          messageTemplate.type === CometChatCustomMessageTypes.sticker;
        }
      );
      if (stickerMessageTemplate) {
        this.viewSticker = true;
        this.stickerTemplate = stickerMessageTemplate;
      }

      const actionItemFont = "400 13px Inter, sans-serif";
      const actionItemColor = "#141414";
      const actionItemIconTint = "#fff";

      const actionItems = [];
      this.messageFilterList.forEach((eachMessageTemplate) => {
        const actionItemCallback = eachMessageTemplate.actionCallback
          ? eachMessageTemplate.actionCallback
          : this.actionSheetClickHandler;

        switch (eachMessageTemplate.type) {
          case CometChatMessageTypes.file: {
            actionItems.push({
              id: CometChatMessageTypes.file,
              iconURL: eachMessageTemplate.icon || fileUploadIcon,
              iconTint: actionItemIconTint,
              title: eachMessageTemplate.name,
              titleFont: actionItemFont,
              titleColor: actionItemColor,
              onActionItemClick: actionItemCallback,
            });
            break;
          }
          case CometChatMessageTypes.image: {
            actionItems.push({
              id: CometChatMessageTypes.image,
              iconURL: eachMessageTemplate.icon || imageUploadIcon,
              iconTint: actionItemIconTint,
              title: eachMessageTemplate.name,
              titleFont: actionItemFont,
              titleColor: actionItemColor,
              onActionItemClick: actionItemCallback,
            });
            break;
          }
          case CometChatMessageTypes.audio: {
            actionItems.push({
              id: CometChatMessageTypes.audio,
              iconURL: eachMessageTemplate.icon || audioUploadIcon,
              iconTint: actionItemIconTint,
              title: eachMessageTemplate.name,
              titleFont: actionItemFont,
              titleColor: actionItemColor,
              onActionItemClick: actionItemCallback,
            });
            break;
          }
          case CometChatMessageTypes.video: {
            actionItems.push({
              id: CometChatMessageTypes.video,
              iconURL: eachMessageTemplate.icon || videoUploadIcon,
              iconTint: actionItemIconTint,
              title: eachMessageTemplate.name,
              titleFont: actionItemFont,
              titleColor: actionItemColor,
              onActionItemClick: actionItemCallback,
            });
            break;
          }
          case CometChatCustomMessageTypes.poll: {
            actionItems.push({
              id: CometChatCustomMessageTypes.poll,
              iconURL: eachMessageTemplate.icon || sharePollIcon,
              iconTint: actionItemIconTint,
              title: eachMessageTemplate.name,
              titleFont: actionItemFont,
              titleColor: actionItemColor,
              onActionItemClick: actionItemCallback,
            });
            break;
          }
          case CometChatCustomMessageTypes.document: {
            actionItems.push({
              id: CometChatCustomMessageTypes.document,
              iconURL: eachMessageTemplate.icon || shareCDocumentIcon,
              iconTint: actionItemIconTint,
              title: eachMessageTemplate.name,
              titleFont: actionItemFont,
              titleColor: actionItemColor,
              onActionItemClick: actionItemCallback,
            });
            break;
          }
          case CometChatCustomMessageTypes.whiteboard: {
            actionItems.push({
              id: CometChatCustomMessageTypes.whiteboard,
              iconURL: eachMessageTemplate.icon || shareCWhiteboardIcon,
              iconTint: actionItemIconTint,
              title: eachMessageTemplate.name,
              titleFont: actionItemFont,
              titleColor: actionItemColor,
              onActionItemClick: actionItemCallback,
            });
            break;
          }
          case CometChatCustomMessageTypes.location: {
            actionItems.push({
              id: CometChatCustomMessageTypes.location,
              iconURL: eachMessageTemplate.icon || shareLocationIcon,
              iconTint: actionItemIconTint,
              title: eachMessageTemplate.name,
              titleFont: actionItemFont,
              titleColor: actionItemColor,
              onActionItemClick: actionItemCallback,
            });
            break;
          }
          case CometChatMessageTypes.text:
          case CometChatCustomMessageTypes.sticker:
            break;
          default:
            actionItems.push({
              id: eachMessageTemplate.type,
              iconURL: eachMessageTemplate?.icon,
              iconTint: actionItemIconTint,
              title: eachMessageTemplate.name,
              titleFont: actionItemFont,
              titleColor: actionItemColor,
              onActionItemClick: eachMessageTemplate?.actionCallback,
            });
            break;
        }
      });

      //if message filters are set, show attachment button
      if (actionItems.length && !this.hideAttachment) {
        this.viewAttachButton = true;
        this.actionSheetItems = actionItems;
      }
    },
    previewMessageForEdit(message) {
      this.messagePreview = {
        message: message,
        mode: "edit",
      };

      this.messageInput = message;

      const element = this.$refs.messageInputRef;
      let messageText = message.text;

      //xss extensions data
      const xssData = getExtensionsData(
        message,
        metadataKey.extensions.xssfilter
      );
      if (
        xssData &&
        hasOwnProperty(xssData, "sanitized_text") &&
        hasOwnProperty(xssData, "hasXSS") &&
        xssData.hasXSS === "yes"
      ) {
        messageText = xssData.sanitized_text;
      }

      element.focus();
      element.textContent = "";
      this.pasteHtmlAtCaret(messageText, false);
    },
    closeMessagePreview() {
      this.messagePreview = null;
    },
    draftMessage(message) {
      this.messageInput = message;
    },
    sendMessageOnEnter(event) {
      if (event.keyCode === 13 && !event.shiftKey) {
        event.preventDefault();
        this.sendTextMessage();
      }
    },
    sendTextMessage() {
      this.viewEmojiTray = false;

      if (!this.messageInput.trim().length) {
        return false;
      }

      if (this.messagePreview && this.messagePreview.mode === "edit") {
        this.editMessage = this.messagePreview.message;
        return false;
      }
          
      let textMessage = new CometChat.TextMessage(
        this.chatWithId,
        this.messageInput,
        this.chatWith
      );
      // if (this.this.parentMessageId) {
      // 	textMessage.setParentMessageId(this.this.parentMessageId);
      // }
      textMessage.setSender(this.loggedInUser);
      textMessage.setReceiver(this.chatWith);
      textMessage.setText(this.messageInput);
      textMessage._composedAt = getUnixTimestamp();
      textMessage._id = ID();
      CometChatMessageEvents.emit(CometChatMessageEvents.onMessageSent, {
        message: textMessage,
        status: messageStatus.inprogress,
      });
      CometChatSoundManager.play(CometChatSoundManager.Sound.outgoingMessage);
      this.endTyping();
      this.messageInput = "";
      this.$refs.messageInputRef.textContent = "";

      CometChat.sendMessage(textMessage)
        .then((message) => {
          const messageObject = { ...message, _id: textMessage._id };
          CometChatMessageEvents.emit(CometChatMessageEvents.onMessageSent, {
            message: messageObject,
            status: messageStatus.success,
          });
        })
        .catch((error) => {
          CometChatMessageEvents.emit(CometChatMessageEvents.onMessageError, {
            message: textMessage,
            error: error,
          });
        });
    },
    sendMediaMessage(messageInput, messageType) {
      this.viewActionSheet = false;

      let mediaMessage = new CometChat.MediaMessage(
        this.chatWithId,
        messageInput,
        messageType,
        this.chatWith
      );
      // if (this.this.parentMessageId) {
      // 	mediaMessage.setParentMessageId(this.this.parentMessageId);
      // }
      mediaMessage.setSender(this.loggedInUser);
      mediaMessage.setReceiver(this.chatWith);
      mediaMessage.setType(messageType);
      mediaMessage.setMetadata({
        [metadataKey.file]: messageInput,
      });
      mediaMessage._composedAt = getUnixTimestamp();
      mediaMessage._id = ID();
      CometChatMessageEvents.emit(CometChatMessageEvents.onMessageSent, {
        message: mediaMessage,
        status: messageStatus.inprogress,
      });
      CometChatSoundManager.play(CometChatSoundManager.Sound.outgoingMessage);

      CometChat.sendMessage(mediaMessage)
        .then((message) => {
          const messageObject = { ...message, _id: mediaMessage._id };
          CometChatMessageEvents.emit(CometChatMessageEvents.onMessageSent, {
            message: messageObject,
            status: messageStatus.success,
          });
        })
        .catch((error) => {
          CometChatMessageEvents.emit(CometChatMessageEvents.onMessageError, {
            message: mediaMessage,
            error: error,
          });
        });
    },
    sendSticker(stickerMessage) {
      const customData = {
        sticker_url: stickerMessage.stickerUrl,
        sticker_name: stickerMessage.stickerName,
      };
      const customMessage = new CometChat.CustomMessage(
        this.chatWithId,
        this.chatWith,
        CometChatCustomMessageTypes.sticker,
        customData
      );
      // if (this.parentMessage && this.parentMessage.id) {
      // 	customMessage.setParentMessageId(this.this.parentMessageId);
      // }
      customMessage.setSender(this.loggedInUser);
      customMessage.setReceiver(this.chatWith);
      customMessage.setMetadata({ incrementUnreadCount: true });
      customMessage._composedAt = getUnixTimestamp();
      customMessage._id = ID();

      CometChatMessageEvents.emit(CometChatMessageEvents.onMessageSent, {
        message: customMessage,
        status: messageStatus.inprogress,
      });
      CometChatSoundManager.play(CometChatSoundManager.Sound.outgoingMessage);

      CometChat.sendCustomMessage(customMessage)
        .then((message) => {
          const messageObject = { ...message, _id: customMessage._id };
          CometChatMessageEvents.emit(CometChatMessageEvents.onMessageSent, {
            message: messageObject,
            status: messageStatus.success,
          });
        })
        .catch((error) => {
          CometChatMessageEvents.emit(CometChatMessageEvents.onMessageError, {
            message: customMessage,
            error: error,
          });
        });
    },
    editMessage(message) {
      this.endTyping(null, null);

      let messageText = this.messageInput.trim();
      let textMessage = new CometChat.TextMessage(
        this.chatWithId,
        messageText,
        this.chatWith
      );
      textMessage.setId(this.messagePreview.message.id);

      //const newMessage = { ...textMessage, messageFrom: this.messagePreview.message.messageFrom };
      //CometChatMessageEvents.emit(CometChatMessageEvents.messageEdited, newMessage);

      this.messageInput = "";
      this.$refs.messageInputRef.textContent = "";
      CometChatSoundManager.play(CometChatSoundManager.Sound.outgoingMessage);

      this.messagePreview = null;

      CometChat.editMessage(textMessage)
        .then((editedMessage) => {
          CometChatMessageEvents.emit(CometChatMessageEvents.messageEdited, {
            message: editedMessage,
            status: messageStatus.success,
          });
        })
        .catch((error) => {
          CometChatMessageEvents.emit(CometChatMessageEvents.onMessageError, {
            error: error,
            message: message,
          });
        });
    },
    // replyToMessage(message) {},
    startTyping(endTypingTimeout, typingMetadata) {
      //if typing is disabled
      if (!this.typingIndicator) {
        return false;
      }

      //if typing is in progress
      if (this.isTyping) {
        return false;
      }

      let typingInterval = endTypingTimeout || 5000;
      let metadata = typingMetadata || undefined;

      let typingNotification = new CometChat.TypingIndicator(
        this.chatWithId,
        this.chatWith,
        metadata
      );
      CometChat.startTyping(typingNotification);

      this.isTyping = setTimeout(() => {
        this.endTyping(null, typingMetadata);
      }, typingInterval);
    },
    endTyping(event, typingMetadata) {
      //fixing synthetic issue
      if (event?.persist) {
        event.persist();
      }

      //if typing is disabled
      if (!this.typingIndicator) {
        return false;
      }

      let metadata = typingMetadata || undefined;

      let typingNotification = new CometChat.TypingIndicator(
        this.chatWithId,
        this.chatWith,
        metadata
      );
      CometChat.endTyping(typingNotification);

      clearTimeout(this.isTyping);
      this.isTyping = null;
    },
    fileInputHandler(id) {
      if (!this.$refs.fileInputRef) {
        return false;
      }

      this.$refs.fileInputRef.id = id;
      this.$refs.fileInputRef.click();
    },
    fileInputChangeHandler(event) {
      const uploadedFile = event.target.files["0"];
      var reader = new FileReader(); // Creating reader instance from FileReader() API
      reader.addEventListener(
        "load",
        () => {
          const newFile = new File(
            [reader.result],
            uploadedFile.name,
            uploadedFile
          );
          this.sendMediaMessage(newFile, this.$refs.fileInputRef.id);
          this.$refs.fileInputRef.value = "";
        },
        false
      );

      reader.readAsArrayBuffer(uploadedFile);
    },
    closeCreatePoll() {
      this.viewCreatePoll = false;
    },
    onPollSubmit() {
      this.viewCreatePoll = false;
    },
    shareCollaborativeDocument() {
      CometChat.callExtension("document", "POST", "v1/create", {
        receiver: this.chatWithId,
        receiverType: this.chatWith,
      }).catch((error) => {
        console.log(error);
      });
    },
    shareCollaborativeWhiteboard() {
      CometChat.callExtension("whiteboard", "POST", "v1/create", {
        receiver: this.chatWithId,
        receiverType: this.chatWith,
      }).catch((error) => {
        console.log(error);
      });
    },
    inputChangeHandler(event) {
      this.startTyping();

      const elem = event.currentTarget;
      let messageInput = elem.textContent.trim();

      if (!messageInput.length) {
        event.currentTarget.textContent = messageInput;
      }

      this.messageInput = elem.innerText;
    },
    toggleStickersTray() {
      this.viewStickerTray = !this.viewStickerTray;
    },
    onEmojiSelect(emoji) {
      const element = this.$refs.messageInputRef;
      element.focus();
      this.pasteHtmlAtCaret(emoji.native, false);

      this.messageInput = element.innerText;
    },
    // onEmojiSelect(emoji) {
    //   this.$nextTick(() => {
    //     try {
    //       if (this.$refs && this.$refs.messageInputRef) {
    //         const element = this.$refs.messageInputRef;
    //         element.focus();
    //         this.pasteHtmlAtCaret(emoji.native);

    //         this.setMessageInput(element);
    //       }
    //     } catch (error) {
    //       this.logError("Error in emoji click", error);
    //     }
    //   });
    // },
    pasteHtmlAtCaret(html, selectPastedContent) {
      var sel, range;
      const chatWindow = window;
      if (chatWindow.getSelection) {
        // IE9 and non-IE
        sel = chatWindow.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
          range = sel.getRangeAt(0);
          range.deleteContents();

          // Range.createContextualFragment() would be useful here but is
          // only relatively recently standardized and is not supported in
          // some browsers (IE9, for one)
          var el = document.createElement("div");
          el.innerText = html;
          var frag = document.createDocumentFragment(),
            node,
            lastNode;
          while ((node = el.firstChild)) {
            lastNode = frag.appendChild(node);
          }
          var firstNode = frag.firstChild;
          range.insertNode(frag);

          // Preserve the selection
          if (lastNode) {
            range = range.cloneRange();
            range.setStartAfter(lastNode);
            if (selectPastedContent) {
              range.setStartBefore(firstNode);
            } else {
              range.collapse(true);
            }
            sel.removeAllRanges();
            sel.addRange(range);
          }
        }
      } else if ((sel = document.selection) && sel.type !== "Control") {
        // IE < 9
        var originalRange = sel.createRange();
        originalRange.collapse(true);
        sel.createRange().pasteHTML(html);
        if (selectPastedContent) {
          range = sel.createRange();
          range.setEndPoint("StartToStart", originalRange);
          range.select();
        }
      }
    },
    attachmentClickHandler() {
      this.viewActionSheet = !this.viewActionSheet;
    },
    actionSheetClickHandler(actionSheetItemProps) {
      switch (actionSheetItemProps.id) {
        case CometChatMessageTypes.file:
        case CometChatMessageTypes.image:
        case CometChatMessageTypes.audio:
        case CometChatMessageTypes.video:
          this.fileInputHandler(actionSheetItemProps.id);
          this.viewActionSheet = false;
          break;
        case CometChatCustomMessageTypes.poll: {
          this.viewActionSheet = false;
          this.viewCreatePoll = true;
          break;
        }
        case CometChatCustomMessageTypes.document: {
          this.shareCollaborativeDocument();
          this.viewActionSheet = false;
          break;
        }
        case CometChatCustomMessageTypes.whiteboard: {
          this.shareCollaborativeWhiteboard();
          this.viewActionSheet = false;
          break;
        }
        case CometChatCustomMessageTypes.location:
          break;
        default:
          break;
      }
    },
    emojiClickHandler() {
      this.viewEmojiTray = !this.viewEmojiTray;
    },
    stickerClickHandler() {
      if (this.stickerTemplate.actionCallback) {
        this.stickerTemplate.actionCallback();
      } else {
        this.toggleStickersTray();
      }
    },
    shareLiveReaction() {
      //if already live reaction in progress
      if (this.liveReactionTimeout) {
        return false;
      }

      //fetching the metadata type from constants
      const data = {
        type: metadataKey.liveReaction,
        reaction: this.liveReaction,
      };

      //send transient message
      let transientMessage = new CometChat.TransientMessage(
        this.chatWithId,
        this.chatWith,
        data
      );
      CometChat.sendTransientMessage(transientMessage);

      //set timeout till the next share
      setTimeout(
        clearTimeout(this.liveReactionTimeout),
        messageConstants.liveReactionTimeout
      );

      //emit event to share live reaction
      const payload = {
        reaction: this.liveReaction,
        style: { font: this.liveReactionFont, color: this.liveReactionColor },
      };
      CometChatMessageEvents.emit(
        CometChatMessageEvents.onLiveReaction,
        payload
      );
    },
  },
  async mounted() {
    this.audio = new Audio(outgoingMessageAlert);
    const user = await new CometChatManager().getLoggedInUser();
    this.loggedInUser = user;
    this.getMessageFilterData();
  },
};
</script>