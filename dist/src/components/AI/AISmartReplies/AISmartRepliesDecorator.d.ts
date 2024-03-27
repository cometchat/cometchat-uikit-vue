import { CometChatTheme, CometChatMessageComposerAction, CometChatActionsView } from "@cometchat/uikit-resources";
import { DataSource } from "../../shared/Framework/DataSource";
import { DataSourceDecorator } from "../../shared/Framework/DataSourceDecorator";
import { AIOptionsStyle, AISmartRepliesConfiguration } from "@cometchat/uikit-shared";
export declare class AISmartRepliesDecorator extends DataSourceDecorator {
    configuration?: AISmartRepliesConfiguration;
    newDataSource: DataSource;
    loggedInUser: CometChat.User | null;
    user: CometChat.User;
    group: CometChat.Group;
    theme: CometChatTheme;
    private closeCallback?;
    constructor(dataSource: DataSource, configuration?: AISmartRepliesConfiguration);
    getId(): string;
    editReply: (reply: string) => void;
    getSmartReplies: (theme?: CometChatTheme) => Promise<Object>;
    getAIOptions(user: CometChat.User | null, group: CometChat.Group | null, theme: CometChatTheme, id?: any, aiOptionsStyle?: AIOptionsStyle): (CometChatMessageComposerAction | CometChatActionsView)[];
    private closeIfMessageReceived;
    private addMessageListener;
}
