import type { Question } from '../interfaces';

export const QUESTIONS: Question[] = [
  {
    name: `Print values`,
    example: `Input: [1, 2] \nOutput: 1, 2;`,
    description: `Create a function that receive an array and return its values`,
    testCases: [
      { input: [1, 2], output: [1, 2] },
      { input: [2, 3], output: [2, 3] },
      { input: [3, 4], output: [3, 4] },
      { input: [4, 5], output: [4, 5] },
      { input: [5, 6], output: [5, 6] },
    ],
  },
  {
    name: `Concat values`,
    example: `Input: [1, 2] \nOutput: 12; \n\nInput: [10, 3, 4] \nOutput: 1034;`,
    description: `Create a function that receive an array and return its values concatenated between them`,
    testCases: [
      { input: [1, 2], output: '12' },
      { input: [2, 3], output: '23' },
      { input: [3, 4], output: '34' },
      { input: [4, 5], output: '45' },
      { input: [5, 6], output: '56' },
    ],
  },
  {
    name: `Sum values`,
    example: `Input: [1, 2] \nOutput: 3;`,
    description: `Create a function that receive an array and returns the SUM of its values`,
    testCases: [
      { input: [1, 2], output: 3 },
      { input: [2, 3], output: 5 },
      { input: [3, 4], output: 7 },
      { input: [4, 5], output: 9 },
      { input: [5, 6], output: 11 },
    ],
  },
  {
    name: `Substract values`,
    example: `Input: [1, 2] \nOutput: -1; \n\nInput: [10, 3, 4] \nOutput: 3;`,
    description: `Create a function that receive an array and return the subtraction of the first value with the other values`,
    testCases: [
      { input: [1, 2], output: -1 },
      { input: [2, 3], output: -1 },
      { input: [3, 4], output: -1 },
      { input: [4, 5], output: -1 },
      { input: [5, 6], output: -1 },
    ],
  },
  {
    name: `Multiply values`,
    example: `Input: [1, 2] \nOutput: 2; \n\nInput: [10, 3, 4] \nOutput: 120;`,
    description: `Create a function that receive an array and return the result of multiplying between them`,
    testCases: [
      { input: [1, 2], output: 2 },
      { input: [2, 3], output: 6 },
      { input: [3, 4], output: 12 },
      { input: [4, 5], output: 20 },
      { input: [5, 6], output: 30 },
    ],
  },
  {
    name: `Count values`,
    example: `Input: [1, 2] \nOutput: 2; \n\nInput: [10, 3, 4] \nOutput: 3;`,
    description: `Create a function that receive an array of items and return its length`,
    testCases: [
      { input: [1, 2], output: 2 },
      { input: [2, 3], output: 2 },
      { input: [3, 4], output: 2 },
      { input: [4, 5], output: 2 },
      { input: [5, 6], output: 2 },
    ],
  },
  {
    name: `Average values`,
    example: `Input: [1, 2] \nOutput: 1.5; \n\nInput: [10, 3, 5] \nOutput: 6;`,
    description: `Create a function that receive an array and return the AVERAGE of its values`,
    testCases: [
      { input: [1, 2], output: 1.5 },
      { input: [2, 3], output: 2.5 },
      { input: [3, 4], output: 3.5 },
      { input: [4, 5], output: 4.5 },
      { input: [5, 6], output: 5.5 },
    ],
  },
  {
    name: `Max value`,
    example: `Input: [1, 2, 3, 4] \nOutput: 4; \n\nInput: [10, 3, 4] \nOutput: 10;`,
    description: `Create a function that receive an array and return the MAX value of its values`,
    testCases: [
      { input: [1, 2], output: 2 },
      { input: [2, 3], output: 3 },
      { input: [3, 4], output: 4 },
      { input: [4, 5], output: 5 },
      { input: [5, 6], output: 6 },
    ],
  },
  {
    name: `Min value`,
    example: `Input: [1, 2, 3, 4] \nOutput: 1; \n\nInput: [10, 3, 4] \nOutput: 3;`,
    description: `Create a function that receive an array and return the MAX value of its values`,
    testCases: [
      { input: [1, 2], output: 1 },
      { input: [2, 3], output: 2 },
      { input: [3, 4], output: 3 },
      { input: [4, 5], output: 4 },
      { input: [5, 6], output: 5 },
    ],
  },
  {
    name: `Most repeated value`,
    example: `Input: [1, 2, 3, 4, 1] \nOutput: 1; \n\nInput: [1, 2, 3, 4] \nOutput: 4;`,
    description: `Create a function that receive an array and return the value that has more occurrences, if more that one value have the same occurrences, tthe returned value is the greather value between them.`,
    testCases: [
      { input: [1, 2], output: 2 },
      { input: [2, 3, 2], output: 2 },
      { input: [3, 4, 5, 4], output: 4 },
      { input: [4, 5, 5, 5], output: 5 },
      { input: [5, 6], output: 6 },
    ],
  },
].map((q, index) => ({
  ...q,
  id: index + 1,
  submitted: false,
}));