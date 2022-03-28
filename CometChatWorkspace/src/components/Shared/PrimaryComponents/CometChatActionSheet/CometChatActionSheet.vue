<template>
  <div class="action__sheet" :style="styles.actionSheetWrapperStyle">
    <div class="sheet__header" :style="styles.actionSheetHeaderStyle">
      <div class="sheet__title" :style="styles.actionSheetTitleStyle">
        {{ title }}
      </div>

      <div
        v-if="!hideLayoutMode"
        class="sheet__layout"
        :style="styles.actionSheetLayoutIconStyle"
        :onClick="toggleLayoutMode"
      ></div>
    </div>
    <div
      v-for="(action, i) in actions"
      :key="action.id"
      class="sheet__items"
      :style="styles.sheetItemListStyle"
    >
      <CometChatActionSheetItem
        :key="i"
        :id="action.id"
        :iconURL="action.iconURL"
        :iconBackground="'transparent'"
        :title="action.title"
        :iconTint="sheetItemProps(i).actionItemIconTint"
        :titleFont="sheetItemProps(i).actionItemFont"
				:titleColor="sheetItemProps(i).actionItemColor"
				:width="sheetItemProps(i).width"
        :height="sheetItemProps(i).height"
        :style="sheetItemProps(i).sheetItemStyle"
				:onActionItemClick="action.onActionItemClick"
        :action="action"
      />
    </div>
  </div>
</template>

<script>
import {
  DEFAULT_STRING_PROP,
} from "./resources/constants";
import { layoutType } from "./layoutType";
import toggleLayoutIcon from "./resources/file-upload.svg";
import * as style from "./style";
import {
  DEFAULT_ARRAY_PROP,
  DEFAULT_OBJECT_PROP,
} from "../../SecondaryComponents/CometChatAvatar/resources/constants";
import { DEFAULT_BOOLEAN_PROP } from "../../../../resources/constants";
import CometChatActionSheetItem from "../CometChatActionSheetItem/CometChatActionSheetItem";

/**
 * Shared component.
 *
 * @displayName CometChatActionSheet
 */
export default {
  name: "CometChatActionSheet",
  components: {
    CometChatActionSheetItem,
  },
  data() {
    return {
      currentLayout: this.layoutMode,
    };
  },
  props: {
    layoutMode: { ...DEFAULT_STRING_PROP, default: layoutType["grid"] },
    hideLayoutMode: { ...DEFAULT_BOOLEAN_PROP, default: false },
    layoutModeIconURL: { ...DEFAULT_STRING_PROP, default: toggleLayoutIcon },
    layoutModeIconTint: {
      ...DEFAULT_STRING_PROP,
      default: "rgba(20, 20, 20, 0.04)",
    },
    cornerRadius: { ...DEFAULT_STRING_PROP, default: "8px" },
    background: { ...DEFAULT_STRING_PROP, default: "white" },
    border: { ...DEFAULT_STRING_PROP, default: "0 none" },
    width: { ...DEFAULT_STRING_PROP, default: "290px" },
    height: { ...DEFAULT_STRING_PROP, default: "408px" },
    title: { ...DEFAULT_STRING_PROP, default: "" },
    titleFont: {
      ...DEFAULT_STRING_PROP,
      default: "15px 600 Inter, sans-serif",
    },
    titleColor: { ...DEFAULT_STRING_PROP, default: "#141414" },
    style: { ...DEFAULT_OBJECT_PROP, default: {} },
    actions: { ...DEFAULT_ARRAY_PROP, default: [] },
    theme: {...DEFAULT_OBJECT_PROP, default: {}},
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        actionSheetWrapperStyle: style.actionSheetWrapperStyle(this),
        actionSheetHeaderStyle: style.actionSheetHeaderStyle(this),
        actionSheetTitleStyle: style.actionSheetTitleStyle(this),
        actionSheetLayoutIconStyle: style.actionSheetLayoutIconStyle(this),
        sheetItemListStyle: style.sheetItemListStyle(this.currentLayout),
      };
    },
  },
  methods: {
    toggleLayoutMode() {
      const newMode =
        this.currentLayout === layoutType.list
          ? layoutType.grid
          : layoutType.list;
      this.currentLayout = newMode;
    },
    sheetItemProps(key) {
      let data = {
        height: "auto",
        width: "100%",
        cornerRadius: "10px",
        borderBottom: {},
        sheetItemStyle: {
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          margin: "0",
        },
        actionItemFont: "15px 400 Inter",
        actionItemColor: "#141414",
        actionItemIconTint: "#6929CA",
      };

      if (this.currentLayout === layoutType.grid) {
        data.width = "120px";
        data.height = "100px";

        data.sheetItemStyle = {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "4px 4px",
          borderRadius: "10px",
        };
      }

      if (this.currentLayout === layoutType.list) {
        data.cornerRadius = { borderRadius: "0" };
        data.borderBottom = { borderBottom: "1px solid rgba(20, 20, 20, 0.08)" };

        if (key === 0) {
          data.cornerRadius = { borderRadius: "10px 10px 0 0" };
        } else if (key === this.actions.length - 1) {
          data.cornerRadius = { borderRadius: "0 0 10px 10px" };
          data.borderBottom = { borderBottom: "0 none" };
        }

        data.sheetItemStyle = {
          ...data.sheetItemStyle,
          ...data.cornerRadius,
          ...data.borderBottom,
        };
      }

      return data;
    },
  },
};
</script>