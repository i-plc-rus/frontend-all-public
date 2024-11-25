<script setup lang="ts">
import { useTransactionsStore } from '~/stores/transactions';

const store = useTransactionsStore();
store.fetch();
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
