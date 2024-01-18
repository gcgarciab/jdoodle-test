import { useLocalStorage } from '@vueuse/core';

/**
 * Calls 'useLocalStorage' utility to get store value
 * and return it, if it's different that 'initialState',
 * otherwise returns 'initialState'.
 * @param {string} name - Store name
 * @param {T} initialState - Initial data
 * @returns - Store data
 */
export function getStoreState<T>(name: string, initialState: T): T {
  const state = useLocalStorage(name, initialState);
  const stateAreSame = JSON.stringify(state.value) === JSON.stringify(initialState);
  // Return expected data
  return (stateAreSame) ? { ...initialState } : state.value;

}

export default getStoreState;
