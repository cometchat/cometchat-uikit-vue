<template>
  <ul :style="styles.conversationActionStyle" class="list__item__actions">
    <li>
      <button 
        type="button"
        :style="styles.groupButtonStyle" 
        class="group__button button__delete"
        @click="deleteConversation($event)"
      ></button>
    </li>
  </ul>
</template>

<script>

import { DEFAULT_OBJECT_PROP } from "../../../resources/constants";
import { propertyCheck } from "../../../mixins/";
import * as style from "./style";
import { CometChatEvent } from '../../../util/CometChatEvent';
import { EVENTS } from '../../../util/enums';
import loadingIcon from "./resources/progress.svg";
import deleteIcon from "./resources/delete.svg";

/**
 * 
 *
 * @displayName cometchatConversationListActions
 */
export default {
  name: "cometchatConversationListActions",
  mixins: [propertyCheck],
  props: {
    /**
     * Theme of the UI.
     */
    theme: { ...DEFAULT_OBJECT_PROP },
    /**
     * Conversation.
     */
    conversation: { ...DEFAULT_OBJECT_PROP },
  },
  data() {
    return {
      deleteInProgress: false
    }
  },
  computed: {
    /**
     * Computed styles for the component.
     */ styles() {
      return {
        conversationActionStyle: style.conversationActionStyle(this.theme),
        groupButtonStyle: style.groupButtonStyle(this.deleteInProgress, loadingIcon, deleteIcon),
      };
    },
  },
  methods: {
    /**
     * Jump to new messages
     */
    deleteConversation(event) {
      event.stopPropagation();
      CometChatEvent.triggerHandler(EVENTS["DELETE_CONVERSATION"], this.conversation)
    },
  },
};
</script>