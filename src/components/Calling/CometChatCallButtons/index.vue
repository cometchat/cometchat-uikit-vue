<template>
  <div class="cc-callbuttons__wrapper" :style="wrapperStyle()">
    <div class="cc-callbuttons-buttons">
      <cometchat-button
        v-if="user"
        @cc-button-clicked="initiateAudioCall()"
        :disabled="disableButtons"
        :buttonStyle="getVoiceCallButtonStyle()"
        :text="voiceCallIconText"
        :hoverText="voiceCallIconHoverText"
        :iconURL="voiceCallIconURL"
      ></cometchat-button>
      <cometchat-button
        v-if="user || group"
        :disabled="disableButtons"
        @cc-button-clicked="initiateVideoCall()"
        :buttonStyle="getVideoCallButtonStyle()"
        :text="videoCallIconText"
        :hoverText="videoCallIconHoverText"
        :iconURL="videoCallIconURL"
      ></cometchat-button>
    </div>
  </div>
  <CometChatOnGoingCall
    v-if="showOngoingCall"
    :ongoingCallStyle="getOngoingCallStyle()"
    :sessionID="sessionId"
    :callSettingsBuilder="getCallBuilder()!"
  ></CometChatOnGoingCall>
  <cometchat-backdrop v-if="showOutgoingCallscreen">
    <CometChatOutgoingCall
      :onCloseClicked="cancelOutgoingCall"
      :outgoingCallStyle="getOutGoingCallStyle()"
      :call="call!"
    ></CometChatOutgoingCall>
  </cometchat-backdrop>
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
  CallButtonsStyle,
  CallscreenStyle,
  CometChatUIKitUtility,
  MessageStatus,
  OutgoingCallStyle,
} from "uikit-utils-lerna";

import { CometChat } from "@cometchat-pro/chat";
import "my-cstom-package-lit";

import {
  CometChatCallEvents,
  CometChatLocalize,
  CometChatMessageEvents,
  CometChatTheme,
  CometChatUIKitConstants,
  fontHelper,
  localize,
} from "uikit-resources-lerna";
import { Subscription } from "rxjs";
import { AudioCall2xIcon, VideoCall2xIcon } from "../../../assets";
import CometChatOnGoingCall from "../CometChatOngoingCall/index.vue";
import CometChatOutgoingCall from "../CometChatOutgoingCall/index.vue";

export default defineComponent({
  name: "CometChatCallButtons",
  components: { CometChatOnGoingCall, CometChatOutgoingCall },
  props: {
    user: { type: CometChat.User },
    group: { type: CometChat.Group },
    voiceCallIconURL: { type: String, default: AudioCall2xIcon },
    voiceCallIconText: {
      type: String,
      default: () => {
        localize("VOICE_CALL");
      },
    },
    voiceCallIconHoverText: {
      type: String,
      default: () => localize("VOICE_CALL"),
    },
    videoCallIconURL: { type: String, default: VideoCall2xIcon },
    videoCallIconText: { type: String, default: () => localize("VIDEO_CALL") },
    videoCallIconHoverText: {
      type: String,
      default: () => localize("VIDEO_CALL"),
    },
    callButtonsStyle: {
      type: CallButtonsStyle,
      default: {
        width: "100%",
        height: "100%",
        border: "none",
        borderRadius: "0",
        background: "transparent",
      },
    },
    onVoiceCallClick: {
      type: Function as PropType<() => void>,
      default: (user: CometChat.User, group: CometChat.Group) => {
        console.log("onVoiceCallClick");
      },
    },
    onVideoCallClick: {
      type: Function as PropType<() => void>,
      default: (user: CometChat.User, group: CometChat.Group) => {
        console.log("onVideoCallClick");
      },
    },
    onError: {
      type: Function as PropType<(error: CometChat.CometChatException) => void>,
      default: (error: any) => {
        console.log(error);
      },
    },
  },

  setup(props) {
    let loggedInUser: any = ref();
    let { theme, switchThemeMode }: any = inject(
      "theme",
      new CometChatTheme({})
    )!;
    let call: Ref<CometChat.Call | undefined> = ref();
    let ccOutgoingCall!: Subscription;
    let ccCallRejected!: Subscription;
    let ccCallEnded!: Subscription;
    let disableButtons = ref(false);
    let ongoingCallStyle: CallscreenStyle = {};
    let showOngoingCall = ref(false);
    let sessionId = ref("");
    let callbuttonsListenerId: string = "callbuttons_" + new Date().getTime();
    let voiceCallButtonStyle: any = {
      buttonIconTint: "RGB(51, 153, 255)",
      buttonTextFont: "400 12px Inter",
      buttonTextColor: "RGB(51, 153, 255)",
      padding: "8px 32px",
    };
    let videoCallButtonStyle: any = {
      buttonIconTint: "RGB(51, 153, 255)",
      buttonTextFont: "400 12px Inter",
      buttonTextColor: "RGB(51, 153, 255)",
      padding: "8px 32px",
    };
    let showOutgoingCallscreen = ref(false);
    let outgoingCallStyle: OutgoingCallStyle = {
      width: "360px",
      height: "581px",
      titleTextFont: "700 22px Inter",
      titleTextColor: "RGB(20, 20, 20)",
      subtitleTextFont: "400 15px Inter",
      subtitleTextColor: "RGBA(20, 20, 20, 0.58)",
      borderRadius: "8px",
    };
    let buttonStyle: any = {
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    };

    let styleCallButton: any = {};
    let activeCall: Ref<CometChat.Call | null> = ref(null);
    onBeforeMount(() => {
      console.log("SETTING UP CALL BUTTON");
      CometChat.getLoggedinUser().then(
        (user: CometChat.User | null) => {
          if (user) {
            loggedInUser.value = user;
          }
        },
        (error: CometChat.CometChatException) => {
          props.onError(error);
        }
      );
      setThemeStyle();
      attachListeners();
      subscribeToEvents();
    });

    onBeforeUnmount(() => {
      unsubscribeToEvents();
      removeListener();
    });
    const subscribeToEvents = () => {
      ccCallRejected = CometChatCallEvents.ccCallRejected.subscribe(
        (call: CometChat.Call) => {
          disableButtons.value = false;
        }
      );
      ccOutgoingCall = CometChatCallEvents.ccOutgoingCall.subscribe(
        (call: CometChat.Call) => {
          disableButtons.value = true;
        }
      );
      ccCallEnded = CometChatCallEvents.ccCallEnded.subscribe(
        (call: CometChat.Call) => {
          disableButtons.value = false;
          activeCall.value = null;
          showOngoingCall.value = false;
          sessionId.value = "";
          showOutgoingCallscreen.value = false;
        }
      );
    };
    const unsubscribeToEvents = () => {
      ccCallRejected?.unsubscribe();
      ccOutgoingCall?.unsubscribe();
    };
    const setThemeStyle = () => {
      setcallButtonsStyle();
      setOngoingCallStyle();
    };

    const setOngoingCallStyle = () => {
      let defaultStyle = new CallscreenStyle({
        maxHeight: "100%",
        maxWidth: "100%",
        border: "none",
        borderRadius: "0",
        background: "#1c2226",
        minHeight: "400px",
        minWidth: "400px",
        minimizeIconTint: theme.value.palette.getAccent900(),
        maximizeIconTint: theme.value.palette.getAccent900(),
      });
      ongoingCallStyle = { ...defaultStyle, ...ongoingCallStyle };
    };
    const setcallButtonsStyle = () => {
      let defaultStyle: CallButtonsStyle = new CallButtonsStyle({
        width: "100%",
        height: "100%",
        background: "transparent",
        border: "none",
        borderRadius: "0",
        voiceCallIconTint: theme.value.palette.getPrimary(),
        videoCallIconTint: theme.value.palette.getPrimary(),
        voiceCallIconTextFont: fontHelper(theme.value.typography.caption1),
        videoCallIconTextFont: fontHelper(theme.value.typography.caption1),
        voiceCallIconTextColor: theme.value.palette.getPrimary(),
        videoCallIconTextColor: theme.value.palette.getPrimary(),
        buttonPadding: "8px 32px",
        buttonBackground: theme.value.palette.getAccent100(),
        buttonBorder: "0",
        buttonBorderRadius: "8px",
      });
      styleCallButton = { ...defaultStyle, ...props.callButtonsStyle };
      voiceCallButtonStyle = {
        buttonIconTint: styleCallButton.voiceCallIconTint,
        buttonTextFont: styleCallButton.voiceCallIconTextFont,
        buttonTextColor: styleCallButton.voiceCallIconTextColor,
        padding: styleCallButton.buttonPadding,
        background: styleCallButton.buttonBackground,
        border: styleCallButton.border,
        borderRadius: styleCallButton.buttonBorderRadius,
        ...buttonStyle,
      };
      videoCallButtonStyle = {
        buttonIconTint: styleCallButton.videoCallIconTint,
        buttonTextFont: styleCallButton.videoCallIconTextFont,
        buttonTextColor: styleCallButton.videoCallIconTextColor,
        padding: styleCallButton.buttonPadding,
        background: styleCallButton.buttonBackground,
        border: styleCallButton.border,
        borderRadius: styleCallButton.buttonBorderRadius,
        ...buttonStyle,
      };
    };

    const getCallBuilder = (): CometChat.CallSettingsBuilder | undefined => {
      let audioOnlyCall: boolean =
        activeCall.value?.getType() ==
        CometChatUIKitConstants.MessageTypes.audio
          ? true
          : false;
      if (
        activeCall.value?.getType() == CometChatUIKitConstants.calls.meeting
      ) {
        return;
      }
      return new CometChat.CallSettingsBuilder()
        .setSessionID(sessionId.value)
        .enableDefaultLayout(true)
        .setIsAudioOnlyCall(audioOnlyCall)
        .setMode(CometChatUIKitConstants.calls.default)
        .setLocalizedStringObject(CometChatLocalize.getLocale());
    };
    const openOngoingCallScreen = (call: CometChat.Call) => {
      showOutgoingCallscreen.value = false;
      activeCall.value = call;
      sessionId.value = call.getSessionId();
      showOngoingCall.value = true;
    };
    const initiateCall = (type: string) => {
      const receiverType: string = props.user
        ? CometChatUIKitConstants.MessageReceiverType.user
        : CometChatUIKitConstants.MessageReceiverType.group;
      const receiverId: string | undefined = props.user
        ? props.user.getUid()
        : props.group?.getGuid();
      const callTmp: CometChat.Call = new CometChat.Call(
        receiverId,
        type,
        receiverType
      );
      CometChat.initiateCall(callTmp)
        .then((outgoingCall) => {
          call.value = outgoingCall;
          showOutgoingCallscreen.value = true;

          CometChatMessageEvents.ccMessageSent.next({
            message: outgoingCall,
            status: MessageStatus.inprogress,
          });
        })
        .catch((error) => {
          if (props.onError) {
            props.onError(error);
          }
        });
    };
    const initiateAudioCall = () => {
      if (props.user) {
        initiateCall(CometChatUIKitConstants.MessageTypes.audio);
      }
    };
    const initiateVideoCall = () => {
      if (props.user) {
        initiateCall(CometChatUIKitConstants.MessageTypes.video);
      } else {
        sessionId.value = props.group!.getGuid();
        sendCustomMessage();
        showOngoingCall.value = true;
      }
    };

    const sendCustomMessage = () => {
      const receiverType: string = props.user
        ? CometChatUIKitConstants.MessageReceiverType.user
        : CometChatUIKitConstants.MessageReceiverType.group;
      const receiverId: string = props.user
        ? props.user.getUid()
        : props.group!.getGuid();
      const customData = {
        sessionID: sessionId.value,
        sessionId: sessionId.value,
        callType: CometChat.CALL_TYPE.VIDEO,
      };
      const customType = CometChatUIKitConstants.calls.meeting;
      const conversationId = `group_${sessionId.value}`;

      const customMessage: any = new CometChat.CustomMessage(
        receiverId,
        receiverType,
        customType,
        customData
      );
      customMessage.setSender(loggedInUser);
      customMessage.setMetadata({ incrementUnreadCount: true });
      customMessage.setReceiver(receiverType as any);
      customMessage.setConversationId(conversationId);
      customMessage.sentAt = CometChatUIKitUtility.getUnixTimestamp();
      customMessage.muid = CometChatUIKitUtility.ID();
      // custom message
      CometChatMessageEvents.ccMessageSent.next({
        message: customMessage,
        status: MessageStatus.inprogress,
      });
      CometChat.sendCustomMessage(customMessage).then((msg) => {
        CometChatMessageEvents.ccMessageSent.next({
          message: msg,
          status: MessageStatus.success,
        });
      });
    };

    const attachListeners = () => {
      CometChat.addCallListener(
        callbuttonsListenerId,
        new CometChat.CallListener({
          onIncomingCallReceived: (callPara: CometChat.Call) => {
            disableButtons.value = true;
          },
          onIncomingCallCancelled: (callPara: CometChat.Call) => {
            disableButtons.value = false;
          },
          onOutgoingCallRejected: (callPara: CometChat.Call) => {
            disableButtons.value = false;
            call.value = undefined;
            showOutgoingCallscreen.value = false;
          },
          onOutgoingCallAccepted: (call: CometChat.Call) => {
            disableButtons.value = true;
            openOngoingCallScreen(call);
          },
        })
      );
    };
    const removeListener = () => {
      CometChat.removeCallListener(callbuttonsListenerId);
    };
    const wrapperStyle = () => {
      return {
        height: styleCallButton.height,
        width: styleCallButton.width,
        background: styleCallButton.background,
        border: styleCallButton.border,
        borderRadius: styleCallButton.borderRadius,
      };
    };

    const cancelOutgoingCall = () => {
      CometChat.rejectCall(
        call.value!.getSessionId(),
        CometChatUIKitConstants.calls.cancelled
      )
        .then((callPara) => {
          showOutgoingCallscreen.value = false;
          disableButtons.value = false;
          CometChatMessageEvents.ccMessageSent.next({
            message: call.value!,
            status: MessageStatus.success,
          });
          call.value = undefined;
        })
        .catch((error) => {
          if (props.onError) {
            props.onError(error);
          }
        });
      showOutgoingCallscreen.value = false;
    };

    const getOutGoingCallStyle = () => {
      return outgoingCallStyle;
    };

    const getOngoingCallStyle = (): any => {
      return ongoingCallStyle;
    };

    const getVoiceCallButtonStyle = () => {
      return voiceCallButtonStyle;
    };

    const getVideoCallButtonStyle = () => {
      return videoCallButtonStyle;
    };
    return {
      getVoiceCallButtonStyle,
      getVideoCallButtonStyle,
      initiateAudioCall,
      initiateVideoCall,
      getOngoingCallStyle,
      wrapperStyle,
      call,
      showOutgoingCallscreen,
      showOngoingCall,
      cancelOutgoingCall,
      getOutGoingCallStyle,
      getCallBuilder,
      sessionId,
      disableButtons,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cc-call-buttons__wrapper {
  height: 100%;
  width: 100%;
}
.cc-callbuttons-buttons {
  display: flex;
  gap: 8px;
}
</style>
