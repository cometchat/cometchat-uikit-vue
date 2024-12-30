import { PropType, Ref } from "vue";
import { getSubtitleStyle, getAvatarStyle, getListItemStyle, getContainerStyle, getListStyle, getButtonContainerStyle, getCallDateStyle, getInfoButtonStyle, getDirectionIconStyle } from "./style";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { CallWorkflow, CometChatTheme, DatePatterns, SelectionMode, States, TitleAlignment } from "@cometchat/uikit-resources";
import { getCallStatusWithType, verifyCallUser } from "../Utils/utils";
import { AvatarStyle, ListItemStyle } from "@cometchat/uikit-elements";
import { CallLogsStyle, OutgoingCallConfiguration, OutgoingCallStyle } from "@cometchat/uikit-shared";
declare const _sfc_main: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    title: {
        type: StringConstructor;
        default: any;
    };
    titleAlignment: {
        type: PropType<TitleAlignment>;
        default: TitleAlignment;
    };
    listItemView: {
        type: PropType<(item: any) => ViewType>;
    };
    subtitleView: {
        type: PropType<(item: any) => ViewType>;
    };
    tailView: {
        type: PropType<(item: any) => ViewType>;
    };
    emptyStateView: {
        type: PropType<ViewType>;
    };
    emptyStateText: {
        type: StringConstructor;
        default: any;
    };
    errorStateText: {
        type: StringConstructor;
        default: () => any;
    };
    errorStateView: {
        type: PropType<ViewType>;
    };
    loadingIconURL: {
        type: StringConstructor;
        default: string;
    };
    loadingStateView: {
        type: PropType<ViewType>;
    };
    callLogRequestBuilder: {
        type: ObjectConstructor;
    };
    onItemClick: {
        type: PropType<(item: any) => void>;
    };
    onError: {
        type: PropType<(error: CometChat.CometChatException) => void>;
        default: () => void;
    };
    listItemStyle: {
        type: PropType<ListItemStyle>;
        default: () => ListItemStyle;
    };
    activeCall: {
        type: ObjectConstructor;
        default: any;
    };
    infoIconUrl: {
        type: StringConstructor;
        default: string;
    };
    onInfoClick: {
        type: PropType<(item: any) => void>;
    };
    datePattern: {
        type: PropType<DatePatterns>;
        default: DatePatterns;
    };
    dateSeparatorPattern: {
        type: PropType<DatePatterns>;
        default: DatePatterns;
    };
    incomingAudioCallIconUrl: {
        type: StringConstructor;
        default: string;
    };
    incomingVideoCallIconUrl: {
        type: StringConstructor;
        default: string;
    };
    outgoingAudioCallIconUrl: {
        type: StringConstructor;
        default: string;
    };
    outgoingVideoCallIconUrl: {
        type: StringConstructor;
        default: string;
    };
    missedAudioCallIconUrl: {
        type: StringConstructor;
        default: string;
    };
    missedVideoCallIconUrl: {
        type: StringConstructor;
        default: string;
    };
    callLogsStyle: {
        type: PropType<CallLogsStyle>;
        default: () => CallLogsStyle;
    };
    avatarStyle: {
        type: PropType<AvatarStyle>;
        default: () => AvatarStyle;
    };
    hideSeparator: {
        type: BooleanConstructor;
        default: boolean;
    };
    outgoingCallConfiguration: {
        type: PropType<OutgoingCallConfiguration>;
        default: () => OutgoingCallConfiguration;
    };
}>, {
    callList: any;
    state: Ref<States, States>;
    SelectionMode: typeof SelectionMode;
    getListItemStyle: typeof getListItemStyle;
    getAvatarStyle: typeof getAvatarStyle;
    getCallStatusWithType: typeof getCallStatusWithType;
    getSubtitleStyle: typeof getSubtitleStyle;
    handleItemClick: (call: any) => void;
    theme: Ref<CometChatTheme, CometChatTheme>;
    getCallList: () => Promise<void>;
    loggedInUser: Ref<import("@cometchat/chat-sdk-javascript").User, import("@cometchat/chat-sdk-javascript").User>;
    verifyCallUser: typeof verifyCallUser;
    getButtonContainerStyle: typeof getButtonContainerStyle;
    handleInfoClick: (call: any) => void;
    getInfoButtonStyle: typeof getInfoButtonStyle;
    getActiveCall: (call: any) => boolean;
    getCallDirectionIcon: (call: any) => any;
    getDirectionIconStyle: typeof getDirectionIconStyle;
    getContainerStyle: typeof getContainerStyle;
    getListStyle: typeof getListStyle;
    getCallDateStyle: typeof getCallDateStyle;
    getMessageBubbleDate: (item: any, i: number) => string;
    call: any;
    showOutgoingCallscreen: Ref<boolean, boolean>;
    cancelOutgoingCall: () => void;
    getOutGoingCallStyle: () => OutgoingCallStyle;
    showOngoingCall: Ref<boolean, boolean>;
    sessionId: any;
    CallWorkflow: typeof CallWorkflow;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: StringConstructor;
        default: any;
    };
    titleAlignment: {
        type: PropType<TitleAlignment>;
        default: TitleAlignment;
    };
    listItemView: {
        type: PropType<(item: any) => ViewType>;
    };
    subtitleView: {
        type: PropType<(item: any) => ViewType>;
    };
    tailView: {
        type: PropType<(item: any) => ViewType>;
    };
    emptyStateView: {
        type: PropType<ViewType>;
    };
    emptyStateText: {
        type: StringConstructor;
        default: any;
    };
    errorStateText: {
        type: StringConstructor;
        default: () => any;
    };
    errorStateView: {
        type: PropType<ViewType>;
    };
    loadingIconURL: {
        type: StringConstructor;
        default: string;
    };
    loadingStateView: {
        type: PropType<ViewType>;
    };
    callLogRequestBuilder: {
        type: ObjectConstructor;
    };
    onItemClick: {
        type: PropType<(item: any) => void>;
    };
    onError: {
        type: PropType<(error: CometChat.CometChatException) => void>;
        default: () => void;
    };
    listItemStyle: {
        type: PropType<ListItemStyle>;
        default: () => ListItemStyle;
    };
    activeCall: {
        type: ObjectConstructor;
        default: any;
    };
    infoIconUrl: {
        type: StringConstructor;
        default: string;
    };
    onInfoClick: {
        type: PropType<(item: any) => void>;
    };
    datePattern: {
        type: PropType<DatePatterns>;
        default: DatePatterns;
    };
    dateSeparatorPattern: {
        type: PropType<DatePatterns>;
        default: DatePatterns;
    };
    incomingAudioCallIconUrl: {
        type: StringConstructor;
        default: string;
    };
    incomingVideoCallIconUrl: {
        type: StringConstructor;
        default: string;
    };
    outgoingAudioCallIconUrl: {
        type: StringConstructor;
        default: string;
    };
    outgoingVideoCallIconUrl: {
        type: StringConstructor;
        default: string;
    };
    missedAudioCallIconUrl: {
        type: StringConstructor;
        default: string;
    };
    missedVideoCallIconUrl: {
        type: StringConstructor;
        default: string;
    };
    callLogsStyle: {
        type: PropType<CallLogsStyle>;
        default: () => CallLogsStyle;
    };
    avatarStyle: {
        type: PropType<AvatarStyle>;
        default: () => AvatarStyle;
    };
    hideSeparator: {
        type: BooleanConstructor;
        default: boolean;
    };
    outgoingCallConfiguration: {
        type: PropType<OutgoingCallConfiguration>;
        default: () => OutgoingCallConfiguration;
    };
}>> & Readonly<{}>, {
    title: string;
    titleAlignment: TitleAlignment;
    hideSeparator: boolean;
    errorStateText: string;
    emptyStateText: string;
    onError: (error: CometChat.CometChatException) => void;
    avatarStyle: AvatarStyle;
    listItemStyle: ListItemStyle;
    loadingIconURL: string;
    datePattern: DatePatterns;
    outgoingCallConfiguration: OutgoingCallConfiguration;
    dateSeparatorPattern: DatePatterns;
    activeCall: Record<string, any>;
    infoIconUrl: string;
    incomingAudioCallIconUrl: string;
    incomingVideoCallIconUrl: string;
    outgoingAudioCallIconUrl: string;
    outgoingVideoCallIconUrl: string;
    missedAudioCallIconUrl: string;
    missedVideoCallIconUrl: string;
    callLogsStyle: CallLogsStyle;
}, {}, undefined, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _sfc_main;
