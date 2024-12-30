import { PropType, Ref } from "vue";
import { CallButtonsStyle, CometChatUIKitCalls, CallScreenConfiguration, OutgoingCallConfiguration } from "@cometchat/uikit-shared";
import { CometChat } from "@cometchat/chat-sdk-javascript";
declare const _sfc_main: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    user: {
        type: PropType<import("@cometchat/chat-sdk-javascript").User>;
    };
    group: {
        type: PropType<import("@cometchat/chat-sdk-javascript").Group>;
    };
    voiceCallIconURL: {
        type: StringConstructor;
        default: string;
    };
    voiceCallIconText: {
        type: StringConstructor;
        default: () => any;
    };
    voiceCallIconHoverText: {
        type: StringConstructor;
        default: () => any;
    };
    videoCallIconURL: {
        type: StringConstructor;
        default: string;
    };
    videoCallIconText: {
        type: StringConstructor;
        default: () => any;
    };
    videoCallIconHoverText: {
        type: StringConstructor;
        default: () => any;
    };
    callButtonsStyle: {
        type: PropType<CallButtonsStyle>;
        default: () => CallButtonsStyle;
    };
    onVoiceCallClick: {
        type: PropType<(user: CometChat.User, group: CometChat.Group) => void>;
        default: () => void;
    };
    onVideoCallClick: {
        type: PropType<(user: CometChat.User, group: CometChat.Group) => void>;
        default: () => void;
    };
    onError: {
        type: PropType<(error: CometChat.CometChatException) => void>;
        default: (error: CometChat.CometChatException) => void;
    };
    ongoingCallConfiguration: {
        type: PropType<CallScreenConfiguration>;
        default: () => CallScreenConfiguration;
    };
    outgoingCallConfiguration: {
        type: PropType<OutgoingCallConfiguration>;
        default: () => OutgoingCallConfiguration;
    };
}>, {
    getVoiceCallButtonStyle: () => any;
    getVideoCallButtonStyle: () => any;
    initiateAudioCall: () => void;
    initiateVideoCall: () => void;
    getOngoingCallStyle: () => any;
    wrapperStyle: () => {
        height: any;
        width: any;
        background: any;
        border: any;
        borderRadius: any;
    };
    call: Ref<import("@cometchat/chat-sdk-javascript").Call, import("@cometchat/chat-sdk-javascript").Call>;
    showOutgoingCallscreen: Ref<boolean, boolean>;
    showOngoingCall: Ref<boolean, boolean>;
    cancelOutgoingCall: () => void;
    getOutGoingCallStyle: () => {
        titleTextFont?: string;
        titleTextColor?: string;
        subtitleTextFont?: string;
        subtitleTextColor?: string;
        declineButtonTextFont?: string;
        declineButtonTextColor?: string;
        declineButtonIconTint?: string;
        declineButtonIconBackground?: string;
        height?: string;
        width?: string;
        border?: string;
        borderRadius?: string;
        background?: string;
    };
    getCallBuilder: () => typeof CometChatUIKitCalls.CallSettings;
    sessionId: Ref<string, string>;
    disableButtons: Ref<boolean, boolean>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    user: {
        type: PropType<import("@cometchat/chat-sdk-javascript").User>;
    };
    group: {
        type: PropType<import("@cometchat/chat-sdk-javascript").Group>;
    };
    voiceCallIconURL: {
        type: StringConstructor;
        default: string;
    };
    voiceCallIconText: {
        type: StringConstructor;
        default: () => any;
    };
    voiceCallIconHoverText: {
        type: StringConstructor;
        default: () => any;
    };
    videoCallIconURL: {
        type: StringConstructor;
        default: string;
    };
    videoCallIconText: {
        type: StringConstructor;
        default: () => any;
    };
    videoCallIconHoverText: {
        type: StringConstructor;
        default: () => any;
    };
    callButtonsStyle: {
        type: PropType<CallButtonsStyle>;
        default: () => CallButtonsStyle;
    };
    onVoiceCallClick: {
        type: PropType<(user: CometChat.User, group: CometChat.Group) => void>;
        default: () => void;
    };
    onVideoCallClick: {
        type: PropType<(user: CometChat.User, group: CometChat.Group) => void>;
        default: () => void;
    };
    onError: {
        type: PropType<(error: CometChat.CometChatException) => void>;
        default: (error: CometChat.CometChatException) => void;
    };
    ongoingCallConfiguration: {
        type: PropType<CallScreenConfiguration>;
        default: () => CallScreenConfiguration;
    };
    outgoingCallConfiguration: {
        type: PropType<OutgoingCallConfiguration>;
        default: () => OutgoingCallConfiguration;
    };
}>> & Readonly<{}>, {
    onError: (error: CometChat.CometChatException) => void;
    voiceCallIconURL: string;
    voiceCallIconText: string;
    voiceCallIconHoverText: string;
    videoCallIconURL: string;
    videoCallIconText: string;
    videoCallIconHoverText: string;
    callButtonsStyle: CallButtonsStyle;
    onVoiceCallClick: (user: CometChat.User, group: CometChat.Group) => void;
    onVideoCallClick: (user: CometChat.User, group: CometChat.Group) => void;
    ongoingCallConfiguration: CallScreenConfiguration;
    outgoingCallConfiguration: OutgoingCallConfiguration;
}, {}, undefined, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _sfc_main;
