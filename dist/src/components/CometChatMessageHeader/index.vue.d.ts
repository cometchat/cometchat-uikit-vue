import { Ref, CSSProperties, PropType } from "vue";
import { MessageHeaderStyle, BaseStyle } from "@cometchat/uikit-shared";
import { CometChatTheme } from "@cometchat/uikit-resources";
import { AvatarStyle, ListItemStyle } from "@cometchat/uikit-elements";
import { CometChat } from "@cometchat/chat-sdk-javascript";
declare const _sfc_main: import("vue").DefineComponent<{
    avatarStyle: {
        type: PropType<AvatarStyle>;
        default: () => AvatarStyle;
    };
    statusIndicatorStyle: {
        type: PropType<BaseStyle>;
        default: () => BaseStyle;
    };
    messageHeaderStyle: {
        type: PropType<MessageHeaderStyle>;
        default: () => MessageHeaderStyle;
    };
    listItemStyle: {
        type: PropType<ListItemStyle>;
    };
    subtitleView: {
        type: PropType<() => ViewType>;
    };
    disableUsersPresence: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableTyping: {
        type: BooleanConstructor;
        default: boolean;
    };
    protectedGroupIcon: {
        type: StringConstructor;
        default: string;
    };
    privateGroupIcon: {
        type: StringConstructor;
        default: string;
    };
    menu: {
        type: PropType<ViewType[]>;
    };
    user: {
        type: PropType<import("@cometchat/chat-sdk-javascript").User>;
    };
    group: {
        type: PropType<import("@cometchat/chat-sdk-javascript").Group>;
    };
    backButtonIconURL: {
        type: StringConstructor;
        default: string;
    };
    hideBackButton: {
        type: BooleanConstructor;
        default: boolean;
    };
    listItemView: {
        type: PropType<ViewType>;
    };
    onError: {
        type: PropType<(error: CometChat.CometChatException) => void>;
        default: (error: CometChat.CometChatException) => void;
    };
    onBack: {
        type: PropType<() => void>;
        default: () => void;
    };
}, {
    getBackButtonStyle: () => {
        height: string;
        width: string;
        border: string;
        borderRadius: string;
        background: string;
        buttonIconTint: string;
    };
    checkStatusType: () => any;
    checkGroupType: () => string;
    headerStyle: () => CSSProperties;
    subtitleText: Ref<string>;
    subtitleStyle: () => {
        textFont: string;
        textColor: string;
    };
    MessageHeaderMenuStyle: () => {
        width: string;
        display: string;
        alignItems: string;
        justifyContent: string;
        padding: string;
    };
    onBackClicked: () => void;
    theme: Ref<CometChatTheme>;
    fontHelper: (obj: import("@cometchat/uikit-resources").CometChatFont) => string;
    currentUser: any;
    currentGroup: any;
    getHeadersStyle: () => {
        backButtonIconTint?: string;
        onlineStatusColor?: string;
        subtitleTextColor?: string;
        subtitleTextFont?: string;
        typingIndicatorTextColor?: string;
        typingIndicatorTextFont?: string;
        privateGroupIconBackground?: string;
        passwordGroupIconBackground?: string;
        height?: string;
        width?: string;
        border?: string;
        borderRadius?: string;
        background?: string;
    };
    getStatusStyle: () => {
        height?: string;
        width?: string;
        border?: string;
        borderRadius?: string;
        background?: string;
    };
    getAvatarStyles: () => {
        borderRadius: string;
        width: string;
        height: string;
        border: string;
        backgroundColor: string;
        nameTextColor: string;
        backgroundSize: string;
        nameTextFont: string;
        outerViewBorderWidth: string;
        outerViewBorderSpacing: string;
        outerViewBorderRadius?: string;
        outerViewBorderColor?: string;
    };
    getListItemStyle: () => any;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    avatarStyle: {
        type: PropType<AvatarStyle>;
        default: () => AvatarStyle;
    };
    statusIndicatorStyle: {
        type: PropType<BaseStyle>;
        default: () => BaseStyle;
    };
    messageHeaderStyle: {
        type: PropType<MessageHeaderStyle>;
        default: () => MessageHeaderStyle;
    };
    listItemStyle: {
        type: PropType<ListItemStyle>;
    };
    subtitleView: {
        type: PropType<() => ViewType>;
    };
    disableUsersPresence: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableTyping: {
        type: BooleanConstructor;
        default: boolean;
    };
    protectedGroupIcon: {
        type: StringConstructor;
        default: string;
    };
    privateGroupIcon: {
        type: StringConstructor;
        default: string;
    };
    menu: {
        type: PropType<ViewType[]>;
    };
    user: {
        type: PropType<import("@cometchat/chat-sdk-javascript").User>;
    };
    group: {
        type: PropType<import("@cometchat/chat-sdk-javascript").Group>;
    };
    backButtonIconURL: {
        type: StringConstructor;
        default: string;
    };
    hideBackButton: {
        type: BooleanConstructor;
        default: boolean;
    };
    listItemView: {
        type: PropType<ViewType>;
    };
    onError: {
        type: PropType<(error: CometChat.CometChatException) => void>;
        default: (error: CometChat.CometChatException) => void;
    };
    onBack: {
        type: PropType<() => void>;
        default: () => void;
    };
}>>, {
    disableUsersPresence: boolean;
    backButtonIconURL: string;
    onError: (error: CometChat.CometChatException) => void;
    onBack: () => void;
    avatarStyle: AvatarStyle;
    statusIndicatorStyle: BaseStyle;
    disableTyping: boolean;
    protectedGroupIcon: string;
    privateGroupIcon: string;
    messageHeaderStyle: MessageHeaderStyle;
    hideBackButton: boolean;
}, {}>;
export default _sfc_main;
