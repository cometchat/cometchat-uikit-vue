import { CometChatTheme, CometChatMessageTemplate, DocumentIconAlignment } from "@cometchat/uikit-resources";
import { CollaborativeWhiteboardConfiguration } from "./CollaborativeWhiteboardConfiguration";
import { DataSourceDecorator } from "../../shared/Framework/DataSourceDecorator";
import { DataSource } from "../../shared/Framework/DataSource";
export declare class CollaborativeWhiteBoardExtensionDecorator extends DataSourceDecorator {
    configuration?: CollaborativeWhiteboardConfiguration;
    newDataSource: DataSource;
    theme: CometChatTheme;
    constructor(dataSource: DataSource, { configuration }: {
        configuration: CollaborativeWhiteboardConfiguration;
    });
    getAllMessageTypes(): string[];
    getId(): string;
    getAllMessageCategories(): string[];
    checkIfTemplateExist(template: CometChatMessageTemplate[], type: string): boolean;
    getAllMessageTemplates(_theme: CometChatTheme, additionalConfigurations?: any): CometChatMessageTemplate[];
    getWhiteBoardTemplate(_theme: CometChatTheme): CometChatMessageTemplate;
    getWhiteboardContentView(whiteboardMessage: CometChat.CustomMessage, _theme: CometChatTheme): {
        componentName: string;
        props: {
            hideSeparator: boolean;
            iconAlignment: DocumentIconAlignment.right;
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
            ccClicked: (whiteboardURL: string) => Promise<void>;
        };
    };
    launchCollaborativeWhiteboardDocument(whiteboardURL: string): Promise<void>;
    getWhiteboardDocument(message: CometChat.CustomMessage): any;
    getAttachmentOptions(theme?: CometChatTheme, id?: any): any;
    getLastConversationMessage(conversation: CometChat.Conversation, loggedInUser: CometChat.User, additionalConfigurations: any): string;
}
