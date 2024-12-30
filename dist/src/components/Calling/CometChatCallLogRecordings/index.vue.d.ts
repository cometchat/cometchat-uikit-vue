import { PropType, Ref } from "vue";
import { getButtonContainerStyle, getBackButtonStyle, getTitleStyle, getListStyle, getListItemStyle, getSubtitleStyle, getCallDateStyle, getContainerStyle, getDownloadButtonStyle } from "./style";
import { CometChatTheme, DatePatterns, States } from "@cometchat/uikit-resources";
import { ListItemStyle } from "@cometchat/uikit-elements";
import { CallLogRecordingsStyle } from "@cometchat/uikit-shared";
declare const _sfc_main: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
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
    callLogRecordingsStyle: {
        type: PropType<CallLogRecordingsStyle>;
        default: () => CallLogRecordingsStyle;
    };
    downloadIconUrl: {
        type: StringConstructor;
        default: string;
    };
    hideDownloadButton: {
        type: BooleanConstructor;
        default: boolean;
    };
    onDownloadClick: {
        type: PropType<(item: any) => void>;
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
}>, {
    theme: Ref<CometChatTheme, CometChatTheme>;
    state: Ref<States, States>;
    handleBackClick: () => void;
    getButtonContainerStyle: typeof getButtonContainerStyle;
    getBackButtonStyle: typeof getBackButtonStyle;
    getTitleStyle: typeof getTitleStyle;
    getListStyle: typeof getListStyle;
    getListItemStyle: typeof getListItemStyle;
    handleItemClick: (item: any) => void;
    getSubtitleStyle: typeof getSubtitleStyle;
    getCallDateStyle: typeof getCallDateStyle;
    getRecordings: () => any;
    loggedInUser: any;
    getRecordingStartTime: (item: any) => any;
    getRecordingDuration: (item: any) => string;
    getContainerStyle: typeof getContainerStyle;
    handleDownloadClick: (item: any) => void;
    getDownloadButtonStyle: typeof getDownloadButtonStyle;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
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
    callLogRecordingsStyle: {
        type: PropType<CallLogRecordingsStyle>;
        default: () => CallLogRecordingsStyle;
    };
    downloadIconUrl: {
        type: StringConstructor;
        default: string;
    };
    hideDownloadButton: {
        type: BooleanConstructor;
        default: boolean;
    };
    onDownloadClick: {
        type: PropType<(item: any) => void>;
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
}>> & Readonly<{}>, {
    title: string;
    listItemStyle: ListItemStyle;
    datePattern: DatePatterns;
    backIconUrl: string;
    callLogRecordingsStyle: CallLogRecordingsStyle;
    downloadIconUrl: string;
    hideDownloadButton: boolean;
}, {}, undefined, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _sfc_main;
