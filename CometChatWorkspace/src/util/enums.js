export const USER_JOINED = "onUserJoined";
export const USER_LEFT = "onUserLeft";

export const TEXT_MESSAGE_RECEIVED = "onTextMessageReceived";
export const MEDIA_MESSAGE_RECEIVED = "onMediaMessageReceived";
export const CUSTOM_MESSAGE_RECEIVED = "onCustomMessageReceived";
export const MESSAGE_DELIVERED = "onMessagesDelivered";
export const MESSAGE_READ = "onMessagesRead";
export const MESSAGE_DELETED = "onMessageDeleted";
export const MESSAGE_EDITED = "onMessageEdited";

export const INCOMING_CALL_RECEIVED = "onIncomingCallReceived";
export const OUTGOING_CALL_ACCEPTED = "onOutgoingCallAccepted";
export const OUTGOING_CALL_REJECTED = "onOutgoingCallRejected";
export const INCOMING_CALL_CANCELLED = "onIncomingCallCancelled";

export const CALL_ENDED = "onCallEnded";

export const GROUP_MEMBER_SCOPE_CHANGED = "onGroupMemberScopeChanged";
export const GROUP_MEMBER_KICKED = "onGroupMemberKicked";
export const GROUP_MEMBER_BANNED = "onGroupMemberBanned";
export const GROUP_MEMBER_UNBANNED = "onGroupMemberUnbanned";
export const GROUP_MEMBER_ADDED = "onMemberAddedToGroup";
export const GROUP_MEMBER_LEFT = "onGroupMemberLeft";
export const GROUP_MEMBER_JOINED = "onGroupMemberJoined";

export const USER_ONLINE = "onUserOnline";
export const USER_OFFLINE = "onUserOffline";

export const TYPING_STARTED = "onTypingStarted";
export const TYPING_ENDED = "onTypingEnded";
export const TRANSIENT_MESSAGE_RECEIVED = "onTransientMessageReceived";

export const CATEGORY_MESSAGE = "message";
export const MESSAGE_TYPE_TEXT = "text";
export const MESSAGE_TYPE_IMAGE = "image";
export const MESSAGE_TYPE_VIDEO = "video";
export const MESSAGE_TYPE_AUDIO = "audio";
export const MESSAGE_TYPE_FILE = "file";

export const CATEGORY_CUSTOM = "custom";
export const CUSTOM_TYPE_POLL = "extension_poll";
export const CUSTOM_TYPE_STICKER = "extension_sticker";
export const CUSTOM_TYPE_DOCUMENT = "extension_document";

export const CATEGORY_ACTION = "action";
export const ACTION_TYPE_GROUPMEMBER = "groupMember";
export const ACTION_TYPE_MESSAGE = "message";

export const CATEGORY_CALL = "call";
export const CALL_TYPE_AUDIO = "audio";
export const CALL_TYPE_VIDEO = "video";

export const LIVE_REACTION_KEY = "live_reaction";
export const LIVE_REACTIONS = {
  heart: "heart",
  thumbsup: "👍",
  clap: "👏",
  wink: "😉",
};

export const LIVE_REACTION_TIMER = 1500;
export const MAX_MESSAGE_COUNT = 100;
export const MESSAGE_REQUEST_LIMIT = 30;
export const FILE_METADATA = "file";

export const EVENTS = {
  NEW_MESSAGES: "newMessagesArrived",
  NEW_MESSAGES_TRIGGERED: "newMessagesTriggered",
  REFRESHING_MESSAGES: "refreshingMessages",
  CLEAR_UNREAD_MESSAGES: "clearUnreadMessages",
  CLEAR_UNREAD_MESSAGES_TRIGGERED: "clearUnreadMessagesTriggered",
  NEW_MESSAGE_CLICKED: "newMessageClicked",
  MESSAGE_COMPOSED: "messageComposed",
	THREAD_MESSAGE_COMPOSED: "threadMessageComposed",
  MESSAGE_SENT: "messageSent",
	THREAD_MESSAGE_SENT: "threadMessageSent",
  ERROR_IN_SENDING_MESSAGE: "errorInSendingMessage",
  ERROR_IN_SENDING_THREAD_MESSAGE: "errorInSendingThreadMessage",
  UPDATED_LAST_MESSAGES: "updateLastMessage",
  DELETE_CONVERSATION: "deleteConversation",
  CONFIRM_RESPONSE: "confirmResponse",
}