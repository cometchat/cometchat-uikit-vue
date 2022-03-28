<template>
  <div :style="styles.root" class="cometchat__chats">
    <div :style="styles.sidebar" class="chats__sidebar">
      <CometChatConversations v-bind="$props" />
    </div>
    <div v-if="isItemPresent" class="chats__main" :style="styles.main">
      <CometChatMessages
        :tab="tab"
        :user="user"
        :group="group"
        :messageFilterList="messageFilterList"
        :messageAlignment="'leftAligned'"
        :messageTimeAlignment="'bottom'"
      />
    </div>
    <div
      v-if="viewDetailScreen"
      :style="styles.secondary"
      class="chats__secondary-view"
    >
      <CometChatUserDetails
        :item="item"
        :type="type"
        :theme="themeValue"
        v-if="type === 'user'"
        @action="actionHandler"
      />
      <CometChatGroupDetails
        :item="item"
        :type="type"
        :theme="themeValue"
        v-else-if="type === 'group'"
        @action="actionHandler"
      />
    </div>
    <div
      v-if="viewThreadMessage"
      :style="styles.secondary"
      class="chats__secondary-view"
    >
      <CometChatMessageThread
        :tab="tab"
        :theme="themeValue"
        :item="threadMessageItem"
        :type="threadMessageType"
        :logged-in-user="loggedInUser"
        :parent-message="threadMessageParent"
        @action="actionHandler"
      />
    </div>
    <CometChatIncomingCall :theme="themeValue" @action="actionHandler" />
    <CometChatOutgoingCall
      :item="item"
      :type="type"
      :theme="themeValue"
      :incoming-call="incomingCall"
      :outgoing-call="outgoingCall"
      :logged-in-user="loggedInUser"
      @action="actionHandler"
    />
    <CometChatImageViewer
      :open="true"
      v-if="imageView"
      :message="imageView"
      @action="actionHandler"
    />
  </div>
</template>

<!--eslint-disable-->
<script>
import { DEFAULT_OBJECT_PROP } from "../";

import { CometChatManager } from "../../../util/controller";

import {
  CometChatMessages,
  CometChatImageViewer,
  CometChatMessageThread,
  CometChatMessageTemplate,
  CometChatCustomMessageTypes,
  CometChatCustomMessageOptions,
  CometChatMessageTypes,
  CometChatMessageOptions,
} from "../../Messages/";
import { CometChatUserDetails } from "../../Users";
import { CometChatGroupDetails } from "../../Groups";
import { CometChatIncomingCall, CometChatOutgoingCall } from "../../Calls";

import CometChatConversations from "../CometChatConversations/CometChatConversations";
import { theme } from "../../../resources/theme";

import * as style from "./style";
import { DEFAULT_STRING_PROP } from './resources/constants';
import { CometChatConversationEvents } from '../CometChatConversationEvents';
import { CometChatConversationConstants } from '../CometChatConversationConstants';
import { CometChat } from '@cometchat-pro/chat';

/**
 * Displays a list of conversation with messages.
 *
 * @displayName CometChatConversationListItem
 */
export default {
  name: "CometChatConversationListWithMessages",
  components: {
    CometChatImageViewer,
    CometChatIncomingCall,
    CometChatOutgoingCall,
    CometChatUserDetails,
    CometChatGroupDetails,
    CometChatMessageThread,
    CometChatMessages,
    CometChatConversations,
  },
  props: {
    /**
     * Theme of the UI.
     */
    theme: { ...DEFAULT_OBJECT_PROP },
    title: { ...DEFAULT_STRING_PROP, default: 'Chats'},
  },
  data() {
    return {
      user: {},
      group: {},
      item: {},
      type: "",
      imageView: null,
      darkTheme: false,
      lastMessage: {},
      callMessage: {},
      groupToLeave: {},
      groupToDelete: {},
      groupToUpdate: {},
      groupMessages: [],
      viewSidebar: false,
      incomingCall: null,
      outgoingCall: null,
      loggedInUser: null,
      tab: "conversations",
      messageToMarkRead: {},
      threadMessageItem: {},
      actionFromListener: {},
      viewDetailScreen: false,
      threadMessageType: null,
      threadMessageParent: {},
      viewThreadMessage: false,
      composedThreadMessage: {},
      state: this,
      messageFilterList: [
        new CometChatMessageTemplate({
          type: CometChatMessageTypes.text,
          name: "Text",
          options: [
            CometChatMessageOptions.edit,
            CometChatMessageOptions.delete,
            CometChatMessageOptions.replyInPrivate,
            CometChatMessageOptions.reactToMessage,
            CometChatMessageOptions.translate,
          ],
        }),
        new CometChatMessageTemplate({
          type: CometChatMessageTypes.image,
          name: "Image",
          options: [
            CometChatMessageOptions.edit,
            CometChatMessageOptions.delete,
            CometChatMessageOptions.replyInPrivate,
            CometChatMessageOptions.reactToMessage,
            CometChatMessageOptions.translate,
          ],
        }),
        new CometChatMessageTemplate({
          type: CometChatMessageTypes.file,
          name: "File",
          options: [
            CometChatMessageOptions.edit,
            CometChatMessageOptions.delete,
            CometChatMessageOptions.replyInPrivate,
            CometChatMessageOptions.reactToMessage,
            CometChatMessageOptions.translate,
          ],
        }),
        new CometChatMessageTemplate({
          type: CometChatMessageTypes.audio,
          name: "Audio",
          options: [
            CometChatMessageOptions.edit,
            CometChatMessageOptions.delete,
            CometChatMessageOptions.replyInPrivate,
            CometChatMessageOptions.reactToMessage,
            CometChatMessageOptions.translate,
          ],
        }),
        new CometChatMessageTemplate({
          type: CometChatMessageTypes.video,
          name: "Video",
          options: [
            CometChatMessageOptions.edit,
            CometChatMessageOptions.delete,
            CometChatMessageOptions.replyInPrivate,
            CometChatMessageOptions.reactToMessage,
            CometChatMessageOptions.translate,
          ],
        }),
        new CometChatMessageTemplate({
          type: CometChatCustomMessageTypes.poll,
          name: "Poll",
          options: [
            CometChatCustomMessageOptions.delete,
            CometChatCustomMessageOptions.replyInPrivate,
            CometChatCustomMessageOptions.reactToMessage
          ],
        }),
        new CometChatMessageTemplate({
          type: CometChatCustomMessageTypes.sticker,
          name: "Sticker",
          options: [
            CometChatCustomMessageOptions.delete,
            CometChatCustomMessageOptions.replyInPrivate,
            CometChatCustomMessageOptions.reactToMessage
          ],
        }),
        new CometChatMessageTemplate({
          type: CometChatCustomMessageTypes.document,
          name: "Document",
          options: [
            CometChatCustomMessageOptions.delete,
            CometChatCustomMessageOptions.replyInPrivate,
            CometChatCustomMessageOptions.reactToMessage
          ],
        }),
        new CometChatMessageTemplate({
          type: CometChatCustomMessageTypes.whiteboard,
          name: "Whiteboard",
          options: [
            CometChatCustomMessageOptions.delete,
            CometChatCustomMessageOptions.replyInPrivate,
            CometChatCustomMessageOptions.reactToMessage
          ],
        }),
      ],
    };
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        root: style.chatScreenStyle(this.themeValue),
        main: style.chatScreenMainStyle(
          this.viewThreadMessage,
          this.viewDetailScreen
        ),
        sidebar: style.chatScreenSidebarStyle(
          this.themeValue,
          this.viewSidebar
        ),
        secondary: style.chatScreenSecondaryStyle(
          this.themeValue,
          this.viewThreadMessage
        ),
      };
    },
    /**
     * Theme computed using default theme and theme coming from prop.
     */
    themeValue() {
      return Object.assign({}, theme, this.theme);
    },
    isItemPresent() {
      return !!Object.keys(this.user).length || !!Object.keys(this.group).length;
    },
  },
  methods: {
    /**
     * Handler for emitted action events
     */
    actionHandler({
      action,
      key,
      item,
      call,
      type,
      count,
      group,
      members,
      options,
      message,
      messages,
      incomingCall,
      rejectedCall,
    }) {
      switch (action) {
        case "item-click":
          this.itemClicked(item, type);
          break;
        case "blockUser":
          this.blockUser();
          break;
        case "unblockUser":
          this.unblockUser();
          break;
        case "audioCall":
          this.audioCall();
          break;
        case "videoCall":
          this.videoCall();
          break;
        case "viewDetail":
        case "closeDetailClicked":
          this.toggleDetailView();
          break;
        case "menuClicked":
          this.item = {};
          this.toggleSideBar();
          break;
        case "closeMenuClicked":
          this.toggleSideBar();
          break;
        case "groupUpdated":
          this.groupUpdated(key, options);
          break;
        case "groupDeleted":
          this.deleteGroup(group);
          break;
        case "leftGroup":
          this.leaveGroup(group);
          break;
        case "membersUpdated":
          this.updateMembersCount(count);
          break;
        case "viewMessageThread":
          this.viewMessageThread(message);
          break;
        case "closeThreadClicked":
          this.closeThreadMessages();
          break;
        case "threadMessageComposed":
          this.onThreadMessageComposed(messages);
          this.updateLastMessage(messages[0]);
          break;
        case "acceptIncomingCall":
          this.acceptIncomingCall(incomingCall);
          break;
        case "acceptedIncomingCall":
          this.appendCallMessage(call);
          break;
        case "rejectedIncomingCall":
          this.rejectedIncomingCall(incomingCall, rejectedCall);
          break;
        case "outgoingCallRejected":
        case "outgoingCallCancelled":
        case "callEnded":
          this.outgoingCallEnded(call);
          break;
        case "userJoinedCall":
        case "userLeftCall":
          this.appendCallMessage(call);
          break;
        case "viewActualImage":
          this.setImageView(message);
          break;
        case "closeActualImage":
          this.setImageView(null);
          break;
        case "membersAdded":
          this.membersAdded(members);
          break;
        case "memberUnbanned":
          this.memberUnbanned(members);
          break;
        case "memberScopeChanged":
          this.memberScopeChanged(members);
          break;
        case "messageDeleted":
          this.closeThreadMessages();
          break;
        case "messageComposed":
        case "lastMessageEdited":
        case "lastMessageDeleted":
          this.updateLastMessage(messages[0]);
          break;
        case "messageEdited":
          this.updateThreadMessage(message);
          break;
        case "listenerData":
          this.actionFromListener = { action: action, messages: [...messages] };
          break;
        default:
          break;
      }
    },
    toggleSideBar() {
      this.viewSidebar = !this.viewSidebar;
    },
    addListeners() {
      CometChatConversationEvents.addListener(
        CometChatConversationEvents.onItemClick,
        "onItemClick",
        (data) => {
          this.toggleSideBar();
          // this.item = data;
          if(data?.uid) {
            this.user = data;
            this.group = {};
          } else if(data?.guid) {
            this.group = data;
            this.user = {};
          }
        
        }
      );
    },
    removeListeners() {
      CometChatConversationEvents.removeListener(
        CometChatConversationEvents.onItemClick,
        "onItemClick"
      );
    },
  },
  beforeMount() {
    if (!Object.keys(this.item).length) {
      this.toggleSideBar();
    }

    (async () => {
      try {
        this.loggedInUser = await new CometChatManager().getLoggedInUser();
      } catch (error) {
        this.logError(
          "[CometChatConversationScreen] getLoggedInUser error",
          error
        );
      }
    })();

    this.addListeners();
  },
  beforeDestroy() {
    this.removeListeners();
  },
  beforeUnmount() {
    this.removeListeners();
  }
};
</script>

<style scoped>
.cometchat__chats * {
  box-sizing: border-box;
  font-family: var(--chat-screen-font-family) !important;
}
@media (min-width: 320px) and (max-width: 767px) {
  .chats__sidebar {
    top: 0;
    bottom: 0;
    z-index: 2;
    width: 100% !important;
    transition: all 0.3s ease-out;
    position: absolute !important;
    left: var(--cometchat-chats-sidebar-left);
    background-color: var(--cometchat-chats-sidebar-bg);
    box-shadow: var(--cometchat-chats-sidebar-box-shadow);
  }
  .chats__main {
    width: 100% !important;
  }
  .chats__secondary-view {
    top: 0;
    bottom: 0;
    z-index: 2;
    right: 0 !important;
    width: 100% !important;
    position: absolute !important;
    background-color: var(--chats-secondary-bg-color) !important;
  }
}
</style>