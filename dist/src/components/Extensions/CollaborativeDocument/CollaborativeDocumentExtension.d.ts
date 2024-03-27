import { ExtensionsDataSource } from "../../shared/Framework/ExtensionsDatasource";
import { CollaborativeDocumentConfiguration } from "./CollaborativeDocumentConfiguration";
export declare class CollaborativeDocumentExtension extends ExtensionsDataSource {
    configuration?: CollaborativeDocumentConfiguration;
    constructor({ configuration, }?: {
        configuration?: CollaborativeDocumentConfiguration;
    });
    addExtension(): void;
    getExtensionId(): string;
}
