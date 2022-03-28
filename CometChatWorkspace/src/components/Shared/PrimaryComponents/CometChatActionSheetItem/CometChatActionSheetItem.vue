<template>
  <div
    class="sheet__item"
    :style="styles.actionSheetItemWrapperStyle"
    @click="onActionItemClick(action)"
  >
    <div class="item__iconbackground" :style="styles.IconBackgroundStyle">
      <span class="item__icon" :style="styles.IconStyle" :title="title"></span>
    </div>
    <div class="item__title" :style="styles.actionSheetItemTitleStyle">
      {{ title }}
    </div>
  </div>
</template>

<script>
import { DEFAULT_OBJECT_PROP } from "../../SecondaryComponents/CometChatStatusIndicator/resources/constants";
import {
  DEFAULT_FUNCTION_PROP,
  DEFAULT_STRING_PROP,
} from "./resources/constants";

import * as style from "./style";

/**
 * Shared component.
 *
 * @displayName CometChatActionSheetItem
 */
export default {
  name: "CometChatActionSheetItem",
  props: {
    id: { ...DEFAULT_STRING_PROP, default: "uploadphoto" },
    width: { ...DEFAULT_STRING_PROP, default: "50px" },
    height: { ...DEFAULT_STRING_PROP, default: "70px" },
    cornerRadius: { ...DEFAULT_STRING_PROP, default: "10px" },
    background: { ...DEFAULT_STRING_PROP, default: "#eee" },
    border: { ...DEFAULT_STRING_PROP, default: "0 none" },
    title: { ...DEFAULT_STRING_PROP, default: "Upload photo" },
    titleFont: { ...DEFAULT_STRING_PROP, default: "13px 400 Inter" },
    titleColor: { ...DEFAULT_STRING_PROP, default: "#141414" },
    iconURL: { ...DEFAULT_STRING_PROP, default: "" },
    iconTint: { ...DEFAULT_STRING_PROP, default: "white" },
    iconBackground: { ...DEFAULT_STRING_PROP, default: "rgb(105, 41, 202)" },
    iconCornerRadius: { ...DEFAULT_STRING_PROP, default: "10px" },
    onActionItemClick: { ...DEFAULT_FUNCTION_PROP, default: () => {} },
    style: { ...DEFAULT_OBJECT_PROP, default: {} },
    action: { ...DEFAULT_OBJECT_PROP, default: {} },
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        actionSheetItemWrapperStyle: style.actionSheetItemWrapperStyle(this),
        IconBackgroundStyle: style.IconBackgroundStyle(this),
        IconStyle: style.IconStyle(this),
        actionSheetItemTitleStyle: style.actionSheetItemTitleStyle(this),
      };
    },
  },
};
</script>