import { FormBubbleStyle } from "@cometchat/uikit-shared";
import { FormMessage } from "@cometchat/uikit-resources";
import { PropType } from "vue";
declare const _sfc_main: import("vue").DefineComponent<{
    formBubbleStyle: {
        type: PropType<FormBubbleStyle>;
    };
    message: {
        type: PropType<FormMessage>;
    };
    submitClicked: {
        type: FunctionConstructor;
    };
    hasCustomCallback: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    formBubbleStyle: {
        type: PropType<FormBubbleStyle>;
    };
    message: {
        type: PropType<FormMessage>;
    };
    submitClicked: {
        type: FunctionConstructor;
    };
    hasCustomCallback: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    hasCustomCallback: boolean;
}, {}>;
export default _sfc_main;
