import { ChatConfigurator } from "../../shared/Framework/ChatConfigurator";
import { ExtensionsDataSource } from "../../shared/Framework/ExtensionsDatasource";
import { TextModeratorExtensionDecorator } from "./TextModeratorExtensionDecorator";

export class TextModeratorExtension implements ExtensionsDataSource {
  enable(): void {
    ChatConfigurator.enable(
      (dataSource) => new TextModeratorExtensionDecorator(dataSource)
    );
  }
}
