<template>
  <div class="cc-details__wrapper" v-if="user || group" :style="wrapperStyle()">
    <div class="cc-details__header">
      <cometchat-label
        :text="title"
        :labelStyle="getTitleStyle()"
      ></cometchat-label>
      <cometchat-button
        :iconURL="closeButtonIconURL"
        class="cc-details__close-button"
        :buttonStyle="closeButtonStyle"
        @cc-button-clicked="onCloseDetails()"
      ></cometchat-button>
    </div>
    <div class="cc-details" :style="paddingStyle()">
      <div class="cc-details__profile" v-if="!hideProfile">
        <cometchat-list-item
          v-if="!customProfileView"
          :avatarName="currentUser?.getName() ?? currentGroup?.getName()"
          :avatarURL="currentUser?.getAvatar() ?? currentGroup?.getIcon()"
          :listItemStyle="setListItemStyle()"
          :statusIndicatorColor="checkStatusType()"
          :statusIndicatorIcon="checkGroupType()"
          :title="currentUser?.getName() ?? currentGroup?.getName()"
          :hideSeparator="false"
          :statusIndicatorStyle="setStatusStyle()"
          :avatarStyle="setAvatarStyle()"
        >
          <div slot="subtitleView">
            <div v-if="!subtitleView">
              <cometchat-label
                :text="subtitleText"
                :labelStyle="subtitleStyle()"
              >
              </cometchat-label>
            </div>
            <div v-else-if="subtitleView(currentUser, currentGroup)">
              <div
                v-if="subtitleView(currentUser, currentGroup)!.html"
                v-html="subtitleView(currentUser, currentGroup)!.html"
              ></div>
              <component
                v-else
                :is="subtitleView(currentUser, currentGroup)!.componentName!"
                v-bind="{ ...subtitleView(currentUser, currentGroup)!.props }"
                v-on="subtitleView!(currentUser, currentGroup)?.listeners"
              >
                <template
                  v-for="(item, key) in subtitleView(currentUser, currentGroup)!.slots"
                  :key="key"
                >
                  <div :v-slot="[key]" :v-html="item"></div>
                </template>
              </component>
            </div>
          </div>
        </cometchat-list-item>

        <div v-else-if="customProfileView">
          <div
            v-if="customProfileView(currentUser, currentGroup)!.html"
            v-html="customProfileView(currentUser, currentGroup)!.html"
          ></div>
          <component
            v-else
            :is="customProfileView(currentUser, currentGroup)!.componentName!"
            v-bind="{ ...customProfileView(currentUser, currentGroup)!.props }"
            v-on="customProfileView!(currentUser, currentGroup)!.listeners"
          >
            <template
              v-for="(item, key) in customProfileView!(currentUser, currentGroup)!.slots"
              :key="key"
            >
              <div :v-slot="[key]" :v-html="item"></div>
            </template>
          </component>
        </div>
      </div>
      <div
        class="cc-details__section-list"
        v-if="defaultTemplate && defaultTemplate.length > 0"
      >
        <div
          class="cc-details__section"
          v-for="item of defaultTemplate"
          :key="item.id"
        >
          <div class="cc-details__section-separator" v-if="item.title">
            <cometchat-label
              :text="item.title"
              :labelStyle="getSectionHeaderStyle(item)"
            ></cometchat-label>
          </div>
          <div
            class="cc-details__options-wrapper"
            v-if="getTemplateOptions(item)"
          >
            <div
              class="cc-details__options"
              v-for="option of getTemplateOptions(item)"
              :key="option.id"
            >
              <div
                class="cc-details__option"
                v-if="!getCustomOptionView(option)"
                @click="onOptionClick(option)"
              >
                <div class="cc-details__option-title">
                  <cometchat-button
                    :text="option.title"
                    :buttonStyle="getButtonStyle(option)"
                  ></cometchat-button>
                  <div class="cc-details__option-tail" v-if="option?.tail">
                    <div v-html="option?.tail"></div>
                  </div>
                </div>
                <cometchat-divider
                  :dividerStyle="dividerStyle"
                ></cometchat-divider>
              </div>
              <div v-else v-html="getCustomOptionView(option)"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="cc-details__view" v-if="openAddMembersPage">
    <CometChatAddMembers
      :group="currentGroup"
      :selectionMode="
        addMembersConfiguration?.selectionMode ?? SelectionMode.multiple
      "
      :onClose="addMembersConfiguration?.onClose ?? onClose ?? undefined"
      :onBack="addMembersConfiguration?.onBack || addMembers"
      :backButtonIconURL="addMembersConfiguration?.backButtonIconURL"
      :showBackButton="addMembersConfiguration?.showBackButton"
      :titleAlignment="addMembersConfiguration?.titleAlignment"
      :hideSearch="addMembersConfiguration?.hideSearch"
      :searchIconURL="addMembersConfiguration?.searchIconURL"
      :showSectionHeader="addMembersConfiguration?.showSectionHeader"
      :sectionHeaderField="addMembersConfiguration?.sectionHeaderField"
      :loadingIconURL="addMembersConfiguration?.loadingIconURL"
      :loadingStateView="addMembersConfiguration?.loadingStateView"
      :emptyStateView="addMembersConfiguration?.emptyStateView"
      :errorStateView="addMembersConfiguration?.errorStateView"
      :hideError="addMembersConfiguration?.hideError"
      :disableUsersPresence="addMembersConfiguration?.disableUsersPresence"
      :hideSeparator="addMembersConfiguration?.hideSeparator"
      :onError="addMembersConfiguration?.onError ?? undefined"
      :menus="addMembersConfiguration?.menu"
      :options="addMembersConfiguration?.options ?? undefined"
      :onSelect="addMembersConfiguration?.onSelect"
      :usersRequestBuilder="addMembersConfiguration?.usersRequestBuilder"
      :searchRequestBuilder="addMembersConfiguration?.searchRequestBuilder"
      :listItemView="addMembersConfiguration?.listItemView"
      :subtitleView="addMembersConfiguration?.subtitleView"
      :onAddMembersButtonClick="
        addMembersConfiguration?.onAddMembersButtonClick ?? undefined
      "
      :closeButtonIconURL="addMembersConfiguration?.closeButtonIconURL"
      :listItemStyle="addMembersConfiguration?.listItemStyle"
      :statusIndicatorStyle="addMembersConfiguration?.statusIndicatorStyle"
      :avatarStyle="addMembersConfiguration?.avatarStyle"
      :addMembersStyle="addMembersConfiguration?.addMembersStyle"
    >
    </CometChatAddMembers>
  </div>
  <div class="cc-details__view" v-if="openBannedMembersPage">
    <CometChatBannedMembers
      :group="currentGroup"
      :onClose="onClose ?? addMembersConfiguration?.onClose ?? undefined"
      :onBack="bannedMembersConfiguration?.onBack || bannedMembers"
      :backButtonIconURL="bannedMembersConfiguration?.backButtonIconURL"
      :showBackButton="bannedMembersConfiguration?.showBackButton"
      :menus="bannedMembersConfiguration?.menu"
      :titleAlignment="bannedMembersConfiguration?.titleAlignment"
      :hideSearch="bannedMembersConfiguration?.hideSearch"
      :searchIconURL="bannedMembersConfiguration?.searchIconURL"
      :bannedMembersRequestBuilder="
        bannedMembersConfiguration?.bannedMembersRequestBuilder
      "
      :searchRequestBuilder="bannedMembersConfiguration?.searchRequestBuilder"
      :listItemView="bannedMembersConfiguration?.listItemView"
      :subtitleView="bannedMembersConfiguration?.subtitleView"
      :hideSeparator="bannedMembersConfiguration?.hideSeparator"
      :disableUsersPresence="bannedMembersConfiguration?.disableUsersPresence"
      :options="bannedMembersConfiguration?.options ?? undefined"
      :selectionMode="bannedMembersConfiguration?.selectionMode"
      :closeButtonIconURL="bannedMembersConfiguration?.closeButtonIconURL"
      :onError="bannedMembersConfiguration?.onError ?? undefined"
      :onSelect="bannedMembersConfiguration?.onSelect"
      :emptyStateView="bannedMembersConfiguration?.emptyStateView"
      :errorStateView="bannedMembersConfiguration?.errorStateView"
      :loadingStateView="bannedMembersConfiguration?.loadingStateView"
      :loadingIconURL="bannedMembersConfiguration?.loadingIconURL"
      :hideError="bannedMembersConfiguration?.hideError"
      :statusIndicatorStyle="bannedMembersConfiguration?.statusIndicatorStyle"
      :avatarStyle="bannedMembersConfiguration?.avatarStyle"
      :listItemStyle="bannedMembersConfiguration?.listItemStyle"
      :bannedMemberStyle="bannedMembersConfiguration?.bannedMembersStyle"
    >
    </CometChatBannedMembers>
  </div>
  <div class="cc-details__view" v-if="openViewMembersPage">
    <CometChatGroupMembers
      :group="currentGroup"
      :onClose="groupMembersConfiguration?.onClose ?? onClose ?? undefined"
      :onBack="groupMembersConfiguration?.onBack || viewMembers"
      :groupMemberRequestBuilder="
        groupMembersConfiguration?.groupMembersRequestBuilder
      "
      :searchRequestBuilder="groupMembersConfiguration?.searchRequestBuilder"
      :listItemView="groupMembersConfiguration?.listItemView"
      :subtitleView="groupMembersConfiguration?.subtitleView"
      :disableUsersPresence="groupMembersConfiguration?.disableUsersPresence"
      :menus="groupMembersConfiguration?.menu"
      :options="undefined"
      :backButtonIconURL="groupMembersConfiguration?.backButtonIconURL"
      :closeButtonIconURL="groupMembersConfiguration?.closeButtonIconURL"
      :showBackButton="groupMembersConfiguration?.showBackButton"
      :hideSeparator="groupMembersConfiguration?.hideSeparator"
      :selectionMode="groupMembersConfiguration?.selectionMode"
      :hideError="groupMembersConfiguration?.hideError"
      :searchIconURL="groupMembersConfiguration?.searchIconURL"
      :dropDownIconURL="groupMembersConfiguration?.dropdownIconURL"
      :hideSearch="groupMembersConfiguration?.hideSearch"
      :onError="groupMembersConfiguration?.onError ?? undefined"
      :onSelect="groupMembersConfiguration?.onSelect"
      :emptyStateView="groupMembersConfiguration?.emptyStateView"
      :errorSateView="groupMembersConfiguration?.errorStateView"
      :loadingIconURL="groupMembersConfiguration?.loadingIconURL"
      :loadingStateView="groupMembersConfiguration?.loadingStateView"
      :titleAlignment="groupMembersConfiguration?.titleAlignment"
      :statusIndicatorStyle="groupMembersConfiguration?.statusIndicatorStyle"
      :avatarStyle="groupMembersConfiguration?.avatarStyle"
      :groupMembersStyle="groupMembersConfiguration?.groupMembersStyle"
      :groupScopeStyle="groupMembersConfiguration?.groupScopeStyle"
      :listItemStyle="groupMembersConfiguration?.listItemStyle"
    >
    </CometChatGroupMembers>
  </div>
  <cometchat-backdrop
    :backdropStyle="backdropStyle"
    v-if="confirmLeaveGroupModal"
  >
    <cometchat-confirm-dialog
      :title="''"
      :messageText="confirmDialogMessageRef"
      :cancelButtonText="cancelButtonText"
      :confirmButtonText="leaveButtonTextRef"
      @cc-confirm-clicked="getConfirmClickHandler()()"
      @cc-cancel-clicked="onCancelClick()"
      :confirmDialogStyle="confirmDialogStyleRef"
    >
    </cometchat-confirm-dialog>
  </cometchat-backdrop>
  <cometchat-backdrop
    :backdropStyle="backdropStyle"
    v-if="openTransferOwnershipModal"
  >
    <CometChatTransferOwnership
      :group="currentGroup"
      :onTransferOwnership="transferOwnershipConfiguration?.onTransferOwnership"
      :titleAlignment="transferOwnershipConfiguration?.titleAlignment"
      :loadingIconURL="transferOwnershipConfiguration?.loadingIconURL"
      :loadingStateView="transferOwnershipConfiguration?.loadingStateView"
      :errorStateView="transferOwnershipConfiguration?.errorStateView"
      :emptyStateView="transferOwnershipConfiguration?.emptyStateView"
      :onError="transferOwnershipConfiguration?.onError"
      :hideSearch="transferOwnershipConfiguration?.hideSearch"
      :searchIconURL="transferOwnershipConfiguration?.searchIconURL"
      :hideSeparator="transferOwnershipConfiguration?.hideSeparator"
      :closeButtonIconURL="transferOwnershipConfiguration?.closeButtonIconURL"
      :disableUsersPresence="
        transferOwnershipConfiguration?.disableUsersPresence
      "
      :listItemView="transferOwnershipConfiguration?.listItemView"
      :subtitleView="transferOwnershipConfiguration?.subtitleView"
      :onClose="
        transferOwnershipConfiguration?.onClose || closeTransferOwnership
      "
      :groupMembersRequestBuilder="
        transferOwnershipConfiguration?.groupMembersRequestBuilder
      "
      :searchRequestBuilder="
        transferOwnershipConfiguration?.searchRequestBuilder
      "
      :options="!transferOwnershipConfiguration.options ? undefined : (group : CometChat.Group, groupMember : CometChat.GroupMember) => transferOwnershipConfiguration.options!(groupMember)"
      :statusIndicatorStyle="
        transferOwnershipConfiguration?.statusIndicatorStyle
      "
      :avatarStyle="transferOwnershipConfiguration?.avatarStyle"
      :listItemStyle="transferOwnershipConfiguration?.listItemStyle"
      :groupMemberStyle="transferOwnershipConfiguration?.groupMemberStyle"
      :transferOwnershipStyle="
        transferOwnershipConfiguration?.transferOwnershipStyle
      "
    >
    </CometChatTransferOwnership>
  </cometchat-backdrop>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  ref,
  onBeforeUpdate,
  onBeforeUnmount,
  toRef,
  PropType,
  inject,
} from "vue";
import {
  AddMembersConfiguration,
  BannedMembersConfiguration,
  BaseStyle,
  CometChatUIKitUtility,
  DetailsStyle,
  DetailsUtils,
  GroupMembersConfiguration,
  TransferOwnershipConfiguration,
} from "uikit-utils-lerna";
import { Close2xIcon, PrivateGroupIcon, PasswordGroupIcon } from "../../assets";
import {
  CometChatDetailsOption,
  CometChatDetailsTemplate,
  CometChatGroupEvents,
  CometChatTheme,
  CometChatUIKitConstants,
  CometChatUserEvents,
  fontHelper,
  IGroupMemberAdded,
  IGroupMemberJoined,
  IGroupMemberKickedBanned,
  IOwnershipChanged,
  localize,
  SelectionMode,
} from "uikit-resources-lerna";

import {
  AvatarStyle,
  ConfirmDialogStyle,
  ListItemStyle,
} from "my-cstom-package-lit";
import { CometChat } from "@cometchat-pro/chat";
import { Subscription } from "rxjs";
import CometChatAddMembers from "../CometChatAddMembers/index.vue";
import CometChatGroupMembers from "../CometChatGroupMembers/index.vue";
import CometChatBannedMembers from "../CometChatBannedMembers/index.vue";
import CometChatTransferOwnership from "../CometChatTransferOwnership/index.vue";
export default defineComponent({
  name: "CometChatDetails",
  components: {
    CometChatAddMembers,
    CometChatGroupMembers,
    CometChatBannedMembers,
    CometChatTransferOwnership,
  },
  props: {
    group: { type: CometChat.Group },
    user: { type: CometChat.User },
    title: { type: String, default: () => localize("DETAILS") },
    closeButtonIconURL: { type: String, default: Close2xIcon },
    hideProfile: { type: Boolean, defaut: false },
    subtitleView: {
      type: Function as PropType<
        (user?: CometChat.User, group?: CometChat.Group) => ViewType
      >,
      default: undefined,
    },
    customProfileView: {
      type: Function as PropType<
        (user?: CometChat.User, group?: CometChat.Group) => ViewType
      >,
      default: undefined,
    },
    data: {
      type: Function as PropType<
        (
          user?: CometChat.User,
          group?: CometChat.Group
        ) => CometChatDetailsTemplate[]
      >,
    },
    disableUsersPresence: { type: Boolean, defaut: false },
    privateGroupIcon: { type: String, default: PrivateGroupIcon },
    protectedGroupIcon: { type: String, default: PasswordGroupIcon },
    onError: {
      type: Function as PropType<(error: CometChat.CometChatException) => void>,
      default: (error: CometChat.CometChatException) => {
        console.log(error);
      },
    },

    onClose: {
      type: Function as PropType<() => void>,
      default: () => {
        //do nothing
      },
    },

    leaveButtonText: {
      type: String,
      default: () => localize("LEAVE_GROUP"),
    },
    cancelButtonText: { type: String, default: () => localize("CANCEL") },

    addMembersConfiguration: {
      type: AddMembersConfiguration,
      default: new AddMembersConfiguration({}),
    },
    bannedMembersConfiguration: {
      type: BannedMembersConfiguration,
      default: new BannedMembersConfiguration({}),
    },
    groupMembersConfiguration: {
      type: GroupMembersConfiguration,
      default: new GroupMembersConfiguration({}),
    },
    transferOwnershipConfiguration: {
      type: TransferOwnershipConfiguration,
      default: new TransferOwnershipConfiguration({}),
    },
    leaveDialogStyle: {
      type: ConfirmDialogStyle,
      default: new ConfirmDialogStyle({
        confirmButtonBackground: "RGB(51, 153, 255)",
        cancelButtonBackground: "RGBA(20, 20, 20, 0.06)",
        confirmButtonTextColor: "white",
        confirmButtonTextFont: "600 15px Inter",
        cancelButtonTextColor: "black",
        cancelButtonTextFont: "600 15px Inter",
        titleFont: "",
        titleColor: "",
        messageTextFont: "400 13px Inter",
        messageTextColor: "RGBA(20, 20, 20, 0.58)",
        background: "white",
        border: "1px solid #F2F2F2",
        height: "220px",
        width: "360px",
      }),
    },
    statusIndicatorStyle: {
      type: null,
      default: {
        height: "10px",
        width: "10px",
        borderRadius: "16px",
        border: "",
      },
    },
    backdropStyle: {
      type: BaseStyle,
      default: {
        height: "100%",
        width: "100%",
        background: "rgba(0, 0, 0, 0.5)",
      },
    },
    avatarStyle: {
      type: AvatarStyle,
      default: new AvatarStyle({
        borderRadius: "16px",
        width: "28px",
        height: "28px",
        border: "none",
      }),
    },
    detailsStyle: {
      type: DetailsStyle,
      default: () => {
        return {} as any;
      },
    },
    listItemStyle: {
      type: ListItemStyle,
      default: {},
    },
    leaveConfirmDialogMessage: {
      type: String,
      default: () => localize("LEAVE_CONFIRM"),
    },
    transferButtonText: {
      type: String,
      default: () => localize("TRANSFER_OWNERSHIP"),
    },
    transferConfirmDialogMessage: {
      type: String,
      default: () => localize("TRANSFER_CONFIRM"),
    },
    deleteButtonText: { type: String, default: () => localize("DELETE") },
    deleteConfirmDialogMessage: {
      type: String,
      default: () => localize("DELETE_CONFIRM"),
    },
    deleteDialogStyle: {
      type: ConfirmDialogStyle,
      default: () => {
        return {} as any;
      },
    },
  },
  setup(props) {
    let { theme, switchThemeMode }: any = inject(
      "theme",
      new CometChatTheme({})
    )!;
    let leaveGroupText: string = localize("LEAVE_GROUP");
    let leaveGroupMessage: string = props.leaveConfirmDialogMessage!;
    let transferText: string = props.transferButtonText!;
    let transferConfirm: string = props.transferConfirmDialogMessage!;
    let defaultTemplate: any = ref();
    let loggedInUser: any = ref();
    let openViewMembersPage = ref(false);
    let openBannedMembersPage = ref(false);
    let openAddMembersPage = ref(false);
    let confirmLeaveGroupModal = ref(false);
    let openTransferOwnershipModal = ref(false);
    let confirmDialogStyleRef = ref(props.backdropStyle);
    let ccGroupMemberAdded!: Subscription;
    let ccGroupMemberJoined!: Subscription;
    let ccGroupMemberKicked!: Subscription;
    let ccGroupMemberBanned!: Subscription;
    let ccOwnershipChanged!: Subscription;
    let statusIndicatorStyle: any;
    let avatarStyle: any;
    let detailsStyle: any;
    let statusColor: any = {
      private: "",
      password: "#F7A500",
      public: "",
    };
    let closeButtonStyle: any = {
      height: "24px",
      width: "24px",
      border: "none",
      borderRadius: "0",
      background: "transparent",
      buttonIconTint:
        props.detailsStyle.closeButtonIconTint ||
        theme.value.palette.getPrimary(),
    };
    let confirmClickHandler: any;
    let listItemStyle: any;
    let buttonStyle: any = {
      height: "100%",
      width: "100%",
      border: "none",
      borderRadius: "0",
      background: "transparent",
      buttonTextColor: theme.value.palette.getPrimary() || "rgba(51, 153, 255)",
      buttonTextFont: "500 16px Inter",
    };
    let dividerStyle: any = {
      background: "rgb(222 222 222 / 46%)",
      height: "1px",
      width: "100%",
    };

    let subtitleText = ref("");
    let userListenerId = "userlist_" + new Date().getTime();
    let currentUser: any = ref(props.user);
    let currentGroup: any = ref(props.group);
    let styleLeaveDialog: any;
    let leaveButtonTextRef = ref(props.leaveButtonText);
    let confirmDialogMessageRef = ref("");
    let changed = false;
    let deleteGroupConfirmDialogStyle = {
      confirmButtonBackground:
        props.deleteDialogStyle?.confirmButtonBackground ||
        theme.value.palette.getPrimary(),
      cancelButtonBackground:
        props.deleteDialogStyle?.cancelButtonBackground ||
        theme.value.palette.getSecondary(),
      confirmButtonTextColor:
        props.deleteDialogStyle?.confirmButtonTextColor ||
        theme.value.palette.getAccent900("light"),
      confirmButtonTextFont:
        props.deleteDialogStyle?.confirmButtonTextFont ||
        fontHelper(theme.value.typography.text2),
      cancelButtonTextColor:
        props.deleteDialogStyle?.cancelButtonTextColor ||
        theme.value.palette.getAccent900("dark"),
      cancelButtonTextFont:
        props.deleteDialogStyle?.cancelButtonTextFont ||
        fontHelper(theme.value.typography.text2),
      titleFont:
        props.deleteDialogStyle?.titleFont ||
        fontHelper(theme.value.typography.title1),
      titleColor:
        props.deleteDialogStyle?.titleColor || theme.value.palette.getAccent(),
      messageTextFont:
        props.deleteDialogStyle?.messageTextFont ||
        fontHelper(theme.value.typography.subtitle2),
      messageTextColor:
        props.deleteDialogStyle?.messageTextColor ||
        theme.value.palette.getAccent600(),
      background:
        props.deleteDialogStyle?.background ||
        theme.value.palette.getBackground(),
      width: props.deleteDialogStyle?.width || "320px",
      height: props.deleteDialogStyle?.height || "100%",
      border:
        props.deleteDialogStyle?.border ||
        `1px solid ${theme.value.palette.getAccent200()}`,
      borderRadius: props.deleteDialogStyle?.borderRadius || "8px",
      boxShadow: props.deleteDialogStyle?.boxShadow,
    };

    onBeforeMount(() => {
      CometChat.getLoggedinUser().then((user: CometChat.User | null) => {
        if (user) {
          loggedInUser.value = user as CometChat.User;
          getTemplate();
        }
      });
      if (props.user) {
        currentUser.value = props.user;
        currentGroup.value = null;
      } else {
        currentUser.value = null;
        currentGroup.value = props.group;
      }
      setThemeStyle();
      getTemplate();
      //subscribeToEvents();
      statusColor.online =
        props.detailsStyle.onlineStatusColor ||
        theme.value.palette.getSuccess();

      attachListeners();
      updateSubtitle();
    });

    onBeforeUpdate(() => {
      if (
        (!currentUser.value && props.user?.getUid()) ||
        (currentUser.value &&
          props.user &&
          currentUser.value.getUid() != props.user?.getUid())
      ) {
        changed = true;
        currentUser.value = props.user;

        currentGroup.value = null;
      } else if (
        (!currentGroup.value && props.group?.getGuid()) ||
        (currentGroup.value && props.group)
      ) {
        if (currentGroup.value.getGuid() != props.group?.getGuid()) {
          changed = true;
        }
        currentGroup.value = props.group;
        currentUser.value = null;
      }
      if (changed) {
        if (loggedInUser.value) {
          getTemplate();
        } else {
          CometChat.getLoggedinUser().then((user: CometChat.User | null) => {
            if (user) {
              loggedInUser.value = user as CometChat.User;
              getTemplate();
            }
          });
        }
      }
      updateSubtitle();
      changed = false;
    });

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
      } catch (error: any) {
        console.log(error);
      }
    };

    const updateUserStatus = (user: CometChat.User) => {
      if (
        currentUser.value &&
        currentUser.value.getUid() &&
        currentUser.value.getUid() === user.getUid()
      ) {
        currentUser.value.setStatus(user.getStatus());
        updateSubtitle();
      }
      // ref.detectChanges();
    };

    const setThemeStyle = () => {
      setDetailsStyle();
      setAvatarStyle();
      setStatusStyle();
      setListItemStyle();
      setConfirmDialogStyle();
      statusColor.private =
        props.detailsStyle.privateGroupIconBackground || "#F7A500";
      statusColor.online = props.detailsStyle.onlineStatusColor;
      statusColor.password =
        props.detailsStyle.passwordGroupIconBackground || "#F7A500";
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
        separatorColor: theme.value.palette.getAccent200(),
        hoverBackground: "transparent",
      });
      listItemStyle = { ...defaultStyle, ...props.listItemStyle };
      return listItemStyle;
    };

    const setConfirmDialogStyle = () => {
      let defaultStyle: ConfirmDialogStyle = new ConfirmDialogStyle({
        confirmButtonBackground: theme.value.palette.getPrimary(),
        cancelButtonBackground: theme.value.palette.getSecondary(),
        confirmButtonTextColor: theme.value.palette.getAccent900("light"),
        confirmButtonTextFont: fontHelper(theme.value.typography.text2),
        cancelButtonTextColor: theme.value.palette.getAccent900("dark"),
        cancelButtonTextFont: fontHelper(theme.value.typography.text2),
        titleFont: fontHelper(theme.value.typography.title1),
        titleColor: theme.value.palette.getAccent(),
        messageTextFont: fontHelper(theme.value.typography.subtitle2),
        messageTextColor: theme.value.palette.getAccent600(),
        background: theme.value.palette.getBackground(),
        height: "100%",
        width: "350px",
        border: `1px solid ${theme.value.palette.getAccent200()}`,
        borderRadius: "8px",
      });
      styleLeaveDialog = { ...defaultStyle, ...props.leaveDialogStyle };
    };

    const setStatusStyle = () => {
      let defaultStyle: BaseStyle = {
        height: "12px",
        width: "12px",
        border: "none",
        borderRadius: "24px",
      };
      statusIndicatorStyle = {
        ...defaultStyle,
        ...props.statusIndicatorStyle,
      };
      return statusIndicatorStyle;
    };

    const setAvatarStyle = () => {
      let defaultStyle: AvatarStyle = new AvatarStyle({
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
      });
      avatarStyle = { ...defaultStyle, ...props.avatarStyle };
      return avatarStyle;
    };

    const getSectionHeaderStyle = (template: CometChatDetailsTemplate) => {
      return {
        textFont: template.titleFont,
        textColor: template.titleColor,
      };
    };

    const setDetailsStyle = () => {
      let defaultStyle: DetailsStyle = new DetailsStyle({
        background: theme.value.palette.getBackground(),
        border: `1px solid ${theme.value.palette.getAccent50()}`,
        titleTextFont: fontHelper(theme.value.typography.title1),
        titleTextColor: theme.value.palette.getAccent(),
        onlineStatusColor: theme.value.palette.getSuccess(),
        privateGroupIconBackground: theme.value.palette.getSuccess(),
        passwordGroupIconBackground: "RGB(247, 165, 0)",
        closeButtonIconTint: theme.value.palette.getPrimary(),
        width: "100%",
        height: "100%",
        borderRadius: "",
        subtitleTextFont: fontHelper(theme.value.typography.subtitle2),
        subtitleTextColor: theme.value.palette.getAccent600(),
        // padding: "0 100px",
      });
      detailsStyle = { ...defaultStyle, ...props.detailsStyle };
    };
    const wrapperStyle = () => {
      let defaultStyle = {
        width: "100%",
        height: "100%",
        background: theme.value.palette.getBackground(),
        border: "",
        borderRadius: "",
      };

      return {
        width: props.detailsStyle.width || defaultStyle.width,
        height: props.detailsStyle.height || defaultStyle.height,
        border: props.detailsStyle.border || defaultStyle.border,
        borderRadius:
          props.detailsStyle.borderRadius || defaultStyle.borderRadius,
        background: props.detailsStyle.background || defaultStyle.background,
      };
    };
    const paddingStyle = () => {
      return {
        padding: props.detailsStyle?.padding,
      };
    };
    const updateSubtitle = () => {
      const count = currentGroup?.value?.getMembersCount();
      const membersText = localize(count > 1 ? "MEMBERS" : "MEMBER");
      subtitleText.value = currentUser.value
        ? currentUser.value.getStatus()
        : `${count} ${membersText}`;
      console.log("CHANGING SUBTITILE: ", subtitleText.value);
    };

    const onCloseDetails = () => {
      if (props.onClose) {
        props.onClose();
      }
    };

    const checkStatusType = () => {
      return currentUser.value && !props.disableUsersPresence
        ? statusColor[currentUser?.value?.getStatus()]
        : statusColor[currentGroup?.value?.getType()];
    };

    const subtitleStyle = () => {
      if (
        currentUser.value &&
        currentUser.value.getStatus() ==
          CometChatUIKitConstants.userStatusType.online
      ) {
        return {
          textFont: props.detailsStyle.subtitleTextFont,
          textColor: theme.value.palette.getPrimary(),
        };
      } else {
        return {
          textFont: props.detailsStyle.subtitleTextFont,
          textColor: theme.value.palette.getAccent(),
        };
      }
    };

    const checkGroupType = () => {
      let image: any = "";
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

    const getTitleStyle = () => {
      return {
        textFont:
          props.detailsStyle.titleTextFont ||
          fontHelper(theme.value.typography.title1),
        textColor:
          props.detailsStyle.titleTextColor || theme.value.palette.getAccent(),
      };
    };

    function getTemplateOptions(
      template: CometChatDetailsTemplate
    ): CometChatDetailsOption[] | undefined {
      const templateId = template.id ?? "";

      return template.options?.(
        currentUser.value,
        currentGroup.value,
        templateId
      );
    }
    const getButtonStyle = (option: CometChatDetailsOption) => {
      return {
        height: "100%",
        width: "100%",
        border: "none",
        borderRadius: "0",
        buttonTextFont: option?.titleFont,
        buttonTextColor: option?.titleColor,
        background: option?.backgroundColor || "transparent",
      };
    };

    const getCustomOptionView = (option: CometChatDetailsOption) => {
      return option?.customView;
    };

    const onOptionClick = (option: CometChatDetailsOption) => {
      const { onClick, id } = option;
      if (onClick) {
        onClick(currentUser.value ?? currentGroup.value);
        return;
      }
      switch (id) {
        case CometChatUIKitConstants.UserOptions.viewProfile:
          if (currentUser.value?.getLink()) {
            window.location.href = currentUser.value.getLink();
          }
          break;
        case CometChatUIKitConstants.UserOptions.block:
          blockUser();
          break;
        case CometChatUIKitConstants.UserOptions.unblock:
          unBlockUser();
          break;
        case CometChatUIKitConstants.GroupOptions.viewMembers:
          viewMembers();
          break;
        case CometChatUIKitConstants.GroupOptions.addMembers:
          addMembers();
          break;
        case CometChatUIKitConstants.GroupOptions.bannedMembers:
          bannedMembers();
          break;
        case CometChatUIKitConstants.GroupOptions.leave:
          leaveGroup();
          break;
        case CometChatUIKitConstants.GroupOptions.delete:
          deleteGroup();
          break;
        default:
          break;
      }
    };

    const getTemplate = () => {
      let res: CometChatDetailsTemplate[] = [];
      if (props.data) {
        if (currentUser.value) {
          res = props.data(currentUser.value);
        } else {
          res = props.data(undefined, currentGroup.value);
        }
      }

      if (res.length === 0) {
        if (currentUser.value) {
          res = DetailsUtils.getDefaultDetailsTemplate(
            loggedInUser.value,
            currentUser.value,
            undefined,
            theme.value
          );
        } else {
          res = DetailsUtils.getDefaultDetailsTemplate(
            loggedInUser.value,
            undefined,
            currentGroup.value,
            theme.value
          );
        }
      }
      defaultTemplate.value = res;
    };

    const unBlockUser = () => {
      // unblock user
      if (currentUser.value && currentUser.value.getBlockedByMe()) {
        CometChat.unblockUsers([currentUser.value.getUid()])
          .then(() => {
            currentUser.value.setBlockedByMe(false);
            CometChatUserEvents.ccUserUnblocked.next(
              CometChatUIKitUtility.clone(currentUser.value)
            );
            getTemplate();
          })
          .catch((error: any) => {
            if (props.onError) {
              let cometchatException = new CometChat.CometChatException({
                message: error.message,
              });
              props.onError(cometchatException);
            }
          });
      }
    };

    const blockUser = () => {
      if (currentUser.value && !currentUser.value.getBlockedByMe()) {
        CometChat.blockUsers([currentUser.value.getUid()])
          .then(() => {
            currentUser.value.setBlockedByMe(true);

            CometChatUserEvents.ccUserBlocked.next(
              CometChatUIKitUtility.clone(currentUser.value)
            );
            getTemplate();
            if (props.onClose) {
              props.onClose();
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
      }
    };

    const onDeleteGroup = () => {
      CometChat.deleteGroup(currentGroup?.value?.getGuid())
        .then(() => {
          CometChatGroupEvents.ccGroupDeleted.next(
            CometChatUIKitUtility.clone(currentGroup.value)
          );
          if (props.onClose) {
            props.onClose();
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
    };

    const onLeaveClick = () => {
      if (currentGroup.value.getOwner() == loggedInUser.value?.getUid()) {
        console.log("OPEN OWSNERSHIP: ");
        openTransferOwnershipModal.value = true;
        confirmLeaveGroupModal.value = false;
      } else {
        CometChat.leaveGroup(currentGroup.value.getGuid())
          .then((response: any) => {
            currentGroup.value.setMembersCount(
              currentGroup.value.getMembersCount() - 1
            );
            currentGroup.value.setHasJoined(false);
            updateSubtitle();

            openTransferOwnershipModal.value = false;
            confirmLeaveGroupModal.value = false;
            if (props.onClose) {
              props.onClose();
            }
            CometChatGroupEvents.ccGroupLeft.next({
              userLeft: CometChatUIKitUtility.clone(loggedInUser.value!),
              leftGroup: CometChatUIKitUtility.clone(currentGroup.value),
              message: createUserLeftAction(
                loggedInUser!,
                CometChatUIKitConstants.groupMemberAction.LEFT
              ),
            });
          })
          .catch((error: any) => {
            if (props.onError) {
              props.onError(error);
            }
          });
      }
    };

    const createUserLeftAction = (actionOn: CometChat.User, action: string) => {
      let actionMessage: CometChat.Action = new CometChat.Action(
        currentGroup.value.getGuid(),
        CometChatUIKitConstants.MessageTypes.groupMember,
        CometChatUIKitConstants.MessageReceiverType.group,
        CometChatUIKitConstants.MessageCategory.action as any
      );
      actionMessage.setAction(action);
      actionMessage.setActionBy(
        CometChatUIKitUtility.clone(loggedInUser.value!)
      );
      actionMessage.setActionFor(
        CometChatUIKitUtility.clone(currentGroup.value)
      );
      actionMessage.setActionOn(CometChatUIKitUtility.clone(actionOn));
      actionMessage.setReceiver(
        CometChatUIKitUtility.clone(currentGroup.value)
      );
      actionMessage.setSender(CometChatUIKitUtility.clone(loggedInUser.value!));
      actionMessage.setConversationId(
        "currentGroup_" + currentGroup.value.getGuid()
      );
      actionMessage.setMuid(CometChatUIKitUtility.ID());
      actionMessage.setMessage(
        `${loggedInUser.value?.getName()} ${action} ${
          actionOn.getUid ? actionOn.getUid() : ""
        }`
      );
      actionMessage.setSentAt(CometChatUIKitUtility.getUnixTimestamp());
      return actionMessage;
    };

    const viewMembers = () => {
      openViewMembersPage.value = !openViewMembersPage.value;
      openBannedMembersPage.value = false;
      openAddMembersPage.value = false;
    };
    const addMembers = () => {
      openAddMembersPage.value = !openAddMembersPage.value;
      openBannedMembersPage.value = false;
      openViewMembersPage.value = false;
    };
    const bannedMembers = () => {
      openAddMembersPage.value = false;
      openViewMembersPage.value = false;
      openBannedMembersPage.value = !openBannedMembersPage.value;
    };
    const leaveGroup = () => {
      confirmClickHandler = onLeaveClick;
      confirmDialogStyleRef.value = styleLeaveDialog;
      if (currentGroup.value?.getOwner() == loggedInUser.value?.getUid()) {
        leaveButtonTextRef.value = transferText;
        confirmDialogMessageRef.value = transferConfirm;
      } else {
        leaveButtonTextRef.value = leaveGroupText;
        confirmDialogMessageRef.value = leaveGroupMessage;
      }
      confirmLeaveGroupModal.value = true;
    };

    const deleteGroup = () => {
      confirmClickHandler = onDeleteGroup;
      confirmDialogStyleRef.value = deleteGroupConfirmDialogStyle;
      leaveButtonTextRef.value = props.deleteButtonText;
      confirmDialogMessageRef.value = props.deleteConfirmDialogMessage!;

      confirmLeaveGroupModal.value = true;
    };

    const onCancelClick = () => {
      confirmLeaveGroupModal.value = false;
    };

    const onCloseClick = () => {
      if (props.onClose) {
        props.onClose();
      }
    };

    const getConfirmClickHandler = () => {
      return confirmClickHandler;
    };

    const closeTransferOwnership = () => {
      openTransferOwnershipModal.value = false;
      confirmLeaveGroupModal.value = false;
    };

    return {
      getButtonStyle,
      wrapperStyle,
      checkStatusType,
      checkGroupType,
      getTitleStyle,
      onCloseDetails,
      closeButtonStyle,
      openTransferOwnershipModal,
      defaultTemplate,
      getSectionHeaderStyle,
      paddingStyle,
      subtitleStyle,
      getTemplateOptions,
      subtitleText,
      openAddMembersPage,
      dividerStyle,
      getCustomOptionView,
      openBannedMembersPage,
      openViewMembersPage,
      confirmLeaveGroupModal,
      currentUser,
      currentGroup,
      setAvatarStyle,
      setStatusStyle,
      setListItemStyle,
      onOptionClick,
      SelectionMode,
      onCancelClick,
      bannedMembers,
      viewMembers,
      addMembers,
      onCloseClick,
      getConfirmClickHandler,
      closeTransferOwnership,
      leaveButtonTextRef,
      confirmDialogMessageRef,
      confirmDialogStyleRef,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.cc-details__wrapper {
  padding: 8px;
  border-radius: 5px;
  height: 100%;

  position: relative;
}
.cc-details__profile {
  margin-bottom: 50px;
  height: 8%;
}
.cc-details__section-list {
  height: 84%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.cc-details__header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}
.cc-details__close-button {
  /* wrapper position relative */
  position: absolute;
  right: 20px;
}
.cc-details__section {
  margin-bottom: 32px;
}
.cc-details__section-separator {
  margin-bottom: 16px;
  padding-left: 6px;
  height: 5%;
}
.cc-details__options-wrapper {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.cc-details__option {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  min-height: 50px;
}
.cc-details__option-title {
  padding-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.cc-details__view {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  max-width: 100%;
  z-index: 1;
}
.cc-details__section-list::-webkit-scrollbar {
  background: transparent;
  width: 8px;
}
.cc-details__section-list::-webkit-scrollbar-thumb {
  background: rgb(232, 229, 229);
  border-radius: 8px;
}
</style>
