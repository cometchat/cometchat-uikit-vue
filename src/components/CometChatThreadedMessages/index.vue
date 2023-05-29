<template>
  <div class="cc-threadedmessages-wrapper" :style="wrapperStyle()">
    <div class="cc-threadedmessages-wrapper__header">
      <div class="cc-threadedmessages-wrapper__title">
        <cometchat-label
          :text="title"
          :labelStyle="titleStyle"
        ></cometchat-label>
      </div>
      <div class="cc-threadedmessages-wrapper__close">
        <cometchat-button
          :iconURL="closeIconURL"
          :buttonStyle="buttonStyle"
          @cc-button-clicked="closeView"
        ></cometchat-button>
      </div>
    </div>
    <div class="cc-threadedmessages-wrapper__bubbleview">
      <div>
        <div
          v-if="componentDefinition.html"
          v-html="componentDefinition.html"
        ></div>
        <component
          v-else
          :is="componentDefinition.componentName"
          v-bind="{ ...componentDefinition.props }"
          v-on="componentDefinition?.listeners"
        >
          <template v-for="(html, key) in componentDefinition.slots" :key="key">
            <div :v-slot="[key]" :v-html="html"></div>
          </template>
        </component>
      </div>
    </div>
    <div class="cc__threadedmessages__actionview">
      <cometchat-button
        v-if="!messageActionView"
        :text="getThreadCount()"
        :buttonStyle="actionButtonStyle"
      ></cometchat-button>
      <div v-else v-html="messageActionView"></div>
    </div>
    <div class="cc-threadedmessages-wrapper__list">
      <CometChatMessageList
        :parentMessageId="parentMessage?.getId()"
        :emptyStateView="messageListConfiguration.emptyStateView"
        :loadingStateView="messageListConfiguration.loadingStateView"
        :user="user"
        :errorStateView="messageListConfiguration.errorStateView"
        :disableReceipt="messageListConfiguration.disableReceipt"
        :readIcon="messageListConfiguration.readIcon"
        :deliveredIcon="messageListConfiguration.deliveredIcon"
        :sentIcon="messageListConfiguration.sentIcon"
        :waitIcon="messageListConfiguration.waitIcon"
        :errorIcon="messageListConfiguration.errorIcon"
        :alignment="messageListConfiguration.alignment"
        :showAvatar="messageListConfiguration.showAvatar"
        :datePattern="messageListConfiguration.datePattern"
        :timestampAlignment="messageListConfiguration.timestampAlignment"
        :DateSeparatorPattern="messageListConfiguration.DateSeparatorPattern"
        :templates="messageListConfiguration.messageTypes"
        :messagesRequestBuilder="
          messageListConfiguration.messagesRequestBuilder || requestBuilder
        "
        :thresholdValue="messageListConfiguration.thresholdValue"
        :onThreadRepliesClick="messageListConfiguration.onThreadRepliesClick"
        :headerView="messageListConfiguration.headerView"
        :footerView="messageListConfiguration.footerView"
        :avatarStyle="messageListConfiguration.avatarStyle"
        :dateSeparatorStyle="messageListConfiguration.dateSeparatorStyle"
        :messageListStyle="getMessageListStyle()"
        :onError="messageListConfiguration.onError"
        :group="group"
      >
      </CometChatMessageList>
    </div>

    <div class="cc-threadedmessages-wrapper__composer">
      <CometChatMessageComposer
        ref="messageComposerRef"
        :parentMessageId="parentMessage?.getId()"
        :user="user"
        :group="group"
        :text="messageComposerConfiguration?.text"
        :headerView="messageComposerConfiguration?.headerView"
        :onTextChange="messageComposerConfiguration?.onTextChange"
        :attachmentIconURL="messageComposerConfiguration?.attachmentIconURL"
        :attachmentOptions="messageComposerConfiguration?.attachmentOptions"
        :secondaryButtonView="messageComposerConfiguration?.secondaryButtonView"
        :auxilaryButtonView="messageComposerConfiguration?.auxilaryButtonView"
        :auxiliaryButtonsAlignment="
          messageComposerConfiguration?.auxiliaryButtonsAlignment
        "
        :sendButtonView="messageComposerConfiguration?.sendButtonView"
        :hideLiveReaction="messageComposerConfiguration?.hideLiveReaction"
        :LiveReactionIconURL="messageComposerConfiguration?.LiveReactionIconURL"
        :messageComposerStyle="
          messageComposerConfiguration?.messageComposerStyle
        "
        :onSendButtonClick="messageComposerConfiguration?.onSendButtonClick"
        :onError="messageComposerConfiguration?.onError"
      >
      </CometChatMessageComposer>
    </div>
  </div>
</template>

<script lang="ts">
import {
  onBeforeMount,
  ref,
  defineComponent,
  Ref,
  onBeforeUpdate,
  inject,
} from "vue";
import "my-cstom-package-lit";

import CometChatMessageList from "../CometChatMessageList/index.vue";
import CometChatMessageBubble from "../CometChatMessageBubble/index.vue";

import { CometChat } from "@cometchat-pro/chat";

import {
  localize,
  CometChatTheme,
  fontHelper,
  CometChatMessageEvents,
  IMessages,
  MessageStatus,
} from "uikit-resources-lerna";
import {
  MessageListConfiguration,
  MessageComposerConfiguration,
  ThreadedMessagesStyle,
} from "uikit-utils-lerna";
import { Close2xIcon } from "../../assets";
import { ChatConfigurator } from "../shared/Framework/ChatConfigurator";
import { Subscription } from "rxjs";

import CometChatMessageComposer from "../CometChatMessageComposer/index.vue";
type ErrorHandlerFunction = (error: any) => void;
export default defineComponent({
  name: "CometChatThreadedMessages",
  components: {
    CometChatMessageList,
    CometChatMessageComposer,
    CometChatMessageBubble,
  },
  props: {
    onClose: {
      type: Function,
      default: () => {
        console.log("On Close");
      },
    },
    onError: {
      type: Object as () => ErrorHandlerFunction | null,
      default: (error: any) => {
        console.log(error);
      },
    },

    parentMessage: { type: CometChat.BaseMessage, default: {} },
    title: { type: String, default: () => localize("THREAD") },
    closeIconURL: { type: String, default: Close2xIcon },
    messageActionView: { type: undefined, default: "" },
    messageListConfiguration: {
      type: MessageListConfiguration,
      default: new MessageListConfiguration({
        messageListStyle: {
          height: "100%",
        },
      }),
    },
    messageComposerConfiguration: {
      type: MessageComposerConfiguration,
      default: new MessageComposerConfiguration({}),
    },
    threadedMessagesStyle: {
      type: ThreadedMessagesStyle,
      default: new ThreadedMessagesStyle({
        width: "100%",
        height: "100%",
        background: "white",
        borderRadius: "none",
        border: "1px solid rgba(20, 20, 20, 0.1)",
        titleColor: "rgba(20, 20, 20)",
        titleFont: "700 22px Inter",
        closeIconTint: "#3399FF",
        //overflow: "hidden",
      }),
    },
    bubbleView: { type: Function },
  },
  async setup(props) {
    let { theme, switchThemeMode }: any = inject(
      "theme",
      new CometChatTheme({})
    )!;
    let requestBuilder: Ref<CometChat.MessagesRequestBuilder> =
      ref<CometChat.MessagesRequestBuilder>(
        new CometChat.MessagesRequestBuilder()
      );
    let titleStyle: any = {
      textFont: "700 22px Inter",
      textColor: "black",
      background: "transparent",
    };
    let limit = 30;
    let group: any = ref(null);
    let user: any = ref(null);
    let buttonStyle: any = {
      height: "24px",
      width: "24px",
      border: "none",
      borderRadius: "0",
      background: "transparent",
      buttonIconTint: "#7dbfff",
    };
    let componentDefinition: any = ref({});
    let ccMessageSent!: Subscription;
    let ccMessageEdited!: Subscription;
    let ccMessageDeleted!: Subscription;
    let ccMessageRead!: Subscription;
    let actionButtonStyle: any = {
      height: "100%",
      width: "100%",
      border: "none",
      borderTop: "1px solid #e1e1e1",
      borderBottom: "1px solid #e1e1e1",
      borderRadius: "0",
      background: "transparent",
      buttonTextFont: "500 15px Inter",
      buttonTextColor: "black",
      padding: "8px",
    };

    let loggedInUser;
    let msgListenerId = "message_" + new Date().getTime();
    // eslint-disable-next-line
    let threadedMessagesStyle = props.threadedMessagesStyle;
    let parentMessageRef = ref(props.parentMessage);

    requestBuilder.value = new CometChat.MessagesRequestBuilder()
      .setCategories(ChatConfigurator.getDataSource().getAllMessageCategories())
      .setTypes(ChatConfigurator.getDataSource().getAllMessageTypes())
      .hideReplies(true)
      .setLimit(limit)
      .setParentMessageId(parentMessageRef?.value.getId());

    onBeforeMount(() => {
      componentDefinition.value = props.bubbleView!(parentMessageRef.value);
      console.log(componentDefinition);
      addMessageEventListeners();

      setTheme();
      subscribeToEvents();

      if (parentMessageRef.value.getId() != props.parentMessage.getId()) {
        requestBuilder.value = new CometChat.MessagesRequestBuilder()
          .setCategories(
            ChatConfigurator.getDataSource().getAllMessageCategories()
          )
          .setTypes(ChatConfigurator.getDataSource().getAllMessageTypes())
          .hideReplies(true)
          .setLimit(limit)
          .setParentMessageId(parentMessageRef?.value.getId());
        parentMessageRef.value = props.parentMessage;
      }
    });

    onBeforeUpdate(() => {
      if (parentMessageRef.value.getId() != props.parentMessage.getId()) {
        requestBuilder.value = new CometChat.MessagesRequestBuilder()
          .setCategories(
            ChatConfigurator.getDataSource().getAllMessageCategories()
          )
          .setTypes(ChatConfigurator.getDataSource().getAllMessageTypes())
          .hideReplies(true)
          .setLimit(limit)
          .setParentMessageId(props.parentMessage.getId());

        parentMessageRef.value = props.parentMessage;
      }

      addMessageEventListeners();

      setTheme();
      subscribeToEvents();
    });

    await CometChat.getLoggedinUser()
      .then((signedInUser: CometChat.User | null) => {
        if (signedInUser) {
          loggedInUser = signedInUser;

          if (
            parentMessageRef?.value?.getSender().getUid() ===
            loggedInUser?.getUid()
          ) {
            if (
              parentMessageRef?.value?.getReceiverType() ===
              CometChat.RECEIVER_TYPE.USER
            ) {
              user.value =
                parentMessageRef.value?.getReceiver() as CometChat.User;
            } else {
              group.value =
                parentMessageRef.value?.getReceiver() as CometChat.Group;
            }
          } else if (
            parentMessageRef?.value?.getReceiverType() ===
            CometChat.RECEIVER_TYPE.USER
          ) {
            user.value = parentMessageRef?.value?.getSender();
          } else if (
            parentMessageRef?.value?.getReceiverType() ===
            CometChat.RECEIVER_TYPE.GROUP
          ) {
            group.value = parentMessageRef?.value?.getReceiver();
          }
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

    const addMessageEventListeners = () => {
      try {
        CometChat.addMessageListener(
          msgListenerId,
          new CometChat.MessageListener({
            onMessagesDelivered: (messageReceipt: CometChat.MessageReceipt) => {
              updateReceipt(messageReceipt);
            },
            onMessagesRead: (messageReceipt: CometChat.MessageReceipt) => {
              updateReceipt(messageReceipt);
            },
            onMessageDeleted: (deletedMessage: CometChat.BaseMessage) => {
              updateMessage(deletedMessage);
            },
            onMessageEdited: (editedMessage: CometChat.BaseMessage) => {
              updateMessage(editedMessage);
            },
          })
        );
      } catch (error: any) {
        if (props.onError) {
          let cometchatException = new CometChat.CometChatException({
            message: error.message,
          });
          props.onError(cometchatException);
        }
      }
    };

    const subscribeToEvents = () => {
      ccMessageSent = CometChatMessageEvents.ccMessageSent.subscribe(
        ({ status, message }: IMessages) => {
          if (
            status === MessageStatus.success &&
            message?.getParentMessageId() === parentMessageRef?.value?.getId()
          ) {
            parentMessageRef.value = message;
          }
        }
      );
      ccMessageEdited = CometChatMessageEvents.ccMessageEdited.subscribe(
        ({ status, message }: IMessages) => {
          if (
            status === MessageStatus.success &&
            message?.getId() === parentMessageRef?.value?.getId()
          ) {
            parentMessageRef.value = message;
          }
        }
      );
      ccMessageDeleted = CometChatMessageEvents.ccMessageDeleted.subscribe(
        (message: CometChat.BaseMessage) => {
          if (message?.getId() === parentMessageRef?.value?.getId()) {
            parentMessageRef.value = message;
          }
        }
      );
      ccMessageRead = CometChatMessageEvents.ccMessageRead.subscribe(
        (message: CometChat.BaseMessage) => {
          if (message?.getId() === parentMessageRef?.value?.getId()) {
            parentMessageRef.value = message;
          }
        }
      );
    };

    const updateMessage = (message: CometChat.BaseMessage) => {
      console.log("IDS: ", parentMessageRef?.value?.getId(), message.getId());
      if (parentMessageRef?.value?.getId() == message.getId()) {
        console.log("UPDATING PARENT");
        parentMessageRef.value = message;
        componentDefinition.value = props.bubbleView!(parentMessageRef.value);
      }
    };
    const updateReceipt = (messageReceipt: CometChat.MessageReceipt) => {
      if (
        Number(messageReceipt?.getMessageId()) ==
        parentMessageRef?.value?.getId()
      ) {
        if (messageReceipt.getReadAt()) {
          parentMessageRef.value.setReadAt(messageReceipt.getReadAt());
        } else if (messageReceipt.getDeliveredAt()) {
          parentMessageRef.value.setDeliveredAt(
            messageReceipt.getDeliveredAt()
          );
        }
        componentDefinition.value = props.bubbleView!(parentMessageRef.value);
      }
    };

    const setTheme = () => {
      setThreadedMessagesStyle();
      buttonStyle.buttonIconTint =
        threadedMessagesStyle.closeIconTint || theme.value.palette.getPrimary();
      actionButtonStyle.background = theme.value.palette.getBackground();
      actionButtonStyle.buttonTextFont = fontHelper(
        theme.value.typography.subtitle1
      );
      actionButtonStyle.buttonTextColor = theme.value.palette.getAccent600();
      titleStyle = {
        textFont:
          threadedMessagesStyle.titleFont ||
          fontHelper(theme.value.typography.title1),
        textColor:
          threadedMessagesStyle.titleColor || theme.value.palette.getAccent(),
        background: "transparent",
      };
    };

    const setThreadedMessagesStyle = () => {
      let defaultStyle: ThreadedMessagesStyle = new ThreadedMessagesStyle({
        width: "100%",
        height: "100%",
        background: theme.value.palette.getBackground(),
        borderRadius: "none",
        border: "none",
        titleColor: theme.value.palette.getAccent(),
        titleFont: fontHelper(theme.value.typography.title1),
        closeIconTint: theme.value.palette.getPrimary(),
      });
      threadedMessagesStyle = {
        ...defaultStyle,
        ...threadedMessagesStyle,
      };
    };

    const getThreadCount = () => {
      const replyCount = parentMessageRef?.value?.getReplyCount() || 0;
      const suffix = replyCount === 1 ? localize("REPLY") : localize("REPLIES");
      return `${replyCount} ${suffix}`;
    };

    const closeView = () => {
      if (props.onClose) {
        props.onClose();
      }
    };

    const wrapperStyle = () => {
      return {
        background:
          threadedMessagesStyle.background ||
          theme.value.palette.getBackground(),
        height: threadedMessagesStyle.height,
        width: threadedMessagesStyle.width,
        border: threadedMessagesStyle.border,
        borderRadius: threadedMessagesStyle.borderRadius,
      };
    };

    const getMessageListStyle = () => {
      return {
        ...(props.messageListConfiguration.messageListStyle.height
          ? { height: props.messageListConfiguration.messageListStyle.height }
          : { height: "100%" }),
        ...props.messageListConfiguration,
      };
    };
    return {
      getMessageListStyle,
      titleStyle,
      buttonStyle,
      actionButtonStyle,
      closeView,
      getThreadCount,
      requestBuilder,
      group,
      user,
      wrapperStyle,
      componentDefinition,
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
.cc-threadedmessages-wrapper {
  display: flex;
  flex-direction: column;
  height: 90%;
  overflow-y: hidden;
  scrollbar-width: none;
}
.cc-threadedmessages-wrapper__header {
  height: 8%;
  width: 100%;
  display: flex;
  padding: 16px;
  align-items: flex-start;
}
.cc-threadedmessages-wrapper__close {
  display: flex;
  align-items: center;
}
.cc-threadedmessages-wrapper__title {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.cc-threadedmessages-wrapper__bubbleview {
  width: fit-content;
}

.cc-threadedmessages-wrapper__header {
  flex: 0 0 auto;
}

.cc-threadedmessages-wrapper__list {
  position: relative;
  flex: 1 1 auto;
  min-height: 58%;
  max-height: 63%;
  z-index: 0;
}

.cc-threadedmessages-wrapper__composer {
  position: fixed;
  flex: 0 0 auto;
  min-height: 80px;
  z-index: 1;
  width: 143vh;
  bottom: 5px;
}
</style>
