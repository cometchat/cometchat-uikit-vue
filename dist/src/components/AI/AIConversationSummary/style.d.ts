import { CometChatTheme } from "@cometchat/uikit-resources";
import { AIConversationSummaryStyle } from "@cometchat/uikit-shared";
import { CSSProperties } from "vue";
import { PanelStyle } from "@cometchat/uikit-elements";
export declare const getContainerStyle: (style?: AIConversationSummaryStyle) => {
    display: string;
    overflow: string;
    width: string;
    height: string;
    justifyContent: string;
    alignItems: string;
    minHeight: string;
};
export declare const contentContainerStyle: CSSProperties;
export declare const getConversationSummaryStyle: (theme?: CometChatTheme, style?: AIConversationSummaryStyle) => {
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
export declare const getPanelStyle: (theme: CometChatTheme, summaryStyle: AIConversationSummaryStyle) => PanelStyle;
