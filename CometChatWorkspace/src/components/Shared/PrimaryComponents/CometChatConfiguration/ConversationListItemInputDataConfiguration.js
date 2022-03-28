const ConversationListItemInputDataConfiguration = function () {
	this.id = "conversationId", 
	this.thumbnail = ["avatar", "icon"], //conversationWith
	this.status = ["status", "type"], //conversationWith
	this.title = "name", //conversationWith
	this.subtitle = "lastMessage", 
	this.time = "lastMessage.sentAt",
	this.unreadCount = "unreadMessageCount"
};

export { ConversationListItemInputDataConfiguration };