import type { Validation } from '@vuelidate/core';

/**
 * Check if vuelidate key has any error or
 * and return it to be showed
 * @param {Validation} v$ - Vuelidate intance
 * @param {string} key - Vuelidate key
 * @returns {string} - Validation error
 */
export function showFormKeyError(v$: Validation, key: string): string {
  if (v$[key].$errors?.length > 0) {
    return v$[key].$errors[0].$message.toString();
  }

  return '';
}

export default showFormKeyError;
