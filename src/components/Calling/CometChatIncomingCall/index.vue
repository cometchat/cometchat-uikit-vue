<template>
  <div
    class="cc-incomingcall__wrapper"
    :style="wrapperStyle()"
    v-if="currentCall || showIncomingCallScreen"
  >
    <div class="cc-incomingcall__listitem">
      <cometchat-list-item
        :title="currentCall?.getSender()?.getUid()"
        :listItemStyle="getListItemStyle()"
        :hideSeparator="true"
      >
        <div
          slot="subtitleView"
          class="cc-incomingcall__subtitleview"
          v-if="subtitleView"
        >
          <div
            v-if="subtitleView && subtitleView.html"
            v-html="subtitleView.html"
          ></div>
          <component
            v-else-if="subtitleView && subtitleView.componentName"
            :is="subtitleView.componentName"
            v-bind="{ ...subtitleView.props }"
            v-on="subtitleView?.listeners ? subtitleView?.listeners : {}"
          >
            <template v-for="(item, key) in subtitleView.slots" :key="key">
              <div :v-slot="[key]" :v-html="item"></div>
            </template>
          </component>
        </div>

        <div v-else slot="subtitleView" class="cc-incomingcall__subtitleview">
          <div class="cc-call__icon">
            <cometchat-icon
              :iconStyle="getIconStyle()"
              :URL="getCallTypeIcon()"
            ></cometchat-icon>
          </div>
          <cometchat-label
            class="cc-call__type"
            :text="subtitleText"
            :labelStyle="subtitleStyle()"
          >
          </cometchat-label>
        </div>

        <div slot="tailView" class="cc-incomingcall__tailview">
          <div class="tail__view">
            <div class="cc-incomingcall__avatar">
              <cometchat-avatar
                :avatarStyle="getAvatarStyle()"
                :image="currentCall?.getSender()?.getAvatar()"
                :name="currentCall?.getSender()?.getName()"
              >
              </cometchat-avatar>
            </div>
          </div>
        </div>
      </cometchat-list-item>
    </div>
    <div class="cc-incomingcall-buttons">
      <cometchat-button
        @cc-button-clicked="rejectIncomingCall()"
        :buttonStyle="getDeclineStyle()"
        :text="declineButtonText"
      ></cometchat-button>
      <cometchat-button
        @cc-button-clicked="acceptIncomingCall()"
        :buttonStyle="getAcceptButtonStyle()"
        :text="acceptButtonText"
      ></cometchat-button>
    </div>
  </div>
  <CometChatOngoingCall
    v-if="showOngoingCall && currentCall"
    :ongoingCallStyle="getOngoingCallStyle()"
    :sessionID="sessionId"
    :callSettingsBuilder="getCallBuilder()!"
  ></CometChatOngoingCall>
</template>

<script lang="ts">
/*es-lint disabled*/

import { AudioCallIcon, VideoCallIcon } from "../../../assets";
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
  CallscreenStyle,
  CometChatSoundManager,
  IncomingCallStyle,
  MessageStatus,
  StorageUtils,
} from "uikit-utils-lerna";

import { CometChat } from "@cometchat-pro/chat";
import "my-cstom-package-lit";

import { AvatarStyle, IconStyle, ListItemStyle } from "my-cstom-package-lit";
import {
  CometChatCallEvents,
  CometChatLocalize,
  CometChatMessageEvents,
  CometChatTheme,
  CometChatUIKitConstants,
  fontHelper,
  localize,
} from "uikit-resources-lerna";
import CometChatOngoingCall from "../CometChatOngoingCall/index.vue";
import { Subscription } from "rxjs";

export default defineComponent({
  name: "CometChatIncomingCall",
  components: { CometChatOngoingCall },
  props: {
    call: { type: CometChat.Call },
    disableSoundForCalls: { type: Boolean, default: false },
    customSoundForCalls: { type: String },
    onAccept: {
      type: Function as PropType<() => void>,
    },
    onDecline: {
      type: Function as PropType<() => void>,
    },
    acceptButtonText: { type: String, default: () => localize("ACCEPT") },
    declineButtonText: { type: String, default: () => localize("DECLINE") },
    subtitleView: {
      type: Object as PropType<ViewType>,
      default: undefined,
    },
    onError: {
      type: Function as PropType<(error: CometChat.CometChatException) => void>,
      default: (error: any) => {
        console.log(error);
      },
    },
    listItemStyle: {
      type: ListItemStyle,
      default: {
        height: "100%",
        width: "100%",
        background: "",
        activeBackground: "",
        border: "",
      },
    },
    avatarStyle: {
      type: AvatarStyle,
      default: {
        borderRadius: "16px",
        width: "38px",
        height: "38px",
      },
    },
    incomingCallStyle: {
      type: IncomingCallStyle,
      default: {
        width: "fit-content",
        height: "fit-content",
      },
    },
  },
  setup(props) {
    let incomingcallListenerId: string = "incomingcall_" + new Date().getTime();
    let subtitleText: string = localize("INCOMING_CALL");
    let buttonStyle: any = {
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "8px 28px",
    };
    let avatarStyle = {};
    let listItemStyle = {};
    let ongoingCallStyle: CallscreenStyle = {};
    let showOngoingCall: Ref<boolean> = ref(false);
    let sessionId = ref("");
    let acceptButtonStyle: any = {};
    let declineButtonStyle: any = {};
    let loggedInUser: CometChat.User | null = null;
    let iconStyle: IconStyle = {
      height: "16px",
      width: "16px",
      iconTint: "RGBA(20, 20, 20, 0.68)",
    };
    let incomingCallStyle: any = {};
    let showIncomingCallScreen = ref(false);
    let { theme, switchThemeMode }: any = inject(
      "theme",
      new CometChatTheme({})
    )!;

    let ccCallEnded!: Subscription;
    let currentCall: any = ref(props.call!);
    const attachListeners = () => {
      StorageUtils.attachChangeDetection(localStorageChange);
      CometChat.addCallListener(
        incomingcallListenerId,
        new CometChat.CallListener({
          onIncomingCallReceived: (call: CometChat.Call) => {
            currentCall.value = call;
            showCall(call);
          },
          onIncomingCallCancelled: (call: CometChat.Call) => {
            CometChatSoundManager.pause();
            currentCall.value = null;
            showIncomingCallScreen.value = false;
          },
        })
      );
    };
    const removeListener = () => {
      StorageUtils.attachChangeDetection(localStorageChange);
      CometChat.removeCallListener(incomingcallListenerId);
    };

    onBeforeMount(() => {
      attachListeners();
      setThemeStyle();
      ccCallEnded = CometChatCallEvents.ccCallEnded.subscribe(
        (call: CometChat.Call) => {
          showOngoingCall.value = false;
          currentCall.value = null;
          sessionId.value = "";
        }
      );
      currentCall.value = props.call;
    });

    const setThemeStyle = () => {
      setincomingCallStyle();
      setAvatarStyle();

      setOngoingCallStyle();
      iconStyle.iconTint = incomingCallStyle?.subtitleTextColor;
    };

    const setAvatarStyle = () => {
      let defaultStyle: AvatarStyle = new AvatarStyle({
        borderRadius: "16px",
        width: "38px",
        height: "38px",
        border: "none",
        backgroundColor: theme.value.palette.getAccent700(),
        nameTextColor: theme.value.palette.getAccent900(),
        backgroundSize: "cover",
        nameTextFont: fontHelper(theme.value.typography.subtitle1),
        outerViewBorder: "",
        outerViewBorderSpacing: "",
      });
      avatarStyle = { ...defaultStyle, ...props.avatarStyle };
    };
    const setincomingCallStyle = () => {
      let defaultStyle: IncomingCallStyle = new IncomingCallStyle({
        width: "fit-content",
        height: "fit-content",
        background: theme.value.palette.getAccent800("light"),
        border: "none",
        borderRadius: "8px",
        titleTextFont: fontHelper(theme.value.typography.title2),
        titleTextColor: theme.value.palette.getAccent("dark"),
        subtitleTextFont: fontHelper(theme.value.typography.subtitle2),
        subtitleTextColor: theme.value.palette.getAccent800("dark"),
        acceptButtonTextFont: fontHelper(theme.value.typography.text2),
        acceptButtonTextColor: theme.value.palette.getAccent("dark"),
        acceptButtonBackground: theme.value.palette.getPrimary(),
        acceptButtonBorderRadius: "8px",
        acceptButtonBorder: "none",
        declineButtonTextFont: fontHelper(theme.value.typography.text2),
        declineButtonTextColor: theme.value.palette.getAccent("dark"),
        declineButtonBackground: theme.value.palette.getError(),
        declineButtonBorderRadius: "8px",
        declineButtonBorder: "none",
      });
      incomingCallStyle = { ...defaultStyle, ...props.incomingCallStyle };
      setListItemStyle();
      acceptButtonStyle = {
        border: incomingCallStyle?.acceptButtonBorder,
        borderRadius: incomingCallStyle?.acceptButtonBorderRadius,
        background: incomingCallStyle?.acceptButtonBackground,
        buttonTextFont: incomingCallStyle?.acceptButtonTextFont,
        buttonTextColor: incomingCallStyle?.acceptButtonTextColor,
        ...buttonStyle,
      };
      declineButtonStyle = {
        border: incomingCallStyle?.declineButtonBorder,
        borderRadius: incomingCallStyle?.declineButtonBorderRadius,
        background: incomingCallStyle?.declineButtonBackground,
        buttonTextFont: incomingCallStyle?.declineButtonTextFont,
        buttonTextColor: incomingCallStyle?.declineButtonTextColor,
        ...buttonStyle,
      };
    };

    const setListItemStyle = () => {
      let defaultStyle: ListItemStyle = new ListItemStyle({
        height: "100%",
        width: "100%",
        background: theme.value.palette.getBackground(),
        activeBackground: "transparent",
        borderRadius: "0",
        titleFont: incomingCallStyle?.titleTextFont,
        titleColor: incomingCallStyle?.titleTextColor,
        border: "none",
        separatorColor: theme.value.palette.getAccent200(),
        hoverBackground: "transparent",
      });
      listItemStyle = { ...defaultStyle, ...props.listItemStyle };
    };
    onBeforeUnmount(() => {
      removeListener();
    });

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
    const getCallTypeIcon = () => {
      if (
        currentCall?.value?.getType() ==
        CometChatUIKitConstants.MessageTypes.audio
      ) {
        return AudioCallIcon;
      } else {
        return VideoCallIcon;
      }
    };

    const localStorageChange = (event: any) => {
      if (event?.key !== CometChatUIKitConstants.calls.activecall) {
        return;
      }
      if (event.newValue || event.oldValue) {
        let call;
        if (event.newValue) {
          call = JSON.parse(event.newValue);
        } else if (event.oldValue) {
          call = JSON.parse(event.oldValue);
        }
        if (currentCall.value?.getSessionId() === call?.sessionId) {
          CometChatSoundManager.pause();
          currentCall.value = null;
          showIncomingCallScreen.value = true;
        }
      }
      return;
    };

    const isCallActive = (call: CometChat.Call) => {
      let isCurrentCall = false;
      try {
        if (StorageUtils.getItem(CometChatUIKitConstants.calls.activecall)) {
          let oldCall: any = StorageUtils.getItem(
            CometChatUIKitConstants.calls.activecall
          );
          if (oldCall && oldCall.sessionId == call.getSessionId()) {
            isCurrentCall = true;
          } else {
            isCurrentCall = false;
          }
        } else {
          isCurrentCall = false;
        }
        return isCurrentCall;
      } catch (error: any) {
        if (props.onError) {
          let cometchatException = new CometChat.CometChatException({
            message: error.message,
          });
          props.onError(cometchatException);
        }
        return isCurrentCall;
      }
    };

    const showCall = (call: CometChat.Call) => {
      try {
        if (
          !isCallActive(call) &&
          loggedInUser?.getUid() !== call?.getSender()?.getUid() &&
          currentCall.value
        ) {
          if (!props.disableSoundForCalls) {
            playAudio();
          }
          currentCall.value = call;
          showIncomingCallScreen.value = true;
        } else {
          CometChatSoundManager.pause();
          rejectIncomingCall(CometChatUIKitConstants.calls.busy);
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

    const playAudio = () => {
      try {
        if (props.customSoundForCalls) {
          CometChatSoundManager.play(
            CometChatSoundManager.Sound.incomingCall,
            props.customSoundForCalls
          );
        } else {
          CometChatSoundManager.play(CometChatSoundManager.Sound.incomingCall);
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

    const acceptIncomingCall = () => {
      try {
        CometChatSoundManager.pause();
        if (props.onAccept) {
          props.onAccept();
        } else {
          checkForActiveCallAndEndCall().then(
            (response) => {
              CometChat.acceptCall(currentCall.value!.getSessionId()).then(
                (call) => {
                  CometChatCallEvents.ccCallAccepted.next(call);
                  StorageUtils.setItem(
                    CometChatUIKitConstants.calls.activecall,
                    call
                  );

                  showOngoingCall.value = true;
                  currentCall.value = call;
                  sessionId.value = call?.getSessionId();
                  showIncomingCallScreen.value = false;
                },
                (error: CometChat.CometChatException) => {
                  if (props.onError) {
                    let cometchatException = new CometChat.CometChatException({
                      message: error.message,
                    });
                    props.onError(cometchatException);
                  }
                }
              );
            },
            (error: CometChat.CometChatException) => {
              if (props.onError) {
                let cometchatException = new CometChat.CometChatException({
                  message: error.message,
                });
                props.onError(cometchatException);
              }
            }
          );
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
    const checkForActiveCallAndEndCall = () => {
      let call: CometChat.Call = CometChat.getActiveCall();
      const promise = new Promise((resolve, reject) => {
        if (!call) {
          return resolve({ success: true });
        }

        let sessionID = call?.getSessionId();
        CometChat.endCall(sessionID)
          .then((response) => {
            return resolve(response);
          })
          .catch((error) => {
            return reject(error);
          });
      });

      return promise;
    };

    const rejectIncomingCall = (
      reason: string = CometChatUIKitConstants.calls.rejected
    ) => {
      try {
        CometChatSoundManager.pause();
        if (props.onDecline) {
          props.onDecline();
        } else {
          CometChat.rejectCall(currentCall.value?.getSessionId(), reason).then(
            (rejectedCall) => {
              StorageUtils.setItem(
                CometChatUIKitConstants.calls.activecall,
                rejectedCall
              );
              CometChatCallEvents.ccCallRejected.next(rejectedCall);
              showIncomingCallScreen.value = false;
              showOngoingCall.value = false;
              currentCall.value = null;
            },
            (error: CometChat.CometChatException) => {
              if (props.onError) {
                let cometchatException = new CometChat.CometChatException({
                  message: error.message,
                });
                props.onError(cometchatException);
              }
            }
          );
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

    const getCallBuilder = (): CometChat.CallSettingsBuilder | undefined => {
      let audioOnlyCall: boolean =
        currentCall.value?.getType() ==
        CometChatUIKitConstants.MessageTypes.audio
          ? true
          : false;
      return new CometChat.CallSettingsBuilder()
        .setSessionID(sessionId.value)
        .enableDefaultLayout(true)
        .setIsAudioOnlyCall(audioOnlyCall)
        .setMode(CometChatUIKitConstants.calls.default)
        .setLocalizedStringObject(CometChatLocalize.getLocale());
    };

    const subtitleStyle = () => {
      return {
        textFont: incomingCallStyle.subtitleTextFont,
        textColor: incomingCallStyle.subtitleTextColor,
      };
    };
    const wrapperStyle = () => {
      return {
        height: incomingCallStyle.height,
        width: incomingCallStyle.width,
        background: incomingCallStyle.background,
        border: incomingCallStyle.border,
        borderRadius: incomingCallStyle.borderRadius,
        padding: "8px",
      };
    };

    const getDeclineStyle = () => {
      return declineButtonStyle;
    };

    const getAcceptButtonStyle = () => {
      return acceptButtonStyle;
    };

    const getIconStyle = () => {
      return iconStyle;
    };

    const getAvatarStyle = () => {
      return avatarStyle;
    };

    const getListItemStyle = () => {
      return listItemStyle;
    };

    const getOngoingCallStyle = (): any => {
      return ongoingCallStyle;
    };

    return {
      wrapperStyle,
      getCallTypeIcon,
      getOngoingCallStyle,
      getAvatarStyle,
      getListItemStyle,
      getDeclineStyle,
      getAcceptButtonStyle,
      getCallBuilder,
      showOngoingCall,
      ongoingCallStyle,
      sessionId,
      rejectIncomingCall,
      acceptIncomingCall,
      getIconStyle,
      subtitleText,
      subtitleStyle,
      currentCall,
      showIncomingCallScreen,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cc-incomingcall__wrapper {
  position: absolute;
  left: 8px;
  top: 8px;
  height: fit-content;
  width: fit-content;
  min-height: 104px;
  min-width: 230px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 8px;
  align-items: flex-start;
}
.cc-incomingcall-buttons {
  display: flex;
  gap: 8px;
}
.cc-incomingcall__tailview {
  position: relative;
}
.cc-incomingcall__subtitleview {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
}
.cc-incomingcall__listitem {
  width: 100%;
  margin-left: -4px;
}
</style>
