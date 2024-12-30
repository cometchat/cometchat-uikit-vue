import { CardMessage, CometChatLocalize, CustomInteractiveMessage, FormMessage, SchedulerMessage } from "@cometchat/uikit-resources";
import { CallingExtensionDataSource, CometChatSoundManager, UIKitSettings } from "@cometchat/uikit-shared";
import { AIExtensionDataSource } from "../Framework/AIExtensionDataSource";
import { ConversationUpdateSettings } from "@cometchat/chat-sdk-javascript";
import { ExtensionsDataSource } from "../Framework/ExtensionsDatasource";
export { DataSource } from "../Framework/DataSource";
export declare class CometChatUIKit {
    static uiKitSettings: UIKitSettings | null;
    static SoundManager: typeof CometChatSoundManager;
    static Localize: typeof CometChatLocalize;
    static conversationUpdateSettings: ConversationUpdateSettings;
    static init(uiKitSettings: UIKitSettings | null): Promise<Object> | undefined;
    static defaultExtensions: ExtensionsDataSource[];
    /**
     * Default callingExtension included in the UI Kit.
     * @type {CallingExtensionDataSource}
     */
    static defaultCallingExtension: CallingExtensionDataSource;
    static defaultAIFeatures: AIExtensionDataSource[];
    static enableCalling(): void;
    private static initiateAfterLogin;
    static login(uid: string): Promise<CometChat.User> | undefined;
    static loginWithAuthToken(authToken: string): Promise<CometChat.User> | undefined;
    static getLoggedinUser(): Promise<CometChat.User | null> | undefined;
    static createUser(user: CometChat.User): Promise<CometChat.User> | undefined;
    static updateUser(user: CometChat.User): Promise<CometChat.User> | undefined;
    static logout(): Promise<Object> | undefined;
    static checkAuthSettings(): boolean;
    /**
     * Sends a scheduler message and emits events based on the message status.
     * @param message - The scheduler message to be sent.
     * @param disableLocalEvents - A boolean indicating whether to disable local events or not. Default value is false.
     */
    static sendSchedulerMessage(message: SchedulerMessage, disableLocalEvents?: boolean): void;
    /**
     * Sends a form message and emits events based on the message status.
     * @param message - The form message to be sent.
     * @param disableLocalEvents - A boolean indicating whether to disable local events or not. Default value is false.
     */
    static sendFormMessage(message: FormMessage, disableLocalEvents?: boolean): void;
    static sendCardMessage(message: CardMessage, disableLocalEvents?: boolean): void;
    static sendCustomInteractiveMessage(message: CustomInteractiveMessage, disableLocalEvents?: boolean): void;
    static sendCustomMessage(message: CometChat.CustomMessage): void;
    static sendTextMessage(message: CometChat.TextMessage): void;
    static sendMediaMessage(message: CometChat.MediaMessage): void;
    static getDataSource(): import("../Framework/DataSource").DataSource;
    static getConversationSettings(): ConversationUpdateSettings;
}
