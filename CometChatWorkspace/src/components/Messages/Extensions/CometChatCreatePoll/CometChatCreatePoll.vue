<template>
  <div>
    <div :style="styles.modalWrapper" class="modal__createpoll__wrapper">
      <span :style="styles.modalClose" @click="closeModal"></span>
      <div :style="styles.modalBody">
        <table :style="styles.modalTable" class="modal__createpoll__table">
          <caption :style="styles.tableCaption">
            {{
              localize("CREATE_POLL")
            }}
          </caption>
          <tbody
            :style="styles.tableBody"
            class="modal__createpoll__table__body"
          >
            <tr :style="styles.modalTableRow">
              <td colSpan="3">
                <div :style="styles.modalError">{{ error }}</div>
              </td>
            </tr>
            <tr :style="styles.modalTableRow">
              <td>
                <label>{{ localize("QUESTION") }}</label>
              </td>
              <td colSpan="2">
                <input
                  type="text"
                  autoFocus
                  tabIndex="1"
                  v-model="question"
                  :style="styles.input"
                  :placeholder="localize('ENTER_YOUR_QUESTION')"
                />
              </td>
            </tr>
            <tr :style="styles.modalTableRow">
              <td>
                <label>{{ localize("OPTIONS") }}</label>
              </td>
              <td colSpan="2">
                <input
                  type="text"
                  tabIndex="1"
                  :style="styles.input"
                  v-model="firstOption"
                  :placeholder="localize('ENTER_YOUR_OPTION')"
                />
              </td>
            </tr>
            <tr ref="optionRef" :style="styles.modalTableRow">
              <td>&nbsp;</td>
              <td colSpan="2">
                <input
                  type="text"
                  tabIndex="1"
                  :style="styles.input"
                  v-model="secondOption"
                  :placeholder="localize('ENTER_YOUR_OPTION')"
                />
              </td>
            </tr>
            <comet-chat-create-poll-options
              :key="i"
              :option="option"
              :input-styles="styles.input"
              :styles="styles.modalTableRow"
              v-for="(option, i) in options"
              @remove="removePollOption"
              @change="optionChangeHandler"
            />
            <tr :style="styles.modalTableRow" s>
              <td>&nbsp;</td>
              <td>
                <label>{{ localize("ADD_NEW_OPTION") }}</label>
              </td>
              <td :style="styles.iconWrapper">
                <span
                  :style="styles.addOptionIcon"
                  @click="addPollOption"
                ></span>
              </td>
            </tr>
          </tbody>

          <tfoot :style="{ display: 'inline-block', padding: '12px' }">
            <tr :style="{ border: 'none' }">
              <td :style="{ textAlign: 'center' }" colSpan="2">
                <button
                  :disabled="creatingPoll"
                  :style="styles.button"
                  @click="createPoll"
                >
                  {{ actionButtonText }}
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { CometChat } from "@cometchat-pro/chat";

import {
  DEFAULT_OBJECT_PROP,
  DEFAULT_BOOLEAN_PROP,
} from "../../";

import CometChatCreatePollOptions from "../CometChatCreatePollOptions/CometChatCreatePollOptions";

import * as style from "./style";

import addIcon from "./resources/add-circle-filled.svg";
import clearIcon from "./resources/close.svg";
import { localize } from "../../../Shared";
import { DEFAULT_FUNCTION_PROP } from "../../../../resources/constants";
import { CometChatMessageReceiverType } from "../../CometChatMessageConstants";

/**
 * Displays dialog to create a new poll.
 *
 * @displayName CometChatCreatePoll
 */
export default {
  name: "CometChatCreatePoll",
  components: {
    CometChatCreatePollOptions,
  },
  props: {
    user: { ...DEFAULT_OBJECT_PROP },
    group: { ...DEFAULT_OBJECT_PROP },
    open: { ...DEFAULT_BOOLEAN_PROP },
    onClose: { ...DEFAULT_FUNCTION_PROP },
    onSubmit: { ...DEFAULT_FUNCTION_PROP },
  },
  data() {
    return {
      error: "",
      options: [],
      question: "",
      firstOption: "",
      secondOption: "",
      loggedInUser: {},
      creatingPoll: false,
      pollOptionView: null,
    };
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        input: style.inputStyle(),
        modalBody: style.modalBodyStyle(),
        tableBody: style.tableBodyStyle(),
        tableFoot: style.tableFootStyle(),
        modalError: style.modalErrorStyle(),
        modalTable: style.modalTableStyle(),
        iconWrapper: style.iconWrapperStyle(),
        tableCaption: style.tableCaptionStyle(),
        modalClose: style.modalCloseStyle(clearIcon),
        addOptionIcon: style.addOptionIconStyle(addIcon),
        modalTableRow: style.modalTableRowStyle(),
        button: style.buttonStyle(this.creatingPoll),
        modalWrapper: style.modalWrapperStyle(),
      };
    },
    /**
     * Button text depending on component state.
     */
    actionButtonText() {
      return this.creatingPoll ? localize("CREATING") : localize("CREATE");
    },
    localize() {
      return localize;
    },
  },
  methods: {
    /**
     * Closes the modal
     */
    closeModal() {
      this.error = "";
      this.options = [];
      this.question = "";
      this.firstOption = "";
      this.secondOption = "";

      this.onClose();
    },
    /**
     * Handles change in options
     */
    optionChangeHandler({ event, option }) {
      const options = [...this.options];
      const optionKey = options.findIndex((opt) => opt.id === option.id);

      if (optionKey > -1) {
        const newOption = { ...option, value: event.target.value };

        options.splice(optionKey, 1, newOption);

        this.options = options;
      }
    },
    /**
     * Creates a new poll
     */
    async createPoll() {
      this.creatingPoll = true;

      try {
        const question = (this.question || "").trim();
        const firstOption = (this.firstOption || "").trim();
        const secondOption = (this.secondOption || "").trim();

        const optionItems = [firstOption, secondOption];
        let invalid = false;

        if (question.length === 0) {
          this.error = localize("INVALID_POLL_QUESTION");
          this.creatingPoll = false;
          return false;
        }

        if (firstOption.length === 0 || secondOption.length === 0) {
          invalid = true;
        }

        this.options.forEach((option) => {
          const value = (option.value || "").trim();

          if (!value) {
            invalid = true;
          }

          optionItems.push(value);
        });

        if (invalid) {
          this.error = localize("INVALID_POLL_OPTION");
          this.creatingPoll = false;
          return false;
        }

        let receiverId;
        let receiverType;

        if (this.user) {
          receiverId = this.user.uid;
          receiverType = CometChatMessageReceiverType.user;
        } else if (this.group) {
          receiverId = this.group.guid;
          receiverType = CometChatMessageReceiverType.group;
        }

        const response = await CometChat.callExtension(
          "polls",
          "POST",
          "v1/create",
          {
            question,
            options: optionItems,
            receiver: receiverId,
            receiverType: receiverType,
          }
        );

        const data = response.message.data;
        const customData = data.data.customData;
        const options = customData.options;

        const resultOptions = {};
        for (const option in options) {
          resultOptions[option] = {
            text: options[option],
            count: 0,
          };
        }

        // const polls = {
        //   id: data.id,
        //   options: options,
        //   results: {
        //     total: 0,
        //     options: resultOptions,
        //     question: customData.question,
        //   },
        //   question: customData.question,
        // };

        // const message = {
        //   ...data,
        //   sender: { uid: data.sender },
        //   metadata: { "@injected": { extensions: { polls: polls } } },
        // };

        this.error = "";
        this.onSubmit()
      } catch (error) {
        this.logError("[CometChatCreatePoll] error", error);
        const errorMessage = (error || {}).message;
        this.error =
          Object.prototype.toString.call(errorMessage) === "[object String]"
            ? errorMessage
            : localize("SOMETHING_WRONG");
      } finally {
        this.creatingPoll = false;
      }
    },
    /**
     * Adds a new poll option.
     */
    addPollOption() {
      const options = [...this.options];
      options.push({ value: "", id: new Date().getTime() });

      this.options = options;
    },
    /**
     * Removes a given poll option.
     */
    removePollOption(option) {
      const options = [...this.options];
      const optionKey = options.findIndex((opt) => opt.id === option.id);
      if (optionKey > -1) {
        options.splice(optionKey, 1);

        this.options = options;
      }
    },
  },
  beforeMount() {
    CometChat.getLoggedinUser().then((user) => this.loggedInUser = user);
  },
};
</script>
<style>
.modal__createpoll__table tr {
  width: 100%;
  display: table;
  table-layout: fixed;
}

.modal__createpoll__table__body td {
  padding: 6px 12px;
  font-size: 14px;
}
.modal__createpoll__table__body tr td:first-of-type {
  width: 90px;
}
.modal__createpoll__table__body label {
  padding: 6px 12px;
}
.modal__createpoll__table input:focus {
  outline: none !important;
}
@media (min-width: 320px) and (max-width: 767px) {
  .modal__createpoll__wrapper {
    width: 100% !important;
    height: 100% !important;
  }
}
</style>