// @vitest-environment nuxt
import { describe, it, expect, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import Totals from '~/components/stats/Totals.vue';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';

describe('Totals', () => {
  mockNuxtImport('useI18n', () => () => ({
    locale: { value: 'en-us' }
  }));
  // make testing independent of locale number format
  mockNuxtImport('formatAmount', () => (x: number) => String(x));

  it('basic', () => {
    const testingPinia = createTestingPinia({
      createSpy: vi.fn
    });
    const visibleCategoriesStore = useVisibleCategoriesStore(testingPinia);
    visibleCategoriesStore.visibleCategories.totalExpenses = -3200;
    visibleCategoriesStore.visibleCategories.totalIncome = 10000;

    const wrapper = mount(Totals, {
      global: {
        plugins: [testingPinia],
        mocks: {
          $t: (msg: string) => msg
        },
        stubs: {
          ClientOnly: {
            template: '<slot></slot>'
          }
        }
      }
    });

    expect(wrapper.find('.totals__numbers__income').text()).toBe('10000 (76%)');
    expect(wrapper.find('.totals__numbers__expenses').text()).toBe(
      '-3200 (24%)'
    );
    expect(
      wrapper.find('.totals__bar__segment--income').attributes().style
    ).toBe('flex-basis: 76%;');
    expect(
      wrapper.find('.totals__bar__segment--expenses').attributes().style
    ).toBe('flex-basis: 24%;');
  });
});
