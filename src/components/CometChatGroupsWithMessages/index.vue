<template>
  <div class="cc-withmessages-wrapper" :style="groupsWrapperStyles()">
    <div class="cc-withmessages__sidebar" :class="{ mobile: isMobileView }">
      <!-- options="groupsConfiguration?.options" -->
      <CometChatGroups
        :activeGroup="currentGroup"
        :hideSearch="groupsConfiguration?.hideSearch"
        :searchIconURL="groupsConfiguration?.searchIconURL"
        :searchRequestBuilder="groupsConfiguration?.searchRequestBuilder"
        :onItemClick="groupsConfiguration?.onItemClick || onItemClick"
        :groupsStyle="getGroupsStyle()"
        :options="
          groupsConfiguration.options ? groupsConfiguration.options : undefined
        "
        :subtitleView="groupsConfiguration?.subtitleView"
        :privateGroupIcon="groupsConfiguration?.privateGroupIcon"
        :protectedGroupIcon="groupsConfiguration?.protectedGroupIcon"
        :groupsRequestBuilder="groupsConfiguration?.groupsRequestBuilder"
        :emptyStateView="groupsConfiguration?.emptyStateView"
        :onSelect="groupsConfiguration?.onSelect"
        :loadingIconURL="groupsConfiguration?.loadingIconURL"
        :errorStateView="groupsConfiguration?.errorStateView"
        :loadingStateView="groupsConfiguration?.loadingStateView"
        :titleAlignment="groupsConfiguration?.titleAlignment"
        :listItemView="groupsConfiguration?.listItemView"
        :menus="
          groupsConfiguration?.menu || !hideCreateGroup
            ? getCreateGroupButton()
            : undefined
        "
        :hideSeparator="groupsConfiguration?.hideSeparator"
        :hideError="groupsConfiguration?.hideError"
        :selectionMode="groupsConfiguration?.selectionMode"
        :listItemStyle="groupsConfiguration?.listItemStyle"
      ></CometChatGroups>
    </div>

    <div
      class="cc-withmessages__main"
      :class="{ mobile: isMobileView }"
      v-if="currentGroup && !openPasswordModal"
    >
      <!--Message List Screen-->
      <CometChatMessages
        :group="currentGroup"
        :messageHeaderConfiguration="messagesConfig?.messageHeaderConfiguration"
        :messageListConfiguration="messagesConfig?.messageListConfiguration"
        :messageComposerConfiguration="
          messagesConfig?.messageComposerConfiguration
        "
        :messagesStyle="messagesConfig?.messagesStyle"
        :customSoundForIncomingMessages="
          messagesConfig?.customSoundForIncomingMessages
        "
        :customSoundForOutgoingMessages="
          messagesConfig?.customSoundForOutgoingMessages
        "
        :detailsConfiguration="messagesConfig?.detailsConfiguration"
        :disableSoundForMessages="messagesConfig?.disableSoundForMessages"
        :disableTyping="messagesConfig?.disableTyping"
        :hideMessageComposer="messagesConfig?.hideMessageComposer"
        :hideMessageHeader="messagesConfig?.hideMessageHeader"
        :messageComposerView="messagesConfig?.messageComposerView"
        :messageHeaderView="messagesConfig?.messageHeaderView"
        :messageListView="messagesConfig?.messageListView"
      >
      </CometChatMessages>
      <!--Message List Screen ENDS-->
    </div>
    <div
      class="cc-decorator-message-empty"
      v-if="!currentGroup && !openPasswordModal"
      :style="emptyMessageStyle()"
    >
      <cometchat-label
        :text="messageText"
        :labelStyle="labelStyle"
      ></cometchat-label>
    </div>
    <div
      class="cc-withmessages__joingroup"
      v-if="openPasswordModal && !currentGroup"
      :style="emptyMessageStyle()"
      :class="{ mobile: isMobileView }"
    >
      <cometchat-join-group
        :group="protectedGroup"
        :joinGroupStyle="getJoinGroupStyle()"
        @cc-joingroup-joined="onGroupJoined"
        :errorCallback="joinGroupConfiguration.onError"
        :joinClick="joinGroupConfiguration.joinClick"
      >
        <div slot="headerView">
          <CometChatMessageHeader
            :group="protectedGroup!"
            :subtitleView="
              joinGroupConfiguration.messageHeaderConfiguration.subtitleView
            "
            :disableUsersPresence="
              joinGroupConfiguration.messageHeaderConfiguration
                .disableUsersPresence
            "
            :protectedGroupIcon="
              joinGroupConfiguration.messageHeaderConfiguration
                .protectedGroupIcon
            "
            :privateGroupIcon="
              joinGroupConfiguration.messageHeaderConfiguration.privateGroupIcon
            "
            :menu="joinGroupConfiguration.messageHeaderConfiguration.menu"
            :messageHeaderStyle="getMessageHeaderStyle()"
            :backButtonIconURL="
              joinGroupConfiguration.messageHeaderConfiguration
                .backButtonIconURL
            "
            :hideBackButton="
              joinGroupConfiguration.messageHeaderConfiguration.hideBackButton
            "
            :onError="joinGroupConfiguration.messageHeaderConfiguration.onError"
            :onBack="
              joinGroupConfiguration.messageHeaderConfiguration.onBack ||
              closeJoinGroup
            "
            :listItemStyle="getListItemStyle()"
            :statusIndicatorStyle="
              joinGroupConfiguration.messageHeaderConfiguration
                .statusIndicatorStyle
            "
            :avatarStyle="
              joinGroupConfiguration.messageHeaderConfiguration.avatarStyle
            "
          >
          </CometChatMessageHeader>
        </div>
      </cometchat-join-group>
    </div>
  </div>

  <cometchat-backdrop v-if="openCreateGroupPage">
    <cometchat-create-group
      :createGroupStyle="getCreateGroupStyle()"
      :hideCloseButton="createGroupConfiguration.hideCloseButton"
      :closeButtonIconURL="createGroupConfiguration.closeButtonIconURL"
      :createClick="createGroupConfiguration.createClick"
      :closeCallback="closeCreateGroup"
    >
    </cometchat-create-group>
  </cometchat-backdrop>
</template>

<script lang="ts">
/*es-lint disabled*/
import CometChatMessages from "../CometChatMessages/index.vue";
import CometChatGroups from "../CometChatGroups/index.vue";
import CometChatMessageHeader from "../CometChatMessageHeader/index.vue";

import {
  defineComponent,
  onBeforeMount,
  ref,
  Ref,
  onBeforeUpdate,
  onBeforeUnmount,
  PropType,
  inject,
} from "vue";
import {
  CometChatUIKitUtility,
  CreateGroupConfiguration,
  GroupsConfiguration,
  JoinGroupConfiguration,
  MessageHeaderStyle,
  MessagesConfiguration,
  WithMessagesStyle,
} from "uikit-utils-lerna";
import { CreateIcon } from "../../assets";
import {
  CometChatGroupEvents,
  CometChatTheme,
  CometChatUIKitConstants,
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
import {
  CreateGroupStyle,
  JoinGroupStyle,
  ListItemStyle,
} from "my-cstom-package-lit";

export default defineComponent({
  name: "CometChatGroupsWithMessages",
  components: { CometChatMessages, CometChatGroups, CometChatMessageHeader },
  props: {
    group: { type: CometChat.Group },
    hideCreateGroup: { type: Boolean, default: false },
    isMobileView: { type: Boolean, default: false },
    messageText: { type: String, default: () => localize("SELECT__GROUP") },
    groupsWithMessagesStyle: {
      type: WithMessagesStyle,
      default: () => {
        return {} as any;
      },
    },
    messagesConfiguration: {
      type: MessagesConfiguration,
      default: new MessagesConfiguration({}),
    },
    groupsConfiguration: {
      type: GroupsConfiguration,
      default: new GroupsConfiguration({}),
    },
    createGroupConfiguration: {
      type: CreateGroupConfiguration,
      default: new CreateGroupConfiguration({}),
    },
    joinGroupConfiguration: {
      type: JoinGroupConfiguration,
      default: new JoinGroupConfiguration({}),
    },
    onError: {
      type: Function as PropType<(error: CometChat.CometChatException) => void>,
      default: (error: CometChat.CometChatException) => {
        console.log(error);
      },
    },
  },
  setup(props) {
    let { theme, switchThemeMode }: any = inject(
      "theme",
      new CometChatTheme({})
    )!;
    let loggedInUser: Ref<any> = ref({});

    let labelStyle: any = {
      background: "transparent",
      textFont: "700 22px Inter",
      textColor: theme.value.palette.getAccent600(),
    };

    let messagesConfig: Ref<any> = ref(props.messagesConfiguration!);
    let currentGroup: Ref<any> = ref(props.group);
    let joinGroupConfig: Ref<any> = ref(props.joinGroupConfiguration);

    let openPasswordModal = ref(false);
    let openCreateGroupPage = ref(false);
    let groupsWithMessagesStyle: any = {};
    let createGroupStyle: CreateGroupStyle = {};
    let joinGroupStyle: JoinGroupStyle = {};
    let messageHeaderStyle: MessageHeaderStyle = {};
    let listItemStyle: ListItemStyle = {};

    let ccGroupMemberAdded!: Subscription;
    let ccGroupLeft!: Subscription;
    let ccGroupMemberJoined!: Subscription;
    let ccGroupMemberKicked!: Subscription;
    let ccGroupMemberBanned!: Subscription;
    let ccOwnershipChanged!: Subscription;
    let ccGroupDeleted!: Subscription;
    let ccGroupCreated!: Subscription;
    let backdropStyle: any = {};

    let protectedGroup: any = ref(null);
    let createGroupButtonStyle: any = {
      height: "24px",
      width: "24px",
      border: "none",
      borderRadius: "0",
      background: "transparent",
      buttonIconTint: "RGB(51, 153, 255)",
    };
    onBeforeMount(() => {
      currentGroup.value = props.group;
      setWithMessagesStyle();
      setCreateGroupStyles();
      setListItemStyle();
      setJoinGroupStyles();
      setHeadersStyle();
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

    onBeforeUpdate(() => {
      setMessageConfig();
    });

    onBeforeUnmount(() => {
      unsubscribeToEvents();
    });

    const onBack = () => {
      currentGroup.value = null;
    };

    const setWithMessagesStyle = () => {
      let defaultStyle: WithMessagesStyle = new WithMessagesStyle({
        width: "100%",
        height: "100%",
        background: theme.value.palette.getBackground(),
        borderRadius: "none",
        border: "none",
        messageTextColor: theme.value.palette.getAccent600(),
        messageTextFont: fontHelper(theme.value.typography.title1),
      });
      groupsWithMessagesStyle = {
        ...defaultStyle,
        ...props.groupsWithMessagesStyle,
      };
      labelStyle.textFont =
        props.groupsWithMessagesStyle.messageTextFont || labelStyle.textFont;
      labelStyle.textColor =
        props.groupsWithMessagesStyle.messageTextColor || labelStyle.textColor;
    };

    const setHeadersStyle = () => {
      let defaultStyle: MessageHeaderStyle = new MessageHeaderStyle({
        background: theme.value.palette.getBackground(),
        border: `none`,
        onlineStatusColor: theme.value.palette.getSuccess(),
        privateGroupIconBackground: theme.value.palette.getSuccess(),
        passwordGroupIconBackground: "RGB(247, 165, 0)",
        backButtonIconTint: theme.value.palette.getPrimary(),
        subtitleTextColor: theme.value.palette.getAccent600(),
        subtitleTextFont: fontHelper(theme.value.typography.subtitle2),
        typingIndicatorTextColor: theme.value.palette.getPrimary(),
        typingIndicatorTextFont: fontHelper(theme.value.typography.subtitle1),
      });
      messageHeaderStyle = {
        ...defaultStyle,
        ...props.joinGroupConfiguration.messageHeaderConfiguration
          .messageHeaderStyle,
      };
    };

    const setMessageConfig = () => {
      let messagesConfiguration = props.messagesConfiguration;
      let joinGroupConfiguration = props.joinGroupConfiguration;
      if (props.isMobileView) {
        messagesConfiguration!.messageHeaderConfiguration.hideBackButton =
          false;
        messagesConfiguration!.messageHeaderConfiguration = {
          ...props.messagesConfiguration!.messageHeaderConfiguration,
        };
        messagesConfig.value = { ...messagesConfiguration! };
        joinGroupConfiguration!.messageHeaderConfiguration.hideBackButton =
          false;
        joinGroupConfiguration!.messageHeaderConfiguration = {
          ...props.joinGroupConfiguration!.messageHeaderConfiguration,
        };
        joinGroupConfig.value = { ...joinGroupConfiguration };
      } else if (!props.isMobileView) {
        messagesConfiguration!.messageHeaderConfiguration.hideBackButton = true;
        messagesConfiguration!.messageHeaderConfiguration = {
          ...props.messagesConfiguration!.messageHeaderConfiguration,
        };
        messagesConfig.value = { ...messagesConfiguration! };
        joinGroupConfiguration!.messageHeaderConfiguration.hideBackButton =
          true;
        joinGroupConfiguration!.messageHeaderConfiguration = {
          ...props.joinGroupConfiguration!.messageHeaderConfiguration,
        };
        joinGroupConfig.value = { ...joinGroupConfiguration };
      }
    };

    const setCreateGroupStyles = () => {
      let defaultStyle: CreateGroupStyle = new CreateGroupStyle({
        boxShadow: `${theme.value.palette.getAccent100()} 4px 16px 32px 4px`,
        groupTypeTextFont: fontHelper(theme.value.typography.subtitle2),
        groupTypeBorder: `1px solid ${theme.value.palette.getAccent600()}`,
        groupTypeBorderRadius: "0",
        groupTypeTextColor: theme.value.palette.getAccent(),
        groupTypeTextBackground: "transparent",
        groupTypeBackground: theme.value.palette.getAccent100(),
        groupTypeBoxShadow: "",
        activeGroupTypeTextFont: fontHelper(theme.value.typography.subtitle2),
        activeGroupTypeTextColor: theme.value.palette.getAccent(),
        activeGroupTypeBackground: theme.value.palette.getAccent900(),
        activeGroupTypeBoxShadow: `${theme.value.palette.getAccent200()} 0 3px 8px 0`,
        activeGroupTypeBorderRadius: "8px",
        activeGroupTypeBorder: "none",
        groupTypeTextBoxShadow: "none",
        groupTypeTextBorderRadius: "0",
        closeIconTint: theme.value.palette.getPrimary(),
        titleTextFont: fontHelper(theme.value.typography.title1),
        titleTextColor: theme.value.palette.getAccent(),
        errorTextFont: fontHelper(theme.value.typography.subtitle1),
        errorTextBackground: theme.value.palette.getError(),
        errorTextBorderRadius: "8px",
        errorTextBorder: "none",
        errorTextColor: theme.value.palette.getError(),
        nameInputPlaceholderTextFont: fontHelper(
          theme.value.typography.subtitle1
        ),
        nameInputPlaceholderTextColor: theme.value.palette.getAccent600(),
        nameInputBackground: theme.value.palette.getAccent100(),
        nameInputTextFont: fontHelper(theme.value.typography.subtitle1),
        nameInputTextColor: theme.value.palette.getAccent(),
        nameInputBorder: "none",
        nameInputBorderRadius: "8px",
        nameInputBoxShadow: `${theme.value.palette.getAccent100()} 0 0 0 1px`,
        passwordInputPlaceholderTextFont: fontHelper(
          theme.value.typography.subtitle1
        ),
        passwordInputPlaceholderTextColor: theme.value.palette.getAccent600(),
        passwordInputBackground: theme.value.palette.getAccent100(),
        passwordInputBorder: "none",
        passwordInputBorderRadius: "8px",
        passwordInputBoxShadow: `${theme.value.palette.getAccent100()} 0 0 0 1px`,
        passwordInputTextFont: fontHelper(theme.value.typography.subtitle1),
        passwordInputTextColor: theme.value.palette.getAccent(),
        createGroupButtonTextFont: fontHelper(theme.value.typography.text2),
        createGroupButtonTextColor: theme.value.palette.getAccent900("light"),
        createGroupButtonBackground: theme.value.palette.getPrimary(),
        createGroupButtonBorderRadius: "8px",
        createGroupButtonBorder: "none",
        height: "620px",
        width: "360px",
        borderRadius: "8px",
        background: theme.value.palette.getBackground(),
      });
      createGroupStyle = {
        ...defaultStyle,
        ...props.createGroupConfiguration?.createGroupStyle,
      };
    };

    const setListItemStyle = () => {
      let defaultStyle: ListItemStyle = new ListItemStyle({
        height: "45px",
        width: "100%",
        background: theme.value.palette.getBackground(),
        activeBackground: "transparent",
        borderRadius: "0",
        titleFont: fontHelper(theme.value.typography.title2),
        titleColor: theme.value.palette.getAccent(),
        border: "none",
        separatorColor: "",
        hoverBackground: "transparent",
      });
      listItemStyle = {
        ...defaultStyle,
        ...props.joinGroupConfiguration?.messageHeaderConfiguration
          .listItemStyle,
      };
    };

    const setJoinGroupStyles = () => {
      let defaultStyle: JoinGroupStyle = new JoinGroupStyle({
        boxShadow: `${theme.value.palette.getAccent100()} 0px 16px 32px 0px`,
        titleTextFont: fontHelper(theme.value.typography.title1),
        titleTextColor: theme.value.palette.getAccent(),
        passwordInputPlaceholderTextFont: fontHelper(
          theme.value.typography.subtitle1
        ),
        passwordInputPlaceholderTextColor: theme.value.palette.getAccent600(),
        passwordInputBackground: theme.value.palette.getAccent100(),
        passwordInputBorder: "none",
        passwordInputBorderRadius: "8px",
        passwordInputBoxShadow: `${theme.value.palette.getAccent100()} 0 0 0 1px`,
        passwordInputTextFont: fontHelper(theme.value.typography.subtitle1),
        passwordInputTextColor: theme.value.palette.getAccent(),
        height: "100vh",
        width: "100%",
        joinButtonTextFont: fontHelper(theme.value.typography.subtitle1),
        joinButtonTextColor: theme.value.palette.getAccent("dark"),
        joinButtonBackground: theme.value.palette.getPrimary(),
        joinButtonBorderRadius: "8px",
        joinButtonBorder: "none",
        background: theme.value.palette.getBackground(),
      });
      joinGroupStyle = {
        ...defaultStyle,
        ...props.joinGroupConfiguration?.joinGroupStyle,
      };
    };

    const subscribeToEvents = () => {
      ccGroupDeleted = CometChatGroupEvents.ccGroupDeleted.subscribe(
        (group: CometChat.Group) => {
          if (
            currentGroup.value &&
            group.getGuid() == currentGroup.value.getGuid()
          ) {
            currentGroup.value = null;
          }
        }
      );
      ccGroupCreated = CometChatGroupEvents.ccGroupCreated.subscribe(
        (group: CometChat.Group) => {
          if (group) {
            currentGroup.value = CometChatUIKitUtility.clone(
              group
            ) as CometChat.Group;
            openCreateGroupPage.value = false;
          }
        }
      );
      ccGroupMemberAdded = CometChatGroupEvents.ccGroupMemberAdded.subscribe(
        (item: IGroupMemberAdded) => {
          if (
            currentGroup.value &&
            currentGroup.value.getGuid() == item?.userAddedIn!.getGuid()
          ) {
            currentGroup.value = CometChatUIKitUtility.clone(
              item?.userAddedIn
            ) as CometChat.Group;
          }
        }
      );
      ccGroupMemberBanned = CometChatGroupEvents.ccGroupMemberBanned.subscribe(
        (item: IGroupMemberKickedBanned) => {
          if (
            currentGroup.value &&
            currentGroup.value.getGuid() == item?.kickedFrom!.getGuid()
          ) {
            currentGroup.value = CometChatUIKitUtility.clone(
              item?.kickedFrom
            ) as CometChat.Group;
          }
        }
      );
      ccGroupMemberJoined = CometChatGroupEvents.ccGroupMemberJoined.subscribe(
        (item: IGroupMemberJoined) => {
          if (
            protectedGroup.value &&
            protectedGroup.value.getGuid() == item?.joinedGroup!.getGuid()
          ) {
            openPasswordModal.value = false;
            protectedGroup.value = null;
            currentGroup.value = CometChatUIKitUtility.clone(
              item?.joinedGroup
            ) as CometChat.Group;
          }
        }
      );
      ccGroupMemberKicked = CometChatGroupEvents.ccGroupMemberKicked.subscribe(
        (item: IGroupMemberKickedBanned) => {
          if (
            currentGroup.value &&
            currentGroup.value.getGuid() == item?.kickedFrom!.getGuid()
          ) {
            currentGroup.value = CometChatUIKitUtility.clone(
              item?.kickedFrom
            ) as CometChat.Group;
          }
        }
      );
      ccOwnershipChanged = CometChatGroupEvents.ccOwnershipChanged.subscribe(
        (item: IOwnershipChanged) => {
          if (
            currentGroup.value &&
            currentGroup.value.getGuid() == item?.group!.getGuid()
          ) {
            currentGroup.value = CometChatUIKitUtility.clone(
              item?.group
            ) as CometChat.Group;
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
            currentGroup.value = CometChatUIKitUtility.clone(
              item?.leftGroup
            ) as CometChat.Group;
          }
        }
      );
    };

    const openCreateGroup = () => {
      openCreateGroupPage.value = true;
    };

    const closeCreateGroup = () => {
      openCreateGroupPage.value = false;
    };
    const closeJoinGroup = () => {
      openPasswordModal.value = false;
    };

    // unsubscribe to subscribed events.
    const unsubscribeToEvents = () => {
      ccGroupDeleted?.unsubscribe();
      ccGroupMemberAdded?.unsubscribe();
      ccGroupMemberBanned?.unsubscribe();
      ccGroupMemberJoined?.unsubscribe();
      ccGroupMemberKicked?.unsubscribe();
      ccOwnershipChanged?.unsubscribe();
      ccGroupLeft?.unsubscribe();
    };

    const onItemClick = (group: CometChat.Group) => {
      openPasswordModal.value = false;
      if (group.getHasJoined()) {
        currentGroup.value = group;
        return;
      }
      if (group.getType() == CometChatUIKitConstants.GroupTypes.password) {
        currentGroup.value = null;
        protectedGroup.value = group;
        openPasswordModal.value = true;

        return;
      }
      CometChat.joinGroup(group)
        .then(() => {
          group.setHasJoined(true);

          currentGroup.value = group;
        })
        .catch((error: any) => {
          if (props.onError) {
            props.onError(error);
          }
        });
    };

    const onGroupJoined = (event: any) => {
      let group: CometChat.Group = event?.detail?.response;
      openPasswordModal.value = false;
      protectedGroup.value = null;
      if (group) {
        currentGroup.value = group;
      }
    };
    const updatedCreatedGroup = (event: any) => {
      let group: CometChat.Group = event?.detail?.group;
      if (group) {
        currentGroup.value = group;
        openCreateGroupPage.value = false;
        CometChatGroupEvents.ccGroupCreated.next(group);
      }
    };

    const emptyMessageStyle = () => {
      return {
        background:
          groupsWithMessagesStyle.background ||
          theme.value.palette.getBackground(),
        height: groupsWithMessagesStyle.height,
        width: `calc(${groupsWithMessagesStyle.width} - 280px)`,
        border: groupsWithMessagesStyle.border,
        borderRadius: groupsWithMessagesStyle.borderRadius,
      };
    };
    const groupsWrapperStyles = () => {
      return {
        height: groupsWithMessagesStyle.height,
        width: groupsWithMessagesStyle.width,
        border: groupsWithMessagesStyle.border,
        borderRadius: groupsWithMessagesStyle.borderRadius,
        background:
          groupsWithMessagesStyle.background ||
          theme.value.palette.getBackground(),
      };
    };

    const getGroupsStyle = () => {
      let defaultGroupsStyle = {
        height: "100vh",
      };

      return {
        ...defaultGroupsStyle,
        ...props.groupsConfiguration.groupsStyle,
      };
    };
    const getCreateGroupButton = () => {
      return {
        componentName: "cometchat-button",
        props: {
          buttonStyle: createGroupButtonStyle,
          iconURL: CreateIcon,
        },
        listeners: {
          "cc-button-clicked": () => {
            openCreateGroup();
          },
        },
      };
    };

    const getCreateGroupStyle = () => {
      return createGroupStyle;
    };

    const getJoinGroupStyle = () => {
      return joinGroupStyle;
    };

    const getMessageHeaderStyle = () => {
      return messageHeaderStyle;
    };
    const getListItemStyle = () => {
      return listItemStyle;
    };

    return {
      labelStyle,
      onItemClick,
      emptyMessageStyle,
      groupsWrapperStyles,
      messagesConfig,
      currentGroup,
      openPasswordModal,
      openCreateGroup,
      closeCreateGroup,
      closeJoinGroup,
      onGroupJoined,
      CreateIcon,
      updatedCreatedGroup,
      getCreateGroupButton,
      openCreateGroupPage,
      backdropStyle,
      getCreateGroupStyle,
      protectedGroup,
      getJoinGroupStyle,
      getMessageHeaderStyle,
      getListItemStyle,
      getGroupsStyle,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cc-withmessages-wrapper {
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
.cc__decorator__message--empty {
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 280px);
}

.cc-withmessages__joingroup {
  width: calc(100% - 280px);
  height: 100vh;
}
.cc-decorator-message-empty {
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 280px);
}
</style>
