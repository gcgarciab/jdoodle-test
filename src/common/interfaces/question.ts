import type { TestCase } from './testCase';

export interface Question {
  name: string;
  example: string;
  description: string;
  testCases: TestCase[];
}