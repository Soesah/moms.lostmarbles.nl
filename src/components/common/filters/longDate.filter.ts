import { longDate } from '@/util/date.util';

export const longDateFilter = (date: string): string => {
  return longDate(new Date(date));
};
