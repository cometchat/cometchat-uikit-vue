import { ExtensionsDataSource } from "../../shared/Framework/ExtensionsDatasource";
import { CollaborativeWhiteboardConfiguration } from "./CollaborativeWhiteboardConfiguration";
export declare class CollaborativeWhiteBoardExtension extends ExtensionsDataSource {
    configuration?: CollaborativeWhiteboardConfiguration;
    constructor({ configuration, }?: {
        configuration?: CollaborativeWhiteboardConfiguration;
    });
    addExtension(): void;
    getExtensionId(): string;
}
