declare type ViewType =
  | undefined
  | {
      html: string;
      componentName?: never;
      props?: never;
      slots?: never;
      listeners?: never;
    }
  | {
      html?: never;
      componentName: string;
      props?: any;
      slots?: any;
      listeners?: any;
    };

declare type ComposerId = {
  parentMessageId: number | null;
  user: string | null;
  group: string | null;
};
declare type EntityType =
  | import("@cometchat-pro/chat").CometChat.User
  | import("@cometchat-pro/chat").CometChat.Group;
declare module "*.svg";
declare module "*.png";
declare module "*.wav";
