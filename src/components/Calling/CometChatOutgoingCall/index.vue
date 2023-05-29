<template>
  <div class="cc-outgoingcall__wrapper" :style="wrapperStyle()">
    <div class="cc-outgoingcall__custom-view" v-if="customView">
      <div v-if="customView.html" v-html="customView.html"></div>
      <component
        v-else
        :is="customView.componentName!"
        v-bind="{ ...customView.props }"
        v-on="customView?.listeners"
      >
        <template v-for="(item, key) in customView.slots" :key="key">
          <div :v-slot="[key]" :v-html="item"></div>
        </template>
      </component>
    </div>
    <template v-else>
      <cometchat-card
        :title="call?.getReceiver()?.getName()"
        :cardStyle="getCardStyle()"
        :avatarName="call?.getReceiver()?.getName()"
        :avatarURL="getAvatarURL()"
        :avatarStyle="getAvatarStyle()"
      >
        <cometchat-label
          slot="subtitleView"
          :labelStyle="getSubtitleStyle()"
          :text="subtitleText"
        >
        </cometchat-label>
        <div slot="bottomView">
          <cometchat-icon-button
            @cc-button-clicked="onClose()"
            :text="declineButtonText"
            :iconURL="declineButtonIconURL"
            :alignment="iconAlignment"
            :buttonStyle="getButtonStyle()"
          >
          </cometchat-icon-button>
        </div>
      </cometchat-card>
    </template>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  PropType,
} from "vue";
import { CometChatSoundManager, OutgoingCallStyle } from "uikit-utils-lerna";

import { CometChat } from "@cometchat-pro/chat";
import "my-cstom-package-lit";

import {
  CometChatTheme,
  CometChatUIKitConstants,
  fontHelper,
  IconButtonAlignment,
  localize,
} from "uikit-resources-lerna";

import { AvatarStyle, CardStyle, IconStyle } from "my-cstom-package-lit";
import { Close2xIcon } from "../../../assets";
export default defineComponent({
  name: "CometChatOutgoingCall",
  components: {},
  props: {
    call: { type: CometChat.Call },
    disableSoundForCalls: { type: Boolean, default: false },
    customSoundForCalls: { type: String },
    declineButtonText: { type: String, default: () => localize("CANCEL") },
    declineButtonIconURL: { type: String, default: Close2xIcon },
    customView: { type: Object as PropType<ViewType> },
    onError: {
      type: Function as PropType<(error: CometChat.CometChatException) => void>,
      default: (error: CometChat.CometChatException) => {
        console.log("error: ", error);
      },
    },
    avatarStyle: {
      type: AvatarStyle,
      default: {
        borderRadius: "50%",
        width: "180px",
        height: "180px",
      },
    },
    outgoingCallStyle: {
      type: OutgoingCallStyle,
      default: new OutgoingCallStyle({}),
    },
    onCloseClicked: { type: Function as PropType<() => void> },
  },
  setup(props) {
    let subtitleText: string = localize("CALLING");
    let cardStyle: CardStyle = {
      height: "100%",
      width: "100%",
      border: "inherite",
      borderRadius: "inherite",
      background: "transparent",
      titleFont: "700 22px Inter",
      titleColor: "black",
    };
    let iconAlignment: IconButtonAlignment = IconButtonAlignment.top;
    let { theme, switchThemeMode }: any = inject(
      "theme",
      new CometChatTheme({})
    )!;
    let iconStyle: IconStyle = {
      height: "16px",
      width: "16px",
      iconTint: "RGBA(20, 20, 20, 0.68)",
    };

    let buttonStyle: any = {
      height: "fit-content",
      width: "fit-content",
      buttonTextFont: "400 12px Inter",
      buttonTextColor: "RGBA(20, 20, 20, 0.58)",
      borderRadius: "8px",
      border: "none",
      buttonIconTint: "white",
      background: "",
      iconBackground: "red",
    };

    let styleOutGoingCall: OutgoingCallStyle = {};
    let styleAvatar: AvatarStyle = {};

    onBeforeMount(() => {
      setThemeStyle();
    });

    onMounted(() => {
      if (props.call) {
        playAudio();
      }
    });

    onUpdated(() => {
      if (props.call) {
        playAudio();
      }
    });

    onBeforeUnmount(() => {
      CometChatSoundManager.pause();
    });

    const onClose = () => {
      if (props.onCloseClicked) {
        props.onCloseClicked();
      }
    };
    const getAvatarURL = () => {
      return props.call?.getReceiverType() ==
        CometChatUIKitConstants.MessageReceiverType.user
        ? (props.call?.getReceiver() as CometChat.User)?.getAvatar()
        : (props.call?.getReceiver() as CometChat.Group)?.getIcon();
    };
    const setThemeStyle = () => {
      setAvatarStyle();
      setOutgoingCallStyle();
      cardStyle.titleColor = styleOutGoingCall.titleTextColor;
      cardStyle.titleFont = styleOutGoingCall.titleTextFont;
    };

    const playAudio = () => {
      try {
        if (!props.disableSoundForCalls) {
          if (props.customSoundForCalls) {
            CometChatSoundManager.play(
              CometChatSoundManager.Sound.incomingCall,
              props.customSoundForCalls
            );
          } else {
            CometChatSoundManager.play(
              CometChatSoundManager.Sound.incomingCall
            );
          }
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

    const setOutgoingCallStyle = () => {
      let defaultStyle: OutgoingCallStyle = new OutgoingCallStyle({
        width: "100%",
        height: "100%",
        background: theme.value.palette.getBackground(),
        border: "none",
        borderRadius: "0",
        titleTextFont: fontHelper(theme.value.typography.title1),
        titleTextColor: theme.value.palette.getAccent(),
        subtitleTextFont: fontHelper(theme.value.typography.subtitle1),
        subtitleTextColor: theme.value.palette.getAccent600(),
        declineButtonTextFont: fontHelper(theme.value.typography.caption1),
        declineButtonTextColor: theme.value.palette.getAccent600(),
        declineButtonIconTint: theme.value.palette.getAccent("dark"),
        declineButtonIconBackground: theme.value.palette.getError(),
      });
      styleOutGoingCall = { ...defaultStyle, ...props.outgoingCallStyle };
      buttonStyle = {
        height: "fit-content",
        width: "fit-content",
        buttonTextFont: styleOutGoingCall.declineButtonTextFont,
        buttonTextColor: styleOutGoingCall.declineButtonTextColor,
        borderRadius: "8px",
        border: "none",
        buttonIconTint: styleOutGoingCall.declineButtonIconTint,
        background: "",
        iconBackground: styleOutGoingCall.declineButtonIconBackground,
      };
    };

    const setAvatarStyle = () => {
      let defaultStyle: AvatarStyle = new AvatarStyle({
        borderRadius: "50%",
        width: "150px",
        height: "150px",
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

    const getSubtitleStyle = () => {
      return {
        textFont: styleOutGoingCall.subtitleTextFont,
        textColor: styleOutGoingCall.subtitleTextColor,
      };
    };
    const wrapperStyle = () => {
      return {
        height: styleOutGoingCall.height,
        width: styleOutGoingCall.width,
        background: styleOutGoingCall.background,
        border: styleOutGoingCall.border,
        borderRadius: styleOutGoingCall.borderRadius,
      };
    };

    const getCardStyle = () => {
      return cardStyle;
    };

    const getButtonStyle = () => {
      return buttonStyle;
    };

    const getAvatarStyle = () => {
      return styleAvatar;
    };

    return {
      wrapperStyle,
      getCardStyle,
      getAvatarURL,
      getSubtitleStyle,
      subtitleText,
      iconAlignment,
      getButtonStyle,
      getAvatarStyle,
      onClose,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cc-outgoingcall__wrapper {
  height: 100%;
  width: 100%;
}
</style>
