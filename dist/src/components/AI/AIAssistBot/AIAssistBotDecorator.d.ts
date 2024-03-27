import { CometChat } from "@cometchat/chat-sdk-javascript";
import { CometChatTheme, CometChatMessageComposerAction, CometChatActionsView } from "@cometchat/uikit-resources";
import { DataSource } from "../../shared/Framework/DataSource";
import { DataSourceDecorator } from "../../shared/Framework/DataSourceDecorator";
import { AIAssistBotConfiguration, AIOptionsStyle } from "@cometchat/uikit-shared";
export declare class AIAssistBotDecorator extends DataSourceDecorator {
    configuration?: AIAssistBotConfiguration;
    newDataSource: DataSource;
    loggedInUser: CometChat.User | null;
    bots: CometChat.User[];
    user: CometChat.User;
    group: CometChat.Group;
    theme: CometChatTheme;
    constructor(dataSource: DataSource, configuration?: AIAssistBotConfiguration);
    private getAllBots;
    getId(): string;
    getAIOptions(user: CometChat.User | null, group: CometChat.Group | null, theme: CometChatTheme, id?: any, aiOptionsStyle?: AIOptionsStyle): (CometChatMessageComposerAction | CometChatActionsView)[];
    onMessageSent: (message: string, bot: CometChat.User) => Promise<string>;
    closeChat: () => void;
    onOptionClick: (bot: CometChat.User) => void;
    private addMessageListener;
}
