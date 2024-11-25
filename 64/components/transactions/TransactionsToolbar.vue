<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem';

const { showAddButton } = defineProps<{
  showAddButton: boolean;
}>();

const transactionSortStore = useTransactionSortStore();
const { t } = useI18n();

const sortMenuItems: MenuItem[] = [
  {
    label: t('transactions.sortByDate'),
    key: 'date',
    command: () => transactionSortStore.select('date')
  },
  {
    label: t('transactions.sortByAmount'),
    key: 'amount',
    command: () => transactionSortStore.select('amount')
  }
];

const sortLabel = computed(
  () =>
    (sortMenuItems.find((item) => item.key === transactionSortStore.sort)
      ?.label as string) ?? ''
);

const sortMenuRef = useTemplateRef('sortMenu');
</script>

<template>
  <div class="transactions-toolbar" role="toolbar">
    <AddTransactionButton v-if="showAddButton" />
    <Button
      class="transactions-toolbar__sort"
      type="button"
      severity="secondary"
      @click="sortMenuRef?.toggle"
      :aria-label="$t('transactions.sortAria')"
      aria-haspopup="true"
      aria-controls="transactionSortMenu"
    >
      <i class="pi pi-sort-amount-down"></i>
      {{ sortLabel }}
    </Button>
    <Menu
      ref="sortMenu"
      id="transactionSortMenu"
      :model="sortMenuItems"
      popup
    />
  </div>
</template>

<style lang="scss">
.transactions-toolbar {
  display: flex;

  &__sort {
    margin-left: auto;
    height: var(
      --p-button-icon-only-width
    ); // to match + icon button height (to avoid jumping height when it's hidden)
  }
}
</style>
