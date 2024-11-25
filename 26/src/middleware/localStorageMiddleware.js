export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('budgetState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('budgetState', serializedState);
  } catch {
    // Игнорируем ошибки записи
  }
};

export const localStorageMiddleware = store => next => action => {
  const result = next(action);
  saveState(store.getState());
  return result;
};