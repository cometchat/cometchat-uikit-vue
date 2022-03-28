<template>
  <CometChatBubbleTemplate v-bind="$props">
    <div :style="styles.messageKitBlockStyle" class="message_kit__blocks">
      <div :style="styles.messageBlockStyle" class="message__message-blocks">
        <p
          :style="styles.pollQuestionStyle"
          class="message__message-pollquestion"
        >
          {{ pollQuestionData }}
        </p>
      </div>
      <ul :style="styles.pollAnswerStyle" class="message__message-polloptions">
        <CometChatPollOptionsBubble
          v-for="(option, optionKey) in pollOptionsData"
          :key="optionKey"
          :pollOption="option"
          :voteCount="voteCountData"
          :pollOptionsFont="pollOptionsFont"
          :pollOptionsColor="pollOptionsColor"
          :pollOptionsBackgroundColor="pollOptionsBackgroundColor"
          :loggedInUser="loggedInUser"
          :messageObject="messageObject"
        />
      </ul>
      <div :style="styles.voteCountStyle" class="message__message-votecount">
        <p :style="styles.voteCountTextStyle">{{ voteCountText }}</p>
      </div>
    </div>
  </CometChatBubbleTemplate>
</template>

<!--eslint-disable-->
<script>
import {
  DEFAULT_OBJECT_PROP,
  DEFAULT_STRING_PROP,
  DEFAULT_ARRAY_PROP,
  metadataKey,
  getExtensionsData,
} from "../..";
import { CometChatBubbleTemplate } from "../..";
import CometChatPollOptionsBubble from "../CometChatPollOptionsBubble/CometChatPollOptionsBubble";
import { DEFAULT_NUMBER_PROP } from "../../../../resources/constants";
import { localize } from "../../../Shared";
import * as style from "./style";

/**
 * Message bubble for sent image messages.
 *
 * @displayName CometChatDocumentBubble
 */
export default {
  name: "CometChatDocumentBubble",
  components: {
    CometChatBubbleTemplate,
    CometChatPollOptionsBubble,
  },
  props: {
    /**
     * Current logged in user.
     */
    loggedInUser: { ...DEFAULT_OBJECT_PROP, default: null },
    /**
     * width.
     */
    width: { ...DEFAULT_STRING_PROP, default: "100%" },
    /**
     * height.
     */
    height: { ...DEFAULT_STRING_PROP, default: "auto" },
    /**
     * cornerradius.
     */
    cornerRadius: { ...DEFAULT_STRING_PROP, default: "12px" },
    /**
     * backgroundColor.
     */
    backgroundColor: { ...DEFAULT_STRING_PROP, default: "#39f" },
    /**
     * borderWidth.
     */
    border: { ...DEFAULT_STRING_PROP, default: "0 none" },
    /**
     * avatar.
     */
    avatar: { ...DEFAULT_STRING_PROP, default: null },
    /**
     * username.
     */
    userName: { ...DEFAULT_STRING_PROP, default: null },
    /**
     * usernameFont.
     */
    usernameFont: {
      ...DEFAULT_STRING_PROP,
      default: "600 13px Inter,sans-serif",
    },
    /**
     * usernameColor.
     */
    usernameColor: { ...DEFAULT_STRING_PROP, default: "#39f" },
    /**
     * messageAlignment.
     */
    messageAlignment: { ...DEFAULT_STRING_PROP, default: "leftAligned" },
    /**
     * messageTimeAlignment.
     */
    messageTimeAlignment: { ...DEFAULT_STRING_PROP, default: "bottom" },
    /**
     * The message object.
     */
    messageObject: { ...DEFAULT_OBJECT_PROP, default: null },
    /**
     * The message messageOptions.
     */
    messageOptions: { ...DEFAULT_ARRAY_PROP, default: [] },
    /**
     * pollQuestion.
     */
    pollQuestion: { ...DEFAULT_STRING_PROP, default: "" },
    /**
     * pollQuestionFont.
     */
    pollQuestionFont: {
      ...DEFAULT_STRING_PROP,
      default: "400 15px Inter,sans-serif",
    },
    /**
     * pollQuestionColor.
     */
    pollQuestionColor: { ...DEFAULT_STRING_PROP, default: "#fff" },
    /**
     * pollOptions.
     */
    pollOptions: { ...DEFAULT_OBJECT_PROP, default: {} },
    /**
     * pollOptionsFont.
     */
    pollOptionsFont: {
      ...DEFAULT_STRING_PROP,
      default: "400 15px Inter,sans-serif",
    },
    /**
     * pollOptionsColor.
     */
    pollOptionsColor: { ...DEFAULT_STRING_PROP, default: "#39f" },
    /**
     * pollOptionsBackgroundColor.
     */
    pollOptionsBackgroundColor: { ...DEFAULT_STRING_PROP, default: "#fff" },
    /**
     * voteCount.
     */
    voteCount: { ...DEFAULT_NUMBER_PROP, default: 0 },
    /**
     * voteCountFont.
     */
    voteCountFont: {
      ...DEFAULT_STRING_PROP,
      default: "400 15px Inter,sans-serif",
    },
    /**
     * voteCountColor.
     */
    voteCountColor: { ...DEFAULT_STRING_PROP, default: "#fff" },
  },
  data() {
    return {
      voteCountText: localize("NO_VOTE"),
      pollQuestionData: null,
      pollOptionsData: null,
      voteCountData: 0,
    };
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        messageKitBlockStyle: style.messageKitBlockStyle(this),
        messageBlockStyle: style.messageBlockStyle(this),
        pollQuestionStyle: style.pollQuestionStyle(this),
        pollAnswerStyle: style.pollAnswerStyle(this),
        voteCountStyle: style.voteCountStyle(this),
        voteCountTextStyle: style.voteCountTextStyle(this),
      };
    },
  },
  methods: {
    updateVote() {
      if (this.voteCountData === 1) {
        this.voteCountText = `${this.voteCountData} ${localize("VOTE")}`;
      } else if (this.voteCount > 1) {
        this.voteCountText = `${this.voteCountData} ${localize("VOTES")}`;
      }
    },
    /**
     * Parses the document data from message.
     */
    setQuestions() {
      if (this.pollQuestion && this.pollQuestion.trim().length) {
        this.pollQuestionData = this.pollQuestion;
      } else if (this.messageObject) {
        const pollsData = getExtensionsData(
          this.messageObject,
          metadataKey.extensions.polls
        );
        if (
          pollsData &&
          pollsData.question &&
          pollsData.question.trim().length
        ) {
          this.pollQuestionData = pollsData.question;
        }
      }
    },
    setOptions() {
      if (this.pollOptions && this.pollOptions.length) {
        this.pollOptionsData = Object.entries(this.pollOptions);
      } else if (this.messageObject) {
        const pollsData = getExtensionsData(
          this.messageObject,
          metadataKey.extensions.polls
        );
        if (
          pollsData &&
          pollsData.results &&
          pollsData.results.options &&
          typeof pollsData.results.options === "object" &&
          Object.keys(pollsData.results.options).length
        ) {
          this.pollOptionsData = Object.entries(pollsData.results.options);
        }
      }
    },
    setVoteCount() {
      if (this.voteCount && this.voteCount.length) {
        this.voteCountData = this.voteCount;
      } else if (this.messageObject) {
        const pollsData = getExtensionsData(
          this.messageObject,
          metadataKey.extensions.polls
        );
        if (
          pollsData &&
          pollsData.results &&
          pollsData.results.total &&
          pollsData.results.total > 0
        ) {
          this.voteCountData = pollsData.results.total;
        }
      }
    },
  },
  mounted() {
    this.setQuestions();
    this.setOptions();
    this.setVoteCount();
    this.updateVote();
  },
};
</script>