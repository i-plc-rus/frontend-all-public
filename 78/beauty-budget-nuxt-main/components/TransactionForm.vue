<script setup lang="ts">
import { ref } from 'vue';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import type { ITransaction } from '~/types/transaction';
import { TransactionType } from '~/constants/transaction';
import { ButtonState } from '~/constants/button-state';
import type { IOption } from '~/types/option';

const INITIAL_CATEGORY = '';
const INITIAL_TRANSACTION_TYPE = '';
const INITIAL_DATE = dayjs().format('YYYY-MM-DD');
const INITIAL_SUM = undefined;
const INITIAL_STATE = ButtonState.NORMAL;
const SELECT_OPTIONS: IOption[] = [
  {
    value: '',
    label: 'Выберите тип',
    disabled: true,
  },
  {
    value: TransactionType.INCOME,
    label: '+ / доходы',
    disabled: false,
  },
  {
    value: TransactionType.OUTCOME,
    label: '- / расходы',
    disabled: false,
  },
];

const category = ref<string>(INITIAL_CATEGORY);
const transactionType = ref<TransactionType | ''>(INITIAL_TRANSACTION_TYPE);
const date = ref<string>(INITIAL_DATE);
const sum = ref<number | undefined>(INITIAL_SUM);
const state = ref<ButtonState>(INITIAL_STATE);
const store = useTransactionsStore();

const resetForm = () => {
  category.value = INITIAL_CATEGORY;
  transactionType.value = INITIAL_TRANSACTION_TYPE;
  date.value = INITIAL_DATE;
  sum.value = INITIAL_SUM;
};

const handleSuccess = () => {
  resetForm();
  state.value = ButtonState.NORMAL;
};

const handleSubmit = (evt: Event) => {
  evt.preventDefault();
  state.value = ButtonState.PROCESSING;

  const newTransaction: ITransaction = {
    id: `T${date.value.replace('0', '')}${uuidv4()}`,
    created_at: new Date().toString(),
    category: category.value,
    date: date.value,
    sum: getSubunitsAmountFromMainCurrency(sum.value || 0),
    type: transactionType.value || TransactionType.INCOME,
  };

  // mock state animation
  setTimeout(() => {
    store.addTransaction(newTransaction);
    state.value = ButtonState.SUCCESS;

    setTimeout(() => {
      handleSuccess();
    }, 400);
  }, 500);
};
</script>

<template>
  <form class="transaction-form" method="post" @submit.prevent="handleSubmit">
    <fieldset class="transaction-form__fieldset" name="transaction">
      <UIInput
        v-model.trim="category"
        :input-props="{
          class: 'transaction-form__input',
          ['aria-label']: 'Категория',
          disabled: state !== ButtonState.NORMAL,
          placeholder: 'Категория',
          required: true,
        }"
        :data-list-options="store.categories"
      />
      <UISelect
        v-model="transactionType"
        :select-props="{
          class: 'transaction-form__input',
          ['aria-label']: 'Тип записи',
          disabled: state !== ButtonState.NORMAL,
          required: true,
        }"
        :options="SELECT_OPTIONS"
      />
      <UIInput
        v-model="sum"
        :input-props="{
          class: 'transaction-form__input',
          ['aria-label']: 'Сумма',
          disabled: state !== ButtonState.NORMAL,
          inputmode: 'numeric',
          placeholder: 'Сумма',
          type: 'number',
          step: 'any',
          required: true,
          min: 0,
          max: 999999999,
        }"
      />
      <UIInput
        v-model="date"
        :input-props="{
          class: 'transaction-form__input',
          ['aria-label']: 'Дата',
          disabled: state !== ButtonState.NORMAL,
          placeholder: 'Дата',
          type: 'date',
          required: true,
        }"
      />
    </fieldset>

    <UIButton
      element-class="transaction-form__button"
      :state="state"
      :aria-label="ButtonState.NORMAL ? 'Добавить запись' : 'Запись добавляется'"
      text="Добавить"
      type="submit"
    />
  </form>
</template>

<style lang="scss">
.transaction-form {
  display: grid;
  gap: $mobile-inner-gap;

  @include desktop() {
    gap: $desktop-inner-gap;
  }
}

.transaction-form__fieldset {
  display: grid;
  gap: 16px;
  margin: 0;
  padding: 0;

  border: none;

  @include desktop() {
    grid-template-columns: repeat(4, 1fr);
  }
}

.transaction-form__input {
  min-width: calc(100% - 16px);
  appearance: none;
}

.transaction-form__button {
  justify-self: center;
}
</style>
