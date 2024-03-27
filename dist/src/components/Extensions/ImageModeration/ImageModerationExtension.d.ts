import { ExtensionsDataSource } from "../../shared/Framework/ExtensionsDatasource";
import { ImageModerationConfiguration } from "./ImageModerationConfiguration";
export declare class ImageModerationExtension extends ExtensionsDataSource {
    private configuration?;
    constructor({ configuration }?: {
        configuration?: ImageModerationConfiguration;
    });
    addExtension(): void;
    getExtensionId(): string;
}
