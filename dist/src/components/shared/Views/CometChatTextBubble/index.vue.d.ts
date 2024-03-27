import { TextBubbleStyle } from "@cometchat/uikit-elements";
import { CometChatTextFormatter } from "@cometchat/uikit-shared";
import { PropType } from "vue";
declare const _sfc_main: import("vue").DefineComponent<{
    text: {
        type: StringConstructor;
        default: any;
    };
    textStyle: {
        type: PropType<TextBubbleStyle>;
    };
    textFormatters: {
        type: PropType<CometChatTextFormatter[]>;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    text: {
        type: StringConstructor;
        default: any;
    };
    textStyle: {
        type: PropType<TextBubbleStyle>;
    };
    textFormatters: {
        type: PropType<CometChatTextFormatter[]>;
    };
}>>, {
    text: string;
}, {}>;
export default _sfc_main;
