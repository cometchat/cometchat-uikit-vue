import { CometChat } from "@cometchat/chat-sdk-javascript";
import { ListStyle, ConversationsStyle, ConversationUtils, CometChatTextFormatter } from "@cometchat/uikit-shared";
import { AvatarStyle, BackdropStyle, BadgeStyle, ConfirmDialogStyle, DateStyle, ListItemStyle, ReceiptStyle } from "@cometchat/uikit-elements";
import { TitleAlignment, States, CometChatOption, DatePatterns, SelectionMode } from "@cometchat/uikit-resources";
import { Ref, PropType } from "vue";
declare const _sfc_main: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    title: {
        type: StringConstructor;
        default: () => any;
    };
    titleAlignment: {
        type: PropType<TitleAlignment>;
        default: () => TitleAlignment;
    };
    confirmDialogTitle: {
        type: StringConstructor;
        default: () => any;
    };
    confirmDialogMessage: {
        type: StringConstructor;
        default: () => any;
    };
    cancelButtonText: {
        type: StringConstructor;
        default: () => any;
    };
    confirmButtonText: {
        type: StringConstructor;
        default: () => any;
    };
    subtitleView: {
        type: PropType<(conversation: CometChat.Conversation) => ViewType>;
    };
    listItemView: {
        type: PropType<(conversation: CometChat.Conversation) => ViewType>;
    };
    menu: {
        type: PropType<ViewType>;
    };
    options: {
        type: PropType<(conversation: CometChat.Conversation) => CometChatOption[]>;
    };
    datePattern: {
        type: PropType<DatePatterns>;
        default: () => DatePatterns;
    };
    conversationsRequestBuilder: {
        type: typeof import("@cometchat/chat-sdk-javascript").ConversationsRequestBuilder;
    };
    activeConversation: {
        type: typeof import("@cometchat/chat-sdk-javascript").Conversation;
    };
    disableUsersPresence: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableSoundForMessages: {
        type: BooleanConstructor;
        default: boolean;
    };
    customSoundForMessages: {
        type: StringConstructor;
        default: string;
    };
    /**
     * @deprecated
     *
     * This property is deprecated as of version 4.3.16 due to newer property 'hideReceipt'. It will be removed in subsequent versions.
     */
    disableReceipt: {
        type: BooleanConstructor;
        default: boolean;
    };
    hideReceipt: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableTyping: {
        type: BooleanConstructor;
        default: boolean;
    };
    hideSeparator: {
        type: BooleanConstructor;
        default: boolean;
    };
    selectionMode: {
        type: PropType<SelectionMode>;
        default: () => SelectionMode;
    };
    onSelect: {
        type: PropType<(conversation: CometChat.Conversation, selected: boolean) => void>;
    };
    deliveredIcon: {
        type: StringConstructor;
        default: string;
    };
    readIcon: {
        type: StringConstructor;
        default: string;
    };
    waitIcon: {
        type: StringConstructor;
        default: string;
    };
    sentIcon: {
        type: StringConstructor;
        default: string;
    };
    errorIcon: {
        type: StringConstructor;
        default: string;
    };
    protectedGroupIcon: {
        type: StringConstructor;
        default: string;
    };
    privateGroupIcon: {
        type: StringConstructor;
        default: string;
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
    onItemClick: {
        type: PropType<(Conversation: import("@cometchat/chat-sdk-javascript").Conversation) => void>;
    };
    onError: {
        type: PropType<(error: CometChat.CometChatException) => void>;
        default: (error: CometChat.CometChatException) => void;
    };
    avatarStyle: {
        type: PropType<AvatarStyle>;
    };
    receiptStyle: {
        type: PropType<ReceiptStyle>;
        default: () => ReceiptStyle;
    };
    badgeStyle: {
        type: PropType<BadgeStyle>;
    };
    deleteConversationDialogStyle: {
        type: PropType<ConfirmDialogStyle>;
    };
    listItemStyle: {
        type: PropType<ListItemStyle>;
    };
    dateStyle: {
        type: PropType<DateStyle>;
    };
    statusIndicatorStyle: {
        type: any;
    };
    conversationsStyle: {
        type: PropType<ConversationsStyle>;
        default: () => ConversationsStyle;
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
    backdropStyle: {
        type: PropType<BackdropStyle>;
        default: () => BackdropStyle;
    };
    disableMentions: {
        type: BooleanConstructor;
        default: boolean;
    };
    textFormatters: {
        type: PropType<CometChatTextFormatter[]>;
        default: () => CometChatTextFormatter[];
    };
}>, {
    Conversations: Ref<import("@cometchat/chat-sdk-javascript").Conversation[], import("@cometchat/chat-sdk-javascript").Conversation[]>;
    onClick: (conversation: CometChat.Conversation) => void;
    getActiveConversation: (conversation: CometChat.Conversation) => boolean;
    checkGroupType: (conversation: CometChat.Conversation) => string;
    isDialogOpen: Ref<boolean, boolean>;
    onConfirmClick: () => void;
    onCancelClick: () => void;
    myavatarStyle: any;
    myListItemStyle: any;
    mydeleteConversationDialogStyle: any;
    receiptStyleComputed: import("vue").ComputedRef<ReceiptStyle>;
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
    }, ListStyle | {
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
    iconStyle: any;
    setSubtitle: (conversationObject: CometChat.Conversation) => string;
    setStatusIndicatorStyle: (conversation: CometChat.Conversation) => any;
    checkStatusType: (conversation: CometChat.Conversation) => any;
    itemThreadIndicatorStyle: () => {
        textFont: string;
        textColor: string;
    };
    subtitleStyle: (conversation: any) => {
        font: string;
        color: string;
    };
    threadText: string;
    isReceiptDisable: (conversation: CometChat.Conversation) => boolean;
    getMessageReceipt: (conversation: CometChat.Conversation) => import("@cometchat/uikit-shared/dist/Utils/MessageReceiptUtils").receipts;
    SelectionMode: typeof SelectionMode;
    menustyle: Ref<{
        width: string;
        height: string;
        border: string;
        borderRadius: string;
        background: string;
        textFont: string;
        textColor: string;
        iconTint: string;
        iconBackground: string;
        iconBorder: string;
        iconBorderRadius: string;
        submenuWidth: string;
        submenuHeight: string;
        submenuBorder: string;
        submenuBorderRadius: string;
        submenuBackground: string;
    }, {
        width: string;
        height: string;
        border: string;
        borderRadius: string;
        background: string;
        textFont: string;
        textColor: string;
        iconTint: string;
        iconBackground: string;
        iconBorder: string;
        iconBorderRadius: string;
        submenuWidth: string;
        submenuHeight: string;
        submenuBorder: string;
        submenuBorderRadius: string;
        submenuBackground: string;
    } | {
        width: string;
        height: string;
        border: string;
        borderRadius: string;
        background: string;
        textFont: string;
        textColor: string;
        iconTint: string;
        iconBackground: string;
        iconBorder: string;
        iconBorderRadius: string;
        submenuWidth: string;
        submenuHeight: string;
        submenuBorder: string;
        submenuBorderRadius: string;
        submenuBackground: string;
    }>;
    ConversationUtils: typeof ConversationUtils;
    DatePatterns: typeof DatePatterns;
    onOptionClick: (event: any, conversation: CometChat.Conversation) => void;
    getConversation: () => Promise<void>;
    state: Ref<States, States>;
    myoptions: any;
    mydateStyle: any;
    mybadgeStyle: any;
    wrapperStyle: () => any;
    ThreadIcon: string;
    openThreadArrow: string;
    getbackdropStyle: () => BackdropStyle;
    setConversationOptions: (item: CometChat.Conversation) => any;
    handleSelection: (event: CustomEvent, conversation: CometChat.Conversation) => void;
    mentions: string;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: StringConstructor;
        default: () => any;
    };
    titleAlignment: {
        type: PropType<TitleAlignment>;
        default: () => TitleAlignment;
    };
    confirmDialogTitle: {
        type: StringConstructor;
        default: () => any;
    };
    confirmDialogMessage: {
        type: StringConstructor;
        default: () => any;
    };
    cancelButtonText: {
        type: StringConstructor;
        default: () => any;
    };
    confirmButtonText: {
        type: StringConstructor;
        default: () => any;
    };
    subtitleView: {
        type: PropType<(conversation: CometChat.Conversation) => ViewType>;
    };
    listItemView: {
        type: PropType<(conversation: CometChat.Conversation) => ViewType>;
    };
    menu: {
        type: PropType<ViewType>;
    };
    options: {
        type: PropType<(conversation: CometChat.Conversation) => CometChatOption[]>;
    };
    datePattern: {
        type: PropType<DatePatterns>;
        default: () => DatePatterns;
    };
    conversationsRequestBuilder: {
        type: typeof import("@cometchat/chat-sdk-javascript").ConversationsRequestBuilder;
    };
    activeConversation: {
        type: typeof import("@cometchat/chat-sdk-javascript").Conversation;
    };
    disableUsersPresence: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableSoundForMessages: {
        type: BooleanConstructor;
        default: boolean;
    };
    customSoundForMessages: {
        type: StringConstructor;
        default: string;
    };
    /**
     * @deprecated
     *
     * This property is deprecated as of version 4.3.16 due to newer property 'hideReceipt'. It will be removed in subsequent versions.
     */
    disableReceipt: {
        type: BooleanConstructor;
        default: boolean;
    };
    hideReceipt: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableTyping: {
        type: BooleanConstructor;
        default: boolean;
    };
    hideSeparator: {
        type: BooleanConstructor;
        default: boolean;
    };
    selectionMode: {
        type: PropType<SelectionMode>;
        default: () => SelectionMode;
    };
    onSelect: {
        type: PropType<(conversation: CometChat.Conversation, selected: boolean) => void>;
    };
    deliveredIcon: {
        type: StringConstructor;
        default: string;
    };
    readIcon: {
        type: StringConstructor;
        default: string;
    };
    waitIcon: {
        type: StringConstructor;
        default: string;
    };
    sentIcon: {
        type: StringConstructor;
        default: string;
    };
    errorIcon: {
        type: StringConstructor;
        default: string;
    };
    protectedGroupIcon: {
        type: StringConstructor;
        default: string;
    };
    privateGroupIcon: {
        type: StringConstructor;
        default: string;
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
    onItemClick: {
        type: PropType<(Conversation: import("@cometchat/chat-sdk-javascript").Conversation) => void>;
    };
    onError: {
        type: PropType<(error: CometChat.CometChatException) => void>;
        default: (error: CometChat.CometChatException) => void;
    };
    avatarStyle: {
        type: PropType<AvatarStyle>;
    };
    receiptStyle: {
        type: PropType<ReceiptStyle>;
        default: () => ReceiptStyle;
    };
    badgeStyle: {
        type: PropType<BadgeStyle>;
    };
    deleteConversationDialogStyle: {
        type: PropType<ConfirmDialogStyle>;
    };
    listItemStyle: {
        type: PropType<ListItemStyle>;
    };
    dateStyle: {
        type: PropType<DateStyle>;
    };
    statusIndicatorStyle: {
        type: any;
    };
    conversationsStyle: {
        type: PropType<ConversationsStyle>;
        default: () => ConversationsStyle;
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
    backdropStyle: {
        type: PropType<BackdropStyle>;
        default: () => BackdropStyle;
    };
    disableMentions: {
        type: BooleanConstructor;
        default: boolean;
    };
    textFormatters: {
        type: PropType<CometChatTextFormatter[]>;
        default: () => CometChatTextFormatter[];
    };
}>> & Readonly<{}>, {
    title: string;
    titleAlignment: TitleAlignment;
    disableUsersPresence: boolean;
    hideSeparator: boolean;
    selectionMode: SelectionMode;
    hideError: boolean;
    errorStateText: string;
    emptyStateText: string;
    onError: (error: CometChat.CometChatException) => void;
    statusIndicatorStyle: any;
    loadingIconURL: string;
    confirmDialogTitle: string;
    confirmDialogMessage: string;
    cancelButtonText: string;
    confirmButtonText: string;
    datePattern: DatePatterns;
    disableSoundForMessages: boolean;
    customSoundForMessages: string;
    disableReceipt: boolean;
    hideReceipt: boolean;
    disableTyping: boolean;
    deliveredIcon: string;
    readIcon: string;
    waitIcon: string;
    sentIcon: string;
    errorIcon: string;
    protectedGroupIcon: string;
    privateGroupIcon: string;
    receiptStyle: ReceiptStyle;
    conversationsStyle: ConversationsStyle;
    backdropStyle: BackdropStyle;
    disableMentions: boolean;
    textFormatters: CometChatTextFormatter[];
}, {}, undefined, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _sfc_main;
