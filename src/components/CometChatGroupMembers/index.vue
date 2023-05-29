<template>
  <div class="cc-group-members" :style="wrapperStyle()">
    <div class="cc-group-members__back">
      <cometchat-button
        v-if="showBackButton"
        :iconURL="backButtonIconURL"
        :buttonStyle="backButtonStyle()"
        @cc-button-clicked="backClicked()"
      >
      </cometchat-button>
    </div>
    <div class="cc-group-members__wrapper" :style="membersStyle()">
      <div class="cc-group-members__menus" v-if="menus">
        <div v-if="menus.html" v-html="menus.html"></div>
        <component
          v-else-if="menus && menus.componentName"
          :is="menus.componentName"
          v-bind="{ ...menus.props }"
          v-on="menus?.listeners ? menus?.listeners : {}"
        >
          <template v-for="(item, key) in menus.slots" :key="key">
            <div :v-slot="[key]" :v-html="item"></div>
          </template>
        </component>
      </div>

      <CometChatList
        :title="title"
        :titleAlignment="titleAlignment"
        :hideSearch="hideSearch"
        :searchIconURL="searchIconURL"
        :searchPlaceholderText="searchPlaceholder"
        :list="GroupMembers"
        :searchText="searchKeyword"
        :state="state"
        :loadingIconURL="loadingIconURL"
        :hideError="hideError"
        :errorStateText="errorStateText"
        :emptyStateText="emptyStateText"
        :scrollToBottom="false"
        :onSearch="onSearch"
        :onScrolledToBottom="fetchNextGroupMembers"
        listItemKey="getUid"
        :listStyle="listStyle"
        :onError="onError"
        :errorStateView="errorStateView"
        :emptyStateView="emptyStateView"
        :loadingStateView="loadingStateView"
        sectionHeaderKey=""
      >
        <template v-slot:listItem="{ item }">
          <div v-if="listItemView">
            <div
              v-if="listItemView(item)?.html"
              v-html="listItemView(item)?.html"
            ></div>

            <component
              v-else-if="listItemView(item)?.componentName"
              :is="listItemView(item)?.componentName!"
              v-bind="{ ...listItemView(item)?.props }"
              v-on="
                listItemView && listItemView(item)?.listeners
                  ? listItemView(item)?.listeners
                  : {}
              "
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
              class="cc-group-members__subtitle-view"
            >
              <div
                v-if="subtitleView(item)?.html"
                v-html="subtitleView(item)?.html"
              ></div>

              <component
                v-else-if="subtitleView(item)?.componentName"
                :is="subtitleView(item)?.componentName!"
                v-bind="{ ...subtitleView(item)?.props }"
                v-on="
                  subtitleView && subtitleView(item)?.listeners
                    ? subtitleView(item)?.listeners
                    : {}
                "
              >
                <template
                  v-for="(html, key) in subtitleView(item)?.slots"
                  :key="key"
                >
                  <div :v-slot="[key]" :v-html="html"></div>
                </template>
              </component>
            </div>
            <div
              slot="menuView"
              class="cc-group-members__options"
              v-if="!tailView && options"
            >
              <cometchat-menu-list
                :menuListStyle="menuListStyle"
                :data="options?.(group, item)"
                @cc-menu-clicked="handleMenuAction($event, item)"
              >
              </cometchat-menu-list>
            </div>
            <div slot="tailView" class="cc-group-members__tail-view">
              <div v-if="tailView && tailView(item)">
                <template v-if="!isArray(tailView(item))">
                  <div
                    v-if="tailView(item)?.html"
                    v-html="tailView(item)?.html"
                  ></div>

                  <component
                    v-else-if="tailView(item)?.componentName"
                    :is="tailView(item)?.componentName!"
                    v-bind="{ ...tailView(item)?.props }"
                    v-on="
                      tailView && tailView(item)?.listeners
                        ? tailView(item)?.listeners
                        : {}
                    "
                  >
                    <template
                      v-for="(html, key) in tailView(item)?.slots"
                      :key="key"
                    >
                      <div :v-slot="[key]" :v-html="html"></div>
                    </template>
                  </component>
                </template>
                <template
                  v-else
                  v-for="(eachItem, index) in tailView(item)"
                  :key="index"
                >
                  <span v-if="eachItem?.html" v-html="eachItem?.html"></span>

                  <component
                    v-else-if="eachItem?.componentName"
                    :is="eachItem.componentName"
                    v-bind="{ ...eachItem.props }"
                    v-on="
                      tailView && eachItem.listeners ? eachItem.listeners : {}
                    "
                  >
                    <template v-for="(html, key) in eachItem.slots" :key="key">
                      <div :v-slot="[key]" :v-html="html"></div>
                    </template>
                  </component>
                </template>
              </div>
              <div v-if="selectionMode !== SelectionMode.none">
                <div
                  class="cc-group-members__selection-single"
                  v-if="selectionMode == SelectionMode.single"
                >
                  <cometchat-radio-button
                    @cc-radio-button-changed="onSelect ? onSelect(item) : null"
                  ></cometchat-radio-button>
                </div>
                <div
                  class="cc-group-members__selection-multiple"
                  v-if="selectionMode == SelectionMode.multiple"
                >
                  <cometchat-checkbox
                    @cc-checkbox-changed="onSelect ? onSelect(item) : null"
                  ></cometchat-checkbox>
                </div>
              </div>
              <div v-if="!tailView">
                <div class="cc-group-members__scope-change">
                  <cometchat-menu-list
                    v-if="isArray(getOptions(item))"
                    :moreIconURL="MoreIcon"
                    :menuListStyle="menuListStyle"
                    :data="getOptions(item)"
                    :topMenuSize="0"
                    @cc-menu-clicked="handleMenuAction($event, item)"
                  ></cometchat-menu-list>
                  <cometchat-label
                    v-if="isString(getOptions(item))"
                    :text="getOptions(item)"
                    :labelStyle="getScopeStyle()"
                  >
                  </cometchat-label>
                </div>
              </div>
            </div>
          </cometchat-list-item>
        </template>
      </CometChatList>
    </div>
    <div class="cc-group-members__close">
      <cometchat-button
        :iconURL="closeButtonIconURL"
        :buttonStyle="closeButtonStyle()"
        @cc-button-clicked="closeClicked()"
      >
      </cometchat-button>
    </div>
  </div>
  <cometchat-backdrop v-if="changeScope && memberScope.length > 0">
    <cometchat-change-scope
      :changeScopeStyle="mygroupScopeStyle"
      :options="memberScope"
      :arrowIconURL="dropdownIconURL"
      @cc-changescope-close-clicked="changeScope = false"
      @cc-changescope-changed="changeMemberScope($event)"
    >
    </cometchat-change-scope>
  </cometchat-backdrop>
</template>

<script lang="ts">
import { CometChat } from "@cometchat-pro/chat";
import CometChatList from "../CometChatList/index.vue";

import "my-cstom-package-lit";

import {
  BaseStyle,
  SelectionMode,
  GroupMembersStyle,
  ConversationUtils,
  GroupMemberUtils,
  ListStyle,
  CometChatUIKitUtility,
} from "uikit-utils-lerna";
import {
  SearchIcon,
  BackIcon,
  Close2xIcon,
  DownArrowIcon,
  MoreIcon,
  LoadingIcon,
} from "../../assets";
import {
  AvatarStyle,
  ChangeScopeStyle,
  ListItemStyle,
  MenuListStyle,
  CometChatMenuList,
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
  // CometChatUIKitHelper,
} from "uikit-resources-lerna";

import {
  defineComponent,
  ref,
  Ref,
  onMounted,
  PropType,
  onBeforeUnmount,
  computed,
  inject,
  onBeforeMount,
} from "vue";

export default defineComponent({
  components: {
    CometChatList,
  },
  props: {
    title: {
      type: String,
      default: () => localize("MEMBERS"),
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
        (groupMember: CometChat.GroupMember) => ViewType
      >,
    },

    tailView: {
      //ViewType | ViewType[] set as null on purpose to avoid lint errors in template
      // type: null,
      type: Function as PropType<
        (groupMember: CometChat.GroupMember) => ViewType
      >,
    },
    listItemView: {
      type: Function as PropType<
        (groupMember: CometChat.GroupMember) => ViewType
      >,
    },
    menus: {
      type: Object as PropType<ViewType>,
    },
    options: {
      type: Function as PropType<
        (
          group: CometChat.Group,
          groupMember: CometChat.GroupMember
        ) => CometChatOption[]
      >,
    },
    groupMembersRequestBuilder: {
      type: CometChat.GroupMembersRequestBuilder,
    },
    searchRequestBuilder: {
      type: CometChat.GroupMembersRequestBuilder,
    },
    disableUsersPresence: {
      type: Boolean,
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
      type: Function as PropType<(groupMember: CometChat.GroupMember) => void>,
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
    dropdownIconURL: {
      type: String,
      default: DownArrowIcon,
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

    onItemClick: {
      type: Function as PropType<(groupMember: CometChat.GroupMember) => void>,
    },

    onError: {
      type: Function as PropType<(error: CometChat.CometChatException) => void>,
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
        // border: "3px solid black transparent",
      },
    },
    listItemStyle: {
      type: ListItemStyle,
      default: {
        // height: "100%",
        // width: "100%",
        // background: "",
        // activeBackground: "",
        // borderRadius: "grey",
        // titleFont: "",
        // titleColor: "",
        // border: "1px solid black transparent",
        // separatorColor: "rgb(222 222 222 / 46%)",
      },
    },

    groupScopeStyle: {
      type: ChangeScopeStyle,
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

    const GroupMembers: Ref<CometChat.GroupMember[]> = ref([]);
    const membersListenerId = ref<string>("memberlist_" + new Date().getTime());

    const groupsRequest = ref<any>(null);

    const state = ref<States>(States.loading);
    const changeScope = ref<boolean>(true);
    let loggedInUser: CometChat.User | null = null;
    let selectedMember: any = ref(null);
    let memberScope: Ref<string[]> = ref([]);
    // const scopes: Ref<string[]> = ref([]);

    const limit = ref<number>(30);
    const timeout = ref<any>(null);
    const searchKeyword = ref("");

    let myavatarStyle = ref(props.avatarStyle);

    let mygroupMemberStyle: any = ref(props.groupMemberStyle);
    let mygroupScopeStyle: any = ref(props.groupScopeStyle);
    let mylistItemStyle = ref(props.listItemStyle);
    let mystatusIndicatorStyle = ref(props.statusIndicatorStyle);
    let currentGroup: any = ref(props.group);
    let listStyle = ref<ListStyle>({});

    const modalStyle: any = ref({
      height: "212px",
      width: "360px",
      background: "white",
      borderRadius: "12px",
      border: "none",
    });

    let menuListStyle: any = ref({
      width: "",
      height: "",
      border: "none",
      borderRadius: "8px",
      background: "white",
      submenuWidth: "100%",
      submenuHeight: "100%",
      submenuBorder: "1px solid #e8e8e8",
      submenuBorderRadius: "8px",
      submenuBackground: "white",
      moreIconTint: "rgb(51, 153, 255)",
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

    const isArray = (value: any) => {
      return typeof value == "object" && value?.length > 0;
    };
    const isString = (value: any) => {
      return typeof value === "string";
    };

    const getOptions = (member: CometChat.GroupMember) => {
      let options = GroupMemberUtils.getViewMemberOptions(
        member,
        props.group,
        loggedInUser?.getUid(),
        theme.value
      );
      return options;
    };

    const handleMenuAction = (
      menu: any,
      groupMember: CometChat.GroupMember
    ) => {
      if (menu?.detail?.data?.onClick) {
        menu?.detail?.data?.onClick(groupMember);

        return;
      }
      let id = menu?.detail?.data?.id;
      selectedMember.value = groupMember;
      memberScope.value = GroupMemberUtils.allowScopeChange(
        props.group,
        groupMember
      );
      if (id == CometChatUIKitConstants.GroupMemberOptions.changeScope) {
        changeScope.value = true;
        //scopes.value = [];
      } else if (id == CometChatUIKitConstants.GroupMemberOptions.ban) {
        changeScope.value = false;
        banMember(groupMember);
      } else if (id == CometChatUIKitConstants.GroupMemberOptions.kick) {
        changeScope.value = false;
        kickMember(groupMember);
      }
    };

    const kickMember = (member: CometChat.GroupMember) => {
      CometChat.kickGroupMember(currentGroup.value.getGuid(), member.getUid())
        .then(() => {
          let updatedGroup: CometChat.Group = CometChatUIKitUtility.clone(
            currentGroup.value
          );
          updatedGroup = updatedGroup as CometChat.Group;
          if (updatedGroup instanceof CometChat.Group) {
            updatedGroup.setMembersCount(
              currentGroup.value.getMembersCount() - 1
            );
          }

          currentGroup.value = updatedGroup;
          addRemoveMember(member);
          CometChatGroupEvents.ccGroupMemberKicked.next({
            kickedBy: loggedInUser!,
            kickedFrom: updatedGroup!,
            kickedUser: member,
            message: createActionMessage(
              member,
              CometChatUIKitConstants.groupMemberAction.KICKED
            ),
          });
        })
        .catch((error: any) => {
          if (props.onError) {
            props.onError(error);
          }
        });
    };

    const banMember = (member: CometChat.GroupMember) => {
      CometChat.banGroupMember(currentGroup.value.getGuid(), member.getUid())
        .then(() => {
          let updatedGroup = CometChatUIKitUtility.clone(props.group);
          updatedGroup = updatedGroup as CometChat.Group;
          if (updatedGroup instanceof CometChat.Group) {
            updatedGroup.setMembersCount(
              currentGroup.value.getMembersCount() - 1
            );
          }
          currentGroup.value = updatedGroup;
          addRemoveMember(member);
          CometChatGroupEvents.ccGroupMemberBanned.next({
            kickedBy: loggedInUser!,
            kickedFrom: updatedGroup,
            kickedUser: member,
            message: createActionMessage(
              member,
              CometChatUIKitConstants.groupMemberAction.BANNED
            ),
          });
        })
        .catch((error) => {
          if (props.onError) {
            props.onError(error);
          }
        });
    };

    const updateMemberStatus = (member: CometChat.User) => {
      let memberlist = [...GroupMembers.value];
      //search for user
      let userKey = memberlist.findIndex(
        (u: CometChat.GroupMember, k) => u.getUid() == member.getUid()
      );
      //if found in the list, update user object
      if (userKey > -1) {
        let user: CometChat.GroupMember = memberlist[userKey];
        user.setStatus(member.getStatus());
        memberlist.splice(userKey, 1, user);
        GroupMembers.value = [...memberlist];
      }
    };

    function attachListeners() {
      //Attaching User Listeners to dynamilcally update when a user comes online and goes offline
      CometChat.addUserListener(
        membersListenerId.value,
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
      CometChat.addGroupListener(
        membersListenerId.value,
        new CometChat.GroupListener({
          onGroupMemberScopeChanged: (
            message: CometChat.Action,
            changedUser: CometChat.GroupMember,
            newScope: CometChat.GroupMemberScope,
            oldScope: CometChat.GroupMemberScope,
            changedGroup: CometChat.Group
          ) => {
            if (changedUser.getUid() == loggedInUser?.getUid()) {
              changedGroup.setScope(newScope);
            }
            updateMember(changedUser as CometChat.GroupMember);
          },
          onGroupMemberKicked: (
            message: CometChat.Action,
            kickedUser: CometChat.User,
            kickedBy: CometChat.User,
            kickedFrom: CometChat.Group
          ) => {
            addRemoveMember(kickedUser as CometChat.GroupMember);
          },
          onGroupMemberBanned: (
            message: CometChat.Action,
            bannedUser: CometChat.User,
            bannedBy: CometChat.User,
            bannedFrom: CometChat.Group
          ) => {
            addRemoveMember(bannedUser as CometChat.GroupMember);
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
            addRemoveMember(unbannedUser as CometChat.GroupMember);
          },
          onMemberAddedToGroup: (
            message: CometChat.Action,
            userAdded: CometChat.User,
            userAddedBy: CometChat.User,
            userAddedIn: CometChat.Group
          ) => {
            let member: CometChat.GroupMember = new CometChat.GroupMember(
              userAdded.getUid(),
              CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT
            );
            member.setName(userAdded.getName());
            member.setGuid(currentGroup.value.getGuid());
            member.setUid(userAdded.getUid());
            if (userAdded.getUid() == loggedInUser?.getUid()) {
              userAddedIn.setHasJoined(true);
            }
            addRemoveMember(member);
          },
          onGroupMemberLeft: (
            message: CometChat.Action,
            leavingUser: CometChat.User,
            group: CometChat.Group
          ) => {
            if (leavingUser.getUid() == loggedInUser?.getUid()) {
              group.setHasJoined(false);
            }
            addRemoveMember(leavingUser as CometChat.GroupMember);
          },
          onGroupMemberJoined: (
            message: CometChat.Action,
            joinedUser: CometChat.User,
            joinedGroup: CometChat.Group
          ) => {
            addRemoveMember(joinedUser as CometChat.GroupMember);
          },
        })
      );
    }
    function removeListener() {
      CometChat.removeUserListener(membersListenerId.value);
      membersListenerId.value = "";
    }
    const addRemoveMember = (member: CometChat.GroupMember) => {
      let memberlist = [...GroupMembers.value];
      //search for user
      let memberKey = memberlist.findIndex(
        (u: CometChat.GroupMember, k) => u.getUid() == member.getUid()
      );
      //if found in the list, update user object
      if (memberKey > -1) {
        memberlist.splice(memberKey, 1);
        GroupMembers.value = [...memberlist];
      } else {
        GroupMembers.value.push(member);
      }
    };
    const getRequestBuilder = computed((): CometChat.GroupMembersRequest => {
      console.log("in computed");
      if (searchKeyword.value.length == 0) {
        if (props.groupMembersRequestBuilder) {
          return props.groupMembersRequestBuilder.build();
        }
      } else if (searchKeyword.value.length > 0) {
        if (props.searchRequestBuilder) {
          return props.searchRequestBuilder
            .setSearchKeyword(searchKeyword.value)
            .build();
        } else if (props.groupMembersRequestBuilder) {
          return props.groupMembersRequestBuilder
            .setSearchKeyword(searchKeyword.value)
            .build();
        } else {
          return new CometChat.GroupMembersRequestBuilder(
            currentGroup.value.getGuid()
          )
            .setSearchKeyword(searchKeyword.value)
            .setLimit(limit.value)
            .build();
        }
      }

      return new CometChat.GroupMembersRequestBuilder(
        currentGroup.value.getGuid()
      )
        .setLimit(limit.value)
        .build();
    });

    const onSearch = (text: string) => {
      searchKeyword.value = text;

      GroupMembers.value = [];
      groupsRequest.value = getRequestBuilder.value;

      fetchNextGroupMembers();
    };
    // const onSearch = (key: string) => {
    //   searchKeyword.value = key;
    //   clearTimeout(timeout.value);
    //   timeout.value = setTimeout(() => {
    //     const request = props.searchRequestBuilder
    //       ? props.searchRequestBuilder
    //           .setSearchKeyword(searchKeyword.value)
    //           .build()
    //       : getRequestBuilder.value;
    //     groupsRequest.value = request;
    //     GroupMembers.value = [];
    //     fetchNextGroupMembers();
    //   }, 500);
    // };

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
    const fetchNextGroupMembers = async () => {
      if (groupsRequest.value) {
        state.value = States.loading;

        try {
          const fetchedGroupMembers = await staleFetchAutoRejector(
            groupsRequest.value
          );
          if (
            fetchedGroupMembers.length <= 0 &&
            GroupMembers.value?.length <= 0
          ) {
            state.value = States.empty;
          } else {
            GroupMembers.value = [
              ...fetchedGroupMembers,
              ...GroupMembers.value,
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

    // const fetchNextGroupMembers = () => {
    //   console.log("Fetching next group members...");

    //   if (controller) {
    //     controller.abort();
    //   }
    //   // onScrolledToBottom = null;
    //   if (groupsRequest.value) {
    //     // onScrolledToBottom = fetchNextGroupMembers;
    //     state.value = States.loading;
    //     controller = new AbortController();
    //     try {
    //       groupsRequest.value
    //         ?.fetchNext({ signal: controller.signal })
    //         .then((groupMembers: CometChat.GroupMember[]) => {
    //           state.value = States.loading;
    //           if (groupMembers.length <= 0 && GroupMembers.value?.length <= 0) {
    //             state.value = States.empty;
    //           } else {
    //             state.value = States.loaded;
    //             GroupMembers.value = [...GroupMembers.value, ...groupMembers];
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
    //     return;
    //   }
    // };

    // let onScrolledToBottom: any = fetchNextGroupMembers;
    onBeforeMount(() => {
      currentGroup.value = props.group;
    });

    onMounted(() => {
      // onScrolledToBottom = fetchNextGroupMembers;
      attachListeners();
      setThemeStyle();
      CometChat.getLoggedinUser()
        .then((user: CometChat.User | null) => {
          loggedInUser = user;

          groupsRequest.value = getRequestBuilder.value;
          fetchNextGroupMembers();

          // setTimeout(fetchNextGroupMembers, 3000);
        })
        .catch((error) => {
          if (props.onError) {
            props.onError(error);
          }
        });
    });
    onBeforeUnmount(() => {
      removeListener();
    });

    function changeMemberScope(event: any) {
      CometChat.updateGroupMemberScope(
        currentGroup.value.getGuid(),
        selectedMember.value!.getUid(),
        event?.detail?.value
      )
        .then((member: boolean) => {
          let scope: any = event?.detail?.value;
          changeScope.value = false;
          selectedMember.value?.setScope(scope);
          updateMember(selectedMember.value);
          CometChatGroupEvents.ccGroupMemberScopeChanged.next({
            scopeChangedFrom: selectedMember.value?.getScope(),
            scopeChangedTo: scope,
            message: createActionMessage(
              selectedMember.value!,
              CometChatUIKitConstants.groupMemberAction.SCOPE_CHANGE
            ),
            group: props.group,
            updatedUser: selectedMember.value!,
          });
          selectedMember.value = null;
          changeScope.value = false;
        })
        .catch((err: any) => {
          if (props.onError) {
            props.onError(err);
          }
          changeScope.value = false;
          selectedMember.value = null;
        });
    }

    const updateMember = (member: CometChat.GroupMember | null) => {
      let memberlist = [...GroupMembers.value];
      //search for user
      let userKey = memberlist.findIndex(
        (u: CometChat.GroupMember, k) => u.getUid() == member!.getUid()
      );
      //if found in the list, update user object
      if (userKey > -1) {
        let user: CometChat.GroupMember = memberlist[userKey];
        memberlist.splice(userKey, 1, user);
        GroupMembers.value = [...memberlist];
      }
    };

    function createActionMessage(
      actionOn: CometChat.GroupMember,
      action: string
    ) {
      let actionMessage: CometChat.Action = new CometChat.Action(
        currentGroup.value.getGuid(),
        CometChatUIKitConstants.MessageTypes.groupMember,
        CometChatUIKitConstants.MessageReceiverType.group,
        CometChatUIKitConstants.MessageCategory.action as any
      );
      actionMessage.setAction(action);
      actionMessage.setActionBy(loggedInUser!);
      actionMessage.setActionFor(props.group);
      actionMessage.setActionOn(actionOn);
      actionMessage.setReceiver(props.group);
      actionMessage.setSender(loggedInUser!);
      actionMessage.setConversationId("group_" + currentGroup.value.getGuid());
      actionMessage.setMuid(CometChatUIKitUtility.ID());
      actionMessage.setMessage(
        `${loggedInUser?.getName()} ${action} ${actionOn.getUid()}`
      );
      actionMessage.setSentAt(CometChatUIKitUtility.getUnixTimestamp());
      actionMessage.setReceiverType(
        CometChatUIKitConstants.MessageReceiverType.group
      );
      (actionMessage as any).data = {
        extras: {
          scope: {
            new: actionOn.getScope(),
          },
        },
      };
      return actionMessage;
    }
    ///style

    const getStatusIndicatorColor = (member: CometChat.GroupMember) => {
      if (!props.disableUsersPresence) {
        if (
          member?.getStatus() == CometChatUIKitConstants.userStatusType.online
        ) {
          return (
            props.groupMemberStyle.onlineStatusColor ||
            theme.value.palette.getSuccess() ||
            null
          );
        } else {
          return null;
        }
      }
      return null;
    };

    function setThemeStyle() {
      setGroupMembersStyle();
      setScopeStyle();
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
        submenuBackground: theme.value.palette.getBackground(),
        moreIconTint: theme.value.palette.getPrimary(),
      });
      modalStyle.value.boxShadow = `0px 0px 1px ${theme.value.palette.getAccent600()}`;
      modalStyle.value.background = theme.value.palette.getBackground();
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
        padding: "0px",
      });
      mygroupMemberStyle.value = {
        ...defaultStyle,
        ...mygroupMemberStyle.value,
      };

      listStyle.value = {
        height: "100%",
        titleTextFont:
          mygroupMemberStyle.value.titleTextFont ||
          fontHelper(theme.value.typography.title1),
        titleTextColor:
          mygroupMemberStyle.value.titleTextColor ||
          theme.value.palette.getAccent(),
        emptyStateTextFont: mygroupMemberStyle.value.emptyStateTextFont,
        emptyStateTextColor: mygroupMemberStyle.value.emptyStateTextColor,
        errorStateTextFont: mygroupMemberStyle.value.errorStateTextFont,
        errorStateTextColor: mygroupMemberStyle.value.errorStateTextColor,
        loadingIconTint: mygroupMemberStyle.value.loadingIconTint,
        separatorColor: mygroupMemberStyle.value.separatorColor,
        searchIconTint: mygroupMemberStyle.value.searchIconTint,
        searchBorder: mygroupMemberStyle.value.searchBorder,
        searchBorderRadius: mygroupMemberStyle.value.searchBorderRadius,
        searchBackground: mygroupMemberStyle.value.searchBackground,
        searchPlaceholderTextFont:
          mygroupMemberStyle.value.searchPlaceholderTextFont,
        searchPlaceholderTextColor:
          mygroupMemberStyle.value.searchPlaceholderTextColor,
        searchTextFont: mygroupMemberStyle.value.searchTextFont,
        searchTextColor: mygroupMemberStyle.value.searchTextColor,
        background: mygroupMemberStyle.value.background,
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
        separatorColor: theme.value.palette.getAccent100(),
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

    function setScopeStyle() {
      let defaultStyle: ChangeScopeStyle = new ChangeScopeStyle({
        titleTextFont: fontHelper(theme.value.typography.title1),
        titleTextColor: theme.value.palette.getAccent(),
        activeTextFont: fontHelper(theme.value.typography.subtitle1),
        activeTextColor: theme.value.palette.getAccent(),
        activeTextBackground: theme.value.palette.getAccent200(),
        arrowIconTint: theme.value.palette.getAccent900(),
        textFont: fontHelper(theme.value.typography.subtitle1),
        textColor: theme.value.palette.getAccent600(),
        optionBackground: theme.value.palette.getBackground(),
        optionBorder: "none",
        optionBorderRadius: "0",
        hoverTextFont: fontHelper(theme.value.typography.subtitle1),
        hoverTextColor: theme.value.palette.getAccent900(),
        hoverTextBackground: theme.value.palette.getAccent100(),
        buttonTextFont: fontHelper(theme.value.typography.title2),
        buttonTextColor: theme.value.palette.getAccent("dark"),
        buttonBackground: theme.value.palette.getPrimary(),
        closeIconTint: theme.value.palette.getPrimary(),
        background: theme.value.palette.getBackground(),
        border: `1px solid ${theme.value.palette.getAccent200()}`,
        borderRadius: "8px",
        height: "200px",
        width: "280px",
      });
      mygroupScopeStyle.value = { ...defaultStyle, ...mygroupScopeStyle.value };
    }
    const membersStyle = () => {
      return {
        padding: mygroupMemberStyle.value.padding,
      };
    };
    // styles
    const backButtonStyle = () => {
      return {
        height: "24px",
        width: "24px",
        border: "none",
        borderRadius: "0",
        background: "transparent",
        buttonIconTint:
          props.groupMemberStyle.backButtonIconTint ||
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
          props.groupMemberStyle.closeButtonIconTint ||
          theme.value.palette.getPrimary(),
      };
    };
    const wrapperStyle: any = () => {
      return {
        height: mygroupMemberStyle.value.height || "100%",
        width: mygroupMemberStyle.value.width || "100%",
        background:
          mygroupMemberStyle.value.background ||
          theme.value.palette.getBackground(),
        border: mygroupMemberStyle.value.border,
        borderRadius: mygroupMemberStyle.value.borderRadius || "0",
        position: "relative",
        display: "flex",
      };
    };
    const getScopeStyle = () => {
      return {
        textFont: mygroupScopeStyle.value.textFont,
        textColor: mygroupScopeStyle.value.textColor,
      };
    };

    return {
      GroupMembers,
      wrapperStyle,
      membersStyle,
      ConversationUtils,
      GroupMemberUtils,
      handleMenuAction,
      closeButtonStyle,
      closeClicked,
      backClicked,
      changeScope,
      memberScope,
      changeMemberScope,
      SelectionMode,
      getOptions,
      backButtonStyle,
      MoreIcon,
      mylistItemStyle,
      myavatarStyle,
      menuListStyle,
      mystatusIndicatorStyle,
      getStatusIndicatorColor,
      getScopeStyle,
      isArray,
      isString,
      onSearch,
      //onScrolledToBottom,
      state,
      mygroupMemberStyle,
      listStyle,
      searchKeyword,
      fetchNextGroupMembers,
      mygroupScopeStyle,
    };
  },
});
</script>

<style scoped>
/* .cc-group-members {
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;
} */
.cc-group-members__back {
  position: absolute;
  left: 8px;
  padding: 12px 8px 8px 8px;
}
.cc-group-members__wrapper {
  height: 100%;
  padding: 8px;
  width: 100%;
}

.cc-group-members__close {
  position: absolute;
  right: 8px;
  padding: 12px 8px 8px 8px;
}

.cc-group-members__tail-view {
  position: relative;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  align-items: center;
}
.cc-group-members__menus {
  position: absolute;
  right: 12px;
  cursor: pointer;
}
/* .scope__changed {
  height: 100%;
  width: fit-content;
  position: absolute;
  right: 8px;
} */
</style>
