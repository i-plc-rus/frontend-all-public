<script setup lang="ts">
import type { TransactionsLoadReason } from '~/stores/transactions';

const visibleCategoriesStore = useVisibleCategoriesStore();
const categoryMetadataStore = useCategoryMetadataStore();
const categoryFilterStore = useCategoryFilterStore();
const { t } = useI18n();

const CHART_SKELETON_SIZE = '12rem';

const chartTypes = ['category', 'history'] as const;
const selectedChart = useCookie<(typeof chartTypes)[number]>('selectedChart', {
  default: () => 'category'
});

function switchChart(offset: number) {
  selectedChart.value =
    chartTypes[
      (chartTypes.findIndex((v) => v === selectedChart.value) +
        offset +
        chartTypes.length) %
        chartTypes.length
    ];
  // changing chart will remove filter from view and will be counter-intuitive to still apply it
  categoryFilterStore.reset();
}

const sampleCategoriesForPlaceholder = computed(() => {
  const placeholderCategories = categoryMetadataStore.categoryMetadata.slice(
    0,
    8
  );
  const n = placeholderCategories.length;
  // position category icons in a circle
  return placeholderCategories.map((category, i) => {
    const angle = (i / n) * 2 * Math.PI;
    const offsetPercent = 35;
    const x = Math.round(Math.cos(angle) * offsetPercent);
    const y = Math.round(Math.sin(angle) * offsetPercent);
    return {
      id: category.id,
      iconUrl: category.iconUrl,
      style: {
        left: `calc(50% + ${x}%)`,
        top: `calc(50% + ${y}%)`
      }
    };
  });
});

const messageSeverityByErrorReason = new Map<
  TransactionsLoadReason | null,
  string
>([
  ['generic', 'error'],
  ['limit_exceeded', 'warn']
]);
const messageSeverity = computed(
  () =>
    messageSeverityByErrorReason.get(visibleCategoriesStore.error) ??
    'secondary'
);
const errorMessage = computed(() =>
  visibleCategoriesStore.error
    ? visibleCategoriesStore.error === 'generic'
      ? t('chart.transactionLoadFailure')
      : t('chart.transactionLimitExceeded')
    : null
);
</script>

<template>
  <div
    class="chart-area"
    role="group"
    id="chartArea"
    :aria-busy="visibleCategoriesStore.loading"
  >
    <div
      class="chart-area__container"
      v-if="
        visibleCategoriesStore.visibleCategories.categoryDetails.length &&
        !visibleCategoriesStore.loading
      "
    >
      <!-- v-if on chart area prevents it from jumping due to initial resize (due to categories being rendered) -->
      <Button
        class="chart-area__container__arrow"
        icon="pi pi-angle-left"
        text
        severity="secondary"
        :aria-label="$t('chart.previousChartAria')"
        @click="switchChart(-1)"
      />
      <ClientOnly>
        <CategoryChart v-if="selectedChart === 'category'" />
        <HistoryChart v-else-if="selectedChart === 'history'" />
      </ClientOnly>
      <Button
        class="chart-area__container__arrow"
        icon="pi pi-angle-right"
        text
        severity="secondary"
        :aria-label="$t('chart.nextChartAria')"
        @click="switchChart(1)"
      />
    </div>
    <div v-else class="chart-area__blank-space" role="group">
      <Skeleton
        v-if="visibleCategoriesStore.loading"
        :height="CHART_SKELETON_SIZE"
        :width="CHART_SKELETON_SIZE"
        :border-radius="CHART_SKELETON_SIZE"
      />
      <template v-else>
        <div class="chart-area__blank-space__placeholder" aria-hidden="true">
          <img
            v-for="category of sampleCategoriesForPlaceholder"
            class="chart-area__blank-space__placeholder__image"
            :key="category.id"
            :src="category.iconUrl"
            :style="category.style"
            alt=""
          />
        </div>
        <Message
          :severity="messageSeverity"
          class="chart-area__blank-space__message"
        >
          <span
            v-if="visibleCategoriesStore.error"
            data-testid="chartAreaError"
          >
            <i class="pi pi-exclamation-triangle"></i>
            {{ errorMessage }}
          </span>
          <span v-else>{{ $t('chart.empty') }}</span>
        </Message>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.chart-area {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: var(--generic-spacing);

  &__container {
    display: flex;
    justify-content: space-between;
    min-height: 0;
    flex-grow: 1;

    &__canvas {
      display: flex;
      flex-grow: 1;
      justify-content: center;
    }

    &__arrow {
      flex-shrink: 0;
    }
  }

  &__blank-space {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    position: relative;
    padding: 0 15%;

    &__message {
      z-index: 1; //place above placeholder images
      text-align: center;
    }

    &__placeholder {
      position: absolute;
      width: 100%;
      height: 100%;
      animation: spin 25s linear infinite;

      &__image {
        position: absolute;
        opacity: 0.25;
      }
    }
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
