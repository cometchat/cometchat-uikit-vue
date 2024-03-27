import { PropType } from "vue";
import { ListStyle } from "@cometchat/uikit-shared";
import { States, TitleAlignment } from "@cometchat/uikit-resources";
import { CometChat } from "@cometchat/chat-sdk-javascript";
declare const _sfc_main: import("vue").DefineComponent<{
    title: {
        type: StringConstructor;
        default: string;
    };
    titleAlignment: {
        type: PropType<TitleAlignment>;
        default: () => TitleAlignment;
    };
    hideSearch: {
        type: BooleanConstructor;
        default: boolean;
    };
    searchText: {
        type: StringConstructor;
        default: string;
    };
    onSearch: {
        type: PropType<(newSearchText: string) => void>;
        default: () => void;
    };
    searchIconURL: {
        type: StringConstructor;
        default: string;
    };
    searchPlaceholderText: {
        type: StringConstructor;
        default: string;
    };
    list: {
        type: PropType<any[]>;
        default: () => any[];
    };
    showSectionHeader: {
        type: BooleanConstructor;
        default: boolean;
    };
    sectionHeaderKey: {
        type: StringConstructor;
    };
    listItemKey: {
        type: any;
        required: true;
    };
    onScrolledToBottom: {
        type: () => any;
    };
    onScrolledToTop: {
        type: () => any;
    };
    state: {
        type: PropType<States>;
        default: () => States;
    };
    loadingIconURL: {
        type: StringConstructor;
        default: string;
    };
    emptyStateText: {
        type: StringConstructor;
        default: string;
    };
    hideError: {
        type: BooleanConstructor;
        default: boolean;
    };
    scrollToBottom: {
        type: BooleanConstructor;
        default: boolean;
    };
    errorStateView: {
        type: PropType<ViewType>;
    };
    loadingStateView: {
        type: PropType<ViewType>;
    };
    errorStateText: {
        type: StringConstructor;
        default: string;
    };
    onError: {
        type: PropType<(error: CometChat.CometChatException) => void>;
        default: (error: CometChat.CometChatException) => void;
    };
    emptyStateView: {
        type: PropType<ViewType>;
    };
    listStyle: {
        type: PropType<ListStyle>;
        default: () => ListStyle;
    };
}, {
    SearchIcon: string;
    LoadingIcon: string;
    getKeyValue: <T>(key: any, item: any) => string;
    States: typeof States;
    currentSectionHeader: string;
    scrollPos: import("vue").Ref<HTMLElement>;
    listWrapperStyle: () => any;
    headerTitle: () => any;
    searchEvent: (...args: any[]) => void;
    messageContainerStyle: () => any;
    errorStyle: () => {
        textFont: string;
        textColor: string;
    };
    emptyStyle: () => {
        textFont: string;
        textColor: string;
    };
    headerStyle: () => {
        flexShrink: string;
        padding: string;
    };
    listStyles: () => any;
    iconStyle: any;
    sectionHeaderStyle: () => {
        font: string;
        color: string;
        padding: string;
    };
    searchStyle: import("vue").Ref<{
        searchTextFont?: string;
        searchTextColor?: string;
        placeholderTextFont?: string;
        placeholderTextColor?: string;
        searchIconTint?: string;
        boxShadow?: string;
        height?: string;
        width?: string;
        border?: string;
        borderRadius?: string;
        background?: string;
    }>;
    listScrollRef: any;
    topDivRef: any;
    bottomDivRef: any;
    SectionHeaderUndefined: () => void;
    setSearchStyles: () => {
        border: string;
        borderRadius: string;
        width: string;
        height: string;
        background: string;
        searchTextFont: string;
        searchTextColor: string;
        placeholderTextFont: string;
        placeholderTextColor: string;
        searchIconTint: string;
    };
    handleScroll: () => void;
    bottomDivStyle: import("vue").ComputedRef<{
        border: string;
    } | {
        border?: undefined;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: StringConstructor;
        default: string;
    };
    titleAlignment: {
        type: PropType<TitleAlignment>;
        default: () => TitleAlignment;
    };
    hideSearch: {
        type: BooleanConstructor;
        default: boolean;
    };
    searchText: {
        type: StringConstructor;
        default: string;
    };
    onSearch: {
        type: PropType<(newSearchText: string) => void>;
        default: () => void;
    };
    searchIconURL: {
        type: StringConstructor;
        default: string;
    };
    searchPlaceholderText: {
        type: StringConstructor;
        default: string;
    };
    list: {
        type: PropType<any[]>;
        default: () => any[];
    };
    showSectionHeader: {
        type: BooleanConstructor;
        default: boolean;
    };
    sectionHeaderKey: {
        type: StringConstructor;
    };
    listItemKey: {
        type: any;
        required: true;
    };
    onScrolledToBottom: {
        type: () => any;
    };
    onScrolledToTop: {
        type: () => any;
    };
    state: {
        type: PropType<States>;
        default: () => States;
    };
    loadingIconURL: {
        type: StringConstructor;
        default: string;
    };
    emptyStateText: {
        type: StringConstructor;
        default: string;
    };
    hideError: {
        type: BooleanConstructor;
        default: boolean;
    };
    scrollToBottom: {
        type: BooleanConstructor;
        default: boolean;
    };
    errorStateView: {
        type: PropType<ViewType>;
    };
    loadingStateView: {
        type: PropType<ViewType>;
    };
    errorStateText: {
        type: StringConstructor;
        default: string;
    };
    onError: {
        type: PropType<(error: CometChat.CometChatException) => void>;
        default: (error: CometChat.CometChatException) => void;
    };
    emptyStateView: {
        type: PropType<ViewType>;
    };
    listStyle: {
        type: PropType<ListStyle>;
        default: () => ListStyle;
    };
}>>, {
    title: string;
    titleAlignment: TitleAlignment;
    showSectionHeader: boolean;
    searchIconURL: string;
    hideSearch: boolean;
    hideError: boolean;
    errorStateText: string;
    emptyStateText: string;
    onError: (error: CometChat.CometChatException) => void;
    loadingIconURL: string;
    onSearch: (newSearchText: string) => void;
    state: States;
    listStyle: ListStyle;
    searchPlaceholderText: string;
    searchText: string;
    list: any[];
    scrollToBottom: boolean;
}, {}>;
export default _sfc_main;
