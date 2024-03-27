import { CometChatTheme } from "@cometchat/uikit-resources";
import { CSSProperties } from "vue";
import { CallLogDetailsStyle } from "@cometchat/uikit-shared";
export declare function getProfileContainerStyle(): CSSProperties;
export declare function getButtonContainerStyle(): CSSProperties;
export declare function getBackButtonStyle(theme: CometChatTheme, style: CallLogDetailsStyle): {
    height: string;
    width: string;
    border: string;
    borderRadius: string;
    background: string;
    buttonIconTint: string;
};
export declare function getContainerStyle(theme: CometChatTheme, style: CallLogDetailsStyle): CSSProperties;
export declare function getTitleStyle(theme: CometChatTheme, style: CallLogDetailsStyle): {
    font: string;
    color: string;
    background: string;
};
