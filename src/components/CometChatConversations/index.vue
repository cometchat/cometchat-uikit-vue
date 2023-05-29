<template>
  <div class="cc-conversations" :style="wrapperStyle()">
    <cometchat-backdrop v-if="isDialogOpen" :style="getbackdropStyle">
      <cometchat-confirm-dialog
        :title="confirmDialogTitle"
        :messageText="confirmDialogMessage"
        :cancelButtonText="cancelButtonText"
        :confirmButtonText="confirmButtonText"
        @cc-confirm-clicked="onConfirmClick()"
        @cc-cancel-clicked="onCancelClick()"
        :confirmDialogStyle="mydeleteConversationDialogStyle"
      ></cometchat-confirm-dialog>
    </cometchat-backdrop>

    <div class="cc-conversations__menus" v-if="menus">
      <component
        v-if="menus.componentName"
        :is="menus.componentName"
        v-on="menus?.listeners"
        v-bind="{ ...menus.props }"
      >
        <template v-for="(element, key) in menus.slots?.slots" :key="key">
          <div :v-slot="[key]" :v-html="element"></div>
        </template>
      </component>
      <div v-else v-html="menus.html"></div>
    </div>
    <CometChatList
      :title="title"
      :titleAlignment="titleAlignment"
      :list="Conversations"
      :onScrolledToBottom="getConversation"
      :state="state"
      :loadingIconURL="loadingIconURL"
      :hideSearch="true"
      :hideError="hideError"
      :errorStateText="errorStateText"
      :emptyStateText="emptyStateText"
      :scrollToBottom="false"
      :listStyle="listStyle"
      listItemKey="getConversationId"
      :onError="onError"
      :errorStateView="errorStateView"
      :emptyStateView="emptyStateView"
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
            :is="listItemView(item)?.componentName!"
            v-on="
              listItemView?.(item)?.listeners
                ? listItemView(item)?.listeners
                : {}
            "
            v-bind="{ ...listItemView(item)?.props }"
          >
            <template
              v-for="(html, key) in listItemView(item)?.slots"
              :key="key"
            >
              <div :v-slot="[key]" :v-html="item"></div>
            </template>
          </component>
        </div>
        <cometchat-list-item
          v-else
          :title="item?.conversationWith?.name"
          :avatarURL="
            item?.conversationWith?.avatar || item?.conversationWith?.icon
          "
          :avatarName="item?.conversationWith?.name"
          :hideSeparator="hideSeparator"
          :id="item?.conversationId"
          :avatarStyle="myavatarStyle"
          :listItemStyle="myListItemStyle"
          :statusIndicatorStyle="setStatusIndicatorStyle(item)"
          :isActive="getActiveConversation(item)"
          @cc-listitem-clicked="onClick(item)"
          :statusIndicatorColor="checkStatusType(item)"
          :statusIndicatorIcon="checkGroupType(item)"
        >
          <div slot="subtitleView" class="cc-conversations__subtitle-view">
            <div v-if="subtitleView">
              <div
                v-if="subtitleView(item)?.html"
                v-html="subtitleView(item)?.html"
              ></div>
              <component
                v-else
                :is="subtitleView(item)?.componentName!"
                v-on="
                  subtitleView?.(item)?.listeners
                    ? subtitleView(item)?.listeners
                    : {}
                "
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
            <div v-else class="cc-conversations__default-subtitle-view">
              <div
                class="cc-conversations__thread-view"
                v-if="item?.lastMessage?.parentMessageId"
              >
                <cometchat-label
                  :labelStyle="itemThreadIndicatorStyle()"
                  :text="threadText"
                >
                </cometchat-label>
                <cometchat-icon
                  :URL="ThreadIcon"
                  :iconStyle="iconStyle"
                ></cometchat-icon>
              </div>
              <div class="cc-conversations__subtitle">
                <div
                  class="cc-conversations__read-receipt"
                  v-if="isReceiptDisable(item)"
                >
                  <cometchat-receipt
                    :receipt="getMessageReceipt(item)"
                    :waitIcon="waitIcon"
                    :sentIcon="sentIcon"
                    :errorIcon="errorIcon"
                    :deliveredIcon="deliveredIcon"
                    :readIcon="readIcon"
                    :receiptStyle="myreceiptStyle"
                  />
                </div>

                <div
                  :style="subtitleStyle(item)"
                  class="cc-conversations__subtitle-text"
                >
                  {{ setSubtitle(item) }}
                </div>
              </div>
            </div>
          </div>
          <div
            slot="menuView"
            class="cc-conversations__options-view"
            v-if="selectionMode === SelectionMode.none"
          >
            <div v-if="setConversationOptions(item)">
              <cometchat-menu-list
                :menuListStyle="menustyle"
                :data="setConversationOptions(item)"
                @cc-menu-clicked="onOptionClick($event, item)"
              >
              </cometchat-menu-list>
            </div>
          </div>
          <div slot="tailView" class="cc-conversations__tail-view">
            <div class="tail__view" v-if="selectionMode == SelectionMode.none">
              <div class="cc-conversations__date">
                <cometchat-date
                  :dateStyle="mydateStyle"
                  :timestamp="item?.getLastMessage()?.sentAt"
                  :pattern="datePattern"
                ></cometchat-date>
              </div>
              <div class="cc-conversations__badge">
                <cometchat-badge
                  :count="item?.getUnreadMessageCount()"
                  :badgeStyle="mybadgeStyle"
                ></cometchat-badge>
              </div>
            </div>
          </div>
          <div slot="tailView" v-if="selectionMode == SelectionMode.single">
            <cometchat-radio-button
              @cc-checkbox-changed="onSelect ? onSelect(item) : null"
            ></cometchat-radio-button>
          </div>
          <div v-if="selectionMode == SelectionMode.multiple" slot="tailView">
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
  ListStyle,
  ConversationsStyle,
  MessageReceiptUtils,
  ConversationUtils,
  SelectionMode,
  CometChatSoundManager,
  CometChatUIKitUtility,
} from "uikit-utils-lerna";
import {
  PasswordGroupIcon,
  PrivateGroupIcon,
  ReadIcon,
  WaitIcon,
  SentIcon,
  WarningIcon,
  LoadingIcon,
  DeliveredIcon,
  ThreadIcon,
} from "../../assets";
import {
  AvatarStyle,
  BadgeStyle,
  ConfirmDialogStyle,
  DateStyle,
  ListItemStyle,
  ReceiptStyle,
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
  IGroupMemberAdded,
  IGroupMemberKickedBanned,
  IGroupLeft,
  CometChatConversationEvents,
  DatePatterns,
  CometChatMessageEvents,
  MessageStatus,
  IMessages,
  CometChatUserEvents,
  IGroupMemberScopeChanged,
  CometChatLocalize,
} from "uikit-resources-lerna";

import {
  defineComponent,
  ref,
  Ref,
  onMounted,
  PropType,
  onBeforeUnmount,
  onUpdated,
  inject,
} from "vue";

export default defineComponent({
  components: {
    CometChatList,
  },
  props: {
    title: {
      type: String,
      default: () => {
        return localize("CHATS");
      },
    },
    titleAlignment: {
      type: Number as PropType<TitleAlignment>,
      default: TitleAlignment.left,
    },

    confirmDialogTitle: {
      type: String,
      default: () => {
        return localize("DELETE_CONVERSATION");
      },
    },
    confirmDialogMessage: {
      type: String,
      default: () => {
        return localize("WOULD__YOU_LIKE_TO_DELETE_THIS_CONVERSATION");
      },
    },
    cancelButtonText: {
      type: String,
      default: () => {
        return localize("CANCEL");
      },
    },
    confirmButtonText: {
      type: String,
      default: () => {
        return localize("DELETE");
      },
    },
    subtitleView: {
      type: Function as PropType<
        (conversation: CometChat.Conversation) => ViewType
      >,
    },
    listItemView: {
      type: Function as PropType<
        (conversation: CometChat.Conversation) => ViewType
      >,
    },
    menus: {
      type: Object as PropType<ViewType>,
    },
    options: {
      type: Function as PropType<
        (conversation: CometChat.Conversation) => CometChatOption[]
      >,
    },
    datePattern: {
      type: Number as PropType<DatePatterns>,
      default: DatePatterns.DayDateTime,
    },
    conversationsRequestBuilder: {
      type: CometChat.ConversationsRequestBuilder,
    },
    activeConversation: {
      type: CometChat.Conversation,
    },

    disableUsersPresence: {
      type: Boolean,
      default: false,
    },
    disableSoundForMessages: {
      type: Boolean,
      default: false,
    },
    customSoundForMessages: {
      type: String,
      default: "",
    },
    disableReceipt: {
      type: Boolean,
      default: false,
    },
    disableTyping: {
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
      type: Function as PropType<
        (conversation: CometChat.Conversation) => void
      >,
    },

    deliveredIcon: {
      type: String,
      default: DeliveredIcon,
    },
    readIcon: {
      type: String,
      default: ReadIcon,
    },
    waitIcon: {
      type: String,
      default: WaitIcon,
    },
    sentIcon: {
      type: String,
      default: SentIcon,
    },
    errorIcon: {
      type: String,
      default: WarningIcon,
    },
    protectedGroupIcon: {
      type: String,
      default: PasswordGroupIcon,
    },
    privateGroupIcon: {
      type: String,
      default: PrivateGroupIcon,
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
      default: () => {
        return localize("SOMETHING_WRONG");
      },
    },

    emptyStateText: {
      type: String,
      default: () => {
        return localize("NO_CHATS_FOUND");
      },
    },

    onItemClick: {
      type: Function as PropType<
        (Conversation: CometChat.Conversation) => void
      >,
    },

    onError: {
      type: Function as PropType<(error: CometChat.CometChatException) => void>,
      default: (error: CometChat.CometChatException) => console.log(error),
    },

    avatarStyle: {
      type: AvatarStyle,
    },

    receiptStyle: {
      type: ReceiptStyle,
    },
    badgeStyle: {
      type: BadgeStyle,
    },
    deleteConversationDialogStyle: {
      type: ConfirmDialogStyle,
    },

    listItemStyle: {
      type: ListItemStyle,
    },
    dateStyle: {
      type: DateStyle,
    },
    statusIndicatorStyle: {
      type: null,
    },
    conversationsStyle: {
      type: ConversationsStyle,
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
    backdropStyle: {
      type: BaseStyle,
      default: () => {
        return {} as any;
      },
    },
  },

  setup(props) {
    const Conversations: Ref<CometChat.Conversation[]> = ref([]);
    const conversationToBeDeleted: any = ref(null);
    // let typingIndicator: Ref<CometChat.TypingIndicator | null> = ref(null);
    const typingIndicatorMap = ref<Map<string, CometChat.TypingIndicator>>(
      new Map()
    );

    const typingListenerId = ref<string>(
      "conversation__LISTENER" + new Date().getTime()
    );

    const state = ref<States>(States.loading);
    const isDialogOpen = ref<boolean>(false);
    let loggedInUser: CometChat.User | null = null;
    let conversationsRequestBuilder: any = ref(
      props.conversationsRequestBuilder
    );
    let limit = 30;
    let threadText: string = localize("IN_A_THREAD");
    let myavatarStyle: any = ref(props.avatarStyle);
    let mybadgeStyle: any = ref(props.badgeStyle);
    let mydeleteConversationDialogStyle: any = ref(
      props.deleteConversationDialogStyle
    );
    let myactiveConversation: any = ref(props.activeConversation);
    let activeConversationTmp: CometChat.Conversation;
    let { theme, switchThemeMode }: any = inject(
      "theme",
      new CometChatTheme({})
    )!;
    let listStyle = ref<ListStyle>({});
    let myListItemStyle: any = ref(props.listItemStyle);
    let myConversationStyle = ref(props.conversationsStyle);
    let mydateStyle: any = ref(props.dateStyle);
    let mystatusStyle: any = ref(props.statusIndicatorStyle);
    let myreceiptStyle: any = ref(props.receiptStyle);
    let myoptions: any = ref(props.options);
    const userListenerId = ref<string>("chatlist_user_" + new Date().getTime());
    const groupListenerId = ref<string>(
      "chatlist_group_" + new Date().getTime()
    );
    const conversationListenerId = ref<string>(
      "chatlist_" + new Date().getTime()
    );

    const ccGroupMemberAdded = ref<Subscription>();
    const ccGroupMemberJoined = ref<Subscription>();
    const ccGroupMemberKicked = ref<Subscription>();
    const ccGroupMemberScopeChanged = ref<Subscription>();
    const ccOwnershipChanged = ref<Subscription>();
    const ccMessageEdit = ref<Subscription>();
    const ccMessageSent = ref<Subscription>();
    const ccMessageEdited = ref<Subscription>();
    const ccMessageDelete = ref<Subscription>();
    const ccGroupDeleted = ref<Subscription>();
    const ccGroupLeft = ref<Subscription>();
    const ccUserBlocked = ref<Subscription>();
    const ccMessageRead = ref<Subscription>();
    const ccGroupMemberBanned = ref<Subscription>();

    const statusColor: any = ref({
      online: "",
      private: "",
      password: "",
      public: "",
    });
    const iconStyle: any = ref({
      iconTint: "lightgrey",
      height: "20px",
      width: "20px",
    });
    // const optionsStyle: any = ref({
    //   background: "transparent",
    //   border: "none",
    // });

    let menustyle = ref({
      width: "",
      height: "",
      border: "none",
      borderRadius: "8px",
      background: "transparent",
      textFont: "",
      textColor: "black",
      iconTint: "grey",
      iconBackground: "transparent",
      iconBorder: "none",
      iconBorderRadius: "0",
      submenuWidth: "70px",
      submenuHeight: "20px",
      submenuBorder: "1px solid #e8e8e8",
      submenuBorderRadius: "8px",
      submenuBackground: "white",
    });
    type Message =
      | CometChat.TextMessage
      | CometChat.MediaMessage
      | CometChat.CustomMessage
      | CometChat.Action
      | CometChat.Call;
    function isAMessage(message: unknown): message is Message {
      return (
        message instanceof CometChat.TextMessage ||
        message instanceof CometChat.MediaMessage ||
        message instanceof CometChat.CustomMessage ||
        message instanceof CometChat.Action ||
        message instanceof CometChat.Call
      );
    }
    const deleteConversationOnClick: (() => void) | null = () => {
      showConfirmationDialog(conversationToBeDeleted!);
    };

    // callback for confirmDialogComponent
    const onConfirmClick = () => {
      deleteSelectedConversation();
    };

    const setStatusIndicatorStyle = (conversation: CometChat.Conversation) => {
      if (
        conversation.getConversationType() ==
        CometChatUIKitConstants.MessageReceiverType.user
      ) {
        return {
          height: "12px",
          width: "12px",
          borderRadius: "16px",
        };
      } else {
        return props.statusIndicatorStyle;
      }
    };

    function fetchNextConversation() {
      try {
        if (conversationsRequestBuilder.value !== null) {
          return conversationsRequestBuilder.value.fetchNext();
        }
      } catch (error: any) {
        if (props.onError) {
          props.onError(error);
        }
      }
    }

    function updateEditedMessage(message: CometChat.TextMessage) {
      let index = Conversations.value.findIndex(
        (conversationObj: CometChat.Conversation) =>
          conversationObj.getLastMessage() &&
          (conversationObj.getLastMessage() as CometChat.BaseMessage).getId() ==
            message?.getId()
      );

      if (index >= 0) {
        conversationEditedDeleted(message);
      }
    }

    function getConversationFromUser(user: CometChat.User) {
      let index = Conversations.value.findIndex(
        (element: CometChat.Conversation) =>
          element.getConversationType() ==
            CometChatUIKitConstants.MessageReceiverType.user &&
          (element.getConversationWith() as CometChat.User).getUid() ==
            user.getUid()
      );
      if (index >= 0) {
        return Conversations.value[index];
      }
      return null;
    }

    function getConversationFromGroup(
      group: CometChat.Group
    ): CometChat.Conversation | null {
      let index = Conversations.value.findIndex(
        (element: CometChat.Conversation) =>
          element.getConversationType() ==
            CometChatUIKitConstants.MessageReceiverType.group &&
          (element.getConversationWith() as CometChat.Group).getGuid() ==
            group.getGuid()
      );
      if (index >= 0) {
        return Conversations.value[index];
      }
      return null;
    }

    function subscribeToEvents() {
      ccGroupMemberScopeChanged.value =
        CometChatGroupEvents.ccGroupMemberScopeChanged.subscribe(
          (item: IGroupMemberScopeChanged) => {
            let conversation = getConversationFromGroup(item.group!);
            if (conversation) {
              conversation.setLastMessage(item.message);
              updateConversationObject(conversation);
            }
          }
        );
      ccGroupMemberAdded.value =
        CometChatGroupEvents.ccGroupMemberAdded.subscribe(
          (item: IGroupMemberAdded) => {
            let group: CometChat.Group = item.userAddedIn!;
            let actionMessage: CometChat.Action[] = item.messages!;
            let conversation: CometChat.Conversation | null =
              getConversationFromGroup(item.userAddedIn!);
            if (conversation) {
              conversation?.setConversationWith(group);
              conversation?.setLastMessage(
                actionMessage[actionMessage?.length - 1]
              );
              updateConversationObject(conversation!);
            }
          }
        );
      ccGroupMemberKicked.value =
        CometChatGroupEvents.ccGroupMemberKicked.subscribe(
          (item: IGroupMemberKickedBanned) => {
            let conversation = getConversationFromGroup(item.kickedFrom!);
            if (conversation) {
              const updatedConversation =
                CometChatUIKitUtility.clone(conversation);
              updatedConversation.setConversationWith(item.kickedFrom!);

              updatedConversation.setLastMessage(item.message);
              updateConversationObject(updatedConversation);
            }
          }
        );
      ccGroupMemberBanned.value =
        CometChatGroupEvents.ccGroupMemberBanned.subscribe(
          (item: IGroupMemberKickedBanned) => {
            let conversation = getConversationFromGroup(item.kickedFrom!);
            if (conversation) {
              const updatedConversation =
                CometChatUIKitUtility.clone(conversation);
              updatedConversation.setConversationWith(item.kickedFrom!);

              updatedConversation.setLastMessage(item.message);
              updateConversationObject(updatedConversation);
            }
          }
        );
      ccGroupDeleted.value = CometChatGroupEvents.ccGroupDeleted.subscribe(
        (item: CometChat.Group) => {
          let conversation: CometChat.Conversation | null =
            getConversationFromGroup(item);
          if (conversation) {
            removeConversation(conversation);
          }
        }
      );
      ccGroupLeft.value = CometChatGroupEvents.ccGroupLeft.subscribe(
        (item: IGroupLeft) => {
          let conversation = getConversationFromGroup(item.leftGroup!);
          for (let i = 0; i < Conversations.value.length; i++) {
            if (
              conversation?.getConversationId() ==
              Conversations.value[i].getConversationId()
            ) {
              Conversations.value.splice(i, 1);
            }
          }
        }
      );
      ccUserBlocked.value = CometChatUserEvents.ccUserBlocked.subscribe(
        (item: CometChat.User) => {
          let conversation: CometChat.Conversation | null =
            getConversationFromUser(item);
          if (conversation) {
            removeConversation(conversation);
          }
        }
      );
      ccMessageEdit.value = CometChatMessageEvents.ccMessageEdited.subscribe(
        (object: IMessages) => {
          let message: CometChat.BaseMessage = object.message!;
          if (object.status == MessageStatus.success) {
            updateEditedMessage(message as CometChat.TextMessage);
          }
        }
      );
      ccMessageSent.value = CometChatMessageEvents.ccMessageSent.subscribe(
        (obj: IMessages) => {
          console.log("ccMessageSent....///");
          let message: CometChat.BaseMessage = obj.message!;
          if (obj.status == MessageStatus.success) {
            const targetConvId = message.getConversationId();
            const targetIdx = Conversations.value.findIndex(
              (conv) => conv.getConversationId() === targetConvId
            );
            if (targetIdx > -1) {
              const targetConversation = CometChatUIKitUtility.clone(
                Conversations.value[targetIdx]
              );
              targetConversation.setLastMessage(message);
              targetConversation.setUnreadMessageCount(0);
              const newConversationList = Conversations.value.filter(
                (conv, i) => i !== targetIdx
              );

              Conversations.value = [
                targetConversation,
                ...newConversationList,
              ];
            }
          }
        }
      );
      ccMessageDelete.value = CometChatMessageEvents.ccMessageDeleted.subscribe(
        (messageObject: CometChat.BaseMessage) => {
          const targetMessageId = messageObject.getId();
          const targetIdx = Conversations.value.findIndex((conv) => {
            const lastMessage = conv.getLastMessage();
            return (
              isAMessage(lastMessage) && lastMessage.getId() === targetMessageId
            );
          });
          if (targetIdx > -1) {
            Conversations.value = Conversations.value.map((conv, i) => {
              if (i === targetIdx) {
                const newConv = CometChatUIKitUtility.clone(conv);
                newConv.setLastMessage(messageObject);
                return newConv;
              }
              return conv;
            });
          }
          // updateConversation(messageObject);
        }
      );
      ccMessageRead.value = CometChatMessageEvents.ccMessageRead.subscribe(
        (messageObject: CometChat.BaseMessage) => {
          CometChat.CometChatHelper.getConversationFromMessage(
            messageObject
          ).then((conversation: CometChat.Conversation) => {
            conversation.setUnreadMessageCount(0);
            const messageReadAt = messageObject.getReadAt() || Date.now();
            conversation.setUnreadMessageCount(0);
            conversation.getLastMessage().setReadAt(messageReadAt);
            let index = Conversations.value.findIndex(
              (conversationObj: CometChat.Conversation) =>
                conversationObj.getLastMessage() &&
                (
                  conversationObj.getLastMessage() as CometChat.BaseMessage
                ).getId() == messageObject?.getId()
            );

            if (index >= 0) {
              let conversationList = Conversations.value;
              conversationList.splice(index, 1, conversation);
              Conversations.value = [...conversationList];
            }
          });
        }
      );
    }

    function unsubscribeToEvents() {
      ccGroupMemberAdded.value?.unsubscribe();
      ccGroupMemberKicked.value?.unsubscribe();
      ccGroupMemberBanned.value?.unsubscribe();
      ccMessageEdit.value?.unsubscribe();
      ccMessageSent.value?.unsubscribe();
      ccMessageEdited.value?.unsubscribe();
      ccMessageDelete.value?.unsubscribe();
      ccGroupDeleted.value?.unsubscribe();
      ccGroupLeft.value?.unsubscribe();
      ccUserBlocked.value?.unsubscribe();
      ccMessageRead.value?.unsubscribe();
    }

    //attaches Listeners for user activity , group activities and calling

    function attachListeners(callback: any) {
      try {
        if (!props.disableUsersPresence) {
          CometChat.addUserListener(
            userListenerId.value,
            new CometChat.UserListener({
              onUserOnline: (onlineUser: object) => {
                /* when someuser/friend comes online, user will be received here */
                callback(
                  CometChatUIKitConstants.userStatusType.online,
                  onlineUser
                );
              },
              onUserOffline: (offlineUser: object) => {
                /* when someuser/friend went offline, user will be received here */
                callback(
                  CometChatUIKitConstants.userStatusType.offline,
                  offlineUser
                );
              },
            })
          );
        }
        CometChat.addGroupListener(
          groupListenerId.value,
          new CometChat.GroupListener({
            onGroupMemberScopeChanged: (
              message: CometChat.Action,
              changedUser: CometChat.GroupMember,
              newScope: CometChat.GroupMemberScope,
              oldScope: CometChat.GroupMemberScope,
              changedGroup: CometChat.Group
            ) => {
              updateConversation(message);
            },
            onGroupMemberKicked: (
              message: CometChat.Action,
              kickedUser: CometChat.User,
              kickedBy: CometChat.User,
              kickedFrom: CometChat.Group
            ) => {
              if (loggedInUser?.getUid() == kickedUser.getUid()) {
                for (let i = 0; i < Conversations.value.length; i++) {
                  if (
                    Conversations.value[i].getConversationWith() instanceof
                    CometChat.Group
                  ) {
                    let selectedGroup: CometChat.Group = Conversations.value[
                      i
                    ].getConversationWith() as CometChat.Group;
                    if (kickedFrom.getGuid() == selectedGroup.getGuid()) {
                      Conversations.value.splice(i, 1);
                    }
                  }
                }
              } else {
                updateConversation(message);
              }
            },
            onGroupMemberBanned: (
              message: CometChat.Action,
              bannedUser: CometChat.User,
              bannedBy: CometChat.User,
              bannedFrom: CometChat.Group
            ) => {
              if (loggedInUser?.getUid() == bannedUser.getUid()) {
                for (let i = 0; i < Conversations.value.length; i++) {
                  if (
                    Conversations.value[i].getConversationWith() instanceof
                    CometChat.Group
                  ) {
                    let selectedGroup: CometChat.Group = Conversations.value[
                      i
                    ].getConversationWith() as CometChat.Group;
                    if (bannedFrom.getGuid() == selectedGroup.getGuid()) {
                      Conversations.value.splice(i, 1);
                    }
                  }
                }
              } else {
                updateConversation(message);
              }
            },
            onGroupMemberUnbanned: (
              message: CometChat.Action,
              unbannedUser: CometChat.User,
              unbannedBy: CometChat.User,
              unbannedFrom: CometChat.Group
            ) => {
              updateConversation(message);
            },
            onMemberAddedToGroup: (
              message: CometChat.Action,
              userAdded: CometChat.User,
              userAddedBy: CometChat.User,
              userAddedIn: CometChat.Group
            ) => {
              updateConversation(message);
            },
            onGroupMemberLeft: (message: any, leavingUser: any, group: any) => {
              if (loggedInUser?.getUid() == leavingUser.getUid()) {
                for (let i = 0; i < Conversations.value.length; i++) {
                  if (
                    Conversations.value[i].getConversationWith() instanceof
                    CometChat.Group
                  ) {
                    let selectedGroup: CometChat.Group = Conversations.value[
                      i
                    ].getConversationWith() as CometChat.Group;
                    if (group.getGuid() == selectedGroup.getGuid()) {
                      Conversations.value.splice(i, 1);
                    }
                  }
                }
              } else {
                updateConversation(message);
              }
            },
            onGroupMemberJoined: (
              message: CometChat.Action,
              joinedUser: CometChat.User,
              joinedGroup: CometChat.Group
            ) => {
              updateConversation(message);
            },
          })
        );
        CometChat.addMessageListener(
          conversationListenerId.value,
          new CometChat.MessageListener({
            onTextMessageReceived: (textMessage: object) => {
              callback(
                CometChatUIKitConstants.messages.TEXT_MESSAGE_RECEIVED,
                null,
                textMessage
              );
            },
            onMediaMessageReceived: (mediaMessage: object) => {
              callback(
                CometChatUIKitConstants.messages.MEDIA_MESSAGE_RECEIVED,
                null,
                mediaMessage
              );
            },
            onCustomMessageReceived: (customMessage: object) => {
              callback(
                CometChatUIKitConstants.messages.CUSTOM_MESSAGE_RECEIVED,
                null,
                customMessage
              );
            },
            onMessagesRead: (messageReceipt: any) => {
              if (!props.disableReceipt) {
                markAsRead(messageReceipt);
              }
            },
            onMessageDeleted: (deletedMessage: object) => {
              callback(
                CometChatUIKitConstants.messages.MESSAGE_DELETED,
                null,
                deletedMessage
              );
            },
            onMessageEdited: (editedMessage: object) => {
              callback(
                CometChatUIKitConstants.messages.MESSAGE_EDITED,
                null,
                editedMessage
              );
            },
            onMessagesDelivered: (messageReceipt: CometChat.MessageReceipt) => {
              if (!props.disableReceipt) {
                updateDeliveredMessage(messageReceipt);
              }
            },
            onTypingStarted: (cctypingIndicator: CometChat.TypingIndicator) => {
              if (!props.disableTyping) {
                const senderId = cctypingIndicator.getSender().getUid();

                const isReceiverTypeGroup =
                  cctypingIndicator.getReceiverType() ===
                  CometChatUIKitConstants.MessageReceiverType.group;
                const receiverId = cctypingIndicator.getReceiverId();
                let id: string | undefined;

                for (let i = 0; i < Conversations.value.length; i++) {
                  let convWith = Conversations.value[i].getConversationWith();
                  if (isReceiverTypeGroup) {
                    if (
                      convWith instanceof CometChat.Group &&
                      convWith.getGuid() === receiverId
                    ) {
                      id = convWith.getGuid();
                      break;
                    }
                  } else if (
                    convWith instanceof CometChat.User &&
                    convWith.getUid() === senderId
                  ) {
                    id = convWith.getUid();
                    break;
                  }
                }
                if (id != undefined) {
                  const newTypingIndicatorMap = new Map<
                    string,
                    CometChat.TypingIndicator
                  >(typingIndicatorMap.value);
                  newTypingIndicatorMap.set(id, cctypingIndicator);
                  typingIndicatorMap.value = newTypingIndicatorMap;
                }
              }
            },
            onTypingEnded: (cctypingIndicator: CometChat.TypingIndicator) => {
              const senderId = cctypingIndicator.getSender().getUid();
              const receiverId = cctypingIndicator.getReceiverId();
              let id: string | undefined;
              if (
                cctypingIndicator.getReceiverType() ===
                CometChatUIKitConstants.MessageReceiverType.user
              ) {
                if (typingIndicatorMap.value.has(senderId)) {
                  id = senderId;
                }
              } else if (
                typingIndicatorMap.value
                  .get(receiverId)
                  ?.getSender()
                  .getUid() === senderId
              ) {
                id = receiverId;
              }
              if (id !== undefined) {
                const newTypingIndicatorMap = new Map<
                  string,
                  CometChat.TypingIndicator
                >(typingIndicatorMap.value);
                newTypingIndicatorMap.delete(id);
                typingIndicatorMap.value = newTypingIndicatorMap;
              }
            },
          })
        );
      } catch (error: any) {
        if (props.onError) {
          props.onError(error);
        }
      }
    }

    //Removes all listeners
    function removeListeners() {
      try {
        CometChat.removeMessageListener(conversationListenerId.value);
        CometChat.removeUserListener(userListenerId.value);
        CometChat.removeGroupListener(groupListenerId.value);
      } catch (error: any) {
        if (props.onError) {
          props.onError(error);
        }
      }
    }

    // Fetches Conversations Details with all the users ==>>todo
    const getConversation = () => {
      if (conversationsRequestBuilder.value) {
        state.value = States.loading;
        try {
          fetchNextConversation()
            .then((conversationList: CometChat.Conversation[]) => {
              conversationList.forEach(
                (conversation: CometChat.Conversation) => {
                  if (
                    props.activeConversation &&
                    props.activeConversation !== null &&
                    props.activeConversation.getConversationType() ===
                      conversation.getConversationType()
                  ) {
                    if (
                      props.activeConversation.getConversationId() ==
                      conversation.getConversationId()
                    ) {
                      conversation.setUnreadMessageCount(0);
                    }
                  }
                }
              );
              Conversations.value = [
                ...Conversations.value,
                ...conversationList,
              ];
              if (
                conversationList.length <= 0 &&
                Conversations.value?.length <= 0
              ) {
                state.value = States.empty;
              } else {
                state.value = States.loaded;
              }
            })
            .catch((error: any) => {
              state.value = States.error;
            });
        } catch (error: any) {
          if (props.onError) {
            props.onError(error);
          }
        }
      } else {
        state.value = States.loaded;
      }
    };

    // function isReceiptDisable(conversation: CometChat.Conversation) {
    //   let id;
    //   if (conversation.getConversationType() == "group") {
    //     id = (conversation as any)?.conversationWith?.guid;
    //   } else if (conversation.getConversationType() == "user") {
    //     id = (conversation as any)?.conversationWith?.uid;
    //   }
    //   let item: any = conversation.getConversationWith();
    //   let message: CometChat.BaseMessage = conversation.getLastMessage();
    //   if (
    //     !props.disableReceipt &&
    //     message &&
    //     message?.getCategory() !=
    //       CometChatUIKitConstants.MessageCategory.action &&
    //     (!typingIndicatorMap.value ||
    //       (item?.uid != typingIndicatorMap.value.get(id)?.getReceiverId() &&
    //         item?.guid != typingIndicatorMap.value.get(id)?.getReceiverId())) &&
    //     message.getSender()?.getUid() == loggedInUser?.getUid()
    //   ) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }
    function isReceiptDisable(conversation: CometChat.Conversation): boolean {
      const lastMessage = conversation.getLastMessage();
      const convWith = conversation.getConversationWith();
      const id =
        convWith instanceof CometChat.User
          ? convWith.getUid()
          : convWith.getGuid();
      return (
        !props.disableReceipt &&
        isAMessage(lastMessage) &&
        lastMessage.getCategory() !==
          CometChatUIKitConstants.MessageCategory.action &&
        lastMessage.getSender().getUid() === loggedInUser?.getUid() &&
        typingIndicatorMap.value.get(id) === undefined
      );
    }

    //Updates the conversation list's last message , badgeCount , user presence based on activities propagated by listeners
    const conversationUpdated = (
      key: any,
      item: CometChat.User | CometChat.Group | null = null,
      message: CometChat.BaseMessage,
      options = null
    ) => {
      try {
        switch (key) {
          case CometChatUIKitConstants.userStatusType.offline:
          case CometChatUIKitConstants.userStatusType.online: {
            updateUser(item);
            break;
          }
          case CometChatUIKitConstants.messages.MESSAGE_READ: {
            updateConversation(message, false);
            break;
          }
          case CometChatUIKitConstants.messages.MESSAGE_DELIVERED: {
            updateConversation(message, false);
            break;
          }
          case CometChatUIKitConstants.messages.TEXT_MESSAGE_RECEIVED:
          case CometChatUIKitConstants.messages.MEDIA_MESSAGE_RECEIVED:
          case CometChatUIKitConstants.messages.CUSTOM_MESSAGE_RECEIVED:
            if (!props.disableReceipt) {
              markMessageAsDelivered(message);
            }
            updateConversation(message);
            break;
          case CometChatUIKitConstants.groupMemberAction.ADDED:
          case CometChatUIKitConstants.groupMemberAction.BANNED:
          case CometChatUIKitConstants.groupMemberAction.JOINED:
          case CometChatUIKitConstants.groupMemberAction.KICKED:
          case CometChatUIKitConstants.groupMemberAction.LEFT:
          case CometChatUIKitConstants.groupMemberAction.UNBANNED:
          case CometChatUIKitConstants.groupMemberAction.SCOPE_CHANGE:
            updateConversation(message);
            break;
          case CometChatUIKitConstants.messages.MESSAGE_EDITED:
          case CometChatUIKitConstants.messages.MESSAGE_DELETED:
            conversationEditedDeleted(message);
            break;
        }
      } catch (error: any) {
        if (props.onError) {
          props.onError(error);
        }
      }
    };

    const getIncrementUnreadCountBoolFromMetaData = (
      message: CometChat.BaseMessage & { getMetadata?: () => any }
    ) => {
      const metaDataGetterName = "getMetadata";
      const incrementUnreadCountFieldName = "incrementUnreadCount";
      let metaData: any;
      return (
        metaDataGetterName in message &&
        typeof message![metaDataGetterName] === "function" &&
        (metaData = message![metaDataGetterName]!()) &&
        typeof metaData === "object" &&
        incrementUnreadCountFieldName in metaData &&
        Boolean(metaData["incrementUnreadCount"])
      );
    };

    const markMessageAsDelivered = async (message: CometChat.BaseMessage) => {
      if (
        message.getSender().getUid() !== loggedInUser?.getUid() &&
        !props.disableReceipt &&
        !message.getDeliveredAt()
      ) {
        try {
          await CometChat.markAsDelivered(message);
        } catch (error: any) {
          if (props.onError) {
            props.onError(error);
          }
        }
      }
      if (
        !props.disableSoundForMessages &&
        !(
          (message.getCategory() ===
            CometChatUIKitConstants.MessageCategory.custom &&
            !getIncrementUnreadCountBoolFromMetaData(message)) ||
          (props.activeConversation &&
            props.activeConversation.getConversationId() ===
              message.getConversationId())
        )
      ) {
        playAudio();
      }

      if (
        props.activeConversation?.getConversationType() ==
        CometChatUIKitConstants.MessageReceiverType.user
      ) {
        //if chat window is not open, mark message as delivered
        if (
          (!props.activeConversation ||
            (
              props.activeConversation?.getConversationWith() as CometChat.User
            )?.getUid() !== message?.getSender()?.getUid()) &&
          Object.prototype.hasOwnProperty.call(message, "deliveredAt")
          // !message.hasOwnProperty("deliveredAt")
        ) {
          try {
            CometChat.markAsDelivered(message);
          } catch (error: any) {
            if (props.onError) {
              props.onError(error);
            }
          }
        }
      } else {
        if (
          (!props.activeConversation ||
            (
              props.activeConversation?.getConversationWith() as CometChat.Group
            )?.getGuid() !== message?.getReceiverId()) &&
          Object.prototype.hasOwnProperty.call(message, "deliveredAt")
        ) {
          {
            try {
              CometChat.markAsDelivered(message);
            } catch (error: any) {
              if (props.onError) {
                props.onError(error);
              }
            }
          }
        }
      }
    };

    const getUinx = () => {
      return String(Math.round(+new Date() / 1000));
    };

    function markAsRead(readMessage: CometChat.MessageReceipt) {
      let conversationlist: CometChat.Conversation[] = [...Conversations.value];
      const conversationKey = conversationlist.findIndex(
        (conversationObj: CometChat.Conversation) =>
          (
            conversationObj.getLastMessage() as CometChat.BaseMessage
          ).getReceiverId() == readMessage.getSender().getUid()
      );
      if (conversationKey > -1) {
        let newConversationObject!: CometChat.Conversation;
        if (
          !(
            conversationlist[
              conversationKey
            ].getLastMessage() as CometChat.TextMessage
          ).getReadAt()
        ) {
          newConversationObject = conversationlist[conversationKey];
          (
            newConversationObject.getLastMessage() as CometChat.TextMessage
          ).setReadAt(readMessage.getReadAt());
          (
            newConversationObject.getLastMessage() as CometChat.TextMessage
          ).setMuid(getUinx());
          conversationlist.splice(conversationKey, 1, newConversationObject);
          Conversations.value = [...conversationlist];
        }
      }
    }

    // Updates Detail when user comes online/offline
    function updateUser(user: CometChat.User | CometChat.Group | null) {
      try {
        //when user updates
        const conversationlist: CometChat.Conversation[] = [
          ...Conversations.value,
        ];
        //Gets the index of user which comes offline/online
        const conversationKey = conversationlist.findIndex(
          (conversationObj: CometChat.Conversation) =>
            conversationObj.getConversationType() ===
              CometChatUIKitConstants.MessageReceiverType.user &&
            (
              conversationObj.getConversationWith() as CometChat.User
            ).getUid() === (user as CometChat.User).getUid()
        );
        if (conversationKey > -1) {
          let conversationObj: CometChat.Conversation =
            conversationlist[conversationKey];
          let conversationWithObj: CometChat.User =
            conversationObj.getConversationWith() as CometChat.User;
          conversationWithObj.setStatus((user as CometChat.User).getStatus());
          let newConversationObj: CometChat.Conversation = conversationObj;
          newConversationObj.setConversationWith(conversationWithObj);
          (
            newConversationObj.getLastMessage() as CometChat.TextMessage
          ).setMuid(getUinx());
          conversationlist.splice(conversationKey, 1, newConversationObj);
          Conversations.value = conversationlist;
        }
      } catch (error: any) {
        if (props.onError) {
          props.onError(error);
        }
      }
    }

    function makeLastMessage(message: CometChat.BaseMessage) {
      const newMessage = message;
      return newMessage;
    }

    function updateConversation(
      message: CometChat.BaseMessage,
      notification = true
    ) {
      try {
        makeConversation(message)
          .then((response: any) => {
            const conversationKey = response.conversationKey;

            const conversationObj: CometChat.Conversation =
              response.conversationObj;
            const conversationList = response.conversationList;
            if (conversationKey > -1) {
              let lastMessageObj: CometChat.BaseMessage =
                makeLastMessage(message);
              let newConversationObj: CometChat.Conversation = conversationObj;
              newConversationObj.setLastMessage(lastMessageObj);
              makeUnreadMessageCount(conversationObj);

              (
                newConversationObj.getLastMessage() as CometChat.TextMessage
              ).setMuid(getUinx());
            } else {
              let lastMessageObj = makeLastMessage(message);
              conversationObj.setLastMessage(lastMessageObj);
              makeUnreadMessageCount(conversationObj);

              conversationList.unshift(conversationObj);
              Conversations.value = conversationList;
            }
          })
          .catch((error: any) => {
            if (props.onError) {
              props.onError(error);
            }
          });
      } catch (error: any) {
        if (props.onError) {
          props.onError(error);
        }
      }
    }

    function updateConversationObject(conversation: CometChat.Conversation) {
      let index = Conversations.value.findIndex(
        (element: CometChat.Conversation) =>
          element.getConversationId() == conversation.getConversationId()
      );

      Conversations.value.splice(index, 1);

      Conversations.value.unshift(conversation);
    }

    function updateDeliveredMessage(messageReceipt: CometChat.MessageReceipt) {
      let conversationList: CometChat.Conversation[] = [...Conversations.value];
      let conversationKey: number = conversationList.findIndex(
        (c: CometChat.Conversation) =>
          (c.getLastMessage() as CometChat.TextMessage).getId() ==
          Number(messageReceipt.getMessageId())
      );
      let conversationObj: CometChat.Conversation;
      if (conversationKey > -1) {
        conversationObj = conversationList[conversationKey];
        if (
          !(
            conversationObj.getLastMessage() as CometChat.TextMessage
          ).getDeliveredAt()
        ) {
          (
            conversationObj.getLastMessage() as CometChat.TextMessage
          ).setDeliveredAt(messageReceipt.getDeliveredAt());
          (conversationObj.getLastMessage() as CometChat.TextMessage).setMuid(
            getUinx()
          );
          conversationList.splice(conversationKey, 1, conversationObj);
          Conversations.value = [...conversationList];
        }
      }
    }

    const META_DATA_GETTER_NAME = "getMetaData";

    function makeUnreadMessageCount(conversation: CometChat.Conversation) {
      //es-lint-disable-next-line
      const message = conversation.getLastMessage();

      if (!isAMessage(message)) {
        return;
      }
      let incrementUnreadCount = false;
      if (
        META_DATA_GETTER_NAME in message &&
        // eslint-disable-next-line
        //@ts-ignore
        message[META_DATA_GETTER_NAME] instanceof Function
      ) {
        // eslint-disable-next-line
        //@ts-ignore
        const metaData = message[META_DATA_GETTER_NAME]();
        incrementUnreadCount = Boolean(
          typeof metaData === "object" && metaData?.["incrementUnreadCount"]
        );
      }
      incrementUnreadCount =
        (incrementUnreadCount ||
          message.getCategory() ===
            CometChatUIKitConstants.MessageCategory.message) &&
        message.getSender().getUid() !== loggedInUser?.getUid();

      const targetId = conversation.getConversationId();

      let selectedConversationIndex = -1;
      const selectedConversation = Conversations.value.find((conv, index) => {
        selectedConversationIndex = index;
        return conv.getConversationId() == targetId;
      });

      if (selectedConversation) {
        selectedConversation.setUnreadMessageCount(
          selectedConversation.getUnreadMessageCount() +
            Number(incrementUnreadCount)
        );

        let allConversations = Conversations.value;
        if (selectedConversationIndex != -1) {
          allConversations[selectedConversationIndex] = selectedConversation;
        }

        allConversations.splice(selectedConversationIndex, 1);
        Conversations.value = [selectedConversation, ...allConversations];
      } else {
        conversation.setUnreadMessageCount(
          conversation.getUnreadMessageCount() + Number(incrementUnreadCount)
        );
        Conversations.value = [conversation, ...Conversations.value];
      }
      return selectedConversation?.getUnreadMessageCount()
        ? selectedConversation?.getUnreadMessageCount()
        : 0;
    }
    //Changes detail of conversations
    function makeConversation(message: CometChat.BaseMessage) {
      const promise = new Promise((resolve, reject) => {
        CometChat.CometChatHelper.getConversationFromMessage(message)
          .then((conversation: CometChat.Conversation) => {
            let conversationList: CometChat.Conversation[] = [
              ...Conversations.value,
            ];
            let conversationKey: number = conversationList.findIndex(
              (c: CometChat.Conversation) =>
                c?.getConversationId() === conversation.getConversationId()
            );
            let conversationObj: CometChat.Conversation = conversation;
            if (conversationKey > -1) {
              conversationObj = conversationList[conversationKey];
            }
            resolve({
              conversationKey: conversationKey,
              conversationObj: conversationObj,
              conversationList: conversationList,
            });
          })
          .catch((error: any) => reject(error));
      });
      return promise;
    }

    /**
     * Updates Conversation View when message is edited or deleted
     */
    function conversationEditedDeleted(message: CometChat.BaseMessage) {
      try {
        makeConversation(message)
          .then((response: any) => {
            const conversationKey = response.conversationKey;
            const conversationObj: CometChat.Conversation =
              response.conversationObj;
            const conversationList = response.conversationList;
            if (conversationKey > -1) {
              let lastMessageObj: CometChat.BaseMessage =
                conversationObj.getLastMessage();
              if (lastMessageObj.getId() === message.getId()) {
                conversationObj.setLastMessage(message);
                (
                  conversationObj.getLastMessage() as CometChat.TextMessage
                ).setMuid(getUinx());

                conversationList.splice(conversationKey, 1, conversationObj);
                Conversations.value = [...conversationList];
              }
            }
          })
          .catch((error: any) => {
            if (props.onError) {
              props.onError(error);
            }
          });
      } catch (error: any) {
        if (props.onError) {
          props.onError(error);
        }
      }
    }

    //Plays Audio When Message is Received
    function playAudio() {
      try {
        if (!props.disableSoundForMessages) {
          if (props.customSoundForMessages) {
            CometChatSoundManager.play(props.customSoundForMessages);
          } else {
            CometChatSoundManager.play(
              CometChatSoundManager.Sound.incomingMessageFromOther
            );
          }
        } else {
          return;
        }
      } catch (error: any) {
        if (props.onError) {
          props.onError(error);
        }
      }
    }

    /*
     * Updates the convesation list when deleted.
     * Adding Conversation Object to CometchatService
     */
    function updateConversationList(
      conversation: CometChat.Conversation | null
    ) {
      let index = Conversations.value.findIndex(
        (element: CometChat.Conversation) =>
          element?.getConversationId() == conversation?.getConversationId()
      );
      Conversations.value.splice(index, 1);
    }

    const showConfirmationDialog = (conversation: CometChat.Conversation) => {
      isDialogOpen.value = true;
    };

    function onOptionClick(event: any, conversation: CometChat.Conversation) {
      let option: CometChatOption = event?.detail?.data;
      if (option.id == CometChatUIKitConstants.ConversationOptions.delete) {
        conversationToBeDeleted.value = conversation;
      }

      if (option) {
        option.onClick?.();
      }
    }

    function getActiveConversation(conversation: CometChat.Conversation) {
      if (props.selectionMode == SelectionMode.none || !props.selectionMode) {
        return (
          conversation?.getConversationId() ==
          props.activeConversation?.getConversationId()
        );
      } else {
        return false;
      }
    }
    // calling cometchat.deleteConversation method

    function deleteSelectedConversation() {
      if (conversationToBeDeleted.value) {
        if (
          props.activeConversation &&
          props.activeConversation.getConversationId() ==
            conversationToBeDeleted.value.getConversationId()
        ) {
          myactiveConversation.value = null;
        }
        let conversationWith;
        let conversationType =
          conversationToBeDeleted.value.getConversationType();
        if (
          conversationType === CometChatUIKitConstants.MessageReceiverType.user
        ) {
          conversationWith = (
            conversationToBeDeleted.value.getConversationWith() as CometChat.User
          ).getUid();
        } else {
          conversationWith = (
            conversationToBeDeleted.value.getConversationWith() as CometChat.Group
          ).getGuid();
        }
        CometChat.deleteConversation(conversationWith, conversationType)
          .then((deletedConversation) => {
            CometChatConversationEvents.ccConversationDeleted.next(
              conversationToBeDeleted.value!
            );
            updateConversationList(conversationToBeDeleted.value);
            conversationToBeDeleted.value = null;
            isDialogOpen.value = false;
          })
          .catch((error) => {
            if (props.onError) {
              props.onError(error);
            }
          });
      }
    }

    // exposed methods to users.
    function updateLastMessage(message: CometChat.BaseMessage) {
      updateConversation(message);
    }

    function removeConversation(conversation: CometChat.Conversation) {
      const targetConvId = conversation.getConversationId();
      const targetIdx = Conversations.value.findIndex(
        (conv) => conv.getConversationId() === targetConvId
      );
      if (targetIdx > -1) {
        const convWith = Conversations.value[targetIdx].getConversationWith();
        const convWithId =
          convWith instanceof CometChat.User
            ? convWith.getUid()
            : convWith.getGuid();
        let newTypingIndicatorMap: Map<string, CometChat.TypingIndicator>;
        if (typingIndicatorMap.value.has(convWithId)) {
          newTypingIndicatorMap = new Map(typingIndicatorMap.value);
          newTypingIndicatorMap.delete(convWithId);
        } else {
          newTypingIndicatorMap = typingIndicatorMap.value;
        }
      }

      updateConversationList(conversation);
    }

    // getting default conversation option and adding callback in it
    function setConversationOptions(item: CometChat.Conversation) {
      let allOptions;
      if (props.options) {
        allOptions = props.options(item);
      } else {
        allOptions = ConversationUtils.getDefaultOptions();
      }

      allOptions.forEach((element: CometChatOption) => {
        if (
          !element.onClick &&
          element.id == CometChatUIKitConstants.ConversationOptions.delete
        ) {
          element.onClick = deleteConversationOnClick;
          element.iconTint = "red";
        }
      });
      return allOptions;
    }

    onMounted(() => {
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

      if (props.conversationsRequestBuilder) {
        conversationsRequestBuilder.value =
          props.conversationsRequestBuilder?.build();
      } else {
        conversationsRequestBuilder.value =
          props.conversationsRequestBuilder ||
          new CometChat.ConversationsRequestBuilder().setLimit(limit).build();
      }
      state.value = States.loading;

      try {
        getConversation();
        attachListeners(conversationUpdated);
      } catch (error: any) {
        if (props.onError) {
          props.onError(error);
        }
      }
    });

    onUpdated(() => {
      if (
        (!activeConversationTmp && props.activeConversation) ||
        (activeConversationTmp && !props.activeConversation) ||
        (activeConversationTmp &&
          props.activeConversation &&
          activeConversationTmp.getConversationId() !=
            props.activeConversation.getConversationId())
      ) {
        activeConversationTmp = props.activeConversation!;
        resetUnreadCount();
      }
      /**
       * When user sends message conversationList is updated with latest message
       */
    });

    onBeforeUnmount(() => {
      try {
        removeListeners();
        unsubscribeToEvents();
      } catch (error: any) {
        if (props.onError) {
          props.onError(error);
        }
      }
    });

    // reset unread count
    function onClick(conversation: CometChat.Conversation) {
      if (props.onItemClick) {
        props.onItemClick(conversation);
      }
    }

    function checkStatusType(conversation: CometChat.Conversation) {
      let user: CometChat.User =
        conversation.getConversationWith() as CometChat.User;
      if (
        conversation.getConversationType() ==
          CometChatUIKitConstants.MessageReceiverType.user &&
        !props.disableUsersPresence
      ) {
        if (
          user.getStatus() === CometChatUIKitConstants.userStatusType.online
        ) {
          return statusColor.value[user.getStatus()];
        } else return null;
      } else {
        return statusColor.value[conversation.getConversationType()];
      }
    }

    function checkGroupType(conversation: CometChat.Conversation): string {
      let statusIndicatorIcon = "";
      const convWith = conversation.getConversationWith();

      if (convWith instanceof CometChat.Group) {
        switch (convWith.getType()) {
          case CometChatUIKitConstants.GroupTypes.password:
            statusIndicatorIcon = props.protectedGroupIcon ?? PasswordGroupIcon;

            break;
          case CometChatUIKitConstants.GroupTypes.private:
            statusIndicatorIcon = props.privateGroupIcon ?? PrivateGroupIcon;

            break;
          default:
            break;
        }
      }

      return statusIndicatorIcon;
    }

    // callback for cancelDialogComponent
    const onCancelClick = () => {
      isDialogOpen.value = false;
      conversationToBeDeleted.value = null;
    };
    //style

    const wrapperStyle = (): any => {
      return {
        height: props.conversationsStyle.height || "100%",
        width: props.conversationsStyle.width || "100%",
        border:
          props.conversationsStyle.border ||
          `1px solid ${theme.value.palette.getAccent100()}`,
        borderRadius: props.conversationsStyle.borderRadius || "0",
        background:
          props.conversationsStyle.background ||
          theme.value.palette.getBackground(),
        position: "relative",
        boxShadow: props.conversationsStyle?.boxShadow || "",
      };
    };
    // set unread count
    function resetUnreadCount() {
      if (props.activeConversation) {
        const conversationlist: CometChat.Conversation[] = [
          ...Conversations.value,
        ];
        //Gets the index of user which comes offline/online
        const conversationKey = conversationlist.findIndex(
          (conversationObj: CometChat.Conversation) =>
            conversationObj?.getConversationId() ===
            props.activeConversation?.getConversationId()
        );
        if (conversationKey > -1) {
          let conversationObj: CometChat.Conversation =
            conversationlist[conversationKey];
          let newConversationObj: CometChat.Conversation = conversationObj;
          newConversationObj.setUnreadMessageCount(0);
          (
            newConversationObj.getLastMessage() as CometChat.TextMessage
          )?.setMuid(getUinx());
          conversationlist.splice(conversationKey, 1, newConversationObj);
          Conversations.value = [...conversationlist];
        }
      }
    }

    function setThemeStyle() {
      // setGroupsStyle();
      setAvatarStyle();
      setBadgeStyle();
      setListItemStyle();
      setConfirmDialogStyle();
      setConversationsStyle();
      setDateStyle();
      setStatusStyle();
      setReceiptStyle();

      statusColor.value.private =
        props.conversationsStyle?.privateGroupIconBackground ||
        theme.value.palette.getSuccess() ||
        "rgb(0, 200, 111)";
      statusColor.value.password =
        props.conversationsStyle?.passwordGroupIconBackground ||
        "rgb(247, 165, 0)";
      statusColor.value.online =
        props.conversationsStyle?.onlineStatusColor ??
        theme.value.palette.getSuccess();

      listStyle.value = {
        height: "100%",

        titleTextFont: myConversationStyle.value.titleTextFont,
        titleTextColor: myConversationStyle.value.titleTextColor,
        emptyStateTextFont: myConversationStyle.value.emptyStateTextFont,
        emptyStateTextColor: myConversationStyle.value.emptyStateTextColor,
        errorStateTextFont: myConversationStyle.value.errorStateTextFont,
        errorStateTextColor: myConversationStyle.value.errorStateTextColor,
        loadingIconTint: myConversationStyle.value.loadingIconTint,
        separatorColor: myConversationStyle.value.separatorColor,
        background: myConversationStyle.value.background,
      };
      iconStyle.value.iconTint = theme.value.palette.getAccent400();
      //this.ref.detectChanges();
    }

    function setConversationsStyle() {
      let defaultStyle: ConversationsStyle = new ConversationsStyle({
        lastMessageTextFont: fontHelper(theme.value.typography.subtitle2),
        lastMessageTextColor: theme.value.palette.getAccent600(),

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

        privateGroupIconBackground: theme.value.palette.getSuccess(),
        passwordGroupIconBackground: "RGB(247, 165, 0)",
        typingIndictorTextColor: theme.value.palette.getPrimary(),
        typingIndictorTextFont: fontHelper(theme.value.typography.subtitle2),
        threadIndicatorTextFont: fontHelper(theme.value.typography.caption2),
        threadIndicatorTextColor: theme.value.palette.getAccent600(),
      });
      myConversationStyle.value = {
        ...defaultStyle,
        ...myConversationStyle.value,
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
    function setBadgeStyle() {
      let defaultStyle: BadgeStyle = new BadgeStyle({
        textFont: fontHelper(theme.value.typography.subtitle2),
        textColor: theme.value.palette.getAccent("dark"),
        background: theme.value.palette.getPrimary(),
        borderRadius: "16px",
        width: "24px",
      });
      mybadgeStyle.value = { ...defaultStyle, ...mybadgeStyle.value };
    }

    function setConfirmDialogStyle() {
      let defaultStyle: ConfirmDialogStyle = new ConfirmDialogStyle({
        confirmButtonBackground: theme.value.palette.getError(),
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
      });
      mydeleteConversationDialogStyle.value = {
        ...defaultStyle,
        ...mydeleteConversationDialogStyle.value,
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

    function setDateStyle() {
      let defaultStyle: DateStyle = new DateStyle({
        textFont: fontHelper(theme.value.typography.caption2),
        textColor: theme.value.palette.getAccent600(),
        background: "transparent",
      });
      mydateStyle.value = { ...defaultStyle, ...mydateStyle.value };
    }
    function setStatusStyle() {
      let defaultStyle: BaseStyle = {
        height: "12px",
        width: "12px",
        border: "none",
        borderRadius: "24px",
      };
      mystatusStyle.value = { ...defaultStyle, ...mystatusStyle.value };
    }
    function setReceiptStyle() {
      let defaultStyle: ReceiptStyle = new ReceiptStyle({
        waitIconTint: theme.value.palette.getAccent700(),
        sentIconTint: theme.value.palette.getAccent600(),
        deliveredIconTint: theme.value.palette.getAccent600(),
        readIconTint: theme.value.palette.getPrimary(),
        errorIconTint: theme.value.palette.getError(),
      });
      myreceiptStyle.value = { ...defaultStyle, ...myreceiptStyle.value };
    }

    const subtitleStyle = (conversation: any) => {
      let id;
      if (conversation.getConversationType() == "group") {
        id = (conversation as any)?.conversationWith?.guid;
      } else if (conversation.getConversationType() == "user") {
        id = (conversation as any)?.conversationWith?.uid;
      }

      if (
        typingIndicatorMap.value.get(id) &&
        ((typingIndicatorMap.value.get(id)?.getReceiverType() ==
          CometChatUIKitConstants.MessageReceiverType.user &&
          typingIndicatorMap.value.get(id)?.getSender().getUid() ==
            conversation.conversationWith?.uid) ||
          typingIndicatorMap.value.get(id)?.getReceiverId() ==
            conversation.conversationWith?.guid)
      ) {
        return {
          font: myConversationStyle.value.typingIndictorTextColor,
          color: myConversationStyle.value.typingIndictorTextColor,
        };
      }
      return {
        font: myConversationStyle.value.lastMessageTextFont,
        color: myConversationStyle.value.lastMessageTextColor,
      };
    };
    const itemThreadIndicatorStyle = () => {
      return {
        textFont:
          props.conversationsStyle.threadIndicatorTextFont ||
          fontHelper(theme.value.typography.caption2),
        textColor:
          props.conversationsStyle.threadIndicatorTextColor ||
          theme.value.palette.getAccent400(),
      };
    };

    const getMessageReceipt = (conversation: CometChat.Conversation) => {
      let receipt = MessageReceiptUtils.getReceiptStatus(
        conversation.getLastMessage()
      );
      return receipt;
    };

    const setSubtitle = (conversationObject: CometChat.Conversation) => {
      let subtitle = ConversationUtils.getLastConversationMessage(
        conversationObject,
        loggedInUser!
      );
      let id;

      if (conversationObject.getConversationType() == "group") {
        id = (conversationObject as any)?.conversationWith?.guid;
      } else if (conversationObject.getConversationType() == "user") {
        id = (conversationObject as any)?.conversationWith?.uid;
      }

      if (typingIndicatorMap.value.get(id)) {
        const isTyping =
          (conversationObject as any)?.conversationWith?.guid ==
          typingIndicatorMap.value.get(id)?.getReceiverId();
        if (isTyping) {
          subtitle = `${typingIndicatorMap.value
            .get(id)
            ?.getSender()
            .getName()} ${localize("IS_TYPING")}`;
          return subtitle;
        } else if (
          (conversationObject as any)?.conversationWith?.uid ==
            typingIndicatorMap.value.get(id)?.getSender().getUid() &&
          typingIndicatorMap.value.get(id)?.getReceiverType() !==
            CometChatUIKitConstants.MessageReceiverType.group
        ) {
          subtitle = localize("IS_TYPING");
          return subtitle;
        }
      }
      let icon =
        conversationObject?.getLastMessage()?.getType() ==
        CometChatUIKitConstants.MessageTypes.audio
          ? "📞 "
          : "📹 ";
      if (conversationObject?.getLastMessage()?.getType() == "meeting") {
        return icon + subtitle;
      } else {
        return conversationObject?.getLastMessage()?.getCategory() ==
          CometChatUIKitConstants.MessageCategory.call
          ? icon + subtitle
          : subtitle;
      }
    };

    function getbackdropStyle() {
      return {
        height: "100%",
        width: "100%",
        background: props.backdropStyle?.background || "rgba(0, 0, 0, 0.5)",
      };
    }

    ///
    return {
      Conversations,
      onClick,
      getActiveConversation,
      checkGroupType,
      isDialogOpen,
      onConfirmClick,
      onCancelClick,
      myavatarStyle,
      myListItemStyle,
      mydeleteConversationDialogStyle,
      myreceiptStyle,
      listStyle,
      iconStyle,
      setSubtitle,
      setStatusIndicatorStyle,
      checkStatusType,
      itemThreadIndicatorStyle,
      subtitleStyle,
      threadText,
      isReceiptDisable,
      getMessageReceipt,
      SelectionMode,

      menustyle,
      ConversationUtils,
      DatePatterns,
      onOptionClick,
      getConversation,
      state,
      myoptions,
      mydateStyle,
      mybadgeStyle,
      wrapperStyle,
      ThreadIcon,
      getbackdropStyle,
      setConversationOptions,
    };
  },
});
</script>

<style scoped>
/* .cc-conversations {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 16px;
  position: relative;
} */
/* .cc-conversations__selection-view {
  position: relative;
} */
.tail__view {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.cc-conversations__menus {
  position: absolute;
  right: 12px;
  cursor: pointer;
}

.cc-conversations__default-subtitle-view {
  display: flex;
  align-items: center;
  width: 90%;
  flex-direction: column;
  justify-content: flex-start;
}
.cc-conversations__subtitle {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  align-items: center;
  min-height: 22px;
}
.cc-conversations__thread-view {
  height: 12px;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  align-items: center;
}
</style>
