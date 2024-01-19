import type { Validation } from '@vuelidate/core';

/**
 * Check if vuelidate key has any error or
 * has called 'dirty' method.
 * @param {Validation} v$ - Vuelidate intance
 * @param {string} key - Vuelidate key
 * @returns {boolean} - Validation result
 */
export function checkFormKeyError(v$: Validation, key: string): boolean {
  return v$[key].$invalid && v$[key].$dirty;
}

export default checkFormKeyError;
