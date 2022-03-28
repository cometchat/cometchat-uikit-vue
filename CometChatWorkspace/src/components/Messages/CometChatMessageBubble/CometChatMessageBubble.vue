<template>
  <CometChatDeleteMessageBubble
    v-if="messageObject.deletedAt"
    :key="messageKey"
    :loggedInUser="loggedInUser"
    :messageObject="messageObject"
  />

  <div v-if="messageObject.category === CometChatMessageCategories.message">
    <!-- if no message filters are set, return text message bubble -->
    <CometChatTextBubble
      v-if="templateFound?.length === 0"
      :key="messageKey"
      :messageObject="messageObject"
      :messageAlignment="messageAlignment"
      :messageTimeAlignment="messageTimeAlignment"
      :cornerRadius="messageStyle.cornerRadius"
      :backgroundColor="messageStyle.backgroundColor"
      :textColor="messageStyle.textColor"
      :loggedInUser="loggedInUser"
      :messageOptions="Object.keys(CometChatMessageOptions)"
    />

    <div v-if="messageObject.type === CometChatMessageTypes.text">
      <div v-if="templateFound?.customView" v-bind="$props">
        {{ templateFound?.customView }}
      </div>
      <CometChatTextBubble
        v-else
        :key="messageKey"
        :messageObject="messageObject"
        :messageAlignment="messageAlignment"
        :messageTimeAlignment="messageTimeAlignment"
        :cornerRadius="messageStyle.cornerRadius"
        :backgroundColor="messageStyle.backgroundColor"
        :textColor="messageStyle.textColor"
        :loggedInUser="loggedInUser"
        :messageOptions="messageOptions"
      />
    </div>

    <div v-else-if="messageObject.type === CometChatMessageTypes.image">
      <div v-if="templateFound?.customView" v-bind="$props">
        {{ templateFound?.customView }}
      </div>
      <CometChatImageBubble
        v-else
        :key="messageKey"
        :messageObject="messageObject"
        :messageAlignment="messageAlignment"
        :messageTimeAlignment="messageTimeAlignment"
        :cornerRadius="messageStyle.cornerRadius"
        :loggedInUser="loggedInUser"
        :messageOptions="messageOptions"
      />
    </div>

    <div v-else-if="messageObject.type === CometChatMessageTypes.file">
      <div v-if="templateFound?.customView" v-bind="$props">
        {{ templateFound?.customView }}
      </div>
      <CometChatFileBubble
        v-else
        :key="messageKey"
        :messageObject="messageObject"
        :messageAlignment="messageAlignment"
        :messageTimeAlignment="messageTimeAlignment"
        :cornerRadius="messageStyle.cornerRadius"
        :backgroundColor="messageStyle.backgroundColor"
        :titleFont="messageStyle.textFont"
        :titleColor="messageStyle.textColor"
        :subTitleColor="messageStyle.subTitleColor"
        :subTitleFont="messageStyle.subTitleFont"
        :iconTint="messageStyle.iconTint"
        :loggedInUser="loggedInUser"
        :messageOptions="messageOptions"
      />
    </div>

    <div v-else-if="messageObject.type === CometChatMessageTypes.audio">
      <div v-if="templateFound?.customView" v-bind="$props">
        {{ templateFound?.customView }}
      </div>
      <CometChatAudioBubble
        v-else
        :key="messageKey"
        :messageObject="messageObject"
        :messageAlignment="messageAlignment"
        :messageTimeAlignment="messageTimeAlignment"
        :cornerRadius="messageStyle.cornerRadius"
        :backgroundColor="messageStyle.backgroundColor"
        :titleColor="messageStyle.titleColor"
        :subTitleColor="messageStyle.subTitleColor"
        :iconTint="messageStyle.iconTint"
        :loggedInUser="loggedInUser"
        :messageOptions="messageOptions"
      />
    </div>

    <div v-else-if="messageObject.type === CometChatMessageTypes.video">
      <div v-if="templateFound?.customView" v-bind="$props">
        {{ templateFound?.customView }}
      </div>
      <CometChatVideoBubble
        v-else
        :key="messageKey"
        :messageObject="messageObject"
        :messageAlignment="messageAlignment"
        :messageTimeAlignment="messageTimeAlignment"
        :cornerRadius="messageStyle.cornerRadius"
        :backgroundColor="messageStyle.backgroundColor"
        :titleColor="messageStyle.textColor"
        :subTitleColor="messageStyle.textColor"
        :loggedInUser="loggedInUser"
        :messageOptions="messageOptions"
      />
    </div>
  </div>

  <div
    v-else-if="
      messageObject.category === CometChatMessageCategories.custom &&
      templateFound
    "
  >
    <div v-if="messageObject.type === CometChatCustomMessageTypes.poll">
      <div v-if="templateFound?.customView" v-bind="$props">
        {{ templateFound?.customView }}
      </div>
      <CometChatPollBubble
        v-else
        :key="messageKey"
        :messageObject="messageObject"
        :messageAlignment="messageAlignment"
        :messageTimeAlignment="messageTimeAlignment"
        :cornerRadius="messageStyle.cornerRadius"
        :backgroundColor="messageStyle.backgroundColor"
        :usernameFont="style.usernameFont"
        :usernameColor="style.usernameColor"
        :pollQuestionColor="messageStyle.textColor"
        :pollQuestionFont="style.pollQuestionFont"
        :pollOptionsColor="style.pollOptionsColor"
        :pollOptionsFont="style.pollOptionsFont"
        :pollOptionsBackgroundColor="style.pollOptionsBackgroundColor"
        :voteCountColor="messageStyle.pollStyle.voteCountColor"
        :voteCountFont="messageStyle.pollStyle.voteCountFont"
        :loggedInUser="loggedInUser"
        :messageOptions="customMessageOptions"
      />
    </div>

    <div v-else-if="messageObject.type === CometChatCustomMessageTypes.sticker">
      <div v-if="templateFound?.customView" v-bind="$props">
        {{ templateFound?.customView }}
      </div>
      <CometChatStickerBubble
        v-else
        :key="messageKey"
        :messageObject="messageObject"
        :messageAlignment="messageAlignment"
        :messageTimeAlignment="messageTimeAlignment"
        :usernameFont="style.usernameFont"
        :usernameColor="style.usernameColor"
        :loggedInUser="loggedInUser"
        :messageOptions="customMessageOptions"
      />
    </div>

    <div
      v-else-if="messageObject.type === CometChatCustomMessageTypes.whiteboard"
    >
      <div v-if="templateFound?.customView" v-bind="$props">
        {{ templateFound?.customView }}
      </div>
      <CometChatWhiteboardBubble
        v-else
        :key="messageKey"
        :width="'100%'"
        :height="'auto'"
        :messageObject="messageObject"
        :messageAlignment="messageAlignment"
        :messageTimeAlignment="messageTimeAlignment"
        :cornerRadius="messageStyle.cornerRadius"
        :backgroundColor="messageStyle.backgroundColor"
        :usernameFont="messageStyle.usernameFont"
        :usernameColor="messageStyle.usernameColor"
        :title="messageStyle.whiteboardStyle.title"
        :titleFont="messageStyle.whiteboardStyle.titleFont"
        :titleColor="messageStyle.whiteboardStyle.titleColor"
        :buttonText="messageStyle.whiteboardStyle.buttonText"
        :buttonTextFont="messageStyle.whiteboardStyle.buttonTextFont"
        :buttonTextColor="messageStyle.whiteboardStyle.buttonTextColor"
        :buttonBackgroundColor="
          messageStyle.whiteboardStyle.buttonBackgroundColor
        "
        :iconTint="messageStyle.whiteboardStyle.iconColor"
        :loggedInUser="loggedInUser"
        :messageOptions="customMessageOptions"
      />
    </div>

    <div
      v-else-if="messageObject.type === CometChatCustomMessageTypes.document"
    >
      <div v-if="templateFound?.customView" v-bind="$props">
        {{ templateFound?.customView }}
      </div>
      <CometChatDocumentBubble
        v-else
        :key="messageKey"
        :width="'100%'"
        :height="'auto'"
        :messageObject="messageObject"
        :messageAlignment="messageAlignment"
        :messageTimeAlignment="messageTimeAlignment"
        :cornerRadius="messageStyle.cornerRadius"
        :backgroundColor="messageStyle.backgroundColor"
        :usernameFont="messageStyle.usernameFont"
        :usernameColor="messageStyle.usernameColor"
        :title="messageStyle.documentStyle.title"
        :titleFont="messageStyle.documentStyle.titleFont"
        :titleColor="messageStyle.documentStyle.titleColor"
        :buttonText="messageStyle.documentStyle.buttonText"
        :buttonTextFont="messageStyle.documentStyle.buttonTextFont"
        :buttonTextColor="messageStyle.documentStyle.buttonTextColor"
        :buttonBackgroundColor="
          messageStyle.documentStyle.buttonBackgroundColor
        "
        :iconTint="messageStyle.documentStyle.iconColor"
        :loggedInUser="loggedInUser"
        :messageOptions="customMessageOptions"
      />
    </div>

    <div
      v-else-if="messageObject.type === CometChatCustomMessageTypes.location"
    >
      <div v-if="templateFound?.customView" v-bind="$props">
        {{ templateFound?.customView }}
      </div>
      <!--TBD-->
    </div>

    <div v-else>
      <div v-if="templateFound && templateFound?.customView">
        {{ templateFound?.customView }}
      </div>
      <!--TBD CometChatDefaultBubble-->
    </div>
  </div>
</template>

<!--eslint-disable-->
<script>
import {
  DEFAULT_ARRAY_PROP,
  DEFAULT_OBJECT_PROP,
  DEFAULT_STRING_PROP,
  DEFAULT_FUNCTION_PROP,
} from "..";
import { localize } from "../../";

import {
  CometChatMessageCategories,
  CometChatMessageTypes,
  CometChatCustomMessageTypes,
  CometChatMessageOptions,
  CometChatCustomMessageOptions,
  CometChatTextBubble,
  CometChatFileBubble,
  CometChatImageBubble,
  CometChatAudioBubble,
  CometChatVideoBubble,
} from "../";
import CometChatDeleteMessageBubble from "../CometChatDeleteMessageBubble/CometChatDeleteMessageBubble";
import CometChatPollBubble from "../Extensions/CometChatPollBubble/CometChatPollBubble";
import CometChatStickerBubble from "../Extensions/CometChatStickerBubble/CometChatStickerBubble";
import CometChatDocumentBubble from "../Extensions/CometChatDocumentBubble/CometChatDocumentBubble";
import CometChatWhiteboardBubble from "../Extensions/CometChatWhiteboardBubble/CometChatWhiteboardBubble";
import editIcon from "./resources/edit.svg";
import deleteIcon from "./resources/delete.svg";
import reactIcon from "./resources/reactions.svg";
import translateIcon from "./resources/message-translate.svg";
import sendMessageInPrivateIcon from "./resources/send-message-in-private.svg";

/**
 * Displays message list with message composer and header.
 *
 * @displayName CometChatMessageBubble
 */
export default {
  name: "CometChatMessageBubble",
  components: {
    CometChatDeleteMessageBubble,
    CometChatTextBubble,
    CometChatFileBubble,
    CometChatImageBubble,
    CometChatAudioBubble,
    CometChatVideoBubble,
    CometChatPollBubble,
    CometChatStickerBubble,
    CometChatDocumentBubble,
    CometChatWhiteboardBubble,
  },
  props: {
    messageKey: { ...DEFAULT_STRING_PROP, default: "" },
    messageObject: { ...DEFAULT_OBJECT_PROP, default: {} },
    messageAlignment: { ...DEFAULT_STRING_PROP, default: "" },
    messageTimeAlignment: { ...DEFAULT_STRING_PROP, default: "" },
    loggedInUser: { ...DEFAULT_OBJECT_PROP, default: {} },
    messageFilterList: { ...DEFAULT_ARRAY_PROP, default: [] },
    messageStyle: { ...DEFAULT_OBJECT_PROP, default: {} },
    onMessageOptionClick: { ...DEFAULT_FUNCTION_PROP, default: () => {} },
  },
  data() {
    return {
      templateFound: null,
      messageOptions: [],
      customMessageOptions: [],
      style: {
        cornerRadius: "12px",
        backgroundColor: "rgb(246, 246, 246)",
        titleColor: "rgb(20, 20, 20)",
        subTitleColor: "rgb(20, 20, 20, 60%)",
        iconColor: "rgb(20, 20, 20, 0.4)",
        usernameColor: "#39f",
        usernameFont: "600 13px Inter",
        voteCountColor: "rgb(20, 20, 20)",
        voteCountFont: "400 13px Inter,sans-serif",
        pollOptionsFont: "400 15px Inter,sans-serif",
        pollOptionsColor: "rgb(20, 20, 20)",
        pollOptionsBackgroundColor: "#fff",
        buttonTextColor: "#39f",
        buttonTextFont: "600 14px Inter,sans-serif",
        buttonBackgroundColor: "rgb(255, 255, 255)",
      },
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
    CometChatMessageCategories() {
      return CometChatMessageCategories;
    },
    CometChatMessageTypes() {
      return CometChatMessageTypes;
    },
    CometChatCustomMessageTypes() {
      return CometChatCustomMessageTypes;
    },
    CometChatMessageOptions() {
      return CometChatMessageOptions;
    },
  },
  methods: {
    getTemplate() {
      this.templateFound = this.messageFilterList.find(
        (messageTemplate) => messageTemplate.type === this.messageObject.type
      );
      this.getMessageOptions(this.templateFound);
      this.getCustomMessageOptions(this.templateFound);
    },
    getMessageOptions(messageTemplate) {
      if (!messageTemplate?.options || !messageTemplate?.options.length) {
        this.messageOptions = [];
      }

      const messageOptions = [];
      messageTemplate?.options.forEach((option) => {
        switch (option) {
          case CometChatMessageOptions.edit: {
            //if the sender of the message is not the logged in user, disable option to edit.
            if (this.loggedInUser?.uid !== this.messageObject?.sender?.uid) {
              return;
            }

            messageOptions.push({
              id: option,
              iconURL: editIcon,
              iconTint: "#808080",
              title: localize("EDIT_MESSAGE"),
              width: "24px",
              height: "24px",
              onHoverItemClick: this.hoverItemClickHandler,
            });

            break;
          }
          case CometChatMessageOptions.delete: {
            messageOptions.push({
              id: option,
              iconURL: deleteIcon,
              iconTint: "red",
              title: localize("DELETE_MESSAGE"),
              width: "24px",
              height: "24px",
              onHoverItemClick: this.hoverItemClickHandler,
            });
            break;
          }
          case CometChatMessageOptions.reactToMessage: {
            messageOptions.push({
              id: option,
              iconURL: reactIcon,
              iconTint: "#808080",
              title: localize("ADD_REACTION"),
              width: "24px",
              height: "24px",
              onHoverItemClick: this.hoverItemClickHandler,
            });
            break;
          }
          case CometChatMessageOptions.translate: {
            messageOptions.push({
              id: option,
              iconURL: translateIcon,
              iconTint: "#808080",
              title: localize("TRANSLATE_MESSAGE"),
              width: "24px",
              height: "24px",
              onHoverItemClick: this.hoverItemClickHandler,
            });
            break;
          }
          case CometChatMessageOptions.replyInPrivate: {
            messageOptions.push({
              id: option,
              iconURL: sendMessageInPrivateIcon,
              iconTint: "#808080",
              title: localize("SEND_MESSAGE_IN_PRIVATE"),
              width: "24px",
              height: "24px",
              onHoverItemClick: this.hoverItemClickHandler,
            });
            break;
          }
          default:
            break;
        }
      });

      this.messageOptions = messageOptions;
    },
    hoverItemClickHandler(option) {
      this.onMessageOptionClick(option, this.messageObject);
    },
    getCustomMessageOptions(messageTemplate) {
      if (!messageTemplate?.options || !messageTemplate?.options.length) {
        this.customMessageOptions = [];
      }

      const customMessageOptions = [];
      messageTemplate?.options.forEach((option) => {
        switch (option) {
          case CometChatCustomMessageOptions.replyInPrivate: {
            customMessageOptions.push({
              id: option,
              iconURL: sendMessageInPrivateIcon,
              iconTint: "#808080",
              title: localize("SEND_MESSAGE_IN_PRIVATE"),
              width: "24px",
              height: "24px",
              onHoverItemClick: this.hoverItemClickHandler,
            });
            break;
          }
          case CometChatCustomMessageOptions.delete: {
            customMessageOptions.push({
              id: option,
              iconURL: deleteIcon,
              iconTint: "red",
              title: localize("DELETE_MESSAGE"),
              width: "24px",
              height: "24px",
              onHoverItemClick: this.hoverItemClickHandler,
            });
            break;
          }
          case CometChatCustomMessageOptions.reactToMessage: {
            customMessageOptions.push({
              id: option,
              iconURL: reactIcon,
              iconTint: "#808080",
              title: localize("ADD_REACTION"),
              width: "24px",
              height: "24px",
              onHoverItemClick: this.hoverItemClickHandler,
            });
            break;
          }
          default:
            break;
        }
      });

      this.customMessageOptions = customMessageOptions;
    },
  },
  mounted() {
    this.getTemplate();
  },
};
</script>