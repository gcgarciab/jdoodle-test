/**
 * Create nre Promise to be resolved after
 * waiting expected miliseconds param.
 * @param {number} ms - Miliseconds to delay
 * @returns {Promise} - Promise resolved
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default delay;
