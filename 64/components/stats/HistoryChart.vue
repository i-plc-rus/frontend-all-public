<script setup lang="ts">
import { Line } from 'vue-chartjs';
import type { ChartOptions } from 'chart.js';

const transactionsStore = useTransactionsStore();
const transactionDateFilterStore = useTransactionDateFilterStore();
const { t } = useI18n();

function getDataset(): { labels: string[]; data: number[] } {
  const transactions = transactionsStore.transactions;
  if (transactions.length === 0) {
    return { labels: [], data: [] };
  }
  // timestamps will be groupe using this callback return value
  const getTimeComponentToCompare =
    transactionDateFilterStore.mode === 'year'
      ? (t: number) => {
          const d = new Date(t);
          return d.getFullYear() * 10 + d.getUTCMonth();
        }
      : (t: number) => Math.trunc(t / MS_IN_ONE_DAY);
  const formatTimestamp =
    transactionDateFilterStore.mode === 'year'
      ? formatUtcMonth
      : (t: number) => formatUtcDate(t, { monthFormat: 'short' });

  const labels: string[] = [];
  const data: number[] = [];
  const lastI = transactions.length - 1;
  let curTimestamp = transactions[lastI].timestamp;
  let curAmount = transactions[lastI].amount;
  for (let i = lastI - 1; i >= 0; --i) {
    const transaction = transactions[i];
    if (
      getTimeComponentToCompare(transaction.timestamp) !==
      getTimeComponentToCompare(curTimestamp)
    ) {
      data.push(curAmount);
      labels.push(formatTimestamp(curTimestamp));
      curTimestamp = transaction.timestamp;
    }
    curAmount += transaction.amount;
  }
  data.push(curAmount);
  labels.push(formatTimestamp(curTimestamp));
  return {
    data,
    labels
  };
}

const chartData = computed(() => {
  const { labels, data } = getDataset();
  return {
    labels,
    datasets: [
      {
        data,
        label: t('chart.net'),
        //typings issue: doesn't recognize `false` as valid option
        pointStyle: (data.length <= 31 ? 'circle' : false) as any,
        pointRadius: 6
      }
    ]
  };
});

const chartOptions: ChartOptions<any> = {
  responsive: true,
  elements: {
    line: {
      borderColor: '#ff2200',
      borderWidth: 1,
      cubicInterpolationMode: 'monotone'
    }
  },
  maintainAspectRatio: false
};
</script>

<template>
  <div class="history-chart" role="img">
    <Line
      :options="chartOptions"
      :data="chartData"
      :aria-label="$t('chart.historyChartAria')"
      aria-describedby="my-data-table"
    >
      {{ $t('chart.alt') }}
    </Line>
  </div>
</template>

<style lang="scss">
.history-chart {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  min-width: 0;
}
</style>
