/**
 * Select random number from some interval.
 * @param min {number} - Min value
 * @param max {number} - Max value
 * @returns {number} Random number
 */
export function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default randomIntFromInterval;
