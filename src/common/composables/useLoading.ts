import { ref } from 'vue';

export function useLoading() {
  const loading = ref<boolean>(false);

  function startLoading() {
    loading.value = true;
  }

  function stopLoading() {
    loading.value = false;
  }

  return {
    loading,
    startLoading,
    stopLoading,
  }
}