import { PropType, Ref } from "vue";
import { IncomingCallStyle, CometChatUIKitCalls } from "@cometchat/uikit-shared";
import { CallscreenStyle } from "@cometchat/uikit-elements";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { AvatarStyle, IconStyle, ListItemStyle } from "@cometchat/uikit-elements";
declare const _sfc_main: import("vue").DefineComponent<{
    call: {
        type: PropType<import("@cometchat/chat-sdk-javascript").Call>;
    };
    disableSoundForCalls: {
        type: BooleanConstructor;
        default: boolean;
    };
    customSoundForCalls: {
        type: StringConstructor;
    };
    onAccept: {
        type: PropType<() => void>;
    };
    onDecline: {
        type: PropType<() => void>;
    };
    acceptButtonText: {
        type: StringConstructor;
        default: () => any;
    };
    declineButtonText: {
        type: StringConstructor;
        default: () => any;
    };
    subtitleView: {
        type: PropType<ViewType>;
        default: any;
    };
    onError: {
        type: PropType<(error: CometChat.CometChatException) => void>;
        default: (error: CometChat.CometChatException) => void;
    };
    listItemStyle: {
        type: PropType<ListItemStyle>;
        default: () => ListItemStyle;
    };
    avatarStyle: {
        type: PropType<AvatarStyle>;
        default: () => AvatarStyle;
    };
    incomingCallStyle: {
        type: PropType<IncomingCallStyle>;
        default: () => IncomingCallStyle;
    };
}, {
    wrapperStyle: () => {
        height: any;
        width: any;
        background: any;
        border: any;
        borderRadius: any;
        padding: string;
    };
    getCallTypeIcon: () => string;
    getOngoingCallStyle: () => any;
    getAvatarStyle: () => {};
    getListItemStyle: () => {};
    getDeclineStyle: () => any;
    getAcceptButtonStyle: () => any;
    getCallBuilder: () => typeof CometChatUIKitCalls.CallSettings | undefined;
    showOngoingCall: Ref<boolean>;
    ongoingCallStyle: CallscreenStyle;
    sessionId: Ref<string>;
    rejectIncomingCall: (reason?: string) => void;
    acceptIncomingCall: () => void;
    getIconStyle: () => IconStyle;
    subtitleText: string;
    subtitleStyle: () => {
        textFont: any;
        textColor: any;
    };
    currentCall: any;
    showIncomingCallScreen: Ref<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    call: {
        type: PropType<import("@cometchat/chat-sdk-javascript").Call>;
    };
    disableSoundForCalls: {
        type: BooleanConstructor;
        default: boolean;
    };
    customSoundForCalls: {
        type: StringConstructor;
    };
    onAccept: {
        type: PropType<() => void>;
    };
    onDecline: {
        type: PropType<() => void>;
    };
    acceptButtonText: {
        type: StringConstructor;
        default: () => any;
    };
    declineButtonText: {
        type: StringConstructor;
        default: () => any;
    };
    subtitleView: {
        type: PropType<ViewType>;
        default: any;
    };
    onError: {
        type: PropType<(error: CometChat.CometChatException) => void>;
        default: (error: CometChat.CometChatException) => void;
    };
    listItemStyle: {
        type: PropType<ListItemStyle>;
        default: () => ListItemStyle;
    };
    avatarStyle: {
        type: PropType<AvatarStyle>;
        default: () => AvatarStyle;
    };
    incomingCallStyle: {
        type: PropType<IncomingCallStyle>;
        default: () => IncomingCallStyle;
    };
}>>, {
    subtitleView: ViewType;
    onError: (error: CometChat.CometChatException) => void;
    avatarStyle: AvatarStyle;
    listItemStyle: ListItemStyle;
    disableSoundForCalls: boolean;
    acceptButtonText: string;
    declineButtonText: string;
    incomingCallStyle: IncomingCallStyle;
}, {}>;
export default _sfc_main;
