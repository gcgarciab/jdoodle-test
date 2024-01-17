import { useLocalStorage } from '@vueuse/core';

export function getStoreState<T>(name: string, initialState: T): T {
  const state = useLocalStorage(name, initialState);
  const stateAreSame = JSON.stringify(state.value) === JSON.stringify(initialState);
  // Return expected data
  return (stateAreSame) ? initialState : state.value;

}

export default getStoreState;
