import { SmartRepliesConfiguration } from "./SmartRepliesConfiguration";
import { ExtensionsDataSource } from "../../shared/Framework/ExtensionsDatasource";
import { CometChatTheme } from "@cometchat/uikit-resources";
export declare class SmartReplyExtension extends ExtensionsDataSource {
    private configuration?;
    private theme?;
    constructor({ configuration, theme, }?: {
        configuration?: SmartRepliesConfiguration;
        theme?: CometChatTheme;
    });
    addExtension(): void;
    getExtensionId(): string;
}
