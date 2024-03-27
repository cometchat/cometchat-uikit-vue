import { CallLogRecordingsStyle, ListStyle } from "@cometchat/uikit-shared";
import { CometChatTheme } from "@cometchat/uikit-resources";
import { CSSProperties } from "vue";
import { ListItemStyle } from "@cometchat/uikit-elements";
export declare function getButtonContainerStyle(): CSSProperties;
export declare function getListStyle(theme: CometChatTheme, callLogsStyle: CallLogRecordingsStyle): ListStyle;
export declare function getListItemStyle(theme: CometChatTheme, listItemStyle?: ListItemStyle): ListItemStyle;
export declare function getSubtitleStyle(theme: CometChatTheme, style: CallLogRecordingsStyle): CSSProperties;
export declare function getCallDateStyle(theme: CometChatTheme, style: CallLogRecordingsStyle): {
    textColor: string;
    textFont: string;
    background: string;
};
export declare function getBackButtonStyle(theme: CometChatTheme, style: CallLogRecordingsStyle): {
    height: string;
    width: string;
    border: string;
    borderRadius: string;
    background: string;
    buttonIconTint: string;
};
export declare function getDownloadButtonStyle(theme: CometChatTheme, style: CallLogRecordingsStyle): {
    height: string;
    width: string;
    border: string;
    borderRadius: string;
    background: string;
    buttonIconTint: string;
};
export declare function getContainerStyle(theme: CometChatTheme, callLogsStyle: CallLogRecordingsStyle): CSSProperties;
export declare function getTitleStyle(theme: CometChatTheme, style: CallLogRecordingsStyle): {
    font: string;
    color: string;
    background: string;
};
