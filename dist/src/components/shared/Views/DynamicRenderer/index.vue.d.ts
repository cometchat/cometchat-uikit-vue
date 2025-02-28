import { PropType } from "vue";
/**
 * DynamicRenderer component
 * @description Dynamically renders various components based on the provided `customView` object.
 */
declare const _sfc_main: import("vue").DefineComponent<{
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
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
}>>, {}, {}>;
export default _sfc_main;
