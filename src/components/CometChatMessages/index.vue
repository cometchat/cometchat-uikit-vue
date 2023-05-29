<template>
  <div class="cc-messages-wrapper">
    <div
      class="cc-messages-wrapper__messages"
      :style="chatListStyle()"
      v-if="user || group"
    >
      <div class="cc-messages-wrapper__header" v-if="!hideMessageHeader">
        <div
          v-if="messageHeaderView"
          v-html="messageHeaderView"
          class="cc-messages__header-customview"
        ></div>

        <CometChatMessageHeader
          v-else
          :user="currentTargetUser"
          :group="currentTargetGroup"
          :subtitleView="messageHeaderConfiguration.subtitleView"
          :disableUsersPresence="
            messageHeaderConfiguration.disableUsersPresence
          "
          :protectedGroupIcon="messageHeaderConfiguration.protectedGroupIcon"
          :privateGroupIcon="messageHeaderConfiguration.privateGroupIcon"
          :menu="
            messageHeaderConfiguration.menu
              ? messageHeaderConfiguration.menu
              : getHeaderMenu()
          "
          :messageHeaderStyle="messageHeaderConfiguration?.messageHeaderStyle"
          :backButtonIconURL="messageHeaderConfiguration?.backButtonIconURL"
          :hideBackButton="messageHeaderConfiguration.hideBackButton"
          :onError="messageHeaderConfiguration?.onError"
          :onBack="messageHeaderConfiguration?.onBack"
          :listItemStyle="messageHeaderConfiguration.listItemStyle"
          :statusIndicatorStyle="
            messageHeaderConfiguration.statusIndicatorStyle
          "
          :avatarStyle="messageHeaderConfiguration.avatarStyle"
        >
        </CometChatMessageHeader>
      </div>

      <div v-if="messageListView">
        <div v-if="messageListView.html" v-html="messageListView.html"></div>
        <component
          v-else
          :is="messageListView.componentName"
          v-bind="{ ...messageListView.props }"
          v-on="messageListView?.listeners"
        >
          <template v-for="(html, key) in messageListView.slots" :key="key">
            <div :v-slot="[key]" :v-html="html"></div>
          </template>
        </component>
      </div>
      <div v-else class="cc-messages-wrapper__messages-list">
        <CometChatMessageList
          :disableSoundForMessages="disableSoundForMessages"
          :customSoundForMessages="customSoundForIncomingMessages"
          :emptyStateView="messageListConfiguration?.emptyStateView"
          :loadingStateView="messageListConfiguration?.loadingStateView"
          :user="currentTargetUser"
          :group="currentTargetGroup"
          :errorStateView="messageListConfiguration?.errorStateView"
          :disableReceipt="messageListConfiguration?.disableReceipt"
          :readIcon="messageListConfiguration?.readIcon"
          :deliveredIcon="messageListConfiguration?.deliveredIcon"
          :sentIcon="messageListConfiguration?.sentIcon"
          :waitIcon="messageListConfiguration?.waitIcon"
          :errorIcon="messageListConfiguration?.errorIcon"
          :alignment="messageListConfiguration?.alignment"
          :showAvatar="messageListConfiguration?.showAvatar"
          :datePattern="messageListConfiguration?.datePattern"
          :timestampAlignment="messageListConfiguration?.timestampAlignment"
          :DateSeparatorPattern="messageListConfiguration?.DateSeparatorPattern"
          :templates="messageListConfiguration?.messageTypes"
          :messagesRequestBuilder="
            messageListConfiguration.messagesRequestBuilder
          "
          :thresholdValue="messageListConfiguration?.thresholdValue"
          :onThreadRepliesClick="openThreadView"
          :headerView="messageListConfiguration?.headerView"
          :footerView="messageListConfiguration?.footerView"
          :avatarStyle="messageListConfiguration?.avatarStyle"
          :dateSeparatorStyle="messageListConfiguration?.dateSeparatorStyle"
          :messageListStyle="messageListConfiguration?.messageListStyle"
          :onError="messageListConfiguration?.onError"
        >
        </CometChatMessageList>
      </div>

      <div
        class="cc-messages-wrapper__composer"
        v-if="!hideMessageComposer && !openThreadedMessages"
      >
        <div
          v-if="messageComposerView && !openThreadedMessages"
          v-html="messageComposerView"
          class="cc-messages__composer--customview"
        ></div>

        <CometChatMessageComposer
          v-else
          :id="
            currentTargetUser
              ? currentTargetUser.getUid()
              : currentTargetGroup.getGuid()
          "
          :disableSoundForMessages="disableSoundForMessages"
          :customSoundForMessages="customSoundForOutgoingMessages"
          :user="currentTargetUser"
          :group="currentTargetGroup"
          :text="messageComposerConfiguration?.text"
          :headerView="messageComposerConfiguration?.headerView"
          :onTextChange="messageComposerConfiguration?.onTextChange"
          :attachmentIconURL="messageComposerConfiguration?.attachmentIconURL"
          :attachmentOptions="messageComposerConfiguration?.attachmentOptions"
          :secondaryButtonView="
            messageComposerConfiguration?.secondaryButtonView
          "
          :auxilaryButtonView="messageComposerConfiguration?.auxilaryButtonView"
          :auxiliaryButtonsAlignment="
            messageComposerConfiguration?.auxiliaryButtonsAlignment
          "
          :sendButtonView="messageComposerConfiguration?.sendButtonView"
          :hideLiveReaction="messageComposerConfiguration?.hideLiveReaction"
          :LiveReactionIconURL="
            messageComposerConfiguration?.LiveReactionIconURL
          "
          :messageComposerStyle="
            messageComposerConfiguration?.messageComposerStyle
          "
          :onSendButtonClick="messageComposerConfiguration?.onSendButtonClick"
          :onError="messageComposerConfiguration?.onError"
        >
        </CometChatMessageComposer>
      </div>

      <div class="cc__messages__livereaction">
        <cometchat-live-reaction
          v-if="liveReaction"
          :reactionIconURL="reactionName"
        ></cometchat-live-reaction>
      </div>
    </div>

    <div
      v-if="openThreadedMessages"
      class="cc-messages-wrapper__threadedmessages"
    >
      <CometChatThreadedMessages
        :onClose="threadedMessageConfiguration?.onClose || closeThreadView"
        :threadedMessagesStyle="
          threadedMessageConfiguration?.threadedMessagesStyle
        "
        :messageActionView="threadedMessageConfiguration?.messageActionView"
        :messageComposerConfiguration="messageComposerConfiguration"
        :messageListConfiguration="messageListConfiguration"
        :closeIconURL="threadedMessageConfiguration?.closeIconURL"
        :onError="threadedMessageConfiguration?.onError"
        :parentMessage="threadMessageObject!"
        :user="currentTargetUser"
        :group="currentTargetGroup"
        :bubbleView="
          threadedMessageConfiguration?.bubbleView || bubbleGeneratorFunction
        "
      >
      </CometChatThreadedMessages>
    </div>

    <div v-if="openDetails" class="cc-messages-wrapper__details">
      <CometChatDetails
        :transferOwnershipConfiguration="
          detailsConfiguration.transferOwnershipConfiguration
        "
        :groupMembersConfiguration="
          detailsConfiguration.groupMembersConfiguration
        "
        :bannedMembersConfiguration="
          detailsConfiguration.bannedMembersConfiguration
        "
        :addMembersConfiguration="detailsConfiguration.addMembersConfiguration"
        :onClose="detailsConfiguration.onClose || closeDetailsPage"
        :listItemStyle="detailsConfiguration.listItemStyle"
        :detailsStyle="detailsConfiguration.detailsStyle"
        :avatarStyle="detailsConfiguration.avatarStyle"
        :statusIndicatorStyle="detailsConfiguration.statusIndicatorStyle"
        :leaveDialogStyle="detailsConfiguration.leaveDialogStyle"
        :data="
          (user, group) => {
            return detailsConfiguration.data;
          }
        "
        :customProfileView="detailsConfiguration.customProfileView"
        :subtitleView="detailsConfiguration.subtitleView"
        :hideProfile="detailsConfiguration.hideProfile"
        :onError="detailsConfiguration.onError"
        :closeButtonIconURL="detailsConfiguration.closeButtonIconURL"
        :user="currentTargetUser"
        :group="currentTargetGroup"
      ></CometChatDetails>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  ref,
  onBeforeUpdate,
  onBeforeUnmount,
  Ref,
  onMounted,
  inject,
} from "vue";
import {
  MessagesStyle,
  MessageComposerConfiguration,
  MessageListConfiguration,
  DetailsConfiguration,
} from "uikit-utils-lerna";

import { HeartIcon, InfoIcon } from "../../assets";

import { CometChat } from "@cometchat-pro/chat";

import {
  CometChatGroupEvents,
  CometChatMessageEvents,
  CometChatTheme,
  CometChatUserEvents,
  fontHelper,
  IGroupLeft,
} from "uikit-resources-lerna";

import CometChatMessageList from "../CometChatMessageList/index.vue";
import CometChatThreadedMessages from "../CometChatThreadedMessages/index.vue";
import CometChatMessageHeader from "../CometChatMessageHeader/index.vue";
import CometChatMessageComposer from "../CometChatMessageComposer/index.vue";
import CometChatDetails from "../CometChatDetails/index.vue";
import {
  MessageBubbleAlignment,
  ThreadedMessagesConfiguration,
  MessageHeaderConfiguration,
} from "uikit-utils-lerna";
import { Subscription } from "rxjs";
import { AvatarStyle } from "my-cstom-package-lit";
import { ChatConfigurator } from "../shared/Framework/ChatConfigurator";

export default defineComponent({
  name: "CometChatMessages",
  components: {
    //CometChatMessageBubble,
    CometChatMessageList,
    CometChatDetails,
    CometChatThreadedMessages,
    CometChatMessageHeader,
    CometChatMessageComposer,
  },
  props: {
    user: { type: CometChat.User, default: undefined },
    group: { type: CometChat.Group, default: undefined },
    hideMessageComposer: { type: Boolean, default: false },
    disableTyping: { type: Boolean, default: false },
    messageHeaderConfiguration: {
      type: MessageHeaderConfiguration,
      default: new MessageHeaderConfiguration({}),
    },
    messageListConfiguration: {
      type: MessageListConfiguration,
      default: new MessageListConfiguration({}),
    },
    messageComposerConfiguration: {
      type: MessageComposerConfiguration,
      default: new MessageComposerConfiguration({}),
    },
    threadedMessageConfiguration: {
      type: ThreadedMessagesConfiguration,
      default: new ThreadedMessagesConfiguration({}),
    },
    detailsConfiguration: {
      type: DetailsConfiguration,
      default: new DetailsConfiguration({}),
    },
    customSoundForIncomingMessages: { type: String },
    customSoundForOutgoingMessages: { type: String },
    disableSoundForMessages: { type: Boolean, default: false },
    //removed default
    messagesStyle: {
      type: MessagesStyle || null,
      default: null,
    },
    messageHeaderView: { type: null },
    messageComposerView: { type: null },
    messageListView: { type: null },
    hideMessageHeader: { type: Boolean, default: false },
    hideDetails: { type: Boolean, default: false },
    auxiliaryMenu: { type: null },
    onError: {
      type: Function,
      default: (err: CometChat.CometChatException) => console.log(err),
    },
  },
  setup(props) {
    let loggedInUser: CometChat.User | null;

    let liveReaction: Ref<boolean> = ref(false);
    let reactionName: Ref<string> = ref(HeartIcon);

    let { theme, switchThemeMode }: any = inject(
      "theme",
      new CometChatTheme({})
    )!;

    /*
messageHeaderConfiguration
*/

    let avatarStyle: AvatarStyle = {
      borderRadius: "16px",
      width: "28px",
      height: "28px",
      border: "none",
      backgroundColor: "white",
      nameTextColor: "rgb(20,20,20)",
      backgroundSize: "cover",
      nameTextFont: "500 16px Inter",
      outerViewBorder: "",
      outerViewBorderSpacing: "",
    };

    let detailsButtonStyle: any = {
      height: "24px",
      width: "24px",
      border: "none",
      borderRadius: "0",
      background: "transparent",
      buttonIconTint: "#3399FF",
      padding: "0px 8px 0px 14px",
      "margin-right": "10px",
    };

    let ccLiveReaction!: Subscription;
    let ccGroupDeleted!: Subscription;
    let ccGroupLeft!: Subscription;
    let ccUserBlocked!: Subscription;
    let ccUserUnBlocked!: Subscription;

    let openDetails: Ref<boolean> = ref(false);

    let currentTargetUser: Ref<any> = ref(props.user);
    let currentTargetGroup: Ref<any> = ref({});

    let threadMessageObject: Ref<any> = ref();
    let child_component = ref(null);
    let openThreadedMessages: Ref<boolean> = ref(false);

    let bubbleGeneratorFunction: any = ref({});

    let messagesStyle: MessagesStyle;
    let changed = false;

    onBeforeMount(async () => {
      subscribeToEvents();
      setMessagesStyle();
      if (props.user) {
        currentTargetUser.value = props.user;
        currentTargetGroup.value = null;
      } else {
        currentTargetUser.value = null;
        currentTargetGroup.value = props.group;
      }
      await CometChat.getLoggedinUser()
        .then((user: CometChat.User | null) => {
          if (user) {
            loggedInUser = user;
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
    });

    onMounted(() => {
      subscribeToEvents();
    });

    onBeforeUpdate(async () => {
      if (
        (!currentTargetUser.value && props.user?.getUid()) ||
        (currentTargetUser.value &&
          props.user &&
          currentTargetUser.value.getUid() != props.user?.getUid())
      ) {
        changed = true;
        currentTargetUser.value = props.user;
        currentTargetGroup.value = null;
      } else if (
        (!currentTargetGroup.value && props.group?.getGuid()) ||
        currentTargetGroup.value
      ) {
        if (currentTargetGroup.value?.getGuid() != props.group?.getGuid()) {
          changed = true;
        }
        currentTargetGroup.value = props.group;
        currentTargetUser.value = null;
      }
      try {
        if (changed) {
          openThreadedMessages.value = false;
          openDetails.value = false;
        }
      } catch (error: any) {
        if (props.onError) {
          let cometchatException = new CometChat.CometChatException({
            message: error.message,
          });
          props.onError(cometchatException);
        }
      }
      changed = false;
    });

    onBeforeUnmount(() => {
      ccLiveReaction.unsubscribe();
      openThreadedMessages.value = false;
      openDetails.value = false;
      unsubscribeToEvents();
    });

    const subscribeToEvents = () => {
      ccLiveReaction = CometChatMessageEvents.ccLiveReaction.subscribe(
        (localReactionName: string) => {
          liveReactionStart(localReactionName);
        }
      );
      ccGroupDeleted = CometChatGroupEvents.ccGroupDeleted.subscribe(
        (group: CometChat.Group) => {
          if (
            currentTargetGroup.value &&
            currentTargetGroup.value.getGuid() == group.getGuid()
          ) {
            openDetails.value = false;
            openThreadedMessages.value = false;
            currentTargetGroup.value = group;
          }
        }
      );
      ccGroupLeft = CometChatGroupEvents.ccGroupLeft.subscribe(
        (item: IGroupLeft) => {
          if (
            currentTargetGroup.value &&
            currentTargetGroup.value.getGuid() == item.leftGroup.getGuid()
          ) {
            if (loggedInUser?.getUid() == item?.userLeft.getUid()) {
              openDetails.value = false;
              openThreadedMessages.value = false;
            }
            currentTargetGroup.value = item.leftGroup;
          }
        }
      );
      ccUserBlocked = CometChatUserEvents.ccUserBlocked.subscribe(
        (user: CometChat.User) => {
          if (
            currentTargetUser.value &&
            currentTargetUser.value.getUid() == user.getUid()
          ) {
            currentTargetUser.value = user;
          }
        }
      );
      ccUserUnBlocked = CometChatUserEvents.ccUserUnblocked.subscribe(
        (user: CometChat.User) => {
          if (
            currentTargetUser.value &&
            currentTargetUser.value.getUid() == user.getUid()
          ) {
            currentTargetUser.value = user;
          }
        }
      );
    };
    const unsubscribeToEvents = () => {
      ccLiveReaction?.unsubscribe();
      ccGroupDeleted?.unsubscribe();
      ccGroupLeft?.unsubscribe();
      ccUserBlocked?.unsubscribe();
      ccUserUnBlocked?.unsubscribe();
    };

    const setMessagesStyle = () => {
      let defaultStyle: MessagesStyle = new MessagesStyle({
        width: "100%",
        height: "100%",
        background: theme.value.palette.getBackground(),
        borderRadius: "none",
        border: "none",
        messageTextColor: theme.value.palette.getAccent600(),
        messageTextFont: fontHelper(theme.value.typography.title1),
      });
      messagesStyle = {
        ...defaultStyle,
        ...props.messagesStyle,
      };
    };

    const liveReactionStart = (localReactionName: string) => {
      if (liveReaction.value) {
        reactionName.value = "";
        liveReaction.value = false;
      }

      reactionName.value = localReactionName;
      liveReaction.value = true;

      setTimeout(() => {
        reactionName.value = "";
        liveReaction.value = false;
      }, 1500);
    };

    const openThreadView = (message: CometChat.BaseMessage, bubble: any) => {
      threadMessageObject.value = message;

      bubbleGeneratorFunction.value = bubble;
      openThreadedMessages.value = !!true;
    };

    const openDetailsPage = () => {
      openDetails.value = true;
    };
    const closeDetailsPage = () => {
      openDetails.value = false;
    };

    const closeThreadView = () => {
      threadMessageObject.value = null;
      openThreadedMessages.value = false;
    };

    const chatListStyle = () => {
      return {
        background:
          messagesStyle.background || theme.value.palette.getBackground(),
        height: messagesStyle.height,
        width: messagesStyle.width,
        border: messagesStyle.border,
        borderRadius: messagesStyle.borderRadius,
      };
    };

    const getHeaderMenu = () => {
      const defaultAuxiliaryMenu = ChatConfigurator.getDataSource()
        .getAuxiliaryHeaderMenu
        ? ChatConfigurator.getDataSource().getAuxiliaryHeaderMenu(
            currentTargetUser.value,
            currentTargetGroup.value
          )
        : [];

      let menu = [];
      if (props.auxiliaryMenu) {
        menu.push(props.auxiliaryMenu);
      } else {
        menu.push(
          ...defaultAuxiliaryMenu.map((auxMenu: any) => {
            if (auxMenu.componentName) {
              return auxMenu;
            }
            return { html: auxMenu };
          })
        );
      }

      if (!props.hideDetails) {
        menu.push({
          componentName: "cometchat-button",
          listeners: {
            "cc-button-clicked": openDetailsPage,
          },
          props: {
            iconURL: InfoIcon,
            buttonStyle: detailsButtonStyle,
          },
        });
      }

      return menu;
    };

    return {
      currentTargetUser,
      currentTargetGroup,
      MessageBubbleAlignment,
      theme,
      closeThreadView,
      threadMessageObject,
      child_component,
      openThreadedMessages,
      openThreadView,
      bubbleGeneratorFunction,
      chatListStyle,
      reactionName,
      openDetails,
      getHeaderMenu,
      liveReaction,
      avatarStyle,
      closeDetailsPage,
    };
  },
});
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.cc-messages-wrapper {
  display: flex;
  position: relative;
  height: 100%;
  width: 100%;
  top: 2vh;
}
.cc-messages-wrapper__messages {
  display: flex;
  flex-direction: column;
  position: relative;
  /* height: 150vh; */
  width: 100%;
  box-sizing: border-box;
  justify-content: space-between;
}

.cc-messages-wrapper__threadedmessages,
.cc-messages-wrapper__details {
  position: absolute;
  top: 5;
  left: 0;
  height: 100%;
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  max-width: 100%;
  z-index: 1;
}
.cc-messages-wrapper__header {
  height: 6%;
  width: 100%;
}
.cc-messages-wrapper__messages-list {
  height: 99%;
  width: 100%;
  margin-bottom: 12px;
}
CometChatThreadedMessages {
  height: 100%;
  display: flex;
}
.cc-messages-wrapper__composer {
  bottom: 50px;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
</style>
