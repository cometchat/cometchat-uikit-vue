import { AvatarStyle } from "@cometchat/uikit-elements";
import { PropType, Ref } from "vue";
import { verifyCallUser } from "../Utils/utils";
import { CometChatCallDetailsOption, CometChatCallDetailsTemplate, CometChatDetailsTemplate, CometChatTheme } from "@cometchat/uikit-resources";
import { getProfileContainerStyle, getBackButtonStyle, getButtonContainerStyle, getContainerStyle, getTitleStyle } from "./style";
import { CallLogDetailsStyle, CallLogHistoryConfiguration, CallLogParticipantsConfiguration, CallLogRecordingsConfiguration } from "@cometchat/uikit-shared";
declare const _sfc_main: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    call: {
        type: PropType<any>;
        required: true;
    };
    title: {
        type: StringConstructor;
        default: any;
    };
    backIconUrl: {
        type: StringConstructor;
        default: string;
    };
    avatarStyle: {
        type: PropType<AvatarStyle>;
        default: () => AvatarStyle;
    };
    onBackClick: {
        type: PropType<() => void>;
    };
    data: {
        type: PropType<(callLog: any, loggedInUser: CometChat.User, theme: CometChatTheme) => CometChatCallDetailsTemplate[]>;
    };
    callLogHistoryConfiguration: {
        type: PropType<CallLogHistoryConfiguration>;
        default: () => CallLogHistoryConfiguration;
    };
    callLogParticipantsConfiguration: {
        type: PropType<CallLogParticipantsConfiguration>;
        default: () => CallLogParticipantsConfiguration;
    };
    callLogRecordingsConfiguration: {
        type: PropType<CallLogRecordingsConfiguration>;
        default: () => CallLogRecordingsConfiguration;
    };
    callLogDetailsStyle: {
        type: PropType<CallLogDetailsStyle>;
        default: () => Record<string, any>;
    };
}>, {
    theme: Ref<CometChatTheme, CometChatTheme>;
    verifyCallUser: typeof verifyCallUser;
    loggedInUser: Ref<import("@cometchat/chat-sdk-javascript").User, import("@cometchat/chat-sdk-javascript").User>;
    getAvatarStyle: (theme: CometChatTheme, avatarStyle?: AvatarStyle) => AvatarStyle;
    getAvatarTitleStyle: (theme: CometChatTheme, style: CallLogDetailsStyle) => {
        color: string;
        font: string;
    };
    templates: Ref<CometChatDetailsTemplate[], CometChatDetailsTemplate[]>;
    getOptionsForTemplate: (template: CometChatDetailsTemplate) => CometChatCallDetailsOption[];
    getProfileContainerStyle: typeof getProfileContainerStyle;
    getBackButtonStyle: typeof getBackButtonStyle;
    getButtonContainerStyle: typeof getButtonContainerStyle;
    handleOptionClick: (option: CometChatCallDetailsOption) => void;
    showDetailsPage: import("vue").ComputedRef<boolean>;
    showParticipantsPage: import("vue").ComputedRef<boolean>;
    showRecordingsPage: import("vue").ComputedRef<boolean>;
    showCallHistoryPage: import("vue").ComputedRef<boolean>;
    handlePageOnBackClick: () => void;
    getCallUser: () => any;
    getCallGroup: () => any;
    getContainerStyle: typeof getContainerStyle;
    getTitleStyle: typeof getTitleStyle;
    localize: (str: string) => any;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    call: {
        type: PropType<any>;
        required: true;
    };
    title: {
        type: StringConstructor;
        default: any;
    };
    backIconUrl: {
        type: StringConstructor;
        default: string;
    };
    avatarStyle: {
        type: PropType<AvatarStyle>;
        default: () => AvatarStyle;
    };
    onBackClick: {
        type: PropType<() => void>;
    };
    data: {
        type: PropType<(callLog: any, loggedInUser: CometChat.User, theme: CometChatTheme) => CometChatCallDetailsTemplate[]>;
    };
    callLogHistoryConfiguration: {
        type: PropType<CallLogHistoryConfiguration>;
        default: () => CallLogHistoryConfiguration;
    };
    callLogParticipantsConfiguration: {
        type: PropType<CallLogParticipantsConfiguration>;
        default: () => CallLogParticipantsConfiguration;
    };
    callLogRecordingsConfiguration: {
        type: PropType<CallLogRecordingsConfiguration>;
        default: () => CallLogRecordingsConfiguration;
    };
    callLogDetailsStyle: {
        type: PropType<CallLogDetailsStyle>;
        default: () => Record<string, any>;
    };
}>> & Readonly<{}>, {
    title: string;
    avatarStyle: AvatarStyle;
    backIconUrl: string;
    callLogHistoryConfiguration: CallLogHistoryConfiguration;
    callLogParticipantsConfiguration: CallLogParticipantsConfiguration;
    callLogRecordingsConfiguration: CallLogRecordingsConfiguration;
    callLogDetailsStyle: CallLogDetailsStyle;
}, {}, undefined, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _sfc_main;
