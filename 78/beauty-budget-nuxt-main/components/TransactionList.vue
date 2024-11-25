<script setup lang="ts">
import dayjs from 'dayjs';
import { TransactionSign } from '~/constants/transaction';
import type { ITransaction } from '~/types/transaction';

interface Props {
  transactions: ITransaction[];
  deleteTransaction?: (id: string) => void;
}

const { transactions, deleteTransaction } = defineProps<Props>();

const handleDeleteButtonClick = (transactionId: string) => {
  if (window.confirm('Удалить запись?') && typeof deleteTransaction === 'function') {
    deleteTransaction(transactionId);
  }
};
</script>

<template>
  <ul class="transaction-list">
    <li
      v-for="transaction in transactions"
      :key="transaction.id"
      class="transaction-list__item"
      :class="{ 'transaction-list__item_editable': !!deleteTransaction }"
    >
      <span class="transaction-list__item-data">{{
        `${TransactionSign[transaction.type]}${formatSum(transaction.sum)}`
      }}</span>
      <span class="transaction-list__item-data">{{ transaction.category }}</span>
      <span class="transaction-list__item-data">{{
        dayjs(transaction.date).format('DD.MM.YYYY')
      }}</span>
      <button
        v-if="!!deleteTransaction"
        class="transaction-list__item-button"
        aria-label="Удалить запись"
        @click="handleDeleteButtonClick(transaction.id)"
      >
        <svg
          class="transaction-list__item-button-icon"
          viewBox="-1 0 24 24"
          width="24"
          height="24"
          role="presentation"
        >
          <use :href="`/sprite.svg#cross`" />
        </svg>
      </button>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.transaction-list {
  @include reset-list();
}

.transaction-list__item {
  @include reset-list-item();
  display: grid;
  grid-template-columns: minmax(80px, 30%) 1fr minmax(80px, 30%);
  gap: $mobile-inner-gap;
  align-items: center;
  padding: 14px 0;

  @include text();

  border-bottom: 1px solid var(--color-main-light);

  &_editable {
    grid-template-columns: minmax(80px, 30%) 1fr minmax(80px, 30%) 24px;
  }

  @include wide-mobile() {
    padding-left: 30px;
    padding-right: 30px;
  }
}

.transaction-list__item-data {
  word-break: break-word;
}

.transaction-list__item-data:last-child {
  text-align: end;
}

.transaction-list__item-button {
  @include reset-button();

  &:hover {
    .transaction-list__item-button-icon {
      opacity: 0.85;
    }
  }

  &:active {
    .transaction-list__item-button-icon {
      opacity: 0.95;
    }
  }
}

.transaction-list__item-button-icon {
  height: 24px;
  width: 24px;

  fill: var(--color-text);
  transition: opacity $transition;
}
</style>
