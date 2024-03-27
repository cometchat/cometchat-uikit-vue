import { CometChat } from "@cometchat/chat-sdk-javascript";
import { ConversationUtils, GroupMemberUtils, BannedMembersStyle } from "@cometchat/uikit-shared";
import { AvatarStyle, ListItemStyle } from "@cometchat/uikit-elements";
import { TitleAlignment, States, CometChatOption, SelectionMode } from "@cometchat/uikit-resources";
import { Ref, PropType } from "vue";
declare const _sfc_main: import("vue").DefineComponent<{
    title: {
        type: StringConstructor;
        default: () => any;
    };
    titleAlignment: {
        type: PropType<TitleAlignment>;
        default: () => TitleAlignment;
    };
    searchPlaceholder: {
        type: StringConstructor;
        default: () => any;
    };
    subtitleView: {
        type: PropType<(bannedMember: CometChat.GroupMember) => ViewType>;
    };
    listItemView: {
        type: PropType<(bannedMember: CometChat.GroupMember) => ViewType>;
    };
    menus: {
        type: PropType<ViewType>;
    };
    options: {
        type: PropType<(bannedMember: CometChat.GroupMember) => CometChatOption[]>;
    };
    bannedMembersRequestBuilder: {
        type: PropType<import("@cometchat/chat-sdk-javascript").BannedMembersRequestBuilder>;
    };
    searchRequestBuilder: {
        type: PropType<import("@cometchat/chat-sdk-javascript").BannedMembersRequestBuilder>;
    };
    disableUsersPresence: {
        type: BooleanConstructor;
        default: boolean;
    };
    group: {
        type: PropType<import("@cometchat/chat-sdk-javascript").Group>;
        required: true;
    };
    hideSeparator: {
        type: BooleanConstructor;
        default: boolean;
    };
    showBackButton: {
        type: BooleanConstructor;
        default: boolean;
    };
    selectionMode: {
        type: PropType<SelectionMode>;
        default: () => SelectionMode;
    };
    onSelect: {
        type: PropType<(bannedMember: CometChat.GroupMember, selected: boolean) => void>;
    };
    searchIconURL: {
        type: StringConstructor;
        default: string;
    };
    backButtonIconURL: {
        type: StringConstructor;
        default: string;
    };
    closeButtonIconURL: {
        type: StringConstructor;
        default: string;
    };
    unbanIconURL: {
        type: StringConstructor;
        default: string;
    };
    hideSearch: {
        type: BooleanConstructor;
        default: boolean;
    };
    hideError: {
        type: BooleanConstructor;
        default: boolean;
    };
    showSectionHeader: {
        type: BooleanConstructor;
        default: boolean;
    };
    emptyStateView: {
        type: PropType<ViewType>;
    };
    errorStateText: {
        type: StringConstructor;
        default: () => any;
    };
    emptyStateText: {
        type: StringConstructor;
        default: () => any;
    };
    onItemClick: {
        type: PropType<(bannedMember: CometChat.GroupMember) => void>;
    };
    onError: {
        type: PropType<(error: CometChat.CometChatException) => void>;
        default: (error: CometChat.CometChatException) => void;
    };
    onBack: {
        type: PropType<() => void>;
    };
    onClose: {
        type: PropType<() => void>;
    };
    avatarStyle: {
        type: PropType<AvatarStyle>;
        default: () => AvatarStyle;
    };
    bannedMembersStyle: {
        type: PropType<BannedMembersStyle>;
        default: () => BannedMembersStyle;
    };
    statusIndicatorStyle: {
        type: any;
    };
    listItemStyle: {
        type: PropType<ListItemStyle>;
        default: () => ListItemStyle;
    };
    loadingIconURL: {
        type: StringConstructor;
        default: string;
    };
    loadingStateView: {
        type: PropType<ViewType>;
    };
    errorStateView: {
        type: PropType<ViewType>;
    };
}, {
    BannedMembers: Ref<import("@cometchat/chat-sdk-javascript").GroupMember[]>;
    wrapperStyle: () => {
        height: string;
        width: string;
        background: string;
        border: string;
        borderRadius: string;
        display: string;
        boxShadow: string;
        position: string;
    };
    membersStyle: () => any;
    ConversationUtils: typeof ConversationUtils;
    GroupMemberUtils: typeof GroupMemberUtils;
    closeButtonStyle: () => {
        height: string;
        width: string;
        border: string;
        borderRadius: string;
        background: string;
        position: string;
        buttonIconTint: string;
    };
    closeClicked: () => void;
    backClicked: () => void;
    memberScope: Ref<string[]>;
    SelectionMode: typeof SelectionMode;
    backButtonStyle: () => {
        height: string;
        width: string;
        border: string;
        borderRadius: string;
        background: string;
        position: string;
        buttonIconTint: string;
    };
    mylistItemStyle: Ref<{
        activeBackground?: string;
        hoverBackground?: string;
        separatorColor?: string;
        titleFont?: string;
        titleColor?: string;
        padding?: string;
        height?: string;
        width?: string;
        border?: string;
        borderRadius?: string;
        background?: string;
    }>;
    myavatarStyle: Ref<{
        borderRadius?: string;
        width?: string;
        height?: string;
        border?: string;
        nameTextColor?: string;
        backgroundSize?: string;
        nameTextFont?: string;
        outerViewBorderWidth?: string;
        outerViewBorderSpacing?: string;
        outerViewBorderRadius?: string;
        outerViewBorderColor?: string;
        backgroundColor?: string;
    }>;
    menuListStyle: any;
    mystatusIndicatorStyle: any;
    getStatusIndicatorColor: (member: CometChat.GroupMember) => string;
    unbanIconStyle: any;
    onSearch: (key: string) => void;
    state: Ref<States>;
    unBanMember: (member: CometChat.GroupMember) => void;
    States: typeof States;
    listStyle: Ref<{
        titleTextFont?: string;
        titleTextColor?: string;
        emptyStateTextFont?: string;
        emptyStateTextColor?: string;
        errorStateTextFont?: string;
        errorStateTextColor?: string;
        loadingIconTint?: string;
        separatorColor?: string;
        boxShadow?: string;
        searchIconTint?: string;
        searchBorder?: string;
        searchBorderRadius?: string;
        searchBackground?: string;
        searchPlaceholderTextFont?: string;
        searchPlaceholderTextColor?: string;
        searchTextFont?: string;
        searchTextColor?: string;
        sectionHeaderTextFont?: string;
        sectionHeaderTextColor?: string;
        height?: string;
        width?: string;
        border?: string;
        borderRadius?: string;
        background?: string;
    }>;
    searchKeyword: Ref<string>;
    fetchNextBannedMembers: () => Promise<void>;
    handleSelection: (event: CustomEvent, bannedMember: CometChat.GroupMember) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: StringConstructor;
        default: () => any;
    };
    titleAlignment: {
        type: PropType<TitleAlignment>;
        default: () => TitleAlignment;
    };
    searchPlaceholder: {
        type: StringConstructor;
        default: () => any;
    };
    subtitleView: {
        type: PropType<(bannedMember: CometChat.GroupMember) => ViewType>;
    };
    listItemView: {
        type: PropType<(bannedMember: CometChat.GroupMember) => ViewType>;
    };
    menus: {
        type: PropType<ViewType>;
    };
    options: {
        type: PropType<(bannedMember: CometChat.GroupMember) => CometChatOption[]>;
    };
    bannedMembersRequestBuilder: {
        type: PropType<import("@cometchat/chat-sdk-javascript").BannedMembersRequestBuilder>;
    };
    searchRequestBuilder: {
        type: PropType<import("@cometchat/chat-sdk-javascript").BannedMembersRequestBuilder>;
    };
    disableUsersPresence: {
        type: BooleanConstructor;
        default: boolean;
    };
    group: {
        type: PropType<import("@cometchat/chat-sdk-javascript").Group>;
        required: true;
    };
    hideSeparator: {
        type: BooleanConstructor;
        default: boolean;
    };
    showBackButton: {
        type: BooleanConstructor;
        default: boolean;
    };
    selectionMode: {
        type: PropType<SelectionMode>;
        default: () => SelectionMode;
    };
    onSelect: {
        type: PropType<(bannedMember: CometChat.GroupMember, selected: boolean) => void>;
    };
    searchIconURL: {
        type: StringConstructor;
        default: string;
    };
    backButtonIconURL: {
        type: StringConstructor;
        default: string;
    };
    closeButtonIconURL: {
        type: StringConstructor;
        default: string;
    };
    unbanIconURL: {
        type: StringConstructor;
        default: string;
    };
    hideSearch: {
        type: BooleanConstructor;
        default: boolean;
    };
    hideError: {
        type: BooleanConstructor;
        default: boolean;
    };
    showSectionHeader: {
        type: BooleanConstructor;
        default: boolean;
    };
    emptyStateView: {
        type: PropType<ViewType>;
    };
    errorStateText: {
        type: StringConstructor;
        default: () => any;
    };
    emptyStateText: {
        type: StringConstructor;
        default: () => any;
    };
    onItemClick: {
        type: PropType<(bannedMember: CometChat.GroupMember) => void>;
    };
    onError: {
        type: PropType<(error: CometChat.CometChatException) => void>;
        default: (error: CometChat.CometChatException) => void;
    };
    onBack: {
        type: PropType<() => void>;
    };
    onClose: {
        type: PropType<() => void>;
    };
    avatarStyle: {
        type: PropType<AvatarStyle>;
        default: () => AvatarStyle;
    };
    bannedMembersStyle: {
        type: PropType<BannedMembersStyle>;
        default: () => BannedMembersStyle;
    };
    statusIndicatorStyle: {
        type: any;
    };
    listItemStyle: {
        type: PropType<ListItemStyle>;
        default: () => ListItemStyle;
    };
    loadingIconURL: {
        type: StringConstructor;
        default: string;
    };
    loadingStateView: {
        type: PropType<ViewType>;
    };
    errorStateView: {
        type: PropType<ViewType>;
    };
}>>, {
    title: string;
    titleAlignment: TitleAlignment;
    searchPlaceholder: string;
    disableUsersPresence: boolean;
    showSectionHeader: boolean;
    hideSeparator: boolean;
    showBackButton: boolean;
    selectionMode: SelectionMode;
    searchIconURL: string;
    backButtonIconURL: string;
    closeButtonIconURL: string;
    hideSearch: boolean;
    hideError: boolean;
    errorStateText: string;
    emptyStateText: string;
    onError: (error: CometChat.CometChatException) => void;
    avatarStyle: AvatarStyle;
    statusIndicatorStyle: any;
    listItemStyle: ListItemStyle;
    loadingIconURL: string;
    unbanIconURL: string;
    bannedMembersStyle: BannedMembersStyle;
}, {}>;
export default _sfc_main;
