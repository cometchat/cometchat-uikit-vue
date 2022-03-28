export const CometChatConversationConstants = {
    conversationObject: {
        conversationId: "conversationId",
        conversationType: "conversationType",
        conversationWith: "conversationWith",
        lastMessage: "lastMessage",
        unreadMessageCount: "unreadMessageCount",
    },
    conversationType: {
        both: "both",
        users: "users",
        groups: "groups"
    },
    conversationOptions: {
        delete: "delete",
        tag: "tag",
        pin: "pin"
    },
    inputData: {
        id: "conversationId",
        thumbnail: ["avatar", "icon"], //conversationWith
        status: ["status", "type"], //conversationWith
        title: "name", //conversationWith
        subtitle: "lastMessage",
        time: "lastMessage.sentAt",
        unreadCount: "unreadMessageCount"
    },
    cometChatCustomMessageTypes: {
        poll: "extension_poll",
        sticker: "extension_sticker",
        document: "extension_document",
        whiteboard: "extension_whiteboard",
        meeting: "meeting",
        location: "location",
    },
}