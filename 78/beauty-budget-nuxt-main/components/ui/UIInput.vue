<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue';

interface Props {
  inputProps: InputHTMLAttributes;
  dataListOptions?: string[];
}

const { inputProps } = defineProps<Props>();
const model = defineModel<string | number>();
const id = inputProps.id || useId();
const listId = `${id}-list`;
</script>

<template>
  <!-- prettier-ignore -->
  <input :id v-model="model" :list="listId" class="ui-input" :class="{'ui-input_with-datalist': !!dataListOptions}" v-bind="inputProps" >
  <datalist v-if="dataListOptions" :id="listId">
    <option v-for="option in dataListOptions" :key="option" :value="option" />
  </datalist>
</template>

<style lang="scss" scoped>
.ui-input {
  @include input();
}
</style>
