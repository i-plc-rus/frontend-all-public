<script setup lang="ts">
const transactionDateFilterStore = useTransactionDateFilterStore();
const transactionsStore = useTransactionsStore();
const { t } = useI18n();

const dialogVisible = ref(false);
// customIntervalLocal is used because datepicker works with local date,
// value is converted back to UTC when applied
const dateRange = ref<[Date, Date] | null>(
  transactionDateFilterStore.customIntervalLocal
);

const mode = computed(() => transactionDateFilterStore.mode);
const effectiveUtcInterval = computed(
  () => transactionDateFilterStore.effectiveUtcInterval
);
const customInterval = computed(
  () => transactionDateFilterStore.customInterval
);

interface FilterButtonState {
  label: string;
  severity: string;
  ariaChecked: boolean;
  command: () => void;
}

const modeButtonStates = computed<FilterButtonState[]>(() => [
  {
    label:
      mode.value === 'month'
        ? formatUtcMonth(effectiveUtcInterval.value?.[0] ?? 0)
        : t('dateFilter.month'),
    severity: getModeButtonSeverity(mode.value === 'month'),
    ariaChecked: mode.value === 'month',
    command: () => transactionDateFilterStore.select('month')
  },
  {
    label:
      mode.value === 'year'
        ? String(
            new Date(effectiveUtcInterval.value?.[0] ?? 0)?.getUTCFullYear()
          )
        : t('dateFilter.year'),
    severity: getModeButtonSeverity(mode.value === 'year'),
    ariaChecked: mode.value === 'year',
    command: () => transactionDateFilterStore.select('year')
  },
  {
    label:
      mode.value === 'custom'
        ? formatUtcDateRange(
            customInterval.value?.map((t) => new Date(t)) as
              | [Date, Date]
              | undefined
          )
        : t('dateFilter.custom'),
    severity: getModeButtonSeverity(mode.value === 'custom'),
    ariaChecked: mode.value === 'custom',
    command: () => (dialogVisible.value = true)
  }
]);

function getModeButtonSeverity(selected: boolean) {
  return selected ? 'primary' : 'secondary';
}

function confirmDateRange() {
  dialogVisible.value = false;
  if (dateRange.value) {
    transactionDateFilterStore.select(
      'custom',
      dateRange.value,
      false /* convert back to UTC */
    );
  }
}

function dismissDateRange() {
  dialogVisible.value = false;
}
</script>

<template>
  <div
    class="transaction-date-filter"
    role="form"
    aria-controls="transactionsList chartArea totals"
  >
    <Button
      icon="pi pi-angle-left"
      severity="secondary"
      :disabled="mode === 'custom'"
      data-testid="dateFilterPrev"
      :aria-label="$t('dateFilter.prevTimeIntervalAria')"
      @click="transactionDateFilterStore.selectAdjacentInterval(-1)"
    >
    </Button>
    <ButtonGroup>
      <!--avoid hydration issues related to different locale format-->
      <ClientOnly>
        <Button
          v-for="buttonState of modeButtonStates"
          :severity="buttonState.severity"
          :aria-checked="buttonState.ariaChecked"
          :aria-label="$t('dateFilter.modeAria', { mode: buttonState.label })"
          @click="buttonState.command"
        >
          <span class="transaction-date-filter__mode-button__text">{{
            buttonState.label
          }}</span>
        </Button>
      </ClientOnly>
    </ButtonGroup>
    <Button
      icon="pi pi-angle-right"
      severity="secondary"
      :disabled="mode === 'custom'"
      data-testid="dateFilterNext"
      :aria-label="$t('dateFilter.nextTimeIntervalAria')"
      @click="transactionDateFilterStore.selectAdjacentInterval(1)"
    >
    </Button>
  </div>
  <Dialog
    v-model:visible="dialogVisible"
    modal
    :header="$t('dateFilter.dialogHeader')"
    dismissable-mask
  >
    <div class="transaction-date-filter__dialog" role="form">
      <div>
        <DatePicker v-model="dateRange" selectionMode="range" inline />
      </div>
      <div class="transaction-date-filter__dialog__footer">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="dismissDateRange"
        ></Button>
        <Button type="submit" label="Save" @click="confirmDateRange"></Button>
      </div>
    </div>
  </Dialog>
</template>

<style lang="scss">
.transaction-date-filter {
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  gap: 3px; //minimum gap to distinguish between modes and arrows

  &__dialog {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 26rem; //extra space to avoid jumping height when switching between months with different number of weeks

    &__footer {
      margin-top: var(--generic-spacing);
      display: flex;
      gap: var(--generic-spacing);
      justify-content: flex-end;
    }
  }

  &__mode-button__text {
    text-transform: capitalize;
  }
}

@media (max-width: 370px) {
  .transaction-date-filter .p-button {
    $padding: 3px;
    padding-left: $padding;
    padding-right: $padding;
  }
}
</style>
