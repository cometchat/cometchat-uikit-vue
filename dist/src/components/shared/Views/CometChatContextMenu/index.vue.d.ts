import { ContextMenuStyle } from "@cometchat/uikit-elements";
import { CometChatActionsIcon, CometChatActionsView, Placement } from "@cometchat/uikit-resources";
import { PropType } from "vue";
declare const _sfc_main: import("vue").DefineComponent<{
    data: {
        type: PropType<CometChatActionsIcon[] | CometChatActionsView[]>;
    };
    topMenuSize: {
        type: NumberConstructor;
    };
    moreIconURL: {
        type: StringConstructor;
    };
    moreIconHoverText: {
        type: StringConstructor;
    };
    ContextMenuStyle: {
        type: PropType<ContextMenuStyle>;
        default: ContextMenuStyle;
    };
    onOptionClicked: {
        type: any;
    };
    placement: {
        type: PropType<Placement>;
    };
}, {
    menuItemStyle: () => {
        background: string;
        padding: string;
    };
    popoverStyle: {
        width: string;
        height: string;
    };
    menuButtonStyle: (menuData: any, isSubMenu?: boolean) => {
        background: any;
        border: string;
        borderRadius: string;
        buttonIconTint: any;
        buttonTextFont: any;
        buttonTextColor: any;
        gap: string;
    };
    contextMenuStyle: () => any;
    topMenuStyle: () => any;
    subMenuStyle: (showSubMenu: boolean) => any;
    buttonStyle: {
        background: string;
        border: string;
        borderRadius: string;
    };
    handleMenuClick: () => boolean;
    showSubMenu: import("vue").Ref<boolean>;
    topMenu: any;
    subMenu: any;
    moreButtonStyle: {
        background: string;
        border: string;
        borderRadius: string;
        buttonIconTint: string;
    };
    getClosePopOverHandler: (index: number, isSubMenu?: boolean) => (_event: any) => void;
    topMenuPopOverRef: any;
    subMenuPopOverRef: any;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    data: {
        type: PropType<CometChatActionsIcon[] | CometChatActionsView[]>;
    };
    topMenuSize: {
        type: NumberConstructor;
    };
    moreIconURL: {
        type: StringConstructor;
    };
    moreIconHoverText: {
        type: StringConstructor;
    };
    ContextMenuStyle: {
        type: PropType<ContextMenuStyle>;
        default: ContextMenuStyle;
    };
    onOptionClicked: {
        type: any;
    };
    placement: {
        type: PropType<Placement>;
    };
}>>, {
    ContextMenuStyle: ContextMenuStyle;
    onOptionClicked: any;
}, {}>;
export default _sfc_main;
