import { PropType } from "vue";
import { TabAlignment, SelectionMode, TabsVisibility } from "@cometchat/uikit-resources";
import { GroupsConfiguration, UsersConfiguration, ContactsStyle } from "@cometchat/uikit-shared";
declare const _sfc_main: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
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
    /**
 * @deprecated
 *
 * This property is deprecated as of version 4.3.18 due to newer property 'onSubmitButtonClick'. It will be removed in subsequent versions.
 */
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
        default: number;
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
    onSubmitButtonClick: {
        type: PropType<(usersList?: Array<CometChat.User>, groupsList?: Array<CometChat.Group>) => void>;
        default: any;
    };
}>, {
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
    submitClicked: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
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
    /**
 * @deprecated
 *
 * This property is deprecated as of version 4.3.18 due to newer property 'onSubmitButtonClick'. It will be removed in subsequent versions.
 */
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
        default: number;
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
    onSubmitButtonClick: {
        type: PropType<(usersList?: Array<CometChat.User>, groupsList?: Array<CometChat.Group>) => void>;
        default: any;
    };
}>> & Readonly<{}>, {
    selectionMode: SelectionMode;
    closeIconURL: string;
    contactsStyle: ContactsStyle;
    tabVisibility: TabsVisibility;
    selectionLimit: number;
    hideSubmitButton: boolean;
    submitButtonText: string;
    onSubmitButtonClick: (usersList?: Array<CometChat.User>, groupsList?: Array<CometChat.Group>) => void;
}, {}, undefined, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _sfc_main;
