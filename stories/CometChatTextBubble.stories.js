import CometChatTextBubble from '../CometChatWorkspace/src/components/Messages/CometChatTextBubble/CometChatTextBubble';

const Obj = {
  "receiverId": "superhero2",
  "type": "text",
  "receiverType": "user",
  "category": "message",
  "data": {
      "text": "Hello Cap",
      "resource": "WEB-3_0_2_beta1-60e4e165-2f54-43bb-8132-bd9ad20b8410-1638548580084",
      "entities": {
          "sender": {
              "entity": {
                  "uid": "superhero1",
                  "name": "Iron Man",
                  "avatar": "https://data-us.cometchat.io/assets/images/avatars/ironman.png",
                  "status": "available",
                  "role": "default",
                  "lastActiveAt": 1638548581
              },
              "entityType": "user"
          },
          "receiver": {
              "entity": {
                  "uid": "superhero2",
                  "name": "Captain America",
                  "avatar": "https://data-us.cometchat.io/assets/images/avatars/captainamerica.png",
                  "status": "offline",
                  "role": "default",
                  "lastActiveAt": 1638453032,
                  "conversationId": "superhero1_user_superhero2"
              },
              "entityType": "user"
          }
      }
  },
  "text": "Hello Cap",
  "id": "79",
  "conversationId": "superhero1_user_superhero2",
  "sender": {
      "hasBlockedMe": false,
      "blockedByMe": false,
      "uid": "superhero1",
      "name": "Iron Man",
      "avatar": "https://data-us.cometchat.io/assets/images/avatars/ironman.png",
      "lastActiveAt": 1638548581,
      "role": "default",
      "status": "online"
  },
  "receiver": {
      "hasBlockedMe": false,
      "blockedByMe": false,
      "uid": "superhero2",
      "name": "Captain America",
      "avatar": "https://data-us.cometchat.io/assets/images/avatars/captainamerica.png",
      "lastActiveAt": 1638453032,
      "role": "default",
      "status": "offline"
  },
  "sentAt": 1638549471,
  "updatedAt": 1638549471,
  "rawMessage": {
      "id": "79",
      "conversationId": "superhero1_user_superhero2",
      "sender": "superhero1",
      "receiverType": "user",
      "receiver": "superhero2",
      "category": "message",
      "type": "text",
      "data": {
          "text": "Hello Cap",
          "resource": "WEB-3_0_2_beta1-60e4e165-2f54-43bb-8132-bd9ad20b8410-1638548580084",
          "entities": {
              "sender": {
                  "entity": {
                      "uid": "superhero1",
                      "name": "Iron Man",
                      "avatar": "https://data-us.cometchat.io/assets/images/avatars/ironman.png",
                      "status": "available",
                      "role": "default",
                      "lastActiveAt": 1638548581
                  },
                  "entityType": "user"
              },
              "receiver": {
                  "entity": {
                      "uid": "superhero2",
                      "name": "Captain America",
                      "avatar": "https://data-us.cometchat.io/assets/images/avatars/captainamerica.png",
                      "status": "offline",
                      "role": "default",
                      "lastActiveAt": 1638453032,
                      "conversationId": "superhero1_user_superhero2"
                  },
                  "entityType": "user"
              }
          }
      },
      "sentAt": 1638549471,
      "updatedAt": 1638549471
  },
  "_id": "_036262fq8",
  "messageFrom": "sender"
}

export default {
  title: 'UI Kit/Messages/CometChatTextBubble',
  component: CometChatTextBubble,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => ({
  components: {CometChatTextBubble },
  setup() {
    return { args };
  },
  template: '<comet-chat-text-bubble v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = {
    primary: true,
    message: Obj
};