<script setup lang="ts">
const { disabled } = defineProps<{ disabled?: boolean }>();
const model = defineModel<Transaction>({ required: true });

const categoryMetadataStore = useCategoryMetadataStore();
const { t } = useI18n();

const TRANSACTION_TYPES = ['+', '-'] as const;
const transactionType = ref<(typeof TRANSACTION_TYPES)[number]>(
  model.value.amount > 0 ? '+' : '-'
);
const transactionTypeOptions = [
  { value: '+', label: t('transactions.income') },
  { value: '-', label: t('transactions.expense') }
];

const MIN_AMOUNT = 0.01;
const amount = ref(Math.abs(model.value.amount));
const date = ref(utcDateToLocal(new Date(model.value.timestamp)));
const category = ref(model.value.category);

const amountPrefix = computed(() => (transactionType.value === '-' ? '-' : ''));

watch([transactionType, amount, date, category], () => {
  const formValues = {
    amount: transactionType.value === '+' ? amount.value : -amount.value,
    category: category.value,
    timestamp: localDateToUtc(date.value).getTime()
  };
  model.value = model.value
    ? {
        ...model.value,
        ...formValues
      }
    : {
        id: '',
        ...formValues
      };
});

const OPTION_SIZE_PX = 32; //virtual scroll needs predefined px size
const optionStyle = { height: OPTION_SIZE_PX + 'px' };
</script>

<template>
  <form class="transaction-entry">
    <SelectButton
      v-model="transactionType"
      :options="transactionTypeOptions"
      :disabled="disabled"
      optionLabel="label"
      optionValue="value"
      :aria-label="$t('transactions.typeAria')"
    />
    <div class="transaction-entry__field">
      <label for="category">{{ $t('transactions.category') }}</label>
      <Select
        v-model="category"
        :options="categoryMetadataStore.categoryMetadata"
        option-label="text"
        option-value="id"
        inputId="category"
        :disabled="transactionType === '+' || disabled"
        :virtualScrollerOptions="{ itemSize: OPTION_SIZE_PX }"
      >
        <template #option="slotProps">
          <div class="transaction-entry__field__option" :style="optionStyle">
            <img :src="slotProps.option.iconUrl" alt="" />
            <div>{{ slotProps.option.text }}</div>
          </div>
        </template></Select
      >
    </div>
    <div class="transaction-entry__field">
      <label for="amount">{{ $t('transactions.amount') }}</label>
      <InputNumber
        v-model="amount"
        inputId="amount"
        :min="MIN_AMOUNT"
        :max="999_999_999"
        :disabled="disabled"
        fluid
        :prefix="amountPrefix"
        showButtons
      />
    </div>
    <div class="transaction-entry__field">
      <label for="date">{{ $t('transactions.date') }}</label>
      <DatePicker
        v-model="date"
        inputId="date"
        showIcon
        showOnFocus
        :disabled="disabled"
      />
    </div>
</form>
</template>

<style lang="scss">
.transaction-entry {
  display: flex;
  flex-direction: column;
  gap: var(--generic-spacing);
  align-items: center;

  &__field {
    display: flex;
    flex-direction: column;
    width: 100%;

    &__option {
      display: flex;
      gap: var(--generic-spacing);
      align-items: center;
    }
  }
}
</style>
