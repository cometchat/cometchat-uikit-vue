<template>
  <div class="cc-withmessages-wrapper" :style="usersWrapperStyles()">
    <div class="cc-withmessages__sidebar" :class="{ mobile: isMobileView }">
      <CometChatUsers
        :activeUser="currentUser"
        :hideSearch="usersConfiguration?.hideSearch"
        :searchIconURL="usersConfiguration?.searchIconURL"
        :searchRequestBuilder="usersConfiguration?.searchRequestBuilder"
        :onItemClick="usersConfiguration?.onItemClick || onItemClick"
        :subtitleView="usersConfiguration?.subtitleView"
        :usersRequestBuilder="usersConfiguration?.usersRequestBuilder"
        :emptyStateView="usersConfiguration?.emptyStateView"
        :onSelect="usersConfiguration?.onSelect"
        :loadingIconURL="usersConfiguration?.loadingIconURL"
        :errorStateView="usersConfiguration?.errorStateView"
        :loadingStateView="usersConfiguration?.loadingStateView"
        :titleAlignment="usersConfiguration?.titleAlignment"
        :showSectionHeader="usersConfiguration?.showSectionHeader"
        :listItemView="usersConfiguration?.listItemView"
        :menu="getMenu()"
        :hideSeparator="usersConfiguration?.hideSeparator"
        :hideError="usersConfiguration?.hideError"
        :selectionMode="usersConfiguration?.selectionMode"
        :listItemStyle="usersConfiguration?.listItemStyle"
        :options="
          usersConfiguration.options ? usersConfiguration.options : undefined
        "
        :usersStyle="usersConfiguration.usersStyle"
      ></CometChatUsers>
    </div>
    <div
      class="cc-withmessages__main"
      :class="{ mobile: isMobileView }"
      v-if="currentUser"
    >
      <!--Message List Screen-->
      <CometChatMessages
        :user="currentUser"
        :messageHeaderConfiguration="messagesConfig?.messageHeaderConfiguration"
        :messageListConfiguration="messagesConfig?.messageListConfiguration"
        :messageComposerConfiguration="
          messagesConfig?.messageComposerConfiguration
        "
        :messagesStyle="messagesConfig?.messagesStyle"
        :customSoundForIncomingMessages="
          messagesConfig?.customSoundForIncomingMessages
        "
        :customSoundForOutgoingMessages="
          messagesConfig?.customSoundForOutgoingMessages
        "
        :detailsConfiguration="messagesConfig?.detailsConfiguration"
        :disableSoundForMessages="messagesConfig?.disableSoundForMessages"
        :disableTyping="messagesConfig?.disableTyping"
        :hideMessageComposer="messagesConfig?.hideMessageComposer"
        :hideMessageHeader="messagesConfig?.hideMessageHeader"
        :messageComposerView="messagesConfig?.messageComposerView"
        :messageHeaderView="messagesConfig?.messageHeaderView"
        :messageListView="messagesConfig?.messageListView"
      >
      </CometChatMessages>
      <!--Message List Screen ENDS-->
    </div>
    <div
      class="cc-decorator-message-empty"
      v-if="!currentUser"
      :style="emptyMessageStyle()"
    >
      <cometchat-label
        :text="messageText"
        :labelStyle="labelStyle"
      ></cometchat-label>
    </div>
  </div>
</template>

<script lang="ts">
import CometChatMessages from "../CometChatMessages/index.vue";
import CometChatUsers from "../CometChatUsers/index.vue";

import {
  defineComponent,
  onBeforeMount,
  ref,
  Ref,
  onBeforeUpdate,
  onBeforeUnmount,
  inject,
} from "vue";
import {
  MessagesConfiguration,
  UsersConfiguration,
  WithMessagesStyle,
} from "uikit-utils-lerna";
import {
  CometChatTheme,
  CometChatUserEvents,
  fontHelper,
  localize,
} from "uikit-resources-lerna";

import { CometChat } from "@cometchat-pro/chat";
import { Subscription } from "rxjs";

export default defineComponent({
  name: "CometChatUsersWithMessages",
  components: { CometChatMessages, CometChatUsers },
  props: {
    user: { type: CometChat.User, default: undefined },
    isMobileView: { type: Boolean, default: false },
    messageText: { type: String, default: () => localize("NO_CHATS_SELECTED") },
    usersWithMessagesStyle: {
      type: WithMessagesStyle,
      default: () => {
        return {} as any;
      },
    },
    messagesConfiguration: {
      type: MessagesConfiguration,
      default: new MessagesConfiguration({}),
    },
    usersConfiguration: {
      type: UsersConfiguration,
      default: new UsersConfiguration({}),
    },
    onError: {
      type: Function,
      default: (error: any) => {
        console.log("ON ERROR: ", error);
      },
    },
  },
  setup(props, context) {
    let { theme, switchThemeMode }: any = inject(
      "theme",
      new CometChatTheme({})
    )!;
    let loggedInUser: Ref<any> = ref({});

    let labelStyle: any = {
      background: "transparent",
      textFont: "700 22px Inter",
      textColor: theme.value.palette.getAccent600(),
    };

    let ccUserBlocked!: Subscription;
    let ccUserUnBlocked!: Subscription;
    let messagesConfig: Ref<any> = ref(props.messagesConfiguration);
    let currentUser: Ref<any> = ref(props.user);
    let usersWithMessagesStyles: any = {};

    onBeforeMount(() => {
      setWithMessagesStyle();
      if (!props.messagesConfiguration?.messageHeaderConfiguration?.onBack) {
        messagesConfig.value.messageHeaderConfiguration.onBack = onBack;
      }
      subscribeToEvents();
      CometChat.getLoggedinUser()
        .then((user: CometChat.User | null) => {
          if (user) {
            loggedInUser.value = user;
          }
        })
        .catch((error: any) => {
          let cometchatException = new CometChat.CometChatException({
            message: error.message,
          });
          props.onError(cometchatException);
        });
      setMessageConfig();
    });
    onBeforeUpdate(() => {
      console.log("UPDATE: ", currentUser.value);
      setMessageConfig();
    });

    onBeforeUnmount(() => {
      unsubscribeToEvents();
    });

    const setMessageConfig = () => {
      if (props.isMobileView) {
        props.messagesConfiguration!.messageHeaderConfiguration.hideBackButton =
          false;
        props.messagesConfiguration!.messageHeaderConfiguration = {
          ...props.messagesConfiguration!.messageHeaderConfiguration,
        };
        messagesConfig.value = { ...props.messagesConfiguration };
      } else if (!props.isMobileView) {
        props.messagesConfiguration!.messageHeaderConfiguration.hideBackButton =
          true;
        props.messagesConfiguration!.messageHeaderConfiguration = {
          ...props.messagesConfiguration!.messageHeaderConfiguration,
        };
        messagesConfig.value = { ...props.messagesConfiguration };
      }
    };

    const subscribeToEvents = () => {
      ccUserBlocked = CometChatUserEvents.ccUserBlocked.subscribe(
        (user: CometChat.User) => {
          if (
            currentUser.value &&
            user.getUid() == currentUser.value.getUid()
          ) {
            currentUser.value = user;
          }
        }
      );
      ccUserUnBlocked = CometChatUserEvents.ccUserUnblocked.subscribe(
        (user: CometChat.User) => {
          if (
            currentUser.value &&
            user.getUid() == currentUser.value.getUid()
          ) {
            currentUser.value = user;
          }
        }
      );
    };

    // unsubscribe to subscribed events.
    const unsubscribeToEvents = () => {
      ccUserBlocked?.unsubscribe();
      ccUserUnBlocked?.unsubscribe();
    };

    const setWithMessagesStyle = () => {
      let defaultStyle: WithMessagesStyle = new WithMessagesStyle({
        width: "100%",
        height: "100%",
        background: theme.value.palette.getBackground(),
        borderRadius: "none",
        border: "none",
        messageTextColor: theme.value.palette.getAccent600(),
        messageTextFont: fontHelper(theme.value.typography.title1),
      });
      usersWithMessagesStyles = {
        ...defaultStyle,
        ...props.usersWithMessagesStyle,
      };

      labelStyle.textFont =
        props.usersWithMessagesStyle?.messageTextFont || labelStyle.textFont;
      labelStyle.textColor =
        props.usersWithMessagesStyle?.messageTextColor || labelStyle.textColor;
    };

    const onBack = () => {
      currentUser.value = null;
    };
    const onItemClick: (user: CometChat.User) => void = (
      user: CometChat.User
    ) => {
      console.log(user);

      currentUser.value = user;
    };

    const emptyMessageStyle = () => {
      let defaultStyle = {
        width: "100%",
        // height: "100%",
        borderRadius: "none",
        border: "none",
      };

      return {
        background:
          props.usersWithMessagesStyle?.background ||
          theme.value.palette.getBackground(),
        height: props.usersWithMessagesStyle?.height,
        width:
          `calc(${props.usersWithMessagesStyle?.width} - 280px)` ||
          defaultStyle.width,
        border: props.usersWithMessagesStyle?.border || defaultStyle.border,
        borderRadius:
          props.usersWithMessagesStyle?.borderRadius ||
          defaultStyle.borderRadius,
      };
    };
    const getMenu = (): any => {
      if (props.usersConfiguration.menu) {
        if (typeof props.usersConfiguration.menu == "string") {
          return {
            html: props.usersConfiguration.menu,
          };
        }
        return props.usersConfiguration.menu;
      }
    };

    const usersWrapperStyles = () => {
      return {
        height: usersWithMessagesStyles?.height,
        width: usersWithMessagesStyles?.width,
        border: usersWithMessagesStyles?.border,
        borderRadius: usersWithMessagesStyles?.borderRadius,
        background:
          usersWithMessagesStyles?.background ||
          theme.value.palette.getBackground(),
      };
    };

    return {
      labelStyle,
      onItemClick,
      emptyMessageStyle,
      usersWrapperStyles,
      messagesConfig,
      currentUser,
      getMenu,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cc-withmessages-wrapper {
  display: flex;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
.cc-withmessages__sidebar {
  width: 280px;
  height: 100%;
  position: relative;
}
.cc-withmessages__main {
  width: calc(100% - 280px);
  height: 100%;
  margin-left: 2px;
}
.mobile {
  width: 100% !important;
  height: 100%;
  position: absolute;
}
.cc-decorator-message-empty {
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 280px);
}
</style>
