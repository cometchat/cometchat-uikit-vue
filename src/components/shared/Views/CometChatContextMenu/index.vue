<template>
  <div className="cc-context-menu" :style="contextMenuStyle()">
    <ul className="cc-context-menu__top-menu" :style="topMenuStyle()">
      <template v-for="(menuData, index) in topMenu" :key="index">
        <li
          v-if="menuData.customView"
          :style="menuItemStyle()"
          class="cc-context-menu__menu-item"
        >
          <cometchat-popover
            :popoverStyle="popoverStyle"
            :placement="placement"
            ref="topMenuPopOverRef"
          >
            <div slot="children">
              <cometchat-button
                :buttonStyle="menuButtonStyle(menuData)"
                :text="''"
                :hoverText="menuData.title"
                :iconURL="menuData.iconURL"
              ></cometchat-button>
            </div>
            <div slot="content">
              <div
                v-if="menuData.customView(getClosePopOverHandler(index))?.html"
                v-html="
                  menuData.customView(getClosePopOverHandler(index))?.html
                "
              ></div>
              <component
                v-else
                :is="menuData.customView(getClosePopOverHandler(index))?.componentName!"
                v-on="
                  menuData.customView(getClosePopOverHandler(index))?.listeners
                    ? menuData.customView(getClosePopOverHandler(index))
                        ?.listeners
                    : {}
                "
                v-bind="{
                  ...menuData.customView(getClosePopOverHandler(index))?.props,
                }"
              >
                <template
                  v-for="(html, key) in menuData.customView(
                    getClosePopOverHandler(index)
                  )?.slots"
                  :key="key"
                >
                  <div :v-slot="[key]" :v-html="html"></div>
                </template>
              </component>
            </div>
          </cometchat-popover>
        </li>

        <li
          v-else
          :style="menuItemStyle()"
          class="cc-context-menu__menu-item"
          ref="topMenuPopOverRef"
        >
          <cometchat-button
            :buttonStyle="menuButtonStyle(menuData)"
            :text="''"
            :hoverText="menuData.title"
            :iconURL="menuData.iconURL"
            @cc-button-clicked="
              () => {
                onOptionClicked(menuData);
              }
            "
          ></cometchat-button>
        </li>

        <li
          v-if="data.length > topMenu.length && index === topMenu.length - 1"
          :style="menuItemStyle()"
          class="cc-context-menu__menu-item"
        >
          <cometchat-button
            :buttonStyle="moreButtonStyle"
            :hoverText="moreIconHoverText"
            :iconURL="moreIconURL"
            @cc-button-clicked="handleMenuClick"
          />
        </li>
      </template>
    </ul>
    <ul
      v-if="showSubMenu"
      className="cc-context-menu__sub-menu"
      :style="subMenuStyle(true)"
    >
      <li
        v-for="(subMenuData, index) in subMenu"
        :key="index"
        :style="menuItemStyle()"
        class="cc-context-menu__menu-item"
      >
        <div v-if="subMenuData.customView">
          <cometchat-popover
            :popoverStyle="popoverStyle"
            :placement="placement"
            ref="subMenuPopOverRef"
          >
            <div slot="children">
              <cometchat-button
                :buttonStyle="menuButtonStyle(subMenuData, true)"
                :text="subMenuData.title || ''"
                :hoverText="subMenuData.title"
                :iconURL="subMenuData.iconURL"
              ></cometchat-button>
            </div>
            <div slot="content">
              <div
                v-if="
                  subMenuData.customView(getClosePopOverHandler(index, true))
                    ?.html
                "
                v-html="
                  subMenuData.customView(getClosePopOverHandler(index, true))
                    ?.html
                "
              ></div>
              <component
                v-else
                :is="subMenuData.customView(getClosePopOverHandler(index, true))?.componentName!"
                v-on="
                  subMenuData.customView(getClosePopOverHandler(index, true))
                    ?.listeners
                    ? subMenuData.customView(
                        getClosePopOverHandler(index, true)
                      )?.listeners
                    : {}
                "
                v-bind="{
                  ...subMenuData.customView(getClosePopOverHandler(index, true))
                    ?.props,
                }"
              >
                <template
                  v-for="(html, key) in subMenuData.customView(
                    getClosePopOverHandler(index, true)
                  )?.slots"
                  :key="key"
                >
                  <div :v-slot="[key]" :v-html="html"></div>
                </template>
              </component>
            </div>
          </cometchat-popover>
        </div>
        <div v-else>
          <li :style="menuItemStyle()" class="cc-context-menu__menu-item">
            <cometchat-button
              ref="subMenuPopOverRef"
              :buttonStyle="menuButtonStyle(subMenuData, true)"
              :text="subMenuData.title || ''"
              :hoverText="subMenuData.title"
              :iconURL="subMenuData.iconURL"
              @cc-button-clicked="
                () => {
                  onOptionClicked(subMenuData);
                }
              "
            ></cometchat-button>
          </li>
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { ContextMenuStyle, MenuListStyle } from "my-cstom-package-lit";
import {
  CometChatActionsIcon,
  CometChatActionsView,
  CometChatTheme,
} from "uikit-resources-lerna";

import { Placement } from "uikit-utils-lerna";
import { defineComponent, inject, PropType, ref } from "vue";

export default defineComponent({
  name: "CometChatContextMenu",
  components: {},
  props: {
    data: {
      type: Object as PropType<CometChatActionsIcon[] | CometChatActionsView[]>,
    },
    topMenuSize: { type: Number },
    moreIconURL: { type: String },
    moreIconHoverText: { type: String },
    ContextMenuStyle: {
      type: ContextMenuStyle,
      default: new ContextMenuStyle({}),
    },
    onOptionClicked: { type: null }, //Function,
    placement: { type: String as PropType<Placement> },
  },

  setup(props, context) {
    let { theme, switchThemeMode }: any = inject(
      "theme",
      new CometChatTheme({})
    )!;
    let showSubMenu = ref(false);
    let topMenuPopOverRef: any = ref(null);
    let subMenuPopOverRef: any = ref(null);

    const topMenu = props.data.slice(0, props.topMenuSize! - 1);
    const subMenu = props.data.slice(props.topMenuSize! - 1);

    const popoverStyle = {
      width: "300px",
      height: "300px",
    };

    const buttonStyle = {
      background: "transparent",
      border: "none",
      borderRadius: "inherit",
    };

    const menuButtonStyle = (menuData: any, isSubMenu = false) => {
      return {
        ...buttonStyle,
        background: menuData?.backgroundColor || "transparent",
        border: "none",
        borderRadius: "0",
        buttonIconTint: menuData?.iconTint,
        buttonTextFont: menuData?.titleFont,
        buttonTextColor: menuData?.titleColor,
        gap: isSubMenu && menuData?.title && menuData?.iconURL ? "10px" : "0",
      };
    };

    const moreButtonStyle = {
      background: "transparent",
      border: "none",
      borderRadius: "0",
      buttonIconTint: props.ContextMenuStyle?.moreIconTint,
    };

    const getClosePopOverHandler = (index: number, isSubMenu = false) => {
      let menuRef: any = !isSubMenu
        ? topMenuPopOverRef.value
        : subMenuPopOverRef.value;
      return (_event: any) => {
        menuRef[index]!.openContentView(_event);
      };
    };

    const subMenuStyle = (showSubMenu: boolean): any => {
      return {
        listStyleType: "none",
        display: showSubMenu ? "flex" : "none",
        position: "absolute",
        right: "5px",
        top: "0",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        border: "1px solid #e8e8e8",
        width: "100%",
        zIndex: "3",
        background: theme.value.palette.getBackground(),
        marginTop: "35px",
        padding: "0",
        borderRadius: "8px",
      };
    };

    const handleMenuClick = () => (showSubMenu.value = !showSubMenu.value);

    const topMenuStyle = (): any => {
      return {
        listStyleType: "none",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        margin: "0",
        padding: "0",
        border: "1px solid #e8e8e8",
        zIndex: "2",
        borderRadius: "8px",
      };
    };

    const menuItemStyle = () => {
      return {
        background: "transparent",
        padding: "4px 4px",
      };
    };

    const contextMenuStyle = (): any => {
      return {
        display: "flex",
        position: "relative",
      };
    };

    return {
      menuItemStyle,
      popoverStyle,
      menuButtonStyle,
      contextMenuStyle,
      topMenuStyle,
      subMenuStyle,
      buttonStyle,
      handleMenuClick,
      showSubMenu,
      topMenu: topMenu as any,
      subMenu: subMenu as any,
      moreButtonStyle,
      getClosePopOverHandler,
      topMenuPopOverRef,
      subMenuPopOverRef,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
