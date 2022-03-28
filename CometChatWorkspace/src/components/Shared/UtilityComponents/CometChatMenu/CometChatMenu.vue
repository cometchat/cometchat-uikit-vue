<template>
  <ul :style="styles.actionWrapperStyle" class="list__item__actions">
    <li v-for="input in defaultItems" :key="input.id">
      <i
        type="button"
        :style="styles.menuActionStyle(input.iconURL)"
        :title="input.title"
        class="action__button button__menu"
        @click="clickHandler($event, input)"
        @mouseenter="toggleTooltip($event, true)"
        @mouseleave="toggleTooltip($event, false)"
      ></i>
    </li>

    <!--Tripple dot icon-->
    <li v-if="menuItems.length > 0">
      <i
        type="button"
        :style="styles.menuActionStyle(moreIcon)"
        :title="'More'"
        class="action__button button__menu"
        @click="toggleMenu($event)"
        @mouseenter="toggleTooltip($event, true)"
        @mouseleave="toggleTooltip($event, false)"
      ></i>

      <!--Pan View-->
      <ul class="action__menu" :style="styles.menuWrapperStyle" v-if="showPan">
        <li
          v-for="input in menuItems"
          :key="input.id"
          class="action__menu__item"
          :style="styles.menuItemStyle"
        >
          <i
            type="button"
            :style="styles.menuActionStyle(input.iconURL)"
            :title="input.title"
            class="action__menu__button pan__button__menu__icon"
            @click="clickHandler($event, input)"
            @mouseenter="toggleTooltip($event, true)"
            @mouseleave="toggleTooltip($event, false)"
          ></i>
          <!-- <span
            class="action__menu__button pan__button__menu__title"
            :style="styles.menuItemTitleStyle"
            >{{ input.title }}</span
          > -->
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import {
  DEFAULT_NUMBER_PROP,
  DEFAULT_OBJECT_PROP,
  DEFAULT_ARRAY_PROP,
} from "./resources/constants";
import * as style from "./style";
import moreIcon from "./resources/more.svg";

/**
 *
 *
 * @displayName CometChatMenu
 */
export default {
  name: "CometChatMenu",
  props: {
    style: { ...DEFAULT_OBJECT_PROP, default: {} },
    menuStyle: { ...DEFAULT_OBJECT_PROP, default: {} },
    inputData: {
      ...DEFAULT_ARRAY_PROP,
      default: [],
    },
    menuNumber: { ...DEFAULT_NUMBER_PROP, default: 1 },
  },
  data() {
    return {
      showPan: false,
    };
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        actionWrapperStyle: style.actionWrapperStyle(this),
        menuActionStyle: (icon) => style.menuActionStyle(icon),
        menuWrapperStyle: style.menuWrapperStyle(this),
        menuItemStyle: style.menuItemStyle(),
        menuItemTitleStyle: style.menuItemTitleStyle(),
      };
    },
    defaultItems() {
      const defaultNumber = this.menuNumber - 1;
      return this.inputData.filter(function (item, i) {
        return i <= defaultNumber;
      });
    },
    menuItems() {
      const defaultNumber = this.menuNumber - 1;
      return this.inputData.filter(function (item, i) {
        return i > defaultNumber;
      });
    },
    moreIcon() {
      return moreIcon;
    },
  },
  methods: {
    /**
     * Jump to new messages
     */
    clickHandler(event, input) {
      event.stopPropagation();
      if (input.onHoverItemClick) {
        input.onHoverItemClick(input);
      }
    },
    toggleMenu() {
      this.showPan = !this.showPan;
    },
    toggleTooltip(event, value) {
      if (value) {
        const title = event.target.title;
        event.target.setAttribute("title", title);
      } else {
        event.target.removeAttribute("title");
      }
    },
  },
};
</script>