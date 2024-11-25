<script setup lang="ts">
const { timestamp, odd } = defineProps<{
  timestamp: number;
  odd: boolean;
}>();
const formattedDate = computed(() =>
  formatUtcDate(timestamp, { monthFormat: 'long' })
);
</script>

<template>
  <ClientOnly>
    <!--avoid hydration issues related to different locale format-->
    <div
      class="transaction-date-header"
      :aria-label="$t('transactions.dateHeaderAria')"
      :class="{ 'transaction-date-header--odd': odd }"
    >
      {{ formattedDate }}
    </div>
  </ClientOnly>
</template>

<style lang="scss">
.transaction-date-header {
  display: flex;
  align-items: center;
  margin: 0;
  padding-left: var(--generic-spacing);

  &--odd {
    background-color: var(--p-button-secondary-background);
  }
}
</style>
