import { longDate, simpleDate } from '@/util/date.util';

export const longDateFilter = (date: string): string => {
  return longDate(new Date(date));
};

export const dateFilter = (date: string): string => {
  const d = new Date(date);
  if (d.getFullYear() === 1) {
    return '-';
  }
  return simpleDate(new Date(date));
};
