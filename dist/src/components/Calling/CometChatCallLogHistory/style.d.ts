import { AvatarStyle, DateStyle, ListItemStyle } from "@cometchat/uikit-elements";
import { CallLogHistoryStyle, ListStyle } from "@cometchat/uikit-shared";
import { CometChatTheme } from "@cometchat/uikit-resources";
import { CSSProperties } from "vue";
export declare function getSubtitleStyle(theme: CometChatTheme, style: CallLogHistoryStyle): DateStyle;
export declare function getAvatarStyle(theme: CometChatTheme, avatarStyle?: AvatarStyle): AvatarStyle;
export declare function getListItemStyle(theme: CometChatTheme, listItemStyle?: ListItemStyle): ListItemStyle;
export declare function getCallStatusStyle(theme: CometChatTheme, style: CallLogHistoryStyle): {
    font: string;
    color: string;
};
export declare function getContainerStyle(theme: CometChatTheme, callLogsStyle: CallLogHistoryStyle): CSSProperties;
export declare function getListStyle(theme: CometChatTheme, callLogsStyle: CallLogHistoryStyle): ListStyle;
export declare function getCallDurationStyle(theme: CometChatTheme, style: CallLogHistoryStyle): {
    font: string;
    color: string;
};
export declare function getButtonContainerStyle(): CSSProperties;
export declare function getBackButtonStyle(theme: CometChatTheme, style: CallLogHistoryStyle): {
    height: string;
    width: string;
    border: string;
    borderRadius: string;
    background: string;
    buttonIconTint: string;
};
export declare function getDateSeparator(theme: CometChatTheme, style: CallLogHistoryStyle): {
    textFont: string;
    textColor: string;
    background: string;
};
export declare function getDividerStyle(theme: CometChatTheme, style: CallLogHistoryStyle): {
    height: string;
    width: string;
    background: string;
};
export declare function getTitleStyle(theme: CometChatTheme, style: CallLogHistoryStyle): {
    font: string;
    color: string;
    background: string;
};
