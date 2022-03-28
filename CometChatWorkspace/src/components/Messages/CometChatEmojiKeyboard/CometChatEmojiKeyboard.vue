<template>
  <div :style="styles.pickerStyle">
    <Picker
      :title="title"
      emoji="point_up"
      native
      :data="emojiIndex"
      @select="emojiClicked"
      :showPreview="false"
      :exclude="exclude"
      :i18n="{ categories: categories }"
      :style="{ bottom: '100px', zIndex: '2', width: '100%', height: '230px' }"
    />
  </div>
</template>
<script>
import * as style from "./style";
import data from "emoji-mart-vue-fast/data/all.json";
import { Picker, EmojiIndex } from "emoji-mart-vue-fast/src";
import "emoji-mart-vue-fast/css/emoji-mart.css";
import { DEFAULT_STRING_PROP, DEFAULT_FUNCTION_PROP } from "../";
import { localize } from "../../Shared";
/**
 *
 * @displayName CometChatEmojiKeyboard
 */
export default {
  name: "CometChatEmojiKeyboard",
  components: {
    Picker,
  },
  props: {
    lang: { ...DEFAULT_STRING_PROP, default: "en" },
    emojiClicked: { ...DEFAULT_FUNCTION_PROP, default: () => {} },
  },
  data() {
    return {
      categories: {
        people: localize("SMILEY_PEOPLE"),
        nature: localize("ANIMALES_NATURE"),
        foods: localize("FOOD_DRINK"),
        activity: localize("ACTIVITY"),
        places: localize("TRAVEL_PLACES"),
        objects: localize("OBJECTS"),
        symbols: localize("SYMBOLS"),
        flags: localize("FLAGS"),
      },
      title: localize("PICK_YOUR_EMOJI"),
      exclude: ["search", "recent"],
      emojiIndex: new EmojiIndex(data),
    };
  },
  watch: {
    lang: function () {
      this.categories = {
        search: localize("SEARCH"),
        people: localize("SMILEY_PEOPLE"),
        nature: localize("ANIMALES_NATURE"),
        foods: localize("FOOD_DRINK"),
        activity: localize("ACTIVITY"),
        places: localize("TRAVEL_PLACES"),
        objects: localize("OBJECTS"),
        symbols: localize("SYMBOLS"),
        flags: localize("FLAGS"),
      };
      this.title = localize("PICK_YOUR_EMOJI");
    },
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        pickerStyle: style.pickerStyle(),
      };
    },
  },
};
</script>