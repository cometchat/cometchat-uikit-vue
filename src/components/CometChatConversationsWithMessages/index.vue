<template>
  <div class="cc-withmessages__wrapper" :style="chatsWrapperStyles()">
    <div class="cc-withmessages__sidebar" :class="{ mobile: isMobileView }">
      <CometChatConversations
        ref="conversationRef"
        :activeConversation="activeConversation"
        :onItemClick="conversationConfiguration.onItemClick || onItemClick"
        :conversationsStyle="getConversationStyle()"
        :subtitleView="conversationConfiguration.subtitleView"
        :options="
          conversationConfiguration.options
            ? conversationConfiguration.options
            : undefined
        "
        :disableUsersPresence="conversationConfiguration.disableUsersPresence"
        :disableReceipt="conversationConfiguration.disableReceipt"
        :disableTyping="conversationConfiguration.disableTyping"
        :deliveredIcon="conversationConfiguration.deliveredIcon"
        :readIcon="conversationConfiguration.readIcon"
        :waitIcon="conversationConfiguration.waitIcon"
        :errorIcon="conversationConfiguration.errorIcon"
        :datePattern="conversationConfiguration.datePattern"
        :receiptStyle="conversationConfiguration.receiptStyle"
        :sentIcon="conversationConfiguration.sentIcon"
        :privateGroupIcon="conversationConfiguration.privateGroupIcon"
        :protectedGroupIcon="conversationConfiguration.protectedGroupIcon"
        :customSoundForMessages="
          conversationConfiguration.customSoundForMessages
        "
        :conversationsRequestBuilder="
          conversationConfiguration.conversationsRequestBuilder
        "
        :emptyStateView="conversationConfiguration.emptyStateView"
        :onSelect="conversationConfiguration.onSelect"
        :loadingIconURL="conversationConfiguration.loadingIconURL"
        :errorStateView="conversationConfiguration.errorStateView"
        :loadingStateView="conversationConfiguration.loadingStateView"
        :titleAlignment="conversationConfiguration.titleAlignment"
        :listItemView="conversationConfiguration.listItemView"
        :menu="getMenu()"
        :hideSeparator="conversationConfiguration.hideSeparator"
        :hideError="conversationConfiguration.hideError"
        :selectionMode="conversationConfiguration.selectionMode"
        :disableSoundForMessages="
          conversationConfiguration.disableSoundForMessages
        "
        :deleteConversationDialogStyle="
          conversationConfiguration.deleteConversationDialogStyle
        "
        :badgeStyle="conversationConfiguration.badgeStyle"
        :dateStyle="conversationConfiguration.dateStyle"
        :listItemStyle="conversationConfiguration.listItemStyle"
        :backdropStyle="conversationConfiguration.backdropStyle"
      ></CometChatConversations>
    </div>
    <div
      class="cc-withmessages__main"
      :class="{ mobile: isMobileView }"
      v-if="currentUser || currentGroup"
    >
      <!--Message List Screen-->
      <CometChatMessages
        ref="messagesRef"
        :user="currentUser"
        :group="currentGroup"
        :messageHeaderConfiguration="
          messagesConfiguration.messageHeaderConfiguration
        "
        :messageListConfiguration="
          messagesConfiguration.messageListConfiguration
        "
        :messageComposerConfiguration="
          messagesConfiguration.messageComposerConfiguration
        "
        :messagesStyle="messagesConfiguration.messagesStyle"
        :customSoundForIncomingMessages="
          messagesConfiguration.customSoundForIncomingMessages
        "
        :customSoundForOutgoingMessages="
          messagesConfiguration.customSoundForOutgoingMessages
        "
        :detailsConfiguration="messagesConfiguration.detailsConfiguration"
        :disableSoundForMessages="messagesConfiguration.disableSoundForMessages"
        :disableTyping="messagesConfiguration.disableTyping"
        :hideMessageComposer="messagesConfiguration.hideMessageComposer"
        :hideMessageHeader="messagesConfiguration.hideMessageHeader"
        :messageComposerView="messagesConfiguration.messageComposerView"
        :messageHeaderView="messagesConfiguration.messageHeaderView"
        :messageListView="messagesConfiguration.messageListView"
      >
      </CometChatMessages>
      <!--Message List Screen ENDS-->
    </div>
    <div
      class="cc-decorator__message-empty"
      v-if="!currentUser && !currentGroup"
      :style="emptyMessageStyle()"
    >
      <cometchat-label
        :text="messageText"
        :labelStyle="labelStyle"
      ></cometchat-label>
    </div>
  </div>
</template>

<script lang="ts">
import CometChatMessages from "../CometChatMessages/index.vue";
import CometChatConversations from "../CometChatConversations/index.vue";

import {
  defineComponent,
  onBeforeMount,
  ref,
  Ref,
  onBeforeUpdate,
  onBeforeUnmount,
  onMounted,
  inject,
} from "vue";
import {
  ConversationsConfiguration,
  MessagesConfiguration,
  UsersConfiguration,
  WithMessagesStyle,
} from "uikit-utils-lerna";
import {
  CometChatConversationEvents,
  CometChatGroupEvents,
  CometChatTheme,
  CometChatUIKitConstants,
  CometChatUserEvents,
  fontHelper,
  IGroupLeft,
  IGroupMemberAdded,
  IGroupMemberJoined,
  IGroupMemberKickedBanned,
  IOwnershipChanged,
  localize,
} from "uikit-resources-lerna";

import { CometChat } from "@cometchat-pro/chat";
import { Subscription } from "rxjs";

export default defineComponent({
  name: "CometChatConversationsWithMessages",
  components: { CometChatMessages, CometChatConversations },
  props: {
    user: { type: CometChat.User, default: undefined },
    group: { type: CometChat.Group, default: undefined },
    isMobileView: { type: Boolean, default: false },
    messageText: { type: String, default: () => localize("NO_CHATS_SELECTED") },
    conversationsWithMessagesStyle: {
      type: WithMessagesStyle,
      default: () => {
        return {} as any;
      },
    },
    messagesConfiguration: {
      type: MessagesConfiguration,
      default: new MessagesConfiguration({}),
    },
    conversationConfiguration: {
      type: ConversationsConfiguration,
      default: new ConversationsConfiguration({}),
    },
    onError: {
      type: Function,
      default: (error: any) => {
        console.log(error);
      },
    },
  },
  setup(props, context) {
    let { theme, switchThemeMode }: any = inject(
      "theme",
      new CometChatTheme({})
    )!;
    let loggedInUser: Ref<any> = ref({});

    let labelStyle: any = {
      background: "transparent",
      textFont: "700 22px Inter",
      textColor: theme.value.palette.getAccent(),
    };

    let messagesConfig: Ref<any> = ref(props.messagesConfiguration);
    let currentUser: Ref<any> = ref(props.user);
    let currentGroup: Ref<any> = ref(props.group);
    let usersWithMessagesStyles: any = {};

    let ccGroupMemberAdded!: Subscription;
    let ccGroupLeft!: Subscription;
    let ccGroupMemberJoined!: Subscription;
    let ccGroupMemberKicked!: Subscription;
    let ccGroupMemberBanned!: Subscription;
    let ccOwnershipChanged!: Subscription;
    let ccGroupDeleted!: Subscription;
    let ccConversationDeleted!: Subscription;
    let activeConversation: any = ref(null);

    let conversationsWithMessagesStyles: any = ref(
      props.conversationsWithMessagesStyle
    );

    onBeforeMount(() => {
      setWithMessagesStyle();
      if (!props.messagesConfiguration?.messageHeaderConfiguration?.onBack) {
        messagesConfig.value.messageHeaderConfiguration.onBack = onBack;
      }
      subscribeToEvents();
      CometChat.getLoggedinUser()
        .then((user: CometChat.User | null) => {
          if (user) {
            loggedInUser.value = user;
          }
        })
        .catch((error: any) => {
          let cometchatException = new CometChat.CometChatException({
            message: error.message,
          });
          props.onError(cometchatException);
        });
      setMessageConfig();
    });

    onMounted(() => {
      //updateBackdropHeight();
    });

    //   const updateBackdropHeight= () => {
    //   const divHeight = this.elementRef.nativeElement.offsetHeight;
    //   const divWidth = this.elementRef.nativeElement.offsetWidth;
    //   let backdropStyle =  {
    //     height:divHeight + "px",
    //     width:divWidth + "px",
    //     background:"rgba(0, 0, 0, 0.5)"
    //   }
    //   this.messagesConfiguration.messageListConfiguration.backdropStyle = backdropStyle
    //   this.conversationConfiguration.backdropStyle = backdropStyle
    //   this.messagesConfiguration.detailsConfiguration.backdropStyle = backdropStyle
    //   this.messagesConfiguration.messageComposerConfiguration.backdropStyle = backdropStyle
    //   this.messagesConfiguration.detailsConfiguration.groupMembersConfiguration.backdropStyle = backdropStyle
    //
    // }

    onBeforeUpdate(() => {
      console.log("UPDATE: ", currentUser.value, currentGroup.value);
      setMessageConfig();
    });

    onBeforeUnmount(() => {
      unsubscribeToEvents();
    });

    const setMessageConfig = () => {
      if (props.isMobileView) {
        props.messagesConfiguration!.messageHeaderConfiguration.hideBackButton =
          false;
        props.messagesConfiguration!.messageHeaderConfiguration = {
          ...props.messagesConfiguration!.messageHeaderConfiguration,
        };
        messagesConfig.value = { ...props.messagesConfiguration };
      } else if (!props.isMobileView) {
        props.messagesConfiguration!.messageHeaderConfiguration.hideBackButton =
          true;
        props.messagesConfiguration!.messageHeaderConfiguration = {
          ...props.messagesConfiguration!.messageHeaderConfiguration,
        };
        messagesConfig.value = { ...props.messagesConfiguration };
      }
    };

    const subscribeToEvents = () => {
      ccConversationDeleted =
        CometChatConversationEvents.ccConversationDeleted.subscribe(
          (conversation: CometChat.Conversation) => {
            removeActiveChatList(conversation); //to make m messages section empty after deleting conversation from conversationlist
          }
        );
      ccGroupDeleted = CometChatGroupEvents.ccGroupDeleted.subscribe(
        (group: CometChat.Group) => {
          if (
            currentGroup.value &&
            group.getGuid() == currentGroup.value.getGuid()
          ) {
            currentGroup.value = null;
            activeConversation.value = null;
          }
        }
      );
      ccGroupMemberAdded = CometChatGroupEvents.ccGroupMemberAdded.subscribe(
        (item: IGroupMemberAdded) => {
          if (
            currentGroup.value &&
            currentGroup.value.getGuid() == item?.userAddedIn!.getGuid()
          ) {
            currentGroup.value == item?.userAddedIn;
          }
        }
      );
      ccGroupMemberBanned = CometChatGroupEvents.ccGroupMemberBanned.subscribe(
        (item: IGroupMemberKickedBanned) => {
          if (
            currentGroup.value &&
            currentGroup.value.getGuid() == item?.kickedFrom!.getGuid()
          ) {
            currentGroup.value == item?.kickedFrom;
          }
        }
      );
      ccGroupMemberJoined = CometChatGroupEvents.ccGroupMemberJoined.subscribe(
        (item: IGroupMemberJoined) => {
          if (
            currentGroup.value &&
            currentGroup.value.getGuid() == item?.joinedGroup!.getGuid()
          ) {
            currentGroup.value == item?.joinedGroup;
          }
        }
      );
      ccGroupMemberKicked = CometChatGroupEvents.ccGroupMemberKicked.subscribe(
        (item: IGroupMemberKickedBanned) => {
          if (
            currentGroup.value &&
            currentGroup.value.getGuid() == item?.kickedFrom!.getGuid()
          ) {
            currentGroup.value == item?.kickedFrom;
          }
        }
      );
      ccOwnershipChanged = CometChatGroupEvents.ccOwnershipChanged.subscribe(
        (item: IOwnershipChanged) => {
          if (
            currentGroup.value &&
            currentGroup.value.getGuid() == item?.group!.getGuid()
          ) {
            currentGroup.value == item?.group;
            activeConversation?.value?.setConversationWith(currentGroup.value);
          }
        }
      );
      ccGroupLeft = CometChatGroupEvents.ccGroupLeft.subscribe(
        (item: IGroupLeft) => {
          if (
            currentGroup.value &&
            currentGroup.value.getGuid() == item?.leftGroup!.getGuid() &&
            loggedInUser?.value.getUid() == item?.userLeft?.getUid()
          ) {
            currentGroup.value == null;
            activeConversation.value = null;
          }
        }
      );
    };
    // unsubscribe to subscribed events.
    const unsubscribeToEvents = () => {
      ccConversationDeleted?.unsubscribe();
      ccGroupDeleted?.unsubscribe();
      ccGroupMemberAdded?.unsubscribe();
      ccGroupMemberBanned?.unsubscribe();
      ccGroupMemberJoined?.unsubscribe();
      ccGroupMemberKicked?.unsubscribe();
      ccOwnershipChanged?.unsubscribe();
      ccGroupLeft?.unsubscribe();
    };

    const setWithMessagesStyle = () => {
      console.log("BEFORE THEME");
      console.log("Theme: ", theme.value);
      let defaultStyle: WithMessagesStyle = new WithMessagesStyle({
        width: "100%",
        height: "100%",
        background: theme.value.palette.getBackground(),
        borderRadius: "none",
        border: "none",
        messageTextColor: theme.value.palette.getAccent600(),
        messageTextFont: fontHelper(theme.value.typography.title1),
      });
      conversationsWithMessagesStyles.value = {
        ...defaultStyle,
        ...props.conversationsWithMessagesStyle,
      };
      labelStyle.textFont =
        conversationsWithMessagesStyles.value.messageTextFont;
      labelStyle.textColor =
        conversationsWithMessagesStyles.value.messageTextColor;
    };

    const onBack = () => {
      currentUser.value = null;
      currentGroup.value = null;
      activeConversation.value = null;
    };
    const onItemClick = (conversation: CometChat.Conversation) => {
      activeConversation.value = conversation;
      if (
        conversation.getConversationType() &&
        conversation.getConversationType() ==
          CometChatUIKitConstants.MessageReceiverType.user
      ) {
        currentGroup.value = null;
        currentUser.value =
          conversation.getConversationWith() as CometChat.User;
      } else if (
        conversation.getConversationType() &&
        conversation.getConversationType() ==
          CometChatUIKitConstants.MessageReceiverType.group
      ) {
        currentUser.value = null;
        currentGroup.value =
          conversation.getConversationWith() as CometChat.Group;
      }
    };
    const removeActiveChatList = (conversation: CometChat.Conversation) => {
      const conversationType = conversation.getConversationType();
      const conversationWith = conversation.getConversationWith();
      if (
        conversationType === CometChatUIKitConstants.MessageReceiverType.user &&
        currentUser.value &&
        currentUser.value.getUid() ===
          (conversationWith as CometChat.User).getUid()
      ) {
        currentUser.value = null;
      } else if (
        conversationType ===
          CometChatUIKitConstants.MessageReceiverType.group &&
        currentGroup.value &&
        currentGroup.value.getGuid() ===
          (conversationWith as CometChat.Group).getGuid()
      ) {
        currentGroup.value = null;
      } else {
        return;
      }
    };

    const getMenu = (): any => {
      if (props.conversationConfiguration.menu) {
        if (typeof props.conversationConfiguration.menu == "string") {
          return {
            html: props.conversationConfiguration.menu,
          };
        }
        return props.conversationConfiguration.menu;
      }
    };
    const emptyMessageStyle = () => {
      return {
        background:
          props.conversationsWithMessagesStyle.background ||
          theme.value.palette.getBackground(),
        height: props.conversationsWithMessagesStyle.height,
        width: `calc(${props.conversationsWithMessagesStyle.width} - 280px)`,
        border: props.conversationsWithMessagesStyle.border,
        borderRadius: props.conversationsWithMessagesStyle.borderRadius,
      };
    };
    const chatsWrapperStyles = () => {
      return {
        height: props.conversationsWithMessagesStyle.height,
        width: props.conversationsWithMessagesStyle.width,
        border: props.conversationsWithMessagesStyle.border,
        borderRadius: props.conversationsWithMessagesStyle.borderRadius,
        background:
          props.conversationsWithMessagesStyle.background ||
          theme.value.palette.getBackground(),
      };
    };

    const getConversationStyle = () => {
      let defaultGroupsStyle = {
        height: "98vh",
      };

      return {
        ...defaultGroupsStyle,
        ...props.conversationConfiguration.conversationsStyle,
      };
    };

    return {
      labelStyle,
      onItemClick,
      emptyMessageStyle,
      chatsWrapperStyles,
      messagesConfig,
      currentUser,
      currentGroup,
      activeConversation,
      getMenu,
      getConversationStyle,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cc-withmessages__wrapper {
  display: flex;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
.cc-withmessages__sidebar {
  width: 280px;
  height: 100%;
  position: relative;
}
.cc-withmessages__main {
  width: calc(100% - 280px);
  height: 100%;
  margin-left: 2px;
}
.mobile {
  width: 100% !important;
  height: 100%;
  position: absolute;
}
.cc-decorator__message-empty {
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 280px);
}
</style>
