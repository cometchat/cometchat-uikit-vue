<template>
  <div
    v-if="createPollViewRef && createPollViewRef.html"
    v-html="createPollViewRef.html"
  ></div>
  <component
    v-else-if="createPollViewRef && createPollViewRef.componentName"
    :is="createPollViewRef.componentName!"
    v-bind="{ ...createPollViewRef.props }"
    v-on="createPollViewRef?.listeners"
  >
    <template v-for="(html, key) in createPollViewRef.slots" :key="key">
      <div :v-slot="[key]" :v-html="html"></div>
    </template>
  </component>

  <div class="cc-messagecomposer-wrapper" :style="getWrapperStyle()">
    <div class="cc-messagecomposer-wrapper__headerview" v-if="headerView">
      <div v-if="headerView && headerView.html" v-html="headerView.html"></div>
      <component
        v-else-if="headerView && headerView.componentName"
        :is="headerView.componentName!"
        v-bind="{ ...headerView.props }"
        v-on="headerView?.listeners"
      >
        <template v-for="(html, key) in headerView.slots" :key="key">
          <div :v-slot="[key]" :v-html="html"></div>
        </template>
      </component>
    </div>
    <div v-else>
      <div class="cc-messagecomposer-wrapper__headerview" v-if="showPreview">
        <cometchat-preview
          :previewStyle="getPreviewStyle()"
          :previewSubtitle="messageToBeEdited?.getText()"
          @cc-preview-close-clicked="closePreview()"
        >
        </cometchat-preview>
      </div>
    </div>

    <div class="cc-messagecomposer__input">
      <cometchat-message-input
        @cc-message-input-entered="sendMessageOnEnter($event)"
        ref="inputRef"
        :text="textRef"
        @cc-message-input-changed="messageInputChanged($event)"
        :messageInputStyle="getMessageInputStyle()"
        :placeholderText="placeHolderText"
        :auxiliaryButtonAlignment="getAuxiliaryButtonAlignment()"
      >
        <div slot="secondaryView">
          <div
            v-if="secondaryButtonView && secondaryButtonView.html"
            v-html="secondaryButtonView.html"
          ></div>
          <component
            v-else-if="secondaryButtonView && secondaryButtonView.componentName"
            :is="secondaryButtonView.componentName!"
            v-bind="{ ...secondaryButtonView.props }"
            v-on="secondaryButtonView?.listeners"
          >
            <template
              v-for="(html, key) in secondaryButtonView.slots"
              :key="key"
            >
              <div :v-slot="[key]" :v-html="html"></div>
            </template>
          </component>

          <div v-else>
            <div class="cc-messagecomposer__attachbutton">
              <cometchat-popover
                :placement="auxilaryPlacement"
                :popoverStyle="getPopoverStyle()"
              >
                <cometchat-action-sheet
                  slot="content"
                  :actions="getAttachmentOptions()"
                  :actionSheetStyle="getActionsheetStyle()"
                  @cc-actionsheet-clicked="handleActions($event)"
                >
                </cometchat-action-sheet>
                <cometchat-button
                  ref="actionSheetRef"
                  slot="children"
                  @cc-button-clicked="openActionSheet($event)"
                  :iconURL="
                    !showActionSheetItem ? attachmentIconURL : closeIconURL
                  "
                  :buttonStyle="getAttachmentButtonStyle()"
                ></cometchat-button>
              </cometchat-popover>
            </div>
          </div>
        </div>
        <div slot="auxilaryView">
          <div
            v-if="auxiliaryButtonView && auxiliaryButtonView.html"
            v-html="auxiliaryButtonView.html"
          ></div>
          <component
            v-else-if="auxiliaryButtonView && auxiliaryButtonView.componentName"
            :is="auxiliaryButtonView.componentName!"
            v-bind="{ ...auxiliaryButtonView.props }"
            v-on="auxiliaryButtonView?.listeners"
          >
            <template
              v-for="(html, key) in auxiliaryButtonView.slots"
              :key="key"
            >
              <div :v-slot="[key]" :v-html="html"></div>
            </template>
          </component>

          <div
            v-else-if="!auxiliaryButtonView"
            ref="auxiliaryView"
            class="cc-messagecomposer-wrapper__auxilary"
          >
            <div
              v-for="(item, i) of defaultAuxiliaryOptions &&
              defaultAuxiliaryOptions.length
                ? defaultAuxiliaryOptions
                : []"
              :key="i"
            >
              <div v-if="item?.html" v-html="item?.html"></div>
              <component
                v-else
                :is="item?.componentName!"
                v-on="item?.listeners ? item?.listeners : {}"
                :componentIndex="i"
                @component-event="handleComponentEvents"
                v-bind="{ ...item?.props }"
              >
                <template v-for="(html, key) in item?.slots" :key="key">
                  <div :v-slot="[key]" :v-html="html"></div>
                </template>
              </component>
            </div>
            <div class="cc-messagecomposer__emojikeyboard">
              <cometchat-popover
                :placement="auxilaryPlacement"
                :popoverStyle="getEmojiPopover()"
              >
                <cometchat-emoji-keyboard
                  slot="content"
                  :emojiKeyboardStyle="getEmojiKeyboardStyle()"
                  @cc-emoji-clicked="appendEmoji($event)"
                >
                </cometchat-emoji-keyboard>
                <cometchat-button
                  ref="emojiButtonRef"
                  slot="children"
                  @cc-button-clicked="openEmojiKeyboard($event)"
                  :iconURL="
                    !showEmojiKeyboard ? emojiButtonIconURL : closeIconURL
                  "
                  :buttonStyle="getEmojiButtonStyle()"
                ></cometchat-button>
              </cometchat-popover>
            </div>
          </div>
        </div>
        <div slot="primaryView">
          <div
            v-if="sendButtonView && sendButtonView.html"
            v-html="sendButtonView.html"
          ></div>
          <component
            v-else-if="sendButtonView && sendButtonView.componentName"
            :is="sendButtonView.componentName!"
            v-bind="{ ...sendButtonView.props }"
            v-on="sendButtonView?.listeners"
          >
            <template v-for="(html, key) in sendButtonView.slots" :key="key">
              <div :v-slot="[key]" :v-html="html"></div>
            </template>
          </component>

          <div
            class="cc-messagecomposer-wrapper__sendbutton"
            ref="sendButton"
            v-else-if="showSendButton || hideLiveReaction"
          >
            <cometchat-button
              :iconURL="sendButtonIconURL"
              :buttonStyle="sendButtonStyle"
              :hoverText="localize('SEND_MESSAGE')"
              @cc-button-clicked="customSendMethod(messageText)"
            ></cometchat-button>
          </div>
          <div
            class="cc-messagecomposer-wrapper__livereaction"
            v-if="!hideLiveReaction && !showSendButton"
          >
            <cometchat-button
              :iconURL="LiveReactionIconURL"
              :hoverText="localize('LIVE_REACTION')"
              :buttonStyle="getLiveReactionStyle()"
              @cc-button-clicked="sendReaction()"
            ></cometchat-button>
          </div>
        </div>
      </cometchat-message-input>
    </div>
  </div>

  <input
    class="cc-messagecomposer-mediainput"
    ref="inputElementRef"
    @change="inputChangeHandler($event)"
  />
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  ref,
  Ref,
  nextTick,
  onBeforeUpdate,
  toRefs,
  PropType,
  onBeforeUnmount,
  inject,
} from "vue";
import {
  BaseStyle,
  CometChatSoundManager,
  MessageComposerStyle,
  StickersConfiguration,
  StickersConstants,
  StickersStyle,
  CometChatUIKitUtility,
  PollsConstants,
} from "uikit-utils-lerna";
import {
  EmojiIcon,
  StickerIcon,
  LiveReactionIcon,
  SendIcon,
  PlusIcon,
  PlusRotatedIcon,
} from "../../assets";
import { ChatConfigurator } from "../shared/Framework/ChatConfigurator";
import {
  AuxiliaryButtonAlignment,
  CometChatMessageComposerAction,
  CometChatMessageEvents,
  CometChatTheme,
  CometChatUIEvents,
  CometChatUIKitConstants,
  fontHelper,
  IMessages,
  IModal,
  localize,
  MessageStatus,
  Placement,
} from "uikit-resources-lerna";

import {
  ActionSheetStyle,
  EmojiKeyboardStyle,
  PopoverStyle,
  PreviewStyle,
} from "my-cstom-package-lit";
import { CometChat } from "@cometchat-pro/chat";
import { Subscription } from "rxjs";
import CometChatCreatePollView from "../Extensions/Polls/CometChatCreatePollView/index.vue";
import CometChatStickersAuxiliaryButton from "../Extensions/Stickers/CometChatStickersAuxiliaryButton/index.vue";

export default defineComponent({
  name: "CometChatMessageComposer",
  components: { CometChatCreatePollView, CometChatStickersAuxiliaryButton },
  props: {
    id: {
      type: String,
      default: null,
    },
    user: {
      type: CometChat.User,
    },
    group: { type: CometChat.Group, default: null },
    text: { type: String, default: "" },
    onTextChange: { type: Function as PropType<(text: string) => void> },
    placeHolderText: {
      type: String,
      default: () => localize("ENTER_YOUR_MESSAGE_HERE"),
    },
    sendButtonView: { type: Object as PropType<ViewType> },
    onSendButtonClick: {
      type: Function as PropType<(message: CometChat.BaseMessage) => void>,
    },
    secondaryButtonView: { type: Object as PropType<ViewType> },
    attachmentIconURL: {
      type: String,
      default: PlusIcon,
    },
    auxiliaryButtonView: { type: Object as PropType<ViewType> },
    auxiliaryButtonsAlignment: {
      type: Number as PropType<AuxiliaryButtonAlignment>,
      default: AuxiliaryButtonAlignment.right,
    },
    attachmentOptions: {
      type: Function as PropType<
        (
          entity: EntityType,
          composerId: ComposerId
        ) => CometChatMessageComposerAction[]
      >,
    },
    parentMessageId: { type: Number, default: null },
    LiveReactionIconURL: {
      type: String,
      default: LiveReactionIcon,
    },
    hideLiveReaction: { type: Boolean, default: false },
    headerView: { type: Object as PropType<ViewType> },
    onError: {
      type: Function as PropType<(error: CometChat.CometChatException) => void>,
      default: (error: CometChat.CometChatException) => {
        console.log(error);
      },
    },
    disableSoundForMessages: { type: Boolean, default: false },
    customSoundForMessage: { type: String },
    disableTypingEvents: { type: Boolean, default: false },
    messageComposerStyle: {
      type: MessageComposerStyle,
      default: new MessageComposerStyle({}),
    },
  },
  setup(props) {
    let { theme, switchThemeMode }: any = inject(
      "theme",
      new CometChatTheme({})
    )!;
    let loggedInUser: CometChat.User;
    let popoverStyle: PopoverStyle = {
      width: "275px",
      height: "280px",
      border: "",
      background: "transparent",
      borderRadius: "8px",
      boxShadow: "0px 0px 32px rgba(20, 20, 20, 0.2)",
    };

    let componentRefs: Array<{ onClick?: any }> = [];

    let sendButton = ref(null);
    let composerId: any = {};
    let ccMessageEdit!: Subscription;
    let ccShowModal!: Subscription;
    let subHideModal!: Subscription;
    let attachmentOptions: any = [];
    let enableStickerKeyboard = false;
    let showPreview: Ref<boolean> = ref(false);
    let showSendButton: Ref<boolean> = ref(false);
    let messageToBeEdited: any = ref();
    let createPollViewRef: Ref<ViewType> = ref(undefined);

    let sendButtonIconURL = SendIcon;
    let auxilaryPlacement: Placement = Placement.top;
    let emojiPopover: PopoverStyle = {
      width: "315px",
      height: "320px",
      border: "none",
      background: "transparent",
      borderRadius: "8px",
      boxShadow: "0px 0px 32px rgba(20, 20, 20, 0.2)",
    };
    let stickerConfiguration: {
      id?: string;
      configuration?: StickersConfiguration;
    } = {};
    let showEmojiKeyboard: Ref<boolean> = ref(false);
    let liveReactionStyle: any = {
      height: "24px",
      width: "24px",
      border: "none",
      borderRadius: "0",
      buttonIconTint: "red",
      background: "transparent",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    };

    let inputElementRef: any = ref(null);
    let emojiButtonRef: any = ref(null);
    let showActionSheetItem: Ref<boolean> = ref(false);
    let actionSheetRef: any = ref(null);
    let stickerButtonRef: any = ref(null);
    let inputRef: any = ref(null);
    let showStickerKeyboard: Ref<boolean> = ref(false);
    let sendButtonStyle: any = ref({
      height: "24px",
      width: "24px",
      border: "none",
      borderRadius: "0",
      buttonIconTint: "rgba(20, 20, 20, 0.58)",
      background: "transparent",
    });
    let messageComposerStyle: any;

    let textRef = ref("");
    let auxiliaryView = ref(null);
    let actionsheetStyle: ActionSheetStyle = {
      layoutModeIconTint: "rgba(20, 20, 20, 0.04)",
      borderRadius: "inherit",
      background: "rgb(255,255,255)",
      border: "none",
      width: "100%",
      height: "100%",
      titleFont: "500 15px Inter, sans-serif",
      titleColor: "#141414",
      listItemBackground: "",
      ActionSheetSeparatorTint: "1px solid RGBA(20, 20, 20, 0.08)",
    };

    const onImageChange = (event: any): boolean => {
      try {
        if (!event.target.files[0]) {
          return false;
        }
        const uploadedFile = event.target.files[0];
        const reader: any = new FileReader();
        reader.addEventListener(
          "load",
          () => {
            const newFile = new File(
              [reader.result],
              uploadedFile.name,
              uploadedFile
            );
            sendMediaMessage(newFile, CometChat.MESSAGE_TYPE.IMAGE);
          },
          false
        );
        reader.readAsArrayBuffer(uploadedFile);
      } catch (error: any) {
        let cometchatException = new CometChat.CometChatException({
          message: error.message,
        });
        props.onError(cometchatException);
      }
      return true;
    };

    onBeforeUnmount(() => {
      unsubscribeToEvents();
    });

    const onFileChange = (event: any): boolean => {
      try {
        if (!event.target.files["0"]) {
          return false;
        }
        const uploadedFile = event.target.files["0"];
        var reader: any = new FileReader();
        reader.addEventListener(
          "load",
          () => {
            const newFile = new File(
              [reader.result],
              uploadedFile.name,
              uploadedFile
            );
            sendMediaMessage(newFile, CometChat.MESSAGE_TYPE.FILE);
          },
          false
        );
        reader.readAsArrayBuffer(uploadedFile);
      } catch (error: any) {
        let cometchatException = new CometChat.CometChatException({
          message: error.message,
        });
        props.onError(cometchatException);
      }
      return true;
    };

    const unsubscribeToEvents = () => {
      ccMessageEdit?.unsubscribe();
    };

    const onVideoChange = (event: any): boolean => {
      try {
        if (!event.target.files[0]) {
          return false;
        }
        const uploadedFile = event.target.files[0];
        const reader: any = new FileReader();
        reader.addEventListener(
          "load",
          () => {
            const newFile = new File(
              [reader.result],
              uploadedFile.name,
              uploadedFile
            );
            sendMediaMessage(newFile, CometChat.MESSAGE_TYPE.VIDEO);
          },
          false
        );
        reader.readAsArrayBuffer(uploadedFile);
      } catch (error: any) {
        let cometchatException = new CometChat.CometChatException({
          message: error.message,
        });
        props.onError(cometchatException);
      }
      return true;
    };

    const getAuxiliaryButtonAlignment = () => {
      return props.auxiliaryButtonsAlignment;
    };
    const onAudioChange = (event: any): boolean => {
      try {
        if (!event.target.files[0]) {
          return false;
        }
        const uploadedFile = event.target.files[0];
        const reader: any = new FileReader();
        reader.addEventListener(
          "load",
          () => {
            const newFile = new File(
              [reader.result],
              uploadedFile.name,
              uploadedFile
            );
            sendMediaMessage(newFile, CometChat.MESSAGE_TYPE.AUDIO);
          },
          false
        );
        reader.readAsArrayBuffer(uploadedFile);
      } catch (error: any) {
        let cometchatException = new CometChat.CometChatException({
          message: error.message,
        });
        props.onError(cometchatException);
      }
      return true;
    };

    let acceptHandlers: any = {
      "image/*": onImageChange.bind(this),
      "video/*": onVideoChange.bind(this),
      "audio/*": onAudioChange.bind(this),
      "file/*": onFileChange.bind(this),
    };
    let attachmentButtonStyle: any = {
      height: "24px",
      width: "24px",
      border: "none",
      borderRadius: "0",
      buttonIconTint: "grey",
      background: "transparent",
    };
    let closeIconURL = PlusRotatedIcon;

    let emojiButtonStyle: any = {
      height: "24px",
      width: "24px",
      border: "none",
      borderRadius: "0",
      buttonIconTint: "grey",
      background: "transparent",
    };

    let emojiKeyboardStyle: EmojiKeyboardStyle = {
      width: "100%",
      height: "100%",
      border: "none",
      textFont: "500 12px Inter, sans-serif",
      textColor: "",
      background: "",
      borderRadius: "12px",
    };
    let emojiButtonIconURL = EmojiIcon;
    let stickerButtonIconURL = StickerIcon;
    let stickerKeyboardStyle: StickersStyle = {};
    let messageSending = false;
    let messageInputStyle: any = {};
    let storeTypingInterval: any;
    let previewStyle: PreviewStyle = {
      height: "80%",
      width: "100%",
    };
    let messageText: Ref<string> = ref("");
    let propRef: any = toRefs(props); //to rerender when props change
    let currentTargetUser: any;
    let currentTargetGroup: any;
    let changed = false;
    let defaultAuxiliaryOptions: any = ref(null);
    const USER_GROUP_NOT_PROVIDED_ERROR_STR =
      "No user or group object provided. Should at least provide one.";
    onBeforeMount(() => {
      textRef.value = props.text;
      CometChat.getLoggedinUser()
        .then((user: any) => {
          if (user) {
            loggedInUser = user;
          }
        })
        .catch((error: any) => {
          if (props.onError) {
            let cometchatException = new CometChat.CometChatException({
              message: error.message,
            });
            props.onError(cometchatException);
          }
        });
      composerId.parentMessageId = props.parentMessageId;
      if (props.user) {
        currentTargetUser = props.user;
        composerId = {
          user: props.user?.getUid(),
          parentMessageId: props.parentMessageId,
        };
      } else {
        currentTargetGroup = props.group;
        composerId = {
          group: props.group?.getGuid(),
          parentMessageId: props.parentMessageId,
        };
      }
      setTheme();
      subscribeToEvents();

      if (
        props.attachmentOptions &&
        (currentTargetUser || currentTargetGroup)
      ) {
        attachmentOptions = props.attachmentOptions(
          currentTargetUser ? currentTargetUser : currentTargetGroup,
          composerId
        );
      }

      attachmentOptions = attachmentOptions.length
        ? attachmentOptions
        : ChatConfigurator.getDataSource().getAttachmentOptions(
            theme.value,
            composerId as unknown as Map<string, any>
          );

      addAttachmentCallback();

      defaultAuxiliaryOptions.value =
        ChatConfigurator.getDataSource().getAuxiliaryOptions(
          composerId as unknown as Map<string, any>,
          currentTargetUser,
          currentTargetGroup,
          theme.value
        );
    });

    onBeforeUpdate(() => {
      if (props.user && props.user?.getUid() !== currentTargetUser?.getUid()) {
        changed = true;
        composerId = {
          user: props.user?.getUid(),
          parentMessageId: props.parentMessageId,
        };
        currentTargetUser = props.user;
        currentTargetGroup = null;
      } else if (
        props.group &&
        props.group?.getGuid() !== currentTargetGroup?.getGuid()
      ) {
        composerId = {
          group: props.group?.getGuid(),
          parentMessageId: props.parentMessageId,
        };
        changed = true;
        currentTargetGroup = props.group;
        currentTargetUser = null;
      }
      if (changed) {
        showSendButton.value = false;
        clearInputField();
        closePopovers();
        closeCustomPopOvers();
        attachmentOptions = [];
        if (
          props.attachmentOptions &&
          (currentTargetUser || currentTargetGroup)
        ) {
          attachmentOptions = props.attachmentOptions(
            currentTargetUser ? currentTargetUser : currentTargetGroup,
            composerId
          );
        }

        attachmentOptions = attachmentOptions.length
          ? attachmentOptions
          : ChatConfigurator.getDataSource().getAttachmentOptions(
              theme.value,
              composerId as unknown as Map<string, any>
            );

        addAttachmentCallback();
        defaultAuxiliaryOptions.value =
          ChatConfigurator.getDataSource().getAuxiliaryOptions(
            composerId as unknown as Map<string, any>,
            currentTargetUser,
            currentTargetGroup,
            theme.value
          );
      }
      //setTheme();
      changed = false;
    });

    const addAttachmentCallback = (): void => {
      attachmentOptions.forEach((element: CometChatMessageComposerAction) => {
        let pollsOnClick: any;
        switch (element.id) {
          case CometChatUIKitConstants.MessageTypes.audio:
            element.onClick = openAudioPicker;
            break;
          case CometChatUIKitConstants.MessageTypes.video:
            element.onClick = openvideoPicker;
            break;
          case CometChatUIKitConstants.MessageTypes.file:
            element.onClick = openFilePicker;
            break;
          case CometChatUIKitConstants.MessageTypes.image:
            element.onClick = openImagePicker;
            break;
          case PollsConstants.extension_poll:
            pollsOnClick = element.onClick;
            element.onClick = () => {
              if (element.onClick) {
                pollsOnClick([currentTargetUser, currentTargetGroup])!;
              }
            };
            break;
        }
      });
    };

    const openImagePicker = (): void => {
      inputElementRef.value.type = "file";
      inputElementRef.value.accept = "image/*";
      inputElementRef.value.click();
      closePopovers();
      closeCustomPopOvers();
    };
    const openFilePicker = (): void => {
      inputElementRef.value.type = "file";
      inputElementRef.value.accept = "file/*";
      inputElementRef.value.click();
      closePopovers();
      closeCustomPopOvers();
    };
    const openvideoPicker = (): void => {
      inputElementRef.value.type = "file";
      inputElementRef.value.accept = "video/*";
      inputElementRef.value.click();
      closePopovers();
      closeCustomPopOvers();
    };
    const openAudioPicker = (): void => {
      inputElementRef.value.type = "file";
      inputElementRef.value.accept = "audio/*";
      inputElementRef.value.click();
      closePopovers();
      closeCustomPopOvers();
    };

    const closePopovers = () => {
      if (showEmojiKeyboard.value) {
        emojiButtonRef.value.click();
        showEmojiKeyboard.value = !showEmojiKeyboard.value;
      }
      if (showActionSheetItem.value) {
        actionSheetRef.value.click();
        showActionSheetItem.value = !showActionSheetItem.value;
      }
    };

    const getReceiverDetails = () => {
      if (props.user && props.user.getUid()) {
        return {
          receiverId: props.user.getUid(),
          receiverType: CometChatUIKitConstants.MessageReceiverType.user,
        };
      } else if (props.group && props.group.getGuid()) {
        return {
          receiverId: props.group.getGuid(),
          receiverType: CometChatUIKitConstants.MessageReceiverType.group,
        };
      }
      throw new Error(USER_GROUP_NOT_PROVIDED_ERROR_STR);
    };
    const sendMediaMessage = (
      messageInput: File,
      messageType: string
    ): boolean => {
      if (currentTargetUser?.getBlockedByMe()) {
        return false;
      }
      try {
        if (messageSending) {
          return false;
        }
        messageSending = true;
        const { receiverId, receiverType } = getReceiverDetails();
        let mediaMessage: CometChat.MediaMessage = new CometChat.MediaMessage(
          receiverId,
          messageInput,
          messageType,
          receiverType
        );
        if (props.parentMessageId) {
          mediaMessage.setParentMessageId(props.parentMessageId);
        }
        mediaMessage.setType(messageType);
        mediaMessage.setMetadata({
          ["file"]: messageInput,
        });
        mediaMessage.setSentAt(CometChatUIKitUtility.getUnixTimestamp());
        mediaMessage.setMuid(CometChatUIKitUtility.ID());

        closePopovers();
        closeCustomPopOvers();
        if (props.onSendButtonClick) {
          props.onSendButtonClick(mediaMessage);
        } else {
          CometChatMessageEvents.ccMessageSent.next({
            message: mediaMessage,
            status: MessageStatus.inprogress,
          });
          if (!props.disableSoundForMessages) {
            playAudio();
          }

          CometChat.sendMessage(mediaMessage)
            .then((response: CometChat.BaseMessage) => {
              messageSending = false;
              response.setMuid(mediaMessage.getMuid());
              CometChatMessageEvents.ccMessageSent.next({
                message: response,
                status: MessageStatus.success,
              });
            })
            .catch((error) => {
              mediaMessage.setMetadata({
                error: error,
              });
              CometChatMessageEvents.ccMessageSent.next({
                message: mediaMessage,
                status: MessageStatus.error,
              });
              messageSending = false;
              let cometchatException = new CometChat.CometChatException({
                message: error.message,
              });
              if (props.onError) {
                props.onError(cometchatException);
              }
            });
        }
      } catch (error: any) {
        let cometchatException = new CometChat.CometChatException({
          message: error.message,
        });
        if (props.onError) {
          props.onError(cometchatException);
        }
      }
      return true;
    };

    const sendTextMessage = (): boolean => {
      let textMsg = messageText?.value?.trim();
      if (
        (showPreview.value &&
          messageToBeEdited.value?.getText() === messageText.value) ||
        currentTargetUser?.getBlockedByMe()
      ) {
        return false;
      }

      try {
        // Dont Send Blank text messages -- i.e --- messages that only contain spaces
        if (textMsg.length == 0) {
          return false;
        }
        // wait for the previous message to be sent before sending the current message
        if (messageSending) {
          return false;
        }
        messageSending = true;

        // If its an Edit and Send Message Operation , use Edit Message Function
        if (messageToBeEdited.value) {
          editMessage();

          return false;
        }

        let { receiverId, receiverType } = getReceiverDetails();
        let messageInput;
        if (textMsg !== null) {
          messageInput = textMsg.trim();
        } else {
          messageInput = messageText.value.trim();
        }

        let textMessage: CometChat.TextMessage = new CometChat.TextMessage(
          receiverId,
          messageInput,
          receiverType
        );

        if (props.parentMessageId) {
          textMessage.setParentMessageId(props.parentMessageId);
        }

        textMessage.setSentAt(CometChatUIKitUtility.getUnixTimestamp());

        textMessage.setMuid(CometChatUIKitUtility.ID());

        //clearing Message Input Box
        clearInputField();
        textRef.value = "";

        // End Typing Indicator Function
        closePopovers();
        closeCustomPopOvers();

        if (props.onSendButtonClick) {
          props.onSendButtonClick(textMessage);
        } else {
          CometChatMessageEvents.ccMessageSent.next({
            message: textMessage,
            status: MessageStatus.inprogress,
          });
          // play audio after action generation
          if (!props.disableSoundForMessages) {
            playAudio();
          }
          CometChat.sendMessage(textMessage)
            .then((message: CometChat.TextMessage | CometChat.BaseMessage) => {
              let messageObject: CometChat.BaseMessage = message;
              CometChatMessageEvents.ccMessageSent.next({
                message: messageObject,
                status: MessageStatus.success,
              });
              // Change the send button to reaction button
              setTimeout(() => {
                showSendButton.value = false;
              }, 500);
              messageSending = false;
            })
            .catch((error: any) => {
              console.log("ERROR: " + error);
              textMessage.setMetadata({
                error: error,
              });
              CometChatMessageEvents.ccMessageSent.next({
                message: textMessage,
                status: MessageStatus.error,
              });
              messageSending = false;
            });
        }
      } catch (error: any) {
        let cometchatException = new CometChat.CometChatException({
          message: error.message,
        });
        props.onError(cometchatException);
      }
      return true;
    };

    const closePreview = () => {
      showPreview.value = false;
      sendButtonStyle.value = {
        height: "24px",
        width: "24px",
        border: "none",
        borderRadius: "0",
        buttonIconTint: theme.value.palette.getAccent500(),
        background: "transparent",
      };
      showSendButton.value = false;
      messageToBeEdited.value = null;
      clearInputField();
    };

    const clearInputField = () => {
      messageText.value = "";
      inputRef?.value?.emptyInputField();
    };

    const endTyping = (metadata = null) => {
      storeTypingInterval = null;
      if (!props.disableTypingEvents) {
        try {
          let { receiverId, receiverType } = getReceiverDetails();
          let typingMetadata = metadata || undefined;
          let typingNotification = new CometChat.TypingIndicator(
            receiverId,
            receiverType,
            typingMetadata
          );
          CometChat.endTyping(typingNotification);
        } catch (error: any) {
          let cometchatException = new CometChat.CometChatException({
            message: error.message,
          });
          props.onError(cometchatException);
        }
      }
    };
    const editMessage = () => {
      try {
        const tmpMessageToBeEdited: any = messageToBeEdited.value;
        messageToBeEdited.value = null;
        textRef.value = "";
        let { receiverId, receiverType } = getReceiverDetails();
        let tmpMessageText = messageText.value.trim();
        let textMessage: CometChat.TextMessage = new CometChat.TextMessage(
          receiverId,
          tmpMessageText,
          receiverType
        );
        textMessage.setId(tmpMessageToBeEdited.id);
        closePreview();
        clearInputField();
        closePopovers();
        closeCustomPopOvers();
        CometChat.editMessage(textMessage)
          .then((message) => {
            messageSending = false;
            CometChatMessageEvents.ccMessageEdited.next({
              message: message,
              status: MessageStatus.success,
            });
          })
          .catch((error: any) => {
            messageSending = false;
            textMessage.setMetadata({
              error: error,
            });
            CometChatMessageEvents.ccMessageEdited.next({
              message: textMessage,
              status: MessageStatus.error,
            });
            if (props.onError) {
              let cometchatException = new CometChat.CometChatException({
                message: error.message,
              });
              props.onError(cometchatException);
            }
          });
      } catch (error: any) {
        let cometchatException = new CometChat.CometChatException({
          message: error.message,
        });
        props.onError(cometchatException);
      }
    };

    const inputChangeHandler = (event: any): void => {
      const handler =
        acceptHandlers[inputElementRef.value.accept] || onFileChange.bind(this);
      handler(event);
    };
    const playAudio = () => {
      if (props.customSoundForMessage) {
        CometChatSoundManager.play(
          CometChatSoundManager.Sound.outgoingMessage,
          props.customSoundForMessage
        );
      } else {
        CometChatSoundManager.play(CometChatSoundManager.Sound.outgoingMessage);
      }
    };
    const sendMessageOnEnter = (event: any) => {
      messageText.value = event.detail.value;
      if (sendTextMessage()) {
        showSendButton.value = false;
        clearInputField();
      }
    };
    const subscribeToEvents = () => {
      ccMessageEdit = CometChatMessageEvents.ccMessageEdited.subscribe(
        (object: IMessages) => {
          if (object?.status == MessageStatus.inprogress) {
            messageToBeEdited.value = object.message as CometChat.TextMessage;
            openEditPreview();
          }
        }
      );
      ccShowModal = CometChatUIEvents.ccShowModal.subscribe((data: IModal) => {
        createPollViewRef.value = data.child;
      });

      subHideModal = CometChatUIEvents.ccHideModal.subscribe(() => {
        createPollViewRef.value = undefined;
        closePopovers();
        closeCustomPopOvers();
      });
    };

    const openEditPreview = () => {
      clearInputField();
      showPreview.value = true;
      textRef.value = messageToBeEdited.value.getText();
    };

    const setComposerStyle = () => {
      let defaultStyle: MessageComposerStyle = new MessageComposerStyle({
        background: theme.value.palette.getAccent100(),
        border: `none`,
        height: "100%",
        width: "100%",
        borderRadius: "12px",
        attachIcontint: theme.value.palette.getAccent500(),
        sendIconTint: "#2fb5e9d1",
        emojiIconTint: theme.value.palette.getAccent500(),
        inputBackground: "transparent",
        inputBorder: "none",
        dividerTint: theme.value.palette.getAccent200(),
        textFont: fontHelper(theme.value.typography.subtitle1),
        textColor: theme.value.palette.getAccent(),
        ActionSheetSeparatorTint: theme.value.palette.getAccent200(),
        ActionSheetTitleColor: theme.value.palette.getAccent(),
        ActionSheetTitleFont: fontHelper(theme.value.typography.title1),
        ActionSheetLayoutModeIconTint: theme.value.palette.getPrimary(),
        emojiKeyboardTextFont: fontHelper(theme.value.typography.subtitle2),
        emojiKeyboardTextColor: theme.value.palette.getAccent400(),
        previewTitleFont: fontHelper(theme.value.typography.subtitle1),
        previewTitleColor: theme.value.palette.getAccent(),
        previewSubtitleFont: fontHelper(theme.value.typography.subtitle2),
        previewSubtitleColor: theme.value.palette.getAccent600(),
        closePreviewTint: theme.value.palette.getAccent500(),
        maxInputHeight: "100px",
      });
      messageComposerStyle = {
        ...defaultStyle,
        ...props.messageComposerStyle,
      };
    };

    const setTheme = () => {
      setComposerStyle();
      actionsheetStyle = {
        layoutModeIconTint:
          messageComposerStyle?.ActionSheetLayoutModeIconTint ||
          theme.value.palette.getAccent(),
        borderRadius: "inherit",
        background: theme.value.palette.getBackground(),
        border: "none",
        width: "100%",
        height: "100%",
        titleFont:
          messageComposerStyle?.ActionSheetTitleFont ||
          fontHelper(theme.value.typography.title2),
        titleColor:
          messageComposerStyle?.ActionSheetTitleColor ||
          theme.value.palette.getAccent(),
        ActionSheetSeparatorTint:
          messageComposerStyle?.ActionSheetSeparatorTint ||
          `1px solid ${theme.value.palette.getAccent400()}`,
      };
      messageInputStyle = {
        height: messageComposerStyle?.height || "100%",
        width: messageComposerStyle?.width || "100%",
        maxHeight: messageComposerStyle?.maxInputHeight || "100px",
        border:
          messageComposerStyle?.border ||
          `1px solid ${theme.value.palette.getAccent100()}`,
        borderRadius: messageComposerStyle?.borderRadius || "12px",
        background:
          messageComposerStyle?.background || theme.value.palette.getAccent50(),
        textFont:
          messageComposerStyle?.textFont ||
          fontHelper(theme.value.typography.text2),
        textColor:
          messageComposerStyle?.textColor || theme.value.palette.getAccent(),
        dividerColor:
          messageComposerStyle?.dividerTint ||
          theme.value.palette.getAccent100(),
        inputBorder: messageComposerStyle?.inputBorder || "none",
        inputBorderRadius: 0,
        inputBackground: messageComposerStyle?.inputBackground || "transparent",
      };
      sendButtonStyle.value = {
        height: "24px",
        width: "24px",
        border: "none",
        borderRadius: "0",
        buttonIconTint: theme.value.palette.getAccent500(),
        background: "transparent",
      };
      previewStyle = {
        height: "100%",
        width: "100%",
        border: `1px solid ${theme.value.palette.getAccent200()}`,
        background: theme.value.palette.getBackground(),
        previewTitleFont:
          messageComposerStyle?.previewTitleFont ||
          fontHelper(theme.value.typography.subtitle1),
        previewTitleColor:
          messageComposerStyle?.previewTitleColor ||
          theme.value.palette.getAccent400(),
        previewSubtitleColor:
          messageComposerStyle?.previewSubtitleColor ||
          theme.value.palette.getAccent400(),
        previewSubtitleFont:
          messageComposerStyle?.previewSubtitleFont ||
          fontHelper(theme.value.typography.subtitle2),
        closeButtonIconTint:
          messageComposerStyle?.closePreviewTint ||
          theme.value.palette.getAccent600(),
      };
      emojiButtonStyle = {
        height: "24px",
        width: "24px",
        border: "none",
        borderRadius: "0",
        buttonIconTint:
          messageComposerStyle?.emojiIconTint ||
          theme.value.palette.getAccent600(),
        background: "transparent",
      };
      emojiKeyboardStyle = {
        width: "100%",
        height: "100%",
        border: "none",
        textFont: fontHelper(theme.value.typography.caption1),
        textColor: theme.value.palette.getAccent(),
        background: theme.value.palette.getBackground(),
        borderRadius: "12px",
        activeIconTint: "#2196ec",
      };

      stickerKeyboardStyle = {
        width: "100%",
        height: "100%",
        border: "none",
        emptyStateTextFont: fontHelper(theme.value.typography.title1),
        emptyStateTextColor: theme.value.palette.getAccent600(),
        errorStateTextFont: fontHelper(theme.value.typography.title1),
        errorStateTextColor: theme.value.palette.getAccent600(),
        loadingIconTint: theme.value.palette.getAccent600(),
        background: theme.value.palette.getBackground(),
        borderRadius: "12px",
      };
      attachmentButtonStyle = {
        height: "24px",
        width: "24px",
        border: "none",
        borderRadius: "0",
        buttonIconTint:
          messageComposerStyle?.attachIcontint ||
          theme.value.palette.getAccent600(),
        background: "transparent",
      };
    };

    const getMessageInputStyle = () => {
      return messageInputStyle;
    };

    const getAttachmentButtonStyle = () => {
      return attachmentButtonStyle;
    };

    const openActionSheet = (event: any) => {
      closeCustomPopOvers();
      showActionSheetItem.value = !showActionSheetItem.value;
      if (showEmojiKeyboard.value) {
        emojiButtonRef.value.click();
        showEmojiKeyboard.value = !showEmojiKeyboard.value;
      }
      if (showStickerKeyboard.value) {
        stickerButtonRef.value.click();
        showStickerKeyboard.value = !showStickerKeyboard.value;
      } else {
        return;
      }
    };

    const handleActions = (event: any) => {
      let action: CometChatMessageComposerAction = event?.detail?.action;
      console.log(action);
      if (action.onClick) {
        action.onClick();
      }
    };

    const openEmojiKeyboard = (event: any) => {
      closeCustomPopOvers();
      showEmojiKeyboard.value = !showEmojiKeyboard.value;
      if (showActionSheetItem.value) {
        actionSheetRef.value.click();
        showActionSheetItem.value = !showActionSheetItem.value;
      }
      if (showStickerKeyboard.value) {
        stickerButtonRef.value.click();
        showStickerKeyboard.value = !showStickerKeyboard.value;
      } else {
        return;
      }
    };

    const customSendMethod = (message: string) => {
      messageText.value = message;
      if (sendTextMessage()) {
        showSendButton.value = false;
        clearInputField();
      }
    };

    const sendReaction = () => {
      try {
        const { receiverId, receiverType } = getReceiverDetails();
        let data = { LIVE_REACTION: props.LiveReactionIconURL };
        let transientMessage = new CometChat.TransientMessage(
          receiverId,
          receiverType,
          data
        );
        CometChat.sendTransientMessage(transientMessage);
        CometChatMessageEvents.ccLiveReaction.next(props.LiveReactionIconURL!);
      } catch (error: any) {
        let cometchatException = new CometChat.CometChatException({
          message: error.message,
        });
        if (props.onError) {
          props.onError(cometchatException);
        }
      }
      return;
    };

    const messageInputChanged = (event: any) => {
      const text = event?.detail?.value?.trim();
      sendButtonStyle.value = {
        height: "24px",
        width: "24px",
        border: "none",
        borderRadius: "0",
        buttonIconTint: text
          ? messageComposerStyle.sendIconTint
          : theme.value.palette.getAccent500(),
        background: "transparent",
      };
      showSendButton.value = true;
      if (props.onTextChange) {
        props.onTextChange(text);
      }
      messageText.value = text;
      if (text) {
        startTyping();
      } else {
        showSendButton.value = false;
      }
    };

    const getEmojiPopover = () => {
      return emojiPopover;
    };

    const startTyping = (timer = null, metadata = ""): void => {
      if (!props.disableTypingEvents) {
        try {
          let typingInterval = timer || 500;

          if (storeTypingInterval) {
            clearTimeout(storeTypingInterval);
            storeTypingInterval = null;
          } else {
            let { receiverId, receiverType } = getReceiverDetails();
            let typingMetadata = metadata || undefined;
            let typingNotification = new CometChat.TypingIndicator(
              receiverId,
              receiverType,
              typingMetadata
            );

            CometChat.startTyping(typingNotification);
          }
          storeTypingInterval = setTimeout(() => {
            endTyping();
          }, typingInterval);
        } catch (error: any) {
          let cometchatException = new CometChat.CometChatException({
            message: error.message,
          });
          props.onError(cometchatException);
        }
      }
    };

    const appendEmoji = (event: any) => {
      if (textRef.value === event?.detail.id) {
        textRef.value = "";
      }
      textRef.value = textRef.value + event?.detail.id;

      nextTick(() => {
        textRef.value = "";
      });
    };

    const getLiveReactionStyle = () => {
      return liveReactionStyle;
    };

    const getEmojiButtonStyle = () => {
      return emojiButtonStyle;
    };

    const getEmojiKeyboardStyle = () => {
      return emojiKeyboardStyle;
    };

    const getActionsheetStyle = () => {
      return actionsheetStyle;
    };
    const getPopoverStyle = () => {
      return popoverStyle;
    };

    const getStickerKeyboardStyle = () => {
      return stickerKeyboardStyle;
    };

    const getPreviewStyle = () => {
      return previewStyle;
    };

    const getAttachmentOptions = () => {
      return attachmentOptions;
    };

    const getWrapperStyle = () => {
      return {
        height: messageComposerStyle?.height || "100%",
        width: messageComposerStyle?.width || "100%",
      };
    };

    const closeCustomPopOvers = () => {
      for (let i = 0; i < componentRefs.length; i++) {
        componentRefs[i].onClick();
      }
    };

    /***Register all the vue auxiliary options onClick custom functions***/
    /***Can be used to close the other options when one is open***/

    const handleComponentEvents = (event: any) => {
      if (event.name == "register") {
        componentRefs[event.componentIndex] = {};
        componentRefs[event.componentIndex].onClick = event.onClick;
      }
      if (event.name == "open") {
        closePopovers();
        for (let i = 0; i < componentRefs.length; i++) {
          if (i != event.componentIndex && componentRefs[i]) {
            componentRefs[i].onClick();
          }
        }
      }
    };
    return {
      inputElementRef,
      sendReaction,
      customSendMethod,
      emojiButtonRef,
      actionSheetRef,
      emojiButtonStyle,
      emojiKeyboardStyle,
      inputRef,
      previewStyle,
      stickerKeyboardStyle,
      messageInputStyle,
      showStickerKeyboard,
      showPreview,
      messageToBeEdited,
      auxiliaryView,
      localize,
      showSendButton,
      sendButton,
      showEmojiKeyboard,
      sendButtonIconURL,
      sendButtonStyle,
      enableStickerKeyboard,
      sendMessageOnEnter,
      liveReactionStyle,
      emojiButtonIconURL,
      closeIconURL,
      stickerButtonIconURL,
      showActionSheetItem,
      auxilaryPlacement,
      emojiPopover,
      inputChangeHandler,
      popoverStyle,
      actionsheetStyle,
      attachmentButtonStyle,
      stickerButtonRef,
      closePreview,
      openActionSheet,
      handleActions,
      messageText,
      messageInputChanged,
      openEmojiKeyboard,
      appendEmoji,
      getMessageInputStyle,
      getAuxiliaryButtonAlignment,
      getAttachmentButtonStyle,
      getEmojiPopover,
      getLiveReactionStyle,
      getEmojiButtonStyle,
      getEmojiKeyboardStyle,
      getActionsheetStyle,
      getPopoverStyle,
      getStickerKeyboardStyle,
      getPreviewStyle,
      getAttachmentOptions,
      textRef,
      getWrapperStyle,
      createPollViewRef,
      defaultAuxiliaryOptions,
      handleComponentEvents,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cc-messagecomposer-wrapper__sendbutton,
.cc-messagecomposer-wrapper__livereaction {
  margin: 0 5px;
}

.cc-messagecomposer-wrapper {
  height: 100%;
  width: 100%;
  position: relative;
  text-align: left;
}
.cc-messagecomposer-wrapper__headerview {
  height: fit-content;
  width: 95.9%;
  bottom: 120%;
  margin: 0rem 0rem 0rem 1rem;
}
.cc-messagecomposer-mediainput {
  display: none;
}
.cc-messagecomposer-wrapper__auxilary {
  display: flex;
  gap: 8px;
}
</style>
