<script setup lang="ts">
import { useTransactionsStore } from '~/stores/transactions';

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Список всех записей` : 'Список всех записей';
  },
});

const store = useTransactionsStore();
</script>

<template>
  <div class="history-page">
    <TransactionList
      v-if="store.transactions.length"
      :delete-transaction="store.deleteTransaction"
      :transactions="store.transactions"
    />
    <p v-else class="history-page__text">Нет данных</p>
  </div>
</template>

<style lang="scss" scoped>
.history-page {
  display: grid;
  align-content: start;
  gap: $mobile-inner-gap;

  @include desktop() {
    gap: $desktop-inner-gap;
  }
}

.history-page__text {
  @include text();
  text-align: center;
}
</style>
