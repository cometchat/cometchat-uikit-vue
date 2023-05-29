<template>
  <div class="cc-users" :style="userStyle()">
    <!-- <div class="cc-users__menus" v-if="menus" v-html="menus"></div> -->
    <div class="cc-users__menus" v-if="menus">
      <component
        v-if="menus.componentName"
        :is="menus.componentName"
        v-on="menus?.listeners"
        v-bind="{ ...menus.props }"
      >
        <template v-for="(element, key) in menus.slots" v-slot:[key] :key="key">
          <div v-html="element"></div>
        </template>
      </component>
      <div v-else v-html="menus.html"></div>
    </div>
    <CometChatList
      :title="title"
      :titleAlignment="titleAlignment"
      :hideSearch="hideSearch"
      :searchIconURL="searchIconURL"
      :searchPlaceholderText="searchPlaceholderText"
      :searchText="searchKeyword"
      :onSearch="onSearch"
      :list="Users"
      :onScrolledToBottom="fetchNextUsersList"
      :showSectionHeader="showSectionHeader"
      :sectionHeaderKey="sectionHeaderKey"
      :state="state"
      :loadingIconURL="loadingIconURL"
      :hideError="hideError"
      :listStyle="listStyle"
      :scrollToBottom="false"
      :onError="onError"
      :errorStateText="errorStateText"
      :emptyStateText="emptyStateText"
      :errorStateView="errorStateView"
      :emptyStateView="emptyStateView"
      listItemKey="getUid"
      :loadingStateView="loadingStateView"
    >
      <template v-slot:listItem="{ item }">
        <div v-if="listItemView">
          <div
            v-if="listItemView(item)?.html"
            v-html="listItemView(item)?.html"
          ></div>
          <component
            v-else
            :is="listItemView(item)?.componentName"
            v-on="item?.listeners"
            v-bind="{ ...listItemView(item)?.props }"
          >
            <template
              v-for="(html, key) in listItemView(item)?.slots"
              v-slot:[key]
              :key="key"
            >
              <div v-html="html"></div>
            </template>
          </component>
        </div>

        <cometchat-list-item
          v-else
          :title="item?.name"
          :avatarStyle="myavatarStyle"
          :avatarURL="item?.avatar"
          :avatarName="item?.name"
          :isActive="getActiveUser(item)"
          :statusIndicatorStyle="myStatusIndicatorStyle"
          :hideSeparator="hideSeparator"
          @cc-listitem-clicked="onClick(item)"
          :statusIndicatorColor="getStatusIndicatorColor(item)"
          :listItemStyle="myListItemStyle"
        >
          <div
            slot="subtitleView"
            class="cc-users__subtitle-view"
            :style="subtitleStyle()"
          >
            <template v-if="subtitleView">
              <div
                v-if="subtitleView(item)?.html"
                v-html="subtitleView(item)?.html"
              ></div>
              <component
                v-else
                :is="subtitleView(item)?.componentName"
                v-on="item?.listeners"
                v-bind="{ ...subtitleView(item)?.props }"
              >
                <template
                  v-for="(element, key) in subtitleView(item)?.slots"
                  v-slot:[key]
                  :key="key"
                >
                  <div v-html="element"></div>
                </template>
              </component>
            </template>
          </div>
          <div v-if="options" slot="menuView" class="cc-users__menu-view">
            <cometchat-menu-list :data="options?.(item)" />
          </div>

          <div
            slot="tailView"
            v-if="selectionMode == SelectionMode.single"
            class="cc-users__selection-single"
          >
            <cometchat-radio-button
              @cc-radio-button-checked="addMembersToList(item)"
            ></cometchat-radio-button>
          </div>
          <div
            v-if="selectionMode == SelectionMode.multiple"
            slot="tailView"
            class="cc-users__selection-multiple"
          >
            <cometchat-checkbox
              @cc-checkbox-changed="onSelect ? onSelect(item) : null"
              :checked="isUserSelected(item)"
            ></cometchat-checkbox>
          </div>
        </cometchat-list-item>
      </template>
    </CometChatList>
  </div>
</template>

<script lang="ts">
import { CometChat } from "@cometchat-pro/chat";
import CometChatList from "../CometChatList/index.vue";
import { Subscription } from "rxjs";

import { BaseStyle, ListStyle, UsersStyle } from "uikit-utils-lerna";
import { SearchIcon, LoadingIcon, WarningIcon } from "../../assets";
import { AvatarStyle, ListItemStyle } from "my-cstom-package-lit";

import { CometChatTheme } from "uikit-resources-lerna";

import {
  CometChatOption,
  SelectionMode,
  localize,
  TitleAlignment,
  States,
  CometChatUserEvents,
  CometChatUIKitConstants,
  fontHelper,
} from "uikit-resources-lerna";

import {
  defineComponent,
  ref,
  computed,
  Ref,
  onMounted,
  onBeforeUnmount,
  PropType,
  nextTick,
  inject,
} from "vue";

export default defineComponent({
  components: {
    CometChatList,
  },
  props: {
    title: {
      type: String,
      default: () => localize("USERS"),
    },
    titleAlignment: {
      type: Number as PropType<TitleAlignment>,
      default: TitleAlignment.left,
    },
    searchPlaceholderText: {
      type: String,
      default: () => localize("SEARCH"),
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
    options: {
      type: Function as PropType<(user: CometChat.User) => CometChatOption[]>,
    },

    usersRequestBuilder: {
      type: CometChat.UsersRequestBuilder,
    },
    SearchRequestBuilder: {
      type: CometChat.UsersRequestBuilder,
    },
    disableUsersPresence: {
      type: Boolean,
      default: false,
    },

    hideSeparator: {
      type: Boolean,
      default: false,
    },

    selectionMode: {
      type: Number as PropType<SelectionMode>,
      default: SelectionMode.none,
    },
    onSelect: {
      type: Function as PropType<(user: CometChat.User) => void>,
    },
    searchIconURL: {
      type: String,
      default: SearchIcon,
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
      default: true,
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

    sectionHeaderKey: {
      type: String,
      default: "getName",
    },
    activeUser: {
      type: CometChat.User,
    },
    onItemClick: {
      type: Function as PropType<(user: CometChat.User) => void>,
    },

    onError: {
      type: Function as PropType<(error: CometChat.CometChatException) => void>,
    },

    avatarStyle: {
      type: AvatarStyle,
      default: {},
    },
    statusIndicatorStyle: {
      type: null,
      default: {},
    },
    listItemStyle: {
      type: ListItemStyle,
      default: {},
    },
    usersStyle: {
      type: UsersStyle,
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
    const Users: Ref<CometChat.User[]> = ref([]);
    let { theme, switchThemeMode }: any = inject(
      "theme",
      new CometChatTheme({})
    )!;

    //................
    const state = ref<States>(States.loading);
    const usersRequest = ref<any>(null);

    const searchKeyword = ref("");
    const userChecked = ref<string>("");

    const limit = ref<number>(30);
    const userListenerId = ref<string>("userlist_" + new Date().getTime());
    let loggedInUser: CometChat.User | null = null;
    const ccUserBlocked = ref<Subscription>();
    const ccUserUnBlocked = ref<Subscription>();

    let myavatarStyle = ref(props.avatarStyle);
    let myStatusIndicatorStyle = ref(props.statusIndicatorStyle);
    let listStyle = ref<ListStyle>({});
    let myListItemStyle = ref(props.listItemStyle);
    let myUsersStyle: any = ref(props.usersStyle);

    //..
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
    const fetchNextUsersList = async () => {
      if (usersRequest.value) {
        state.value = States.loading;

        try {
          const fetchedUsers = await staleFetchAutoRejector(usersRequest.value);
          if (fetchedUsers.length === 0 && Users.value.length === 0) {
            state.value = States.empty;
          } else {
            Users.value = [...fetchedUsers, ...Users.value];
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
    // const fetchNextUsersList = async () => {
    //   if (controller) {
    //     controller.abort();
    //   }
    //   // onScrolledToBottom = null;
    //   if (usersRequest.value) {
    //     console.log("in fetch..user", Users.value.length, usersRequest.value);
    //     // onScrolledToBottom = fetchNextUsersList;
    //     state.value = States.loading;

    //     // Create a new AbortController and store it
    //     controller = new AbortController();

    //     try {
    //       await usersRequest.value
    //         .fetchNext()
    //         .then((userList: CometChat.User[]) => {
    //           if (userList.length === 0 && Users.value.length === 0) {
    //             state.value = States.empty;
    //           } else {
    //             state.value = States.loaded;

    //             Users.value = [...Users.value, ...userList];
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
    // let onScrolledToBottom: any = fetchNextUsersList;

    const subscribeToEvents = () => {
      ccUserBlocked.value = CometChatUserEvents.ccUserBlocked.subscribe(
        (user: CometChat.User) => {
          if (props.activeUser && user.getUid() == props.activeUser.getUid()) {
            updateUser(user);
          }
        }
      );
      ccUserUnBlocked.value = CometChatUserEvents.ccUserUnblocked.subscribe(
        (user) => {
          if (props.activeUser && user.getUid() == props.activeUser.getUid()) {
            updateUser(user);
          }
        }
      );
    };

    function attachListeners() {
      //Attaching User Listeners to dynamilcally update when a user comes online and goes offline
      CometChat.addUserListener(
        userListenerId.value,
        new CometChat.UserListener({
          onUserOnline: (onlineUser: CometChat.User) => {
            /* when someuser/friend comes online, user will be received here */

            updateUser(onlineUser);
          },
          onUserOffline: (offlineUser: CometChat.User) => {
            /* when someuser/friend went offline, user will be received here */

            updateUser(offlineUser);
          },
        })
      );
    }

    const getUserRequest = computed((): CometChat.UsersRequest => {
      if (searchKeyword.value.length == 0) {
        if (props.usersRequestBuilder) {
          return props.usersRequestBuilder.build();
        }
      } else if (searchKeyword.value.length > 0) {
        if (props.SearchRequestBuilder) {
          return props.SearchRequestBuilder.setSearchKeyword(
            searchKeyword.value
          ).build();
        } else if (props.usersRequestBuilder) {
          return props.usersRequestBuilder
            .setSearchKeyword(searchKeyword.value)
            .build();
        } else {
          return new CometChat.UsersRequestBuilder()
            .setSearchKeyword(searchKeyword.value)
            .setLimit(limit.value)
            .build();
        }
      }
      return new CometChat.UsersRequestBuilder().setLimit(limit.value).build();
    });

    const onSearch = (text: string) => {
      searchKeyword.value = text;
      // console.log(" Users.value.value", Users.value.length);
      //
      // console.log(" Users.value.value", Users.value.length);

      Users.value = [];
      usersRequest.value = getUserRequest.value;

      fetchNextUsersList();
    };

    const updateUser = (user: CometChat.User) => {
      let userlist = [...Users.value];

      //search for user
      let userKey = userlist.findIndex(
        (u: CometChat.User, k) => u.getUid() == user.getUid()
      );
      //if found in the list, update user object
      if (userKey > -1) {
        userlist.splice(userKey, 1, user);
        Users.value = [...userlist];
      }
    };

    function removeListener() {
      CometChat.removeUserListener(userListenerId.value);
      userListenerId.value = "";
    }
    function unsubscribeToEvents() {
      ccUserBlocked.value?.unsubscribe();
      ccUserUnBlocked.value?.unsubscribe();
    }

    onMounted(() => {
      // onScrolledToBottom = fetchNextUsersList;

      setThemeStyle();
      subscribeToEvents();
      // CometChat.getLoggedinUser().catch((error) => {
      //   if (props.onError) {
      //     props.onError(error);
      //   }
      // });
      state.value = States.loaded;
      usersRequest.value = getUserRequest.value;
      fetchNextUsersList();
      attachListeners();
    });

    onBeforeUnmount(() => {
      usersRequest.value = null;
      removeListener();
      state.value = States.loaded;
      unsubscribeToEvents();
    });

    const getActiveUser = (user: CometChat.User) => {
      if (props.selectionMode == SelectionMode.none || !props.selectionMode) {
        if (user.getUid() == props.activeUser?.getUid()) {
          return true;
        }
      }
      return false;
    };

    const onClick = (user: CometChat.User) => {
      if (props.onItemClick) {
        props.onItemClick(user);
      }
    };

    const getStatusIndicatorColor = (user: CometChat.User) => {
      if (!props.disableUsersPresence) {
        if (
          user?.getStatus() == CometChatUIKitConstants.userStatusType.online
        ) {
          return (
            props.usersStyle.onlineStatusColor ||
            theme.value.palette.getSuccess() ||
            null
          );
        } else {
          return null;
          //|| theme.value.palette.getAccent800();
        }
      }
      return null;
    };

    function isUserSelected(user: CometChat.User) {
      return user.getUid() === userChecked.value;
    }

    function addMembersToList(user: CometChat.User) {
      userChecked.value = user.getUid();
      if (props.onSelect) {
        props.onSelect(user);
      }
    }

    //style............................................
    function setThemeStyle() {
      setUsersStyle();
      setListItemStyle();
      setAvatarStyle();
      setStatusStyle();
    }
    function setListItemStyle() {
      let defaultStyle: ListItemStyle = new ListItemStyle({
        height: "45px",
        width: "100%",
        background: theme.value.palette.getBackground(),
        activeBackground: theme.value.palette.getAccent100(),
        borderRadius: "0",
        titleFont: fontHelper(theme.value.typography.title2),
        titleColor: theme.value.palette.getAccent(),
        border: "none",
        separatorColor: theme.value.palette.getAccent200(),
        hoverBackground: theme.value.palette.getAccent50(),
      });
      myListItemStyle.value = { ...defaultStyle, ...myListItemStyle.value };
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
      myStatusIndicatorStyle.value = {
        ...defaultStyle,
        ...myStatusIndicatorStyle.value,
      };
    }
    function setUsersStyle() {
      let defaultStyle: UsersStyle = new UsersStyle({
        background: theme.value.palette.getBackground(),
        border: `1px solid ${theme.value.palette.getAccent50()}`,
        titleTextFont: fontHelper(theme.value.typography.title1),
        titleTextColor: theme.value.palette.getAccent(),
        emptyStateTextFont: fontHelper(theme.value.typography.title1),
        emptyStateTextColor: theme.value.palette.getAccent600(),
        errorStateTextFont: fontHelper(theme.value.typography.title1),
        errorStateTextColor: theme.value.palette.getAccent600(),
        loadingIconTint: theme.value.palette.getAccent600(),
        separatorColor: theme.value.palette.getAccent400(),
        onlineStatusColor: theme.value.palette.getSuccess(),
        sectionHeaderTextColor: theme.value.palette.getAccent600(),
        sectionHeaderTextFont: fontHelper(theme.value.typography.subtitle2),
        searchIconTint: theme.value.palette.getAccent600(),
        searchPlaceholderTextColor: theme.value.palette.getAccent600(),
        searchBackground: theme.value.palette.getAccent100(),
        searchPlaceholderTextFont: fontHelper(theme.value.typography.text3),
        searchTextColor: theme.value.palette.getAccent600(),
        searchTextFont: fontHelper(theme.value.typography.text3),
      });
      myUsersStyle.value = { ...defaultStyle, ...myUsersStyle.value };

      listStyle.value = {
        height: "100%",
        titleTextFont: myUsersStyle.value.titleTextFont,
        titleTextColor: myUsersStyle.value.titleTextColor,
        emptyStateTextFont: myUsersStyle.value.emptyStateTextFont,
        emptyStateTextColor: myUsersStyle.value.emptyStateTextColor,
        errorStateTextFont: myUsersStyle.value.errorStateTextFont,
        errorStateTextColor: myUsersStyle.value.errorStateTextColor,
        loadingIconTint: myUsersStyle.value.loadingIconTint,
        separatorColor: myUsersStyle.value.separatorColor,
        searchIconTint: myUsersStyle.value.searchIconTint,
        searchBorder: myUsersStyle.value.searchBorder,
        searchBorderRadius: myUsersStyle.value.searchBorderRadius,
        searchBackground: myUsersStyle.value.searchBackground,
        searchPlaceholderTextFont: myUsersStyle.value.searchPlaceholderTextFont,
        searchPlaceholderTextColor:
          myUsersStyle.value.searchPlaceholderTextColor,
        searchTextFont: myUsersStyle.value.searchTextFont,
        searchTextColor: myUsersStyle.value.searchTextColor,
        sectionHeaderTextColor: myUsersStyle.value.sectionHeaderTextColor,
        sectionHeaderTextFont: myUsersStyle.value.sectionHeaderTextFont,
        background: myUsersStyle.value.background,
      };
    }
    const userStyle = (): any => {
      return {
        height: myUsersStyle.value.height || "100%",
        width: myUsersStyle.value.width || "100%",
        background: myUsersStyle.value.background,
        border: myUsersStyle.value.border,
        borderRadius: myUsersStyle.value.borderRadius || "0",
        position: "relative",
      };
    };
    const subtitleStyle = () => {
      return {
        font: props.usersStyle.titleTextFont || "12px",
        color: props.usersStyle.titleTextColor || "rgba(20, 20, 20, 0.4)",
      };
    };
    return {
      Users,
      States,

      onSearch,
      searchKeyword,
      getActiveUser,
      onClick,
      getStatusIndicatorColor,
      setThemeStyle,
      userStyle,
      myavatarStyle,
      myStatusIndicatorStyle,
      myListItemStyle,
      myUsersStyle,
      fetchNextUsersList,
      addMembersToList,
      isUserSelected,

      // onScrolledToBottom,
      SelectionMode,
      state,
      listStyle,
      SearchIcon,
      LoadingIcon,
      WarningIcon,
      subtitleStyle,
    };
  },
});
</script>

<style scoped>
.cc-users__menus {
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
}
</style>
