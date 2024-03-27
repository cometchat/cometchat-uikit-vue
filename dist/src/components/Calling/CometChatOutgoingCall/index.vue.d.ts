import { PropType } from "vue";
import { OutgoingCallStyle } from "@cometchat/uikit-shared";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { IconButtonAlignment } from "@cometchat/uikit-resources";
import { AvatarStyle, CardStyle } from "@cometchat/uikit-elements";
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
    declineButtonText: {
        type: StringConstructor;
        default: () => any;
    };
    declineButtonIconURL: {
        type: StringConstructor;
        default: string;
    };
    customView: {
        type: PropType<ViewType>;
    };
    onError: {
        type: PropType<(error: CometChat.CometChatException) => void>;
        default: (error: CometChat.CometChatException) => void;
    };
    avatarStyle: {
        type: PropType<AvatarStyle>;
        default: () => AvatarStyle;
    };
    outgoingCallStyle: {
        type: PropType<OutgoingCallStyle>;
        default: () => OutgoingCallStyle;
    };
    onCloseClicked: {
        type: PropType<(call: any) => void>;
    };
}, {
    wrapperStyle: () => {
        height: string;
        width: string;
        background: string;
        border: string;
        borderRadius: string;
    };
    getCardStyle: () => CardStyle;
    getAvatarURL: () => string;
    getSubtitleStyle: () => {
        textFont: string;
        textColor: string;
    };
    subtitleText: string;
    iconAlignment: IconButtonAlignment.top;
    getButtonStyle: () => any;
    getAvatarStyle: () => AvatarStyle;
    onClose: (call: any) => void;
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
    declineButtonText: {
        type: StringConstructor;
        default: () => any;
    };
    declineButtonIconURL: {
        type: StringConstructor;
        default: string;
    };
    customView: {
        type: PropType<ViewType>;
    };
    onError: {
        type: PropType<(error: CometChat.CometChatException) => void>;
        default: (error: CometChat.CometChatException) => void;
    };
    avatarStyle: {
        type: PropType<AvatarStyle>;
        default: () => AvatarStyle;
    };
    outgoingCallStyle: {
        type: PropType<OutgoingCallStyle>;
        default: () => OutgoingCallStyle;
    };
    onCloseClicked: {
        type: PropType<(call: any) => void>;
    };
}>>, {
    onError: (error: CometChat.CometChatException) => void;
    avatarStyle: AvatarStyle;
    disableSoundForCalls: boolean;
    declineButtonText: string;
    declineButtonIconURL: string;
    outgoingCallStyle: OutgoingCallStyle;
}, {}>;
export default _sfc_main;
