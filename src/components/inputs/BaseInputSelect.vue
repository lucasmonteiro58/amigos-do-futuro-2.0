<script setup>
import { useVModel } from '@vueuse/core'
import Multiselect from '@vueform/multiselect'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    default: () => []
  },
  width: {
    type: String,
    default: '100%'
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])
const data = useVModel(props, 'modelValue', emit)
</script>

<template>
  <div>
    <BaseImg img="input-box" :width="width"> </BaseImg>
    <Multiselect
      class="!mt-[-105px]"
      v-model="data"
      :options="options"
      :placeholder="placeholder"
      searchable
      noResultsText="Não encontrado"
      clear
    />
  </div>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>

<style>
.multiselect-clear {
  padding: 0px;
  transform: scale(1.8);
  right: 30px;
}
.multiselect-dropdown {
  margin: -45px 45px;
}

.multiselect-no-results {
  font-size: 30px;
}
:root {
  --ms-font-size: 48px;
  --ms-bg: transparent;
  --ms-bg-disabled: transparent;
  --ms-border-color: transparent;
  --ms-border-width: 0px;
  --ms-border-color-active: transparent;
  --ms-border-width-active: 0px;
  --ms-radius: 0px;
  --ms-py: 0.5rem;
  --ms-px: 4rem;
  --ms-ring-width: 0px;
  --ms-ring-color: none;
  --ms-placeholder-color: #9ca3af;
  --ms-max-height: 25rem;

  --ms-tag-remove-radius: 10px;

  --ms-dropdown-bg: #ffffff;
  --ms-dropdown-border-color: none;
  --ms-dropdown-border-width: 0px;
  --ms-dropdown-radius: 0px;

  --ms-option-font-size: 30px;
  --ms-option-bg-pointed: #ffffff;
  --ms-option-color-pointed: #1f2937;
  --ms-option-bg-selected: #4277af;
  --ms-option-color-selected: #ffffff;
  --ms-option-bg-disabled: #ffffff;
  --ms-option-color-disabled: #d1d5db;
  --ms-option-bg-selected-pointed: #4277af;

  --ms-option-py: 1rem;
  --ms-option-px: 1.5rem;
}
</style>
