import { describe, expect, test } from 'vitest';

describe('useLoading', () => {
  const { loading, startLoading, stopLoading } = useLoading();

  test('startLoading', () => {
    expect(loading.value).toBeFalsy();
    startLoading();
    expect(loading.value).toBeTruthy();
  });

  test('stopLoading', () => {
    expect(loading.value).toBeTruthy();
    stopLoading();
    expect(loading.value).toBeFalsy();
  });
});