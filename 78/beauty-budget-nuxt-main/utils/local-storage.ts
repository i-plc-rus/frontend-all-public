import type { IStorageState } from '~/types/storage-state';

const APP_STORAGE_KEY = 'beauty-budget-n1';

function getStorageValue() {
  const value = localStorage.getItem(APP_STORAGE_KEY);

  try {
    return value ? JSON.parse(value) : {};
  } catch {
    return {};
  }
}

function setStorageValue(newValue: IStorageState) {
  localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(newValue));
}

export function getStorageStateItem(key: keyof IStorageState) {
  const storageState = getStorageValue();
  return storageState[key] || null;
}

export function setStorageStateItem(
  key: keyof IStorageState,
  newItemValue: IStorageState[keyof IStorageState]
) {
  const state = getStorageValue();
  state[key] = newItemValue;
  setStorageValue(state);
}
