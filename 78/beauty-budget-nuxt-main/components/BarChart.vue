<script setup lang="ts">
import type { IBarChartValue } from '~/types/chart';

interface Props {
  title: string;
  total: number;
  values: IBarChartValue[];
}

const { title, total, values } = defineProps<Props>();

const getHeightPercentage = (value: number) => {
  return value > 0 ? `${Math.floor((value * 100) / total)}%` : '0%';
};
</script>

<template>
  <figure class="bar-chart">
    <h2 class="bar-chart__title">{{ title }}</h2>
    <div className="bar-chart__diagram">
      <ul className="bar-chart__diagram-items">
        <li
          v-for="[name, sum] in values"
          :key="name"
          class="bar-chart__diagram-item"
          :style="{ height: getHeightPercentage(sum) }"
        />
      </ul>
    </div>
    <figcaption class="bar-chart__caption">
      <ul class="bar-chart__list">
        <li v-for="[name, sum] in values" :key="name" class="bar-chart__list-item">
          {{ name }} - {{ formatSum(sum) }}
        </li>
      </ul>
    </figcaption>
  </figure>
</template>

<style scoped lang="scss">
.bar-chart {
  @include chart();
  min-height: 350px;

  @include wide-mobile() {
    grid-template-areas:
      'title title'
      'caption diagram';
    grid-template-columns: 1fr 1fr;
  }
}

.bar-chart__title {
  @include subtitle();
  text-align: center;

  @include wide-mobile() {
    grid-area: title;
  }
}

.bar-chart__diagram {
  height: 200px;
  padding: 16px 16px 0;

  border-bottom: 1px solid rgba(30, 93, 151, 0.12);
  border-left: 1px solid rgba(30, 93, 151, 0.12);

  @include wide-mobile() {
    grid-area: diagram;
  }
}

.bar-chart__diagram-items {
  @include reset-list();
  display: grid;
  align-items: end;
  justify-content: start;
  gap: 20px;
  grid-auto-flow: column;
  width: 100%;
  height: 100%;
}

.bar-chart__diagram-item {
  @include reset-list-item();
  width: 30px;
  height: 100%;
  min-height: 1px;

  border-radius: 2px 2px 0 0;
  transition: height $transition;
}

.bar-chart__diagram-item:nth-child(2n - 1) {
  background-color: $color-income;
}

.bar-chart__diagram-item:nth-child(2n) {
  background-color: $color-outcome;
}

.bar-chart__caption {
  align-self: center;

  @include wide-mobile() {
    grid-area: caption;
  }
}

.bar-chart__list {
  @include chart-caption-list();
}

.bar-chart__list-item {
  @include chart-caption-item();

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);

    width: 10px;
    height: 10px;

    border: 1px solid var(--color-border);
    border-radius: 2px;
  }

  &:nth-child(2n - 1)::before {
    background-color: $color-income;
  }

  &:nth-child(2n)::before {
    background-color: $color-outcome;
  }
}
</style>
