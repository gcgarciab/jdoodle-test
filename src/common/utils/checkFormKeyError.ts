import type { Validation } from '@vuelidate/core';

export function checkFormKeyError(v$: Validation, key: string): boolean {
  return v$[key].$invalid && v$[key].$dirty;
}

export default checkFormKeyError;
