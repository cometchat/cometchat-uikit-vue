import { logger } from "../util/common";

export default {
  inheritAttrs: false,
  computed: {
    canPlayAudio() {
      return true;
    },
  },
  methods: {
    /**
     * Emits an action event
     * @param {*} action
     * @param {*} payload
     */
    emitAction(action, payload) {
      this.emitEvent("action", { action, ...payload });
    },
    /**
     * Emits an event
     * @param {*} name
     * @param {*} payload
     */
    emitEvent(name, payload) {
      this.$emit(name, payload);
    },
    /**
     * Logs info message to console
     * @param  {...any} args
     */
    logInfo(...args) {
      logger("info", ...args);
    },
    /**
     * Logs error message to console
     * @param  {...any} args
     */
    logError(...args) {
      logger("error", ...args);
    },
    /**
     * Generates unique ID
     * @param {*} i
     */
    uid(i = 1) {
      return (
        `${i}` +
        Date.now().toString(36) +
        Math.random().toString(36).substring(2)
      );
    },
  },
};
