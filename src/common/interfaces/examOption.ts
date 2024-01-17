import type { ExamEnum } from '../enums';

export interface ExamOption {
  icon: string;
  name: string;
  value: ExamEnum,
  description: string;
}
