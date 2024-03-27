import { ExtensionsDataSource } from "../../shared/Framework/ExtensionsDatasource";
import { StickerConfiguration } from "./StickersConfiguration";
export declare class StickersExtension extends ExtensionsDataSource {
    private configuration?;
    constructor({ configuration }?: {
        configuration?: StickerConfiguration;
    });
    addExtension(): void;
    getExtensionId(): string;
}
