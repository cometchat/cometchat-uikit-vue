import CometChatConversations from '../CometChatWorkspace/src/components/Chats/CometChatConversations/CometChatConversations';

export default {
  title: 'UI Kit/Chats/CometChatConversations',
  component: CometChatConversations,
};

const Template = (args) => ({
  components: {CometChatConversations},
  setup() {
    return { args };
  },
  template: '<comet-chat-conversations v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = {
};