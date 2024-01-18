import type { ExamEnum } from '@/modules/exam/enums';

export interface ExamOption {
  icon: string;
  name: string;
  value: ExamEnum,
  description: string;
}
