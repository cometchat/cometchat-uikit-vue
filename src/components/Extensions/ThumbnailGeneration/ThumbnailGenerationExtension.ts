import { ChatConfigurator } from "../../shared/Framework/ChatConfigurator";
import { ExtensionsDataSource } from "../../shared/Framework/ExtensionsDatasource";
import { ThumbnailGenerationExtensionDecorator } from "./ThumbnailGenerationExtensionDecorator";

export class ThumbnailGenerationExtension implements ExtensionsDataSource {
  enable(): void {
    ChatConfigurator.enable(
      (dataSource) => new ThumbnailGenerationExtensionDecorator(dataSource)
    );
  }
}
