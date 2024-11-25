<script setup lang="ts">
const store = useTransactionsStore();
</script>

<template>
  <p class="transactions-balance">
    Текущий баланс:<span class="transactions-balance__amount">{{ formatSum(store.balance) }}</span>
  </p>
</template>

<style scoped lang="scss">
.transactions-balance {
  display: flex;
  align-items: baseline;
  justify-content: end;
  flex-wrap: wrap;
  margin: 0;

  @include subtitle();
}

.transactions-balance__amount {
  min-width: 20px;
  padding-left: 10px;

  text-align: end;
}
</style>
