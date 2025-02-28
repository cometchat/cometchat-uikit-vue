import { PropType, Ref } from "vue";
import { getButtonContainerStyle, getBackButtonStyle, getTitleStyle, getListStyle, getAvatarStyle, getListItemStyle, getSubtitleStyle, getCallDateStyle, getContainerStyle } from "./style";
import { CometChatTheme, DatePatterns, States } from "@cometchat/uikit-resources";
import { AvatarStyle, ListItemStyle } from "@cometchat/uikit-elements";
import { CallLogParticipantsStyle } from "@cometchat/uikit-shared";
declare const _sfc_main: import("vue").DefineComponent<{
    title: {
        type: StringConstructor;
        default: () => any;
    };
    call: {
        type: PropType<any>;
        required: true;
    };
    backIconUrl: {
        type: StringConstructor;
        default: string;
    };
    onBackClick: {
        type: PropType<() => void>;
    };
    avatarStyle: {
        type: PropType<AvatarStyle>;
        default: () => AvatarStyle;
    };
    onItemClick: {
        type: PropType<(item: any) => void>;
    };
    datePattern: {
        type: PropType<DatePatterns>;
        default: DatePatterns;
    };
    listItemStyle: {
        type: PropType<ListItemStyle>;
        default: () => ListItemStyle;
    };
    callLogParticipantsStyle: {
        type: PropType<CallLogParticipantsStyle>;
        default: () => CallLogParticipantsStyle;
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
}, {
    theme: Ref<CometChatTheme>;
    States: typeof States;
    handleBackClick: () => void;
    getButtonContainerStyle: typeof getButtonContainerStyle;
    getBackButtonStyle: typeof getBackButtonStyle;
    getTitleStyle: typeof getTitleStyle;
    getListStyle: typeof getListStyle;
    getAvatarStyle: typeof getAvatarStyle;
    getListItemStyle: typeof getListItemStyle;
    handleItemClick: (item: any) => void;
    getSubtitleStyle: typeof getSubtitleStyle;
    getCallDateStyle: typeof getCallDateStyle;
    getCallParticipants: () => any;
    loggedInUser: any;
    getCallInitiatedAt: () => any;
    getDurationOfCall: (item: any) => string;
    getContainerStyle: typeof getContainerStyle;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: StringConstructor;
        default: () => any;
    };
    call: {
        type: PropType<any>;
        required: true;
    };
    backIconUrl: {
        type: StringConstructor;
        default: string;
    };
    onBackClick: {
        type: PropType<() => void>;
    };
    avatarStyle: {
        type: PropType<AvatarStyle>;
        default: () => AvatarStyle;
    };
    onItemClick: {
        type: PropType<(item: any) => void>;
    };
    datePattern: {
        type: PropType<DatePatterns>;
        default: DatePatterns;
    };
    listItemStyle: {
        type: PropType<ListItemStyle>;
        default: () => ListItemStyle;
    };
    callLogParticipantsStyle: {
        type: PropType<CallLogParticipantsStyle>;
        default: () => CallLogParticipantsStyle;
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
}>>, {
    title: string;
    avatarStyle: AvatarStyle;
    listItemStyle: ListItemStyle;
    datePattern: DatePatterns;
    backIconUrl: string;
    callLogParticipantsStyle: CallLogParticipantsStyle;
}, {}>;
export default _sfc_main;
