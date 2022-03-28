<template>
  <div
    class="list__item--hover"
    :style="styles.listItem"
    @click="emitEvent('click', user)"
  >
    <div :style="styles.itemThumbnail">
      <comet-chat-avatar
        border-width="1px"
        corner-radius="50%"
        :user="user"
        :border-color="theme.borderColor.primary"
      />
      <comet-chat-status-indicator
        border-width="1px"
        corner-radius="50%"
        :status="status || user.status"
        :border-color="theme.borderColor.primary"
      />
    </div>
    <div :style="styles.itemDetail">
      <div
        :style="styles.itemName"
        @mouseenter="toggleTooltip($event, true)"
        @mouseleave="toggleTooltip($event, false)"
      >
        {{ getTitle }}
      </div>
      <div :style="styles.itemDescription"></div>
    </div>
  </div>
</template>
<script>
import { DEFAULT_OBJECT_PROP, DEFAULT_STRING_PROP } from "../../../resources/constants";

import { tooltip, cometChatCommon } from "../../../mixins";

import { CometChatAvatar, CometChatStatusIndicator } from "../../Shared/";

import * as style from "./style";

/**
 * List item for user list.
 *
 * @displayName CometChatUserListItem
 */
export default {
  name: "CometChatUserListItem",
  mixins: [tooltip, cometChatCommon],
  components: {
    CometChatAvatar,
    CometChatStatusIndicator,
  },
  props: {
    /**
     * User object.
     */
    user: { ...DEFAULT_OBJECT_PROP, default: null },
    /**
     * Theme of the UI.
     */
    theme: { ...DEFAULT_OBJECT_PROP },
    /**
     * Selected user in the list.
     */
    selectedUser: { ...DEFAULT_OBJECT_PROP },
    /**
     * title.
     */
    title: { ...DEFAULT_STRING_PROP, default: "" },
    /**
     * titleColor.
     */
    titleColor: { ...DEFAULT_STRING_PROP, default: "#141414" },
    /**
     * titleFont.
     */
    titleFont: { ...DEFAULT_STRING_PROP, default: "600 15px Inter" },
    /**
     * subTitle.
     */
    subTitle: { ...DEFAULT_STRING_PROP, default: "" },
    /**
     * subTitleColor.
     */
    subTitleColor: { ...DEFAULT_STRING_PROP, default: "rgba(20, 20, 20, 0.8)" },
    /**
     * subTitleFont.
     */
    subTitleFont: { ...DEFAULT_STRING_PROP, default: "400 13px Inter" },
    /**
     * backgroundColor.
     */
    backgroundColor: { ...DEFAULT_STRING_PROP, default: "#ffffff" },
    /**
     * status.
     */
    status: { ...DEFAULT_STRING_PROP, default: "" },
    /**
     * avatar.
     */
    avatar: { ...DEFAULT_STRING_PROP, default: "" },
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        itemName: style.itemNameStyle(this),
        itemDetail: style.itemDetailStyle(),
        itemThumbnail: style.itemThumbnailStyle(),
        itemDescription: style.itemDescriptionStyle(this),
        listItem: style.listItemStyle(this),
      };
    },
    getTitle() {
      let title = null;
      if(this.title && this.title.length) {
        title = this.title;
      } else {
        if (!this.user) {
          return null;
        }

        if (!this.user.name) {
          return null;
        }

        title = this.user.name;
      }

      return title
    }
  },
};
</script>
<style scoped>
.list__item--hover:hover {
  background-color: var(--list-item-bg-color-hover);
}
</style>