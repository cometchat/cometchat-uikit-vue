import { CometChatTabItem, TabAlignment, IconButtonAlignment } from "@cometchat/uikit-resources";
import { BaseStyle } from "@cometchat/uikit-shared";
import { PropType, Ref } from "vue";
declare const _sfc_main: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
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
}>, {
    childViewRef: Ref<ViewType, ViewType>;
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
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
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
}>> & Readonly<{}>, {
    tabsStyle: BaseStyle;
    disableDraggable: boolean;
}, {}, undefined, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _sfc_main;
