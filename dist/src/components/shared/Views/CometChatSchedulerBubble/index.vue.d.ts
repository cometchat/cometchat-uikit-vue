import { SchedulerBubbleStyle } from "@cometchat/uikit-shared";
import { SchedulerMessage } from "@cometchat/uikit-resources";
import { PropType } from "vue";
declare const _sfc_main: import("vue").DefineComponent<{
    schedulerMessage: {
        type: PropType<SchedulerMessage>;
    };
    loggedInUser: {
        type: PropType<import("@cometchat/chat-sdk-javascript").User>;
    };
    goalCompletionText: {
        type: StringConstructor;
        default: any;
    };
    onScheduleClick: {
        type: FunctionConstructor;
    };
    backButtonIconURL: {
        type: StringConstructor;
        default: any;
    };
    loadingIconURL: {
        type: StringConstructor;
        default: any;
    };
    clockIconURL: {
        type: StringConstructor;
        default: any;
    };
    calendarIconURL: {
        type: StringConstructor;
        default: any;
    };
    timezoneIconURL: {
        type: StringConstructor;
        default: any;
    };
    emptySlotIconURL: {
        type: StringConstructor;
        default: any;
    };
    schedulerBubbleStyle: {
        type: PropType<SchedulerBubbleStyle>;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    schedulerMessage: {
        type: PropType<SchedulerMessage>;
    };
    loggedInUser: {
        type: PropType<import("@cometchat/chat-sdk-javascript").User>;
    };
    goalCompletionText: {
        type: StringConstructor;
        default: any;
    };
    onScheduleClick: {
        type: FunctionConstructor;
    };
    backButtonIconURL: {
        type: StringConstructor;
        default: any;
    };
    loadingIconURL: {
        type: StringConstructor;
        default: any;
    };
    clockIconURL: {
        type: StringConstructor;
        default: any;
    };
    calendarIconURL: {
        type: StringConstructor;
        default: any;
    };
    timezoneIconURL: {
        type: StringConstructor;
        default: any;
    };
    emptySlotIconURL: {
        type: StringConstructor;
        default: any;
    };
    schedulerBubbleStyle: {
        type: PropType<SchedulerBubbleStyle>;
    };
}>>, {
    backButtonIconURL: string;
    loadingIconURL: string;
    goalCompletionText: string;
    clockIconURL: string;
    calendarIconURL: string;
    timezoneIconURL: string;
    emptySlotIconURL: string;
}, {}>;
export default _sfc_main;
