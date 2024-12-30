import { Ref, PropType } from 'vue';
import { CometChatTheme, States } from '@cometchat/uikit-resources';
import { getBackButtonStyle, getSmartRepliesContainerStyle, getSmartRepliesTitleStyle } from './style';
import { AISmartRepliesConfiguration } from "@cometchat/uikit-shared";
declare const _sfc_main: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    title: {
        type: StringConstructor;
        default: any;
    };
    getSmartRepliesCallback: {
        type: PropType<(theme: CometChatTheme) => Promise<Object>>;
        required: true;
    };
    configuration: {
        type: PropType<AISmartRepliesConfiguration>;
        default: () => AISmartRepliesConfiguration;
    };
    editReplyCallback: {
        type: PropType<(reply: string) => void>;
    };
    backCallback: {
        type: PropType<() => void>;
    };
    closeCallback: {
        type: PropType<() => void>;
    };
}>, {
    smartReplyViewStyle: import("@cometchat/uikit-shared").AISmartRepliesStyle;
    errorStateText: any;
    loadingStateText: any;
    emptyStateText: any;
    fetchButtonContent: () => void;
    getSmartReplyStyle: (theme?: CometChatTheme, style?: import("@cometchat/uikit-shared").AISmartRepliesStyle) => {
        replyTextFont: string;
        replyTextColor: string;
        replyBackground: string;
        boxShadow: string;
        background: string;
        border: string;
        borderRadius: string;
        display: string;
        justifyContent: string;
    };
    getBackButtonStyle: typeof getBackButtonStyle;
    getSmartRepliesContainerStyle: typeof getSmartRepliesContainerStyle;
    getSmartRepliesTitleStyle: typeof getSmartRepliesTitleStyle;
    theme: Ref<CometChatTheme, CometChatTheme>;
    States: typeof States;
    getContainerStyle: (style?: import("@cometchat/uikit-shared").AISmartRepliesStyle, theme?: CometChatTheme) => import("vue").CSSProperties;
    localize: (str: string) => any;
    messageListState: Ref<States, States>;
    loadingIconURL: string;
    errorIconURL: string;
    emptyIconURL: string;
    backButtonIconURL: string;
    activeView: Ref<any, any>;
    replies: Ref<any[], any[]>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: StringConstructor;
        default: any;
    };
    getSmartRepliesCallback: {
        type: PropType<(theme: CometChatTheme) => Promise<Object>>;
        required: true;
    };
    configuration: {
        type: PropType<AISmartRepliesConfiguration>;
        default: () => AISmartRepliesConfiguration;
    };
    editReplyCallback: {
        type: PropType<(reply: string) => void>;
    };
    backCallback: {
        type: PropType<() => void>;
    };
    closeCallback: {
        type: PropType<() => void>;
    };
}>> & Readonly<{}>, {
    title: string;
    configuration: AISmartRepliesConfiguration;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _sfc_main;
