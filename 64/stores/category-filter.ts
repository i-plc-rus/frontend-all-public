import { defineStore } from 'pinia';

export const useCategoryFilterStore = defineStore('transactionFilter', {
  state: () => ({
    selectedCategoryIds: null as Set<string> | null
  }),
  getters: {},
  actions: {
    toggle(categoryIds: Set<string> | string[]) {
      if (this.selectedCategoryIds == null) {
        this.selectedCategoryIds = new Set(categoryIds);
      } else {
        const categoryIdsSet = new Set(categoryIds);
        if (areSetsEqual(this.selectedCategoryIds, categoryIdsSet)) {
          this.selectedCategoryIds = null;
        } else {
          this.selectedCategoryIds = categoryIdsSet;
        }
      }
    },
    reset() {
      this.selectedCategoryIds = null;
    }
  }
});
