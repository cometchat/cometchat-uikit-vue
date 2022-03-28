<template>
  <div
    :style="styles.list"
    class="group__item--hover"
    @click="emitEvent('click', group)"
  >
    <div :style="styles.thumbnail">
      <comet-chat-avatar
        border-width="1px"
        corner-radius="50%"
        :group="group"
        v-if="group"
        :border-color="theme.borderColor.primary"
      />
      <comet-chat-avatar
        border-width="1px"
        corner-radius="50%"
        :image="avatar"
        v-if="avatar"
        :border-color="theme.borderColor.primary"
      />
    </div>
    <div :style="styles.detail">
      <div
        :style="styles.nameWrapper"
        @mouseenter="toggleTooltip($event, true)"
        @mouseleave="toggleTooltip($event, false)"
      >
        <div :style="styles.name">
          {{ getTitle.title }}
        </div>
        <i
          :style="styles.icon"
          :title="this.getTitle.groupTypeText"
        />
      </div>
      <div :style="styles.description">{{ getSubTitle }}</div>
    </div>
  </div>
</template>
<script>
import {
  COMETCHAT_CONSTANTS,
  DEFAULT_OBJECT_PROP,
  DEFAULT_STRING_PROP,
} from "../../../resources/constants";

import { tooltip, cometChatCommon } from "../../../mixins";

import { CometChatAvatar } from "../../Shared";

import shieldIcon from "./resources/password-protected-group.svg";
import lockIcon from "./resources/private-group.svg";


import * as style from "./style";
import { CometChat } from '@cometchat-pro/chat';

/**
 * List item for group list.
 *
 * @displayName CometChatGroupListItem
 */
export default {
  name: "CometChatGroupListItem",
  mixins: [tooltip, cometChatCommon],
  components: {
    CometChatAvatar,
  },
  props: {
    /**
     * Group item.
     */
    group: { ...DEFAULT_OBJECT_PROP, default: {} },
    /**
     * Theme of the UI.
     */
    theme: { ...DEFAULT_OBJECT_PROP },
    /**
     * Selected group item.
     */
    selectedGroup: { ...DEFAULT_OBJECT_PROP, default: {} },
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
    subTitleColor: { ...DEFAULT_STRING_PROP, default: "rgba(20, 20, 20, 0.6)" },
    /**
     * subTitleFont.
     */
    subTitleFont: { ...DEFAULT_STRING_PROP, default: "400 13px Inter" },
    /**
     * backgroundColor.
     */
    backgroundColor: { ...DEFAULT_STRING_PROP, default: "#ffffff" },
    /**
     * avatar.
     */
    avatar: { ...DEFAULT_STRING_PROP, default: "" },
    /**
     * width.
     */
    width: { ...DEFAULT_STRING_PROP, default: "100%" },
    /**
     * height.
     */
    height: { ...DEFAULT_STRING_PROP, default: "auto" },
    /**
     * borderWidth.
     */
    borderWidth: { ...DEFAULT_STRING_PROP, default: "1px" },
    /**
     * borderStyle.
     */
    borderStyle: { ...DEFAULT_STRING_PROP, default: "solid" },
    /**
     * borderColor.
     */
    borderColor: { ...DEFAULT_STRING_PROP, default: "rgba(20, 20, 20, 10%)" },
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        name: style.itemNameStyle(),
        detail: style.itemDetailStyle(),
        icon: style.listItemIconStyle(this.getTitle.groupTypeIcon, this),
        thumbnail: style.itemThumbnailStyle(),
        nameWrapper: style.itemNameWrapperStyle(this),
        description: style.itemDescriptionStyle(this),
        list: style.listItemStyle(this),
      };
    },
    /**
     * Icon for group types.
     */
    groupTypeIcons() {
      return { shieldIcon, lockIcon };
    },
    /**
     * Description of group.
     */
    groupDescription() {
      return `${this.group.membersCount} members`;
    },
    /**
     * Local string constants.
     */
    STRINGS() {
      return COMETCHAT_CONSTANTS;
    },
    getSubTitle() {

      let subTitle = null;
      if(this.subTitle && this.subTitle.length) {
        subTitle = this.subTitle; 
      } else {
        if (!this.group) {
          return null;
        }

        if (!this.group.membersCount) {
          return null;
        }

        subTitle = this.group.membersCount; 
      }

      if(subTitle) {
        subTitle = `${subTitle} members`;
      }

      return subTitle;
    },
    getTitle() {
      let title = null;
      let groupTypeIcon = null;
      let groupTypeText = null;
        
      if (this.title && this.title.length) {
        title = this.title;
      } else {
        if (!this.group) {
          return null;
        }

        if (!this.group.name) {
          return null;
        }

        title = this.group.name;
      }

      if (title) {
        if (this.group.type === CometChat.GROUP_TYPE.PRIVATE) {
          groupTypeIcon = shieldIcon;
          groupTypeText = this.STRINGS.PRIVATE_GROUP;
        } else if (this.group.type === CometChat.GROUP_TYPE.PASSWORD) {
          groupTypeIcon = lockIcon;
          groupTypeText = this.STRINGS.PROTECTED_GROUP;
        }
      }

      return {
        title: title,
        groupTypeIcon: groupTypeIcon,
        groupTypeText: groupTypeText
      };
    },
  }
};
</script>
<style scoped>
.group__item--hover:hover {
  background-color: var(--group-item-bg-color-hover);
}
</style>
