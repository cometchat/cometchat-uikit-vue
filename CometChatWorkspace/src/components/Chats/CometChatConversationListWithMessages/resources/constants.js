export const DEFAULT_STRING_PROP = {
  type: String,
  default: "",
  required: false,
};

export const DEFAULT_OBJECT_PROP = {
  type: Object,
  required: false,
  default: function () {
    return {};
  },
};

export const DEFAULT_BOOLEAN_PROP = {
  type: Boolean,
  required: false,
  default: false,
};

export const DEFAULT_NUMBER_PROP = {
  type: Number,
  required: false,
  default: 0,
};

export const DEFAULT_ARRAY_PROP = {
  type: Array,
  required: false,
  default: function () {
    return [];
  },
};