import { PropType } from "vue";
import { UserMemberListType, UserPresencePlacement } from "@cometchat/uikit-resources";
import { AvatarStyle } from "@cometchat/uikit-elements";
declare const _sfc_main: import("vue").DefineComponent<{
    userMemberListType: {
        type: PropType<UserMemberListType>;
        default: UserMemberListType;
    };
    onItemClick: {
        type: PropType<(user: CometChat.User | CometChat.GroupMember) => void>;
    };
    listItemView: {
        type: PropType<(item: CometChat.User | CometChat.GroupMember) => ViewType>;
    };
    avatarStyle: {
        type: PropType<AvatarStyle>;
    };
    statusIndicatorStyle: {
        type: ObjectConstructor;
    };
    searchKeyword: {
        type: StringConstructor;
    };
    group: {
        type: PropType<import("@cometchat/chat-sdk-javascript").Group>;
    };
    subtitleView: {
        type: PropType<(item: CometChat.User | CometChat.GroupMember) => ViewType>;
    };
    usersRequestBuilder: {
        type: PropType<import("@cometchat/chat-sdk-javascript").UsersRequestBuilder>;
    };
    disableUsersPresence: {
        type: BooleanConstructor;
        default: boolean;
    };
    hideSeparator: {
        type: BooleanConstructor;
        default: boolean;
    };
    loadingStateView: {
        type: PropType<ViewType>;
    };
    onEmpty: {
        type: PropType<() => void>;
    };
    groupMembersRequestBuilder: {
        type: PropType<import("@cometchat/chat-sdk-javascript").GroupMembersRequestBuilder>;
    };
    loadingIconUrl: {
        type: StringConstructor;
        default: string;
    };
    userPresencePlacement: {
        type: PropType<UserPresencePlacement>;
        default: UserPresencePlacement;
    };
    disableLoadingState: {
        type: BooleanConstructor;
        default: boolean;
    };
    onError: {
        type: PropType<() => void>;
    };
}, {
    UserMemberListType: typeof UserMemberListType;
    listItemStyle: {
        height: string;
    };
    getUsersStyle: () => {
        border: string;
        height: string;
        background: string;
        minHeight: string;
        borderRadius: string;
    };
    getGroupMemebersStyle: () => {
        border: string;
        height: string;
        padding: string;
        background: string;
        borderRadius: string;
    };
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    userMemberListType: {
        type: PropType<UserMemberListType>;
        default: UserMemberListType;
    };
    onItemClick: {
        type: PropType<(user: CometChat.User | CometChat.GroupMember) => void>;
    };
    listItemView: {
        type: PropType<(item: CometChat.User | CometChat.GroupMember) => ViewType>;
    };
    avatarStyle: {
        type: PropType<AvatarStyle>;
    };
    statusIndicatorStyle: {
        type: ObjectConstructor;
    };
    searchKeyword: {
        type: StringConstructor;
    };
    group: {
        type: PropType<import("@cometchat/chat-sdk-javascript").Group>;
    };
    subtitleView: {
        type: PropType<(item: CometChat.User | CometChat.GroupMember) => ViewType>;
    };
    usersRequestBuilder: {
        type: PropType<import("@cometchat/chat-sdk-javascript").UsersRequestBuilder>;
    };
    disableUsersPresence: {
        type: BooleanConstructor;
        default: boolean;
    };
    hideSeparator: {
        type: BooleanConstructor;
        default: boolean;
    };
    loadingStateView: {
        type: PropType<ViewType>;
    };
    onEmpty: {
        type: PropType<() => void>;
    };
    groupMembersRequestBuilder: {
        type: PropType<import("@cometchat/chat-sdk-javascript").GroupMembersRequestBuilder>;
    };
    loadingIconUrl: {
        type: StringConstructor;
        default: string;
    };
    userPresencePlacement: {
        type: PropType<UserPresencePlacement>;
        default: UserPresencePlacement;
    };
    disableLoadingState: {
        type: BooleanConstructor;
        default: boolean;
    };
    onError: {
        type: PropType<() => void>;
    };
}>>, {
    disableUsersPresence: boolean;
    hideSeparator: boolean;
    userPresencePlacement: UserPresencePlacement;
    disableLoadingState: boolean;
    userMemberListType: UserMemberListType;
    loadingIconUrl: string;
}, {}>;
export default _sfc_main;
