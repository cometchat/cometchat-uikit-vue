import { CometChatTheme, CometChatMessageTemplate, DocumentIconAlignment } from "@cometchat/uikit-resources";
import { DataSourceDecorator } from "../../shared/Framework/DataSourceDecorator";
import { DataSource } from "../../shared/Framework/DataSource";
import { CollaborativeDocumentConfiguration } from "./CollaborativeDocumentConfiguration";
export declare class CollaborativeDocumentExtensionDecorator extends DataSourceDecorator {
    configuration: CollaborativeDocumentConfiguration;
    newDataSource: DataSource;
    theme: CometChatTheme;
    constructor(dataSource: DataSource, configuration?: CollaborativeDocumentConfiguration);
    getAllMessageTypes(): string[];
    getId(): string;
    getAllMessageCategories(): string[];
    checkIfTemplateExist(template: CometChatMessageTemplate[], type: string): boolean;
    getAllMessageTemplates(_theme: CometChatTheme, additionalConfigurations?: any): CometChatMessageTemplate[];
    getDocumentTemplate(_theme: CometChatTheme): CometChatMessageTemplate;
    getDocumentContentView(documentMessage: CometChat.CustomMessage, _theme: CometChatTheme): {
        componentName: string;
        props: {
            iconURL: string;
            title: any;
            URL: any;
            subtitle: any;
            buttonText: any;
            documentStyle: {
                titleFont: string;
                titleColor: string;
                subtitleFont: string;
                subtitleColor: string;
                iconTint: string;
                buttonTextFont: string;
                buttonTextColor: string;
                buttonBackground: string;
                separatorColor: string;
            };
            hideSeparator: boolean;
            iconAlignment: DocumentIconAlignment.right;
            ccClicked: (documentURL: string) => void;
        };
    };
    launchCollaborativeDocument(documentURL: string): void;
    getDocumentURL(message: CometChat.CustomMessage): any;
    getAttachmentOptions(theme?: CometChatTheme, id?: any): any;
    getLastConversationMessage(conversation: CometChat.Conversation, loggedInUser: CometChat.User, additionalConfigurations: any): string;
}
