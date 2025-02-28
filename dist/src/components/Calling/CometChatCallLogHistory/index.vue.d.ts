import { PropType, Ref } from "vue";
import { getSubtitleStyle, getAvatarStyle, getListItemStyle, getContainerStyle, getListStyle, getButtonContainerStyle, getCallDurationStyle, getBackButtonStyle, getCallStatusStyle, getTitleStyle } from "./style";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { CometChatTheme, DatePatterns, SelectionMode, States } from "@cometchat/uikit-resources";
import { getCallStatusWithType, verifyCallUser } from "../Utils/utils";
import { ListItemStyle } from "@cometchat/uikit-elements";
import { CallLogHistoryStyle } from "@cometchat/uikit-shared";
declare const _sfc_main: import("vue").DefineComponent<{
    callUser: {
        type: ObjectConstructor;
    };
    callGroup: {
        type: ObjectConstructor;
    };
    title: {
        type: StringConstructor;
        default: () => any;
    };
    emptyStateView: {
        type: PropType<ViewType>;
    };
    emptyStateText: {
        type: StringConstructor;
        default: () => any;
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
        type: PropType<(item: any) => ViewType>;
    };
    subtitleView: {
        type: PropType<(item: any) => ViewType>;
    };
    tailView: {
        type: PropType<(item: any) => ViewType>;
    };
    callLogRequestBuilder: {
        type: ObjectConstructor;
    };
    onItemClick: {
        type: PropType<(item: any) => void>;
    };
    backIconUrl: {
        type: StringConstructor;
        default: string;
    };
    onBackClick: {
        type: PropType<() => void>;
    };
    listItemStyle: {
        type: PropType<ListItemStyle>;
        default: () => ListItemStyle;
    };
    datePattern: {
        type: PropType<DatePatterns>;
        default: DatePatterns;
    };
    dateSeparatorPattern: {
        type: PropType<DatePatterns>;
        default: DatePatterns;
    };
    callLogHistoryStyle: {
        type: PropType<CallLogHistoryStyle>;
        default: () => CallLogHistoryStyle;
    };
    onError: {
        type: PropType<(error: CometChat.CometChatException) => void>;
    };
}, {
    callList: any;
    state: Ref<States>;
    SelectionMode: typeof SelectionMode;
    getListItemStyle: typeof getListItemStyle;
    getAvatarStyle: typeof getAvatarStyle;
    getCallStatusWithType: typeof getCallStatusWithType;
    getSubtitleStyle: typeof getSubtitleStyle;
    handleItemClick: (call: any) => void;
    theme: Ref<CometChatTheme>;
    getCallList: () => Promise<void>;
    loggedInUser: Ref<import("@cometchat/chat-sdk-javascript").User>;
    verifyCallUser: typeof verifyCallUser;
    getBackButtonStyle: typeof getBackButtonStyle;
    getButtonContainerStyle: typeof getButtonContainerStyle;
    handleBackClick: () => void;
    getContainerStyle: typeof getContainerStyle;
    getListStyle: typeof getListStyle;
    getCallDurationStyle: typeof getCallDurationStyle;
    getMessageBubbleDate: (item: any, i: number) => string;
    getCallDuration: (item: any) => string | false;
    getCallStatusStyle: typeof getCallStatusStyle;
    getTitleStyle: typeof getTitleStyle;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    callUser: {
        type: ObjectConstructor;
    };
    callGroup: {
        type: ObjectConstructor;
    };
    title: {
        type: StringConstructor;
        default: () => any;
    };
    emptyStateView: {
        type: PropType<ViewType>;
    };
    emptyStateText: {
        type: StringConstructor;
        default: () => any;
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
        type: PropType<(item: any) => ViewType>;
    };
    subtitleView: {
        type: PropType<(item: any) => ViewType>;
    };
    tailView: {
        type: PropType<(item: any) => ViewType>;
    };
    callLogRequestBuilder: {
        type: ObjectConstructor;
    };
    onItemClick: {
        type: PropType<(item: any) => void>;
    };
    backIconUrl: {
        type: StringConstructor;
        default: string;
    };
    onBackClick: {
        type: PropType<() => void>;
    };
    listItemStyle: {
        type: PropType<ListItemStyle>;
        default: () => ListItemStyle;
    };
    datePattern: {
        type: PropType<DatePatterns>;
        default: DatePatterns;
    };
    dateSeparatorPattern: {
        type: PropType<DatePatterns>;
        default: DatePatterns;
    };
    callLogHistoryStyle: {
        type: PropType<CallLogHistoryStyle>;
        default: () => CallLogHistoryStyle;
    };
    onError: {
        type: PropType<(error: CometChat.CometChatException) => void>;
    };
}>>, {
    title: string;
    errorStateText: string;
    emptyStateText: string;
    listItemStyle: ListItemStyle;
    loadingIconURL: string;
    datePattern: DatePatterns;
    backIconUrl: string;
    dateSeparatorPattern: DatePatterns;
    callLogHistoryStyle: CallLogHistoryStyle;
}, {}>;
export default _sfc_main;
