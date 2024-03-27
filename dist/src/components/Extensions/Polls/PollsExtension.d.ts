import { ExtensionsDataSource } from "../../shared/Framework/ExtensionsDatasource";
import { PollsConfiguration } from "./PollsConfiguration";
export declare class PollsExtension extends ExtensionsDataSource {
    private configuration?;
    constructor({ configuration }?: {
        configuration?: PollsConfiguration;
    });
    addExtension(): void;
    getExtensionId(): string;
}
