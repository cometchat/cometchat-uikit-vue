<template>
  <div class="cc-list__wrapper" :style="listWrapperStyle()">
    <div class="cc-list__header" :style="headerStyle()">
      <div v-if="title" class="cc-list__title" :style="headerTitle()">
        {{ title }}
      </div>
      <div class="cc-list__search-input">
        <cometchat-search-input
          :searchInputStyle="setSearchStyles()"
          :searchIconURL="searchIconURL"
          :searchText="searchText"
          v-show="!hideSearch"
          :placeholderText="searchPlaceholderText"
          @cc-search-changed="searchEvent"
        />
      </div>
    </div>
    <div class="cc-list__list" ref="listScrollRef" :style="listStyles()">
      <div class="cc-list__top" ref="topDivRef"></div>
      <div
        class="cc-list__decorator-message"
        :style="messageContainerStyle()"
        v-if="
          state == States.loading ||
          state == States.error ||
          state == States.empty
        "
      >
        <div
          class="cc-list__loading-view"
          v-if="state == States.loading && list.length == 0"
        >
          <cometchat-loader
            v-if="!loadingStateView"
            :iconURL="loadingIconURL"
            :loaderStyle="iconStyle"
          />
          <!-- <div class="cc-list__custom-view-loading" v-if="loadingStateView">
            <div v-html="loadingStateView"></div>
          </div> -->
          <div class="cc-list__custom-view-loading" v-if="loadingStateView">
            <div
              v-if="loadingStateView.html"
              v-html="loadingStateView.html"
            ></div>
            <component
              v-else
              :is="loadingStateView.componentName!"
              v-on="loadingStateView?.listeners"
              v-bind="{ ...loadingStateView.props }"
            >
              <template
                v-for="(item, key) in loadingStateView!.slots"
                :key="key"
              >
                <div :v-slot="[key]" :v-html="item"></div>
              </template>
            </component>
          </div>
        </div>
        <div
          class="cc-list__error-view"
          v-else-if="state == States.error && !hideError"
        >
          <cometchat-label
            v-if="!errorStateView"
            :labelStyle="errorStyle()"
            :text="errorStateText"
          />
          <div class="cc-list__custom-view-error" v-if="errorStateView">
            <!-- <div v-html="errorStateView"></div> -->
            <div v-if="errorStateView.html" v-html="errorStateView.html"></div>
            <component
              v-else
              :is="errorStateView.componentName!"
              v-on="errorStateView?.listeners"
              v-bind="{ ...errorStateView.props }"
            >
              <template v-for="(item, key) in errorStateView!.slots" :key="key">
                <div :v-slot="[key]" :v-html="item"></div>
              </template>
            </component>
          </div>
        </div>

        <div class="cc-list__empty-view" v-else-if="state == States.empty">
          <cometchat-label
            v-if="!emptyStateView"
            :text="emptyStateText"
            :labelStyle="emptyStyle()"
          />
          <div class="cc-list__custom-view-empty" v-if="emptyStateView">
            <!-- <div v-html="emptyStateView"></div> -->
            <div v-if="emptyStateView.html" v-html="emptyStateView.html"></div>
            <component
              v-else
              :is="emptyStateView.componentName!"
              v-on="emptyStateView?.listeners"
              v-bind="{ ...emptyStateView.props }"
            >
              <template v-for="(item, key) in emptyStateView.slots" :key="key">
                <div :v-slot="[key]" :v-html="item"></div>
              </template>
            </component>
          </div>
        </div>
      </div>

      <div
        class="cc-list__listitem-view"
        v-for="(item, i) in list"
        :key="getKeyValue(listItemKey, item)"
      >
        <div
          class="cc-list__section"
          v-if="
            state == States.loaded ||
            (state == States.loading && list.length > 0)
          "
        >
          <template v-if="showSectionHeader">
            <template v-if="sectionHeaderKey === undefined"
              >{{ SectionHeaderUndefined() }}
            </template>
            <template v-else>
              <template
                v-if="
                  getKeyValue(sectionHeaderKey, item).length > 0 &&
                  (i === 0 ||
                    getKeyValue(sectionHeaderKey, item)[0].toUpperCase() !==
                      currentSectionHeader)
                "
              >
                <div
                  class="cc-list__section-header"
                  :style="sectionHeaderStyle()"
                >
                  {{
                    (currentSectionHeader = getKeyValue(
                      sectionHeaderKey,
                      item
                    )[0].toUpperCase())
                  }}
                </div>
              </template>
              <template v-else>
                <!-- <div class="section__separator"></div> -->
              </template>
            </template>
          </template>
          <!-- <div>{{ item.getName() }}</div> -->
        </div>

        <slot name="listItem" :item="item" :index="i"></slot>
      </div>

      <div class="cc-list__list-bottom" ref="bottomDivRef"></div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  nextTick,
  onUpdated,
  PropType,
  onBeforeUpdate,
} from "vue";
import "my-cstom-package-lit";
import { SearchInputStyle } from "my-cstom-package-lit";
import { ListStyle } from "uikit-utils-lerna";
import { States, TitleAlignment } from "uikit-utils-lerna";
import { SearchIcon, LoadingIcon } from "../../assets";

import { CometChat } from "@cometchat-pro/chat";

export default defineComponent({
  name: "CometChatList",
  props: {
    title: {
      type: String,
      default: "",
    },
    titleAlignment: {
      type: Number as PropType<TitleAlignment>,
      default: TitleAlignment.left,
    },

    hideSearch: {
      type: Boolean,
      default: false,
    },
    searchText: {
      type: String,
      default: "",
    },
    onSearch: {
      type: Function as PropType<(newSearchText: string) => void>,
      default: (text: string) => console.log("text", text),
    },
    searchIconURL: {
      type: String,
      default: SearchIcon,
    },
    searchPlaceholderText: {
      type: String,
      default: "Search",
    },
    list: {
      type: null,
      default: [],
    },

    showSectionHeader: {
      type: Boolean,
      default: false,
    },

    sectionHeaderKey: {
      type: String,
    },
    listItemKey: {
      type: null,
      required: true,
    },
    onScrolledToBottom: {
      type: Function as () => any,
    },
    onScrolledToTop: {
      type: Function as () => any,
    },
    state: {
      type: Number as PropType<States>,
      default: States.loading,
    },

    loadingIconURL: {
      type: String,
      default: LoadingIcon,
    },
    emptyStateText: {
      type: String,
      default: "SOMETHING_WRONG",
    },
    hideError: {
      type: Boolean,
      default: false,
    },
    scrollToBottom: {
      type: Boolean,
      default: false,
    },
    errorStateView: {
      type: Object as PropType<ViewType>,
    },
    loadingStateView: {
      type: Object as PropType<ViewType>,
    },
    errorStateText: {
      type: String,
      default: "Error",
    },
    onError: {
      type: Function as PropType<(error: CometChat.CometChatException) => void>,
      default: (error: CometChat.CometChatException) => console.log(error),
    },
    emptyStateView: {
      type: Object as PropType<ViewType>,
    },
    listStyle: {
      type: ListStyle,
      default: () => {
        return {} as any;
      },
    },
  },
  setup(props) {
    let currentSectionHeader = "";
    const scrollPos = ref<HTMLElement | null>(null);
    // let searchText = ref(props.searchText);
    let firstScrollToBottom = true;
    let firstScrollToTop = true;
    let bottomObserver: any;
    let topObserver: any;
    let searchStyle = ref<SearchInputStyle>({});
    let iconStyle = ref<any>({});
    let prevScrollHeight: number;
    let listScrollRef: any = ref(null);
    let topDivRef: any = ref(null);
    let bottomDivRef: any = ref(null);
    let titleAlignment: any = ref(props.titleAlignment);

    const setSearchStyles = () => {
      return {
        border: props.listStyle?.searchBorder || "none",
        borderRadius: props.listStyle?.searchBorderRadius || "8px",
        width: "100%",
        height: "100%",
        background:
          props.listStyle?.searchBackground || "rgb(20, 20, 20, 0.04)",
        searchTextFont: props.listStyle?.searchTextFont || "400 15px Inter",
        searchTextColor: props.listStyle?.searchTextColor || "rgb(20, 20, 20)",
        placeholderTextFont:
          props.listStyle?.searchPlaceholderTextFont || "400 15px Inter",
        placeholderTextColor:
          props.listStyle?.searchPlaceholderTextColor ||
          "rgb(20, 20, 20, 0.46)",
        searchIconTint:
          props.listStyle?.searchIconTint || "rgb(20, 20, 20, 0.46)",
      };
    };
    const debounce = (func: any, delay: number) => {
      let timeoutId: any;
      return (...args: any[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(null, args);
        }, delay);
      };
    };
    onMounted(async () => {
      // setStyles();
      nextTick(() => {
        ioBottom();
        ioTop();
        if (props.scrollToBottom && props.state === States.loaded) {
          setTimeout(() => {
            scrollToBottom();
          }, 100);
        }
      });
    });
    onUpdated(() => {
      nextTick(() => {
        if (props.scrollToBottom && props.state === States.loaded) {
          setTimeout(() => {
            scrollToBottom();
          }, 100);
        }
      });
    });

    const searchEvent = debounce((event: any) => {
      // searchText.value = event?.detail?.searchText;
      if (props.onSearch && event?.detail?.searchText != undefined) {
        //props.onSearch(searchText.value);
        props.onSearch(event?.detail?.searchText);
      }
    }, 500); // 500ms debounce delay

    const ioBottom = () => {
      const options = {
        root: listScrollRef.value,
        rootMargin: "-100% 0px 100px 0px",
        threshold: 0,
      };
      const callback = async (entries: any) => {
        if (entries[0].isIntersecting && props.onScrolledToBottom) {
          if (!firstScrollToBottom) {
            prevScrollHeight = listScrollRef.value?.scrollHeight;

            await props.onScrolledToBottom();
            nextTick(() => {
              // var scrollTopPos =
              //   document.documentElement.scrollTop || document.body.scrollTop;
              // document.documentElement.scrollTop = document.body.scrollTop =
              //   scrollTopPos;
              // document.querySelector("#listScroll")!.scrollTop =
              //   document.querySelector("#listScroll")!.scrollHeight -
              //   prevScrollHeight;
            });
          } else {
            firstScrollToBottom = false;
          }
        }
      };

      bottomObserver = new IntersectionObserver(callback, options);
      bottomObserver.observe(bottomDivRef.value);
    };

    const ioTop = () => {
      const options = {
        root: listScrollRef.value,
        threshold: 0,
      };
      const callback = async (entries: any) => {
        if (entries[0].isIntersecting && props.onScrolledToTop) {
          if (!firstScrollToTop) {
            prevScrollHeight = listScrollRef.value!.scrollHeight;

            await props.onScrolledToTop();
            nextTick(() => {
              listScrollRef.value!.scrollTop =
                listScrollRef.value!.scrollHeight - prevScrollHeight;
            });
          } else {
            firstScrollToTop = false;
          }
        }
      };
      topObserver = new IntersectionObserver(callback, options);
      topObserver.observe(topDivRef.value);
    };
    function scrollToBottom() {
      if (listScrollRef.value) {
        listScrollRef.value.scrollTo({
          top: listScrollRef.value.scrollHeight,
          //behavior: "smooth",
        });
      }
    }

    function SectionHeaderUndefined() {
      let error: any = new CometChat.CometChatException({
        code: "ERROR",
        name: "Error",
        message:
          "'sectionHeaderKey' prop must be provided when 'showSectionHeader' prop is set to true ('showSectionHeader' is set to be true by default).",
      });
      if (props.onError) {
        props.onError(error);
        currentSectionHeader = " ";
      } else {
        // console.log(error);
        currentSectionHeader = " ";
      }
    }
    // if (props.scrollToBottom) {
    //   setTimeout(scrollToBottom, 4000);
    // }
    const listWrapperStyle = (): any => {
      return {
        width: props.listStyle.width || "100%",

        height: props.listStyle.height,
        border: props.listStyle.border || "10px solid red transparent",
        borderRadius: props.listStyle.borderRadius || "0",
        background: props.listStyle.background || "white",
        boxShadow: props.listStyle.boxShadow || "",
        display: "flex",
        flexDirection: "column",
        rowGap: "16px",
        overflow: "hidden",
        boxSizing: "border-box",
      };
    };
    const headerStyle = () => {
      return {
        flexShrink: "0",
        padding: "0 16px",
        border: "5px solid yellow transparent",
      };
    };

    const messageContainerStyle = (): any => {
      return {
        width: props.listStyle.width,
        height: props.listStyle.height || "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      };
    };
    const errorStyle = () => {
      return {
        textFont: props.listStyle.errorStateTextFont || "700 22px Inter",
        textColor:
          props.listStyle.errorStateTextColor || "rgb(20, 20, 20, 0.33)",
      };
    };
    const emptyStyle = () => {
      return {
        textFont: props.listStyle.emptyStateTextFont || "700 22px Inter",
        textColor:
          props.listStyle.emptyStateTextColor || "rgb(20, 20, 20, 0.33)",
      };
    };

    const headerTitle = () => {
      let postiton: any =
        TitleAlignment.left === titleAlignment.value
          ? { textAlign: "left" }
          : { textAlign: "center" };
      return {
        font: props.listStyle.titleTextFont || "600 22px Inter, sans-serif",
        color: props.listStyle.titleTextColor || "rgb(20, 20, 20)",
        margin: "8px 0px",
        ...postiton,
      };
    };
    const listStyles = (): any => {
      return {
        overflowY: "auto",
        flexGrow: "1",
        padding: "0 16px",
        border: "7px solid pink transparent ",
      };
    };
    const sectionHeaderStyle = () => {
      return {
        font: props.listStyle?.sectionHeaderTextFont,
        color: props.listStyle?.sectionHeaderTextColor,
        padding: props.listStyle?.sectionHeaderTextColor || "4px",
      };
    };

    function getKeyValue<T>(key: any, item: any): string {
      let res: string;

      const keyValue = item[key];

      if (typeof keyValue === "function") {
        res = String(keyValue.call(item));
      } else {
        res = String(keyValue);
      }

      return res;
    }

    return {
      SearchIcon,
      LoadingIcon,
      getKeyValue,
      States,
      currentSectionHeader,
      scrollPos,
      listWrapperStyle,
      headerTitle,
      searchEvent,
      messageContainerStyle,

      errorStyle,
      emptyStyle,
      headerStyle,

      listStyles,
      iconStyle,
      sectionHeaderStyle,
      searchStyle,
      listScrollRef,
      topDivRef,
      bottomDivRef,
      SectionHeaderUndefined,
      setSearchStyles,
    };
  },
});
</script>
<style scoped>
* {
  box-sizing: border-box;
}

.cc-list__section {
  margin-left: 8px;
}

.cc-list__list::-webkit-scrollbar {
  background: transparent;
  width: 8px;
}
.cc-list__list::-webkit-scrollbar-thumb {
  background: rgb(232, 229, 229);
  border-radius: 8px;
}
</style>
