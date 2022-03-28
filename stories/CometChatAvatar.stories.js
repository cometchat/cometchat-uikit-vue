import {CometChatAvatar} from '../CometChatWorkspace/src/components/Shared';

const avatarObj = {
  "uid": "superhero2",
  "name": "Captain America",
  "avatar": "https://data-us.cometchat.io/assets/images/avatars/captainamerica.png",
  "status": "offline",
  "role": "default",
  "lastActiveAt": 1638453032,
  "conversationId": "superhero1_user_superhero2"
}

export default {
  title: 'UI Kit/Shared/Secondary Components/CometChatAvatar',
  component: CometChatAvatar,
};

const Template = (args) => ({
  components: {CometChatAvatar },
  setup() {
    return { args };
  },
  template: '<div><comet-chat-avatar v-bind="args" /></div>',
});

export const Primary = Template.bind({});