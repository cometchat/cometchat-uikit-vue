import { ChatConfigurator } from "../../shared/Framework/ChatConfigurator";
import { ExtensionsDataSource } from "../../shared/Framework/ExtensionsDatasource";
import { DocumentIcon } from "../../../assets";
import { CollaborativeDocumentConfiguration } from "./CollaborativeDocumentConfiguration";

import { CollaborativeDocumentExtensionDecorator } from "./CollaborativeDocumentExtensionDecorator";

export class CollaborativeDocumentExtension implements ExtensionsDataSource {
  configuration?: CollaborativeDocumentConfiguration;

  constructor(
    {
      configuration,
    }: { configuration?: CollaborativeDocumentConfiguration } = {
      configuration: new CollaborativeDocumentConfiguration({
        style: {},
        iconURL: DocumentIcon,
        optionIconURL: "",
        optionStyle: {},
      }),
    }
  ) {
    this.configuration = configuration;
  }

  enable(): void {
    ChatConfigurator.enable(
      (dataSource) =>
        new CollaborativeDocumentExtensionDecorator(
          dataSource,
          this.configuration as any
        )
    );
  }
}
