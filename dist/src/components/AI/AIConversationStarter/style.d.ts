import { CometChatTheme } from "@cometchat/uikit-resources";
import { AIConversationStarterStyle } from "@cometchat/uikit-shared";
import { CSSProperties } from "vue";
export declare const getContainerStyle: (style?: AIConversationStarterStyle) => {
    display: string;
    overflow: string;
    width: string;
    height: string;
    justifyContent: string;
    alignItems: string;
    minHeight: string;
};
export declare const contentContainerStyle: CSSProperties;
export declare const getConversationStarterStyle: (theme?: CometChatTheme, style?: AIConversationStarterStyle) => {
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
