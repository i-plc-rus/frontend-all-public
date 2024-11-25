<script setup lang="ts">
import type { SelectHTMLAttributes } from 'vue';
import type { IOption } from '~/types/option';

interface Props {
  selectProps: SelectHTMLAttributes;
  options: IOption[];
}

const { selectProps } = defineProps<Props>();
const model = defineModel<string>();
const id = selectProps.id || useId();
</script>

<template>
  <select :id v-model="model" class="ui-select" v-bind="selectProps">
    <option
      v-for="option in options"
      :key="option.value"
      :disabled="option.disabled"
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<style lang="scss" scoped>
.ui-select {
  @include input();
  padding-right: 30px;

  appearance: none;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAMAAACtdX32AAAAdVBMVEUAAAD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhMdQaAAAAJ3RSTlMAAAECAwQGBwsOFBwkJTg5RUZ4eYCHkJefpaytrsXGy8zW3+Do8vNn0bsyAAAAYElEQVR42tXROwJDQAAA0Ymw1p9kiT+L5P5HVEi3qJn2lcPjtIuzUIJ/rhIGy762N3XaThqMN1ZPALsZPEzG1x8LrFL77DHBnEMxBewz0fJ6LyFHTPL7xhwzWYrJ9z22AqmQBV757MHfAAAAAElFTkSuQmCC');
  background-position: 97%;
  background-repeat: no-repeat;
  background-size: 20px;
}
</style>
