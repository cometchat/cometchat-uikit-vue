<template>
  <div class="cc-add-members" :style="wrapperStyle()">
    <div class="cc-add-members__back-button">
      <cometchat-button
        v-if="showBackButton"
        :iconURL="backButtonIconURL"
        :buttonStyle="backButtonStyle()"
        @cc-button-clicked="backClicked()"
      >
      </cometchat-button>
    </div>
    <div class="cc-add-members__wrapper" :style="addMembersStyles()">
      <div class="cc-users">
        <CometChatUsers
          :searchPlaceholder="searchPlaceholder"
          :usersRequestBuilder="usersRequestBuilder"
          :hideSearch="hideSearch"
          :searchIconURL="searchIconURL"
          :searchRequestBuilder="searchRequestBuilder"
          :subtitleView="subtitleView"
          :options="options"
          :emptyStateView="emptyStateView"
          :onSelect="addRemoveUsers"
          :loadingIconURL="loadingIconURL"
          :errorStateView="errorStateView"
          :loadingStateView="loadingStateView"
          :titleAlignment="titleAlignment"
          :showSectionHeader="showSectionHeader"
          :menus="menus"
          :hideSeparator="hideSeparator"
          :hideError="hideError"
          :selectionMode="selectionMode"
          :title="title"
          :usersStyle="usersStyle"
          :listItemView="listItemView"
          :avatarStyle="avatarStyle"
          :statusIndicatorStyle="mystatusIndicatorStyle"
          :listItemStyle="mylistItemStyle"
          :onError="onError"
          :emptyStateText="emptyStateText"
          :errorStateText="errorStateText"
          :disableUsersPresence="disableUsersPresence"
          :sectionHeaderKey="sectionHeaderField"
        >
        </CometChatUsers>
      </div>
      <div class="cc-add-members__buttons">
        <cometchat-button
          class="cc-add-members__buttons-add"
          :text="buttonText"
          :buttonStyle="addMemberButtonStyle"
          @click="addMembersToGroup()"
        ></cometchat-button>
      </div>
    </div>
    <div class="cc-add-members__close-button">
      <cometchat-button
        :iconURL="closeButtonIconURL"
        :buttonStyle="closeButtonStyle()"
        @cc-button-clicked="closeClicked()"
      >
      </cometchat-button>
    </div>
  </div>
</template>

<script lang="ts">
import { CometChat } from "@cometchat-pro/chat";
import CometChatUsers from "../CometChatUsers/index.vue";

import "my-cstom-package-lit";

import {
  BaseStyle,
  UsersStyle,
  SelectionMode,
  ConversationUtils,
  GroupMemberUtils,
  AddMembersStyle,
  CometChatUIKitUtility,

  // CometChatUIKitUtility,
} from "uikit-utils-lerna";
import { SearchIcon, BackIcon, Close2xIcon, LoadingIcon } from "../../assets";

import {
  AvatarStyle,
  ChangeScopeStyle,
  ListItemStyle,
} from "my-cstom-package-lit";
import {
  CometChatTheme,
  localize,
  TitleAlignment,
  States,
  fontHelper,
  CometChatUIKitConstants,
  CometChatGroupEvents,
  CometChatOption,
  // CometChatUIKitUtility,
} from "uikit-resources-lerna";

import {
  defineComponent,
  ref,
  Ref,
  onMounted,
  PropType,
  inject,
  onBeforeMount,
} from "vue";

export default defineComponent({
  components: {
    CometChatUsers,
  },
  props: {
    title: {
      type: String,
      default: () => localize("ADD_MEMBERS"),
    },
    buttonText: {
      type: String,
      default: () => localize("ADD_MEMBERS"),
    },
    titleAlignment: {
      type: Number as PropType<TitleAlignment>,
      default: TitleAlignment.center,
    },
    searchPlaceholder: {
      type: String,
      default: () => localize("SEARCH"),
    },
    sectionHeaderField: {
      type: String,
      default: "getName",
    },
    subtitleView: {
      type: Function as PropType<(user: CometChat.User) => ViewType>,
    },

    listItemView: {
      type: Function as PropType<(user: CometChat.User) => ViewType>,
    },
    menus: {
      type: Object as PropType<ViewType>,
    },
    onAddMembersButtonClick: {
      type: Function,
    },
    options: {
      type: Function as PropType<(user: CometChat.User) => CometChatOption[]>,
    },

    usersRequestBuilder: {
      type: CometChat.UsersRequestBuilder,
    },
    searchRequestBuilder: {
      type: CometChat.UsersRequestBuilder,
    },
    disableUsersPresence: {
      type: Boolean,
      default: false,
    },
    group: {
      type: CometChat.Group,
      required: true,
    },
    showSectionHeader: {
      type: Boolean,
      default: false,
    },

    hideSeparator: {
      type: Boolean,
      default: false,
    },

    showBackButton: {
      type: Boolean,
      default: true,
    },

    selectionMode: {
      type: Number as PropType<SelectionMode>,
      default: SelectionMode.multiple,
    },
    onSelect: {
      type: Function as PropType<(user: CometChat.User) => void>,
    },
    searchIconURL: {
      type: String,
      default: SearchIcon,
    },
    backButtonIconURL: {
      type: String,
      default: BackIcon,
    },

    closeButtonIconURL: {
      type: String,
      default: Close2xIcon,
    },

    hideSearch: {
      type: Boolean,
      default: false,
    },
    hideError: {
      type: Boolean,
      default: false,
    },

    emptyStateView: {
      type: Object as PropType<ViewType>,
    },
    errorStateText: {
      type: String,
      default: () => localize("SOMETHING_WRONG"),
    },
    emptyStateText: {
      type: String,
      default: () => localize("NO_USERS_FOUND"),
    },

    onError: {
      type: Function as PropType<(error: CometChat.CometChatException) => void>,
      default: (error: CometChat.CometChatException) => console.log(error),
    },
    onBack: {
      type: Function as PropType<() => void>,
    },
    onClose: {
      type: Function as PropType<() => void>,
    },
    avatarStyle: {
      type: AvatarStyle,
      default: {
        // borderRadius: "16px",
        // width: "28px",
        // height: "28px",
      },
    },

    addMembersStyle: {
      type: AddMembersStyle,
      default: () => {
        return {} as any;
      },
    },
    statusIndicatorStyle: {
      type: null,
    },
    listItemStyle: {
      type: ListItemStyle,
      default: {},
    },

    loadingIconURL: {
      type: String,
      default: LoadingIcon,
    },
    loadingStateView: {
      type: Object as PropType<ViewType>,
    },
    errorStateView: {
      type: Object as PropType<ViewType>,
    },
  },

  setup(props) {
    let { theme, switchThemeMode }: any = inject(
      "theme",
      new CometChatTheme({})
    )!;

    const MembersList: any = ref([]);
    const addedMembers: Ref<CometChat.GroupMember[]> = ref([]);
    const actionMessagesList: Ref<CometChat.Action[]> = ref([]);
    let currentGroup: any = ref(props.group);

    let loggedInUser: any = ref(null);

    // let limit = 30;

    let usersStyle: UsersStyle = {};

    let myavatarStyle: any = ref(props.avatarStyle);

    let myaddMembersStyle: any = ref(props.addMembersStyle);
    let mylistItemStyle: any = ref(props.listItemStyle);
    let mystatusIndicatorStyle: any = ref(props.statusIndicatorStyle);

    let addMemberButtonStyle: any = {
      height: "100%",
      width: "100%",
      background: "rgb(51, 153, 255)",
      padding: "8px",
      buttonTextColor: "white",
      buttonTextFont: "",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "none",
      borderRadius: "8px",
    };

    onBeforeMount(() => {
      currentGroup.value = props.group;
    });

    function closeClicked() {
      if (props.onClose) {
        props.onClose();
      }
    }
    function backClicked() {
      if (props.onBack) {
        props.onBack();
      }
    }

    // const addRemoveUsers = (user: CometChat.User) => {
    //   if (props.onSelect) {
    //     props.onSelect(user);
    //   } else {
    //     let key = MembersList.value.findIndex(
    //       (m: any) => m.getUid() === user.getUid()
    //     );
    //     if (key >= 0) {
    //       MembersList.value.splice(key, 1);
    //     } else {
    //       let member: CometChat.GroupMember = new CometChat.GroupMember(
    //         user.getUid(),
    //         CometChatUIKitConstants.groupMemberScope.participant
    //       );
    //       member.setName(user.getName());
    //       member.setGuid(props.group!.getGuid());

    //       MembersList.value.push(member);
    //     }
    //   }
    // };
    // let membersToAdd: any = [];
    const createGroupMemberFromUser = (user: CometChat.User) => {
      const groupMember = new CometChat.GroupMember(
        user.getUid(),
        CometChatUIKitConstants.groupMemberScope.participant
      );
      groupMember.setName(user.getName());
      groupMember.setGuid(currentGroup.value.getGuid());
      return groupMember;
    };

    const addRemoveUsers = (user: CometChat.User) => {
      if (props.onSelect) {
        props.onSelect(user);
      }
      if (props.selectionMode == SelectionMode.single) {
        MembersList.value = [createGroupMemberFromUser(user)];
      } else if (props.selectionMode == SelectionMode.multiple) {
        const targetUid = user.getUid();

        const tmpMembersToAddList = [];

        let updated = false;

        for (let i = 0; i < MembersList.value.length; i++) {
          const curMember = MembersList.value[i];

          if (targetUid === curMember.getUid()) {
            updated = true;
          } else {
            tmpMembersToAddList.push(curMember);
          }
        }
        if (!updated) {
          tmpMembersToAddList.push(createGroupMemberFromUser(user));
        }

        MembersList.value = tmpMembersToAddList;
      }
    };

    const addMembersToGroup = () => {
      if (currentGroup.value && MembersList.value.length > 0) {
        if (props.onAddMembersButtonClick) {
          props.onAddMembersButtonClick(
            currentGroup.value!.getGuid(),
            MembersList.value
          );

          return;
        } else {
          CometChat.addMembersToGroup(
            currentGroup.value!.getGuid(),
            MembersList.value,
            []
          )
            .then((response: any) => {
              for (const key in response) {
                if (
                  Object.prototype.hasOwnProperty.call(response, key) &&
                  response[key] === "success"
                ) {
                  const matchingUser: CometChat.GroupMember =
                    MembersList.value.find(
                      (user: CometChat.User) => user.getUid() === key
                    );
                  if (matchingUser) {
                    createActionMessage(matchingUser);
                    addedMembers.value.push(matchingUser);
                  }
                }
              }
              let newGroup = CometChatUIKitUtility.clone(currentGroup.value); // create deep copy of currentGroup.value
              newGroup = newGroup as CometChat.Group;
              if (newGroup instanceof CometChat.Group) {
                newGroup!.setMembersCount(
                  newGroup!.getMembersCount() + addedMembers.value?.length || 0
                );
              }

              currentGroup.value = newGroup;

              CometChatGroupEvents.ccGroupMemberAdded.next({
                messages: actionMessagesList.value,
                usersAdded: addedMembers.value,
                userAddedIn: newGroup!,
                userAddedBy: loggedInUser.value!,
              });
              MembersList.value = [];
              addedMembers.value = [];
              actionMessagesList.value = [];
              if (props.onBack) {
                props.onBack();
              }
            })
            .catch((err: any) => {
              console.log(err);
              MembersList.value = [];
            });
        }
      } else {
        console.log("else");
        return;
      }
    };

    function createActionMessage(actionOn: CometChat.GroupMember) {
      let actionMessage: CometChat.Action = new CometChat.Action(
        currentGroup.value!.getGuid(),
        CometChatUIKitConstants.MessageTypes.groupMember,
        CometChatUIKitConstants.MessageReceiverType.group,
        CometChatUIKitConstants.MessageCategory.action as any
      );
      actionMessage.setAction(CometChatUIKitConstants.groupMemberAction.ADDED);
      actionMessage.setActionBy(loggedInUser.value!);
      actionMessage.setActionFor(currentGroup.value!);
      actionMessage.setActionOn(actionOn);
      actionMessage.setReceiver(currentGroup.value!);
      actionMessage.setSender(loggedInUser.value!);
      actionMessage.setConversationId("group_" + currentGroup.value!.getGuid());
      actionMessage.setMuid(CometChatUIKitUtility.ID());
      actionMessage.setMessage(
        `${loggedInUser.value?.getName()} added ${actionOn.getUid()}`
      );
      actionMessage.setSentAt(CometChatUIKitUtility.getUnixTimestamp());

      actionMessagesList.value.push(actionMessage);
    }

    onMounted(async () => {
      setUsersStyle();
      setAddMembersStyle();
      setListItemStyle();
      setStatusStyle();
      MembersList.value = [];
      addedMembers.value = [];
      actionMessagesList.value = [];

      CometChat.getLoggedinUser()
        .then((user: CometChat.User | null) => {
          loggedInUser.value = user;
        })
        .catch((error) => {
          if (props.onError) {
            props.onError(error);
          }
        });
    });

    function setAddMembersStyle() {
      let defaultStyle: AddMembersStyle = new AddMembersStyle({
        background: theme.value.palette.getBackground(),
        border: `none`,
        titleTextFont: fontHelper(theme.value.typography.title1),
        titleTextColor: theme.value.palette.getAccent(),
        emptyStateTextFont: fontHelper(theme.value.typography.title1),
        emptyStateTextColor: theme.value.palette.getAccent600(),
        errorStateTextFont: fontHelper(theme.value.typography.title1),
        errorStateTextColor: theme.value.palette.getAccent600(),
        loadingIconTint: theme.value.palette.getAccent600(),
        onlineStatusColor: theme.value.palette.getSuccess(),
        separatorColor: theme.value.palette.getAccent400(),
        width: "100%",
        height: "100%",
        borderRadius: "none",
        searchPlaceholderTextFont: fontHelper(theme.value.typography.subtitle1),
        searchPlaceholderTextColor: theme.value.palette.getAccent600(),
        searchTextFont: fontHelper(theme.value.typography.subtitle2),
        searchTextColor: theme.value.palette.getAccent400(),
        searchIconTint: theme.value.palette.getAccent600(),
        searchBorder: `1px solid ${theme.value.palette.getAccent100()}`,
        searchBorderRadius: "8px",
        searchBackground: theme.value.palette.getAccent100(),
        closeButtonIconTint: theme.value.palette.getPrimary(),
        backButtonIconTint: theme.value.palette.getPrimary(),
        addMembersButtonBackground: theme.value.palette.getPrimary(),
        addMembersButtonTextColor: theme.value.palette.getAccent900("light"),
        addMembersButtonTextFont: fontHelper(theme.value.typography.subtitle1),
        padding: "0 100px",
      });
      myaddMembersStyle.value = { ...defaultStyle, ...myaddMembersStyle.value };
      addMemberButtonStyle.background =
        myaddMembersStyle.value.addMembersButtonBackground;
      addMemberButtonStyle.buttonTextFont =
        myaddMembersStyle.value.addMembersButtonTextFont;
      addMemberButtonStyle.buttonTextColor =
        myaddMembersStyle.value.addMembersButtonTextColor;
    }

    function setListItemStyle() {
      let defaultStyle: ListItemStyle = new ListItemStyle({
        height: "45px",
        width: "100%",
        background: theme.value.palette.getBackground(),
        activeBackground: "",
        borderRadius: "0",
        titleFont: fontHelper(theme.value.typography.title2),
        titleColor: theme.value.palette.getAccent(),
        border: "none",
        separatorColor: theme.value.palette.getAccent200(),
        hoverBackground: "",
      });
      mylistItemStyle.value = { ...defaultStyle, ...mylistItemStyle.value };
    }

    function setUsersStyle() {
      let defaultStyle: UsersStyle = new UsersStyle({
        width: "100%",
        height: "100%",
        border: "none",
        borderRadius: "0",
        background: "inherit",
        titleTextFont:
          props.addMembersStyle?.titleTextFont ||
          fontHelper(theme.value.typography.title1),
        titleTextColor:
          props.addMembersStyle?.titleTextColor ||
          theme.value.palette.getAccent(),
        emptyStateTextFont:
          props.addMembersStyle?.emptyStateTextFont ||
          fontHelper(theme.value.typography.title1),
        emptyStateTextColor:
          props.addMembersStyle?.emptyStateTextColor ||
          theme.value.palette.getAccent600(),
        errorStateTextFont:
          props.addMembersStyle?.errorStateTextFont ||
          fontHelper(theme.value.typography.title1),
        errorStateTextColor:
          props.addMembersStyle?.errorStateTextColor ||
          theme.value.palette.getAccent600(),
        loadingIconTint:
          props.addMembersStyle?.loadingIconTint ||
          theme.value.palette.getAccent600(),
        separatorColor:
          props.addMembersStyle?.separatorColor ||
          theme.value.palette.getAccent400(),
        onlineStatusColor:
          props.addMembersStyle?.onlineStatusColor ||
          theme.value.palette.getSuccess(),
        sectionHeaderTextColor:
          props.addMembersStyle?.sectionHeaderTextColor ||
          theme.value.palette.getAccent600(),
        sectionHeaderTextFont:
          props.addMembersStyle?.sectionHeaderTextFont ||
          fontHelper(theme.value.typography.subtitle2),

        searchIconTint:
          props.addMembersStyle?.searchIconTint ||
          theme.value.palette.getAccent600(),
        searchPlaceholderTextColor:
          props.addMembersStyle?.searchPlaceholderTextColor ||
          theme.value.palette.getAccent600(),
        searchBackground:
          props.addMembersStyle?.searchBackground ||
          theme.value.palette.getAccent100(),
        searchPlaceholderTextFont:
          props.addMembersStyle?.searchPlaceholderTextFont ||
          fontHelper(theme.value.typography.text3),
        searchTextColor:
          props.addMembersStyle?.searchTextColor ||
          theme.value.palette.getAccent600(),
        searchTextFont:
          props.addMembersStyle?.searchTextFont ||
          fontHelper(theme.value.typography.text3),
        searchBorder:
          props.addMembersStyle?.searchBorder ||
          `1px solid ${theme.value.palette.getAccent100()}`,
        searchBorderRadius: props.addMembersStyle?.searchBorderRadius || "8px",
      });
      usersStyle = { ...defaultStyle, ...usersStyle };
    }

    const backButtonStyle = () => {
      return {
        height: "24px",
        width: "24px",
        borderRadius: "0",
        border: "none",
        background: "transparent",
        buttonIconTint:
          props.addMembersStyle.backButtonIconTint ||
          theme.value.palette.getPrimary(),
      };
    };

    const closeButtonStyle = () => {
      return {
        height: "24px",
        width: "24px",
        border: "none",
        borderRadius: "0",
        background: "transparent",
        buttonIconTint:
          props.addMembersStyle.closeButtonIconTint ||
          theme.value.palette.getPrimary(),
      };
    };

    const wrapperStyle = (): any => {
      return {
        height: myaddMembersStyle.value.height || "100%",
        width: myaddMembersStyle.value.width || "100%",
        border:
          myaddMembersStyle.value.border ||
          `1px solid ${theme.value.palette.getAccent100()}`,
        borderRadius: myaddMembersStyle.value.borderRadius || "0",
        background:
          myaddMembersStyle.value.background ||
          theme.value.palette.getBackground(),
        display: "flex",
        position: "relative",
      };
    };

    function setStatusStyle() {
      let defaultStyle: BaseStyle = {
        height: "12px",
        width: "12px",
        border: "none",
        borderRadius: "24px",
      };
      mystatusIndicatorStyle.value = {
        ...defaultStyle,
        ...mystatusIndicatorStyle.value,
      };
    }

    const addMembersStyles = (): any => {
      return {
        height: myaddMembersStyle.value.height || "100%",
        width: myaddMembersStyle.value.width || "100%",
        padding: myaddMembersStyle.value.padding,
        position: "relative",
      };
    };

    return {
      backClicked,
      closeClicked,
      backButtonStyle,
      closeButtonStyle,
      usersStyle,
      ConversationUtils,
      GroupMemberUtils,

      SelectionMode,
      mylistItemStyle,
      myavatarStyle,
      mystatusIndicatorStyle,
      addMembersStyles,
      addMemberButtonStyle,
      addMembersToGroup,
      addRemoveUsers,
      myaddMembersStyle,
      wrapperStyle,
    };
  },
});
</script>

<style scoped>
/* .cc-add-members {
  display: flex;

  height: 100%;
  width: 100%;
  overflow: hidden;
} */
.cc-add-members__back-button {
  position: absolute;
  left: 8px;
  padding: 12px 8px 8px 8px;
}
/* .cc-add-members__wrapper {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  height: 100%;
  width: 100%;

  padding-bottom: 18px;
} */

.cc-add-members__close-button {
  position: absolute;
  right: 8px;
  padding: 12px 8px 8px 8px;
}
.cc-users {
  height: 90%;
}
.cc-add-members__buttons {
  height: 10%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* .button__icon {
  display: flex;
  justify-content: flex-end;
} */
.cc-add-members__buttons-add {
  height: 42px;
  width: 100%;
}
</style>
