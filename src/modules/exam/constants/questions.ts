import type { Question } from '../../../common/interfaces';

export const QUESTIONS: Question[] = [
  {
    name: `Print values`,
    example: `Input: [1, 2] \nOutput: 1, 2;`,
    description: `Create a function named "printValues" that receive an array and return its values`,
    testMethod: 'printValues',
    testCases: [
      { input: [1, 2], output: [1, 2] },
      { input: [2, 3], output: [2, 3] },
      // { input: [3, 4], output: [3, 4] },
      // { input: [4, 5], output: [4, 5] },
      // { input: [5, 6], output: [5, 6] },
    ],
  },
  {
    name: `Concat values`,
    example: `Input: [1, 2] \nOutput: 12; \n\nInput: [10, 3, 4] \nOutput: 1034;`,
    description: `Create a function named "concatValues" that receive an array and return its values concatenated between them`,
    testMethod: 'concatValues',
    testCases: [
      { input: [1, 2], output: '12' },
      { input: [2, 3], output: '23' },
      // { input: [3, 4], output: '34' },
      // { input: [4, 5], output: '45' },
      // { input: [5, 6], output: '56' },
    ],
  },
  {
    name: `Sum values`,
    example: `Input: [1, 2] \nOutput: 3;`,
    description: `Create a function named "sumValues" that receive an array and returns the SUM of its values`,
    testMethod: 'sumValues',
    testCases: [
      { input: [1, 2], output: 3 },
      { input: [2, 3], output: 5 },
      // { input: [3, 4], output: 7 },
      // { input: [4, 5], output: 9 },
      // { input: [5, 6], output: 11 },
    ],
    /**
     *
      function sumValues(list: number[]) {
        return list.reduce((a, b) => a + b);
      }

      console.log(sumValues([1, 2]));

      def sumValues(arr):
        return sum(arr)

      result = sumValues([1, 2, 3, 4, 5])
      print(result)
    */
  },
  {
    name: `Substract values`,
    example: `Input: [1, 2] \nOutput: -1; \n\nInput: [10, 3, 4] \nOutput: 3;`,
    description: `Create a function named "substractValues" that receive an array and return the subtraction of the first value with the other values`,
    testMethod: 'substractValues',
    testCases: [
      { input: [1, 2], output: -1 },
      { input: [2, 3], output: -1 },
      { input: [3, 4], output: -1 },
      { input: [4, 5], output: -1 },
      // { input: [5, 6], output: -1 },
    ],
    /**
     *
      function substractValues(list: number[]) {
        return list.reduce((a, b) => a - b);
      }

      console.log(substractValues([1, 2]));
    */
  },
  {
    name: `Multiply values`,
    example: `Input: [1, 2] \nOutput: 2; \n\nInput: [10, 3, 4] \nOutput: 120;`,
    description: `Create a function named "multiplyValues" that receive an array and return the result of multiplying between them`,
    testMethod: 'multiplyValues',
    testCases: [
      { input: [1, 2], output: 2 },
      { input: [2, 3], output: 6 },
      // { input: [3, 4], output: 12 },
      // { input: [4, 5], output: 20 },
      // { input: [5, 6], output: 30 },
    ],
    /**
     *
      function multiplyValues(list: number[]) {
        return list.reduce((a, b) => a * b);
      }

      console.log(multiplyValues([1, 2]));
    */
  },
  {
    name: `Count values`,
    example: `Input: [1, 2] \nOutput: 2; \n\nInput: [10, 3, 4] \nOutput: 3;`,
    description: `Create a function named "countValues" that receive an array of items and return its length`,
    testMethod: 'countValues',
    testCases: [
      { input: [1, 2], output: 2 },
      { input: [2, 3], output: 2 },
      // { input: [3, 4], output: 2 },
      // { input: [4, 5], output: 2 },
      // { input: [5, 6], output: 2 },
    ],
  },
  {
    name: `Average values`,
    example: `Input: [1, 2] \nOutput: 1.5; \n\nInput: [10, 3, 5] \nOutput: 6;`,
    description: `Create a function named "averageValues" that receive an array and return the AVERAGE of its values`,
    testMethod: 'averageValues',
    testCases: [
      { input: [1, 2], output: 1.5 },
      { input: [2, 3], output: 2.5 },
      // { input: [3, 4], output: 3.5 },
      // { input: [4, 5], output: 4.5 },
      // { input: [5, 6], output: 5.5 },
    ],
  },
  {
    name: `Max of values`,
    example: `Input: [1, 2, 3, 4] \nOutput: 4; \n\nInput: [10, 3, 4] \nOutput: 10;`,
    description: `Create a function named "maxOfValues" that receive an array and return the MAX value of its values`,
    testMethod: 'maxOfValues',
    testCases: [
      { input: [1, 2], output: 2 },
      { input: [2, 3], output: 3 },
      // { input: [3, 4], output: 4 },
      // { input: [4, 5], output: 5 },
      // { input: [5, 6], output: 6 },
    ],
  },
  {
    name: `Min of values`,
    example: `Input: [1, 2, 3, 4] \nOutput: 1; \n\nInput: [10, 3, 4] \nOutput: 3;`,
    description: `Create a function named "minOfValues" that receive an array and return the MAX value of its values`,
    testMethod: 'minOfValues',
    testCases: [
      { input: [1, 2], output: 1 },
      { input: [2, 3], output: 2 },
      // { input: [3, 4], output: 3 },
      // { input: [4, 5], output: 4 },
      // { input: [5, 6], output: 5 },
    ],
  },
  {
    name: `Most repeated value`,
    example: `Input: [1, 2, 3, 4, 1] \nOutput: 1; \n\nInput: [1, 2, 3, 4] \nOutput: 4;`,
    description: `Create a function named "mostRepeatedValue" that receive an array and return the value that has more occurrences, if more that one value have the same occurrences, tthe returned value is the greather value between them.`,
    testMethod: 'mostRepeatedValue',
    testCases: [
      { input: [1, 2], output: 2 },
      { input: [2, 3, 2], output: 2 },
      // { input: [3, 4, 5, 4], output: 4 },
      // { input: [4, 5, 5, 5], output: 5 },
      // { input: [5, 6], output: 6 },
    ],
  },
].map((q, index) => ({
  ...q,
  id: index + 1,
  submitted: false,
  testCases: q.testCases.map((t) => ({
    ...t,
    loading: false,
    status: false,
    result: '',
  })),
}));