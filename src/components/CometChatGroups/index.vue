<template>
  <div class="cc-groups" :style="groupStyle()">
    <div class="cc-groups__menus" v-if="menus">
      <div v-if="menus.html" v-html="menus.html"></div>
      <component
        v-else
        :is="menus.componentName!"
        v-on="menus?.listeners"
        v-bind="{ ...menus.props }"
      >
        <template v-for="(element, key) in menus?.slots" :key="key">
          <div :v-slot="[key]" :v-html="element"></div>
        </template>
      </component>
    </div>
    <CometChatList
      :title="title"
      :titleAlignment="titleAlignment"
      :hideSearch="hideSearch"
      :searchIconURL="searchIconURL"
      :searchPlaceholderText="searchPlaceholderText"
      :searchText="searchKeyword"
      :onSearch="onSearch"
      :list="Groups"
      :onScrolledToBottom="fetchNextGroupsList"
      :state="state"
      :loadingIconURL="loadingIconURL"
      :hideError="hideError"
      :errorStateText="errorStateText"
      :emptyStateText="emptyStateText"
      :errorStateView="errorStateView"
      :emptyStateView="emptyStateView"
      :loadingStateView="loadingStateView"
      :scrollToBottom="false"
      :listStyle="listStyle"
      listItemKey="getGuid"
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
            v-on="item?.listeners"
            v-bind="{ ...listItemView(item)?.props }"
          >
            <template
              v-for="(html, key) in listItemView(item)?.slots"
              :key="key"
            >
              <div :v-slot="[key]" :v-html="html"></div>
            </template>
          </component>
        </div>

        <cometchat-list-item
          v-else
          :title="item?.name"
          :avatarURL="item?.icon"
          :avatarName="item?.name"
          :hideSeparator="hideSeparator"
          :avatarStyle="myavatarStyle"
          :statusIndicatorStyle="myStatusIndicatorStyle"
          @cc-listitem-clicked="onClick(item)"
          :listItemStyle="myListItemStyle"
          :statusIndicatorColor="getStatusIndicatorColor(item)"
          :statusIndicatorIcon="getGroupIcon(item)"
          :isActive="getActiveGroup(item)"
        >
          <div slot="subtitleView" class="cc-groups__subtitle-view">
            <div v-if="subtitleView" :style="subtitleStyle()">
              <div
                v-if="subtitleView(item)?.html"
                v-html="subtitleView(item)?.html"
              ></div>
              <component
                v-else
                :is="subtitleView(item)?.componentName!"
                v-on="item?.listeners"
                v-bind="{ ...subtitleView(item)?.props }"
              >
                <template
                  v-for="(element, key) in subtitleView(item)?.slots"
                  :key="key"
                >
                  <div :v-slot="[key]" :v-html="element"></div>
                </template>
              </component>
            </div>
            <div
              v-else
              class="cc-groups__subtitle-view"
              :style="subtitleStyle()"
            >
              {{ getMemberCount(item) }}
            </div>
          </div>
          <div v-if="options" slot="menuView" class="cc-groups__options-view">
            <cometchat-menu-list :data="options?.(item)" />
          </div>

          <div
            slot="tailView"
            v-if="selectionMode == SelectionMode.single"
            class="cc-groups__selection-single"
          >
            <cometchat-radio-button
              @cc-checkbox-changed="onSelect ? onSelect(item) : null"
            ></cometchat-radio-button>
          </div>
          <div
            v-if="selectionMode == SelectionMode.multiple"
            slot="tailView"
            class="cc-groups__selection-multiple"
          >
            <cometchat-checkbox
              @cc-checkbox-changed="onSelect ? onSelect(item) : null"
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

import {
  BaseStyle,
  CometChatUIKitUtility,
  GroupsStyle,
  ListStyle,
} from "uikit-utils-lerna";
import {
  LoadingIcon,
  PasswordGroupIcon,
  PrivateGroupIcon,
  SearchIcon,
} from "../../assets";
import { AvatarStyle, ListItemStyle } from "my-cstom-package-lit";
import {
  CometChatTheme,
  localize,
  TitleAlignment,
  States,
  SelectionMode,
  fontHelper,
  CometChatUIKitConstants,
  CometChatOption,
  CometChatGroupEvents,
  IGroupMemberAdded,
  IGroupMemberKickedBanned,
  IGroupMemberJoined,
  IOwnershipChanged,
  IGroupLeft,
} from "uikit-resources-lerna";

import {
  defineComponent,
  ref,
  computed,
  Ref,
  onMounted,
  onBeforeUnmount,
  PropType,
  inject,
  nextTick,
} from "vue";

export default defineComponent({
  components: {
    CometChatList,
  },
  props: {
    title: {
      type: String,
      default: () => localize("GROUPS"),
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
      type: Function as PropType<(group: CometChat.Group) => ViewType>,
    },

    menus: {
      type: Object as PropType<ViewType>,
    },
    listItemView: {
      type: Function as PropType<(group: CometChat.Group) => ViewType>,
    },
    options: {
      type: Function as PropType<(group: CometChat.Group) => CometChatOption[]>,
    },
    groupsRequestBuilder: {
      type: CometChat.GroupsRequestBuilder,
    },
    SearchRequestBuilder: {
      type: CometChat.GroupsRequestBuilder,
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
      type: Function as PropType<(group: CometChat.Group) => void>,
    },
    searchIconURL: {
      type: String,
      default: SearchIcon,
    },
    protectedGroupIcon: {
      type: String,
      default: PasswordGroupIcon,
    },
    privateGroupIcon: {
      type: String,
      default: PrivateGroupIcon,
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
      default: () => localize("NO_GROUPS_FOUND"),
    },

    activeGroup: {
      type: CometChat.Group,
    },
    onItemClick: {
      type: Function as PropType<(group: CometChat.Group) => void>,
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
    groupsStyle: {
      type: GroupsStyle,
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

    const Groups: Ref<CometChat.Group[]> = ref([]);
    const limit = ref<number>(30);

    const groupRequest = ref<any>(null);
    const state = ref<States>(States.loading);
    const searchKeyword = ref("");
    let loggedInUser: CometChat.User | null = null;
    let myavatarStyle = ref(props.avatarStyle);
    let myStatusIndicatorStyle = ref(props.statusIndicatorStyle);
    let listStyle = ref<ListStyle>({});
    let myListItemStyle = ref(props.listItemStyle);
    let myGroupsStyle: any = ref(props.groupsStyle);
    const timeout = ref<any>(null);
    const groupsListenerId = ref<string>("userlist_" + new Date().getTime());

    const ccGroupMemberAdded = ref<Subscription>();
    const ccGroupLeft = ref<Subscription>();
    const ccGroupMemberJoined = ref<Subscription>();
    const ccGroupMemberKicked = ref<Subscription>();
    const ccGroupMemberBanned = ref<Subscription>();
    const ccOwnershipChanged = ref<Subscription>();
    const ccGroupDeleted = ref<Subscription>();
    let ccGroupCreated: any;
    let myactiveGroup = ref<any>(props.activeGroup);
    const statusColor = ref({
      private: "",
      password: "#F7A500",
      public: "",
    });

    function subscribeToEvents() {
      ccGroupDeleted.value = CometChatGroupEvents.ccGroupDeleted.subscribe(
        (group: CometChat.Group) => {
          removeGroup(group);

          if (
            myactiveGroup.value &&
            group.getGuid() == myactiveGroup.value.getGuid()
          ) {
            myactiveGroup.value = null;
          }
        }
      );
      ccGroupCreated = CometChatGroupEvents.ccGroupCreated.subscribe(
        (group: CometChat.Group) => {
          addGroup(group);
          if (!myactiveGroup.value) {
            myactiveGroup.value = group;
            myactiveGroup.value = CometChatUIKitUtility.clone(
              group
            ) as CometChat.Group;
          }
        }
      );
      ccGroupMemberAdded.value =
        CometChatGroupEvents.ccGroupMemberAdded.subscribe(
          (item: IGroupMemberAdded) => {
            if (
              myactiveGroup.value &&
              myactiveGroup.value.getGuid() == item?.userAddedIn!.getGuid()
            ) {
              myactiveGroup.value = CometChatUIKitUtility.clone(
                item?.userAddedIn
              ) as CometChat.Group;
            }
            updateGroup(item?.userAddedIn);
          }
        );
      ccGroupMemberBanned.value =
        CometChatGroupEvents.ccGroupMemberBanned.subscribe(
          (item: IGroupMemberKickedBanned) => {
            if (
              myactiveGroup.value &&
              myactiveGroup.value.getGuid() == item?.kickedFrom!.getGuid()
            ) {
              myactiveGroup.value = CometChatUIKitUtility.clone(
                item?.kickedFrom
              ) as CometChat.Group;
            }

            updateGroup(item?.kickedFrom);
          }
        );
      ccGroupMemberJoined.value =
        CometChatGroupEvents.ccGroupMemberJoined.subscribe(
          (item: IGroupMemberJoined) => {
            if (
              myactiveGroup.value &&
              myactiveGroup.value.getGuid() == item?.joinedGroup!.getGuid()
            ) {
              myactiveGroup.value = CometChatUIKitUtility.clone(
                item?.joinedGroup
              ) as CometChat.Group;
            }

            updateGroup(item?.joinedGroup);
          }
        );
      ccGroupMemberKicked.value =
        CometChatGroupEvents.ccGroupMemberKicked.subscribe(
          (item: IGroupMemberKickedBanned) => {
            if (
              myactiveGroup.value &&
              myactiveGroup.value.getGuid() == item?.kickedFrom!.getGuid()
            ) {
              myactiveGroup.value = CometChatUIKitUtility.clone(
                item?.kickedFrom
              ) as CometChat.Group;
            }

            updateGroup(item?.kickedFrom);
          }
        );
      ccOwnershipChanged.value =
        CometChatGroupEvents.ccOwnershipChanged.subscribe(
          (item: IOwnershipChanged) => {
            if (
              myactiveGroup.value &&
              myactiveGroup.value.getGuid() == item?.group!.getGuid()
            ) {
              myactiveGroup.value = CometChatUIKitUtility.clone(
                item?.group
              ) as CometChat.Group;
            }

            updateGroup(item?.group);
          }
        );
      ccGroupLeft.value = CometChatGroupEvents.ccGroupLeft.subscribe(
        (item: IGroupLeft) => {
          if (
            item.leftGroup.getType() ==
            CometChatUIKitConstants.GroupTypes.private
          ) {
            removeGroup(item.leftGroup);
          } else {
            updateGroup(item.leftGroup);
          }
        }
      );
    }

    const getStatusIndicatorColor = (group: CometChat.Group) => {
      return (statusColor.value as any)[group?.getType() as string];
    };

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
    const fetchNextGroupsList = async () => {
      if (groupRequest.value) {
        state.value = States.loading;

        try {
          console.log("...try", groupRequest.value);
          const fetchedGroups = await staleFetchAutoRejector(
            groupRequest.value
          );
          if (fetchedGroups.length === 0 && Groups.value.length === 0) {
            state.value = States.empty;
          } else {
            Groups.value = [...fetchedGroups, ...Groups.value];
            state.value = States.loaded;
          }
        } catch (error: any) {
          // if (error instanceof Event) {
          //   // console.log("Request was aborted"); // Comment out this console.log after testing
          // } else {
          if (props.onError) {
            props.onError(error);
          }
          state.value = States.error;
          // }
        }
      } else {
        state.value = States.loaded;
      }
    };

    const getGroupRequest = computed((): CometChat.GroupsRequest => {
      console.log("in computed........................");
      if (searchKeyword.value.length == 0) {
        if (props.groupsRequestBuilder) {
          return props.groupsRequestBuilder.build();
        }
      } else if (searchKeyword.value.length > 0) {
        if (props.SearchRequestBuilder) {
          return props.SearchRequestBuilder.setSearchKeyword(
            searchKeyword.value
          ).build();
        } else if (props.groupsRequestBuilder) {
          return props.groupsRequestBuilder
            .setSearchKeyword(searchKeyword.value)
            .build();
        } else {
          return new CometChat.GroupsRequestBuilder()
            .setSearchKeyword(searchKeyword.value)
            .setLimit(limit.value)
            .build();
        }
      }
      return new CometChat.GroupsRequestBuilder().setLimit(limit.value).build();
    });

    const onSearch = (text: string) => {
      searchKeyword.value = text;
      console.log("calling?");
      // state.value = States.loading;

      Groups.value = [];
      groupRequest.value = getGroupRequest.value;

      fetchNextGroupsList();
    };

    const onClick = (group: CometChat.Group) => {
      if (props.onItemClick) {
        props.onItemClick(group);
      }
    };

    const getGroupIcon = (group: CometChat.Group) => {
      let status;

      switch (group.getType()) {
        case CometChatUIKitConstants.GroupTypes.password:
          status = props.protectedGroupIcon;
          break;
        case CometChatUIKitConstants.GroupTypes.private:
          status = props.privateGroupIcon;
          break;
        default:
          status = null;
          break;
      }

      return status;
    };

    const getActiveGroup = (group: CometChat.Group) => {
      if (props.selectionMode == SelectionMode.none || !props.selectionMode) {
        if (group.getGuid() == myactiveGroup.value?.getGuid()) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    };

    const updateGroup = (group: CometChat.Group | undefined) => {
      if (!group) return;
      let groupsList = [...Groups.value];
      //search for user
      let groupKey = groupsList.findIndex(
        (g: CometChat.Group, k) => g.getGuid() === group.getGuid()
      );
      //if found in the list, update Group object
      if (groupKey > -1) {
        groupsList.splice(groupKey, 1, group);
        Groups.value = [...groupsList];
      }
    };

    const getMemberCount = (group: CometChat.Group) => {
      return group.getMembersCount() > 1
        ? group.getMembersCount() + " " + localize("MEMBERS")
        : group.getMembersCount() + " " + localize("MEMBER");
    };

    function removeGroup(group: CometChat.Group) {
      let groupsList = [...Groups.value];
      let groupKey = groupsList.findIndex(
        (g, k) => g.getGuid() === group.getGuid()
      );
      if (groupKey > -1) {
        groupsList.splice(groupKey, 1);
        Groups.value = groupsList;
      }
    }
    function addGroup(group: CometChat.Group) {
      Groups.value.unshift(group);
    }

    function attachListeners() {
      CometChat.addGroupListener(
        groupsListenerId.value,
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
            updateGroup(changedGroup);
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

            updateGroup(kickedFrom);
          },
          onGroupMemberBanned: (
            message: CometChat.Action,
            bannedUser: CometChat.User,
            bannedBy: CometChat.User,
            bannedFrom: CometChat.Group
          ) => {
            //working tested

            if (bannedUser.getUid() == loggedInUser?.getUid()) {
              removeGroup(bannedFrom);
            } else {
              updateGroup(bannedFrom);
            }
          },
          onGroupMemberUnbanned: (
            message: CometChat.Action,
            unbannedUser: CometChat.User,
            unbannedBy: CometChat.User,
            unbannedFrom: CometChat.Group
          ) => {
            if (unbannedUser.getUid() == loggedInUser?.getUid()) {
              unbannedFrom.setHasJoined(false);
            }

            addGroup(unbannedFrom);
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
            updateGroup(userAddedIn);
          },
          onGroupMemberLeft: (
            message: CometChat.Action,
            leavingUser: CometChat.User,
            group: CometChat.Group
          ) => {
            if (leavingUser.getUid() == loggedInUser?.getUid()) {
              group.setHasJoined(false);
            }
            updateGroup(group);
          },
          onGroupMemberJoined: (
            message: CometChat.Action,
            joinedUser: CometChat.User,
            joinedGroup: CometChat.Group
          ) => {
            if (joinedUser.getUid() == loggedInUser?.getUid()) {
              joinedGroup.setHasJoined(true);
            }
            updateGroup(joinedGroup);
          },
        })
      );
    }
    function removeListener() {
      CometChat.removeUserListener(groupsListenerId.value);
    }
    function unsubscribeToEvents() {
      ccGroupMemberAdded.value?.unsubscribe();
      ccGroupMemberBanned.value?.unsubscribe();
      ccGroupMemberJoined.value?.unsubscribe();
      ccGroupMemberKicked.value?.unsubscribe();
      ccOwnershipChanged.value?.unsubscribe();
      ccGroupLeft.value?.unsubscribe();
    }

    onMounted(() => {
      console.log("onm");
      // onScrolledToBottom = fetchNextGroupsList
      setThemeStyle();
      subscribeToEvents();
      CometChat.getLoggedinUser()
        .then((user: CometChat.User | null) => {
          loggedInUser = user;
        })
        .catch((error) => {
          if (props.onError) {
            props.onError(error);
          }
        });
      state.value = States.loaded;
      groupRequest.value = getGroupRequest.value;
      fetchNextGroupsList();

      attachListeners();
    });

    onBeforeUnmount(() => {
      groupRequest.value = null;
      removeListener();
      state.value = States.loaded;
      unsubscribeToEvents();
    });

    //style
    const groupStyle = (): any => {
      return {
        height: myGroupsStyle.value.height || "100%",
        width: myGroupsStyle.value.width || "100%",
        background: myGroupsStyle.value.background,
        border: myGroupsStyle.value.border,
        borderRadius: myGroupsStyle.value.borderRadius || "0",
        position: "relative",
      };
    };

    function setThemeStyle() {
      setGroupsStyle();
      setListItemStyle();
      setAvatarStyle();
      setStatusStyle();

      statusColor.value.private =
        props.groupsStyle.privateGroupIconBackground ??
        theme.value.palette.getSuccess() ??
        "";
      statusColor.value.password =
        props.groupsStyle.passwordGroupIconBackground ?? "#F7A500";
    }

    function setGroupsStyle() {
      let defaultStyle: GroupsStyle = new GroupsStyle({
        subTitleTextFont: fontHelper(theme.value.typography.subtitle2),
        subTitleTextColor: theme.value.palette.getAccent600(),

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
        privateGroupIconBackground: theme.value.palette.getSuccess(),
        passwordGroupIconBackground: "RGB(247, 165, 0)",
        searchIconTint: theme.value.palette.getAccent600(),
        searchPlaceholderTextColor: theme.value.palette.getAccent600(),
        searchBackground: theme.value.palette.getAccent100(),
        searchPlaceholderTextFont: fontHelper(theme.value.typography.text3),
        searchTextColor: theme.value.palette.getAccent600(),
        searchTextFont: fontHelper(theme.value.typography.text3),
      });
      myGroupsStyle.value = { ...defaultStyle, ...myGroupsStyle.value };
      listStyle.value = {
        height: "100%",
        titleTextFont: myGroupsStyle.value.titleTextFont,
        titleTextColor: myGroupsStyle.value.titleTextColor,
        emptyStateTextFont: myGroupsStyle.value.emptyStateTextFont,
        emptyStateTextColor: myGroupsStyle.value.emptyStateTextColor,
        errorStateTextFont: myGroupsStyle.value.errorStateTextFont,
        errorStateTextColor: myGroupsStyle.value.errorStateTextColor,
        loadingIconTint: myGroupsStyle.value.loadingIconTint,
        separatorColor: myGroupsStyle.value.separatorColor,
        searchIconTint: myGroupsStyle.value.searchIconTint,
        searchBorder: myGroupsStyle.value.searchBorder,
        searchBorderRadius: myGroupsStyle.value.searchBorderRadius,
        searchBackground: myGroupsStyle.value.searchBackground,
        searchPlaceholderTextFont:
          myGroupsStyle.value.searchPlaceholderTextFont,
        searchPlaceholderTextColor:
          myGroupsStyle.value.searchPlaceholderTextColor,
        searchTextFont: myGroupsStyle.value.searchTextFont,
        searchTextColor: myGroupsStyle.value.searchTextColor,
        background: myGroupsStyle.value.background,
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

    const subtitleStyle = () => {
      return {
        font: myGroupsStyle.subTitleTextFont || "12px",
        color:
          myGroupsStyle.subTitleTextColor || theme.value.palette.getAccent600(),
      };
    };
    return {
      fetchNextGroupsList,
      Groups,
      myavatarStyle,
      myListItemStyle,
      myStatusIndicatorStyle,
      onSearch,
      // onScrolledToBottom,
      onClick,
      getStatusIndicatorColor,
      getGroupIcon,
      getActiveGroup,
      listStyle,
      groupStyle,
      subtitleStyle,
      getMemberCount,
      // getMenuView,
      SelectionMode,

      state,
      States,
      searchKeyword,
    };
  },
});
</script>

<style scoped>
.cc-groups__menus {
  position: absolute;

  right: 12px;
  cursor: pointer;
  padding-right: 12px;
}

.cc-groups__subtitle-view {
  padding: 0px 0px 5px 0px;
}
</style>
