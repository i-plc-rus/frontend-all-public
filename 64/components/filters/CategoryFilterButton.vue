<script setup lang="ts">
const { color, selected } = defineProps<{
  color: string;
  selected: boolean;
  categoryDetails: CategoryDetails;
}>();

const severity = computed(() => (selected ? 'success' : 'secondary'));
</script>

<template>
  <Button
    class="category-filter-button"
    rounded
    size="small"
    :severity="severity"
    badgeSeverity="contrast"
    :class="{ 'category-filter-button--selected': selected }"
    :style="{
      borderColor: selected ? null : color
    }"
    role="checkbox"
    :aria-label="$t('categoryFilter.selectCategoryAria', { category: categoryDetails.label })"
  >
    <img
      v-if="categoryDetails.iconUrl"
      :src="categoryDetails.iconUrl"
      class="category-filter-button__image"
      alt=""
    />
    <span class="category-filter-button__text">{{
      categoryDetails.label
    }}</span>
  </Button>
</template>

<style>
/* Assume all icons are black, invert when selected to be visible on contrast background. */
@media (prefers-color-scheme: dark) {
  .category-filter-button__image {
    filter: invert(100%);
  }
  .category-filter-button--selected > .category-filter-button__image {
    filter: none;
  }
}

@media (prefers-color-scheme: light) {
  .category-filter-button--selected > .category-filter-button__image {
    filter: invert(100%);
  }
}

.category-filter-button__text {
  max-width: 8rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
