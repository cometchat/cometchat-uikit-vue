<template>
  <div class="cc-messagebubble-wrapper" :style="wrapperStyle()">
    <div
      class="cc-messagebubble-wrapper__container"
      @mouseenter="hideShowMenuOption"
      @mouseleave="hideShowMenuOption"
    >
      <div
        class="cc-messagebubble-wrapper__avatar"
        :class="{ hidden: !hasLeadingView }"
      >
        <div
          v-if="leadingView && leadingView.html"
          v-html="leadingView.html"
        ></div>
        <component
          v-else-if="leadingView && leadingView.componentName"
          :is="leadingView.componentName!"
          v-bind="{ ...leadingView.props }"
          v-on="leadingView?.listeners ? leadingView?.listeners : {}"
        >
          <template v-for="(item, key) in leadingView.slots" :key="key">
            <div :v-slot="[key]" :v-html="item"></div>
          </template>
        </component>

        <div v-else v-html="''"></div>
      </div>
      <div
        class="cc-messagebubble-wrapper__messagebubble"
        :style="bubbleAlignmentStyle()"
      >
        <div :style="titleStyle()" :class="{ hidden: !hasHeaderView }">
          <div
            v-if="headerView && headerView.html"
            v-html="headerView.html"
          ></div>
          <component
            v-else-if="headerView && headerView.componentName"
            :is="headerView.componentName!"
            v-bind="{ ...headerView.props }"
            v-on="headerView?.listeners ? headerView?.listeners : {}"
          >
            <template v-for="(item, key) in headerView.slots" :key="key">
              <div :v-slot="[key]" :v-html="item"></div>
            </template>
          </component>
          <div v-else v-html="''"></div>
        </div>

        <div
          class="cc-messagebubble-wrapper__messageoptions"
          v-if="options && options!.length > 0 && isHovering"
          :style="optionsStyles()"
        >
          <CometChatContextMenu
            :moreIconURL="moreIconURL"
            :topMenuSize="topMenuSize"
            :ContextMenuStyle="getOptionsStyle()"
            :data="options"
            :moreIconHoverText="''"
            :onOptionClicked="onOptionClick"
            :placement="
              alignment === MessageBubbleAlignment.right
                ? Placement.left
                : Placement.right
            "
          />
        </div>
        <div class="cc-messagebubble-wrapper__content" :style="bubbleStyle()">
          <div v-if="replyView && replyView.html" v-html="replyView.html"></div>
          <component
            v-else-if="replyView && replyView.componentName"
            :is=" replyView.componentName!"
            v-bind="{ ...replyView.props }"
            v-on="replyView?.listeners ? replyView?.listeners : {}"
          >
            <template v-for="(item, key) in replyView.slots" :key="key">
              <div :v-slot="[key]" :v-html="item"></div>
            </template>
          </component>
          <div v-else v-html="''"></div>
          <div
            v-if="contentView && contentView.html"
            v-html="contentView.html"
          ></div>
          <component
            v-else-if="contentView && contentView.componentName"
            :is="contentView.componentName!"
            v-bind="{ ...contentView.props }"
            v-on="contentView?.listeners ? contentView?.listeners : {}"
          >
            <template v-for="(item, key) in contentView.slots" :key="key">
              <div :v-slot="[key]" :v-html="item"></div>
            </template>
          </component>

          <div v-else v-html="''"></div>

          <div
            v-if="bottomView && bottomView.html"
            v-html="bottomView.html"
          ></div>
          <component
            v-else-if="bottomView && bottomView.componentName"
            :is="bottomView.componentName!"
            v-bind="{ ...bottomView.props }"
            v-on="bottomView?.listeners ? bottomView?.listeners : {}"
          >
            <template v-for="(item, key) in bottomView.slots" :key="key">
              <div :v-slot="[key]" :v-html="item"></div>
            </template>
          </component>

          <div v-else v-html="''"></div>
          <div
            class="cc__messagelist__threadreplies"
            v-if="threadView && threadView.length"
          >
            <div v-for="(item, i) of threadView" :key="i">
              <div v-if="item?.html" v-html="item?.html"></div>
              <component
                v-else
                :is="item?.componentName!"
                v-on="item?.listeners ? item?.listeners : {}"
                v-bind="{ ...item?.props }"
              >
                <template v-for="(html, key) in item?.slots" :key="key">
                  <div :v-slot="[key]" :v-html="html"></div>
                </template>
              </component>
            </div>
          </div>
        </div>

        <div
          v-if="footerView && footerView.html"
          v-html="footerView.html"
        ></div>
        <component
          v-else-if="footerView && footerView.componentName"
          :is="footerView.componentName!"
          v-bind="{ ...footerView.props }"
          v-on="footerView?.listeners ? footerView?.listeners : {}"
        >
          <template v-for="(html, key) in footerView.slots" :key="key">
            <div :v-slot="[key]" :v-html="html"></div>
          </template>
        </component>

        <div v-else v-html="''"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  onBeforeMount,
  ref,
  Ref,
  ComputedRef,
  PropType,
  inject,
} from "vue";
import { MessageBubbleAlignment, Placement } from "uikit-utils-lerna";
import { MoreIcon } from "../../assets";
import { CometChatTheme } from "uikit-resources-lerna";
import CometChatTextBubble from "../shared/Views/CometChatTextBubble/index.vue";
import CometChatAudioBubble from "../shared/Views/CometChatAudioBubble/index.vue";
import CometChatFileBubble from "../shared/Views/CometChatFileBubble/index.vue";
import CometChatImageBubble from "../shared/Views/CometChatImageBubble/index.vue";
import CometChatVideoBubble from "../shared/Views/CometChatVideoBubble/index.vue";
import CometChatDocumentExtensionBubble from "../Extensions/CollaborativeDocument/CometChatDocumentExtensionBubble/index.vue";
import CometChatPollsBubble from "../Extensions/Polls/CometChatPollsBubble/index.vue";
import CometChatLinkPreviewBubble from "../Extensions/LinkPreview/CometChatLinkPreviewBubble/index.vue";
import CometChatImageModerationBubble from "../Extensions/ImageModeration/CometChatImageModerationBubble/index.vue";
import CometChatMessageTranslationBubble from "../Extensions/MessageTranslation/CometChatMessageTranslationBubble/index.vue";
import CometChatContextMenu from "../shared/Views/CometChatContextMenu/index.vue";

import { MenuListStyle } from "my-cstom-package-lit";

export default defineComponent({
  name: "CometChatMessageBubble",
  components: {
    CometChatTextBubble,
    CometChatAudioBubble,
    CometChatFileBubble,
    CometChatImageBubble,
    CometChatVideoBubble,
    CometChatDocumentExtensionBubble,
    CometChatPollsBubble,
    CometChatLinkPreviewBubble,
    CometChatImageModerationBubble,
    CometChatMessageTranslationBubble,
    CometChatContextMenu,
  },
  props: {
    messageBubbleStyle: {
      type: undefined,
      default: {
        width: "100%",
        height: "auto",
        background: "",
        borderRadius: "12px",
        border: "none",
      },
    },

    options: {
      type: null,
      default: [],
    },
    alignment: {
      type: Number,
      default: MessageBubbleAlignment.right,
    },
    id: { type: null, default: undefined },

    moreIconURL: { type: String, default: MoreIcon },
    topMenuSize: { type: Number, default: 3 },
    leadingView: { type: Object as PropType<ViewType> },
    contentView: { type: Object as PropType<ViewType> },
    bottomView: { type: Object as PropType<ViewType> },
    headerView: { type: Object as PropType<ViewType> },
    footerView: { type: Object as PropType<ViewType> },
    replyView: { type: Object as PropType<ViewType> },
    threadView: { type: Array as PropType<ViewType[]> },
  },
  setup(props, context) {
    let optionsStyle: MenuListStyle = {
      width: "",
      height: "",
      border: "1px solid #e8e8e8",
      borderRadius: "8px",
      submenuWidth: "100%",
      submenuHeight: "100%",
      submenuBorder: "1px solid #e8e8e8",
      submenuBorderRadius: "8px",
      moreIconTint: "grey",
    };

    let isHovering: Ref<boolean> = ref(false);
    let { theme, switchThemeMode }: any = inject(
      "theme",
      new CometChatTheme({})
    )!;
    const hasLeadingView: ComputedRef<boolean> = computed<boolean>(
      () => !!props.leadingView
    );
    const hasHeaderView: ComputedRef<boolean> = computed<boolean>(
      () => !!props.headerView
    );

    const hideShowMenuOption = (event?: MouseEvent) => {
      isHovering.value = event?.type === "mouseenter";
    };

    const onOptionClick = (event: any) => {
      const onClick = event?.onClick; //event?.detail?.data?.onClick;

      if (onClick) {
        onClick(props.id);
      }
    };

    onBeforeMount(() => {
      optionsStyle = new MenuListStyle({
        border: `1px solid ${theme.value.palette.getAccent200()}`,
        borderRadius: "8px",
        background: theme.value.palette.getBackground(),
        submenuWidth: "100%",
        submenuHeight: "100%",
        submenuBorder: `1px solid ${theme.value.palette.getAccent200()}`,
        submenuBorderRadius: "8px",
        submenuBackground: theme.value.palette.getBackground(),
        moreIconTint: theme.value.palette.getAccent(),
      });
    });
    // onBeforeUpdate(() => {
    //   console.log('BUBBLE');
    // });

    const wrapperStyle = () => {
      switch (props.alignment) {
        case MessageBubbleAlignment.right:
          return {
            display: "flex",
            justifyContent: "flex-end",
          };
        case MessageBubbleAlignment.left:
          return {
            display: "flex",
            justifyContent: "flex-start",
          };
        case MessageBubbleAlignment.center:
          return {
            display: "flex",
            justifyContent: "center",
          };
        default:
          return {
            display: "flex",
            justifyContent: "center",
          };
      }
    };

    const bubbleStyle = () => {
      return {
        ...props.messageBubbleStyle,
      };
    };

    const bubbleAlignmentStyle = () => {
      return {
        display: "flex",
        justifyContent: "flex-start",
        alignItems:
          props.alignment == MessageBubbleAlignment.left
            ? "flex-start"
            : "flex-end",
      };
    };
    const optionsStyles = () => {
      return {
        justifyContent:
          props.alignment == MessageBubbleAlignment.left
            ? "flex-start"
            : "flex-end",
        top:
          hasHeaderView.value && props.alignment == MessageBubbleAlignment.left
            ? "-35px"
            : "-35px",
        background: theme.value.palette.getBackground(),
      };
    };
    const titleStyle = () => {
      return {
        display: "flex",
        justifyContent:
          props.alignment == MessageBubbleAlignment.left
            ? "flex-start"
            : "flex-end",
        alignItems: "flex-start",
      };
    };

    const getOptionsStyle = () => {
      return optionsStyle;
    };
    return {
      isHovering,
      getOptionsStyle,
      wrapperStyle,
      bubbleAlignmentStyle,
      titleStyle,
      bubbleStyle,
      optionsStyles,
      onOptionClick,
      hasLeadingView,
      hasHeaderView,
      hideShowMenuOption,
      optionsStyle,
      Placement,
      MessageBubbleAlignment,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hidden {
  display: none !important;
}

/* added/ */
* {
  box-sizing: border-box;
}
.cc-messagebubble-wrapper {
  position: relative;
}
.cc-messagebubble-wrapper__container {
  padding-right: 8px;
  border-radius: inherit;
  display: flex;
  height: fit-content;
  width: fit-content;
  max-width: 60%;
}
.cc-messagebubble-wrapper__messagebubble {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  min-width: 0;
  padding: 8px 2px;
  border-radius: inherit;
}

.cc-messagebubble-wrapper__avatar {
  position: relative;
  border-radius: inherit;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 8px 4px;
  margin-top: 5px;
}
.cc-messagebubble-title:empty:before {
  display: none;
}
.cc-messagebubble-title:empty:after {
  display: block;
  width: 100%;
  height: 20px;
  padding: 0 8px;
}
.cc-messagebubble-wrapper__content {
  border-radius: 8px;
}

.cc__messagelist__threadreplies {
  min-width: 130px;
}
.cc-messagebubble-wrapper__messageoptions {
  position: absolute;
  top: -4px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  z-index: 1;
}
</style>
