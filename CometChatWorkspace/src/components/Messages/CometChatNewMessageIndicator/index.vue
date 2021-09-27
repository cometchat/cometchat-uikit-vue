<template>
  <div :style="styles.messagePaneTopStyle" class="message_pane__top">
    <div :style="styles.messagePaneBannerStyle" class="message_pane__banner">
      <div :style="styles.messagePaneUnreadBannerStyle" class="message_pane__unread_banner__banner">
        <button 
          :style="styles.messagePaneUnreadBannerMessageStyle" 
          class="message_pane__unread_banner__msg"
          @click="jumpToMessages"
        >
          <span :style="styles.iconArrowDownStyle" class="icon--arrow-down">
            &#x2193;
          </span>
          {{unreadMessages.length}} {{unreadMessages.length > 1 ? 'new messages' : 'new message' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import { DEFAULT_ARRAY_PROP, DEFAULT_OBJECT_PROP } from "../../../resources/constants";
import { propertyCheck, cometChatBubbles } from "../../../mixins/";
import * as style from "./style";
import { CometChatEvent } from '../../../util/CometChatEvent';
import { EVENTS } from '../../../util/enums';

/**
 * Shows the new message marker if the user has scrolled up and there are unread messages.
 *
 * @displayName cometchatNewMessageIndicator
 */
export default {
  name: "cometchatNewMessageIndicator",
  mixins: [propertyCheck, cometChatBubbles],
  props: {
    /**
     * Theme of the UI.
     */
    theme: { ...DEFAULT_OBJECT_PROP },
    /**
     * unreadMessages
     */
    unreadMessages: { ...DEFAULT_ARRAY_PROP },
  },
  computed: {
    /**
     * Computed styles for the component.
     */ styles() {
      return {
        messagePaneTopStyle: style.messagePaneTopStyle(),
        messagePaneBannerStyle: style.messagePaneBannerStyle(this.theme),
        messagePaneUnreadBannerStyle: style.messagePaneUnreadBannerStyle(),
        messagePaneUnreadBannerMessageStyle: style.messagePaneUnreadBannerMessageStyle(this.theme),
        iconArrowDownStyle: style.iconArrowDownStyle(),
      };
    },
  },
  methods: {
    /**
     * Jump to new messages
     */
    jumpToMessages() {
      CometChatEvent.triggerHandler(EVENTS["NEW_MESSAGE_CLICKED"], [])
    },
  }
};
</script>
<style scoped>
.message__timestamp__img {
  margin-left: 3px;
  display: inline-block;
  vertical-align: bottom;
}
</style>