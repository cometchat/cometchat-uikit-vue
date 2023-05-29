<template>
  <div
    v-if="confirmDialogView && confirmDialogView.html"
    v-html="confirmDialogView.html"
  ></div>
  <component
    v-else-if="confirmDialogView && confirmDialogView.componentName"
    :is="confirmDialogView.componentName!"
    v-bind="{ ...confirmDialogView.props }"
    v-on="confirmDialogView?.listeners"
  >
    <template v-for="(html, key) in confirmDialogView.slots" :key="key">
      <div :v-slot="[key]" :v-html="html"></div>
    </template>
  </component>
  <div
    class="cc-messagelist__messageindicator"
    v-if="
      newMessageCount && UnreadCount && UnreadCount.length > 0 && !isOnBottom
    "
  >
    <cometchat-button
      :text="newMessageCount"
      :buttonStyle="unreadMessagesStyle"
      @cc-button-clicked="scrollToBottom(false)"
    ></cometchat-button>
  </div>
  <div class="cc__messagelist__headerview" style="MessageListHeaderStyle()">
    <div v-if="headerView">
      <div v-if="headerView.html" v-html="headerView.html"></div>
      <component
        v-else
        :is="headerView.componentName!"
        v-bind="{ ...headerView.props }"
        v-on="headerView ? headerView : {}"
      >
        <template v-for="(html, key) in headerView.slots" :key="key">
          <div :v-slot="[key]" :v-html="html"></div>
        </template>
      </component>
    </div>
  </div>
  <div class="cc-messagelist" :style="getMessageListDivStyle()">
    <CometChatList
      title=""
      :titleAlignment="TitleAlignment.center"
      :hideSearch="true"
      sectionHeaderKey=""
      :searchIconURL="SearchIcon"
      searchPlaceholderText="Search for Messages"
      searchText=""
      :onSearch="undefined"
      :list="messagesList"
      listItemKey="getId"
      :onScrolledToBottom="bottomCallback"
      :onScrolledToTop="topCallback"
      :showSectionHeader="false"
      :state="componentState"
      :loadingIconURL="loadingIconURL"
      :hideError="hideError"
      :errorStateText="errorStateText"
      :emptyStateText="emptyStateText"
      :theme="theme"
      :scrollToBottom="setScrollListToBottom"
      :emptyView="getEmptyHtml()"
      :loadingView="getLoaderHtml()"
      :errorView="getErrorHtml()"
      :listStyle="getListStyle()"
    >
      <template v-slot:listItem="{ item, index }">
        <div class="cc-messagelist__date__container">
          <span
            class="cc-messagelist__date"
            v-html="getMessageBubbleDate(item, index)"
          ></span>
        </div>

        <div v-if="getBubbleWrapper(item)">
          <div
            v-if="getBubbleWrapper(item).html"
            v-html="getBubbleWrapper(item).html"
          ></div>
          <component
            v-else
            :is="getBubbleWrapper(item).componentName"
            v-bind="{ ...getBubbleWrapper(item).props }"
            v-on="getBubbleWrapper(item) ? getBubbleWrapper(item) : {}"
          >
            <template
              v-for="(html, key) in getBubbleWrapper(item).slots"
              :key="key"
            >
              <div :v-slot="[key]" :v-html="html"></div>
            </template>
          </component>
        </div>
        <CometChatMessageBubble
          v-else
          :id="item?.getId() || item?.getMuid()"
          :messageBubbleStyle="
            MessageBubbleStyle(item, alignment, getLoggedinUser())
          "
          :options="setMessageOptions(item)"
          :alignment="getBubbleAlignment(item)"
          :replyView="undefined"
          :leadingView="getBubbleLeadingView(item)"
          :contentView="getContentView(item)"
          :bottomView="getBottomView(item)"
          :footerView="getBubbleFooterView(item)"
          :headerView="getBubbleHeaderView(item)"
          :threadView="getBubbleThreadView(item)"
        >
        </CometChatMessageBubble>
      </template>
    </CometChatList>
  </div>
  <div class="cc__messagelist__footerview" :style="MessageListFooterStyle()">
    <div v-if="showSmartReplyRef && getSmartReplyView()">
      <div
        v-if="getSmartReplyView()!.html"
        v-html="getSmartReplyView()!.html"
      ></div>
      <component
        v-else
        :is="getSmartReplyView()!.componentName!"
        v-bind="{ ...getSmartReplyView()!.props }"
        v-on="getSmartReplyView()!.listeners ? getSmartReplyView()!.listeners : {}"
      >
        <template v-for="(html, key) in getSmartReplyView()!.slots" :key="key">
          <div :v-slot="[key]" :v-html="html"></div>
        </template>
      </component>
    </div>
    <div v-if="footerView">
      <div v-if="footerView.html" v-html="footerView.html"></div>
      <component
        v-else
        :is="footerView.componentName!"
        v-bind="{ ...footerView.props }"
        v-on="footerView ? footerView : {}"
      >
        <template v-for="(html, key) in footerView.slots" :key="key">
          <div :v-slot="[key]" :v-html="html"></div>
        </template>
      </component>
    </div>
    <div v-if="showOngoingCallRef && getOngoingCallView()">
      <div
        v-if="getOngoingCallView()!.html"
        v-html="getOngoingCallView()!.html"
      ></div>
      <component
        v-else
        :is="getOngoingCallView()!.componentName!"
        v-bind="{ ...getOngoingCallView()!.props }"
        v-on="getOngoingCallView()!.listeners ? getOngoingCallView()!.listeners : {}"
      >
        <template v-for="(html, key) in getOngoingCallView()!.slots" :key="key">
          <div :v-slot="[key]" :v-html="html"></div>
        </template>
      </component>
    </div>
  </div>
</template>

<script lang="ts">
import {
  onBeforeMount,
  ref,
  defineComponent,
  PropType,
  onMounted,
  onUnmounted,
  Ref,
  onBeforeUpdate,
  onUpdated,
  nextTick,
  inject,
} from "vue";
import "my-cstom-package-lit";
import CometChatList from "../CometChatList/index.vue";
import CometChatSmartReplyBubble from "../Extensions/SmartReplies/CometChatSmartReplyBubble/index.vue";
import CometChatConfirmDialogView from "../shared/Views/CometChatConfirmDialogView/index.vue";

const MessageLabelStyle = {
  textFont: "400 11px Inter",
  textColor: "grey",
};

export const MessageListFooterStyle = () => {
  return {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    height: "auto",
  };
};

const MessageDateStyle = (
  dateSeparatorStyle: DateStyle,
  theme: Ref<CometChatTheme>
) => {
  dateSeparatorStyle.background =
    dateSeparatorStyle.background || theme.value.palette.getAccent600();
  let defaultDateStyle = new DateStyle({
    textFont: fontHelper(theme.value.typography.subtitle1),
    textColor: theme.value.palette.getAccent600(),
    background: theme.value.palette.getAccent100(),
    height: "100%",
    width: "100%",
    border: `1px solid ${theme.value.palette.getAccent100()}`,
    borderRadius: "8px",
  });

  return { ...defaultDateStyle, ...dateSeparatorStyle };
};

const EmptyViewStyle = (
  messageListStyle: MessageListStyle,
  theme: Ref<CometChatTheme>
) => {
  let tempMessageListStyle = {
    ...TempMessageListStyle(theme),
    ...messageListStyle,
  };
  return {
    textFont: tempMessageListStyle.emptyStateTextFont,
    textColor: tempMessageListStyle.emptyStateTextColor,
  };
};

const ErrorViewStyle = (
  messageListStyle: MessageListStyle,
  theme: Ref<CometChatTheme>
) => {
  let tempMessageListStyle = {
    ...TempMessageListStyle(theme),
    ...messageListStyle,
  };
  return {
    textFont: tempMessageListStyle.errorStateTextFont,
    textColor: tempMessageListStyle.errorStateTextColor,
  };
};

const TempMessageListStyle = (theme: Ref<CometChatTheme>) => {
  return new MessageListStyle({
    background: theme.value.palette.getBackground(),
    border: `none`,
    emptyStateTextFont: fontHelper(theme.value.typography.title1),
    emptyStateTextColor: theme.value.palette.getAccent600(),
    errorStateTextFont: fontHelper(theme.value.typography.title1),
    errorStateTextColor: theme.value.palette.getAccent600(),
    loadingIconTint: theme.value.palette.getAccent600(),
    nameTextFont: fontHelper(theme.value.typography.title2),
    nameTextColor: theme.value.palette.getAccent600(),
    threadReplySeparatorColor: theme.value.palette.getAccent400(),
    threadReplyTextFont: fontHelper(theme.value.typography.subtitle1),
    threadReplyIconTint: theme.value.palette.getAccent600(),
    threadReplyTextColor: theme.value.palette.getAccent600(),
    TimestampTextFont: fontHelper(theme.value.typography.caption2),
    TimestampTextColor: theme.value.palette.getAccent600(),
  });
};

const MessageListHeaderStyle = () => {
  return {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    height: "auto",
  };
};

import { CometChat } from "@cometchat-pro/chat";
import { AvatarStyle, DateStyle, ReceiptStyle } from "my-cstom-package-lit";
import {
  States,
  localize,
  MessageListAlignment,
  DatePatterns,
  TimestampAlignment,
  CometChatMessageTemplate,
  CometChatUIKitConstants,
  CometChatTheme,
  MessageBubbleAlignment,
  CometChatGroupEvents,
  fontHelper,
  CometChatMessageEvents,
  IGroupLeft,
  IGroupMemberScopeChanged,
  IGroupMemberAdded,
  IGroupMemberKickedBanned,
  IMessages,
  MessageStatus,
  CometChatUIEvents,
  IPanel,
  IDialog,
  CometChatCallEvents,
  IShowOngoingCall,
  CometChatActionsView,
  CometChatActionsIcon,
} from "uikit-resources-lerna";
import {
  MessageListStyle,
  CometChatSoundManager,
  MessageReceiptUtils,
  TitleAlignment,
  ListStyle,
} from "uikit-utils-lerna";
import {
  LoadingIcon as SpinnerIcon,
  ReadIcon,
  DeliveredIcon,
  SentIcon,
  WarningIcon,
  WaitIcon,
  SearchIcon,
  ThreadIcon,
  RightArrowIcon,
} from "../../assets";
import { ChatConfigurator } from "../shared/Framework/ChatConfigurator";
import { Subscription } from "rxjs";
import CometChatMessageBubble from "../CometChatMessageBubble/index.vue";
import CometChatOngoingCall from "../Calling/CometChatOngoingCall/index.vue";

const defaultMessageListStyle: any = {
  nameTextFont: "600 15px Inter",
  nameTextColor: "white",
  TimestampTextFont: "",
  TimestampTextColor: "",
  threadReplySeparatorColor: "",
  threadReplyTextFont: "",
  threadReplyIconTint: "",
  threadReplyTextColor: "",
  emptyStateTextFont: "700 22px Inter",
  emptyStateTextColor: "#bcbcbc",
  errorStateTextFont: "700 22px Inter",
  errorStateTextColor: "#bcbcbc",
  loadingIconTint: "grey",
};

const MessageReceiptStyle = (theme: Ref<CometChatTheme>) => {
  return new ReceiptStyle({
    waitIconTint: theme.value.palette.getAccent700(),
    sentIconTint: theme.value.palette.getAccent600(),
    deliveredIconTint: theme.value.palette.getAccent600(),
    readIconTint: theme.value.palette.getPrimary(),
    errorIconTint: theme.value.palette.getError(),
  });
};

export const defaultDateSeparatorStyle = new DateStyle({
  textFont: "500 16px Inter",
  textColor: "rgba(20, 20, 20, 0.58)",
  background: "",
  height: "",
  width: "",
  border: "1px solid grey",
  borderRadius: "8px",
});

export const unreadMessageStyle = () => {
  return {
    height: "100%",
    width: "100%",
    background: "#3399FF",
    display: "flex",
    justifyContent: "center",
    buttonTextFont: "400 13px Inter",
    color: "white",
    border: "none",
    borderRadius: "12px",
  };
};

const MessageBubbleDateStyle = (
  messageListStyle: any,
  theme: Ref<CometChatTheme>
) => {
  return {
    textColor:
      messageListStyle.TimestampTextColor || theme.value.palette.getAccent600(),
    textFont:
      messageListStyle.TimestampTextFont ||
      fontHelper(theme.value.typography.caption2),
  };
};

const LoadingViewStyle = (
  messageListStyle: MessageListStyle,
  theme: Ref<CometChatTheme>
) => {
  let tempMessageListStyle = {
    ...TempMessageListStyle(theme),
    ...messageListStyle,
  };
  return {
    iconTint: tempMessageListStyle.loadingIconTint,
  };
};

// if (
//     (!message?.getSender() ||
//       message?.getSender().getUid() == loggedInUser.getUid()) &&
//     message?.getType() != CometChatUIKitConstants.MessageTypes.text &&
//     CometChatUIKitUtility.getExtensionData(message)
//   )
const MessageThreadViewStyle = (
  message: CometChat.BaseMessage,
  theme: Ref<CometChatTheme>,
  loggedInUser: CometChat.User
) => {
  if (
    (!message.getSender() ||
      message.getSender().getUid() === loggedInUser?.getUid()) &&
    message?.getType() == CometChatUIKitConstants.MessageTypes.text
  ) {
    return {
      height: "100%",
      width: "100%",
      border: "none",
      borderRadius: "0",
      background: "transparent",
      padding: "2px 8px 0 8px",
      buttonIconTint: theme.value.palette.getAccent600(),
      display: "flex",
      flexFlow: "row-reverse",
      alignItems: "flex-start",
      justifyContent: "space-between",
      buttonTextColor: theme.value.palette.getAccent("dark"),
    };
  } else {
    return {
      height: "100%",
      width: "100%",
      border: "none",
      borderRadius: "0",
      background: "transparent",
      padding: "2px 8px 0 8px",
      buttonIconTint: "grey",
      display: "flex",
      flexFlow: "row-reverse",
      alignItems: "flex-start",
      justifyContent: "space-between",
      buttonTextColor: theme.value.palette.getPrimary(),
    };
  }
};

export default defineComponent({
  name: "CometChatMessageList",
  components: {
    CometChatList,
    CometChatMessageBubble,
    CometChatSmartReplyBubble,
    CometChatConfirmDialogView,
    CometChatOngoingCall,
  },
  props: {
    hideError: {
      default: false,
    },
    scrollToBottomOnNewMessages: { type: Boolean, default: true },
    errorStateView: { default: "" },
    loadingStateView: { default: "" },
    emptyStateView: { default: "" },
    state: {
      default: States.loading,
    },
    thresholdValue: { type: Number, default: 1000 },
    errorStateText: { default: () => localize("SOMETHING_WRONG") },
    emptyStateText: { default: () => localize("NO_MESSAGES_FOUND") },
    loadingIconURL: { default: SpinnerIcon },
    user: { type: CometChat.User },
    group: { type: CometChat.Group, default: null },
    disableReceipt: {
      default: false,
    },
    onError: {
      type: Function,
      default: (error: CometChat.CometChatException) => {
        console.log(error);
      },
    },
    disableSoundForMessages: {
      default: false,
    },
    customSoundForMessages: { default: "" },
    readIcon: { default: ReadIcon },
    deliveredIcon: { default: DeliveredIcon },
    sentIcon: { default: SentIcon },
    waitIcon: { default: WaitIcon },
    errorIcon: { default: WarningIcon },
    alignment: {
      //type: MessageListAlignment,
      default: MessageListAlignment.standard,
    },
    showAvatar: {
      default: true,
    },
    timestampAlignment: { default: 1 },
    DateSeparatorPattern: {
      type: Number as PropType<DatePatterns>,
      default: DatePatterns.DayDateTime,
    },
    templates: {
      type: Array as PropType<CometChatMessageTemplate[]>,
      default: null,
    },
    messagesRequestBuilder: { type: CometChat.MessagesRequestBuilder },
    newMessageIndicatorText: { default: "" },

    onThreadRepliesClick: {
      type: Function,
      default: () => {
        //do nothing
      },
    },
    headerView: { type: Object as PropType<ViewType> },
    footerView: { type: Object as PropType<ViewType> },
    datePattern: {
      type: Number as PropType<DatePatterns>,
      default: DatePatterns.time,
    },
    parentMessageId: { type: Number, default: 0 },
    avatarStyle: {
      type: AvatarStyle,
      default: new AvatarStyle({
        borderRadius: "16px",
        width: "28px",
        height: "28px",
      }),
    },
    dateSeparatorStyle: { type: DateStyle, default: defaultDateSeparatorStyle },
    messageListStyle: {
      type: MessageListStyle,
      default: defaultMessageListStyle,
    },
    //   dateSeparatorStyle: defaultDateSeparatorStyle,
    // messageListStyle: defaultMessageListStyle,
  },
  setup(props) {
    let componentState = ref(props.state);

    let MessageCategory = CometChatUIKitConstants.MessageCategory;
    let reinitialized = false;
    let newMessageCount: Ref<number | string | null> = ref(0);
    let keepRecentMessages = true;
    let isOnBottom = false;
    let showOngoingCallRef = ref(false);

    let messagesList: Ref<any[]> = ref([]);
    let loggedInUser!: CometChat.User;
    let { theme, switchThemeMode }: any = inject(
      "theme",
      new CometChatTheme({})
    )!;
    let types: string[] = ChatConfigurator.getDataSource().getAllMessageTypes();

    let categories: string[] =
      ChatConfigurator.getDataSource().getAllMessageCategories();

    let requestBuilder: any = null;
    let UnreadCount: any = ref([]); //CometChat.BaseMessage[]
    let MessageTypesConstant = CometChatUIKitConstants.MessageTypes;
    let msgListenerId = "message_" + new Date().getTime();
    let groupListenerId = "group_" + new Date().getTime();
    let callListenerId = "call_" + new Date().getTime();
    let messageCount!: number;
    let incrementTopScrollIfDataExists = false;
    let timeOut: any = null;

    let skipPreviousFetch = false;

    let threadOpenIcon = RightArrowIcon;
    let chatChanged = true;
    let showSmartReplyRef = ref(false);
    let confirmDialogView: Ref<ViewType> = ref(undefined);

    let limit = 30;
    let textStyle = {
      height: "10px",
      width: "100%",
      border: "2px",
      borderRadius: "2px",
      background: "yellow",
      textFont: "",
      textColor: "red",
    };
    let openThreadViewToggle: Ref<boolean> = ref(false);
    let currentMessage: any = ref(null);

    let unreadMessagesStyle = {
      height: "100%",
      width: "100%",
      background: "#3399FF",
      display: "flex",
      justifyContent: "center",
      buttonTextFont: "400 13px Inter",
      color: "white",
      border: "none",
      borderRadius: "12px",
    };

    // eslint-disable-next-line
    let parentMessageId = props.parentMessageId;
    let ccGroupMemberJoined!: Subscription;
    let ccOwnershipChanged!: Subscription;
    let ccLiveReaction!: Subscription;
    let ccMessageDelete!: Subscription;
    let currentTargetUser: any = null;
    let currentTargetGroup: any = null;
    let smartReplyView: ViewType = undefined;
    let ongoingCallView: ViewType = undefined;

    let numberOfTopScrolls = 0;

    let messageTypesMap: any = {},
      messagesTemplate: Array<CometChatMessageTemplate | null> =
        props.templates && props.templates.length > 0
          ? props.templates
          : ChatConfigurator.getDataSource().getAllMessageTemplates(
              theme.value
            ),
      ccMessageEdit: any,
      ccMessageSent: any,
      ccGroupMemberAdded: any,
      ccGroupMemberBanned: any,
      ccGroupMemberKicked: any,
      ccGroupMemberScopeChanged: any,
      ccGroupLeft: any,
      ccShowPanel: any,
      ccHidePanel: any,
      ccShowDialog: any,
      ccHideDialog: any,
      ccShowOngoingCall: any,
      ccCallEnded: any,
      ccCallRejected: any,
      ccOutgoingCall: any,
      ccCallAccepted: any;
    let timestampEnum: any = TimestampAlignment;
    let threadedAlignment: MessageBubbleAlignment = MessageBubbleAlignment.left;

    let changed = false;
    let setScrollListToBottom = ref(true);

    messagesTemplate.forEach((el: any) => {
      messageTypesMap[el.category + "_" + el.type] = el;
    });

    onBeforeMount(async () => {
      componentState.value = States.loading;
    });

    onMounted(async () => {
      if (props.scrollToBottomOnNewMessages) {
        isOnBottom = true;
      }
      await CometChat.getLoggedinUser()
        .then((user: CometChat.User | null) => {
          if (user) {
            loggedInUser = user as CometChat.User;
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

      currentTargetUser = props.user;
      currentTargetGroup = props.group;
      createRequestBuilder();
      subscribeToEvents();
    });

    onUnmounted(async () => {
      unsubscribeToEvents();
      try {
        //Removing Message Listeners
        CometChat.removeMessageListener(msgListenerId);
        CometChat.removeGroupListener(groupListenerId);
        CometChat.removeCallListener(callListenerId);
        // eslint-disable-next-line
      } catch (error: any) {
        if (props.onError) {
          let cometchatException = new CometChat.CometChatException({
            message: error.message,
          });
          props.onError(cometchatException);
        }
      }
    });

    const getDividerStyle = () => {
      return {
        height: "1px",
        width: "100%",
        background: theme.value.palette.getAccent100(),
      };
    };

    const subscribeToEvents = () => {
      ccShowOngoingCall = CometChatUIEvents.ccShowOngoingCall.subscribe(
        (data: IShowOngoingCall) => {
          showOngoingCallRef.value = true;
          ongoingCallView = data.child;
        }
      );
      ccCallEnded = CometChatCallEvents.ccCallEnded.subscribe(
        (call: CometChat.Call) => {
          showOngoingCallRef.value = false;
          ongoingCallView = undefined;
          callActionMessageReceived(call);
        }
      );
      ccCallRejected = CometChatCallEvents.ccCallRejected.subscribe(
        (call: CometChat.Call) => {
          callActionMessageReceived(call);
        }
      );
      ccOutgoingCall = CometChatCallEvents.ccOutgoingCall.subscribe(
        (call: CometChat.Call) => {
          callActionMessageReceived(call);
        }
      );
      (ccCallAccepted = CometChatCallEvents.ccCallAccepted.subscribe(
        (call: CometChat.Call) => {
          callActionMessageReceived(call);
        }
      )),
        (ccShowPanel = CometChatUIEvents.ccShowPanel.subscribe(
          (data: IPanel) => {
            smartReplyView = data.child;
            showSmartReplyRef.value = true;
          }
        ));
      ccHidePanel = CometChatUIEvents.ccHidePanel.subscribe(() => {
        smartReplyView = undefined;
        showSmartReplyRef.value = false;
        //unreadMessageLabelRef.current = false;
      });
      ccShowDialog = CometChatUIEvents.ccShowDialog.subscribe(
        (data: IDialog) => {
          setScrollListToBottom.value = false;
          confirmDialogView.value = data.child;
        }
      );
      ccHideDialog = CometChatUIEvents.ccHideDialog.subscribe(() => {
        confirmDialogView.value = undefined;
      });
      ccGroupMemberAdded = CometChatGroupEvents.ccGroupMemberAdded.subscribe(
        (item: IGroupMemberAdded) => {
          appendMessages(item.messages);
        }
      );
      ccGroupMemberBanned = CometChatGroupEvents.ccGroupMemberBanned.subscribe(
        (item: IGroupMemberKickedBanned) => {
          addMessage(item.message);
        }
      );
      ccGroupMemberKicked = CometChatGroupEvents.ccGroupMemberKicked.subscribe(
        (item: IGroupMemberKickedBanned) => {
          addMessage(item.message);
        }
      );
      ccGroupMemberScopeChanged =
        CometChatGroupEvents.ccGroupMemberScopeChanged.subscribe(
          (item: IGroupMemberScopeChanged) => {
            addMessage(item.message);
          }
        );
      ccGroupLeft = CometChatGroupEvents.ccGroupLeft.subscribe(
        (item: IGroupLeft) => {
          addMessage(item.message);
        }
      );
      ccMessageEdit = CometChatMessageEvents.ccMessageEdited.subscribe(
        (object: IMessages) => {
          if (object?.status == MessageStatus.success) {
            updateMessage(object.message);
          }
        }
      );
      ccMessageSent = CometChatMessageEvents.ccMessageSent.subscribe(
        (obj: IMessages) => {
          let message: any = obj.message; //CometChat.BaseMessage
          switch (obj.status) {
            case MessageStatus.inprogress: {
              addMessage(message);
              playAudio();
              break;
            }
            case MessageStatus.success: {
              if (message.getParentMessageId() || props.parentMessageId) {
                updateReplyCount(message);
              }
              updateMessage(message, true);
              break;
            }
          }
        }
      );
    };

    const updateMessage = (message: any, muid = false) => {
      if (muid) {
        messageSent(message);
      } else {
        updateEditedMessage(message);
      }
    };

    const messageSent = (messages: CometChat.BaseMessage) => {
      const message: CometChat.BaseMessage = messages;
      const messageList: CometChat.BaseMessage[] = [...messagesList.value];
      let messageKey = messageList.findIndex(
        (m: CometChat.BaseMessage) => m.getMuid() === message.getMuid()
      );
      if (messageKey > -1) {
        messageList.splice(messageKey, 1, message);
      }

      messagesList.value = messageList;

      scrollToBottom();
    };

    const unsubscribeToEvents = () => {
      ccGroupMemberAdded?.unsubscribe();
      ccGroupMemberBanned?.unsubscribe();
      ccGroupMemberJoined?.unsubscribe();
      ccGroupMemberKicked?.unsubscribe();
      ccOwnershipChanged?.unsubscribe();
      ccGroupLeft?.unsubscribe();
      ccMessageEdit?.unsubscribe();
      ccMessageSent?.unsubscribe();
      ccLiveReaction?.unsubscribe();
      ccMessageDelete?.unsubscribe();
      ccGroupMemberScopeChanged?.unsubscribe();
      ccShowOngoingCall?.unsubscribe();
      ccCallAccepted?.unsubscribe();
      ccCallEnded?.unsubscribe();
      ccCallRejected.unsubscribe();
      ccOutgoingCall.unsubscribe();
    };

    const getLoggedinUser = () => {
      return loggedInUser;
    };

    onMounted(async () => {
      addMessageEventListeners();
      addCallListener();
    });

    onBeforeUpdate(() => {
      if (timeOut) {
        clearTimeout(timeOut);
        timeOut = null;
      }
      if (
        parentMessageId &&
        props.parentMessageId &&
        parentMessageId != props.parentMessageId
      ) {
        messagesList.value = [];
        createRequestBuilder();
        parentMessageId = props.parentMessageId;
      }
      changed = false;

      if (
        (!currentTargetUser && props.user?.getUid()) ||
        (currentTargetUser &&
          currentTargetUser.getUid() != props.user?.getUid() &&
          !props.group?.getGuid())
      ) {
        showSmartReplyRef.value = false;
        changed = true;
        chatChanged = true;
        currentTargetUser = props.user;
        currentTargetGroup = null;
      } else if (
        (!currentTargetGroup && props.group?.getGuid()) ||
        (currentTargetGroup &&
          currentTargetGroup.getGuid() != props.group?.getGuid())
      ) {
        showSmartReplyRef.value = false;
        changed = true;
        chatChanged = true;
        currentTargetGroup = props.group;
        currentTargetUser = null;
      }

      if (changed) {
        if (props.scrollToBottomOnNewMessages) {
          isOnBottom = true;
        }

        reinitialized = false;

        if (!loggedInUser) {
          CometChat.getLoggedinUser()
            .then((user: CometChat.User | null) => {
              if (user) {
                loggedInUser = user as CometChat.User;
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
        messagesList.value = [];
        if (currentTargetUser) {
          if (Object.keys(currentTargetUser).length > 1) {
            createRequestBuilder();
          } else {
            CometChat.getUser(currentTargetUser).then(
              // eslint-disable-next-line
              (user: CometChat.User) => {
                createRequestBuilder();
              }
            );
          }
        } else if (currentTargetGroup) {
          if (Object.keys(currentTargetGroup).length > 1) {
            createRequestBuilder();
          } else {
            CometChat.getGroup(currentTargetGroup).then(
              // eslint-disable-next-line
              (group: CometChat.Group) => {
                createRequestBuilder();
              }
            );
          }
        }
        unsubscribeToEvents();
        try {
          //Removing Message Listeners
          CometChat.removeMessageListener(msgListenerId);
          CometChat.removeGroupListener(groupListenerId);
          CometChat.removeCallListener(callListenerId);
          msgListenerId = "message_" + new Date().getTime();
          groupListenerId = "group_" + new Date().getTime();
          callListenerId = "call_" + new Date().getTime();
          // eslint-disable-next-line
        } catch (error: any) {
          if (props.onError) {
            let cometchatException = new CometChat.CometChatException({
              message: error.message,
            });
            props.onError(cometchatException);
          }
        }
        setScrollListToBottom.value = true;
      }
    });

    onUpdated(() => {
      if (changed) {
        try {
          msgListenerId = "message_" + new Date().getTime();
          groupListenerId = "group_" + new Date().getTime();
          callListenerId = "call_" + new Date().getTime();
          addMessageEventListeners();
          addCallListener();
          subscribeToEvents();
          // eslint-disable-next-line
        } catch (error: any) {
          if (props.onError) {
            let cometchatException = new CometChat.CometChatException({
              message: error.message,
            });
            props.onError(cometchatException);
          }
        }
      }
      //testToDo
      // timeOut = setTimeout(() => {
      //   setScrollListToBottom.value = false;
      // }, 2000);
    });

    const getLoaderHtml = (): any => {
      if (props.loadingStateView) {
        if (typeof props.loadingStateView == "string") {
          return {
            html: props.loadingStateView,
          };
        }
        return props.loadingStateView;
      } else {
        return {
          html: ` <div class="cc-messagelist__loadingview">
                <cometchat-loader
                 iconURL="${props.loadingIconURL}"
                 loaderStyle="${JSON.stringify(
                   LoadingViewStyle(props.messageListStyle, theme)
                 )}
                 ">
                 </cometchat-loader>
            </div>`,
        };
      }
    };

    const getErrorHtml = (): any => {
      if (props.errorStateView) {
        if (typeof props.errorStateView == "string") {
          return {
            html: props.errorStateView,
          };
        }
        return props.errorStateView;
      } else {
        return {
          html: ` <div class='cc-messagelist__errorview'>
        <cometchat-label
         labelStyle='${JSON.stringify(
           ErrorViewStyle(props.messageListStyle, theme)
         )}'
          text="${props.errorStateText}"
        ></cometchat-label>
      </div>`,
        };
      }
    };

    const getEmptyHtml = (): any => {
      if (props.emptyStateView) {
        if (typeof props.emptyStateView == "string") {
          return {
            html: props.emptyStateView,
          };
        }
        return props.emptyStateView;
      } else {
        return {
          html: ` <div class='cc-messagelist__emptyview'>
        <cometchat-label
        labelStyle='${JSON.stringify(
          EmptyViewStyle(props.messageListStyle, theme)
        )}'
          text='${props.emptyStateText}'
        ></cometchat-label>
      </div>`,
        };
      }
    };

    const MessageBubbleStyle: any = (
      message: CometChat.BaseMessage,
      //theme: Ref<CometChatTheme>,
      alignment: MessageListAlignment,
      currentUser: any
    ) => {
      if (message.getDeletedAt()) {
        return {
          background: "transparent",
          border: `1px dashed ${theme.value.palette.getAccent400()}`,
          borderRadius: "12px",
        };
      } else if (
        !message.getDeletedAt() &&
        message.getCategory() ===
          CometChatUIKitConstants.MessageCategory.message &&
        message.getType() === CometChatUIKitConstants.MessageTypes.text &&
        (!message.getSender() ||
          currentUser?.getUid() === message.getSender().getUid())
      ) {
        return {
          background:
            alignment === MessageListAlignment.left
              ? theme.value.palette.getAccent100()
              : theme.value.palette.getPrimary(),
          borderRadius: "12px",
        };
      } else if (
        !message.getDeletedAt() &&
        message.getCategory() ===
          CometChatUIKitConstants.MessageCategory.message &&
        message.getType() === CometChatUIKitConstants.MessageTypes.audio
      ) {
        return {
          borderRadius: "",
          background: theme.value.palette.getAccent100(),
        };
      } else if (
        message.getType() === CometChatUIKitConstants.MessageTypes.groupMember
      ) {
        return {
          background: "transparent",
          borderRadius: "12px",
          border: `1px solid ${theme.value.palette.getAccent100()}`,
        };
      } else {
        if (
          message.getSender() &&
          message.getSender().getUid() !== currentUser?.getUid()
        ) {
          return {
            background: theme.value.palette.getAccent100(),
            borderRadius: "12px",
          };
        } else {
          return {
            background: theme.value.palette.getAccent100(),
            borderRadius: "12px",
          };
        }
      }
    };

    const getBubbleHeaderView = (item: CometChat.BaseMessage): any => {
      if (getHeaderView(item)) {
        return getHeaderView(item);
      } else {
        if (
          item.getCategory() !==
            CometChatUIKitConstants.MessageCategory.action &&
          item?.getCategory() !== CometChatUIKitConstants.MessageCategory.call
        ) {
          return {
            html: `<div class='cc-messagelist__bubbleheader'>
              ${showHeaderTitle(item) ? getBubbleHeaderTitle(item) : ""}
              ${
                props.timestampAlignment === timestampEnum.top
                  ? getBubbleHeaderDate(item)
                  : ""
              }
            </div>
          `,
          };
        } else {
          return null;
        }
      }
    };

    const getBubbleThreadView = (item: CometChat.BaseMessage): any => {
      if (item.getReplyCount() && !item.getDeletedAt()) {
        return [
          {
            componentName: "cometchat-divider",
            props: {
              dividerStyle: getDividerStyle(),
            },
          },
          {
            componentName: "cometchat-button",
            props: {
              text: getThreadCount(item),
              iconURL: threadOpenIcon,
              buttonStyle: MessageThreadViewStyle(
                item,
                theme,
                getLoggedinUser()
              ),
            },
            listeners: {
              "cc-button-clicked": () => {
                openThreadView(item);
              },
            },
          },
        ];
      } else {
        return null;
      }
    };
    const getBubbleHeaderTitle = (item: CometChat.BaseMessage) => {
      return `<cometchat-label
            text='${item?.getSender()?.getName()}'
            labelStyle='${JSON.stringify(MessageLabelStyle)}'
          ></cometchat-label>`;
    };

    const getBubbleHeaderDate = (item: CometChat.BaseMessage) => {
      return `<cometchat-date
            timestamp=${item.getSentAt()}
            pattern=${props.datePattern}
            dateStyle='${JSON.stringify(
              MessageBubbleDateStyle(props.messageListStyle, theme)
            )}'
          ></cometchat-date>
        </>`;
    };

    const getBubbleFooterView = (item: CometChat.BaseMessage): any => {
      if (getFooterView(item)) {
        return getFooterView(item);
      } else {
        return {
          html: `
          <div >
            ${getBubbleFooterDate(item) ? getBubbleFooterDate(item) : ""}
            ${getBubbleFooterReceipt(item) ? getBubbleFooterReceipt(item) : ""}
          </div>
        `,
        };
      }
    };

    const getBubbleFooterDate = (item: {
      getCategory: () => string;
      getSentAt: () => any;
    }) => {
      if (
        props.timestampAlignment === timestampEnum.bottom &&
        item.getCategory() !== CometChatUIKitConstants.MessageCategory.action &&
        item?.getCategory() !== CometChatUIKitConstants.MessageCategory.call
      ) {
        return `
          <div class='cc-messagelist__bubbledate' style="display:inline-block;">
            <cometchat-date
              timestamp=${item.getSentAt()}
              dateStyle='${JSON.stringify(
                MessageBubbleDateStyle(props.messageListStyle, theme)
              )}'
              pattern=${props.datePattern}
            ></cometchat-date>
          </div>
        `;
      } else {
        return null;
      }
    };

    const getBubbleFooterReceipt = (item: CometChat.BaseMessage) => {
      if (
        !props.disableReceipt &&
        (!item?.getSender() ||
          loggedInUser?.getUid() === item?.getSender()?.getUid()) &&
        item.getCategory() !== CometChatUIKitConstants.MessageCategory.action &&
        item?.getCategory() !== CometChatUIKitConstants.MessageCategory.call
      ) {
        return `<div class='cc-messagelist__receipt' style="display:inline-block; position: relative; top: 7px; height: 100%">
            <cometchat-receipt
              receipt=${getMessageReceipt(item)}
              waitIcon=${props.waitIcon}
              sentIcon=${props.sentIcon}
              deliveredIcon=${props.deliveredIcon}
              readIcon=${props.readIcon}
              errorIcon=${props.errorIcon}
              receiptStyle='${JSON.stringify(MessageReceiptStyle(theme))}'
            ></cometchat-receipt>
          </div>`;
      } else {
        return null;
      }
    };

    const getMessageReceipt = (message: any) => {
      return MessageReceiptUtils.getReceiptStatus(message);
    };

    const showHeaderTitle = (message: CometChat.BaseMessage) => {
      if (props.alignment == MessageListAlignment.left) {
        return true;
      } else {
        if (
          props.group &&
          message?.getCategory() !=
            CometChatUIKitConstants.MessageCategory.action &&
          !message?.getDeletedAt() &&
          message?.getSender() &&
          message?.getSender().getUid() != loggedInUser?.getUid() &&
          props.alignment == MessageListAlignment.standard
        ) {
          return true;
        } else {
          return false;
        }
      }
    };

    const getContentView = (message: CometChat.BaseMessage): any => {
      let view;
      if (
        messageTypesMap[message?.getCategory() + "_" + message?.getType()] &&
        messageTypesMap[message?.getCategory() + "_" + message?.getType()]
          ?.contentView
      ) {
        view = messageTypesMap[
          message?.getCategory() + "_" + message?.getType()
        ]?.contentView(message, getBubbleAlignment(message));
        //default would be html string using lit components
        if (typeof view == "string") {
          return {
            html: view,
          };
        }
        return view;
      } else {
        return null;
      }
    };

    const getBottomView = (message: CometChat.BaseMessage): any => {
      let view;
      if (
        messageTypesMap[message?.getCategory() + "_" + message?.getType()] &&
        messageTypesMap[message?.getCategory() + "_" + message?.getType()]
          ?.bottomView
      ) {
        view = messageTypesMap[
          message?.getCategory() + "_" + message?.getType()
        ]?.bottomView(message, getBubbleAlignment(message));
        //default would be html string using lit components
        if (typeof view == "string") {
          return {
            html: view,
          };
        }
        return view;
      } else {
        return null;
      }
    };

    const getMessageListDivStyle = (): any => {
      return {
        ...(props.messageListStyle.height
          ? { height: props.messageListStyle.height }
          : {}),

        width: "100%",
        display: "flex",
        flexDirection: "column",
        top: 0,

        //paddingBottom: '20px',
        overflowX: "hidden",
        overflowY: "scroll",
      };
    };

    const getHeaderView = (message: CometChat.BaseMessage): string | null => {
      let viewString = "";
      if (
        messageTypesMap[message?.getCategory() + "_" + message?.getType()] &&
        messageTypesMap[message?.getCategory() + "_" + message?.getType()]
          ?.headerView
      ) {
        viewString =
          messageTypesMap[
            message?.getCategory() + "_" + message?.getType()
          ]?.headerView(message);
        return viewString;
      } else {
        return null;
      }
    };

    const getFooterView = (message: CometChat.BaseMessage): string | null => {
      let view = "";

      if (
        messageTypesMap[message?.getCategory() + "_" + message?.getType()] &&
        messageTypesMap[message?.getCategory() + "_" + message?.getType()]
          ?.footerView
      ) {
        //
        view =
          messageTypesMap[
            message?.getCategory() + "_" + message?.getType()
          ]?.footerView(message);
        //
        return view;
      } else {
        //
        return null;
      }
    };

    const createRequestBuilder = () => {
      if (!skipPreviousFetch) {
        componentState.value = States.loading;
      }
      requestBuilder = null;

      if (currentTargetUser || currentTargetGroup) {
        if (!props.messagesRequestBuilder) {
          if (currentTargetUser) {
            requestBuilder = new CometChat.MessagesRequestBuilder()
              .setUID(currentTargetUser.getUid())
              .setLimit(limit)
              .setTypes(types)
              .setCategories(categories)
              .hideReplies(true)
              .build();
          } else {
            requestBuilder = new CometChat.MessagesRequestBuilder()
              .setGUID(currentTargetGroup.getGuid())
              .setLimit(limit)
              .setTypes(types)
              .hideReplies(true)
              .setCategories(categories)
              .build();
          }
        } else {
          requestBuilder = props.messagesRequestBuilder.build();
        }
        if (!skipPreviousFetch) {
          fetchPreviousMessages();
        }
      }
    };

    const messageReceived = async (message: any) => {
      markMessageAsDelivered(message);
      try {
        if (
          props.group &&
          message.getReceiverType() ===
            CometChatUIKitConstants.MessageReceiverType.group &&
          message.getReceiverId() === props.group?.getGuid()
        ) {
          messageReceivedHandler(
            message,
            CometChatUIKitConstants.MessageReceiverType.group
          );
        } else if (
          props.user &&
          message.getReceiverType() ===
            CometChatUIKitConstants.MessageReceiverType.user &&
          message?.getSender().getUid() === props.user?.getUid() &&
          message?.getReceiver().getUid() === loggedInUser.getUid()
        ) {
          if (
            (!message?.getReadAt() &&
              !message?.getParentMessageId() &&
              isOnBottom) ||
            (!message?.getReadAt() &&
              message.getParentMessageId() &&
              props.parentMessageId &&
              isOnBottom)
          ) {
            if (!props.disableReceipt) {
              CometChat.markAsRead(message).then(() => {
                CometChatMessageEvents.ccMessageRead.next(message);
              });
            } else {
              UnreadCount.value = [];
            }
            //CometChatMessageEvents.ccMessageRead.next(message);
          }

          await messageReceivedHandler(
            message,
            CometChatUIKitConstants.MessageReceiverType.user
          );
        }
        // eslint-disable-next-line
      } catch (error: any) {
        if (props.onError) {
          let cometchatException = new CometChat.CometChatException({
            message: error.message,
          });
          props.onError(cometchatException);
        }
      }
    };

    const updateReplyCount = (messages: CometChat.BaseMessage) => {
      try {
        const receivedMessage = messages;
        let messageList: CometChat.BaseMessage[] = [...messagesList.value];

        let messageKey = messageList.findIndex(
          (m) => m.getId() === receivedMessage.getParentMessageId()
        );
        if (messageKey > -1) {
          const messageObj: CometChat.BaseMessage = messageList[messageKey];
          let replyCount = messageObj.getReplyCount()
            ? messageObj.getReplyCount()
            : 0;
          replyCount = replyCount + 1;
          messageObj.setReplyCount(replyCount);
          messageList.splice(messageKey, 1, messageObj);
          messagesList.value = [...messageList];
        }
        // eslint-disable-next-line
      } catch (error: any) {
        if (props.onError) {
          let cometchatException = new CometChat.CometChatException({
            message: error.message,
          });
          props.onError(cometchatException);
        }
      }
    };

    const addMessage = (message: any) => {
      if (messagesList.value.length == 0) {
        componentState.value = States.loaded;
      }
      if (!message?.getParentMessageId() || props.parentMessageId) {
        if (!UnreadCount.value.length) {
          messagesList.value.push(message);
        } else {
          messageCount = messageCount - UnreadCount.value.length;
        }

        if (
          !message?.getSender() ||
          loggedInUser?.getUid() == message?.getSender()?.getUid() ||
          isOnBottom
        ) {
          scrollToBottom();
        }
      }
    };

    const messageReceivedHandler = async (
      message: CometChat.BaseMessage,
      // eslint-disable-next-line
      type: string
    ) => {
      setScrollListToBottom.value = false;
      ++messageCount;

      if (message.getParentMessageId()) {
        updateReplyCount(message);
        addMessage(message);
      } else {
        if (messageCount > props.thresholdValue) {
          keepRecentMessages = true;
          reInitializeMessageBuilder();
        }
        addMessage(message);

        if (props.scrollToBottomOnNewMessages && numberOfTopScrolls == 0) {
          scrollToBottom();
          // setTimeout(() => {
          //   scrollToBottom();
          // }, 100);
        } else if (numberOfTopScrolls != 0) {
          let countText = localize("NEW_MESSAGES");
          if (
            props.newMessageIndicatorText &&
            props.newMessageIndicatorText != ""
          ) {
            countText = props.newMessageIndicatorText;
          } else {
            countText =
              UnreadCount.value && UnreadCount.value.length > 0
                ? localize("NEW_MESSAGES")
                : localize("NEW_MESSAGE");
          }
          if (!(UnreadCount.value && UnreadCount.value.length)) {
            UnreadCount.value = [];
          }
          UnreadCount.value.push(message);
          newMessageCount.value =
            " ↓ " + UnreadCount.value.length + " " + countText;
        }
      }
      playAudio();
      //handling dom lag - increment count only for main message list
      if (
        Object.prototype.hasOwnProperty.call(message, "parentMessageId") ===
          false &&
        props.parentMessageId
      ) {
        ++messageCount;
      } else if (
        Object.prototype.hasOwnProperty.call(message, "parentMessageId") ===
          true &&
        props.parentMessageId
      ) {
        if (
          message.getParentMessageId() === props.parentMessageId &&
          isOnBottom
        ) {
          if (!props.disableReceipt) {
            CometChat.markAsRead(message).then(() => {
              CometChatMessageEvents.ccMessageRead.next(message);
            });
          } else {
            UnreadCount.value = [];
          }
        }
      }
    };

    const playAudio = () => {
      if (!props.disableSoundForMessages) {
        if (props.customSoundForMessages) {
          CometChatSoundManager.play(
            CometChatSoundManager.Sound.incomingMessage,
            props.customSoundForMessages
          );
        } else {
          CometChatSoundManager.play(
            CometChatSoundManager.Sound.incomingMessage
          );
        }
      }
    };

    const messageReadAndDelivered = (message: CometChat.MessageReceipt) => {
      try {
        if (
          message.getReceiverType() ==
            CometChatUIKitConstants.MessageReceiverType.user &&
          message?.getSender().getUid() == props.user?.getUid() &&
          message.getReceiver() == loggedInUser?.getUid()
        ) {
          if (
            message.getReceiptType() ==
            CometChatUIKitConstants.messages.DELIVERY
          ) {
            //search for message
            let messageKey = messagesList.value.findIndex(
              (m: CometChat.BaseMessage) =>
                m.getId() == Number(message.getMessageId())
            );
            if (messageKey > -1) {
              messagesList.value[messageKey].setDeliveredAt(
                message.getDeliveredAt()
              );
              markAllMessagAsDelivered(message, messageKey);
            }
          } else if (
            message.getReceiptType() == CometChatUIKitConstants.messages.READ
          ) {
            //search for message
            let messageKey = messagesList.value.findIndex(
              (m: CometChat.BaseMessage) =>
                m.getId() == Number(message.getMessageId())
            );
            if (messageKey > -1) {
              messagesList.value[messageKey].setReadAt(message?.getReadAt());
              markAllMessagAsRead(message, messageKey);
            }
          }
        } else if (
          message.getReceiverType() ===
            CometChatUIKitConstants.MessageReceiverType.group &&
          message.getReceiver() === props.group?.getGuid()
        ) {
          return;
        }
        // eslint-disable-next-line
      } catch (error: any) {
        if (props.onError) {
          let cometchatException = new CometChat.CometChatException({
            message: error.message,
          });
          props.onError(cometchatException);
        }
      }
    };

    const markAllMessagAsDelivered = (
      readMessage: CometChat.MessageReceipt,
      messageKey: number
    ) => {
      for (let i = messageKey; i >= 0; i--) {
        if (!messagesList.value[i].getDeliveredAt()) {
          messagesList.value[i].setDeliveredAt(readMessage.getDeliveredAt());
        }
      }
    };

    const getMessageBubbleDate = (item: CometChat.BaseMessage, i: number) => {
      if (i === 0) {
        return `
            <cometchat-date
              timestamp=${item.getSentAt()}
              pattern='${props.DateSeparatorPattern}'
              dateStyle='${JSON.stringify(
                MessageDateStyle(props.dateSeparatorStyle, theme)
              )}'
            ></cometchat-date>

      `;
      } else {
        if (
          isDateDifferent(
            messagesList.value[i - 1]?.getSentAt(),
            item.getSentAt()
          )
        ) {
          return `

                <cometchat-date
                  timestamp=${item.getSentAt()}
                  pattern='${props.DateSeparatorPattern}'
                  dateStyle='${JSON.stringify(
                    MessageDateStyle(props.dateSeparatorStyle, theme)
                  )}'
                ></cometchat-date>

            `;
        } else {
          return null;
        }
      }
    };

    const isDateDifferent = (firstDate: number, secondDate: number) => {
      let firstDateObj: Date, secondDateObj: Date;
      firstDateObj = new Date(firstDate * 1000);
      secondDateObj = new Date(secondDate * 1000);
      return (
        firstDateObj.getDate() !== secondDateObj.getDate() ||
        firstDateObj.getMonth() !== secondDateObj.getMonth() ||
        firstDateObj.getFullYear() !== secondDateObj.getFullYear()
      );
    };

    const messageUpdate = async (
      key: string | null = null,
      message: CometChat.MessageReceipt | CometChat.BaseMessage | any = null,
      // eslint-disable-next-line
      group: CometChat.Group | null = null,
      // eslint-disable-next-line
      options: any = null
    ) => {
      try {
        switch (key) {
          case CometChatUIKitConstants.messages.TEXT_MESSAGE_RECEIVED:
          case CometChatUIKitConstants.messages.MEDIA_MESSAGE_RECEIVED:
            await messageReceived(message);
            break;
          case CometChatUIKitConstants.messages.MESSAGE_DELIVERED:
          case CometChatUIKitConstants.messages.MESSAGE_READ:
            messageReadAndDelivered(message);
            break;
          case CometChatUIKitConstants.messages.MESSAGE_DELETED:
          case CometChatUIKitConstants.messages.MESSAGE_EDITED: {
            messageEdited(message);
            break;
          }
          case CometChatUIKitConstants.groupMemberAction.SCOPE_CHANGE:
          case CometChatUIKitConstants.groupMemberAction.JOINED:
          case CometChatUIKitConstants.groupMemberAction.LEFT:
          case CometChatUIKitConstants.groupMemberAction.ADDED:
          case CometChatUIKitConstants.groupMemberAction.KICKED:
          case CometChatUIKitConstants.groupMemberAction.BANNED:
          case CometChatUIKitConstants.groupMemberAction.UNBANNED: {
            if (
              group &&
              props.group &&
              group.getGuid() == props.group.getGuid()
            ) {
              addMessage(message);
            }
            break;
          }
          case CometChatUIKitConstants.messages.CUSTOM_MESSAGE_RECEIVED:
            customMessageReceived(message);
            break;
          default:
            return;
        }
        // eslint-disable-next-line
      } catch (error: any) {
        if (props.onError) {
          let cometchatException = new CometChat.CometChatException({
            message: error.message,
          });
          props.onError(cometchatException);
        }
      }
    };

    const customMessageReceived = (
      message: any /*CometChat.BaseMessage*/
    ): any => {
      try {
        markMessageAsDelivered(message);
        if (
          props.group &&
          message.getReceiverType() ===
            CometChatUIKitConstants.MessageReceiverType.group &&
          message.getReceiverId() === props.group?.getGuid()
        ) {
          if (
            (!message?.getReadAt() &&
              !message?.getParentMessageId() &&
              isOnBottom) ||
            (!message?.getReadAt() &&
              message.getParentMessageId() &&
              props.parentMessageId &&
              isOnBottom)
          ) {
            if (!props.disableReceipt) {
              CometChat.markAsRead(message).then(() => {
                CometChatMessageEvents.ccMessageRead.next(message);
              });
            } else {
              UnreadCount.value = [];
            }
          }
          customMessageReceivedHandler(
            message,
            CometChatUIKitConstants.MessageReceiverType.group
          );
        } else if (
          props.user &&
          message.getReceiverType() ===
            CometChatUIKitConstants.MessageReceiverType.user &&
          ((message?.getSender().getUid() === props.user?.getUid() &&
            message.getReceiverId() === loggedInUser?.getUid()) ||
            (loggedInUser?.getUid() === message?.getSender().getUid() &&
              message.getReceiverId() === props.user?.getUid()))
        ) {
          if (
            (!message?.getReadAt() &&
              !message?.getParentMessageId() &&
              isOnBottom) ||
            (!message?.getReadAt() &&
              message.getParentMessageId() &&
              props.parentMessageId &&
              isOnBottom)
          ) {
            if (!props.disableReceipt) {
              CometChat.markAsRead(message).then(() => {
                CometChatMessageEvents.ccMessageRead.next(message);
              });
            } else {
              UnreadCount.value = [];
            }
          }
          customMessageReceivedHandler(
            message,
            CometChatUIKitConstants.MessageReceiverType.user
          );
        }
        // eslint-disable-next-line
      } catch (error: any) {
        if (props.onError) {
          let cometchatException = new CometChat.CometChatException({
            message: error.message,
          });
          props.onError(cometchatException);
        }
      }

      return true;
    };
    // eslint-disable-next-line
    const customMessageReceivedHandler = (message: any, type: string) => {
      ++messageCount;
      // add received message to messages list
      if (message.getParentMessageId()) {
        updateReplyCount(message);
        addMessage(message);
      } else {
        if (messageCount > props.thresholdValue) {
          keepRecentMessages = true;
          reInitializeMessageBuilder();
        }
        addMessage(message);

        if (props.scrollToBottomOnNewMessages && numberOfTopScrolls == 0) {
          scrollToBottom();
          // nextTick(() => {
          //   scrollToBottom();
          // });
        } else {
          let countText = localize("NEW_MESSAGES");
          if (
            props.newMessageIndicatorText &&
            props.newMessageIndicatorText != ""
          ) {
            countText = props.newMessageIndicatorText;
          } else {
            countText =
              UnreadCount.value.length > 0
                ? localize("NEW_MESSAGES")
                : localize("NEW_MESSAGE");
          }
          UnreadCount.value.push(message);
          newMessageCount.value =
            " ↓ " + UnreadCount.value.length + " " + countText;
        }
      }
      playAudio();
      //handling dom lag - increment count only for main message list
      if (
        Object.prototype.hasOwnProperty.call(message, "parentMessageId") ===
          false &&
        !props.parentMessageId
      ) {
        ++messageCount;
        //if the user has not scrolled in chat window(scroll is at the bottom of the chat window)
      } else if (
        Object.prototype.hasOwnProperty.call(message, "parentMessageId") ===
          true &&
        props.parentMessageId &&
        isOnBottom
      ) {
        if (message.getParentMessageId() === props.parentMessageId) {
          if (!props.disableReceipt) {
            CometChat.markAsRead(message).then(() => {
              CometChatMessageEvents.ccMessageRead.next(message);
            });
          } else {
            UnreadCount.value = [];
          }
        }
      }
    };

    const updateEditedMessage = (message: CometChat.BaseMessage) => {
      const messageList = messagesList.value;
      const messageKey = messageList.findIndex(
        (m: any) => m.getId() === message.getId()
      );
      if (messageKey > -1) {
        messagesList.value = [
          ...messageList.slice(0, messageKey),
          message,
          ...messageList.slice(messageKey + 1),
        ];
      }
    };

    const messageEdited = (message: CometChat.BaseMessage) => {
      try {
        if (
          props.group &&
          message.getReceiverType() ===
            CometChatUIKitConstants.MessageReceiverType.group &&
          message.getReceiverId() === props.group?.getGuid()
        ) {
          updateEditedMessage(message);
        } else if (
          props.user &&
          message.getReceiverType() ===
            CometChatUIKitConstants.MessageReceiverType.user &&
          loggedInUser?.getUid() === message.getReceiverId() &&
          message?.getSender().getUid() === props.user?.getUid()
        ) {
          updateEditedMessage(message);
        } else if (
          props.user &&
          message.getReceiverType() ===
            CometChatUIKitConstants.MessageReceiverType.user &&
          loggedInUser?.getUid() === message?.getSender().getUid() &&
          message.getReceiverId() === props.user?.getUid()
        ) {
          updateEditedMessage(message);
        }
        // eslint-disable-next-line
      } catch (error: any) {
        if (props.onError) {
          let cometchatException = new CometChat.CometChatException({
            message: error.message,
          });
          props.onError(cometchatException);
        }
      }
    };
    const addMessageEventListeners = () => {
      try {
        CometChat.addMessageListener(
          msgListenerId,
          new CometChat.MessageListener({
            onTextMessageReceived: async (
              textMessage: CometChat.TextMessage
            ) => {
              if (
                !props.parentMessageId ||
                textMessage.getParentMessageId() == props.parentMessageId
              ) {
                await messageUpdate(
                  CometChatUIKitConstants.messages.TEXT_MESSAGE_RECEIVED,
                  textMessage
                );
              }
            },
            onCustomMessageReceived: async (
              customMessage: CometChat.CustomMessage
            ) => {
              if (
                !props.parentMessageId ||
                customMessage.getParentMessageId() == props.parentMessageId
              ) {
                await messageUpdate(
                  CometChatUIKitConstants.messages.CUSTOM_MESSAGE_RECEIVED,
                  customMessage
                );
              }
            },
            onMediaMessageReceived: (mediaMessage: CometChat.MediaMessage) => {
              if (
                !props.parentMessageId ||
                mediaMessage.getParentMessageId() == props.parentMessageId
              ) {
                messageUpdate(
                  CometChatUIKitConstants.messages.MEDIA_MESSAGE_RECEIVED,
                  mediaMessage
                );
              }
            },
            onMessagesDelivered: (messageReceipt: CometChat.MessageReceipt) => {
              if (
                !props.parentMessageId ||
                getMessageById(
                  Number(messageReceipt.getMessageId())
                ).getParentMessageId() == props.parentMessageId
              ) {
                messageUpdate(
                  CometChatUIKitConstants.messages.MESSAGE_DELIVERED,
                  messageReceipt
                );
              }
            },
            onMessagesRead: (messageReceipt: CometChat.MessageReceipt) => {
              if (
                !props.parentMessageId ||
                getMessageById(
                  Number(messageReceipt.getMessageId())
                ).getParentMessageId() == props.parentMessageId
              ) {
                messageUpdate(
                  CometChatUIKitConstants.messages.MESSAGE_READ,
                  messageReceipt
                );
              }
            },
            onMessageDeleted: (deletedMessage: CometChat.BaseMessage) => {
              if (
                !props.parentMessageId ||
                deletedMessage.getParentMessageId() == props.parentMessageId
              ) {
                messageUpdate(
                  CometChatUIKitConstants.messages.MESSAGE_DELETED,
                  deletedMessage
                );
              }
            },
            onMessageEdited: (editedMessage: CometChat.BaseMessage) => {
              if (
                !props.parentMessageId ||
                editedMessage.getParentMessageId() == props.parentMessageId
              ) {
                messageUpdate(
                  CometChatUIKitConstants.messages.MESSAGE_EDITED,
                  editedMessage
                );
              }
            },
            onTransientMessageReceived: (
              transientMessage: CometChat.TransientMessage
            ) => {
              let liveReaction: any = transientMessage.getData();
              if (
                transientMessage.getReceiverType() ==
                  CometChatUIKitConstants.MessageReceiverType.user &&
                props.user &&
                transientMessage?.getSender().getUid() == props.user.getUid() &&
                transientMessage.getReceiverId() == loggedInUser?.getUid()
              ) {
                CometChatMessageEvents.ccLiveReaction.next(
                  liveReaction["LIVE_REACTION"]
                );
                return;
              } else if (
                transientMessage.getReceiverType() ==
                  CometChatUIKitConstants.MessageReceiverType.group &&
                props.group &&
                transientMessage.getReceiverId() == props.group.getGuid() &&
                transientMessage?.getSender().getUid() != loggedInUser?.getUid()
              ) {
                CometChatMessageEvents.ccLiveReaction.next(
                  liveReaction["LIVE_REACTION"]
                );
                return;
              }
            },
          })
        );
        CometChat.addGroupListener(
          groupListenerId,
          new CometChat.GroupListener({
            onGroupMemberScopeChanged: (
              message: CometChat.BaseMessage,
              changedUser: CometChat.User,
              newScope: CometChat.GroupMemberScope,
              oldScope: CometChat.GroupMemberScope,
              changedGroup: CometChat.Group
            ) => {
              messageUpdate(
                CometChatUIKitConstants.groupMemberAction.SCOPE_CHANGE,
                message,
                changedGroup,
                { user: changedUser, scope: newScope }
              );
            },
            onGroupMemberKicked: (
              message: CometChat.BaseMessage,
              kickedUser: CometChat.User,
              kickedBy: CometChat.User,
              kickedFrom: CometChat.Group
            ) => {
              messageUpdate(
                CometChatUIKitConstants.groupMemberAction.KICKED,
                message,
                kickedFrom,
                {
                  user: kickedUser,
                  hasJoined: false,
                }
              );
            },
            onGroupMemberBanned: (
              message: CometChat.BaseMessage,
              bannedUser: CometChat.User,
              bannedBy: CometChat.User,
              bannedFrom: CometChat.Group
            ) => {
              messageUpdate(
                CometChatUIKitConstants.groupMemberAction.BANNED,
                message,
                bannedFrom,
                {
                  user: bannedUser,
                }
              );
            },
            onGroupMemberUnbanned: (
              message: CometChat.BaseMessage,
              unbannedUser: CometChat.User,
              unbannedBy: CometChat.User,
              unbannedFrom: CometChat.Group
            ) => {
              messageUpdate(
                CometChatUIKitConstants.groupMemberAction.UNBANNED,
                message,
                unbannedFrom,
                { user: unbannedUser }
              );
            },
            onMemberAddedToGroup: (
              message: CometChat.BaseMessage,
              userAdded: CometChat.User,
              userAddedBy: CometChat.User,
              userAddedIn: CometChat.Group
            ) => {
              messageUpdate(
                CometChatUIKitConstants.groupMemberAction.ADDED,
                message,
                userAddedIn,
                {
                  user: userAdded,
                  hasJoined: true,
                }
              );
            },
            onGroupMemberLeft: (
              message: CometChat.BaseMessage,
              leavingUser: CometChat.GroupMember,
              group: CometChat.Group
            ) => {
              messageUpdate(
                CometChatUIKitConstants.groupMemberAction.LEFT,
                message,
                group,
                {
                  user: leavingUser,
                }
              );
            },
            onGroupMemberJoined: (
              message: CometChat.BaseMessage,
              joinedUser: CometChat.GroupMember,
              joinedGroup: CometChat.Group
            ) => {
              messageUpdate(
                CometChatUIKitConstants.groupMemberAction.JOINED,
                message,
                joinedGroup,
                {
                  user: joinedUser,
                }
              );
            },
          })
        );
        // eslint-disable-next-line
      } catch (error: any) {
        if (props.onError) {
          let cometchatException = new CometChat.CometChatException({
            message: error.message,
          });
          props.onError(cometchatException);
        }
      }
    };

    const addCallListener = () => {
      try {
        CometChat.addCallListener(
          msgListenerId,
          new CometChat.CallListener({
            onIncomingCallReceived: (call: CometChat.Call) => {
              callActionMessageReceived(call);
            },
            onIncomingCallCancelled: (call: CometChat.Call) => {
              callActionMessageReceived(call);
            },
            onOutgoingCallRejected: (call: CometChat.Call) => {
              callActionMessageReceived(call);
            },
            onOutgoingCallAccepted: (call: CometChat.Call) => {
              callActionMessageReceived(call);
            },
          })
        );

        // eslint-disable-next-line
      } catch (error: any) {
        if (props.onError) {
          let cometchatException = new CometChat.CometChatException({
            message: error.message,
          });
          props.onError(cometchatException);
        }
      }
    };

    const callActionMessageReceived = (callMessage: CometChat.Call) => {
      try {
        if (
          checkIfMessageBelongsToCurrentChat(callMessage) &&
          ChatConfigurator.names.includes("calling")
        ) {
          addMessage(callMessage);
          // if (!isOnBottom) {
          //   if (props.scrollToBottomOnNewMessages) {
          //     setTimeout(() => {
          //       setScrollListToBottom.value = true;
          //     }, 100);
          //   } else {
          //     setScrollListToBottom.value = false;
          //     let countText = props.newMessageIndicatorText
          //       ? props.newMessageIndicatorText
          //       : UnreadCount.current.length > 1
          //       ? localize("NEW_MESSAGES")
          //       : localize("NEW_MESSAGE");
          //     UnreadCount.current.push(callMessage);
          //     newMessageCount.value =
          //       " ↓ " + UnreadCount.value.length + " " + countText;
          //   }
          // }
        }
      } catch (error: any) {
        if (props.onError) {
          let cometchatException = new CometChat.CometChatException({
            message: error.message,
          });
          props.onError(cometchatException);
        }
      }
    };

    const checkIfMessageBelongsToCurrentChat = (
      message: CometChat.BaseMessage
    ) => {
      const receiverType = message.getReceiverType();
      const receiverId = message.getReceiverId();
      const senderId = message.getSender().getUid();

      if (receiverType === CometChatUIKitConstants.MessageReceiverType.user) {
        return (
          (receiverId === currentTargetUser?.getUid() &&
            senderId === loggedInUser?.getUid()) ||
          (senderId === currentTargetUser?.getUid() &&
            receiverId === loggedInUser?.getUid())
        );
      } else {
        return currentTargetGroup?.getGuid() === receiverId;
      }
    };

    const fetchNextMessage = () => {
      let index = messagesList.value.length - 1;

      if (reinitialized) {
        if (props.messagesRequestBuilder) {
          requestBuilder = props.messagesRequestBuilder
            .setMessageId(messagesList.value[index].getId())
            .build();
        } else {
          if (props.user) {
            requestBuilder = new CometChat.MessagesRequestBuilder()
              .setUID(props.user.getUid())
              .setLimit(limit)
              .setTypes(types)
              .setMessageId(messagesList.value[index].getId())
              .setCategories(categories)
              .hideReplies(true)
              .build();
          } else {
            requestBuilder = new CometChat.MessagesRequestBuilder()
              .setGUID(props.group.getGuid())
              .setLimit(limit)
              .setTypes(types)
              .setMessageId(messagesList.value[index].getId())
              .setCategories(categories)
              .hideReplies(true)
              .build();
          }
        }
        requestBuilder
          .fetchNext()
          .then(
            (messageList: CometChat.BaseMessage[]) => {
              componentState.value = States.loading;
              // No Messages Found
              if (messageList.length === 0 && messagesList.value.length === 0) {
                componentState.value = States.empty;

                return;
              }
              numberOfTopScrolls =
                numberOfTopScrolls > 0 ? --numberOfTopScrolls : 0;
              if (messageList && messageList.length) {
                let lastMessage = messageList[messageList.length - 1];
                if (!lastMessage?.getReadAt()) {
                  if (!props.disableReceipt) {
                    CometChat.markAsRead(lastMessage);
                  } else {
                    UnreadCount.value = [];
                  }
                }
                componentState.value = States.loaded;
                messageList.forEach((message: CometChat.BaseMessage) => {
                  // if (
                  //   message.getCategory() ===
                  //     CometChatUIKitConstants.MessageCategory.action &&
                  //   message?.getSender().getUid() ===
                  //     CometChatUIKitConstants.messages.APP_SYSTEM
                  // ) {
                  // }
                  //if the sender of the message is not the loggedin user, mark it as read.
                  if (message?.getSender().getUid() != loggedInUser?.getUid()) {
                    //mark the message as delivered
                    markMessageAsDelivered(message);
                    // if (
                    //   message?.getSender().getUid() !== props.user?.getUid() &&
                    //   !message?.getReadAt()
                    // ) {
                    //   if (
                    //     message.getReceiverType() ===
                    //     CometChatUIKitConstants.MessageReceiverType.user
                    //   ) {
                    //   } else if (
                    //     message.getReceiverType() ===
                    //     CometChatUIKitConstants.MessageReceiverType.group
                    //   ) {
                    //   }
                    // }
                  }
                });

                appendMessages(messageList);
              } else if (messagesList.value.length) {
                componentState.value = States.loaded;
              }
            },
            (error: any) => {
              componentState.value = States.error;

              if (props.onError) {
                let cometchatException = new CometChat.CometChatException({
                  message: error.message,
                });
                props.onError(cometchatException);
              }
            }
          )
          .catch((error: any) => {
            componentState.value = States.error;
            if (props.onError) {
              let cometchatException = new CometChat.CometChatException({
                message: error.message,
              });
              props.onError(cometchatException);
            }
          });
      }
    };

    const markMessageAsDelivered = (message: CometChat.BaseMessage) => {
      if (
        !props.disableReceipt &&
        message?.getSender().getUid() !== loggedInUser?.getUid() &&
        Object.prototype.hasOwnProperty.call(message, "deliveredAt") === false
      ) {
        CometChat.markAsDelivered(message);
      }
    };

    const appendMessages = (messages: any) => {
      messagesList.value.push(...messages);
      messageCount = messagesList.value.length;
      if (messageCount > props.thresholdValue) {
        keepRecentMessages = true;
        reInitializeMessageBuilder();
      }
      componentState.value = States.loaded;
    };

    const markAllMessagesAsDelivered = (
      readMessage: CometChat.MessageReceipt,
      messageKey: number
    ) => {
      for (let i = messageKey; i >= 0; i--) {
        if (!messagesList.value[i].getDeliveredAt()) {
          messagesList.value[i].setDeliveredAt(readMessage.getDeliveredAt());
        }
      }
    };

    const prependMessages = (messages: CometChat.BaseMessage[]) => {
      try {
        messagesList.value = [...messages, ...messagesList.value];
        messageCount = messagesList.value.length;
        if (messageCount > props.thresholdValue) {
          keepRecentMessages = false;
          reInitializeMessageBuilder();
        }
        componentState.value = States.loaded;
        if (chatChanged) {
          CometChatUIEvents.ccActiveChatChanged.next({
            user: currentTargetUser,
            group: currentTargetGroup,
            message: messagesList.value[messagesList.value?.length - 1],
          });
          chatChanged = false;
        }
        // eslint-disable-next-line
      } catch (error: any) {
        componentState.value = States.error;
        if (props.onError) {
          let cometchatException = new CometChat.CometChatException({
            message: error.message,
          });
          props.onError(cometchatException);
        }
      }
    };

    const scrollToBottom = (skipRequestBuilderCreation = true) => {
      try {
        setScrollListToBottom.value = true;
        newMessageCount.value = null;
        isOnBottom = true;

        if (!skipRequestBuilderCreation) {
          if (numberOfTopScrolls > 0) {
            messagesList.value = [];
            numberOfTopScrolls = 0;
            reinitialized = false;
            messagesList.value = [];
            UnreadCount.value = [];
            createRequestBuilder();
            nextTick(() => {
              setScrollListToBottom.value = true;
            });
          }
        } else {
          let lastMessage: CometChat.BaseMessage;
          if (UnreadCount.value.length) {
            lastMessage = UnreadCount.value[UnreadCount.value.length - 1];

            UnreadCount.value = [];
          } else {
            lastMessage = messagesList.value[messagesList.value.length - 1];
          }

          if (
            !props.disableReceipt &&
            lastMessage &&
            !lastMessage.getReadAt() &&
            lastMessage.getSender().getUid() !== loggedInUser.getUid()
          ) {
            CometChat.markAsRead(lastMessage)
              .then((res: CometChat.MessageReceipt) => {
                CometChatMessageEvents.ccMessageRead.next(lastMessage);
                let messageKey = messagesList.value.findIndex(
                  (m: CometChat.BaseMessage) =>
                    m.getId() === Number(res?.getMessageId())
                );
                if (messageKey > -1) {
                  markAllMessagAsRead(res, messageKey);
                }
              })
              .catch((er: any) => {
                //nothing
              });
          } else {
            UnreadCount.value = [];
          }
        }
        // eslint-disable-next-line
      } catch (error: any) {
        if (props.onError) {
          let cometchatException = new CometChat.CometChatException({
            message: error.message,
          });
          props.onError(cometchatException);
        }
      }
    };

    const reInitializeMessageBuilder = () => {
      if (!props.parentMessageId) {
        messageCount = 0;
      }
      requestBuilder = null;
      CometChat.removeMessageListener(msgListenerId);
      CometChat.removeGroupListener(groupListenerId);
      CometChat.removeCallListener(callListenerId);
      reInitializeMessageList();
    };

    const reInitializeMessageList = () => {
      reinitialized = true;
      msgListenerId = "message_" + new Date().getTime();
      groupListenerId = "group_" + new Date().getTime();
      callListenerId = "call_" + new Date().getTime();
      addMessageEventListeners();
      if (props.messagesRequestBuilder) {
        if (keepRecentMessages) {
          messagesList.value.splice(1, messagesList.value.length - 30);
        } else {
          messagesList.value.splice(30);
        }
        requestBuilder = props.messagesRequestBuilder;
      } else {
        if (keepRecentMessages) {
          messagesList.value.splice(0, messagesList.value.length - 30);

          scrollToBottom(true);
        } else {
          messagesList.value.splice(30);
        }
      }
    };

    const setMessageOptions = (
      msgObject: CometChat.BaseMessage
    ): Array<CometChatActionsIcon | CometChatActionsView> => {
      let options: Array<CometChatActionsIcon | CometChatActionsView> = [];
      if (
        messagesTemplate &&
        messagesTemplate.length > 0 &&
        !msgObject.getDeletedAt() &&
        msgObject.getType() !==
          CometChatUIKitConstants.MessageTypes.groupMember &&
        msgObject?.getCategory() !==
          CometChatUIKitConstants.MessageCategory.call
      ) {
        try {
          messagesTemplate.forEach((element: any) => {
            if (element.type === msgObject.getType()) {
              options = setOptionsCallback(
                element?.options(loggedInUser, msgObject, theme.value)
              );
            }
          });
        } catch (error: any) {
          //error
        }
      }
      return options;
    };

    const setOptionsCallback = (
      options: Array<CometChatActionsIcon | CometChatActionsView>
    ) => {
      options.forEach((element: CometChatActionsIcon) => {
        switch (element.id) {
          case CometChatUIKitConstants.MessageOption.deleteMessage:
            if (!element.onClick) {
              element.onClick = deleteCallback as () => void;
            }
            break;
          case CometChatUIKitConstants.MessageOption.editMessage:
            if (!element.onClick) {
              element.onClick = editCallback as () => void;
            }
            break;
          case CometChatUIKitConstants.MessageOption.translateMessage:
            if (!element.onClick) {
              // element.onClick = onTranslateMessage
            }
            break;
          case CometChatUIKitConstants.MessageOption.copyMessage:
            if (!element.onClick) {
              element.onClick = copyCallback as () => void;
            }
            break;
          case CometChatUIKitConstants.MessageOption.reactToMessage:
            if (!element.onClick) {
              // element.onClick = onReactMessage
            }
            break;
          case CometChatUIKitConstants.MessageOption.replyInThread:
            if (!element.onClick) {
              element.onClick = threadCallback as () => void;
            }
            break;
          default:
            break;
        }
      });
      return options;
    };

    const deleteCallback = (id: number) => {
      let messageObject: CometChat.BaseMessage = getMessageById(id);
      if (messageObject) {
        deleteMessage(messageObject);
      }
    };

    const getBubbleWrapper = (message: CometChat.BaseMessage) => {
      let view;
      if (
        messageTypesMap &&
        messageTypesMap[message?.getCategory() + "_" + message?.getType()] &&
        messageTypesMap[message?.getCategory() + "_" + message?.getType()]
          .bubbleView
      ) {
        view =
          messageTypesMap[
            message?.getCategory() + "_" + message?.getType()
          ].bubbleView(message);
        return view;
      } else {
        view = null;
        return view;
      }
    };

    const getMessageById = (id: number) => {
      let messageKey = messagesList.value.findIndex(
        (m: any) => m.getId() === id
      );
      if (messageKey > -1) {
        return messagesList.value[messageKey];
      } else {
        return false;
      }
    };

    const deleteMessage = (message: CometChat.BaseMessage) => {
      try {
        const messageId: any = message.getId();
        CometChat.deleteMessage(messageId)
          .then((deletedMessage: any) => {
            removeMessage(deletedMessage);
            CometChatMessageEvents.ccMessageDeleted.next(deletedMessage);
          })
          .catch((error: any) => {
            if (props.onError) {
              let cometchatException = new CometChat.CometChatException({
                message: error.message,
              });
              props.onError(cometchatException);
            }
          });
        // eslint-disable-next-line
      } catch (error: any) {
        if (props.onError) {
          let cometchatException = new CometChat.CometChatException({
            message: error.message,
          });
          props.onError(cometchatException);
        }
      }
    };

    const removeMessage = (message: CometChat.BaseMessage) => {
      try {
        const messageKey = messagesList.value.findIndex(
          (msg: any) => msg.getId() === message.getId()
        );
        if (messageKey > -1) {
          messagesList.value.splice(messageKey, 1, message);
          messagesList.value = [...messagesList.value];
        }
        // eslint-disable-next-line
      } catch (error: any) {
        if (props.onError) {
          let cometchatException = new CometChat.CometChatException({
            message: error.message,
          });
          props.onError(cometchatException);
        }
      }
    };

    const editCallback = (id: number) => {
      let messageObject: CometChat.BaseMessage = getMessageById(id);
      if (messageObject) {
        onEditMessage(messageObject);
      }
    };

    const onEditMessage = (object: CometChat.BaseMessage) => {
      CometChatMessageEvents.ccMessageEdited.next({
        message: object,
        status: MessageStatus.inprogress,
      });
    };

    const copyCallback = (id: number) => {
      let messageObject: CometChat.TextMessage = getMessageById(id);
      if (messageObject) {
        onCopyMessage(messageObject);
      }
    };

    const onCopyMessage = (object: CometChat.TextMessage) => {
      navigator.clipboard.writeText(object.getText());
    };

    const openThreadView = (message: CometChat.BaseMessage) => {
      if (props.onThreadRepliesClick) {
        props.onThreadRepliesClick(message, getThreadedMessageBubble);
      }
    };

    const threadCallback = (id: number) => {
      let messageObject: any = getMessageById(id);
      openThreadView(messageObject);
    };

    const getThreadedMessageBubble = (item: CometChat.BaseMessage) => {
      return getBubbleWrapper(item)
        ? getBubbleWrapper(item)
        : {
            componentName: "CometChatMessageBubble",
            props: {
              id: item?.getId() || item?.getMuid(),
              messageBubbleStyle: MessageBubbleStyle(
                item,
                //theme,
                props.alignment,
                loggedInUser
              ),
              alignment: threadedAlignment,
              replyView: null,
              threadView: null,
              options: setMessageOptions(item),
              leadingView: getBubbleLeadingView(item),
              headerView: getBubbleHeaderView(item),
              footerView: getBubbleFooterView(item),
              contentView: getContentView(item),
            },
          };
    };

    const getThreadCount = (message: CometChat.BaseMessage) => {
      const replyCount = message?.getReplyCount() || 0;
      const suffix = replyCount === 1 ? localize("REPLY") : localize("REPLIES");
      return `${localize("VIEW")} ${replyCount} ${suffix}`;
    };

    const markAllMessagAsRead = (
      readMessage: CometChat.MessageReceipt,
      messageKey: number
    ) => {
      const messages: any = messagesList.value.map(
        (m: CometChat.BaseMessage, i: number) => {
          if (
            i <= messageKey &&
            m.getSender().getUid() === loggedInUser?.getUid() &&
            !m.getReadAt()
          ) {
            m.setReadAt(readMessage.getReadAt());
          }
          return m;
        }
      );

      messagesList.value = messages;

      CometChatMessageEvents.ccMessageRead.next(messagesList.value[messageKey]);
    };

    const bottomCallback = async () => {
      fetchNextMessage();
    };
    const topCallback = async () => {
      if (!changed) {
        setScrollListToBottom.value = false;

        incrementTopScrollIfDataExists = true;
        await fetchPreviousMessages();
        incrementTopScrollIfDataExists = false;
      }
    };
    const fetchPreviousMessages = async () => {
      if (reinitialized) {
        if (props.messagesRequestBuilder) {
          requestBuilder = props.messagesRequestBuilder
            .setMessageId(messagesList.value[0].getId())
            .build();
        } else {
          if (currentTargetUser) {
            requestBuilder = new CometChat.MessagesRequestBuilder()
              .setUID(currentTargetUser.getUid())
              .setLimit(limit)
              .setTypes(types)
              .setMessageId(messagesList.value[0].getId())
              .setCategories(categories)
              .hideReplies(true)
              .build();
          } else {
            requestBuilder = new CometChat.MessagesRequestBuilder()
              .setGUID(currentTargetGroup.getGuid())
              .setLimit(limit)
              .setTypes(types)
              .setMessageId(messagesList.value[0].getId())
              .setCategories(categories)
              .hideReplies(true)
              .build();
          }
        }
      }
      await requestBuilder
        .fetchPrevious()
        .then(
          (messageList: CometChat.BaseMessage[]) => {
            componentState.value = States.loading;
            // No Messages Found
            if (messageList.length === 0 && messagesList.value.length === 0) {
              componentState.value = States.empty;
              return;
            }
            if (messageList && messageList.length > 0) {
              if (
                incrementTopScrollIfDataExists &&
                messageList.length + messagesList.value.length >=
                  props.thresholdValue
              ) {
                isOnBottom = false;

                ++numberOfTopScrolls;
              }
              let lastMessage = messageList[messageList.length - 1];
              if (!lastMessage?.getReadAt()) {
                if (!props.disableReceipt) {
                  CometChat.markAsRead(lastMessage)
                    .then((receipt: CometChat.MessageReceipt) => {
                      let messageKey = messagesList.value.findIndex(
                        (m: CometChat.BaseMessage) =>
                          m.getId() === Number(receipt?.getMessageId())
                      );
                      if (messageKey > -1) {
                        markAllMessagAsRead(receipt, messageKey);
                      }
                    })
                    .catch((error: any) => {
                      if (props.onError) {
                        let cometchatException =
                          new CometChat.CometChatException({
                            message: error.message,
                          });
                        props.onError(cometchatException);
                      }
                    });
                } else {
                  UnreadCount.value = [];
                }
              }
              componentState.value = States.loaded;
              messageList.forEach((message: CometChat.BaseMessage) => {
                // if (
                //   message.getCategory() ===
                //     CometChatUIKitConstants.MessageCategory.action &&
                //   message?.getSender().getUid() ===
                //     CometChatUIKitConstants.messages.APP_SYSTEM
                // ) {
                // }
                //if the sender of the message is not the loggedin user, mark it as read.
                if (message?.getSender().getUid() != loggedInUser?.getUid()) {
                  //mark the message as delivered
                  if (!props.disableReceipt) {
                    CometChat.markAsDelivered(message).then(
                      (receipt: CometChat.MessageReceipt) => {
                        let messageKey = messagesList.value.findIndex(
                          (m: CometChat.BaseMessage) =>
                            m.getId() === Number(receipt?.getMessageId())
                        );
                        if (messageKey > -1) {
                          markAllMessagesAsDelivered(receipt, messageKey);
                        }
                      }
                    );
                  }
                }
              });
              prependMessages(messageList);
            } else {
              componentState.value = States.loaded;
            }
          },
          (error: any) => {
            componentState.value = States.error;
            if (props.onError) {
              let cometchatException = new CometChat.CometChatException({
                message: error.message,
              });
              props.onError(cometchatException);
            }
          }
        )
        .catch((error: any) => {
          componentState.value = States.error;
          if (props.onError) {
            let cometchatException = new CometChat.CometChatException({
              message: error.message,
            });
            props.onError(cometchatException);
          }
        });
    };

    const getBubbleAlignment = (message: CometChat.BaseMessage) => {
      let alignment: MessageBubbleAlignment = MessageBubbleAlignment.center;
      if (props.alignment == MessageListAlignment.left) {
        alignment = MessageBubbleAlignment.left;
      } else {
        if (
          message?.getType() ==
            CometChatUIKitConstants.MessageTypes.groupMember ||
          message?.getCategory() == CometChatUIKitConstants.MessageCategory.call
        ) {
          alignment = MessageBubbleAlignment.center;
        } else if (
          !message?.getSender() ||
          (message?.getSender().getUid() == loggedInUser.getUid() &&
            message?.getType() !=
              CometChatUIKitConstants.MessageTypes.groupMember)
        ) {
          alignment = MessageBubbleAlignment.right;
        } else {
          alignment = MessageBubbleAlignment.left;
        }
      }
      return alignment;
    };

    const getBubbleLeadingView = (item: CometChat.BaseMessage): any => {
      if (
        item.getCategory() !== CometChatUIKitConstants.MessageCategory.action &&
        item?.getCategory() !== CometChatUIKitConstants.MessageCategory.call &&
        props.showAvatar &&
        showHeaderTitle(item)
      ) {
        return {
          html: `              <cometchat-avatar
                  name="${item?.getSender()?.getName()}"
                  style="${props.avatarStyle}"
                  image="${item?.getSender()?.getAvatar()}"
                >
                </cometchat-avatar>`,
        };
      } else {
        return null;
      }
    };

    const getSmartReplyView = () => {
      return smartReplyView;
    };

    const getOngoingCallView = () => {
      return ongoingCallView;
    };

    const getListStyle = () => {
      return new ListStyle({
        height: props.messageListStyle.height || "100%",
        width: props.messageListStyle.width || "100%",
        background:
          props.messageListStyle.background ||
          theme.value.palette.getBackground(),
      });
    };

    return {
      setScrollListToBottom,
      componentState,
      MessageTypesConstant,
      textStyle,
      MessageBubbleStyle,
      messagesList,
      theme,
      loggedInUser,
      MessageBubbleAlignment: MessageBubbleAlignment,
      getBubbleAlignment,
      getContentView,
      getHeaderView,
      getFooterView,
      MessageCategory,

      getBubbleLeadingView,
      getListStyle,
      getBubbleFooterDate,
      getBubbleFooterView,
      getBubbleHeaderView,
      newMessageCount,
      unreadMessagesStyle,
      scrollToBottom,
      UnreadCount,
      isOnBottom,
      setMessageOptions,
      openThreadView,
      getThreadCount,
      threadedAlignment,
      openThreadViewToggle,
      currentMessage,
      getBubbleWrapper,
      topCallback,
      bottomCallback,
      getEmptyHtml,
      getLoaderHtml,
      getErrorHtml,
      getMessageBubbleDate,
      MessageThreadViewStyle,
      unreadMessageStyle,
      fetchNextMessage,
      getLoggedinUser,
      getMessageListDivStyle,
      getDividerStyle,
      threadOpenIcon,
      SearchIcon,
      TitleAlignment,
      getBubbleThreadView,
      showSmartReplyRef,
      getSmartReplyView,
      MessageListFooterStyle,
      MessageListHeaderStyle,
      confirmDialogView,
      getBottomView,
      showOngoingCallRef,
      getOngoingCallView,
      ListStyle,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cc-messagelist {
  height: 75vh;
  width: 100%;
  overflow-y: auto;
}
.cc-messagelist__wrapper {
  height: 100%;
  width: 100%;
  padding: 8px;
  overflow-y: hidden;
}
.cc-messagelist__bubblefooter {
  display: flex;
  justify-content: center;
  align-items: center;
}
.cc-messagelist__date__container {
  text-align: center;
  margin-top: 8px;
}
.cc-messagelist__date {
  border-radius: 10px;
}

.cc-messagelist__messageindicator {
  height: 25px;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cc-messagelist__footerview {
  z-index: 10;
  position: relative;
  bottom: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.cc-messagelist__decoratormessage {
  margin: 0;
  line-height: 30px;
  word-wrap: break-word;
  padding: 0 8px;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.cc-messagelist::-webkit-scrollbar {
  background: transparent;
  width: 8px;
}
.cc-messagelist::-webkit-scrollbar-thumb {
  background: rgb(232, 229, 229);
  border-radius: 8px;
}
</style>
