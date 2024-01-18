/**
 * Create a composable to be reused when
 * loadings are present in some views, added
 * to aply more logic in the future.
 * @returns - Composable data
 */
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