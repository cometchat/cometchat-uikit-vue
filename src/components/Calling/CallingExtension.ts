import { ChatConfigurator } from "..//shared/Framework/ChatConfigurator";
import { DataSource } from "..//shared/Framework/DataSource";
import { ExtensionsDataSource } from "..//shared/Framework/ExtensionsDatasource";
import { CallingExtensionDecorator } from "./CallingExtensionDecorator";

export class CallingExtension implements ExtensionsDataSource {
  enable(): void {
    ChatConfigurator.enable(
      (dataSource: DataSource) => new CallingExtensionDecorator(dataSource)
    );
  }
}
