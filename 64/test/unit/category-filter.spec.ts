// @vitest-environment nuxt
import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach } from 'vitest';

describe('CategoryFilterStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('default', () => {
    const store = useCategoryFilterStore();
    expect(store.selectedCategoryIds).toBe(null);
  });

  it('toggle 1', () => {
    const store = useCategoryFilterStore();
    store.toggle(['a']);
    expect(store.selectedCategoryIds).toEqual(new Set(['a']));
  });

  it('toggle 1 active', () => {
    const store = useCategoryFilterStore();
    store.toggle(['a']);
    store.toggle(['a']);
    expect(store.selectedCategoryIds).toBe(null);
  });

  it('toggle 2', () => {
    const store = useCategoryFilterStore();
    store.toggle(['a', 'b']);
    expect(store.selectedCategoryIds).toEqual(new Set(['a', 'b']));
  });

  it('toggle 2 active', () => {
    const store = useCategoryFilterStore();
    store.toggle(['a', 'b']);
    store.toggle(['a', 'b']);
    expect(store.selectedCategoryIds).toBe(null);
  });

  it('toggle 1 active 2', () => {
    const store = useCategoryFilterStore();
    store.toggle(['a', 'b']);
    store.toggle(['c']);
    expect(store.selectedCategoryIds).toEqual(new Set(['c']));
  });
});
