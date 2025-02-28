import { PropType, Ref, CSSProperties } from "vue";
import { AddMembersConfiguration, BannedMembersConfiguration, BaseStyle, DetailsStyle, GroupMembersConfiguration, TransferOwnershipConfiguration } from "@cometchat/uikit-shared";
import { CometChatDetailsOption, CometChatDetailsTemplate, SelectionMode } from "@cometchat/uikit-resources";
import { AvatarStyle, ConfirmDialogStyle, ListItemStyle } from "@cometchat/uikit-elements";
import { CometChat } from "@cometchat/chat-sdk-javascript";
declare const _sfc_main: import("vue").DefineComponent<{
    group: {
        type: PropType<import("@cometchat/chat-sdk-javascript").Group>;
    };
    user: {
        type: PropType<import("@cometchat/chat-sdk-javascript").User>;
    };
    title: {
        type: StringConstructor;
        default: () => any;
    };
    closeButtonIconURL: {
        type: StringConstructor;
        default: string;
    };
    hideProfile: {
        type: BooleanConstructor;
        default: boolean;
    };
    subtitleView: {
        type: PropType<(user?: CometChat.User, group?: CometChat.Group) => ViewType>;
    };
    customProfileView: {
        type: PropType<(user?: CometChat.User, group?: CometChat.Group) => ViewType>;
    };
    data: {
        type: PropType<CometChatDetailsTemplate[]>;
    };
    disableUsersPresence: {
        type: BooleanConstructor;
        default: boolean;
    };
    privateGroupIcon: {
        type: StringConstructor;
        default: string;
    };
    protectedGroupIcon: {
        type: StringConstructor;
        default: string;
    };
    onError: {
        type: PropType<(error: CometChat.CometChatException) => void>;
        default: (error: CometChat.CometChatException) => void;
    };
    onClose: {
        type: PropType<() => void>;
        default: () => void;
    };
    leaveButtonText: {
        type: StringConstructor;
        default: () => any;
    };
    cancelButtonText: {
        type: StringConstructor;
        default: () => any;
    };
    addMembersConfiguration: {
        type: PropType<AddMembersConfiguration>;
        default: () => AddMembersConfiguration;
    };
    bannedMembersConfiguration: {
        type: PropType<BannedMembersConfiguration>;
        default: () => BannedMembersConfiguration;
    };
    groupMembersConfiguration: {
        type: PropType<GroupMembersConfiguration>;
        default: () => GroupMembersConfiguration;
    };
    transferOwnershipConfiguration: {
        type: PropType<TransferOwnershipConfiguration>;
        default: () => TransferOwnershipConfiguration;
    };
    leaveDialogStyle: {
        type: PropType<ConfirmDialogStyle>;
        default: () => ConfirmDialogStyle;
    };
    statusIndicatorStyle: {
        type: PropType<CSSProperties>;
        default: () => CSSProperties;
    };
    backdropStyle: {
        type: PropType<BaseStyle>;
        default: () => BaseStyle;
    };
    avatarStyle: {
        type: PropType<AvatarStyle>;
        default: () => AvatarStyle;
    };
    detailsStyle: {
        type: PropType<DetailsStyle>;
        default: () => DetailsStyle;
    };
    listItemStyle: {
        type: PropType<ListItemStyle>;
        default: () => ListItemStyle;
    };
    leaveConfirmDialogMessage: {
        type: StringConstructor;
        default: () => any;
    };
    transferButtonText: {
        type: StringConstructor;
        default: () => any;
    };
    transferConfirmDialogMessage: {
        type: StringConstructor;
        default: () => any;
    };
    deleteButtonText: {
        type: StringConstructor;
        default: () => any;
    };
    deleteConfirmDialogMessage: {
        type: StringConstructor;
        default: () => any;
    };
    deleteDialogStyle: {
        type: PropType<ConfirmDialogStyle>;
        default: () => ConfirmDialogStyle;
    };
}, {
    getButtonStyle: (option: CometChatDetailsOption) => {
        height: string;
        width: string;
        border: string;
        borderRadius: string;
        buttonTextFont: string;
        buttonTextColor: string;
        background: string;
    };
    wrapperStyle: () => {
        width: string;
        height: string;
        border: string;
        borderRadius: string;
        background: string;
    };
    checkStatusType: () => any;
    checkGroupType: () => any;
    getTitleStyle: () => {
        textFont: string;
        textColor: string;
    };
    onCloseDetails: () => void;
    closeButtonStyle: any;
    openTransferOwnershipModal: Ref<boolean>;
    defaultTemplate: any;
    getSectionHeaderStyle: (template: CometChatDetailsTemplate) => {
        textFont: string;
        textColor: string;
    };
    paddingStyle: () => {
        padding: string;
    };
    subtitleStyle: () => {
        textFont: string;
        textColor: string;
    };
    getTemplateOptions: (template: CometChatDetailsTemplate) => CometChatDetailsOption[] | undefined;
    subtitleText: Ref<string>;
    openAddMembersPage: Ref<boolean>;
    dividerStyle: any;
    getCustomOptionView: (option: CometChatDetailsOption) => any;
    openBannedMembersPage: Ref<boolean>;
    openViewMembersPage: Ref<boolean>;
    confirmLeaveGroupModal: Ref<boolean>;
    currentUser: any;
    currentGroup: any;
    setAvatarStyle: () => any;
    setStatusStyle: () => any;
    setListItemStyle: () => any;
    onOptionClick: (option: CometChatDetailsOption) => void;
    SelectionMode: typeof SelectionMode;
    onCancelClick: () => void;
    bannedMembers: () => void;
    viewMembers: () => void;
    addMembers: () => void;
    onCloseClick: () => void;
    getConfirmClickHandler: () => any;
    closeTransferOwnership: () => void;
    leaveButtonTextRef: Ref<string>;
    confirmDialogMessageRef: Ref<string>;
    confirmDialogStyleRef: Ref<{
        height?: string;
        width?: string;
        border?: string;
        borderRadius?: string;
        background?: string;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    group: {
        type: PropType<import("@cometchat/chat-sdk-javascript").Group>;
    };
    user: {
        type: PropType<import("@cometchat/chat-sdk-javascript").User>;
    };
    title: {
        type: StringConstructor;
        default: () => any;
    };
    closeButtonIconURL: {
        type: StringConstructor;
        default: string;
    };
    hideProfile: {
        type: BooleanConstructor;
        default: boolean;
    };
    subtitleView: {
        type: PropType<(user?: CometChat.User, group?: CometChat.Group) => ViewType>;
    };
    customProfileView: {
        type: PropType<(user?: CometChat.User, group?: CometChat.Group) => ViewType>;
    };
    data: {
        type: PropType<CometChatDetailsTemplate[]>;
    };
    disableUsersPresence: {
        type: BooleanConstructor;
        default: boolean;
    };
    privateGroupIcon: {
        type: StringConstructor;
        default: string;
    };
    protectedGroupIcon: {
        type: StringConstructor;
        default: string;
    };
    onError: {
        type: PropType<(error: CometChat.CometChatException) => void>;
        default: (error: CometChat.CometChatException) => void;
    };
    onClose: {
        type: PropType<() => void>;
        default: () => void;
    };
    leaveButtonText: {
        type: StringConstructor;
        default: () => any;
    };
    cancelButtonText: {
        type: StringConstructor;
        default: () => any;
    };
    addMembersConfiguration: {
        type: PropType<AddMembersConfiguration>;
        default: () => AddMembersConfiguration;
    };
    bannedMembersConfiguration: {
        type: PropType<BannedMembersConfiguration>;
        default: () => BannedMembersConfiguration;
    };
    groupMembersConfiguration: {
        type: PropType<GroupMembersConfiguration>;
        default: () => GroupMembersConfiguration;
    };
    transferOwnershipConfiguration: {
        type: PropType<TransferOwnershipConfiguration>;
        default: () => TransferOwnershipConfiguration;
    };
    leaveDialogStyle: {
        type: PropType<ConfirmDialogStyle>;
        default: () => ConfirmDialogStyle;
    };
    statusIndicatorStyle: {
        type: PropType<CSSProperties>;
        default: () => CSSProperties;
    };
    backdropStyle: {
        type: PropType<BaseStyle>;
        default: () => BaseStyle;
    };
    avatarStyle: {
        type: PropType<AvatarStyle>;
        default: () => AvatarStyle;
    };
    detailsStyle: {
        type: PropType<DetailsStyle>;
        default: () => DetailsStyle;
    };
    listItemStyle: {
        type: PropType<ListItemStyle>;
        default: () => ListItemStyle;
    };
    leaveConfirmDialogMessage: {
        type: StringConstructor;
        default: () => any;
    };
    transferButtonText: {
        type: StringConstructor;
        default: () => any;
    };
    transferConfirmDialogMessage: {
        type: StringConstructor;
        default: () => any;
    };
    deleteButtonText: {
        type: StringConstructor;
        default: () => any;
    };
    deleteConfirmDialogMessage: {
        type: StringConstructor;
        default: () => any;
    };
    deleteDialogStyle: {
        type: PropType<ConfirmDialogStyle>;
        default: () => ConfirmDialogStyle;
    };
}>>, {
    title: string;
    disableUsersPresence: boolean;
    closeButtonIconURL: string;
    onError: (error: CometChat.CometChatException) => void;
    onClose: () => void;
    avatarStyle: AvatarStyle;
    statusIndicatorStyle: CSSProperties;
    listItemStyle: ListItemStyle;
    cancelButtonText: string;
    protectedGroupIcon: string;
    privateGroupIcon: string;
    backdropStyle: BaseStyle;
    hideProfile: boolean;
    leaveButtonText: string;
    addMembersConfiguration: AddMembersConfiguration;
    bannedMembersConfiguration: BannedMembersConfiguration;
    groupMembersConfiguration: GroupMembersConfiguration;
    transferOwnershipConfiguration: TransferOwnershipConfiguration;
    leaveDialogStyle: ConfirmDialogStyle;
    detailsStyle: DetailsStyle;
    leaveConfirmDialogMessage: string;
    transferButtonText: string;
    transferConfirmDialogMessage: string;
    deleteButtonText: string;
    deleteConfirmDialogMessage: string;
    deleteDialogStyle: ConfirmDialogStyle;
}, {}>;
export default _sfc_main;
