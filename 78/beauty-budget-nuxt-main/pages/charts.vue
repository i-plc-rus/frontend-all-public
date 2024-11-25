<script setup lang="ts">
import type { IBarChartValue } from '~/types/chart';

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Графики` : 'Графики';
  },
});

const store = useTransactionsStore();
const barChartValues: IBarChartValue[] = [
  ['Доходы', store.totalTransactionsSum.income],
  ['Расходы', store.totalTransactionsSum.outcome],
];
</script>

<template>
  <div class="charts-page">
    <PieChart
      title="Доходы по категориям"
      :values="store.incomeCategoriesSortedBySum"
      :total="store.totalTransactionsSum.income"
    />
    <PieChart
      title="Расходы по категориям"
      :values="store.outcomeCategoriesSortedBySum"
      :total="store.totalTransactionsSum.outcome"
    />
    <BarChart
      title="Доходы vs Расходы"
      :total="store.totalTransactionsSum.total"
      :values="barChartValues"
    />
  </div>
</template>

<style lang="scss" scoped>
.charts-page {
  display: grid;
  align-content: start;
  justify-items: stretch;
  gap: $mobile-outer-gap;
  width: 100%;
  margin: 0 auto;

  @include wide-mobile() {
    max-width: 690px;
  }

  @include desktop() {
    gap: $desktop-outer-gap;
  }
}
</style>
