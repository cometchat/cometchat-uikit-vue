import { PropType } from "vue";
/**
 * DynamicRenderer component
 * @description Dynamically renders various components based on the provided `customView` object.
 */
declare const _sfc_main: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    /**
     * The customView prop is used to specify the type of custom view to be rendered.
     *
     * @type {ViewType}
     * @required
     */
    customView: {
        type: PropType<ViewType>;
        required: true;
    };
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * The customView prop is used to specify the type of custom view to be rendered.
     *
     * @type {ViewType}
     * @required
     */
    customView: {
        type: PropType<ViewType>;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _sfc_main;
