<template>
  <div class="cc-tabs-wrapper">
    <div class="cc-tabs-wrapper_inner-div">
      <div
        v-if="childViewRef && childViewRef.html"
        v-html="childViewRef.html"
      ></div>
      <component
        v-else-if="childViewRef && childViewRef.componentName"
        :is="childViewRef.componentName"
        v-bind="{ ...childViewRef.props }"
        v-on="childViewRef?.listeners ? childViewRef?.listeners : {}"
      >
        <template v-for="(html, key) in childViewRef.slots" :key="key">
          <div :v-slot="[key]" :v-html="html"></div>
        </template>
      </component>
    </div>
    <div class="cc-tabs" :style="getTabsStyle()">
      <cometchat-draggable :draggableStyle="tabsStyle">
        <div class="cc__tab-item" :style="getTabsPlacement()">
          <template v-for="eachTab in tabs" :key="eachTab.id">
            <cometchat-icon-button
              :alignment="IconButtonAlignment.top"
              :iconURL="eachTab.iconURL"
              :text="eachTab.title"
              :buttonStyle="getButtonStyle(eachTab)"
              @cc-button-clicked="(e : any) => openViewOnCLick(eachTab)"
            >
            </cometchat-icon-button>
          </template>
        </div>
      </cometchat-draggable>
    </div>
  </div>
</template>
<script lang="ts">
import {
  CometChatTabItem,
  TabAlignment,
  IconButtonAlignment,
} from "uikit-resources-lerna";

import { BaseStyle } from "uikit-utils-lerna";
import { defineComponent, PropType, Ref, ref } from "vue";

export default defineComponent({
  name: "CometChatTabs",
  components: {},
  props: {
    tabAlignment: { type: Number as PropType<TabAlignment> },
    tabsStyle: {
      type: BaseStyle,
      default: new BaseStyle({
        width: "fit-content",
      }),
    },
    tabs: { type: Object as PropType<CometChatTabItem[]> },
  },

  setup(props, context) {
    let activeTab = ref();
    let childViewRef: Ref<ViewType> = ref(undefined);

    const openViewOnCLick = (tabItem: CometChatTabItem) => {
      childViewRef.value = undefined;
      let index = props.tabs!.findIndex(
        (item: CometChatTabItem) => item.id === tabItem.id
      );
      if (index > -1) {
        activeTab.value = tabItem;
        childViewRef.value = props.tabs![index].childView;
      }
    };

    const getButtonStyle = (tab: CometChatTabItem) => {
      const { style } = tab || {};
      const { id } = activeTab.value || {};
      const active = id === tab?.id;

      return {
        background: active
          ? style?.activeBackground ?? style?.background
          : style?.background,
        buttonTextFont: active
          ? style?.activeTitleTextFont ?? style?.titleTextFont
          : style?.titleTextFont,
        buttonTextColor: active
          ? style?.activeTitleTextColor ?? style?.titleTextColor
          : style?.titleTextColor,
        buttonIconTint: active
          ? style?.activeIconTint ?? style?.iconTint
          : style?.iconTint,
        height: style?.height,
        width: style?.width,
        border: style?.border,
        borderRadius: style?.borderRadius,
        gap: "0",
        padding: "0",
      };
    };

    const getTabsStyle = (): any => {
      const position = (() => {
        switch (props.tabAlignment) {
          case TabAlignment.top:
          case TabAlignment.left:
            return {
              top: "0",
              left: "0",
            };
          case TabAlignment.bottom:
            return {
              bottom: "0",
              left: "0",
            };
          default:
            return {
              top: "0",
              right: "0",
            };
        }
      })();

      const { background } = props.tabsStyle ?? {};

      return {
        background,
        "z-index": 10,
        ...position,

        height: "fit-content",
        width: "fit-content",
        position: "absolute",
      };
    };

    const getTabsPlacement = (): any => {
      let alignment: string =
        props.tabAlignment == TabAlignment.top ||
        props.tabAlignment == TabAlignment.bottom
          ? "row"
          : "column";
      return {
        display: "flex",
        flexDirection: alignment,
      };
    };

    return {
      childViewRef,
      getTabsStyle,
      getTabsPlacement,
      IconButtonAlignment,
      getButtonStyle,
      openViewOnCLick,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cc-tabs-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.cc-tabs-wrapper_inner-div {
  height: 100%;
  width: 100%;
}
</style>
