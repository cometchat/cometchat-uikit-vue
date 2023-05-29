<template>
  <div class="cc-messageheader__wrapper" :style="headerStyle()">
    <div class="cc-messageheader">
      <div class="cc-messageheader__backbutton" v-if="!hideBackButton">
        <cometchat-button
          :iconURL="backButtonIconURL"
          :buttonStyle="getBackButtonStyle()"
          @cc-button-clicked="onBackClicked()"
        ></cometchat-button>
      </div>
      <div class="cc-messageheader__listitem">
        <div v-if="listItemView">
          <div v-if="listItemView.html" v-html="listItemView.html"></div>
          <component
            v-else
            :is="listItemView.componentName"
            v-bind="{ ...listItemView.props }"
            v-on="listItemView?.listeners ? listItemView?.listeners : {}"
          >
            <template v-for="(html, key) in listItemView.slots" :key="key">
              <div :v-slot="[key]" :v-html="html"></div>
            </template>
          </component>
        </div>
        <cometchat-list-item
          v-else
          :avatarName="currentUser?.getName() || currentGroup?.getName()"
          :avatarURL="currentUser?.getAvatar() || currentGroup?.getIcon()"
          :listItemStyle="getListItemStyle()"
          :statusIndicatorColor="checkStatusType()"
          :statusIndicatorIcon="checkGroupType()"
          :title="currentUser?.getName() || currentGroup?.getName()"
          :hideSeparator="true"
          :statusIndicatorStyle="getStatusStyle()"
          :avatarStyle="getAvatarStyles()"
        >
          <div slot="subtitleView">
            <div v-if="subtitleView" v-html="subtitleView"></div>
            <div v-else>
              <cometchat-label
                :text="subtitleText"
                :labelStyle="subtitleStyle()"
              ></cometchat-label>
            </div>
          </div>
        </cometchat-list-item>
      </div>
    </div>
    <div class="cc-messageheader__menu" v-if="menu && menu.length">
      <div v-for="(item, i) of menu" :key="i">
        <div v-if="item.html" v-html="item.html"></div>
        <component
          v-else
          :is="item.componentName"
          v-on="item.listeners ? item.listeners : {}"
          v-bind="{ ...item.props }"
        >
        </component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
const defaultBackButtonStyle = () => {
  return {
    height: "24px",
    width: "24px",
    border: "none",
    borderRadius: "none",
    background: "transparent",
    buttonIconTint: "#3399FF",
  };
};

const MessageHeaderMenuStyle = () => {
  return {
    width: "fit-content",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "12px",
  };
};

import {
  defineComponent,
  onBeforeMount,
  ref,
  Ref,
  onBeforeUpdate,
  onBeforeUnmount,
  inject,
} from "vue";
import {
  MessageHeaderStyle,
  BaseStyle,
  CometChatUIKitUtility,
} from "uikit-utils-lerna";
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

import { PrivateGroupIcon, PasswordGroupIcon, BackIcon } from "../../assets";

import {
  AvatarStyle,
  CometChatTextBubble,
  ListItemStyle,
} from "my-cstom-package-lit";
import CometChatCallButtons from "../Calling/CometChatCallButtons/index.vue";
import { CometChat } from "@cometchat-pro/chat";
import { Subscription } from "rxjs";

export default defineComponent({
  name: "CometChatMessageHeader",
  components: { CometChatTextBubble, CometChatCallButtons },
  props: {
    avatarStyle: { type: AvatarStyle, default: {} },
    statusIndicatorStyle: { type: BaseStyle, default: {} },
    messageHeaderStyle: {
      type: MessageHeaderStyle,
      default: new MessageHeaderStyle({}),
    },
    listItemStyle: { type: ListItemStyle },
    subtitleView: null,
    disableUsersPresence: { default: false },
    disableTyping: { default: false },
    protectedGroupIcon: { default: PasswordGroupIcon },
    privateGroupIcon: { default: PrivateGroupIcon },
    menu: { type: null, default: null },
    user: { type: CometChat.User, default: undefined },
    group: { type: CometChat.Group, default: undefined },
    backButtonIconURL: { default: BackIcon },
    hideBackButton: { default: false },
    listItemView: { type: null, default: null },
    onError: {
      type: Function,
      default: (error: CometChat.CometChatException) => {
        console.log(error);
      },
    },
    onBack: {
      type: Function,
      default: () => {
        console.log("On Back");
      },
    },
  },
  setup(props) {
    let backButtonStyle: any = defaultBackButtonStyle();
    let subtitleText: Ref<string> = ref("");
    let { theme, switchThemeMode }: any = inject(
      "theme",
      new CometChatTheme({})
    )!;
    let defaultMessageHeaderStyle = {
      width: "100%",
      height: "100%",
      borderRadius: "0",
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
    };

    let statusColor: any = {
      online: theme.value.palette.getSuccess(),
      offline: theme.value.palette.getAccent800(),
      private: "#00f300",
      password: "#F7A500",
      public: "",
    };
    let msgListenerId = "message_" + new Date().getTime();
    let groupsListenerId: string = "groupsList_" + new Date().getTime();
    let userListenerId = "userlist_" + new Date().getTime();

    let currentGroup: any = ref(props.group);
    let currentUser: any = ref(props.user);
    let loggedInUser!: CometChat.User;
    let isTyping = false;
    let ccGroupMemberAdded!: Subscription;
    let ccGroupLeft!: Subscription;
    let ccGroupMemberJoined!: Subscription;
    let ccGroupMemberKicked!: Subscription;
    let ccGroupMemberBanned!: Subscription;
    let ccOwnershipChanged!: Subscription;

    let listItemStyle: any;

    onBeforeMount(async () => {
      if (props.user) {
        currentUser.value = props.user;
        currentGroup.value = null;
      } else {
        currentGroup.value = props.group;
        currentUser.value = null;
      }

      if (!loggedInUser) {
        await CometChat.getLoggedinUser()
          .then((user: CometChat.User | null) => {
            if (user) {
              loggedInUser = user as CometChat.User;
              attachListeners();
              updateSubtitle();
            }
          })
          .catch((error: any) => {
            if (props.onError) {
              let cometchatException = new CometChat.CometChatException({
                message: error.message,
              });
              props.onError(cometchatException);
            }
          });
      } else {
        attachListeners();
        updateSubtitle();
      }
      updateSubtitle();
      backButtonStyle.buttonIconTint = props.messageHeaderStyle
        ?.backButtonIconTint
        ? props.messageHeaderStyle?.backButtonIconTint
        : defaultMessageHeaderStyle?.backButtonIconTint
        ? defaultMessageHeaderStyle?.backButtonIconTint
        : backButtonStyle.buttonIconTint;
      statusColor.online = props.messageHeaderStyle?.onlineStatusColor
        ? props.messageHeaderStyle.onlineStatusColor
        : defaultMessageHeaderStyle?.onlineStatusColor
        ? defaultMessageHeaderStyle?.onlineStatusColor
        : statusColor.online;
    });

    onBeforeUpdate(async () => {
      subscribeToEvents();
      if (
        currentUser?.value?.getUid() != props.user?.getUid() ||
        currentGroup.value?.getGuid() != props.group?.getGuid()
      ) {
        if (props.user) {
          currentUser.value = props.user;
          currentGroup.value = null;
        } else {
          currentGroup.value = props.group;
          currentUser.value = null;
        }

        removeListener();
        if (!loggedInUser) {
          await CometChat.getLoggedinUser()
            .then((user: CometChat.User | null) => {
              if (user) {
                loggedInUser = user as CometChat.User;
                attachListeners();
                updateSubtitle();
              }
            })
            .catch((error: any) => {
              if (props.onError) {
                let cometchatException = new CometChat.CometChatException({
                  message: error.message,
                });
                props.onError(cometchatException);
              }
            });
        } else {
          attachListeners();
          updateSubtitle();
        }
      }
    });

    onBeforeUnmount(() => {
      unsubscribeToEvents;
    });

    const getListItemStyle = () => {
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
      return { ...defaultStyle, ...listItemStyle };
    };

    const getAvatarStyles = () => {
      let defaultStyle = {
        borderRadius: "24px",
        width: "36px",
        height: "36px",
        border: "none",
        backgroundColor: theme.value.palette.getAccent700(),
        nameTextColor: theme.value.palette.getAccent900(),
        backgroundSize: "cover",
        nameTextFont: fontHelper(theme.value.typography.subtitle1),
        outerViewBorder: "",
        outerViewBorderSpacing: "",
      };
      return { ...props.avatarStyle, ...defaultStyle };
    };
    const getStatusStyle = () => {
      let defaultStyle: BaseStyle = {
        height: "12px",
        width: "12px",
        border: "none",
        borderRadius: "24px",
      };
      return {
        ...defaultStyle,
        ...props.statusIndicatorStyle,
      };
    };
    const getHeadersStyle = () => {
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
      return { ...defaultStyle, ...props.messageHeaderStyle };
    };

    const subscribeToEvents = () => {
      ccGroupMemberAdded = CometChatGroupEvents.ccGroupMemberAdded.subscribe(
        (item: IGroupMemberAdded) => {
          if (
            currentGroup.value &&
            currentGroup.value?.getGuid() == item?.userAddedIn.getGuid()
          ) {
            currentGroup.value = CometChatUIKitUtility.clone(
              item?.userAddedIn
            ) as CometChat.Group;

            updateSubtitle();
          }
        }
      );
      ccGroupMemberBanned = CometChatGroupEvents.ccGroupMemberBanned.subscribe(
        (item: IGroupMemberKickedBanned) => {
          if (
            currentGroup.value &&
            currentGroup.value?.getGuid() == item?.kickedFrom.getGuid()
          ) {
            updateSubtitle();
          }
        }
      );
      ccGroupMemberJoined = CometChatGroupEvents.ccGroupMemberJoined.subscribe(
        (item: IGroupMemberJoined) => {
          if (
            currentGroup.value &&
            currentGroup.value?.getGuid() == item?.joinedGroup.getGuid()
          ) {
            currentGroup.value = CometChatUIKitUtility.clone(
              item?.joinedGroup
            ) as CometChat.Group;
            updateSubtitle();
          }
        }
      );
      ccGroupMemberKicked = CometChatGroupEvents.ccGroupMemberKicked.subscribe(
        (item: IGroupMemberKickedBanned) => {
          if (
            currentGroup.value &&
            currentGroup.value?.getGuid() == item?.kickedFrom.getGuid()
          ) {
            currentGroup.value = CometChatUIKitUtility.clone(
              item?.kickedFrom
            ) as CometChat.Group;

            updateSubtitle();
          }
        }
      );
      ccOwnershipChanged = CometChatGroupEvents.ccOwnershipChanged.subscribe(
        (item: IOwnershipChanged) => {
          if (
            currentGroup.value &&
            currentGroup.value?.getGuid() == item?.group.getGuid()
          ) {
            currentGroup.value = item?.group;
            currentGroup.value = CometChatUIKitUtility.clone(
              item?.group
            ) as CometChat.Group;

            updateSubtitle();
          }
        }
      );
      ccGroupLeft = CometChatGroupEvents.ccGroupLeft.subscribe(
        (item: IGroupLeft) => {
          if (
            currentGroup.value &&
            currentGroup.value?.getGuid() == item?.leftGroup.getGuid() &&
            loggedInUser?.getUid() == item?.userLeft?.getUid()
          ) {
            currentGroup.value = CometChatUIKitUtility.clone(
              item?.leftGroup
            ) as CometChat.Group;

            updateSubtitle();
          }
        }
      );
    };
    // unsubscribe to subscribed events.
    const unsubscribeToEvents = () => {
      ccGroupMemberAdded?.unsubscribe();
      ccGroupMemberBanned?.unsubscribe();
      ccGroupMemberJoined?.unsubscribe();
      ccGroupMemberKicked?.unsubscribe();
      ccOwnershipChanged?.unsubscribe();
      ccGroupLeft?.unsubscribe();
    };

    const onBackClicked = () => {
      if (props.onBack) {
        props.onBack();
      }
    };
    const attachListeners = () => {
      try {
        if (!props.disableUsersPresence) {
          CometChat.addUserListener(
            userListenerId,
            new CometChat.UserListener({
              onUserOnline: (onlineUser: CometChat.User) => {
                /* when someuser/friend comes online, user will be received here */
                updateUserStatus(onlineUser);
              },
              onUserOffline: (offlineUser: CometChat.User) => {
                /* when someuser/friend went offline, user will be received here */
                updateUserStatus(offlineUser);
              },
            })
          );
        }
        if (!props.disableTyping) {
          CometChat.addMessageListener(
            msgListenerId,
            new CometChat.MessageListener({
              onTypingStarted: (typingIndicator: CometChat.TypingIndicator) => {
                isTyping = true;
                setTypingIndicatorText(typingIndicator);
              },
              // eslint-disable-next-line
              onTypingEnded: (typingIndicator: CometChat.TypingIndicator) => {
                isTyping = false;
                updateSubtitle();
              },
            })
          );
        }
        CometChat.addGroupListener(
          groupsListenerId,
          new CometChat.GroupListener({
            onGroupMemberScopeChanged: (
              message: CometChat.Action,
              changedUser: CometChat.User,
              newScope: CometChat.GroupMemberScope,
              oldScope: CometChat.GroupMemberScope,
              changedGroup: CometChat.Group
            ) => {
              if (changedUser.getUid() == loggedInUser?.getUid()) {
                changedGroup.setScope(newScope);
              }
              currentGroup.value = changedGroup;

              updateSubtitle();
            },
            onGroupMemberKicked: (
              message: CometChat.Action,
              kickedUser: CometChat.User,
              kickedBy: CometChat.User,
              kickedFrom: CometChat.Group
            ) => {
              if (kickedUser.getUid() == loggedInUser?.getUid()) {
                kickedFrom.setHasJoined(false);
              }
              currentGroup.value = kickedFrom;

              updateSubtitle();
            },
            onMemberAddedToGroup: (
              message: CometChat.Action,
              userAdded: CometChat.User,
              userAddedBy: CometChat.User,
              userAddedIn: CometChat.Group
            ) => {
              if (userAdded.getUid() == loggedInUser?.getUid()) {
                userAddedIn.setHasJoined(true);
              }
              currentGroup = userAddedIn;

              updateSubtitle();
            },
            onGroupMemberLeft: (
              message: CometChat.Action,
              leavingUser: CometChat.User,
              group: CometChat.Group
            ) => {
              if (leavingUser.getUid() == loggedInUser?.getUid()) {
                group.setHasJoined(false);
              }
              currentGroup.value = group;

              updateSubtitle();
            },
            onGroupMemberJoined: (
              message: CometChat.Action,
              joinedUser: CometChat.User,
              joinedGroup: CometChat.Group
            ) => {
              if (joinedUser.getUid() == loggedInUser?.getUid()) {
                joinedGroup.setHasJoined(true);
              }
              currentGroup.value = joinedGroup;

              updateSubtitle();
            },
          })
        );
      } catch (error: any) {
        if (props.onError) {
          let cometchatException = new CometChat.CometChatException({
            message: error.message,
          });
          props.onError(cometchatException);
        }
      }
    };
    const removeListener = () => {
      CometChat.removeMessageListener(msgListenerId);
      CometChat.removeUserListener(userListenerId);
    };

    const updateUserStatus = (user: CometChat.User) => {
      if (
        currentUser.value &&
        currentUser.value?.getUid() &&
        currentUser.value?.getUid() === user.getUid()
      ) {
        currentUser.value?.setStatus(user.getStatus());
        updateSubtitle();
      }
    };

    const setTypingIndicatorText = (typing: CometChat.TypingIndicator) => {
      const sender = typing.getSender();
      const receiverId = typing.getReceiverId();
      const temploggedInUser = loggedInUser;
      console.log(sender, receiverId, temploggedInUser);
      if (
        currentUser.value &&
        sender.getUid() === currentUser?.value?.getUid() &&
        temploggedInUser?.getUid() === receiverId
      ) {
        subtitleText.value = localize("IS_TYPING");
      }
    };

    const checkStatusType = () => {
      return currentUser.value && !props.disableUsersPresence
        ? statusColor[currentUser?.value?.getStatus()]
        : statusColor[currentGroup?.value?.getType()];
    };

    const updateSubtitle = () => {
      const count = currentGroup.value?.getMembersCount();
      const membersText = localize(count > 1 ? "MEMBERS" : "MEMBER");
      subtitleText.value = currentUser.value
        ? currentUser.value?.getStatus()
        : `${count} ${membersText}`;
    };
    const checkGroupType = (): string => {
      let image = "";
      if (currentGroup.value) {
        switch (currentGroup.value?.getType()) {
          case CometChatUIKitConstants.GroupTypes.password:
            image = props.protectedGroupIcon;
            break;
          case CometChatUIKitConstants.GroupTypes.private:
            image = props.privateGroupIcon;
            break;
          default:
            image = "";
            break;
        }
      }
      return image;
    };

    const headerStyle = () => {
      return {
        width:
          props.messageHeaderStyle?.width || defaultMessageHeaderStyle.width,
        height:
          props.messageHeaderStyle?.height || defaultMessageHeaderStyle.height,
        border:
          props.messageHeaderStyle?.border || defaultMessageHeaderStyle.border,
        borderRadius:
          props.messageHeaderStyle?.borderRadius ||
          defaultMessageHeaderStyle.borderRadius,
        background:
          props.messageHeaderStyle?.background ||
          defaultMessageHeaderStyle.background,
      };
    };

    const subtitleStyle = () => {
      if (
        props.user &&
        props.user.getStatus() == CometChatUIKitConstants.userStatusType.online
      ) {
        return {
          textFont:
            props.messageHeaderStyle?.subtitleTextFont ||
            defaultMessageHeaderStyle.subtitleTextFont,
          textColor: theme.value.palette.getPrimary(),
        };
      } else {
        return {
          textFont: isTyping
            ? props.messageHeaderStyle?.typingIndicatorTextFont ||
              defaultMessageHeaderStyle?.typingIndicatorTextFont
            : props.messageHeaderStyle?.subtitleTextFont ||
              defaultMessageHeaderStyle?.subtitleTextFont,

          textColor: isTyping
            ? props.messageHeaderStyle?.typingIndicatorTextColor ||
              defaultMessageHeaderStyle?.typingIndicatorTextFont
            : props.messageHeaderStyle?.subtitleTextColor ||
              defaultMessageHeaderStyle?.subtitleTextColor,
        };
      }
    };

    const getBackButtonStyle = () => {
      return backButtonStyle;
    };

    return {
      getBackButtonStyle,
      checkStatusType,
      checkGroupType,
      headerStyle,
      subtitleText,
      subtitleStyle,
      MessageHeaderMenuStyle,
      onBackClicked,
      theme,
      fontHelper,
      currentUser,
      currentGroup,

      getHeadersStyle,

      getStatusStyle,
      getAvatarStyles,
      getListItemStyle,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cc-messageheader__wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  box-sizing: border-box;
}
.cc-messageheader__backbutton {
  margin-right: 8px;
}
.cc-messageheader {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
}
.cc-messageheader__listitem {
  height: 100%;
  width: 100%;

  align-items: center;
  justify-content: flex-start;
}
.cc-messageheader__menu {
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 12px;
}
</style>
