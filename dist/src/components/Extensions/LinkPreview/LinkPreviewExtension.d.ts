import { ExtensionsDataSource } from "../../shared/Framework/ExtensionsDatasource";
import { LinkPreviewConfiguration } from "./LinkPreviewConfiguration";
export declare class LinkPreviewExtension extends ExtensionsDataSource {
    private configuration?;
    constructor({ configuration }?: {
        configuration?: LinkPreviewConfiguration;
    });
    addExtension(): void;
    getExtensionId(): string;
}
