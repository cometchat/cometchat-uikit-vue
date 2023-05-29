<template>
  <div class="cc-transfer-ownership" :style="wrapperStyle()">
    <div class="cc-transfer-ownership__members">
      <CometChatGroupMembers
        :title="title"
        :titleAlignment="titleAlignment"
        :searchRequestBuilder="searchRequestBuilder"
        :listItemView="listItemView"
        :errorStateText="errorStateText"
        :errorStateView="errorStateView"
        :loadingStateView="loadingStateView"
        :hideSeparator="hideSeparator"
        :emptyStateText="emptyStateText"
        :groupMembersRequestBuilder="groupMembersRequestBuilder"
        :hideSearch="hideSearch"
        :closeButtonIconURL="closeButtonIconURL"
        :searchPlaceholderText="searchPlaceholderText"
        :statusIndicatorStyle="mystatusIndicatorStyle"
        :avatarStyle="myavatarStyle"
        :groupMemberStyle="mygroupMemberStyle"
        :disableUsersPresence="disableUsersPresence"
        :emptyStateView="emptyStateView"
        :onClose="closeClicked"
        :selectionMode="SelectionMode.single"
        :onError="onError"
        :subtitleView="subtitleView"
        :group="group"
        :tailView="getTailView ? getTailView : undefined"
        :searchIconURL="searchIconURL"
        :loadingIconURL="loadingIconURL"
        :listItemStyle="listItemStyle"
        :onSelect="onOwnerSelected"
        :options="options"
      >
      </CometChatGroupMembers>
    </div>
    <div class="cc-transfer-ownership-buttons">
      <cometchat-button
        class="cc-transfer-ownership__buttons--confirm"
        :text="transferButtonText"
        :buttonStyle="transferButtonStyle"
        @cc-button-clicked="onTransferClick()"
      ></cometchat-button>
      <cometchat-button
        class="cc-transfer-ownership__buttons--cancel"
        :text="cancelButtonText"
        :buttonStyle="cancelButtonStyle"
        @cc-button-clicked="closeClicked()"
      ></cometchat-button>
    </div>
  </div>
</template>

<script lang="ts">
import { CometChat } from "@cometchat-pro/chat";
import CometChatGroupMembers from "../CometChatGroupMembers/index.vue";
import {
  CometChatGroupEvents,
  CometChatOption,
  CometChatTheme,
  CometChatUIKitConstants,
  fontHelper,
  localize,
} from "uikit-resources-lerna";
import {
  CometChatUIKitUtility,
  GroupMembersStyle,
  SelectionMode,
  TitleAlignment,
  TransferOwnershipStyle,
} from "uikit-utils-lerna";

import { BackIcon, Close2xIcon, LoadingIcon, SearchIcon } from "../../assets";
import { defineComponent, inject, onMounted, PropType, Ref, ref } from "vue";
import { AvatarStyle, BaseStyle, ListItemStyle } from "my-cstom-package-lit";

export default defineComponent({
  components: {
    CometChatGroupMembers,
  },
  props: {
    group: {
      type: CometChat.Group,
      required: true,
    },
    title: {
      type: String,
      default: () => localize("TRANSFER_OWNERSHIP"),
    },
    transferButtonText: {
      type: String,
      default: () => localize("TRANSFER_OWNERSHIP"),
    },
    cancelButtonText: {
      type: String,
      default: () => localize("CANCEL"),
    },
    titleAlignment: {
      type: Number as PropType<TitleAlignment>,
      default: TitleAlignment.center,
    },

    subtitleView: {
      type: Function as PropType<
        (groupMember: CometChat.GroupMember) => ViewType
      >,
    },
    options: {
      type: Function as PropType<
        (
          group: CometChat.Group,
          groupMember: CometChat.GroupMember
        ) => CometChatOption[]
      >,
    },

    disableUsersPresence: {
      type: Boolean,
      default: false,
    },
    hideSeparator: {
      type: Boolean,
      default: false,
    },
    searchPlaceholderText: {
      type: String,
      default: () => localize("SEARCH"),
    },
    searchIconURL: {
      type: String,
      default: SearchIcon,
    },

    hideSearch: {
      type: Boolean,
      default: false,
    },

    listItemStyle: {
      type: ListItemStyle,
      default: {},
    },
    emptyStateView: {
      type: Object as PropType<ViewType>,
    },
    errorStateText: {
      type: String,
      default: () => localize("SOMETHING_WRONG"),
    },
    loadingStateView: {
      type: Object as PropType<ViewType>,
    },
    loadingIconURL: {
      type: String,
      default: LoadingIcon,
    },
    groupMembersRequestBuilder: {
      type: CometChat.GroupMembersRequestBuilder,
    },
    searchRequestBuilder: {
      type: CometChat.GroupMembersRequestBuilder,
    },

    onError: {
      type: Function as PropType<(error: CometChat.CometChatException) => void>,
      default: (error: CometChat.CometChatException) => console.log(error),
    },

    onClose: {
      type: Function as PropType<() => void>,
    },
    errorStateView: {
      type: Object as PropType<ViewType>,
    },
    emptyStateText: {
      type: String,
      default: () => localize("NO_USERS_FOUND"),
    },
    onTransferOwnership: {
      type: Function as PropType<(member: CometChat.GroupMember) => void>,
    },
    transferOwnershipStyle: {
      type: TransferOwnershipStyle,
      default: () => {
        return {} as any;
      },
    },
    avatarStyle: {
      type: AvatarStyle,
      default: () => {
        return {} as any;
      },
    },
    groupMemberStyle: {
      type: GroupMembersStyle,
      default: () => {
        return {} as any;
      },
    },
    statusIndicatorStyle: {
      type: null,
      default: {
        // height: "10px",
        // width: "10px",
        // borderRadius: "16px",
      },
    },

    closeButtonIconURL: {
      type: String,
      default: Close2xIcon,
    },
    listItemView: {
      type: Function as PropType<
        (groupMember: CometChat.GroupMember) => ViewType
      >,
    },
  },
  setup(props) {
    let selectedMember: any = ref(null);
    let { theme, switchThemeMode }: any = inject(
      "theme",
      new CometChatTheme({})
    )!;

    // const theme: any = ref(props.theme);
    let myavatarStyle = ref(props.avatarStyle);
    let mygroupMemberStyle = ref(props.groupMemberStyle);
    let mystatusIndicatorStyle = ref(props.statusIndicatorStyle);
    let mylistItemStyle = ref(props.listItemStyle);
    let mytransferOwnershipStyle = ref(props.transferOwnershipStyle);
    const transferButtonStyle: any = ref({
      width: "100%",
      background: "rgb(51, 153, 255)",
      padding: "8px",
      buttonTextColor: "white",
      buttonTextFont: "600 15px Inter, sans-serif",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "none",
      borderRadius: "8px",
      flexGrow: "1",
    });
    const cancelButtonStyle: any = ref({
      width: "100%",
      background: "white",
      padding: "8px",
      buttonTextColor: "black",
      buttonTextFont: "600 15px Inter, sans-serif",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
    });

    const onOwnerSelected = (member: CometChat.GroupMember) => {
      selectedMember.value = member;
    };

    function closeClicked() {
      if (props.onClose) {
        props.onClose();
      }
    }
    // const customSelection = (groupMember: CometChat.GroupMember) => {
    //   const scope =
    //     props.group.getOwner() === groupMember.getUid()
    //       ? CometChatUIKitConstants.groupMemberScope.owner
    //       : groupMember.getScope();
    //   return {
    //     html: `<cometchat-label
    //         text='${localize(scope.toUpperCase())}'
    //         labelStyle='${JSON.stringify(getScopeStyle())}'
    //       ></cometchat-label>`,
    //   };
    // };
    const getTailView = (
      groupMember: CometChat.GroupMember
    ): ViewType | undefined => {
      const scope =
        props.group.getOwner() === groupMember.getUid()
          ? CometChatUIKitConstants.groupMemberScope.owner
          : groupMember.getScope();

      let SelectMode: ViewType =
        props.group.getOwner() === groupMember.getUid()
          ? undefined
          : {
              componentName: "cometchat-radio-button",
              listeners: {
                "cc-radio-button-changed": () => {
                  onOwnerSelected(groupMember);
                },
              },
            };

      return {
        html: `<cometchat-label
            text='${localize(scope.toUpperCase())}'
            labelStyle='${JSON.stringify(getScopeStyle())}'
          ></cometchat-label>`,
      };
      //[
      // SelectMode,
      //];
    };

    const onTransferClick = () => {
      // CometChat.getUser(selectedMember.value?.getUid()).catch((error: any) => {
      //   if (props.onError) {
      //     props.onError(error);
      //   }
      // });
      if (props.onTransferOwnership) {
        if (selectedMember.value) {
          props.onTransferOwnership(selectedMember.value!);
          selectedMember.value = null;
        }
      } else {
        if (selectedMember.value) {
          CometChat.transferGroupOwnership(
            props.group.getGuid(),
            selectedMember.value?.getUid()
          )
            .then((response: string) => {
              const newGroup = CometChatUIKitUtility.clone(props.group); // create deep copy of props.group
              if (newGroup instanceof CometChat.Group) {
                newGroup.setOwner(selectedMember.value?.getUid()); // modify the copy
              }

              // CometChatGroupEvents.ccOwnershipChanged.next({
              //   group: newGroup, // use the copy in the event payload
              //   newOwner: selectedMember.value!,
              // });
              selectedMember.value = null;
            })
            .catch((error: any) => {
              if (props.onError) {
                props.onError(error);
              }
            });
        }
        if (props.onClose) {
          props.onClose();
        }
      }
    };
    function setThemeStyle() {
      setGroupMembersStyle();
      setListItemStyle();
      setAvatarStyle();
      setOwnershipStyle();
      setStatusStyle();

      transferButtonStyle.value.buttonTextFont =
        props.transferOwnershipStyle.transferButtonTextFont ||
        fontHelper(theme.value.typography.subtitle1);
      transferButtonStyle.value.buttonTextColor =
        props.transferOwnershipStyle.transferButtonTextColor ||
        theme.value.palette.getAccent900();
      transferButtonStyle.value.background = theme.value.palette.getPrimary();
      cancelButtonStyle.value.background = theme.value.palette.getSecondary();
      cancelButtonStyle.value.buttonTextFont =
        props.transferOwnershipStyle.cancelButtonTextFont ||
        fontHelper(theme.value.typography.subtitle1);
      cancelButtonStyle.value.buttonTextColor =
        props.transferOwnershipStyle.cancelButtonTextColor ||
        theme.value.palette.getAccent();
    }
    function setListItemStyle() {
      let defaultStyle: ListItemStyle = new ListItemStyle({
        height: "45px",
        width: "100%",
        background: theme.value.palette.getBackground(),
        activeBackground: "transparent",
        borderRadius: "0",
        titleFont: fontHelper(theme.value.typography.title2),
        titleColor: theme.value.palette.getAccent(),
        border: "none",
        separatorColor: theme.value.palette.getAccent200(),
        hoverBackground: "transparent",
      });
      mylistItemStyle.value = { ...defaultStyle, ...mylistItemStyle.value };
    }
    function setGroupMembersStyle() {
      let defaultStyle: GroupMembersStyle = new GroupMembersStyle({
        background: theme.value.palette.getBackground(),
        border: `1px solid ${theme.value.palette.getAccent50()}`,
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
        searchIconTint: theme.value.palette.getAccent600(),
        searchPlaceholderTextColor: theme.value.palette.getAccent600(),
        searchBackground: theme.value.palette.getAccent100(),
        searchPlaceholderTextFont: fontHelper(theme.value.typography.text3),
        searchTextColor: theme.value.palette.getAccent600(),
        searchTextFont: fontHelper(theme.value.typography.text3),
        searchBorderRadius: "8px",
        closeButtonIconTint: theme.value.palette.getPrimary(),
        backButtonIconTint: theme.value.palette.getPrimary(),
      });
      mygroupMemberStyle.value = {
        ...defaultStyle,
        ...mygroupMemberStyle.value,
      };
    }
    function setAvatarStyle() {
      let defaultStyle: AvatarStyle = new AvatarStyle({
        borderRadius: "24px",
        width: "28px",
        height: "28px",
        border: "none",
        backgroundColor: theme.value.palette.getAccent700(),
        nameTextColor: theme.value.palette.getAccent900(),
        backgroundSize: "cover",
        nameTextFont: fontHelper(theme.value.typography.subtitle1),
        outerViewBorder: "",
        outerViewBorderSpacing: "",
      });
      myavatarStyle.value = { ...defaultStyle, ...myavatarStyle.value };
    }
    function setStatusStyle() {
      let defaultStyle: BaseStyle = {
        height: "10px",
        width: "10px",
        border: "none",
        borderRadius: "24px",
      };
      mystatusIndicatorStyle.value = {
        ...defaultStyle,
        ...mystatusIndicatorStyle.value,
      };
    }
    function setOwnershipStyle() {
      let defaultStyle: TransferOwnershipStyle = new TransferOwnershipStyle({
        background: theme.value.palette.getBackground(),
        border: `1px solid ${theme.value.palette.getAccent50()}`,
        MemberScopeTextFont: fontHelper(theme.value.typography.subtitle1),
        MemberScopeTextColor: theme.value.palette.getAccent600(),
        transferButtonTextFont: fontHelper(theme.value.typography.title2),
        transferButtonTextColor: theme.value.palette.getAccent("dark"),
        cancelButtonTextFont: fontHelper(theme.value.typography.title2),
        cancelButtonTextColor: theme.value.palette.getAccent("light"),
        width: "max(100%, 400px)",
        height: "100%",
        borderRadius: "0",
      });
      mytransferOwnershipStyle.value = {
        ...defaultStyle,
        ...mytransferOwnershipStyle.value,
      };
    }

    const wrapperStyle = () => {
      return {
        height: mytransferOwnershipStyle.value.height,
        width: mytransferOwnershipStyle.value.width,
        background: mytransferOwnershipStyle.value.background,
        border: mytransferOwnershipStyle.value.border,
        borderRadius: mytransferOwnershipStyle.value.borderRadius,
      };
    };
    const getScopeStyle = () => {
      return {
        background: "inherit",
        textFont: mytransferOwnershipStyle.value.MemberScopeTextFont,
        textColor: mytransferOwnershipStyle.value.MemberScopeTextColor,
      };
    };

    onMounted(() => {
      setThemeStyle();
    });
    //end
    return {
      wrapperStyle,
      transferButtonStyle,
      cancelButtonStyle,
      closeClicked,
      onTransferClick,
      getScopeStyle,
      getTailView,
      onOwnerSelected,
      mygroupMemberStyle,
      myavatarStyle,
      mystatusIndicatorStyle,
      mytransferOwnershipStyle,
      SelectionMode,
    };
  },
});
</script>

<style scoped>
/* .cc-transfer-ownership__buttons--confirm {
  height: 42px;
  width: 100%;
}
.cc-transfer-ownership__buttons--cancel {
  height: 42px;
  width: 100%;
} */
/* .cc-transfer-ownership {
  width: 320px;
  height: 650%;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  padding: 8px;
  justify-content: space-between;
  position: relative;
} */

.cc-transfer-ownership__members {
  width: 100%;
  height: 85%;
}

.cc-transfer-ownership-buttons {
  width: 100%;
  height: 15%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-content: center;
  /* gap: 10px; */
}
</style>
