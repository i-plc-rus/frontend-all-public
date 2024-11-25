<script setup lang="ts">
const visibleCategoriesStore = useVisibleCategoriesStore();

const formattedStats = computed(() => {
  const income = visibleCategoriesStore.visibleCategories.totalIncome;
  const expenses = visibleCategoriesStore.visibleCategories.totalExpenses;
  const sum = income - expenses; // expenses < 0
  const incomePercent = Math.round((income / sum) * 100);
  const net = income + expenses;
  return {
    income: formatAmount(income),
    expenses: formatAmount(expenses),
    incomePercent: `${incomePercent}%`,
    expensesPercent: `${100 - incomePercent}%`,
    net: formatAmount(net),
    netClass:
      net >= 0
        ? 'totals__numbers__net--positive'
        : 'totals__numbers__net--negative'
  };
});
</script>

<template>
  <!--avoid hydration issues related to different locale format-->
  <ClientOnly>
    <div class="totals" role="math" id="totals">
      <span
        class="totals__numbers__income"
        data-testid="totalsIncome"
        :aria-label="$t('totals.incomeAria')"
      >
        {{ formattedStats.income }}
        <span v-if="visibleCategoriesStore.visibleCategories.totalIncome"
          >({{ formattedStats.incomePercent }})</span
        >
      </span>
      <span
        class="totals__numbers__net"
        :class="formattedStats.netClass"
        data-testid="totalsNet"
        :aria-label="$t('totals.netAria')"
        >{{ $t('transactions.net') }}: {{ formattedStats.net }}</span
      >
      <span
        class="totals__numbers__expenses"
        data-testid="totalsExpenses"
        :aria-label="$t('totals.expensesAria')"
      >
        {{ formattedStats.expenses }}
        <span v-if="visibleCategoriesStore.visibleCategories.totalExpenses"
          >({{ formattedStats.expensesPercent }})</span
        >
      </span>
      <div
        aria-hidden
        class="totals__bar"
        v-if="
          visibleCategoriesStore.visibleCategories.totalIncome ||
          visibleCategoriesStore.visibleCategories.totalExpenses
        "
      >
        <div
          class="totals__bar__segment totals__bar__segment--income"
          :style="{ flexBasis: formattedStats.incomePercent }"
        ></div>
        <div
          class="totals__bar__segment totals__bar__segment--expenses"
          :style="{ flexBasis: formattedStats.expensesPercent }"
        ></div>
      </div>
    </div>
  </ClientOnly>
</template>

<style lang="scss">
.totals {
  $bar-border-radius: 0.25rem;

  // responsive by container aspect ratio:
  // switches between horizontal to vertical stacked layout
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 0.5rem;
  grid-template-areas:
    'income net expenses'
    'bars bars bars';
  gap: var(--generic-spacing);

  &__numbers {
    &__income {
      grid-area: income;
      color: var(--positive-color);
    }

    &__expenses {
      grid-area: expenses;
      color: var(--negative-color);
      text-align: right;
    }

    &__net {
      font-weight: bold;
      text-align: center;
      grid-area: net;

      &--positive {
        color: var(--positive-color);
      }
      &--negative {
        color: var(--negative-color);
      }
    }
  }

  &__bar {
    grid-area: bars;
    display: flex;
    animation: 700ms linear 1 appear;

    &__segment {
      transition: flex-basis linear 500ms;

      &--income {
        border-top-left-radius: $bar-border-radius;
        border-bottom-left-radius: $bar-border-radius;
        background-color: var(--positive-color);
      }

      &--expenses {
        border-top-right-radius: $bar-border-radius;
        border-bottom-right-radius: $bar-border-radius;
        background-color: var(--negative-color);
      }
    }
  }

  @container (aspect-ratio < 1) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto 1fr;
    grid-template-areas:
      'income'
      'net'
      'expenses'
      'bars';

    &__bar {
      flex-direction: column-reverse;
      padding: 0 25%;

      &__segment--income {
        border-top-left-radius: 0;
        border-bottom-right-radius: $bar-border-radius;
      }

      &__segment--expenses {
        border-bottom-right-radius: 0;
        border-top-left-radius: $bar-border-radius;
      }
    }

    &__numbers__income,
    &__numbers__expenses,
    &__numbers__net {
      text-align: center;
    }
  }
}
</style>
