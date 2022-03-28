<template>
  <div :style="styles.chatHeaderStyle" class="chat__header">
    <div :style="styles.chatDetailStyle" class="chat__details">
      <div :style="styles.chatThumbnailStyle" class="chat__thumbnail">
        <CometChatAvatar v-if="getAvatar()" :image="getAvatar()" />
        <CometChatAvatar v-else-if="getName()" :name="getName()" />
        <CometChatStatusIndicator
          v-if="Object.keys(user).length"
          :backgroundColor="userPresence === 'offline' ? '#ccc' : '#3BDF2F'"
          :style="{ position: 'absolute', bottom: '1px', right: '0px' }"
        />
        <CometChatStatusIndicator
          v-else-if="Object.keys(group).length"
          :backgroundImage="groupIcon"
          :style="{ position: 'absolute', bottom: '1px', right: '0px', width: '20px', height: '20px', border: 'none' }"
        />
        
      </div>
      <div :style="styles.chatUserStyle" :class="chatWithClassName">
        <h6
          :style="styles.chatNameStyle"
          :class="chatNameClassName"
          @mouseenter="toggleTooltip($event, true)"
          @mouseleave="toggleTooltip($event, false)"
        >
          {{ chatWith?.name }}
        </h6>
        <span
          :style="styles.chatStatusStyle"
          :class="chatStatusClassName"
          @mouseenter="toggleTooltip($event, true)"
          @mouseleave="toggleTooltip($event, false)"
        >
          <span
            :style="styles.chatStatusStyle"
            :class="chatStatusClassName"
            v-if="typingText"
          >
            {{ typingText }}
          </span>
          <span
            v-else
            :style="styles.chatStatusStyle"
            :class="chatStatusClassName"
          >
            {{ messageHeaderStatus }}
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<!--eslint-disable-->
<script>
import { DEFAULT_STRING_PROP, DEFAULT_OBJECT_PROP } from "../";

import { MessageHeaderManager } from "./controller";

import {
  CometChatAvatar,
  CometChatStatusIndicator,
  localize,
} from "../../Shared";

import * as style from "./style";
import { CometChatMessageReceiverType } from "../CometChatMessageConstants";
import { CometChat } from "@cometchat-pro/chat";
import passwordGroupIcon from "./resources/password-protected-group.svg";
import privateGroupIcon from "./resources/private-group.svg";

let messageHeaderManager;

/**
 * Displays message info in header.
 *
 * @displayName CometChatMessageHeader
 */
export default {
  name: "CometChatMessageHeader",
  components: {
    CometChatAvatar,
    CometChatStatusIndicator,
  },
  props: {
    /**
     * image.
     */
    image: { ...DEFAULT_STRING_PROP, default: "" },
    /**
     * user.
     */
    user: { ...DEFAULT_OBJECT_PROP, default: {} },
    /**
     * group.
     */
    group: { ...DEFAULT_OBJECT_PROP, default: {} },
    /**
     * background.
     */
    background: { ...DEFAULT_STRING_PROP, default: "#fff" },
    /**
     * border.
     */
    border: { ...DEFAULT_STRING_PROP, default: "1px solid rgb(234, 234, 234)" },
  },
  data() {
    return {
      status: "",
      presence: "offline",
      chatWith: null,
      chatWithType: null,
      messageHeaderStatus: "",
      userPresence: "offline",
      callbackData: null,
      handlers: {},
      typingText: null,
      groupIcon: "",
    };
  },
  watch: {
    callbackData: {
      /**
       * Watches item to update status message for group.
       */
      handler() {
        if (messageHeaderManager) {
          messageHeaderManager.removeListeners();
        }
        messageHeaderManager = new MessageHeaderManager();
        messageHeaderManager.attachListeners(this.messageHeaderCallback);

        const handlerCall = this.handlers[this.callbackData?.name];
        if (!handlerCall) {
          return false;
        }

        return handlerCall(...this.callbackData?.args);
      },
      deep: true,
    },
    user: function () {
      this.refreshData()
    },
    group: function () {
      this.refreshData();
    },
  },
  computed: {
    /**
     * Icons computed from file images.
     */
    styles() {
      return {
        chatHeaderStyle: style.chatHeaderStyle(this),
        chatDetailStyle: style.chatDetailStyle(),
        chatThumbnailStyle: style.chatThumbnailStyle(),
        chatUserStyle: style.chatUserStyle(),
        chatNameStyle: style.chatNameStyle(),
        chatStatusStyle: style.chatStatusStyle(
          this.userPresence,
          this.chatWithType,
          this.typingText
        ),
        chatOptionWrapStyle: style.chatOptionWrapStyle(),
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
    getAvatar() {
      let avatar = "";
      if (this.image) {
        avatar = this.image;
      } else if (this.user && this.user.avatar) {
        avatar = this.user.avatar;
      } else if (this.group && this.group.icon) {
        avatar = this.group.icon;
      }

      return avatar;
    },
    getName() {
      let name = "";
      if (this.user && this.user.name) {
        name = this.user.name;
      } else if (this.group && this.group.name) {
        name = this.group.name;
      }

      return name;
    },
    chatStatusClassName() {
      return this.chatWithType === CometChatMessageReceiverType.user
        ? "user__status"
        : "group__members";
    },
    chatWithClassName() {
      return this.chatWithType === CometChatMessageReceiverType.user
        ? "chat__user"
        : "chat__group";
    },
    chatNameClassName() {
      return this.chatWithType === CometChatMessageReceiverType.user
        ? "user__name"
        : "group__name";
    },
    setHandlers() {
      this.handlers = {
        onUserOnline: this.handleUsers,
        onUserOffline: this.handleUsers,
        onMemberAddedToGroup: this.handleGroups,
        onGroupMemberJoined: this.handleGroups,
        onGroupMemberKicked: this.handleGroups,
        onGroupMemberLeft: this.handleGroups,
        onGroupMemberBanned: this.handleGroups,
        onTypingStarted: this.handleStartTyping,
        onTypingEnded: this.handleEndTyping,
      };
    },
    updateMessageHeaderStatusForUser() {
      if (
        this.user.status === CometChat.USER_STATUS.OFFLINE &&
        this.user.lastActiveAt
      ) {
        this.messageHeaderStatus = localize("OFFLINE");
        this.userPresence = CometChat.USER_STATUS.OFFLINE;
      } else if (this.user.status === CometChat.USER_STATUS.OFFLINE) {
        this.messageHeaderStatus = localize("OFFLINE");
        this.userPresence = CometChat.USER_STATUS.OFFLINE;
      } else if (this.user.status === CometChat.USER_STATUS.ONLINE) {
        this.messageHeaderStatus = localize("ONLINE");
        this.userPresence = CometChat.USER_STATUS.ONLINE;
      }
    },
    updateMessageHeaderStatusForGroup() {
      const status = `${this.group.membersCount} ${localize("MEMBERS")}`;
      this.messageHeaderStatus = status;
    },
    getUser(uid) {
      return new Promise((resolve, reject) => {
        CometChat.getUser(uid)
          .then((user) => resolve(user))
          .catch((error) => reject(error));
      });
    },
    getGroup(guid) {
      return new Promise((resolve, reject) => {
        CometChat.getGroup(guid)
          .then((group) => resolve(group))
          .catch((error) => reject(error));
      });
    },
    getChatWithType() {
      if (this.user && this.user.uid) {
        if (this.user.name) {
          this.chatWithType = CometChatMessageReceiverType.user;
          this.chatWith = this.user;
          this.updateMessageHeaderStatusForUser(this.user);
        } else {
          this.getUser(this.user.uid).then((user) => {
            this.chatWithType = CometChatMessageReceiverType.user;
            this.chatWith = user;
            this.updateMessageHeaderStatusForUser(user);
          });
        }
      } else if (this.group && this.group.guid) {
        if (this.group.name) {
          this.chatWithType = CometChatMessageReceiverType.group;
          this.chatWith = this.group;
          this.updateMessageHeaderStatusForGroup(this.group);
        } else {
          this.getGroup(this.group.guid).then((group) => {
            this.chatWithType = CometChatMessageReceiverType.group;
            this.chatWith = group;
            this.updateMessageHeaderStatusForGroup(group);
          });
        }
      }

      /**Sets the group icon */
      if(this.group?.type == "public") {
        this.groupIcon = "";
      } else if(this.group?.type === "private") {
        this.groupIcon = privateGroupIcon;
      } else if(this.group?.type === "password-protected") {
        this.groupIcon = passwordGroupIcon;
      }
    },
    /**
     *
     * When a user goes online/ offline
     */
    handleUsers(user) {
      if (
        this.chatWithType === CometChatMessageReceiverType.user &&
        this.chatWith?.uid === user.uid
      ) {
        if (user.status === CometChat.USER_STATUS.OFFLINE) {
          this.messageHeaderStatus = localize("OFFLINE");
          this.userPresence = user.status;
        } else if (user.status === CometChat.USER_STATUS.ONLINE) {
          this.messageHeaderStatus = localize("ONLINE");
          this.userPresence = user.status;
        }
      }
    },
    handleGroups(group) {
      if (
        this.chatWithType === CometChatMessageReceiverType.group &&
        this.chatWith?.guid === group.guid
      ) {
        const membersCount = parseInt(group.membersCount);
        const status = `${membersCount} ${localize("MEMBERS")}`;
        this.messageHeaderStatus = status;
      }
    },
    handleStartTyping(userOrGroup) {
      if (
        this.chatWithType === CometChatMessageReceiverType.group &&
        this.chatWithType === userOrGroup.receiverType &&
        this.chatWith?.guid === userOrGroup.receiverId
      ) {
        const typingText = `${userOrGroup.sender.name} ${localize(
          "IS_TYPING"
        )}`;
        this.typingText = typingText;
      } else if (
        this.chatWithType === CometChatMessageReceiverType.user &&
        this.chatWithType === userOrGroup.receiverType &&
        this.chatWith?.uid === userOrGroup.sender.uid
      ) {
        const typingText = localize("TYPING");
        this.typingText = typingText;
      }
    },
    handleEndTyping(userOrGroup) {
      if (
        this.chatWithType === CometChatMessageReceiverType.group &&
        this.chatWithType === userOrGroup.receiverType &&
        this.chatWith?.guid === userOrGroup.receiverId
      ) {
        const status = `${this.chatWith?.membersCount} ${localize("MEMBERS")}`;
        this.messageHeaderStatus = status;
        this.typingText = null;
      } else if (
        this.chatWithType === CometChatMessageReceiverType.user &&
        this.chatWithType === userOrGroup.receiverType &&
        this.chatWith?.uid === userOrGroup.sender.uid
      ) {
        if (this.userPresence === CometChat.USER_STATUS.ONLINE) {
          this.messageHeaderStatus = localize("ONLINE");
          this.userPresence = CometChat.USER_STATUS.ONLINE;
          this.typingText = null;
        } else {
          this.messageHeaderStatus = localize("OFFLINE");
          this.userPresence = CometChat.USER_STATUS.OFFLINE;
          this.typingText = null;
        }
      }
    },
    showTooltip(event) {
      const elem = event.target;
      const scrollWidth = elem.scrollWidth;
      const clientWidth = elem.clientWidth;

      if (scrollWidth <= clientWidth) {
        return false;
      }

      elem.setAttribute("title", elem.textContent);
    },
    hideTooltip(event) {
      const elem = event.target;
      const scrollWidth = elem.scrollWidth;
      const clientWidth = elem.clientWidth;

      if (scrollWidth <= clientWidth) {
        return false;
      }

      elem.removeAttribute("title");
    },
    messageHeaderCallback(listenerName, ...args) {
      this.callbackData = { name: listenerName, args: [...args] };
    },
    refreshData() {
      CometChat.getLoggedinUser()
        .then((user) => {
          messageHeaderManager = new MessageHeaderManager();
          messageHeaderManager.attachListeners(this.messageHeaderCallback);
        })
        .catch((error) => {});

      this.setHandlers();
      this.getChatWithType();
    },
  },
  beforeMount() {
    this.refreshData();
  },
  beforeDestroy() {
    if (this.messageHeaderManager) {
      this.messageHeaderManager.removeListeners();
      this.messageHeaderManager = null;
    }
  },
  beforeUnmount() {
    if (this.messageHeaderManager) {
      this.messageHeaderManager.removeListeners();
      this.messageHeaderManager = null;
    }
  },
};
</script>