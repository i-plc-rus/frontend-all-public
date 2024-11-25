<script setup lang="ts">
const { showLabel } = defineProps<{
  showLabel?: boolean;
}>();
const { t } = useI18n();

const transactionDialogVisible = ref(false);

const label = computed(() => (showLabel ? t('transactions.add') : ''));
</script>

<template>
  <Button
    class="transactions__add"
    icon="pi pi-plus"
    rounded
    :label="label"
    aria-haspopup="dialog"
    :aria-label="$t('transactions.add')"
    @click="transactionDialogVisible = true"
  />
  <TransactionDialog v-model:visible="transactionDialogVisible" />
</template>
