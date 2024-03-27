import { AIExtensionDataSource } from "../../shared/Framework/AIExtensionDataSource";
import { AIConversationSummaryConfiguration } from "@cometchat/uikit-shared";
export declare class AIConversationSummaryExtension extends AIExtensionDataSource {
    private configuration?;
    constructor(configuration?: AIConversationSummaryConfiguration);
    addExtension(): void;
    getExtensionId(): string;
}
