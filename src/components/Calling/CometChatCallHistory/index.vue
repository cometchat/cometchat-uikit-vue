<template>
  <div class="cc-callhistory" :style="getCallStyle()">
    <div class="cc-menus" v-if="menus">
      <div v-if="menus.html" v-html="menus.html"></div>
      <component
        v-else
        :is="menus.componentName!"
        v-bind="{ ...menus.props }"
        v-on="menus?.listeners"
      >
        <template v-for="(item, key) in menus.slots" :key="key">
          <div :v-slot="[key]" :v-html="item"></div>
        </template>
      </component>
    </div>
    <CometChatList
      :hideSearch="true"
      :onScrolledToBottom="fetchNextcallList"
      :list="callsList"
      :hideError="hideError"
      listItemKey="none"
      :title="title"
      :emptyStateText="emptyStateText"
      :loadingIconURL="loadingIconURL"
      :titleAlignment="titleAlignment"
      :loadingStateView="loadingStateView"
      :emptyStateView="emptyStateView"
      :errorStateText="errorStateText"
      :errorStateView="errorStateView"
      :listStyle="getListStyle()"
      :state="state"
      sectionHeaderKey=""
    >
      <template v-slot:listItem="{ item }">
        <div
          v-if="listItemView && listItemView(item) && listItemView(item)!.html"
          v-html="listItemView(item)!.html"
        ></div>
        <component
          v-else-if="
            listItemView &&
            listItemView(item)! &&
            listItemView(item)?.componentName
          "
          :is="listItemView(item)!.componentName!"
          v-bind="{ ...listItemView(item)?.props }"
          v-on="listItemView && listItemView(item) ? listItemView(item) : {}"
        >
          <template v-for="(html, key) in listItemView(item)!.slots" :key="key">
            <div :v-slot="[key]" :v-html="html"></div>
          </template>
        </component>

        <cometchat-list-item
          v-else
          :title="getAvatarDetails(item, 'name')"
          :avatarURL="getAvatarDetails(item, 'url')"
          :avatarName="getAvatarDetails(item, 'name')"
          :listItemStyle="getListItemStyle(item)"
          :avatarStyle="getStyleAvatar()"
          :hideSeparator="hideSeparator"
          @cc-listitem-clicked="onClick(item)"
          :isActive="getActiveCall(item)"
        >
          <div slot="subtitleView" class="cc-callhistory__subtitleview">
            <div
              v-if="subtitleView && subtitleView.html"
              v-html="subtitleView.html"
            ></div>
            <component
              v-else-if="subtitleView && subtitleView.componentName"
              :is="subtitleView.componentName!"
              v-bind="{ ...subtitleView.props }"
              v-on="subtitleView?.listeners"
            >
              <template v-for="(html, key) in subtitleView.slots" :key="key">
                <div :v-slot="[key]" :v-html="html"></div>
              </template>
            </component>

            <template v-else>
              <div
                slot="subtitleView"
                :style="getSubtitleStyle()"
                class="cc-callhistory__subtitleview"
              >
                <div class="cc-call__icon">
                  <cometchat-icon
                    :iconStyle="getIconStyle()"
                    :URL="getCallTypeIcon(item)"
                  ></cometchat-icon>
                </div>
                <div class="cc-call__type">
                  {{ getSubtitle(item) }}
                </div>
              </div>
            </template>
          </div>
          <div slot="menuView" class="cc-callhistory__options" v-if="option">
            <cometchat-menu-list :data="option"> </cometchat-menu-list>
          </div>
          <div slot="tailView" class="cc-callhistory__tailview">
            <div
              class="tail__view"
              v-if="selectionMode == selectionmodeEnum.none"
            >
              <div class="cc-callhistory__date">
                <cometchat-date
                  :dateStyle="getStyleDate()"
                  :timestamp="item?.sentAt"
                  :pattern="datePattern"
                ></cometchat-date>
              </div>
            </div>
            <div
              class="cc-callhistory__selectionview"
              v-if="selectionMode != selectionmodeEnum.none"
            >
              <div v-if="selectionMode == selectionmodeEnum.single">
                <cometchat-radio-button
                  @cc-radio-button-changed="onSelect ? onSelect(item) : null"
                ></cometchat-radio-button>
              </div>
              <div v-if="selectionMode == selectionmodeEnum.multiple">
                <cometchat-checkbox
                  @cc-checkbox-changed="onSelect ? onSelect(item) : null"
                ></cometchat-checkbox>
              </div>
            </div>
          </div>
        </cometchat-list-item>
      </template>
    </CometChatList>
  </div>
</template>

<script lang="ts">
/*es-lint disabled*/

import {
  defineComponent,
  inject,
  onBeforeMount,
  onBeforeUnmount,
  PropType,
  Ref,
  ref,
} from "vue";
import {
  CallHistoryStyle,
  CallingDetailsUtils,
  DatePatterns,
  ListStyle,
  MessageStatus,
  SelectionMode,
  States,
  TitleAlignment,
} from "uikit-utils-lerna";

import { CometChat } from "@cometchat-pro/chat";
import "my-cstom-package-lit";

import {
  CometChatCallEvents,
  CometChatMessageEvents,
  CometChatOption,
  CometChatTheme,
  CometChatUIKitConstants,
  fontHelper,
  IMessages,
  localize,
} from "uikit-resources-lerna";
import { Subscription } from "rxjs";
import { LoadingIcon } from "../../../assets";
import {
  AvatarStyle,
  DateStyle,
  IconStyle,
  ListItemStyle,
} from "my-cstom-package-lit";

import CometChatList from "../../CometChatList/index.vue";
export default defineComponent({
  name: "CometChatCallHistory",
  components: { CometChatList },
  props: {
    title: { type: String, default: () => localize("CALLS") },
    titleAlignment: {
      type: Object as PropType<TitleAlignment>,
      default: TitleAlignment.left,
    },
    messageRequestBuilder: { type: CometChat.MessagesRequestBuilder },

    loadingIconURL: { type: String, default: LoadingIcon },
    loadingStateView: { type: Object as PropType<ViewType> },
    hideError: { type: Boolean, default: false },
    errorStateText: {
      type: String,
      default: () => localize("SOMETHING_WRONG"),
    },
    errorStateView: { type: Object as PropType<ViewType> },
    emptyStateText: { type: String, default: () => localize("NO_CALLS_FOUND") },
    emptyStateView: { type: Object as PropType<ViewType> },
    listItemView: {
      type: Function as PropType<(callMessage: CometChat.Call) => ViewType>,
    },
    hideSeparator: { type: Boolean, default: false },
    activeCall: { type: Object as PropType<CometChat.Call | undefined> },
    selectionMode: {
      type: Object as PropType<SelectionMode>,
      default: SelectionMode.none,
    },
    subtitleView: { type: Object as PropType<ViewType> },
    option: {
      type: Function as PropType<
        (callMessage: CometChat.Call) => CometChatOption[]
      >,
    },
    datePattern: {
      type: Object as PropType<DatePatterns>,
      default: DatePatterns.time,
    },
    onItemClick: {
      type: Function as PropType<(callMessage: CometChat.Call) => void>,
    },
    onSelect: {
      type: Function as PropType<(callMessage: CometChat.Call) => void>,
    },
    menus: { type: Object as PropType<ViewType> },
    dateStyle: { type: DateStyle, default: new DateStyle({}) },
    avatarStyle: {
      type: AvatarStyle,
      default: new AvatarStyle({
        borderRadius: "16px",
        width: "32px",
        height: "32px",
      }),
    },
    listItemStyle: { type: ListItemStyle, default: {} },
    callHistoryStyle: {
      type: CallHistoryStyle,
      default: new CallHistoryStyle({}),
    },

    onError: {
      type: Function as PropType<(error: CometChat.CometChatException) => void>,
      default: (error: any) => {
        console.log(error);
      },
    },
  },

  setup(props) {
    let callsRequest!: CometChat.MessagesRequest | null;
    let selectionmodeEnum: typeof SelectionMode = SelectionMode;
    let state: Ref<States> = ref(States.loading);
    let ccOutgoingCall!: Subscription;
    let ccCallAccepted!: Subscription;
    let ccCallRejected!: Subscription;
    let ccMessageSent!: Subscription;
    let { theme, switchThemeMode }: any = inject(
      "theme",
      new CometChatTheme({})
    )!;
    let listStyle: ListStyle = {};
    let limit = 30;
    let callsList: Ref<CometChat.Call[]> = ref([]);
    let callsListenerId: string = "callsList_" + new Date().getTime();
    let loggedInUser: Ref<CometChat.User | null> = ref(null);

    let iconStyle: IconStyle = {
      height: "16px",
      width: "16px",
      iconTint: "RGBA(20, 20, 20, 0.68)",
    };
    let styleAvatar: AvatarStyle = {};
    let styleDate: DateStyle = {};
    let styleCallHistory: CallHistoryStyle = {};

    onBeforeMount(() => {
      setThemeStyle();
      CometChat.getLoggedinUser().then((user: CometChat.User | null) => {
        loggedInUser.value = user;
        callsRequest = getRequestBuilder();
        fetchNextcallList();
        attachListeners();
        subscribeToEvents();
      });
      state.value = States.loading;
    });

    onBeforeUnmount(() => {
      callsRequest = null;

      removeListener();
      unsubscribeToEvents();
    });

    const subscribeToEvents = () => {
      ccCallAccepted = CometChatCallEvents.ccCallAccepted.subscribe(
        (call: CometChat.Call) => {
          addCall(call);
        }
      );
      ccCallRejected = CometChatCallEvents.ccCallRejected.subscribe(
        (call: CometChat.Call) => {
          addCall(call);
        }
      );
      ccOutgoingCall = CometChatCallEvents.ccOutgoingCall.subscribe(
        (call: CometChat.Call) => {
          addCall(call);
        }
      );
      ccMessageSent = CometChatMessageEvents.ccMessageSent.subscribe(
        (item: IMessages) => {
          if (
            item.message.getCategory() !==
              CometChatUIKitConstants.MessageCategory.call &&
            item.message.getType() !== CometChat.CALL_TYPE.VIDEO
          ) {
            return;
          }
          if (item.status !== MessageStatus.success) {
            return;
          }
          addCall(item.message as CometChat.Call);
        }
      );
    };
    const unsubscribeToEvents = () => {
      ccCallAccepted?.unsubscribe();
      ccCallRejected?.unsubscribe();
      ccOutgoingCall?.unsubscribe();
      ccMessageSent?.unsubscribe();
    };

    const attachListeners = () => {
      CometChat.addCallListener(
        callsListenerId,
        new CometChat.CallListener({
          onIncomingCallReceived: (call: CometChat.Call) => {
            addCall(call);
          },
          onIncomingCallCancelled: (call: CometChat.Call) => {
            addCall(call);
          },
          onOutgoingCallAccepted: (call: CometChat.Call) => {
            addCall(call);
          },
          onOutgoingCallRejected: (call: CometChat.Call) => {
            addCall(call);
          },
        })
      );
    };
    const removeListener = () => {
      CometChat.removeCallListener(callsListenerId);
    };

    const fetchNextcallList = () => {
      state.value = States.loading;

      try {
        callsRequest!.fetchPrevious().then(
          (callList: CometChat.BaseMessage[]) => {
            if (
              (callList.length <= 0 && callsList.value?.length <= 0) ||
              (callList.length === 0 && callsList.value?.length <= 0)
            ) {
              state.value = States.empty;
            } else {
              state.value = States.loaded;
              callsList.value = [
                ...callsList.value,
                ...(callList.reverse() as CometChat.Call[]),
              ];
            }
          },
          (error: any) => {
            state.value = States.error;
          }
        );
      } catch (error: any) {
        state.value = States.error;
      }
    };
    const getSubtitle = (call: CometChat.Call) => {
      return CallingDetailsUtils.getCallStatus(call, loggedInUser.value!);
    };

    const onClick = (call: CometChat.Call) => {
      if (props.onItemClick) {
        props.onItemClick(call);
      }
    };

    const getActiveCall = (call: CometChat.Call) => {
      if (props.selectionMode == SelectionMode.none || !props.selectionMode) {
        if (call.getId() == props.activeCall?.getId()) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    };
    const getCallTypeIcon = (call: CometChat.Call) => {
      if (call.getType() == CometChatUIKitConstants.MessageTypes.audio) {
        return "assets/Audio-Call.svg";
      } else {
        return "assets/Video-call.svg";
      }
    };
    const getCallerName = (call: CometChat.Call) => {
      if (CallingDetailsUtils.isSentByMe(call, loggedInUser.value!)) {
        return call.getReceiver().getName();
      }
      return call.getSender().getName();
    };
    const getRequestBuilder = () => {
      if (props.messageRequestBuilder) {
        return props.messageRequestBuilder.build();
      } else {
        return new CometChat.MessagesRequestBuilder()
          .setLimit(limit)
          .setTypes(CallingDetailsUtils.getDefaultMessageTypes())
          .setCategories(CallingDetailsUtils.getDefaultCategories())
          .build();
      }
    };

    const addCall = (call: CometChat.Call) => {
      callsList.value.unshift(call);
    };
    const getCallStyle = () => {
      return {
        height: styleCallHistory.height,
        width: styleCallHistory.width,
        background: styleCallHistory.background,
        border: styleCallHistory.border,
        borderRadius: styleCallHistory.borderRadius,
      };
    };
    const setThemeStyle = () => {
      setCallsStyle();
      iconStyle.iconTint = theme.value.palette.getAccent600();
      setAvatarStyle();
      setDateStyle();

      listStyle = {
        height: styleCallHistory.height || "100%",
        titleTextFont: styleCallHistory.titleTextFont,
        titleTextColor: styleCallHistory.titleTextColor,
        emptyStateTextFont: styleCallHistory.emptyStateTextFont,
        emptyStateTextColor: styleCallHistory.emptyStateTextColor,
        errorStateTextFont: styleCallHistory.errorStateTextFont,
        errorStateTextColor: styleCallHistory.errorStateTextColor,
        loadingIconTint: styleCallHistory.loadingIconTint,
        separatorColor: styleCallHistory.separatorColor,
      };
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
      styleAvatar = { ...defaultStyle, ...props.avatarStyle };
    };
    const setDateStyle = () => {
      let defaultStyle: DateStyle = new DateStyle({
        textFont: fontHelper(theme.value.typography.caption2),
        textColor: theme.value.palette.getAccent600(),
        background: "transparent",
      });
      styleDate = { ...defaultStyle, ...props.dateStyle };
    };

    const getListItemStyle = (call: CometChat.Call) => {
      let defaultStyle: ListItemStyle = new ListItemStyle({
        height: "45px",
        width: "100%",
        background: theme.value.palette.getBackground(),
        activeBackground: theme.value.palette.getAccent100(),
        borderRadius: "0",
        titleFont: fontHelper(theme.value.typography.title2),
        titleColor: CallingDetailsUtils.isMissedCall(call, loggedInUser.value!)
          ? theme.value.palette.getError()
          : theme.value.palette.getAccent(),
        border: "none",
        separatorColor: theme.value.palette.getAccent200(),
        hoverBackground: theme.value.palette.getAccent50(),
      });
      return { ...defaultStyle, ...props.listItemStyle };
    };

    const setCallsStyle = () => {
      let defaultStyle: CallHistoryStyle = new CallHistoryStyle({
        subtitleTextFont: fontHelper(theme.value.typography.subtitle2),
        subtitleTextColor: theme.value.palette.getAccent600(),
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
      });
      styleCallHistory = { ...defaultStyle, ...props.callHistoryStyle };
    };

    const getAvatar = (
      userOrGroup: CometChat.User | CometChat.Group
    ): string => {
      return userOrGroup instanceof CometChat.User
        ? userOrGroup.getAvatar()
        : userOrGroup.getIcon();
    };

    const getAvatarDetails = (
      callMessage: CometChat.Call,
      requiredDetail: any
    ) => {
      let title = "",
        avatarURL = "";

      if (loggedInUser.value) {
        if (CallingDetailsUtils.isSentByMe(callMessage, loggedInUser.value)) {
          const receiver = callMessage.getReceiver();
          title = receiver.getName();
          avatarURL = getAvatar(receiver);
        } else {
          const sender = callMessage.getSender();
          title = sender.getName();
          avatarURL = getAvatar(sender);
        }
      }

      //return { title, avatarURL, avatarName: title };

      switch (requiredDetail) {
        case "url":
          return avatarURL;
        case "name":
          return title;
      }
    };

    const getSubtitleStyle = () => {
      return {
        font: styleCallHistory.subtitleTextFont,
        color: styleCallHistory.subtitleTextColor,
      };
    };

    const getListStyle = () => {
      return listStyle;
    };

    const getStyleAvatar = () => {
      return styleAvatar;
    };

    const getIconStyle = () => {
      return iconStyle;
    };

    const getStyleDate = () => {
      return styleDate;
    };
    return {
      getSubtitleStyle,
      getSubtitle,
      getCallStyle,
      getStyleDate,
      selectionmodeEnum,
      onClick,
      getListStyle,
      state,
      callsList,
      getCallerName,
      getListItemStyle,
      getActiveCall,
      getStyleAvatar,
      getCallTypeIcon,
      getIconStyle,
      getAvatarDetails,
      fetchNextcallList,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cc-callhistory {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 24px;
}
.cc-callhistory__tailview {
  position: relative;
}
.cc-menus {
  position: absolute;
  right: 12px;
  top: 6px;
}
.cc-callhistory__subtitleview {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
}
</style>
