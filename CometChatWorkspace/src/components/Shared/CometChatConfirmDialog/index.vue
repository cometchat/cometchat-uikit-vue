<template>
  <div>
    <comet-chat-backdrop position="absolute" :show="true" @click="emitEvent('close')" />
    <div className="confirm__dialog" :style="styles.alertWrapperStyle">
      <div className="confirm__message" :style="styles.alertMessageStyle">
        {{message}}
      </div>
      <div className="confirm__buttons" :style="styles.alertButtonWrapStyle">
        <button type="button" value="no" :style="styles.alertButtonStyleNo" @click="confirmClick">{{cancelButtonText}}</button>
        <button type="button" value="yes" :style="styles.alertButtonStyleYes" @click="confirmClick">{{confirmButtonText}}</button>
      </div>
    </div>
  </div>
</template>

<script>

import { DEFAULT_OBJECT_PROP, DEFAULT_STRING_PROP } from "../../../resources/constants";
import { propertyCheck } from "../../../mixins/";
import * as style from "./style";
import { CometChatEvent } from '../../../util/CometChatEvent';
import { EVENTS } from '../../../util/enums';
import { CometChatBackdrop } from '../../Shared';
import cometchatCommon from '../../../mixins/cometchat-common';

/**
 * Cometchat confirm dialog.
 *
 * @displayName cometchatConfirmDialog
 */
export default {
  name: "cometchatConfirmDialog",
  mixins: [propertyCheck, cometchatCommon],
  components: {
    CometChatBackdrop
  },
  props: {
    /**
     * Theme of the UI.
     */
    theme: { ...DEFAULT_OBJECT_PROP },
    /**
     * Message.
     */
    message: { ...DEFAULT_STRING_PROP },
    /**
     * confirmButtonText.
     */
    confirmButtonText: { ...DEFAULT_STRING_PROP },
    /**
     * cancelButtonText.
     */
    cancelButtonText: { ...DEFAULT_STRING_PROP },
  },
  data() {
    return {
      deleteInProgress: false
    }
  },
  computed: {
    /**
     * Computed styles for the component.
     */ 
    styles() {
      return {
        alertWrapperStyle: style.alertWrapperStyle(this.theme),
        alertMessageStyle: style.alertMessageStyle(),
        alertButtonWrapStyle: style.alertButtonWrapStyle(),
        alertButtonStyleYes: style.alertButtonStyleYes(this.theme),
        alertButtonStyleNo: style.alertButtonStyleNo(this.theme)
      }
    },
  },
  methods: {
    /**
     * ConfirmClick
     */
    confirmClick(event) {
      CometChatEvent.triggerHandler(EVENTS["CONFIRM_RESPONSE"], event)
    },
  }
};
</script>
<style scoped>
.confirm__dialog__backdrop {
  position: absolute;
}
</style>