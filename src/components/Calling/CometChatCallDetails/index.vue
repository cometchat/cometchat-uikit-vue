<template>
  <template v-if="loggedInUser">
    <div class="cc-call-details" :style="getCallDetailsStyle()">
      <div class="cc-call-details__header" :style="getHeaderStyle()">
        <div class="cc-call-details__title" :style="getTitleWrapperStyle()">
          <cometchat-label :text="title" :labelStyle="getTitleStyle()" />
        </div>
        <cometchat-button
          @cc-button-clicked="onCloseClicked"
          :iconURL="closeButtonIconURL"
          :buttonStyle="getCloseBtnStyle()"
        />
      </div>
      <div className="cc-call-details__content" :style="getContentStyle()">
        <div className="cc-call-details__profile" :style="getProfileStyle()">
          <template v-if="!hideProfile">
            <template v-if="customProfileView">
              <template v-if="userOrGroup instanceof CometChat.User">
                <div
                  v-if="customProfileView(userOrGroup)!.html"
                  v-html="customProfileView(userOrGroup)!.html"
                ></div>
                <component
                  v-else-if="customProfileView(userOrGroup)!.componentName"
                  :is="customProfileView(userOrGroup)!.componentName!"
                  v-bind="{ ...customProfileView(userOrGroup)!.props }"
                  v-on="customProfileView ? customProfileView(userOrGroup)!.listeners : {}"
                >
                  <template
                    v-for="(item, key) in customProfileView(userOrGroup!)!.slots"
                    :key="key"
                  >
                    <div :v-slot="[key]" :v-html="item"></div>
                  </template>
                </component>
              </template>
              <template v-else-if="userOrGroup instanceof CometChat.Group">
                <div
                  v-if="customProfileView(undefined, userOrGroup)!.html"
                  v-html="customProfileView(undefined, userOrGroup)!.html"
                ></div>
                <component
                  v-else-if="customProfileView(undefined,userOrGroup)!.componentName"
                  :is="customProfileView(undefined, userOrGroup)!.componentName!"
                  v-bind="{ ...customProfileView(undefined, userOrGroup)!.props }"
                  v-on="customProfileView ? customProfileView(userOrGroup)!.listeners : {}"
                >
                  <template
                    v-for="(item, key) in customProfileView(undefined, userOrGroup!)!.slots"
                    :key="key"
                  >
                    <div :v-slot="[key]" :v-html="item"></div>
                  </template>
                </component>
              </template>
            </template>
            <cometchat-list-item
              v-else
              :title="userOrGroup.getName()"
              :avatarName="userOrGroup.getName()"
              :avatarURL="
                userOrGroup instanceof CometChat.User
                  ? userOrGroup.getAvatar()
                  : userOrGroup.getIcon()
              "
              :statusIndicatorColor="
                getListItemStatusIndicatorColor(userOrGroup)
              "
              :statusIndicatorIcon="getListItemStatusIndicatorIcon(userOrGroup)"
              :hideSeparator="false"
              :listItemStyle="getListItemStyle()"
              :avatarStyle="getAvatarStyle()"
              :statusIndicatorStyle="getStatusIndicatorStyle()"
            >
              <div slot="subtitleView">
                <template v-if="subtitleView">
                  <template v-if="userOrGroup instanceof CometChat.User">
                    <div
                      v-if="subtitleView(userOrGroup)!.html"
                      v-html="subtitleView(userOrGroup)!.html"
                    ></div>
                    <component
                      v-else-if="subtitleView(userOrGroup)!.componentName"
                      :is="subtitleView(userOrGroup)!.componentName!"
                      v-bind="{ ...subtitleView(userOrGroup)!.props }"
                      v-on="subtitleView ? subtitleView(userOrGroup)!.listeners : {}"
                    >
                      <template
                        v-for="(item, key) in subtitleView(userOrGroup!)!.slots"
                        :key="key"
                      >
                        <div :v-slot="[key]" :v-html="item"></div>
                      </template>
                    </component>
                  </template>
                  <template v-else-if="userOrGroup instanceof CometChat.Group">
                    <div
                      v-if="subtitleView(undefined, userOrGroup)!.html"
                      v-html="subtitleView(undefined, userOrGroup)!.html"
                    ></div>
                    <component
                      v-else-if="subtitleView(undefined,userOrGroup)!.componentName"
                      :is="subtitleView(undefined, userOrGroup)!.componentName!"
                      v-bind="{ ...subtitleView(undefined, userOrGroup)!.props }"
                      v-on="subtitleView ? subtitleView(userOrGroup)!.listeners : {}"
                    >
                      <template
                        v-for="(item, key) in subtitleView(undefined, userOrGroup!)!.slots"
                        :key="key"
                      >
                        <div :v-slot="[key]" :v-html="item"></div>
                      </template>
                    </component>
                  </template>
                </template>
                <template v-else>
                  <cometchat-label
                    :text="getSubtitleText()"
                    :labelStyle="getSubtitleStyle()"
                  />
                </template>
              </div>
            </cometchat-list-item>
          </template>
        </div>
        <!-- {getProfileView(userOrGroup)} {getSectionList(userOrGroup.value, templates)} -->
        <div
          className="cc-call-details__section-list"
          :style="getSectionListStyle()"
        >
          <template
            v-for="eachTemplate in getTemplates()"
            :key="eachTemplate.id"
          >
            <div class="cc-call-details__section">
              <div
                class="cc-call-details__section-title"
                :style="getSectionTitleWrapperStyle()"
              >
                <cometchat-label
                  :text="eachTemplate.title"
                  :labelStyle="getSectionTitleStyle(eachTemplate)"
                />
              </div>
              <template
                v-for="eachOption in getOptionsForTemplate(eachTemplate)"
                :key="eachOption.id"
              >
                <div
                  class="cc-call-details__option-list"
                  :style="getOptionListStyle"
                >
                  <div
                    :key="eachOption.id"
                    class="cc-call-details__option"
                    :style="getDefaultOptionStyle()"
                  >
                    <div
                      class="cc-call-details__option-content"
                      v-if="eachOption.customView"
                    >
                      <div
                        v-if="eachOption.customView.html"
                        v-html="eachOption.customView.html"
                      ></div>
                      <component
                        v-else
                        :is="eachOption.customView.componentName!"
                        v-bind="{ ...eachOption.customView.props }"
                        v-on="eachOption.customView?.listeners"
                      >
                        <template
                          v-for="(item, key) in eachOption.customView.slots"
                          :key="key"
                        >
                          <div :v-slot="[key]" :v-html="item"></div>
                        </template>
                      </component>
                    </div>
                    <div
                      v-if="eachOption.tail"
                      class="cc-call-details__option-tail"
                      :style="getTailWrapperStyle()"
                    >
                      <div
                        v-if="eachOption.tail.html"
                        v-html="eachOption.tail.html"
                      ></div>
                      <component
                        v-else
                        :is="eachOption.tail.componentName!"
                        v-bind="{ ...eachOption.tail.props }"
                        v-on="eachOption.tail?.listeners"
                      >
                        <template
                          v-for="(item, key) in eachOption.tail.slots"
                          :key="key"
                        >
                          <div :v-slot="[key]" :v-html="item"></div>
                        </template>
                      </component>
                    </div>
                  </div>
                </div>
                <cometchat-divider
                  v-if="!eachTemplate.hideItemSeparator"
                  :dividerStyle="
                    getDividerStyle(eachTemplate.itemSeparatorColor, false)
                  "
                />
              </template>
              {{ eachTemplate.title }}
            </div>
            <cometchat-divider
              v-if="!eachTemplate.hideSectionSeparator"
              :dividerStyle="
                getDividerStyle(eachTemplate.sectionSeparatorColor, true)
              "
            />
          </template>
        </div>
      </div>
    </div>
  </template>
</template>

<script lang="ts">
/*es-lint disabled*/

import {
  PrivateGroupIcon,
  PasswordGroupIcon,
  Close2xIcon,
} from "../../../assets";
import {
  CSSProperties,
  defineComponent,
  inject,
  nextTick,
  onBeforeMount,
  onBeforeUnmount,
  PropType,
  Ref,
  ref,
  onBeforeUpdate,
} from "vue";
import { CallDetailsStyle } from "uikit-utils-lerna";

import { CometChat } from "@cometchat-pro/chat";
import "my-cstom-package-lit";
type ButtonStyle = CSSProperties & { buttonIconTint?: string };

import {
  AvatarStyle,
  IconStyle,
  LabelStyle,
  ListItemStyle,
} from "my-cstom-package-lit";
import {
  CometChatDetailsOption,
  CometChatDetailsTemplate,
  CometChatTheme,
  CometChatUIKitConstants,
  fontHelper,
  localize,
} from "uikit-resources-lerna";
import { CallingDetailsUtils } from "../Utils/CallingDetailsUtils";
import CometChatCallButtons from "../CometChatCallButtons/index.vue";

export default defineComponent({
  name: "CometChatCallDetails",
  components: { CometChatCallButtons },
  props: {
    title: { type: String },
    closeButtonIconURL: { type: String, default: Close2xIcon },
    onClose: { type: Function as PropType<() => void> },
    hideProfile: { type: Boolean, default: false },
    customProfileView: {
      type: Function as PropType<
        (user?: CometChat.User, group?: CometChat.Group) => ViewType
      >,
    },
    call: { type: CometChat.Call },
    disableUsersPresence: { type: Boolean },
    privateGroupIcon: { type: String, default: PrivateGroupIcon },
    protectedGroupIcon: { type: String, default: PasswordGroupIcon },
    subtitleView: {
      type: Function as PropType<
        (user?: CometChat.User, group?: CometChat.Group) => ViewType
      >,
    },
    data: {
      type: Function as PropType<
        (
          user?: CometChat.User,
          group?: CometChat.Group
        ) => CometChatDetailsTemplate[]
      >,
    },
    onError: {
      type: Function as PropType<(error: CometChat.CometChatException) => void>,
    },
    listItemStyle: { type: ListItemStyle, default: new ListItemStyle({}) },
    avatarStyle: { type: AvatarStyle, default: new AvatarStyle({}) },
    statusIndicatorStyle: { type: null },
    callDetailsStyle: {
      type: CallDetailsStyle,
      default: new CallDetailsStyle({
        width: "100%",
        height: "100%",
        background: "white",
        border: "",
        borderRadius: "",
        titleTextFont: "",
        titleTextColor: "",
        closeButtonIconTint: "",
        privateGroupIconBackground: "",
        passwordGroupIconBackground: "",
        onlineStatusColor: "",
        subtitleTextFont: "400 13px Inter",
        subtitleTextColor: "RGBA(20, 20, 20, 0.58)",
        //margin: "0 100px",
      }),
    },
  },
  setup(props) {
    const loggedInUser: Ref<CometChat.User | undefined> = ref(undefined);

    let { theme, switchThemeMode }: any = inject(
      "theme",
      new CometChatTheme({})
    )!;
    let userOrGroup: any = ref(null);
    let templates: any;

    onBeforeMount(async () => {
      await CometChat.getLoggedinUser().then((user: CometChat.User | null) => {
        loggedInUser.value = user!;

        let tmpUserOrGroup = (() => {
          if (!loggedInUser.value) {
            return undefined;
          }
          return props.call!.getSender().getUid() ===
            loggedInUser.value!.getUid()
            ? props.call!.getReceiver()
            : props.call!.getSender();
        })();
        setTemplates(tmpUserOrGroup);
        userOrGroup.value = tmpUserOrGroup;
      });
    });

    onBeforeUpdate(async () => {
      let tmpUserOrGroup = (() => {
        if (!loggedInUser.value) {
          return undefined;
        }
        return props.call!.getSender().getUid() === loggedInUser.value!.getUid()
          ? props.call!.getReceiver()
          : props.call!.getSender();
      })();
      setTemplates(tmpUserOrGroup);
      userOrGroup.value = tmpUserOrGroup;
    });

    const setTemplates = (tmpUserOrGroup: any) => {
      templates =
        tmpUserOrGroup instanceof CometChat.User
          ? props.data?.(tmpUserOrGroup)
          : props.data?.(undefined, tmpUserOrGroup);
      if (!templates || !templates.length) {
        if (tmpUserOrGroup instanceof CometChat.User) {
          templates = CallingDetailsUtils.getDetailsTemplate(tmpUserOrGroup);
        } else {
          templates = CallingDetailsUtils.getDetailsTemplate(
            undefined,
            tmpUserOrGroup
          );
        }
      }
    };

    const getListItemStatusIndicatorColor = (
      userOrGroup: CometChat.User | CometChat.Group
    ): string | null => {
      if (userOrGroup instanceof CometChat.User) {
        if (
          !props.disableUsersPresence &&
          userOrGroup.getStatus() ===
            CometChatUIKitConstants.userStatusType.online
        ) {
          return (
            props.callDetailsStyle?.onlineStatusColor ||
            theme.value.palette.getSuccess() ||
            "rgb(0, 200, 111)"
          );
        }
      } else {
        const groupType = userOrGroup.getType();
        if (groupType === CometChatUIKitConstants.GroupTypes.private) {
          return (
            props.callDetailsStyle?.privateGroupIconBackground || "#F7A500"
          );
        }
        if (groupType === CometChatUIKitConstants.GroupTypes.password) {
          return (
            props.callDetailsStyle?.passwordGroupIconBackground || "#F7A500"
          );
        }
      }
      return null;
    };

    /**
     * Gets the status indicator icon for the default profile view
     */
    const getListItemStatusIndicatorIcon = (
      userOrGroup: CometChat.User | CometChat.Group
    ): string => {
      if (userOrGroup instanceof CometChat.Group) {
        const groupType = userOrGroup.getType();
        if (groupType === CometChatUIKitConstants.GroupTypes.private) {
          return props.privateGroupIcon!;
        }
        if (groupType === CometChatUIKitConstants.GroupTypes.password) {
          return props.protectedGroupIcon!;
        }
      }
      return "";
    };

    const getCallDetailsStyle = (): CSSProperties => {
      return {
        boxSizing: "border-box",
        height: props.callDetailsStyle?.height || "100%",
        width: props.callDetailsStyle?.width || "100%",
        border: props.callDetailsStyle?.border || "none",
        borderRadius: props.callDetailsStyle?.borderRadius || "0",
        background:
          props.callDetailsStyle?.background ||
          theme.value.palette.getBackground(),
        padding: "16px",
      };
    };

    const getHeaderStyle = (): CSSProperties => {
      return {
        display: "flex",
        marginBottom: "32px",
      };
    };

    const getTitleStyle = (): LabelStyle => {
      return {
        textFont:
          props.callDetailsStyle?.titleTextFont ||
          fontHelper(theme.value.typography.title1),
        textColor:
          props.callDetailsStyle?.titleTextColor ||
          theme.value.palette.getAccent(),
      };
    };

    const getTitleWrapperStyle = (): CSSProperties => {
      return {
        // eslint-disable-next-line
        //@ts-ignore
        flexGrow: "1",
        display: "flex",
        justifyContent: "center",
      };
    };

    const getCloseBtnStyle = (): ButtonStyle => {
      return {
        height: "24px",
        width: "24px",
        border: "none",
        borderRadius: "0",
        background: "transparent",
        buttonIconTint:
          props.callDetailsStyle?.closeButtonIconTint ||
          theme.value.palette.getPrimary(),
      };
    };
    const getContentStyle = (): CSSProperties => {
      return {
        // eslint-disable-next-line
        //@ts-ignore
        padding: props.listItemStyle?.padding || "0 50px",
      };
    };

    const getProfileStyle = (): CSSProperties => {
      return {
        marginBottom: "16px",
      };
    };

    const getListItemStyle = (): ListItemStyle => {
      return {
        height: props.listItemStyle?.height || "45px",
        width: props.listItemStyle?.width || "100%",
        background: props.listItemStyle?.background || "inherit",
        activeBackground:
          props.listItemStyle?.activeBackground || "transparent",
        borderRadius: props.listItemStyle?.borderRadius || "0",
        titleFont:
          props.listItemStyle?.titleFont ||
          fontHelper(theme.value.typography.title2),
        titleColor:
          props.listItemStyle?.titleColor || theme.value.palette.getAccent(),
        border: props.listItemStyle?.border || "none",
        separatorColor:
          props.listItemStyle?.separatorColor ||
          theme.value.palette.getAccent200(),
        hoverBackground: props.listItemStyle?.hoverBackground || "transparent",
      };
    };

    const getAvatarStyle = (): AvatarStyle => {
      return {
        borderRadius: props.avatarStyle?.borderRadius || "24px",
        width: props.avatarStyle?.width || "36px",
        height: props.avatarStyle?.height || "36px",
        border:
          props.avatarStyle?.border ||
          `1px solid ${theme.value.palette.getAccent100()}`,
        backgroundColor:
          props.avatarStyle?.backgroundColor ||
          theme.value.palette.getAccent700(),
        nameTextColor:
          props.avatarStyle?.nameTextColor ||
          theme.value.palette.getAccent900(),
        backgroundSize: props.avatarStyle?.backgroundSize || "cover",
        nameTextFont:
          props.avatarStyle?.nameTextFont ||
          fontHelper(theme.value.typography.subtitle1),
        outerViewBorder: props.avatarStyle?.outerViewBorder || "none",
        outerViewBorderSpacing:
          props.avatarStyle?.outerViewBorderSpacing || "0px",
      };
    };

    const getStatusIndicatorStyle = (): CSSProperties => {
      const obj = props.statusIndicatorStyle ?? {};
      return {
        ...obj,
        width: props.statusIndicatorStyle?.width || "12px",
        height: props.statusIndicatorStyle?.height || "12px",
        border: props.statusIndicatorStyle?.border || "none",
        borderRadius: props.statusIndicatorStyle?.borderRadius || "24px",
      };
    };

    const getSubtitleText = () => {
      let subtitleText: string;
      if (userOrGroup.value instanceof CometChat.User) {
        subtitleText = props.disableUsersPresence
          ? ""
          : localize(userOrGroup.value.getStatus().toUpperCase());
      } else {
        const totalMembers = userOrGroup.value.getMembersCount();
        subtitleText = `${totalMembers} ${localize(
          totalMembers > 1 ? "MEMBERS" : "MEMBER"
        )}`;
      }
      return subtitleText;
    };

    const getSubtitleStyle = (): LabelStyle => {
      return {
        textFont:
          props.callDetailsStyle?.subtitleTextFont ||
          fontHelper(theme.value.typography.title2),
        textColor:
          props.callDetailsStyle?.subtitleTextColor ||
          theme.value.palette.getAccent600(),
      };
    };

    const getSectionListStyle = (): CSSProperties => {
      return {
        display: "flex",
        flexDirection: "column",
        rowGap: "32px",
      };
    };

    const getTemplates = () => {
      console.log("PRINTING TEMPLATES: ", templates);
      return templates;
    };

    const getSectionTitleWrapperStyle = (): CSSProperties => {
      return {
        marginBottom: "16px",
      };
    };

    const getSectionTitleStyle = (
      template: CometChatDetailsTemplate
    ): LabelStyle => {
      return {
        textFont:
          template.titleFont || props.callDetailsStyle?.sectionHeaderTextFont,
        textColor:
          template.titleColor || props.callDetailsStyle?.sectionHeaderTextColor,
      };
    };

    const getOptionsForTemplate = (template: CometChatDetailsTemplate): any => {
      const { options, id, hideItemSeparator, itemSeparatorColor } = template;
      let curOptions: CometChatDetailsOption[] = [];
      if (options && id != undefined) {
        curOptions =
          userOrGroup.value instanceof CometChat.User
            ? options(userOrGroup.value, null, id)
            : options(null, userOrGroup.value, id);
      }
      console.log(curOptions);
      return curOptions;
    };

    const getOptionListStyle = (): CSSProperties => {
      return {
        display: "flex",
        flexDirection: "column",
        rowGap: "8px",
      };
    };

    const getDefaultOptionStyle = (): CSSProperties => {
      return {
        display: "flex",
        flexDirection: "column",
        rowGap: "4px",
      };
    };

    const onCloseClicked = () => () => {
      if (props.onClose) {
        props.onClose();
      }
    };

    const getTailWrapperStyle = (): CSSProperties => {
      return {
        position: "absolute",
        right: "8px",
        top: "50%",
        transform: "translateY(-50%)",
      };
    };

    const getDividerStyle = (
      separatorColor: string | undefined,
      isSectionSeparatorStyle: boolean
    ): CSSProperties => {
      return {
        width: "100%",
        height: (isSectionSeparatorStyle ? "2" : "1") + "px",
        background: separatorColor || theme.value.palette.getAccent200(),
      };
    };

    return {
      getTitleStyle,
      getCallDetailsStyle,
      getHeaderStyle,
      getTitleWrapperStyle,
      getCloseBtnStyle,
      getContentStyle,
      userOrGroup,
      CometChat,
      getProfileStyle,
      getListItemStatusIndicatorColor,
      getListItemStatusIndicatorIcon,
      getListItemStyle,
      getAvatarStyle,
      getStatusIndicatorStyle,
      getSubtitleText,
      getSubtitleStyle,
      loggedInUser,
      getSectionListStyle,
      getTemplates,
      getSectionTitleWrapperStyle,
      getSectionTitleStyle,
      getOptionsForTemplate,
      getOptionListStyle,
      getDefaultOptionStyle,
      onCloseClicked,
      getTailWrapperStyle,
      getDividerStyle,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
