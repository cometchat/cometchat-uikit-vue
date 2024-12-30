import { Ref, PropType } from "vue";
import { CreateGroupConfiguration, GroupsConfiguration, JoinGroupConfiguration, MessageHeaderStyle, MessagesConfiguration, WithMessagesStyle } from "@cometchat/uikit-shared";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { CreateGroupStyle, JoinGroupStyle, ListItemStyle } from "@cometchat/uikit-elements";
declare const _sfc_main: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    group: {
        type: PropType<import("@cometchat/chat-sdk-javascript").Group>;
    };
    hideCreateGroup: {
        type: BooleanConstructor;
        default: boolean;
    };
    isMobileView: {
        type: BooleanConstructor;
        default: boolean;
    };
    messageText: {
        type: StringConstructor;
        default: () => any;
    };
    groupsWithMessagesStyle: {
        type: PropType<WithMessagesStyle>;
        default: () => WithMessagesStyle;
    };
    messagesConfiguration: {
        type: PropType<MessagesConfiguration>;
        default: () => MessagesConfiguration;
    };
    groupsConfiguration: {
        type: PropType<GroupsConfiguration>;
        default: () => GroupsConfiguration;
    };
    createGroupConfiguration: {
        type: PropType<CreateGroupConfiguration>;
        default: () => CreateGroupConfiguration;
    };
    joinGroupConfiguration: {
        type: PropType<JoinGroupConfiguration>;
        default: () => JoinGroupConfiguration;
    };
    onError: {
        type: PropType<(error: CometChat.CometChatException) => void>;
        default: (error: CometChat.CometChatException) => void;
    };
}>, {
    labelStyle: any;
    onItemClick: (group: CometChat.Group) => void;
    emptyMessageStyle: () => {
        background: any;
        height: any;
        width: string;
        border: any;
        borderRadius: any;
    };
    groupsWrapperStyles: () => {
        height: any;
        width: any;
        border: any;
        borderRadius: any;
        background: any;
    };
    messagesConfig: Ref<any, any>;
    currentGroup: Ref<any, any>;
    currentUser: Ref<import("@cometchat/chat-sdk-javascript").User, import("@cometchat/chat-sdk-javascript").User>;
    openPasswordModal: Ref<boolean, boolean>;
    openCreateGroup: () => void;
    closeCreateGroup: () => void;
    closeJoinGroup: () => void;
    onGroupJoined: (event: any) => void;
    CreateIcon: string;
    updatedCreatedGroup: (event: any) => void;
    getCreateGroupButton: () => {
        componentName: string;
        props: {
            buttonStyle: any;
            iconURL: string;
        };
        listeners: {
            "cc-button-clicked": () => void;
        };
    };
    openCreateGroupPage: Ref<boolean, boolean>;
    backdropStyle: any;
    getCreateGroupStyle: () => CreateGroupStyle;
    protectedGroup: any;
    getJoinGroupStyle: () => JoinGroupStyle;
    getMessageHeaderStyle: () => MessageHeaderStyle;
    getListItemStyle: () => ListItemStyle;
    getGroupsStyle: () => {
        titleTextFont?: string;
        titleTextColor?: string;
        emptyStateTextFont?: string;
        emptyStateTextColor?: string;
        errorStateTextFont?: string;
        errorStateTextColor?: string;
        loadingIconTint?: string;
        separatorColor?: string;
        boxShadow?: string;
        privateGroupIconBackground?: string;
        passwordGroupIconBackground?: string;
        searchIconTint?: string;
        searchBorder?: string;
        searchBorderRadius?: string;
        searchBackground?: string;
        searchPlaceholderTextFont?: string;
        searchPlaceholderTextColor?: string;
        searchTextFont?: string;
        searchTextColor?: string;
        subTitleTextFont?: string;
        subTitleTextColor?: string;
        height: string;
        width?: string;
        border?: string;
        borderRadius?: string;
        background?: string;
    };
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    group: {
        type: PropType<import("@cometchat/chat-sdk-javascript").Group>;
    };
    hideCreateGroup: {
        type: BooleanConstructor;
        default: boolean;
    };
    isMobileView: {
        type: BooleanConstructor;
        default: boolean;
    };
    messageText: {
        type: StringConstructor;
        default: () => any;
    };
    groupsWithMessagesStyle: {
        type: PropType<WithMessagesStyle>;
        default: () => WithMessagesStyle;
    };
    messagesConfiguration: {
        type: PropType<MessagesConfiguration>;
        default: () => MessagesConfiguration;
    };
    groupsConfiguration: {
        type: PropType<GroupsConfiguration>;
        default: () => GroupsConfiguration;
    };
    createGroupConfiguration: {
        type: PropType<CreateGroupConfiguration>;
        default: () => CreateGroupConfiguration;
    };
    joinGroupConfiguration: {
        type: PropType<JoinGroupConfiguration>;
        default: () => JoinGroupConfiguration;
    };
    onError: {
        type: PropType<(error: CometChat.CometChatException) => void>;
        default: (error: CometChat.CometChatException) => void;
    };
}>> & Readonly<{}>, {
    onError: (error: CometChat.CometChatException) => void;
    groupsConfiguration: GroupsConfiguration;
    isMobileView: boolean;
    messageText: string;
    messagesConfiguration: MessagesConfiguration;
    hideCreateGroup: boolean;
    groupsWithMessagesStyle: WithMessagesStyle;
    createGroupConfiguration: CreateGroupConfiguration;
    joinGroupConfiguration: JoinGroupConfiguration;
}, {}, undefined, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _sfc_main;
