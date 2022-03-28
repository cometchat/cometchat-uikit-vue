<template>
  <div
    class="list__item"
    :dir="getDir()"
    :style="styles.listItemStyle"
    @click="clickHandler"
    @mouseenter="handleMouseHover(true)"
    @mouseleave="handleMouseHover(false)"
  >
    <div :style="styles.itemThumbnailStyle" class="item__thumbnail">
      <CometChatAvatar
        v-if="inputData.thumbnail && getAvatar()"
        :image="getAvatar()"
        :width="getAvatarConfig().width"
        :height="getAvatarConfig().height"
        :cornerRadius="getAvatarConfig().cornerRadius"
        :border="getAvatarConfig().border"
        :outerView="getAvatarConfig().outerView"
        :outerViewSpacing="getAvatarConfig().outerViewSpacing"
      />
      <CometChatAvatar
        v-else-if="inputData.thumbnail && conversation.conversationWith"
        :name="conversation.conversationWith.name"
        :width="getAvatarConfig().width"
        :height="getAvatarConfig().height"
        :cornerRadius="getAvatarConfig().cornerRadius"
        :border="getAvatarConfig().border"
        :outerView="getAvatarConfig().outerView"
        :outerViewSpacing="getAvatarConfig().outerViewSpacing"
      />
      <CometChatStatusIndicator
        v-if="
          inputData.status &&
          conversation &&
          conversation.conversationType === 'user'
        "
        :width="getPresenceConfig()?.width"
        :height="getPresenceConfig()?.height"
        :cornerRadius="getPresenceConfig()?.cornerRadius"
        :border="getPresenceConfig()?.border"
        :style="getPresenceConfig()?.style"
        :backgroundColor="getPresenceConfig()?.backgroundColor"
      />
      <CometChatStatusIndicator
        v-if="
          inputData.status &&
          conversation &&
          conversation.conversationType === 'group'
        "
        :width="getPresenceConfig()?.width"
        :height="getPresenceConfig()?.height"
        :cornerRadius="getPresenceConfig()?.cornerRadius"
        :border="getPresenceConfig()?.border"
        :style="getPresenceConfig()?.style"
        :backgroundImage="getPresenceConfig()?.backgroundImage"
      />
    </div>

    <div :style="styles.itemDetailStyle" class="item__details">
      <div :style="styles.itemTitleStyle" class="item__title">
        <div
          :style="styles.titleStyle"
          class="item__title"
          @mouseenter="toggleTooltip($event, true)"
          @mouseleave="toggleTooltip($event, false)"
          v-if="inputData.title"
        >
          {{ getTitle() }}
        </div>
        <span
          :style="styles.itemTimeStyle"
          class="list__item__timestamp"
          v-if="inputData.time && conversation.lastMessage"
        >
          <CometChatDate :timeStamp="getTime()" :timeFormat="'days'" />
        </span>
      </div>

      <div
        v-if="
          hideThreadIndicator === false &&
          conversation &&
          conversation.lastMessage &&
          conversation.lastMessage.parentMessageId
        "
        :style="styles.itemThreadIndicatorStyle"
        class="item__thread"
      >
        <span>{{ threadIndicator.text }}</span>
      </div>

      <div :style="styles.itemSubTitleStyle" class="item__subtitle">
        <CometChatMessageReceipt
          v-if="receipt && receiptType && receiptType === 'sending'"
          :messageWaitIcon="getReceiptIcon()"
        />
        <CometChatMessageReceipt
          v-else-if="receipt && receiptType && receiptType === 'sent'"
          :messageSentIcon="getReceiptIcon()"
        />
        <CometChatMessageReceipt
          v-else-if="receipt && receiptType && receiptType === 'delivered'"
          :messageDeliveredIcon="getReceiptIcon()"
        />
        <CometChatMessageReceipt
          v-else-if="receipt && receiptType && receiptType === 'read'"
          :messageReadIcon="getReceiptIcon()"
        />
        <CometChatMessageReceipt
          v-else-if="receipt && receiptType && receiptType === 'error'"
          :messageErrorIcon="getReceiptIcon()"
        />
        <CometChatMessageReceipt
          v-else-if="receipt && conversation && conversation.lastMessage"
          :messageObject="conversation.lastMessage"
          :messageWaitIcon="getReceiptConfig().messageWaitIcon"
          :messageSentIcon="getReceiptConfig().messageSentIcon"
          :messageDeliveredIcon="getReceiptConfig().messageDeliveredIcon"
          :messageReadIcon="getReceiptConfig().messageReadIcon"
          :messageErrorIcon="getReceiptConfig().messageErrorIcon"
        />

        <div
          v-if="inputData.subtitle && !showTypingIndicator"
          :style="styles.subTitleStyle"
          class="item__subtitle"
          @mouseenter="toggleTooltip($event, true)"
          @mouseleave="toggleTooltip($event, false)"
        >
          {{ getSubTitle() }}
        </div>

        <div
          v-if="showTypingIndicator"
          :style="styles.typingTextStyle"
          className="item__typingtext"
        >
          {{ getTypingText() }}
        </div>

        <CometChatBadgeCount
          v-if="inputData.unreadCount && getBadgeCountConfig()?.count"
          :count="getBadgeCountConfig()?.count"
          :width="getBadgeCountConfig()?.width"
          :height="getBadgeCountConfig()?.height"
          :cornerRadius="getBadgeCountConfig()?.cornerRadius"
          :border="getBadgeCountConfig()?.border"
        />
      </div>
    </div>

    <div v-if="isHovering && showDeleteConversation">
      <CometChatMenu
        :isOpen="getShowDeleteConversation()"
        :style="actionsStyle()"
        :inputData="menuInutData"
        :menuNumber="1"
      />
    </div>
  </div>
</template>

<script>
import { CometChat } from "@cometchat-pro/chat";

import blueDoubleTick from "./resources/message-read.svg";
import greyDoubleTick from "./resources/message-delivered.svg";
import greyTick from "./resources/message-sent.svg";
import sendingTick from "./resources/message-wait.svg";
import errorTick from "./resources/message-error.svg";
import deleteIcon from "./resources/delete.svg";
import passwordGroupIcon from "./resources/password-protected-group.svg";
import privateGroupIcon from "./resources/private-group.svg";

import {
  DEFAULT_BOOLEAN_PROP,
  DEFAULT_NUMBER_PROP,
  DEFAULT_OBJECT_PROP,
  DEFAULT_STRING_PROP,
} from "./resources/constants";

import {
  CometChatAvatar,
  CometChatBadgeCount,
  CometChatStatusIndicator,
  CometChatMessageReceipt,
  CometChatDate,
} from "../../../Shared/SecondaryComponents/";
import { CometChatMenu } from "../../../Shared/UtilityComponents";
import { CometChatConversationEvents } from "../../../Chats/CometChatConversationEvents";

import * as style from "./style";
import { CometChatLocalize, localize } from "../../PrimaryComponents";
import { CometChatConversationConstants } from '../../../Chats/CometChatConversationConstants';

/**
 * The conversation item for conversation list.
 *
 * @displayName CometChatConversationListItem
 */
export default {
  name: "CometChatConversationListItem",
  components: {
    CometChatAvatar,
    CometChatBadgeCount,
    CometChatStatusIndicator,
    CometChatMessageReceipt,
    CometChatMenu,
    CometChatDate,
  },
  props: {
    /**Data of the component */
    inputData: {
      ...DEFAULT_OBJECT_PROP,
      default: {
        id: "conversationId",
        thumbnail: ["avatar", "icon"], //conversationWith
        status: ["status", "type"], //conversationWith
        title: "name", //conversationWith
        subtitle: "lastMessage",
        time: "lastMessage.sentAt",
        unreadCount: "unreadMessageCount",
      },
    },
    /**Style of the component */
    style: {
      ...DEFAULT_OBJECT_PROP,
      default: {
        /** Width of the component. */
        width: "100%",
        /** Height of the component. */
        height: "auto",
        /** Background of the component, sets all background style properties at once, such as color, image, origin and size, or repeat method  */
        background: "transparent",
        /** This property sets the component's border. It sets the values of border-width, border-style, and border-color. */
        border: "1px solid rgba(20, 20, 20, 10%)",
        /** corner radius of the component  */
        cornerRadius: "0px",
        /** This property sets the foreground color value for the title text  */
        titleColor: "rgba(20,20,20)",
        /** This property sets all the different properties of font for the title text */
        titleFont: "600 15px Inter",
        /** This property sets the foreground color value for the subtitle text  */
        subTitleColor: "rgba(20, 20, 20, 60%)",
        /** This property sets all the different properties of font for the subtitle text */
        subTitleFont: "400 13px Inter, sans-serif",
        /** This property sets the foreground color value of the typing text */
        typingIndicatorTextColor: "rgba(20, 20, 20, 60%)",
        /** This property sets all the different properties of font of the typing text */
        typingIndicatorTextFont: "400 13px Inter, sans-serif",
        /** This property sets the foreground color value for the thread indicator */
        threadIndicatorTextColor: "rgba(20, 20, 20, 60%)",
        /** This property sets all the different properties of font of the thread indicator */
        threadIndicatorTextFont: "400 13px Inter, sans-serif",
      },
    },
    /** Enable typing text */
    showTypingIndicator: { ...DEFAULT_BOOLEAN_PROP, default: false },
    /** Typing indicator to be shown */
    typingIndicatorText: { ...DEFAULT_STRING_PROP, default: "" },
    /** Disable indicator if the last message is part of a threaded conversation */
    hideThreadIndicator: { ...DEFAULT_BOOLEAN_PROP, default: false },
    /**Thread indictor setting */
    threadIndicatorText: {
      ...DEFAULT_STRING_PROP,
      default: 'localize("IN_A_THREAD")',
    },
    /** Enable read receipt for a conversation */
    hideReceipt: { ...DEFAULT_BOOLEAN_PROP, default: true },
    /** Read receipt for the last message */
    receipt: { ...DEFAULT_STRING_PROP, default: "" },
    /** Used to apply selected styling */
    isActive: { ...DEFAULT_BOOLEAN_PROP, default: false },
    /** Conversation object of CometChat SDK */
    conversation: { ...DEFAULT_OBJECT_PROP, default: {} },
    /** Title for each conversation */
    title: { ...DEFAULT_STRING_PROP, default: "" },
    /** Subtitle for each conversation */
    subTitle: { ...DEFAULT_STRING_PROP, default: "" },
    /** timestamp of each conversation */
    time: { ...DEFAULT_STRING_PROP, default: "" },
    /** This property sets the foreground color value of the timestamp */
    timeColor: { ...DEFAULT_STRING_PROP, default: "#141414" },
    /** This property sets all the different properties of font of the timestamp */
    timeFont: { ...DEFAULT_STRING_PROP, default: "400 12px Inter" },
    /** Disable user presence of the user in the conversation */
    hideStatusIndicator: { ...DEFAULT_BOOLEAN_PROP, default: false },
    /** User presence of the user in the conversation */
    statusIndicator: { ...DEFAULT_STRING_PROP, default: "" },
    /** Thumbnail URL for the avatar */
    avatar: { ...DEFAULT_STRING_PROP, default: "" },
    /** Disable badge count of a conversation */
    hideUnreadCount: { ...DEFAULT_BOOLEAN_PROP, default: false },
    /** Count of unread messages */
    unreadCount: { ...DEFAULT_NUMBER_PROP, default: 0 },
    /** Hide last message when the message is of category action and type groupMember */
    hideGroupActionMessages: { ...DEFAULT_BOOLEAN_PROP, default: false },
    /** Hide last message when the last message was deleted */
    hideDeletedMessages: { ...DEFAULT_BOOLEAN_PROP, default: false },
    /** Hide delete conversation button */
    showDeleteConversation: { ...DEFAULT_BOOLEAN_PROP, default: true },
    /** Configurable options of child component */
    configurations: { ...DEFAULT_OBJECT_PROP, default: {} },
  },
  data() {
    return {
      isHovering: false,
      groupIcon: "",
      constants: {
        user: CometChat.RECEIVER_TYPE.USER,
        group: CometChat.RECEIVER_TYPE.GROUP,
      },
      menuInutData: [
        {
          id: "delete",
          iconURL: deleteIcon,
          title: "Delete",
          onHoverItemClick: () => {
            CometChatConversationEvents.emit(
              "onDeleteConversation",
              this.conversation
            );
          },
        },
      ],
    };
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        listItemStyle: style.listItemStyle(this),
        itemThumbnailStyle: style.itemThumbnailStyle(),
        itemDetailStyle: style.itemDetailStyle(this),
        itemTitleStyle: style.itemTitleStyle(this),
        titleStyle: style.titleStyle(this),
        itemSubTitleStyle: style.itemSubTitleStyle(this),
        subTitleStyle: style.subTitleStyle(this),
        typingTextStyle: style.typingTextStyle(this),
        itemThreadIndicatorStyle: style.itemThreadIndicatorStyle(this),
        itemTimeStyle: style.itemTimeStyle(this),
      };
    },
  },
  methods: {
    /**
     * Toggle tooltip utility
     * @param {*} event
     * @param {*} flag
     */
    toggleTooltip(event, flag) {
      try {
        const elem = event.target;

        const scrollWidth = elem.scrollWidth;
        const clientWidth = elem.clientWidth;

        if (scrollWidth <= clientWidth) {
          return false;
        }

        if (flag) {
          elem.setAttribute("title", elem.textContent);
        } else {
          elem.removeAttribute("title");
        }
      } catch (error) {
        console.log("Tooltip toggle failed with exception:", error);
      }
    },
    getAvatarConfig() {
      const width = this.configurations?.avatarConfiguration?.width || "36px";
      const height = this.configurations?.avatarConfiguration?.height || "36px";
      const cornerRadius =
        this.configurations?.avatarConfiguration?.cornerRadius || "50%";
      const borderWidth =
        this.configurations?.avatarConfiguration?.borderWidth || "1px";
      const borderStyle =
        this.configurations?.avatarConfiguration?.borderStyle || "solid";
      const outerViewWidth =
        this.configurations?.avatarConfiguration?.outerViewWidth || "2px";
      const outerViewStyle =
        this.configurations?.avatarConfiguration?.outerViewStyle || "solid";
      const outerViewSpacing =
        this.configurations?.avatarConfiguration?.outerViewSpacing || "4px";

      const border = `${borderWidth} ${borderStyle} rgba(20, 20, 20, 8%)`;
      const outerView = `${outerViewWidth} ${outerViewStyle} #39f`;

      return {
        width: width,
        height: height,
        cornerRadius: cornerRadius,
        border: border,
        outerView: outerView,
        outerViewSpacing: outerViewSpacing,
      };
    },
    /**
     * Handles item click
     */
    clickHandler() {
      CometChatConversationEvents.emit(
        CometChatConversationEvents.onItemClick,
        this.conversation.conversationWith
      );
    },
    handleMouseHover(toggleFlag) {
      if (toggleFlag && !this.isHovering) {
        this.isHovering = true;
      } else if (!toggleFlag && this.isHovering) {
        this.isHovering = false;
      }
    },
    getDir() {
      CometChatLocalize.getDir();
    },
    /**
     * Gets SVG avatar
     */
    getAvatar() {
      if (this.avatar && this.avatar.length) {
        return this.avatar;
      } else {
        if (!this.conversation) {
          return null;
        }

        if (
          !this.conversation.conversationWith ||
          !this.conversation.conversationType
        ) {
          return null;
        }

        let avatar = null;
        const thumbnailKeys = this.inputData?.thumbnail;
        thumbnailKeys.forEach((key) => {
          if (this.conversation.conversationWith[key]) {
            avatar = this.conversation.conversationWith[key];
          }
        });
        return avatar;
      }
    },
    getPresenceConfig() {
      let presenceConfig = {
        presence: this.getPresence(),
      };

      if (
        this.hideStatusIndicator === false &&
        (this.statusIndicator ||
          (this.conversation &&
            this.conversation.conversationType &&
            this.conversation.conversationWith &&
            this.conversation.conversationWith.status &&
            this.conversation.conversationType ===
              CometChat.RECEIVER_TYPE.USER))
      ) {
        presenceConfig["width"] =
          this.configurations?.statusIndicatorConfiguration?.width || "14px";
        presenceConfig["height"] =
          this.configurations?.statusIndicatorConfiguration?.height || "14px";
        presenceConfig["cornerRadius"] =
          this.configurations?.statusIndicatorConfiguration?.cornerRadius ||
          "50%";
        presenceConfig["border"] =
          this.configurations?.statusIndicatorConfiguration?.border ||
          "2px solid #fff";
        presenceConfig["backgroundColor"] =
          this.configurations?.statusIndicatorConfiguration?.backgroundColor ||
          this.conversation.conversationWith.status ===
            CometChat?.USER_STATUS.ONLINE
            ? "RGB(0, 200, 111)"
            : "grey";
        presenceConfig["style"] = this.configurations
          ?.statusIndicatorConfiguration?.style || {
          position: "absolute",
          bottom: "1px",
          right: "0px",
        };

        return presenceConfig;
      } else if (
        this.hideStatusIndicator === false &&
        (this.statusIndicator ||
          (this.conversation &&
            this.conversation.conversationType &&
            this.conversation.conversationWith &&
            this.conversation.conversationWith.type &&
            this.conversation.conversationType ===
              CometChat.RECEIVER_TYPE.GROUP))
      ) {
        presenceConfig["width"] =
          this.configurations?.statusIndicatorConfiguration?.width || "20px";
        presenceConfig["height"] =
          this.configurations?.statusIndicatorConfiguration?.height || "20px";
        presenceConfig["cornerRadius"] =
          this.configurations?.statusIndicatorConfiguration?.cornerRadius ||
          "0%";
        presenceConfig["border"] =
          this.configurations?.statusIndicatorConfiguration?.border || "none";
        presenceConfig["backgroundImage"] =
          this.configurations?.statusIndicatorConfiguration?.backgroundImage ||
          this.groupIcon;
        presenceConfig["style"] = this.configurations
          ?.statusIndicatorConfiguration?.style || {
          position: "absolute",
          bottom: "1px",
          right: "0px",
        };

        return presenceConfig;
      }

      return null;
    },
    /**
     * get Presence
     */
    getPresence() {
      if (this.statusIndicator && this.statusIndicator.length) {
        return this.statusIndicator;
      } else {
        if (!this.conversation) {
          return null;
        }

        if (
          !this.conversation.conversationWith ||
          !this.conversation.conversationType
        ) {
          return null;
        }

        if (!this.conversation.conversationWith.status) {
          return null;
        }

        if (
          this.conversation.conversationType === CometChat.RECEIVER_TYPE.USER
        ) {
          return this.conversation.conversationWith.status;
        }
      }
    },
    getTypingText() {
      return this.typingIndicator.text || localize('TYPING');
    },
    /**
     * Get title
     */
    getTitle() {
      let title = null;
      if (this.title && this.title.length) {
        title = this.title;
      } else {
        if (!this.conversation) {
          return null;
        }

        if (!this.conversation.conversationWith) {
          return null;
        }

        if (!this.conversation.conversationWith.name) {
          return null;
        }

        if (this.conversation.conversationWith[this.inputData?.title]) {
          title = this.conversation.conversationWith[this.inputData?.title];
        }
      }

      return title;
    },
    /**
     * Get subtitle
     */
    getSubTitle() {
      let subtitle = null;
      if (this.subTitle && this.subTitle.length) {
        subtitle = this.subTitle;
      } else {
        if (!this.conversation || !this.conversation.lastMessage) {
          return null;
        }

        let lastMessage = null;
        if (this.conversation[this.inputData?.subtitle]) {
          lastMessage = this.conversation[this.inputData?.subtitle];
        }
        if (lastMessage.deletedAt) {
          subtitle = localize('THIS_MESSAGE_DELETED');
        } else {
          switch (lastMessage.category) {
            case CometChat.CATEGORY_MESSAGE:
              subtitle = this.getMessage(lastMessage);
              break;
            case CometChat.CATEGORY_CALL:
              subtitle = this.getCallMessage(lastMessage);
              break;
            case CometChat.CATEGORY_ACTION:
              subtitle = this.getGroupActionMessage(lastMessage);
              break;
            case CometChat.CATEGORY_CUSTOM:
              subtitle = this.getCustomMessage(lastMessage);
              break;
            default:
              break;
          }
        }
      }

      if (subtitle) {
        return subtitle;
      }
    },
    /**
     * Gets last message time
     */
    getTime() {
      if (this.time && this.time.trim().length) {
        return this.time;
      } else if (
        this.conversation &&
        this.conversation.lastMessage &&
        (this.conversation.lastMessage._composedAt ||
          this.conversation[this.inputData?.time])
      ) {
        let timestamp =
          this.conversation.lastMessage._composedAt ||
          this.conversation[this.inputData?.time];
        return timestamp;
      }
    },
    getLastMessage() {
      if (!this.conversation.lastMessage) return "";

      const lastMessage = this.conversation.lastMessage;

      let message = null;
      if (this.hasProperty(lastMessage, "deletedAt")) {
        message = localize('THIS_MESSAGE_DELETED');
      } else {
        switch (lastMessage.category) {
          case "message":
            message = this.getMessage(lastMessage);
            break;
          default:
            break;
        }
      }
      return message;
    },
    getMessage(lastMessage) {
      let message = "";
      switch (lastMessage.type) {
        case CometChat.MESSAGE_TYPE.TEXT:
          message = lastMessage.text;
          break;
        case CometChat.MESSAGE_TYPE.MEDIA:
          message = localize('MEDIA_MESSAGE');
          break;
        case CometChat.MESSAGE_TYPE.IMAGE:
          message = localize('MESSAGE_IMAGE');
          break;
        case CometChat.MESSAGE_TYPE.FILE:
          message = localize('MESSAGE_FILE');
          break;
        case CometChat.MESSAGE_TYPE.VIDEO:
          message = localize('MESSAGE_VIDEO');
          break;
        case CometChat.MESSAGE_TYPE.AUDIO:
          message = localize('MESSAGE_AUDIO');
          break;
        case CometChat.MESSAGE_TYPE.CUSTOM:
          message = localize('CUSTOM_MESSAGE');
          break;
        default:
          break;
      }

      return message;
    },
    getCallMessage(lastMessage) {
      let message = "";
      const type = lastMessage.type;

      switch (type) {
        case CometChat.MESSAGE_TYPE.VIDEO:
          message = localize('VIDEO_CALL');
          break;
        case CometChat.MESSAGE_TYPE.AUDIO:
          message = localize('AUDIO_CALL');
          break;
        default:
          break;
      }

      return message;
    },
    getGroupActionMessage(lastMessage) {
      const byUser = lastMessage?.actionBy?.name;
      const onUser = lastMessage?.actionOn?.name;

      switch (lastMessage.action) {
        case CometChat.ACTION_TYPE.MEMBER_JOINED:
          return `${byUser} "JOINED"`;
        case CometChat.ACTION_TYPE.MEMBER_LEFT:
          return `${byUser} "LEFT"`;
        case CometChat.ACTION_TYPE.MEMBER_ADDED:
          return `${byUser} "ADDED" ${onUser}`;
        case CometChat.ACTION_TYPE.MEMBER_KICKED:
          return `${byUser} "KICKED" ${onUser}`;
        case CometChat.ACTION_TYPE.MEMBER_BANNED:
          return `${byUser} "BANNED" ${onUser}`;
        case CometChat.ACTION_TYPE.MEMBER_UNBANNED:
          return `${byUser} "UNBANNED" ${onUser}`;
        case CometChat.ACTION_TYPE.MEMBER_SCOPE_CHANGED: {
          const newScope = lastMessage?.newScope;
          return `${byUser} "MADE" ${onUser} ${newScope}`;
        }
        default:
          return;
      }
    },
    getCustomMessage(lastMessage) {
      let message = "";
      switch (lastMessage.type) {
        case CometChatConversationConstants.cometChatCustomMessageTypes.poll:
          message = localize('CUSTOM_MESSAGE_POLL');
          break;
        case CometChatConversationConstants.cometChatCustomMessageTypes.sticker:
          message = localize('CUSTOM_MESSAGE_STICKER');
          break;
        case CometChatConversationConstants.cometChatCustomMessageTypes.document:
          message = localize('CUSTOM_MESSAGE_DOCUMENT');
          break;
        default:
          break;
      }

      return message;
    },
    getBadgeCountConfig() {
      let badgeCountConfig = {
        count: this.getUnreadCount(),
      };

      if (
        this.hideUnreadCount === false &&
        (this.unreadCount ||
          (this.conversation && this.conversation[this.inputData?.unreadCount]))
      ) {
        badgeCountConfig["width"] =
          this.configurations?.badgeCountConfiguration?.width || "24px";
        badgeCountConfig["height"] =
          this.configurations?.badgeCountConfiguration?.height || "20px";
        badgeCountConfig["cornerRadius"] =
          this.configurations?.badgeCountConfiguration?.cornerRadius || "11px";
        badgeCountConfig["borderWidth"] =
          this.configurations?.badgeCountConfiguration?.borderWidth || "1px";
        badgeCountConfig["borderStyle"] =
          this.configurations?.badgeCountConfiguration?.borderStyle || "solid";
        badgeCountConfig[
          "border"
        ] = `${badgeCountConfig.borderWidth} ${badgeCountConfig.borderStyle} transparent`;

        return badgeCountConfig;
      }

      return null;
    },
    /**
     * Get unreadcount
     */
    getUnreadCount() {
      let unreadCount = null;
      if (this.unreadCount) {
        unreadCount = this.unreadCount;
      } else {
        if (!this.conversation) {
          return null;
        }

        if (!this.conversation[this.inputData?.unreadCount]) {
          return null;
        }

        unreadCount = this.conversation[this.inputData?.unreadCount];
      }

      return unreadCount;
    },
    /**
     * Gets SVG avatar
     */
    getThreadIndicator() {
      return null;
    },
    getReceiptConfig() {
      let receiptConfig = {};

      if (this.conversation && this.conversation.lastMessage) {
        receiptConfig["messageWaitIcon"] =
          this.configurations?.messageReceiptConfiguration?.messageWaitIcon ||
          sendingTick;
        receiptConfig["messageSentIcon"] =
          this.configurations?.messageReceiptConfiguration?.messageSentIcon ||
          greyTick;
        receiptConfig["messageDeliveredIcon"] =
          this.configurations?.messageReceiptConfiguration
            ?.messageDeliveredIcon || greyDoubleTick;
        receiptConfig["messageReadIcon"] =
          this.configurations?.messageReceiptConfiguration?.messageReadIcon ||
          blueDoubleTick;
        receiptConfig["messageErrorIcon"] =
          this.configurations?.messageReceiptConfiguration?.messageErrorIcon ||
          errorTick;

        return receiptConfig;
      }

      return null;
    },
    getGroupIcon() {
      /**Sets the group icon */
      if (this.conversation?.conversationWith?.type == "public") {
        this.groupIcon = "";
      } else if (this.conversation?.conversationWith?.type === "private") {
        this.groupIcon = privateGroupIcon;
      } else if (
        this.conversation?.conversationWith?.type === "password-protected"
      ) {
        this.groupIcon = passwordGroupIcon;
      }
    },
    getReceiptIcon() {
      if (this.receiptType === "sending") {
        return sendingTick;
      } else if (this.receiptType === "sent") {
        return greyTick;
      } else if (this.receiptType === "delivered") {
        return greyDoubleTick;
      } else if (this.receiptType === "read") {
        return blueDoubleTick;
      } else if (this.receiptType === "error") {
        return errorTick;
      }
    },
    getShowDeleteConversation() {
      let showDeleteConversation = false;
      if (this.showDeleteConversation) {
        showDeleteConversation = this.isHovering ? true : false;
      }
      return showDeleteConversation;
    },
    actionsStyle() {
      const leftRightPosition = CometChatLocalize.isRTL()
        ? { left: "16px" }
        : { right: "16px" };

      const style = {
        position: "absolute",
        top: "0",
        minWidth: "70px",
        width: "auto",
        height: "100%",
        ...leftRightPosition,
      };

      return style;
    },
  },
  mounted() {
    this.getGroupIcon();
  },
};
</script>