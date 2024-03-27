import { MessageTranslationConfiguration } from "./MessageTranslationConfiguration";
import { ExtensionsDataSource } from "../../shared/Framework/ExtensionsDatasource";
export declare class MessageTranslationExtension extends ExtensionsDataSource {
    private configuration?;
    constructor({ configuration }?: {
        configuration?: MessageTranslationConfiguration;
    });
    addExtension(): void;
    getExtensionId(): string;
}
