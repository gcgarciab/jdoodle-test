import type { TestCase } from './testCase';

export interface Question {
  id: number;
  name: string;
  example: string;
  description: string;
  testMethod: string;
  testCases: TestCase[];
}