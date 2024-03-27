import { PropType } from "vue";
import { CometChatTextFormatter, LinkPreviewStyle } from "@cometchat/uikit-shared";
import { TextBubbleStyle } from "@cometchat/uikit-elements";
declare const _sfc_main: import("vue").DefineComponent<{
    title: {
        type: StringConstructor;
    };
    description: {
        type: StringConstructor;
    };
    URL: {
        type: StringConstructor;
    };
    image: {
        type: StringConstructor;
    };
    favIconURL: {
        type: StringConstructor;
    };
    linkPreviewStyle: {
        type: PropType<LinkPreviewStyle>;
    };
    textStyle: {
        type: PropType<TextBubbleStyle>;
    };
    text: {
        type: StringConstructor;
    };
    listeners: {
        type: any;
    };
    textFormatters: {
        type: PropType<CometChatTextFormatter[]>;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: StringConstructor;
    };
    description: {
        type: StringConstructor;
    };
    URL: {
        type: StringConstructor;
    };
    image: {
        type: StringConstructor;
    };
    favIconURL: {
        type: StringConstructor;
    };
    linkPreviewStyle: {
        type: PropType<LinkPreviewStyle>;
    };
    textStyle: {
        type: PropType<TextBubbleStyle>;
    };
    text: {
        type: StringConstructor;
    };
    listeners: {
        type: any;
    };
    textFormatters: {
        type: PropType<CometChatTextFormatter[]>;
    };
}>>, {
    listeners: any;
}, {}>;
export default _sfc_main;
