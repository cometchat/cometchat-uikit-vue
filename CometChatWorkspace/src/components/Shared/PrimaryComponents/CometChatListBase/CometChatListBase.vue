<template>
  <div
    :style="styles.listBaseStyle"
    class="cometchat__listbase"
    :dir="getDir()"
  >
    <div :style="styles.listBaseHeadStyle" class="listbase__header">
      <div :style="styles.listBaseNavStyle" class="listbase__nav">
        <div
          class="header__close"
          v-if="showBackButton"
          :style="styles.backButtonStyle"
        >
          <img :src="style.backIconURL" alt="Back" />
        </div>

        <div :style="styles.listBaseTitleStyle" class="listbase__title">
          {{ title }}
        </div>
      </div>

      <div
        :style="styles.listBaseSearchStyle"
        v-if="!hideSearch"
        class="listbase__search"
      >
        <button
          type="button"
          class="listbase__search__button"
          :style="styles.listBaseSearchButtonStyle"
        ></button>

        <input
          type="text"
          autocomplete="off"
          :style="styles.listBaseSearchInputStyle"
          class="listbase__search__input"
          :placeholder="searchPlaceholder"
          :dir="getDir()"
          @input="onSearch"
        />
      </div>
    </div>

    <div :style="styles.listBaseContainerStyle" class="listbase__container">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import {
  DEFAULT_STRING_PROP,
  DEFAULT_BOOLEAN_PROP,
  DEFAULT_OBJECT_PROP,
  DEFAULT_FUNCTION_PROP
} from "./resources/constants";

import * as style from "./style";
import backIcon from "./resources/back.svg";
import searchIcon from "./resources/search.svg";
import { CometChatLocalize } from "../CometChatLocalize";

/**
 * CometChatListBase is a component useful when presenting a list of items.
 * This component displays list of items, title, and supports style along with back button, and search and filtering of list items.
 *
 * @version 1.0.0
 * @author CometChat
 * @displayName CometChatListBase
 */
export default {
  name: "CometChatListBase",
  props: {
    /** Title of the list */
    title: { ...DEFAULT_STRING_PROP, default: "Title" },
    /** Title of the list */
    searchPlaceholder: { ...DEFAULT_STRING_PROP, default: "Search" },
    /** Callback function when a search text is entered */
    onSearch: { ...DEFAULT_FUNCTION_PROP, default: () => {} },
    /** Style for the component */
    style: {
      ...DEFAULT_OBJECT_PROP,
      default: {
        width: "100%",
        height: "100%",
        border: "1px solid #808080",
        cornerRadius: "0",
        background: "white",
        titleFont: "700 22px Inter, sans-serif",
        titleColor: "#141414",
        backIconURL: backIcon,
        backIconTint: "#3399FF",
        searchBorder: "none",
        searchCornerRadius: "8px",
        searchBackground: 'rgba("#141414", 40%)',
        searchTextFont: "400 15px Inter, sans-serif",
        searchTextColor: "#141414",
        searchIconURL: searchIcon,
        searchIconTint: "#3399FF",
      },
    },
    /** Enable back button */
    showBackButton: { ...DEFAULT_BOOLEAN_PROP, default: false },
    /** Enable search */
    hideSearch: { ...DEFAULT_BOOLEAN_PROP, default: false },
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        listBaseStyle: style.listBaseStyle(this),
        listBaseHeadStyle: style.listBaseHeadStyle(this),
        listBaseNavStyle: style.listBaseNavStyle(this),
        listBaseTitleStyle: style.listBaseTitleStyle(this),
        listBaseContainerStyle: style.listBaseContainerStyle(this),
        listBaseSearchStyle: style.listBaseSearchStyle(this),
        listBaseSearchButtonStyle: style.listBaseSearchButtonStyle(this),
        listBaseSearchInputStyle: style.listBaseSearchInputStyle(this),
        backButtonStyle: style.backButtonStyle(this),
      };
    },
  },
  methods: {
    /**
     * Handles emitted action events
     */
    actionHandler({ action, ...rest }) {
      this.emitAction(action, { ...rest });
    },
    getDir() {
      CometChatLocalize.getDir();
    },
  },
};
</script>