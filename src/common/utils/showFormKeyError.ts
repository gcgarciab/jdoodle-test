import type { Validation } from '@vuelidate/core';

export function showFormKeyError(v$: Validation, key: string): string {
  if (v$[key].$errors?.length > 0) {
    return v$[key].$errors[0].$message.toString();
  }

  return '';
}

export default showFormKeyError;
