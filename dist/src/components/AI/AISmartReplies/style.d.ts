import { AISmartRepliesStyle, SmartRepliesStyle } from "@cometchat/uikit-shared";
import { CometChatTheme } from "@cometchat/uikit-resources";
import { CSSProperties } from "vue";
export declare const getContainerStyle: (style?: AISmartRepliesStyle, theme?: CometChatTheme) => {
    display: string;
    overflow: string;
    width: string;
    height: string;
    justifyContent: string;
    alignItems: string;
    minHeight: string;
    background: string;
    borderRadius: string;
};
export declare const contentContainerStyle: CSSProperties;
export declare const getSmartReplyStyle: (theme?: CometChatTheme, style?: AISmartRepliesStyle) => {
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
export declare function getBackButtonStyle(style?: SmartRepliesStyle, theme?: CometChatTheme): any;
export declare function getSmartRepliesContainerStyle(): any;
export declare function getSmartRepliesTitleStyle(style?: AISmartRepliesStyle, theme?: CometChatTheme): any;
