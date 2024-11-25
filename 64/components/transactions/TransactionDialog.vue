<script setup lang="ts">
const visible = defineModel<boolean>('visible');
const { transaction } = defineProps<{ transaction?: Transaction }>();

const categoryMetadataStore = useCategoryMetadataStore();
const { t } = useI18n();

const editedTransaction = ref<Transaction>(createDefaultTransaction());

function createDefaultTransaction(): Transaction {
  const now = new Date();
  return {
    id: '',
    category: categoryMetadataStore.categoryMetadata[0]?.id,
    timestamp: Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()),//local->UTC
    amount: -1
  };
}

const {
  add: addTransaction,
  remove: removeTransaction,
  update: updateTransaction
} = useTransactionsStore();

const commitInProgress = ref(false);
const removeInProgress = ref(false);
const error = ref<string>();

const disabled = computed(
  () => commitInProgress.value || removeInProgress.value
);

const title = computed(() =>
  transaction ? t('transactions.dialog.edit') : t('transactions.dialog.add')
);

watch(
  () => transaction,
  () => (editedTransaction.value = transaction ?? createDefaultTransaction())
);
watch(visible, () => (error.value = undefined));

const hasChanges = computed(
  () =>
    !transaction ||
    (editedTransaction.value &&
      (editedTransaction.value.amount !== transaction.amount ||
        editedTransaction.value.category !== transaction.category ||
        editedTransaction.value.timestamp !== transaction.timestamp))
);

async function commit() {
  error.value = undefined;
  commitInProgress.value = true;
  try {
    if (editedTransaction.value.id) {
      await updateTransaction(editedTransaction.value);
    } else {
      await addTransaction(editedTransaction.value);
    }
    visible.value = false;
    error.value = undefined;
  } catch (e) {
    error.value = t('transactions.saveFailure');
  } finally {
    commitInProgress.value = false;
  }
}

async function remove() {
  if (!transaction) {
    return;
  }
  error.value = undefined;
  removeInProgress.value = true;
  try {
    await removeTransaction(transaction);
    visible.value = false;
    error.value = undefined;
  } catch (e) {
    error.value = t('transactions.deleteFailure');
  } finally {
    removeInProgress.value = false;
  }
}
</script>

<template>
  <Dialog v-model:visible="visible" modal :header="title" dismissable-mask>
    <Suspense>
      <LazyTransactionEntry v-model="editedTransaction"></LazyTransactionEntry>
      <template #fallback>
        <div
          class="transaction-dialog__fallback"
          aria-busy="true"
          role="progressbar"
        >
          <Skeleton v-for="n in 5"></Skeleton>
        </div>
      </template>
    </Suspense>
    <Message v-if="error" severity="error" class="transaction-dialog__error">{{
      error
    }}</Message>
    <div class="transaction-dialog__footer" role="toolbar">
      <Button
        :label="$t('transactions.dialog.cancel')"
        type="submit"
        severity="secondary"
        @click="visible = false"
      ></Button>
      <Button
        v-if="transaction"
        :label="$t('transactions.dialog.delete')"
        severity="danger"
        :loading="removeInProgress"
        :disabled="disabled"
        @click="remove"
      ></Button>
      <Button
        :label="$t('transactions.dialog.save')"
        :loading="commitInProgress"
        :disabled="disabled || !hasChanges"
        @click="commit"
      ></Button>
    </div>
  </Dialog>
</template>

<style lang="scss">
.transaction-dialog {
  &__fallback {
    display: flex;
    flex-direction: column;
    gap: var(--generic-spacing);
  }

  &__error {
    margin-top: var(--generic-spacing);
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: var(--generic-spacing);
    gap: var(--generic-spacing);
  }
}
</style>
