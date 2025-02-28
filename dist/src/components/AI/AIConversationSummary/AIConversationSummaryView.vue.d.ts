import { Ref, PropType } from 'vue';
import { CometChatTheme, States } from '@cometchat/uikit-resources';
import { AIConversationSummaryConfiguration } from "@cometchat/uikit-shared";
declare const _sfc_main: import("vue").DefineComponent<{
    getConversationSummaryCallback: {
        type: PropType<(theme: CometChatTheme) => Promise<string>>;
        required: true;
    };
    configuration: {
        type: PropType<AIConversationSummaryConfiguration>;
        default: () => AIConversationSummaryConfiguration;
    };
    closeCallback: {
        type: PropType<() => void>;
        default: any;
    };
}, {
    summaryViewStyle: import("@cometchat/uikit-shared").AIConversationSummaryStyle;
    errorStateText: string;
    loadingStateText: string;
    emptyStateText: string;
    titleText: string;
    fetchButtonContent: () => void;
    theme: Ref<CometChatTheme>;
    States: typeof States;
    getContainerStyle: (style?: import("@cometchat/uikit-shared").AIConversationSummaryStyle) => {
        display: string;
        overflow: string;
        width: string;
        height: string;
        justifyContent: string;
        alignItems: string;
        minHeight: string;
    };
    localize: (str: string) => any;
    getPanelStyle: (theme: CometChatTheme, summaryStyle: import("@cometchat/uikit-shared").AIConversationSummaryStyle) => import("@cometchat/uikit-elements").PanelStyle;
    messageListState: Ref<States>;
    loadingIconURL: string;
    errorIconURL: string;
    emptyIconURL: string;
    activeView: any;
    summary: any;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    getConversationSummaryCallback: {
        type: PropType<(theme: CometChatTheme) => Promise<string>>;
        required: true;
    };
    configuration: {
        type: PropType<AIConversationSummaryConfiguration>;
        default: () => AIConversationSummaryConfiguration;
    };
    closeCallback: {
        type: PropType<() => void>;
        default: any;
    };
}>>, {
    configuration: AIConversationSummaryConfiguration;
    closeCallback: () => void;
}, {}>;
export default _sfc_main;
