<template>
  <div class="cc-banned-members__wrapper" :style="membersStyle()">
    <div class="cc-banned-members__back">
      <cometchat-button
        v-if="showBackButton"
        :iconURL="backButtonIconURL"
        :buttonStyle="backButtonStyle()"
        @cc-button-clicked="backClicked()"
      >
      </cometchat-button>
    </div>
    <div class="cc-banned-members__menus" v-if="menus">
      <div v-if="menus.html" v-html="menus.html"></div>
      <component
        v-else
        :is="menus.componentName!"
        v-on="menus?.listeners"
        v-bind="{ ...menus.props }"
      >
        <template v-for="(element, key) in menus.slots" :key="key">
          <div :v-slot="[key]" v-html="element"></div>
        </template>
      </component>
    </div>
    <CometChatList
      :title="title"
      :titleAlignment="titleAlignment"
      :hideSearch="hideSearch"
      :searchIconURL="searchIconURL"
      :searchPlaceholderText="searchPlaceholder"
      :list="BannedMembers"
      :onSearch="onSearch"
      :showSectionHeader="showSectionHeader"
      :state="state"
      :loadingIconURL="loadingIconURL"
      :hideError="hideError"
      :errorStateText="errorStateText"
      :emptyStateText="emptyStateText"
      :scrollToBottom="false"
      :onScrolledToBottom="fetchNextBannedMembers"
      listItemKey="getUid"
      :searchText="searchKeyword"
      :loadingStateView="loadingStateView"
      :errorStateView="errorStateView"
      :emptyStateView="emptyStateView"
      :listStyle="listStyle"
      :onError="onError"
    >
      <template v-slot:listItem="{ item }">
        <div v-if="listItemView">
          <div
            v-if="listItemView(item)?.html"
            v-html="listItemView(item)?.html"
          ></div>
          <component
            v-else
            :is="listItemView(item)?.componentName!"
            v-bind="{ ...listItemView(item)?.props }"
          >
            <template
              v-for="(html, key) in listItemView(item)?.slots"
              :key="key"
            >
              <div :v-slot="[key]" v-html="html"></div>
            </template>
          </component>
        </div>
        <cometchat-list-item
          v-else
          :title="item.name"
          :avatarURL="item?.avatar"
          :avatarName="item?.name"
          :hideSeparator="hideSeparator"
          :listItemStyle="mylistItemStyle"
          :avatarStyle="myavatarStyle"
          :statusIndicatorStyle="mystatusIndicatorStyle"
          :statusIndicatorColor="getStatusIndicatorColor(item)"
        >
          <div
            v-if="subtitleView"
            slot="subtitleView"
            class="cc-banned-members__subtitle-view"
          >
            <div
              v-if="subtitleView(item)?.html"
              v-html="subtitleView(item)?.html"
            ></div>
            <component
              v-else
              :is="subtitleView(item)?.componentName!"
              v-bind="{ ...subtitleView(item)?.props }"
            >
              <template
                v-for="(element, key) in subtitleView(item)?.slots"
                :key="key"
              >
                <div :v-slot="[key]" v-html="element"></div>
              </template>
            </component>
          </div>
          <div
            slot="menuView"
            class="cc-banned-members__options"
            v-if="options"
          >
            <cometchat-menu-list
              :menuListStyle="menuListStyle"
              :data="options?.(item)"
            >
            </cometchat-menu-list>
          </div>

          <div
            slot="tailView"
            class="cc-banned-members__tail-view"
            v-if="selectionMode !== SelectionMode.none"
          >
            <div
              class="cc-banned-members__selection-single"
              v-if="selectionMode == SelectionMode.single"
            >
              <cometchat-radio-button
                @cc-radio-button-changed="onSelect ? onSelect(item) : null"
              ></cometchat-radio-button>
            </div>
            <div
              class="cc-banned-members__selection-multiple"
              v-if="selectionMode == SelectionMode.multiple"
            >
              <cometchat-checkbox
                @cc-checkbox-changed="onSelect ? onSelect(item) : null"
              ></cometchat-checkbox>
            </div>
          </div>
          <div v-else slot="tailView">
            <div class="cc-banned-members__unban">
              <cometchat-button
                :buttonStyle="unbanIconStyle"
                :iconURL="unbanIconURL"
                @click="unBanMember(item)"
              >
              </cometchat-button>
            </div>
          </div>
        </cometchat-list-item>
      </template>
    </CometChatList>
    <div class="cc-banned-members__close-button">
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
import CometChatList from "../CometChatList/index.vue";
import { Subscription } from "rxjs";

import "my-cstom-package-lit";

import {
  BaseStyle,
  SelectionMode,
  ConversationUtils,
  GroupMemberUtils,
  BannedMembersStyle,
  ListStyle,
} from "uikit-utils-lerna";

import { SearchIcon, BackIcon, Close2xIcon, LoadingIcon } from "../../assets";
import {
  AvatarStyle,
  ListItemStyle,
  MenuListStyle,
} from "my-cstom-package-lit";
import {
  CometChatTheme,
  localize,
  TitleAlignment,
  States,
  fontHelper,
  CometChatUIKitConstants,
  CometChatOption,
  CometChatGroupEvents,
} from "uikit-resources-lerna";

import {
  defineComponent,
  ref,
  Ref,
  onMounted,
  onBeforeUnmount,
  computed,
  onBeforeUpdate,
  PropType,
  inject,
} from "vue";

export default defineComponent({
  components: {
    CometChatList,
  },
  props: {
    title: {
      type: String,
      default: () => localize("BANNED_MEMBERS"),
    },
    titleAlignment: {
      type: Number as PropType<TitleAlignment>,
      default: TitleAlignment.center,
    },
    searchPlaceholder: {
      type: String,
      default: () => localize("SEARCH"),
    },
    subtitleView: {
      type: Function as PropType<
        (bannedMember: CometChat.GroupMember) => ViewType
      >,
    },

    listItemView: {
      type: Function as PropType<
        (bannedMember: CometChat.GroupMember) => ViewType
      >,
    },
    menus: {
      type: Object as PropType<ViewType>,
    },
    options: {
      type: Function as PropType<
        (bannedMember: CometChat.GroupMember) => CometChatOption[]
      >,
    },
    bannedMembersRequestBuilder: {
      type: CometChat.BannedMembersRequestBuilder,
    },
    searchRequestBuilder: {
      type: CometChat.BannedMembersRequestBuilder,
    },
    disableUsersPresence: {
      type: Boolean,
      default: false,
    },
    group: {
      type: CometChat.Group,
      required: true,
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
      default: SelectionMode.none,
    },
    onSelect: {
      type: Function as PropType<(bannedMember: CometChat.GroupMember) => void>,
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
    unbanIconURL: {
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
    showSectionHeader: {
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
      default: () => localize(""),
    },

    onItemClick: {
      type: Function as PropType<(bannedMember: CometChat.GroupMember) => void>,
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

    bannedMembersStyle: {
      type: BannedMembersStyle,
      default: () => {
        return {} as any;
      },
    },
    statusIndicatorStyle: {
      type: null,
    },
    listItemStyle: {
      type: ListItemStyle,
      default: () => {
        return {} as any;
      },
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

    const BannedMembers: Ref<CometChat.GroupMember[]> = ref([]);
    const membersListenerId = ref<string>(
      "bannedMembers_" + new Date().getTime()
    );
    const userListenerId = ref<string>(
      "BannedMembers_UserListener_" + new Date().getTime()
    );
    const groupListenerId = ref<string>(
      "BannedMembers_GroupListener_" + new Date().getTime()
    );

    const bannedMembersRequest = ref<any>(null);

    const state = ref<States>(States.loading);
    // const changeScope = ref<boolean>(true);
    // let loggedInUser: any = ref(null);
    let memberScope: Ref<string[]> = ref([]);

    const limit = ref<number>(30);
    const searchKeyword = ref("");

    let myavatarStyle = ref(props.avatarStyle);

    let mybannedMembersStyle = ref(props.bannedMembersStyle);
    let mylistItemStyle = ref(props.listItemStyle);
    let mystatusIndicatorStyle = ref(props.statusIndicatorStyle);

    let listStyle = ref<ListStyle>({});
    const ccGroupMemberBanned = ref<Subscription>();
    const ccGroupMemberUnbanned = ref<Subscription>();

    // const modalStyle: any = ref({
    //   height: "212px",
    //   width: "360px",
    //   background: "white",
    //   borderRadius: "12px",
    //   border: "none",
    // });

    let menuListStyle: any = ref({
      width: "",
      height: "",
      border: "none",
      borderRadius: "8px",
      background: "white",
      textFont: "400 15px Inter",
      textColor: "black",
      iconTint: "rgb(51, 153, 255)",
      iconBackground: "transparent",
      iconBorder: "none",
      iconBorderRadius: "0",
      submenuWidth: "100%",
      submenuHeight: "100%",
      submenuBorder: "1px solid #e8e8e8",
      submenuBorderRadius: "8px",
      submenuBackground: "white",
    });

    let unbanIconStyle: any = {
      border: "none",
      background: "transparent",
      buttonIconTint:
        props.bannedMembersStyle.unbanIconTint || "rgb(51, 153, 255)",
    };

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

    const getStatusIndicatorColor = (member: CometChat.GroupMember) => {
      if (!props.disableUsersPresence) {
        if (
          member?.getStatus() == CometChatUIKitConstants.userStatusType.online
        ) {
          return (
            props.bannedMembersStyle.onlineStatusColor ||
            theme.value.palette.getSuccess() ||
            null
          );
        } else {
          return null;
        }
      }
      return null;
    };

    const unBanMember = (member: CometChat.GroupMember) => {
      CometChat.unbanGroupMember(props.group!.getGuid(), member.getUid())
        .then(() => {
          updateMember(member);
        })
        .catch((error: any) => {
          if (props.onError) {
            props.onError(error);
          }
        });
    };

    const updateMember = (member: CometChat.GroupMember) => {
      let memberlist: CometChat.GroupMember[] = [...BannedMembers.value];
      //search for user
      let userKey = memberlist.findIndex(
        (u: CometChat.GroupMember, k) => u.getUid() == member.getUid()
      );
      //if found in the list, update user object
      if (userKey > -1) {
        memberlist.splice(userKey, 1);
        BannedMembers.value = [...memberlist];
      } else {
        memberlist.push(member);
        BannedMembers.value = [...memberlist];
      }
    };

    function attachListeners() {
      //Attaching User Listeners to dynamilcally update when a user comes online and goes offline
      CometChat.addUserListener(
        userListenerId.value,
        new CometChat.UserListener({
          onUserOnline: (onlineUser: CometChat.User) => {
            /* when someuser/friend comes online, user will be received here */
            updateMemberStatus(onlineUser);
          },
          onUserOffline: (offlineUser: CometChat.User) => {
            /* when someuser/friend went offline, user will be received here */
            updateMemberStatus(offlineUser);
          },
        })
      );

      const updateMemberStatus = (member: CometChat.User) => {
        let memberlist = [...BannedMembers.value];
        //search for user
        let userKey = memberlist.findIndex(
          (u: CometChat.GroupMember, k) => u.getUid() == member.getUid()
        );
        //if found in the list, update user object
        if (userKey > -1) {
          let user: CometChat.GroupMember = memberlist[userKey];
          user.setStatus(member.getStatus());
          memberlist.splice(userKey, 1, user);
          BannedMembers.value = [...memberlist];
        }
      };
      //Attaching User Listeners to dynamilcally update when a user comes online and goes offline
      CometChat.addGroupListener(
        groupListenerId.value,
        new CometChat.GroupListener({
          onGroupMemberBanned: (
            message: CometChat.Action,
            bannedUser: CometChat.User,
            bannedBy: CometChat.User,
            bannedFrom: CometChat.Group
          ) => {
            if (props.group.getGuid() !== bannedFrom.getGuid()) {
              return;
            }
            updateMember(bannedUser as CometChat.GroupMember);
          },
          onGroupMemberUnbanned: (
            message: CometChat.Action,
            unbannedUser: CometChat.User,
            unbannedBy: CometChat.User,
            unbannedFrom: CometChat.Group
          ) => {
            if (props.group.getGuid() !== unbannedFrom.getGuid()) {
              return;
            }
            updateMember(unbannedUser as CometChat.GroupMember);
          },
        })
      );
    }

    function removeListener() {
      CometChat.removeUserListener(userListenerId.value);
      CometChat.removeGroupListener(groupListenerId.value);
      membersListenerId.value = "";
    }
    function createStaleFetchAutoRejector() {
      let abortController: AbortController | null = null;

      const eventName = "abort";
      return function <T extends { fetchNext: () => Promise<any> }>(
        arg: T
      ): Promise<Awaited<ReturnType<T["fetchNext"]>>> {
        return new Promise<Awaited<ReturnType<T["fetchNext"]>>>(
          (resolve, reject) => {
            abortController?.abort();
            abortController = new AbortController();

            const curAbortController = abortController;
            let wasAbortListenerRemoved = false;
            const handleAbortEvent = function fn(abortEvent: Event) {
              curAbortController.signal.removeEventListener(eventName, fn);
              wasAbortListenerRemoved = true;
              reject(abortEvent);
            };
            curAbortController.signal.addEventListener(
              eventName,
              handleAbortEvent
            );
            arg
              .fetchNext()
              .finally(() => {
                if (!wasAbortListenerRemoved) {
                  curAbortController.signal.removeEventListener(
                    eventName,
                    handleAbortEvent
                  );
                }
              })
              .then((data) => {
                resolve(data);
              })
              .catch(reject);
          }
        );
      };
    }

    const staleFetchAutoRejector = createStaleFetchAutoRejector();
    const fetchNextBannedMembers = async () => {
      if (bannedMembersRequest.value) {
        state.value = States.loading;

        try {
          const fetchedBannedMembers = await staleFetchAutoRejector(
            bannedMembersRequest.value
          );
          if (
            fetchedBannedMembers.length === 0 &&
            BannedMembers.value.length === 0
          ) {
            state.value = States.empty;
          } else {
            BannedMembers.value = [
              ...fetchedBannedMembers,
              ...BannedMembers.value,
            ];
            state.value = States.loaded;
          }
        } catch (error: any) {
          if (props.onError) {
            props.onError(error);
          }
          state.value = States.error;
        }
      } else {
        state.value = States.loaded;
      }
    };
    // let controller: AbortController | null = null;
    // const fetchNextBannedMembers = () => {
    //   // onScrolledToBottom = null;

    //   if (controller) {
    //     controller.abort();
    //   }

    //   if (bannedMembersRequest.value) {
    //     // onScrolledToBottom = fetchNextBannedMembers;
    //     state.value = States.loading;
    //     controller = new AbortController();
    //     try {
    //       bannedMembersRequest.value
    //         .fetchNext({ signal: controller.signal })
    //         .then((bannedMembers: CometChat.GroupMember[]) => {
    //           state.value = States.loading;
    //           if (
    //             bannedMembers.length <= 0 &&
    //             BannedMembers.value?.length <= 0
    //           ) {
    //             state.value = States.empty;
    //           } else {
    //             state.value = States.loaded;
    //             BannedMembers.value = [
    //               ...BannedMembers.value,
    //               ...bannedMembers,
    //             ];
    //           }
    //         })
    //         .catch((error: Error) => {
    //           if (props.onError) {
    //             props.onError(error);
    //           }
    //         });
    //     } catch (error: any) {
    //       if (error.name === "AbortError") {
    //         console.log("Request was aborted");
    //       } else {
    //         if (props.onError) {
    //           props.onError(error);
    //         }
    //         state.value = States.error;
    //       }
    //     }
    //   } else {
    //     state.value = States.loaded;
    //   }
    // };
    // let onScrolledToBottom: any = fetchNextBannedMembers;
    const getRequestBuilder = computed((): CometChat.BannedMembersRequest => {
      if (searchKeyword.value.length == 0) {
        if (props.bannedMembersRequestBuilder) {
          return props.bannedMembersRequestBuilder.build();
        }
      } else if (searchKeyword.value.length > 0) {
        if (props.searchRequestBuilder) {
          return props.searchRequestBuilder
            .setSearchKeyword(searchKeyword.value)
            .build();
        } else if (props.bannedMembersRequestBuilder) {
          return props.bannedMembersRequestBuilder
            .setSearchKeyword(searchKeyword.value)
            .build();
        } else {
          return new CometChat.BannedMembersRequestBuilder(
            props.group!.getGuid()
          )
            .setSearchKeyword(searchKeyword.value)
            .setLimit(limit.value)
            .build();
        }
      }
      return new CometChat.BannedMembersRequestBuilder(props.group!.getGuid())
        .setLimit(limit.value)
        .build();
    });

    function subscribeToEvents() {
      ccGroupMemberBanned.value =
        CometChatGroupEvents.ccGroupMemberBanned.subscribe((item: any) => {
          if (item?.bannedFrom.getGuid() == props.group!.getGuid()) {
            updateMember(item?.bannedUser as CometChat.GroupMember);
          }
        });
      ccGroupMemberUnbanned.value =
        CometChatGroupEvents.ccGroupMemberUnbanned.subscribe((item: any) => {
          if (item?.kickedFrom.getGuid() == props.group!.getGuid()) {
            updateMember(item?.kickedUser as CometChat.GroupMember);
          }
        });
    }
    // unsubscribe to subscribed events.
    function unsubscribeToEvents() {
      ccGroupMemberUnbanned.value?.unsubscribe();
      ccGroupMemberBanned.value?.unsubscribe();
    }
    // onBeforeUpdate(() => {
    //   if (props.group) {
    //     bannedMembersRequest.value = getRequestBuilder.value;
    //   }
    // });

    onBeforeUnmount(() => {
      try {
        removeListener();
        unsubscribeToEvents();
      } catch (error: any) {
        if (props.onError) {
          props.onError(error);
        }
      }
    });

    onMounted(async () => {
      // onScrolledToBottom = fetchNextBannedMembers;
      attachListeners();
      subscribeToEvents();
      setThemeStyle();
      bannedMembersRequest.value = getRequestBuilder.value;

      fetchNextBannedMembers();

      // CometChat.getLoggedinUser()
      //   .then((user: CometChat.User | null) => {
      //     loggedInUser.value = user;

      //     setTimeout(fetchNextBannedMembers, 2000);
      //   })
      //   .catch((error) => {
      //     if (props.onError) {
      //       props.onError(error);
      //     }
      //   });
    });

    const onSearch = (key: string) => {
      searchKeyword.value = key;
      bannedMembersRequest.value = getRequestBuilder.value;
      BannedMembers.value = [];
      state.value = States.loading;
      fetchNextBannedMembers();
    };

    //style

    function setThemeStyle() {
      setBanMembersStyle();
      setListItemStyle();
      setAvatarStyle();
      setStatusStyle();
      menuListStyle.value = new MenuListStyle({
        border: "none",
        borderRadius: "8px",
        background: "transparent",
        submenuWidth: "100%",
        submenuHeight: "100%",
        submenuBorder: `1px solid ${theme.value.palette.getAccent200()}`,
        submenuBorderRadius: "8px",
      });
    }

    function setBanMembersStyle() {
      let defaultStyle: BannedMembersStyle = new BannedMembersStyle({
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
        padding: "0",
        unbanIconTint: theme.value.palette.getPrimary(),
      });
      mybannedMembersStyle.value = {
        ...defaultStyle,
        ...mybannedMembersStyle.value,
      };

      listStyle.value = {
        height: "100%",
        titleTextFont:
          mybannedMembersStyle.value.titleTextFont ||
          fontHelper(theme.value.typography.title1),
        titleTextColor:
          mybannedMembersStyle.value.titleTextColor ||
          theme.value.palette.getAccent(),
        emptyStateTextFont: mybannedMembersStyle.value.emptyStateTextFont,
        emptyStateTextColor: mybannedMembersStyle.value.emptyStateTextColor,
        errorStateTextFont: mybannedMembersStyle.value.errorStateTextFont,
        errorStateTextColor: mybannedMembersStyle.value.errorStateTextColor,
        loadingIconTint: mybannedMembersStyle.value.loadingIconTint,
        separatorColor: mybannedMembersStyle.value.separatorColor,
        searchIconTint: mybannedMembersStyle.value.searchIconTint,
        searchBorder: mybannedMembersStyle.value.searchBorder,
        searchBorderRadius: mybannedMembersStyle.value.searchBorderRadius,
        searchBackground: mybannedMembersStyle.value.searchBackground,
        searchPlaceholderTextFont:
          mybannedMembersStyle.value.searchPlaceholderTextFont,
        searchPlaceholderTextColor:
          mybannedMembersStyle.value.searchPlaceholderTextColor,
        searchTextFont: mybannedMembersStyle.value.searchTextFont,
        searchTextColor: mybannedMembersStyle.value.searchTextColor,
        background: mybannedMembersStyle.value.background,
      };
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

    const membersStyle = (): any => {
      return {
        height: mybannedMembersStyle.value.height || "100%",
        width: mybannedMembersStyle.value.width || "100%",
        background: mybannedMembersStyle.value.background,
        padding: mybannedMembersStyle.value.padding,
        border: mybannedMembersStyle.value.border,
        borderRadius: mybannedMembersStyle.value.borderRadius || "0",
        boxShadow: mybannedMembersStyle.value.boxShadow || "",

        display: "flex",
        position: "relative",
      };
    };

    const backButtonStyle = () => {
      return {
        height: "24px",
        width: "24px",
        border: "none",
        borderRadius: "0",
        background: "transparent",
        position: "relative",
        buttonIconTint:
          props.bannedMembersStyle.backButtonIconTint ||
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
        position: "relative",

        buttonIconTint:
          props.bannedMembersStyle.closeButtonIconTint ||
          theme.value.palette.getPrimary(),
      };
    };
    const wrapperStyle = () => {
      return {
        height: props.bannedMembersStyle.height || "100%",
        width: props.bannedMembersStyle.width || "100%",
        background:
          props.bannedMembersStyle.background ||
          theme.value.palette.getBackground(),
        border: props.bannedMembersStyle.border,
        borderRadius: props.bannedMembersStyle.borderRadius || "0",
        display: "flex",
        boxShadow: props.bannedMembersStyle?.boxShadow || "",
        position: "relative",
      };
    };

    return {
      BannedMembers,
      wrapperStyle,
      membersStyle,
      ConversationUtils,
      GroupMemberUtils,
      closeButtonStyle,
      closeClicked,
      backClicked,
      // changeScope,
      memberScope,

      SelectionMode,

      backButtonStyle,
      mylistItemStyle,
      myavatarStyle,
      menuListStyle,
      mystatusIndicatorStyle,
      getStatusIndicatorColor,
      unbanIconStyle,
      onSearch,
      // onScrolledToBottom,
      state,
      unBanMember,
      States,
      listStyle,
      searchKeyword,
      fetchNextBannedMembers,
    };
  },
});
</script>

<style scoped>
.cc-banned-members__back {
  position: absolute;
  left: 8px;
  padding: 12px 8px 8px 8px;
}

.cc-banned-members__close-button {
  position: absolute;
  right: 8px;
  padding: 12px 8px 8px 8px;
}

.cc-banned-members__tail-view {
  position: relative;
}
.cc-banned-members__menus {
  position: absolute;
  right: 12px;
  cursor: pointer;
}
.cc-banned-members__unban {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
