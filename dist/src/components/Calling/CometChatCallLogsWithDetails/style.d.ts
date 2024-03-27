import { CometChatTheme } from "@cometchat/uikit-resources";
import { CSSProperties } from "vue";
import { LabelStyle } from "@cometchat/uikit-elements";
import { WithDetailsStyle } from "@cometchat/uikit-shared";
export declare function getContainerStyle(theme: CometChatTheme, style: WithDetailsStyle): CSSProperties;
export declare function getLabelStyle(theme: CometChatTheme, style: WithDetailsStyle): LabelStyle;
export declare function getEmptyContainerStyle(): {
    display: string;
    justifyContent: string;
    alignItems: string;
    height: string;
    width: string;
};
