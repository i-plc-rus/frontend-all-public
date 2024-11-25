// @vitest-environment nuxt
import { describe, it, expect, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import Transaction from '~/components/transactions/Transaction.vue';

describe('Transaction', () => {
  mockNuxtImport('useI18n', () => () => ({
    locale: { value: 'en-us' }
  }));

  function run(args: { showDate: boolean }) {
    vi.setSystemTime(new Date('2024-10-01T00:00:00Z'));
    const testingPinia = createTestingPinia({
      createSpy: vi.fn
    });
    const categoryMetadataStore = useCategoryMetadataStore(testingPinia);
    // @ts-ignore
    categoryMetadataStore.categoryMetadata = <CategoryMetadata[]>[
      {
        id: '1001',
        text: 'CatA',
        iconUrl: 'localhost/noop'
      }
    ];

    return mount(Transaction, {
      props: {
        transaction: {
          id: '99991',
          amount: -320,
          timestamp: new Date('2024-10-01T00:00:00Z').getTime(),
          category: '1001'
        },
        showDate: args.showDate
      },
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
  }

  it('without date', () => {
    const wrapper = run({
      showDate: false
    });

    expect(wrapper.find('.transaction__date').exists()).toBe(false);
    expect(wrapper.find('.transaction__category__image').attributes().src).toBe(
      'localhost/noop'
    );
    expect(wrapper.find('.transaction__category__text').text()).toBe('CatA');
    expect(wrapper.find('.transaction__amount').text()).toBe('-320');
  });

  it('with date', () => {
    const wrapper = run({
      showDate: true
    });
    expect(wrapper.find('.transaction__date').text()).toBe(
      formatUtcDate(new Date('2024-10-01T00:00:00Z'), { monthFormat: 'long' })
    );
    expect(wrapper.find('.transaction__category__image').attributes().src).toBe(
      'localhost/noop'
    );
    expect(wrapper.find('.transaction__category__text').text()).toBe('CatA');
    expect(wrapper.find('.transaction__amount').text()).toBe('-320');
  });
});
