import { PropType } from "vue";
import { CallscreenStyle } from "@cometchat/uikit-elements";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { CallWorkflow } from "@cometchat/uikit-resources";
declare const _sfc_main: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    callSettingsBuilder: {
        type: any;
    };
    sessionID: {
        type: StringConstructor;
        default: string;
    };
    ongoingCallStyle: {
        type: PropType<CallscreenStyle>;
        default: () => CallscreenStyle;
    };
    resizeIconHoverText: {
        type: StringConstructor;
        default: () => any;
    };
    minimizeIconURL: {
        type: StringConstructor;
        default: string;
    };
    maximizeIconURL: {
        type: StringConstructor;
        default: string;
    };
    callWorkflow: {
        type: PropType<CallWorkflow>;
        default: () => CallWorkflow;
    };
    onError: {
        type: PropType<(error: CometChat.CometChatException) => void>;
        default: (error: CometChat.CometChatException) => void;
    };
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    callSettingsBuilder: {
        type: any;
    };
    sessionID: {
        type: StringConstructor;
        default: string;
    };
    ongoingCallStyle: {
        type: PropType<CallscreenStyle>;
        default: () => CallscreenStyle;
    };
    resizeIconHoverText: {
        type: StringConstructor;
        default: () => any;
    };
    minimizeIconURL: {
        type: StringConstructor;
        default: string;
    };
    maximizeIconURL: {
        type: StringConstructor;
        default: string;
    };
    callWorkflow: {
        type: PropType<CallWorkflow>;
        default: () => CallWorkflow;
    };
    onError: {
        type: PropType<(error: CometChat.CometChatException) => void>;
        default: (error: CometChat.CometChatException) => void;
    };
}>> & Readonly<{}>, {
    onError: (error: CometChat.CometChatException) => void;
    ongoingCallStyle: CallscreenStyle;
    callSettingsBuilder: any;
    sessionID: string;
    resizeIconHoverText: string;
    minimizeIconURL: string;
    maximizeIconURL: string;
    callWorkflow: CallWorkflow;
}, {}, undefined, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _sfc_main;
