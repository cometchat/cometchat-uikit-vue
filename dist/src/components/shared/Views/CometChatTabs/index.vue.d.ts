import { CometChatTabItem, TabAlignment, IconButtonAlignment } from "@cometchat/uikit-resources";
import { BaseStyle } from "@cometchat/uikit-shared";
import { PropType, Ref } from "vue";
declare const _sfc_main: import("vue").DefineComponent<{
    tabAlignment: {
        type: PropType<TabAlignment>;
    };
    tabsStyle: {
        type: PropType<BaseStyle>;
        default: BaseStyle;
    };
    tabs: {
        type: PropType<CometChatTabItem[]>;
    };
    disableDraggable: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    childViewRef: Ref<ViewType>;
    getTabsStyle: () => any;
    getTabsPlacement: () => any;
    IconButtonAlignment: typeof IconButtonAlignment;
    getButtonStyle: (tab: CometChatTabItem) => {
        background: string;
        buttonTextFont: string;
        buttonTextColor: string;
        buttonIconTint: string;
        height: string;
        width: string;
        border: string;
        borderRadius: string;
        gap: string;
        padding: string;
    };
    openViewOnCLick: (tabItem: CometChatTabItem) => void;
    getButtonDivStyle: (tab: any) => any;
    getTabsStyleFixed: () => any;
    getButtonStyleFixed: (tab: CometChatTabItem) => {
        background: string;
        buttonTextFont: string;
        buttonTextColor: string;
        buttonIconTint: string;
        height: string;
        width: string;
        border: string;
        borderRadius: string;
        gap: string;
        padding: string;
        "justify-content": string;
    };
    getKeepAliveTabs: () => any[];
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    tabAlignment: {
        type: PropType<TabAlignment>;
    };
    tabsStyle: {
        type: PropType<BaseStyle>;
        default: BaseStyle;
    };
    tabs: {
        type: PropType<CometChatTabItem[]>;
    };
    disableDraggable: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    tabsStyle: BaseStyle;
    disableDraggable: boolean;
}, {}>;
export default _sfc_main;
