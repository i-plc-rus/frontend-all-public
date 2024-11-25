<script setup lang="ts">
const { transaction, showDate, odd } = defineProps<{
  transaction: Transaction;
  showDate: boolean;
  odd?: boolean;
}>();

const { t } = useI18n();
const categoryMetadataStore = useCategoryMetadataStore();
const category = computed(() =>
  categoryMetadataStore.categoryMetadataById.get(transaction.category)
);
const dateFormatted = computed(() =>
  showDate
    ? formatUtcDate(transaction.timestamp, { monthFormat: 'long' })
    : null
);
const amount = computed(() => formatAmount(transaction.amount));
const testId = computed(() => `transaction:${transaction.id}`);
const categoryText = computed(() =>
  transaction.amount >= 0 ? t('transactions.income') : category.value?.text
);
</script>

<template>
  <div
    class="transaction"
    :class="{ 'transaction--odd': odd }"
    :data-testid="testId"
    tabindex="0"
  >
    <!--avoid hydration issues related to different locale format-->
    <ClientOnly>
      <div
        v-if="showDate"
        class="transaction__date"
        :aria-label="$t('transactions.dateAria', { date: dateFormatted })"
      >
        {{ dateFormatted }}
      </div></ClientOnly
    >
    <div
      class="transaction__category"
      :aria-label="$t('transactions.categoryAria', { category: categoryText })"
    >
      <img
        class="transaction__category__image"
        v-if="category"
        v-bind:src="category.iconUrl"
        alt=""
      />
      <div class="transaction__category__text">{{ categoryText }}</div>
    </div>
    <!--avoid hydration issues related to different locale format-->
    <ClientOnly>
      <div
        class="transaction__amount"
        role="math"
        :aria-label="
          $t('transactions.amountAria', { amount: transaction.amount })
        "
        :class="{ 'transaction__amount--positive': transaction.amount > 0 }"
      >
        <span v-if="transaction.amount > 0">+</span>{{ amount }}
      </div>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.transaction {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--generic-spacing);
  padding: 0 var(--generic-spacing) 0 calc(2 * var(--generic-spacing));
  cursor: pointer;

  &--odd {
    background-color: var(--p-button-secondary-background);
  }

  &:hover {
    background-color: var(--p-button-secondary-hover-background);
  }

  &:focus-visible {
    outline: 1px solid var(--p-button-secondary-focus-ring-color);
  }

  &__category {
    display: flex;
    min-width: 40%;
    gap: var(--generic-spacing);

    &__text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  &__date {
    min-width: 25%;
  }

  &__amount {
    color: var(--negative-color);
  }

  &__amount--positive {
    color: var(--positive-color);
  }
}

/* Assume all icons are black, invert to be visible on dark background. */
@media (prefers-color-scheme: dark) {
  .transaction__category__image {
    filter: invert(100%);
  }
}
</style>
