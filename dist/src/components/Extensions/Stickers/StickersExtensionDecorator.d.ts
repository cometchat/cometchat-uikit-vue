import { CometChatMessageTemplate, CometChatTheme, Placement } from "@cometchat/uikit-resources";
import { PopoverStyle } from "@cometchat/uikit-elements";
import { DataSourceDecorator } from "../../shared/Framework/DataSourceDecorator";
import { DataSource } from "../../shared/Framework/DataSource";
import { StickerConfiguration } from "./StickersConfiguration";
export declare class StickersExtensionDecorator extends DataSourceDecorator {
    configuration?: StickerConfiguration;
    newDataSource: DataSource;
    theme?: CometChatTheme;
    private id;
    private user;
    private group;
    constructor(dataSource: DataSource, { configuration }: {
        configuration: StickerConfiguration;
    });
    getDataSource(): DataSource;
    getAllMessageTemplates(_theme?: CometChatTheme, additionalConfigurations?: any): CometChatMessageTemplate[];
    getAuxiliaryOptions(id: Map<string, any>, user?: CometChat.User, group?: CometChat.Group, theme?: CometChatTheme): any;
    getStickerAuxiliaryButton(id: Map<string, any>, user?: CometChat.User, group?: CometChat.Group, theme?: CometChatTheme): {
        componentName: string;
        props: {
            placement: Placement;
            popoverStyle: PopoverStyle;
            openIconURL: string;
            closeIconURL: string;
            emojiButtonStyle: any;
            stickerKeyboardStyle: {
                width: string;
                height: string;
                border: string;
                emptyStateTextFont: string;
                emptyStateTextColor: string;
                errorStateTextFont: string;
                errorStateTextColor: string;
                loadingIconTint: string;
                background: string;
                borderRadius: string;
            };
            stickerKeyboardListeners: {
                "cc-sticker-clicked": (e: any) => void;
            };
        };
    };
    sendSticker(event: any): void;
    getSticker(message: CometChat.CustomMessage): any;
    getStickerMessageContentView(stickerMessage: CometChat.CustomMessage, _theme: CometChatTheme): string;
    getStickerTemplate(_theme: CometChatTheme): CometChatMessageTemplate;
    checkIfTemplateExist(template: CometChatMessageTemplate[], type: string): boolean;
    getAllMessageCategories(): string[];
    getAllMessageTypes(): string[];
    getId(): string;
    getLastConversationMessage(conversation: CometChat.Conversation, loggedInUser: CometChat.User, additionalConfigurations: any): string;
}
