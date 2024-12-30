import { PropType, Ref } from 'vue';
import { getContainerStyle, getLabelStyle, getEmptyContainerStyle } from './style';
import { CometChatTheme } from '@cometchat/uikit-resources';
import { CallLogDetailsConfiguration, CallLogsConfiguration, WithDetailsStyle } from '@cometchat/uikit-shared';
declare const _sfc_main: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    isMobileView: {
        type: BooleanConstructor;
        default: boolean;
    };
    messageText: {
        type: StringConstructor;
        default: () => any;
    };
    withDetailsStyle: {
        type: PropType<WithDetailsStyle>;
        default: () => WithDetailsStyle;
    };
    callLogDetailsConfiguration: {
        type: PropType<CallLogDetailsConfiguration>;
        default: () => CallLogDetailsConfiguration;
    };
    callLogConfiguration: {
        type: PropType<CallLogsConfiguration>;
        default: () => CallLogsConfiguration;
    };
}>, {
    activeCall: Ref<any, any>;
    handleInfoClick: (call: any) => void;
    getCallLogStyle: () => {
        width: string;
        display: string;
        minWidth?: undefined;
    } | {
        width: string;
        minWidth: string;
        display?: undefined;
    };
    getCallDetailStyle: () => {
        width: string;
        display: string;
    } | {
        width: string;
        display?: undefined;
    };
    getContainerStyle: typeof getContainerStyle;
    getLabelStyle: typeof getLabelStyle;
    getEmptyContainerStyle: typeof getEmptyContainerStyle;
    theme: Ref<CometChatTheme, CometChatTheme>;
    localize: (str: string) => any;
    computedCallLogDetailsConfiguration: import("vue").ComputedRef<CallLogDetailsConfiguration>;
    computedCallLogConfiguration: import("vue").ComputedRef<CallLogsConfiguration>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    isMobileView: {
        type: BooleanConstructor;
        default: boolean;
    };
    messageText: {
        type: StringConstructor;
        default: () => any;
    };
    withDetailsStyle: {
        type: PropType<WithDetailsStyle>;
        default: () => WithDetailsStyle;
    };
    callLogDetailsConfiguration: {
        type: PropType<CallLogDetailsConfiguration>;
        default: () => CallLogDetailsConfiguration;
    };
    callLogConfiguration: {
        type: PropType<CallLogsConfiguration>;
        default: () => CallLogsConfiguration;
    };
}>> & Readonly<{}>, {
    isMobileView: boolean;
    messageText: string;
    withDetailsStyle: WithDetailsStyle;
    callLogDetailsConfiguration: CallLogDetailsConfiguration;
    callLogConfiguration: CallLogsConfiguration;
}, {}, undefined, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _sfc_main;
