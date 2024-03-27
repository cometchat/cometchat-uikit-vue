import { AvatarStyle, ListItemStyle } from "@cometchat/uikit-elements";
import { CallLogsStyle, ListStyle } from "@cometchat/uikit-shared";
import { CometChatTheme } from "@cometchat/uikit-resources";
import { CSSProperties } from "vue";
export declare function getSubtitleStyle(theme: CometChatTheme, style: CallLogsStyle): CSSProperties;
export declare function getAvatarStyle(theme: CometChatTheme, avatarStyle?: AvatarStyle): AvatarStyle;
export declare function getListItemStyle(call: any, theme: CometChatTheme, listItemStyle?: ListItemStyle, loggedInUser?: CometChat.User): ListItemStyle;
export declare function getContainerStyle(theme: CometChatTheme, callLogsStyle: CallLogsStyle): CSSProperties;
export declare function getListStyle(theme: CometChatTheme, callLogsStyle: CallLogsStyle): ListStyle;
export declare function getCallDateStyle(theme: CometChatTheme, style: CallLogsStyle): {
    textColor: string;
    textFont: string;
    background: string;
    padding: string;
};
export declare function getButtonContainerStyle(): CSSProperties;
export declare function getDirectionIconStyle(call: any, theme: CometChatTheme, style: CallLogsStyle, loggedInUser: CometChat.User): {
    height: string;
    width: string;
    border: string;
    borderRadius: string;
    background: string;
    iconTint: any;
};
export declare function getInfoButtonStyle(theme: CometChatTheme, style: CallLogsStyle): {
    height: string;
    width: string;
    border: string;
    borderRadius: string;
    background: string;
    buttonIconTint: string;
};
export declare function getDateSeparator(theme: CometChatTheme, style: CallLogsStyle): {
    textFont: string;
    textColor: string;
    background: string;
    padding: string;
};
