import { PropType } from "vue";
import { TabAlignment, SelectionMode, TabsVisibility } from "@cometchat/uikit-resources";
import { GroupsConfiguration, UsersConfiguration, ContactsStyle } from "@cometchat/uikit-shared";
declare const _sfc_main: import("vue").DefineComponent<{
    title: {
        type: StringConstructor;
    };
    usersTabTitle: {
        type: StringConstructor;
    };
    groupsTabTitle: {
        type: StringConstructor;
    };
    usersConfiguration: {
        type: PropType<UsersConfiguration>;
    };
    groupsConfiguration: {
        type: PropType<GroupsConfiguration>;
    };
    onSubmitIconClick: {
        type: PropType<(usersList?: Array<CometChat.User>, groupsList?: Array<CometChat.Group>) => void>;
    };
    closeIconURL: {
        type: StringConstructor;
        default: string;
    };
    onItemClick: {
        type: PropType<(user?: CometChat.User, group?: CometChat.Group) => void>;
    };
    contactsStyle: {
        type: PropType<ContactsStyle>;
        default: () => ContactsStyle;
    };
    onClose: {
        type: PropType<() => void>;
    };
    tabVisibility: {
        type: PropType<TabsVisibility>;
        default: () => TabsVisibility;
    };
    selectionLimit: {
        type: NumberConstructor;
    };
    hideSubmitButton: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    submitButtonText: {
        type: StringConstructor;
        default: () => any;
    };
    selectionMode: {
        type: PropType<SelectionMode>;
        default: () => SelectionMode;
    };
}, {
    TabAlignment: typeof TabAlignment;
    tabsToShow: any[];
    getCloseButtonStyle: () => {
        height: string;
        width: string;
        border: string;
        borderRadius: string;
        background: string;
        buttonIconTint: string;
    };
    getTitleStyle: () => {
        textFont: string;
        textColor: string;
    };
    tabsStyle: {
        background: string;
        borderRadius: string;
        border: string;
    };
    closeIconUrl: string;
    getWrapperStyle: () => {
        background: string;
    };
    selectionLimitReached: import("vue").ComputedRef<boolean>;
    localize: (str: string) => any;
    getSubmitButtonStyle: () => {
        background: string;
        borderRadius: string;
        height: string;
        padding: string;
        width: string;
        display: string;
        justifyContent: string;
        alignItems: string;
        border: string;
        buttonTextFont: string;
        buttonTextColor: string;
    };
    selectionArray: {
        userArray: any[];
        groupArray: any[];
    };
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: StringConstructor;
    };
    usersTabTitle: {
        type: StringConstructor;
    };
    groupsTabTitle: {
        type: StringConstructor;
    };
    usersConfiguration: {
        type: PropType<UsersConfiguration>;
    };
    groupsConfiguration: {
        type: PropType<GroupsConfiguration>;
    };
    onSubmitIconClick: {
        type: PropType<(usersList?: Array<CometChat.User>, groupsList?: Array<CometChat.Group>) => void>;
    };
    closeIconURL: {
        type: StringConstructor;
        default: string;
    };
    onItemClick: {
        type: PropType<(user?: CometChat.User, group?: CometChat.Group) => void>;
    };
    contactsStyle: {
        type: PropType<ContactsStyle>;
        default: () => ContactsStyle;
    };
    onClose: {
        type: PropType<() => void>;
    };
    tabVisibility: {
        type: PropType<TabsVisibility>;
        default: () => TabsVisibility;
    };
    selectionLimit: {
        type: NumberConstructor;
    };
    hideSubmitButton: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    submitButtonText: {
        type: StringConstructor;
        default: () => any;
    };
    selectionMode: {
        type: PropType<SelectionMode>;
        default: () => SelectionMode;
    };
}>>, {
    selectionMode: SelectionMode;
    closeIconURL: string;
    contactsStyle: ContactsStyle;
    tabVisibility: TabsVisibility;
    hideSubmitButton: boolean;
    submitButtonText: string;
}, {}>;
export default _sfc_main;
