import { CometChatTextFormatter, MessageTranslationStyle } from "@cometchat/uikit-shared";
import { MessageBubbleAlignment } from "@cometchat/uikit-resources";
import { PropType } from "vue";
declare const _sfc_main: import("vue").DefineComponent<{
    translatedText: {
        type: StringConstructor;
    };
    alignment: {
        type: PropType<MessageBubbleAlignment>;
    };
    messageTranslationStyle: {
        type: typeof MessageTranslationStyle;
    };
    textStyle: {
        type: any;
    };
    text: {
        type: StringConstructor;
    };
    textFormatters: {
        type: PropType<CometChatTextFormatter[]>;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    translatedText: {
        type: StringConstructor;
    };
    alignment: {
        type: PropType<MessageBubbleAlignment>;
    };
    messageTranslationStyle: {
        type: typeof MessageTranslationStyle;
    };
    textStyle: {
        type: any;
    };
    text: {
        type: StringConstructor;
    };
    textFormatters: {
        type: PropType<CometChatTextFormatter[]>;
    };
}>>, {
    textStyle: any;
}, {}>;
export default _sfc_main;
