<template>
  <div
    class="cc-call-history-with-details"
    :style="getCallHistoryWithDetailsStyle()"
  >
    <div
      class="cc-call-history-with-details__side-bar"
      :style="getSideBarStyle()"
    >
      <CometChatCallHistory
        :title="undefined"
        :errorStateText="undefined"
        :emptyStateText="undefined"
        :datePattern="undefined"
        :dateStyle="undefined"
        :onError="onError"
        :messageRequestBuilder="callHistoryConfiguration?.messageRequestBuilder"
        :titleAlignment="callHistoryConfiguration?.titleAlignment"
        :loadingIconURL="callHistoryConfiguration?.loadingIconURL"
        :loadingStateView="callHistoryConfiguration?.loadingStateView"
        :hideError="callHistoryConfiguration?.hideError"
        :errorStateView="callHistoryConfiguration?.errorStateView"
        :emptyStateView="callHistoryConfiguration?.emptyStateView"
        :listItemView="callHistoryConfiguration?.listItemView"
        :hideSeparator="callHistoryConfiguration?.hideSeparator"
        :activeCall="activeCall ? activeCall : undefined"
        :selectionMode="callHistoryConfiguration?.selectionMode"
        :subtitleView="callHistoryConfiguration?.subtitleView"
        :options="callHistoryConfiguration?.options ?? undefined"
        :onItemClick="callHistoryConfiguration?.onItemClick ?? onCallItemClick"
        :onSelect="callHistoryConfiguration?.onSelect"
        :menus="callHistoryConfiguration?.menu"
        :avatarStyle="callHistoryConfiguration?.avatarStyle"
        :listItemStyle="callHistoryConfiguration?.listItemStyle"
        :callHistoryStyle="getCallHistoryStyle()"
      />
    </div>
    <div
      class="cc-call-history-with-details__main-screen"
      :style="getMainScreenStyle()"
    >
      <template v-if="activeCall">
        <CometChatCallDetails
          :title="undefined"
          :closeButtonIconURL="callDetailsConfiguration?.closeButtonIconURL"
          :onClose="
            callDetailsConfiguration?.onClose ?? onCallDetailsCloseBtnClick
          "
          :hideProfile="callDetailsConfiguration?.hideProfile"
          :customProfileView="callDetailsConfiguration?.customProfileView"
          :call="activeCall"
          :disableUsersPresence="callDetailsConfiguration?.disableUsersPresence"
          :subtitleView="callDetailsConfiguration?.subtitleView"
          :privateGroupIcon="callDetailsConfiguration?.privateGroupIcon"
          :protectedGroupIcon="callDetailsConfiguration?.protectedGroupIcon"
          :onError="callDetailsConfiguration?.onError ?? onError"
          :avatarStyle="callDetailsConfiguration?.avatarStyle"
          :statusIndicatorStyle="callDetailsConfiguration?.statusIndicatorStyle"
          :listItemStyle="callDetailsConfiguration?.listItemStyle"
          :callDetailsStyle="getCallDetailsStyle()"
      /></template>
      <template v-else-if="!isMobileView">
        <div
          class="cc-call-history-with-details__message"
          :style="getMessageWrapperStyle()"
        >
          <cometchat-label
            :text="messageText"
            :labelStyle="getMessageStyle()"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
/*es-lint disabled*/

import {
  CSSProperties,
  defineComponent,
  inject,
  onBeforeUpdate,
  PropType,
  ref,
} from "vue";
import {
  CallDetailsConfiguration,
  CallDetailsStyle,
  CallHistoryConfiguration,
  CallHistoryStyle,
  WithDetailsStyle,
} from "uikit-utils-lerna";

import { CometChat } from "@cometchat-pro/chat";
import "my-cstom-package-lit";
type ButtonStyle = CSSProperties & { buttonIconTint?: string };

import { CometChatTheme, fontHelper, localize } from "uikit-resources-lerna";
import CometChatCallHistory from "../CometChatCallHistory/index.vue";
import CometChatCallDetails from "../CometChatCallDetails/index.vue";
import { LabelStyle } from "my-cstom-package-lit";

export default defineComponent({
  name: "CometChatCallsHistoryWithDetails",
  components: { CometChatCallHistory, CometChatCallDetails },
  props: {
    call: { type: CometChat.Call },
    isMobileView: { type: Boolean, default: false },
    onError: {
      type: Function as PropType<(error: CometChat.CometChatException) => void>,
    },
    messageText: { type: String, default: () => localize("NO_CALLS_SELECTED") },
    callHistoryConfiguration: { type: CallHistoryConfiguration },
    callDetailsConfiguration: { type: CallDetailsConfiguration },
    callHistoryWithDetailsStyle: {
      type: WithDetailsStyle,
      default: new WithDetailsStyle({}),
    },
  },
  setup(props) {
    let { theme, switchThemeMode }: any = inject(
      "theme",
      new CometChatTheme({})
    )!;
    const sideBarWidth = "300px";
    let activeCall: any = ref(props.call);

    onBeforeUpdate(() => {
      if (props.call && props.call.getId() !== activeCall.value?.getId()) {
        activeCall.value = props.call;
      }
    });
    const getCallHistoryWithDetailsStyle = (): CSSProperties => {
      return {
        background:
          props.callHistoryWithDetailsStyle?.background ||
          theme.value.palette.getBackground(),
        border:
          props.callHistoryWithDetailsStyle?.border ||
          `1px solid ${theme.value.palette.getAccent400()}`,
        borderRadius: props.callHistoryWithDetailsStyle?.borderRadius || "0",
        boxSizing: "border-box",
        width: props.callHistoryWithDetailsStyle?.width || "100%",
        height: props.callHistoryWithDetailsStyle?.height || "100%",
        position: "relative",
        display: "flex",
        overflow: "hidden",
      };
    };

    const getSideBarStyle = (): CSSProperties => {
      return {
        height: "100%",
        width: props.isMobileView ? "100%" : sideBarWidth,
        position: props.isMobileView ? "absolute" : "relative",
        borderRight: props.isMobileView
          ? "0"
          : props.callHistoryWithDetailsStyle?.border ||
            `1px solid ${theme.value.palette.getAccent400()}`,
      };
    };

    const getCallHistoryStyle = (): CallHistoryStyle => {
      return {
        background:
          props.callHistoryWithDetailsStyle?.background ||
          theme.value.palette.getBackground(),
        ...props.callHistoryConfiguration?.callHistoryStyle,
      };
    };

    const onCallItemClick = (call: CometChat.Call): void => {
      activeCall.value = call;
    };

    const onCallDetailsCloseBtnClick = (): void => {
      activeCall.value = undefined;
    };

    const getCallDetailsStyle = (): CallDetailsStyle => {
      return {
        background:
          props.callHistoryWithDetailsStyle?.background ||
          theme.value.palette.getBackground(),
        ...props.callDetailsConfiguration?.callDetailsStyle,
      };
    };

    const getMessageWrapperStyle = (): CSSProperties => {
      return {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        boxSizing: "border-box",
        textAlign: "center",
      };
    };

    const getMessageStyle = (): LabelStyle => {
      return {
        textFont:
          props.callHistoryWithDetailsStyle?.messageTextFont ||
          fontHelper(theme.value.typography.heading),
        textColor:
          props.callHistoryWithDetailsStyle?.messageTextColor ||
          theme.value.palette.getAccent400(),
      };
    };

    const getMainScreenStyle = (): CSSProperties => {
      return {
        width: props.isMobileView ? "100%" : `calc(100% - ${sideBarWidth})`,
        position: props.isMobileView ? "absolute" : "relative",
        height: "100%",
      };
    };

    return {
      getCallHistoryWithDetailsStyle,
      getSideBarStyle,
      getCallHistoryStyle,
      onCallItemClick,
      activeCall,
      getCallDetailsStyle,
      onCallDetailsCloseBtnClick,
      getMessageWrapperStyle,
      getMessageStyle,
      getMainScreenStyle,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
