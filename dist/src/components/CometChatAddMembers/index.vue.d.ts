import { CometChat } from "@cometchat/chat-sdk-javascript";
import { UsersStyle, ConversationUtils, GroupMemberUtils, AddMembersStyle } from "@cometchat/uikit-shared";
import { AvatarStyle, ListItemStyle } from "@cometchat/uikit-elements";
import { TitleAlignment, CometChatOption, SelectionMode } from "@cometchat/uikit-resources";
import { PropType } from "vue";
declare const _sfc_main: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    title: {
        type: StringConstructor;
        default: () => any;
    };
    buttonText: {
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
    sectionHeaderField: {
        type: StringConstructor;
        default: string;
    };
    subtitleView: {
        type: PropType<(user: CometChat.User) => ViewType>;
    };
    listItemView: {
        type: PropType<(user: CometChat.User) => ViewType>;
    };
    menus: {
        type: PropType<ViewType>;
    };
    onAddMembersButtonClick: {
        type: FunctionConstructor;
    };
    options: {
        type: PropType<(user: CometChat.User) => CometChatOption[]>;
    };
    usersRequestBuilder: {
        type: PropType<import("@cometchat/chat-sdk-javascript").UsersRequestBuilder>;
    };
    searchRequestBuilder: {
        type: PropType<import("@cometchat/chat-sdk-javascript").UsersRequestBuilder>;
    };
    disableUsersPresence: {
        type: BooleanConstructor;
        default: boolean;
    };
    group: {
        type: PropType<import("@cometchat/chat-sdk-javascript").Group>;
        required: true;
    };
    showSectionHeader: {
        type: BooleanConstructor;
        default: boolean;
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
        type: PropType<(user: CometChat.User, selected: boolean) => void>;
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
    hideSearch: {
        type: BooleanConstructor;
        default: boolean;
    };
    hideError: {
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
    addMembersStyle: {
        type: PropType<AddMembersStyle>;
        default: () => AddMembersStyle;
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
}>, {
    backClicked: () => void;
    closeClicked: () => void;
    backButtonStyle: () => {
        height: string;
        width: string;
        borderRadius: string;
        border: string;
        background: string;
        buttonIconTint: string;
    };
    closeButtonStyle: () => {
        height: string;
        width: string;
        border: string;
        borderRadius: string;
        background: string;
        buttonIconTint: string;
    };
    usersStyle: UsersStyle;
    isDisabled: import("vue").ComputedRef<boolean>;
    ConversationUtils: typeof ConversationUtils;
    GroupMemberUtils: typeof GroupMemberUtils;
    SelectionMode: typeof SelectionMode;
    mylistItemStyle: any;
    myavatarStyle: any;
    mystatusIndicatorStyle: any;
    addMembersStyles: () => any;
    addMemberButtonStyle: any;
    addMembersToGroup: () => void;
    addRemoveUsers: (user: CometChat.User, selected: boolean) => void;
    myaddMembersStyle: any;
    wrapperStyle: () => any;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: StringConstructor;
        default: () => any;
    };
    buttonText: {
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
    sectionHeaderField: {
        type: StringConstructor;
        default: string;
    };
    subtitleView: {
        type: PropType<(user: CometChat.User) => ViewType>;
    };
    listItemView: {
        type: PropType<(user: CometChat.User) => ViewType>;
    };
    menus: {
        type: PropType<ViewType>;
    };
    onAddMembersButtonClick: {
        type: FunctionConstructor;
    };
    options: {
        type: PropType<(user: CometChat.User) => CometChatOption[]>;
    };
    usersRequestBuilder: {
        type: PropType<import("@cometchat/chat-sdk-javascript").UsersRequestBuilder>;
    };
    searchRequestBuilder: {
        type: PropType<import("@cometchat/chat-sdk-javascript").UsersRequestBuilder>;
    };
    disableUsersPresence: {
        type: BooleanConstructor;
        default: boolean;
    };
    group: {
        type: PropType<import("@cometchat/chat-sdk-javascript").Group>;
        required: true;
    };
    showSectionHeader: {
        type: BooleanConstructor;
        default: boolean;
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
        type: PropType<(user: CometChat.User, selected: boolean) => void>;
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
    hideSearch: {
        type: BooleanConstructor;
        default: boolean;
    };
    hideError: {
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
    addMembersStyle: {
        type: PropType<AddMembersStyle>;
        default: () => AddMembersStyle;
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
}>> & Readonly<{}>, {
    title: string;
    buttonText: string;
    titleAlignment: TitleAlignment;
    searchPlaceholder: string;
    sectionHeaderField: string;
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
    addMembersStyle: AddMembersStyle;
    statusIndicatorStyle: any;
    listItemStyle: ListItemStyle;
    loadingIconURL: string;
}, {}, undefined, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _sfc_main;
