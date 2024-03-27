import { Ref, PropType } from 'vue';
import { CometChatTheme, States } from '@cometchat/uikit-resources';
import { AIConversationStarterConfiguration } from "@cometchat/uikit-shared";
declare const _sfc_main: import("vue").DefineComponent<{
    getConversationStarterCallback: {
        type: PropType<(theme: CometChatTheme) => Promise<string[]>>;
        required: true;
    };
    configuration: {
        type: PropType<AIConversationStarterConfiguration>;
        default: () => AIConversationStarterConfiguration;
    };
    editReplyCallback: {
        type: PropType<(reply: string) => void>;
    };
    closeCallback: {
        type: PropType<() => void>;
    };
}, {
    starterViewStyle: import("@cometchat/uikit-shared").AIConversationStarterStyle;
    errorStateText: any;
    loadingStateText: any;
    emptyStateText: any;
    fetchButtonContent: () => void;
    getConversationStarterStyle: (theme?: CometChatTheme, style?: import("@cometchat/uikit-shared").AIConversationStarterStyle) => {
        replyTextFont: string;
        replyTextColor: string;
        replyBackground: string;
        boxShadow: string;
        background: string;
        width: string;
        height: string;
        border: string;
        borderRadius: string;
        display: string;
        justifyContent: string;
    };
    theme: Ref<CometChatTheme>;
    States: typeof States;
    getContainerStyle: (style?: import("@cometchat/uikit-shared").AIConversationStarterStyle) => {
        display: string;
        overflow: string;
        width: string;
        height: string;
        justifyContent: string;
        alignItems: string;
        minHeight: string;
    };
    localize: (str: string) => any;
    messageListState: Ref<States>;
    loadingIconURL: string;
    errorIconURL: string;
    emptyIconURL: string;
    activeView: any;
    replies: Ref<any[]>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    getConversationStarterCallback: {
        type: PropType<(theme: CometChatTheme) => Promise<string[]>>;
        required: true;
    };
    configuration: {
        type: PropType<AIConversationStarterConfiguration>;
        default: () => AIConversationStarterConfiguration;
    };
    editReplyCallback: {
        type: PropType<(reply: string) => void>;
    };
    closeCallback: {
        type: PropType<() => void>;
    };
}>>, {
    configuration: AIConversationStarterConfiguration;
}, {}>;
export default _sfc_main;
