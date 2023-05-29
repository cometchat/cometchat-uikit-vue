<template>
  <cometchat-popover
    :placement="placement"
    :popoverStyle="popoverStyle"
    key="stickers-extension-popover"
  >
    <div slot="children">
      <cometchat-button
        :key="componentIndex"
        ref="buttonRef"
        :iconURL="showOpenIconRef ? openIconURL : closeIconURL"
        :buttonStyle="emojiButtonStyle"
        @cc-button-clicked="toggleIcon($event)"
      ></cometchat-button>
    </div>
    <div slot="content">
      <stickers-keyboard
        :key="'keyboard_' + componentIndex"
        :stickerStyle="stickerKeyboardStyle"
        v-on="stickerKeyboardListeners ? stickerKeyboardListeners : {}"
      >
      </stickers-keyboard>
    </div>
  </cometchat-popover>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from "vue";
import "my-cstom-package-lit";

export default defineComponent({
  name: "CometChatStickersAuxiliaryButton",
  emits: ["component-event"],
  components: {},
  props: {
    openIconURL: { type: String },
    closeIconURL: { type: String },
    placement: { type: Number },
    emojiButtonStyle: { type: null },
    popoverStyle: { type: null },
    stickerKeyboardStyle: { type: null },
    stickerKeyboardListeners: { type: null },
    listeners: {
      type: null,
    },
    auxiliaryButtonRefs: { type: null },
    componentIndex: { type: Number },
  },
  setup(props, context) {
    let showOpenIconRef: Ref<boolean> = ref(true);
    let buttonRef: any = ref(null);

    onMounted(() => {
      context.emit("component-event", {
        name: "register",
        componentIndex: props.componentIndex,
        onClick,
      });
    });

    const onClick = () => {
      if (!showOpenIconRef.value) {
        buttonRef!.value.click();
      }
      showOpenIconRef.value = true;
    };
    const toggleIcon = (event: any) => {
      showOpenIconRef.value = !showOpenIconRef.value;
      if (!showOpenIconRef.value) {
        context.emit("component-event", {
          name: "open",
          componentIndex: props.componentIndex,
        });
      }
    };

    return { toggleIcon, showOpenIconRef, buttonRef };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
