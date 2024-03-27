import { FullScreenViewerStyle } from "@cometchat/uikit-elements";
declare const _sfc_main: import("vue").DefineComponent<{
    src: {
        type: StringConstructor;
        default: any;
    };
    placeholderImage: {
        type: any;
    };
    imageStyle: {
        type: any;
    };
    message: {
        type: any;
    };
}, {
    openImageInFullScreen: (event: any) => void;
    openFullscreenView: import("vue").Ref<boolean>;
    imageurlToOpen: import("vue").Ref<string>;
    Close2xIcon: string;
    fullScreenViewerStyle: FullScreenViewerStyle;
    closeImageInFullScreen: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    src: {
        type: StringConstructor;
        default: any;
    };
    placeholderImage: {
        type: any;
    };
    imageStyle: {
        type: any;
    };
    message: {
        type: any;
    };
}>>, {
    message: any;
    src: string;
    placeholderImage: any;
    imageStyle: any;
}, {}>;
export default _sfc_main;
