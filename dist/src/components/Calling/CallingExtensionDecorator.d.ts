import { CometChatMessageTemplate, CometChatTheme, DocumentIconAlignment, MessageBubbleAlignment, CallWorkflow } from "@cometchat/uikit-resources";
import { CallingConfiguration } from "@cometchat/uikit-shared";
import { CallscreenStyle } from "@cometchat/uikit-elements";
import { DataSourceDecorator } from "../shared/Framework/DataSourceDecorator";
import { DataSource } from "../shared/Framework/DataSource";
export declare class CallingExtensionDecorator extends DataSourceDecorator {
    theme: CometChatTheme;
    loggedInUser: CometChat.User | null;
    configuration?: CallingConfiguration;
    constructor(dataSource: DataSource, configuration?: CallingConfiguration);
    addLoginListener(): void;
    getLoggedInUser(): Promise<void>;
    getAllMessageTypes(): string[];
    getId(): string;
    getAllMessageCategories(): string[];
    checkIfTemplateTypeExist(template: CometChatMessageTemplate[], type: string): boolean;
    checkIfTemplateCategoryExist(template: CometChatMessageTemplate[], category: string): boolean;
    getAllMessageTemplates(_theme?: CometChatTheme | undefined, additionalConfigurations?: any): CometChatMessageTemplate[];
    getDirectCallTemplate(_theme: CometChatTheme): CometChatMessageTemplate;
    getDefaultCallTemplate(_theme: CometChatTheme): CometChatMessageTemplate[];
    getCallBubbleStyle(_alignment: MessageBubbleAlignment, _theme: CometChatTheme): {
        titleFont: string;
        titleColor: string;
        iconTint: string;
        buttonTextFont: string;
        buttonTextColor: string;
        buttonBackground: string;
        width: string;
        background: string;
        borderRadius: string;
    } | {
        titleFont: string;
        titleColor: string;
        iconTint: string;
        buttonTextFont: string;
        buttonTextColor: string;
        buttonBackground: string;
        width: string;
        borderRadius: string;
        background?: undefined;
    };
    getSessionId(_message: CometChat.CustomMessage): any;
    getCallBubbleTitle(_message: CometChat.CustomMessage): any;
    getDirectCallMessageBubble(_message: CometChat.CustomMessage, _alignment: MessageBubbleAlignment, _theme: CometChatTheme): {
        componentName: string;
        props: {
            hideSeparator: boolean;
            iconAlignment: DocumentIconAlignment.left;
            documentStyle: {
                titleFont: string;
                titleColor: string;
                iconTint: string;
                buttonTextFont: string;
                buttonTextColor: string;
                buttonBackground: string;
                width: string;
                background: string;
                borderRadius: string;
            } | {
                titleFont: string;
                titleColor: string;
                iconTint: string;
                buttonTextFont: string;
                buttonTextColor: string;
                buttonBackground: string;
                width: string;
                borderRadius: string;
                background?: undefined;
            };
            URL: any;
            iconURL: string;
            title: any;
            buttonText: any;
            ccClicked: () => void;
        };
    };
    startDirectCall(sessionId: string, message: CometChat.CustomMessage): void;
    getOngoingCallUI(sessionId: string, callSettings: any): {
        componentName: string;
        props: {
            ongoingCallStyle: CallscreenStyle;
            sessionID: string;
            callWorkflow: CallWorkflow;
            callSettingsBuilder: any;
        };
    };
    callStatusStyle(_message: CometChat.Call, theme: CometChatTheme): {
        buttonTextFont: string;
        buttonTextColor: string;
        borderRadius: string;
        border: string;
        buttonIconTint: string;
        background: string;
        iconBackground: string;
        padding: string;
        gap: string;
        height: string;
        justifyContent: string;
    };
    getCallActionMessage(_message: CometChat.Call): string;
    getDefaultAudioCallMessageBubble(_message: CometChat.Call, _alignment: MessageBubbleAlignment, _theme: CometChatTheme): {
        componentName: string;
        props: {
            disabled: boolean;
            iconURL: string;
            buttonStyle: {
                buttonTextFont: string;
                buttonTextColor: string;
                borderRadius: string;
                border: string;
                buttonIconTint: string;
                background: string;
                iconBackground: string;
                padding: string;
                gap: string;
                height: string;
                justifyContent: string;
            };
            text: string;
        };
    };
    getDefaultVideoCallMessageBubble(_message: CometChat.Call, _alignment: MessageBubbleAlignment, _theme: CometChatTheme): {
        componentName: string;
        props: {
            disabled: boolean;
            iconURL: string;
            buttonStyle: {
                buttonTextFont: string;
                buttonTextColor: string;
                borderRadius: string;
                border: string;
                buttonIconTint: string;
                background: string;
                iconBackground: string;
                padding: string;
                gap: string;
                height: string;
                justifyContent: string;
            };
            text: string;
        };
    };
    getLastConversationMessage(conversation: CometChat.Conversation, loggedInUser: CometChat.User, additionalConfigurations?: any): string;
    getAuxiliaryHeaderMenu(user: CometChat.User, group: CometChat.Group): any[];
}
