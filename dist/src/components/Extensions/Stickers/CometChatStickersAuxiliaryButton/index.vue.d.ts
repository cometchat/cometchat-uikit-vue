import { PropType, Ref } from "vue";
import { Placement } from "@cometchat/uikit-resources";
declare const _sfc_main: import("vue").DefineComponent<{
    openIconURL: {
        type: StringConstructor;
    };
    closeIconURL: {
        type: StringConstructor;
    };
    placement: {
        type: PropType<Placement>;
    };
    emojiButtonStyle: {
        type: any;
    };
    popoverStyle: {
        type: any;
    };
    stickerKeyboardStyle: {
        type: any;
    };
    stickerKeyboardListeners: {
        type: any;
    };
    listeners: {
        type: any;
    };
    auxiliaryButtonRefs: {
        type: any;
    };
    componentIndex: {
        type: NumberConstructor;
    };
}, {
    toggleIcon: (event: any) => void;
    showOpenIconRef: Ref<boolean>;
    buttonRef: any;
    localize: (str: string) => any;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "component-event"[], "component-event", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    openIconURL: {
        type: StringConstructor;
    };
    closeIconURL: {
        type: StringConstructor;
    };
    placement: {
        type: PropType<Placement>;
    };
    emojiButtonStyle: {
        type: any;
    };
    popoverStyle: {
        type: any;
    };
    stickerKeyboardStyle: {
        type: any;
    };
    stickerKeyboardListeners: {
        type: any;
    };
    listeners: {
        type: any;
    };
    auxiliaryButtonRefs: {
        type: any;
    };
    componentIndex: {
        type: NumberConstructor;
    };
}>> & {
    "onComponent-event"?: (...args: any[]) => any;
}, {
    emojiButtonStyle: any;
    stickerKeyboardStyle: any;
    popoverStyle: any;
    listeners: any;
    stickerKeyboardListeners: any;
    auxiliaryButtonRefs: any;
}, {}>;
export default _sfc_main;
