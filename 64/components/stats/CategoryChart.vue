<script setup lang="ts">
import { Doughnut } from 'vue-chartjs';
import type { ChartOptions } from 'chart.js';

const SECONDARY_CATEGORY_COLOR = '#b3b2b3';
const SECONDARY_CATEGORY_COLOR_HIGHLIGHTED = '#6b6b6b';
const CATEGORY_COLORS = [
  '#3a7ad3',
  '#d95151',
  '#53b74c',
  '#f1d33f',
  '#b973e5',
  SECONDARY_CATEGORY_COLOR
] as const;

const colorMode = useColorMode();
const transactionFilterStore = useCategoryFilterStore();
const visibleCategoriesStore = useVisibleCategoriesStore();
const transactionsStore = useTransactionsStore();

// need to track effective background color in js to pass it to chart to draw on canvas
const cardBackgroundColor = ref<string>();
watch(
  colorMode,
  () =>
    (cardBackgroundColor.value = getComputedStyle(
      document.body
    ).getPropertyValue('--p-card-background')),
  { immediate: true }
);

const chartData = computed(() => {
  const categoryDetails =
    visibleCategoriesStore.visibleCategories.categoryDetails;
  const data = categoryDetails.map((details) => details.totalExpenses);
  if (visibleCategoriesStore.visibleCategories.remainder) {
    data.push(visibleCategoriesStore.visibleCategories.remainder.totalExpenses);
  }
  return {
    labels: categoryDetails.map((details) => details.label),
    datasets: [
      {
        data,
        borderWidth: 4,
        borderRadius: 6,
        borderColor: cardBackgroundColor.value,
        backgroundColor:
          transactionFilterStore.selectedCategoryIds == null
            ? CATEGORY_COLORS
            : getBackgroundColorWithSelection()
      }
    ]
  };
});

function getBackgroundColorWithSelection() {
  const categoryDetails =
    visibleCategoriesStore.visibleCategories.categoryDetails;
  return CATEGORY_COLORS.map((color, index) => {
    if (
      transactionFilterStore.selectedCategoryIds?.size === 1 &&
      transactionFilterStore.selectedCategoryIds.has(
        categoryDetails[index]?.category ?? ''
      )
    ) {
      return color; // simple category selected
    }
    if (index === categoryDetails.length) {
      //"Other" category group
      return otherCategoriesSelected.value
        ? SECONDARY_CATEGORY_COLOR_HIGHLIGHTED
        : SECONDARY_CATEGORY_COLOR;
    }
    return SECONDARY_CATEGORY_COLOR;
  });
}

const chartOptions: ChartOptions<any> = {
  responsive: true,
  cutout: '75%',
  transitions: {
    resize: {
      animation: {
        duration: 200
      }
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
};
const otherCategoriesSelected = computed(() =>
  areSetsEqual(
    visibleCategoriesStore.visibleCategories.remainder?.categories,
    transactionFilterStore.selectedCategoryIds
  )
);
const totalIncome = computed(() => {
  return transactionFilterStore.selectedCategoryIds == null
    ? `+${formatAmount(visibleCategoriesStore.visibleCategories.totalIncome)}`
    : null; //don't show income if category selected: it may be misleading
});
const totalExpenses = computed(() => {
  if (transactionFilterStore.selectedCategoryIds == null) {
    return formatAmount(visibleCategoriesStore.visibleCategories.totalExpenses);
  }
  const total = transactionsStore.transactions.reduce(
    (prev, cur) =>
      prev +
      (cur.amount < 0 &&
      transactionFilterStore.selectedCategoryIds?.has(cur.category)
        ? cur.amount
        : 0),
    0
  );
  return formatAmount(total);
});
</script>

<template>
  <div class="category-chart" role="group">
    <div
      class="category-chart__container"
      v-if="visibleCategoriesStore.visibleCategories.categoryDetails.length"
    >
      <!-- v-if on chart area prevents it from jumping due to initial resize (due to categories being rendered) -->
      <Doughnut
        :options="chartOptions"
        :data="chartData"
        role="img"
        :aria-label="$t('chart.categoryChartAria')"
        aria-describedby="categoryChartTotals"
      >
        {{ $t('chart.alt') }}
      </Doughnut>
      <div
        class="category-chart__container__overlay"
        id="categoryChartTotals"
        role="math"
      >
        <div
          v-if="totalIncome"
          class="category-chart__container__overlay__income"
          data-testid="chartTotalIncome"
        >
          {{ totalIncome }}
        </div>
        <div
          class="category-chart__container__overlay__expenses"
          data-testid="chartTotalExpenses"
        >
          {{ totalExpenses }}
        </div>
      </div>
    </div>
    <div class="category-chart__filter" role="list" aria-controls="transactionsList categoryChartTotals">
      <CategoryFilterButton
        v-for="(categoryDetails, index) of visibleCategoriesStore
          .visibleCategories.categoryDetails"
        :key="categoryDetails.category!"
        :category-details="categoryDetails"
        :selected="
            (transactionFilterStore.selectedCategoryIds?.size === 1 && transactionFilterStore.selectedCategoryIds?.has(categoryDetails.category!)) ?? false
          "
        :color="CATEGORY_COLORS[index]"
        :data-testid="`category-filter:${categoryDetails.category}`"
        @click="transactionFilterStore.toggle([categoryDetails.category!])"
      ></CategoryFilterButton>
      <CategoryFilterButton
        v-if="visibleCategoriesStore.visibleCategories.remainder"
        :category-details="visibleCategoriesStore.visibleCategories.remainder"
        :selected="otherCategoriesSelected"
        :color="SECONDARY_CATEGORY_COLOR"
        @click="
          transactionFilterStore.toggle(
            visibleCategoriesStore.visibleCategories.remainder?.categories
          )
        "
      ></CategoryFilterButton>
    </div>
  </div>
</template>

<style lang="scss">
.category-chart {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 0;
  gap: var(--generic-spacing);

  &__container {
    display: flex;
    min-height: 0; // Allows chart canvas to shrink correctly if it doesn't fit
    max-height: 75%; // Somewhat prevents jumping due to resize when categories appear
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    position: relative;
    animation: 700ms linear 1 appear; //this is mostly to prevent chart from jumping due to positioning

    &__overlay {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      width: 100%;
      height: 100%;
      font-weight: bold;

      &__income {
        color: var(--positive-color);
      }

      &__expenses {
        color: var(--negative-color);
      }
    }
  }

  &__filter {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: calc(var(--generic-spacing) / 2);
    animation: 700ms linear 1 appear;

    &__remove {
      height: auto !important;
      padding: 0;
    }
  }
}
</style>
