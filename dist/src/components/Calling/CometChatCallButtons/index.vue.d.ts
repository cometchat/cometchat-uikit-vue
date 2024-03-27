import { PropType, Ref } from "vue";
import { CallButtonsStyle, OutgoingCallStyle, CometChatUIKitCalls } from "@cometchat/uikit-shared";
import { CometChat } from "@cometchat/chat-sdk-javascript";
declare const _sfc_main: import("vue").DefineComponent<{
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
}, {
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
    call: Ref<import("@cometchat/chat-sdk-javascript").Call>;
    showOutgoingCallscreen: Ref<boolean>;
    showOngoingCall: Ref<boolean>;
    cancelOutgoingCall: () => void;
    getOutGoingCallStyle: () => OutgoingCallStyle;
    getCallBuilder: () => typeof CometChatUIKitCalls.CallSettings;
    sessionId: Ref<string>;
    disableButtons: Ref<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
}>>, {
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
}, {}>;
export default _sfc_main;
