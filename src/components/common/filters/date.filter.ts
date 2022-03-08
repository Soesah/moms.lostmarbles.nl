import { formatDateLong, formatDateSimple } from '@/util/date.util';

export const longDate = (date: string): string => {
  return formatDateLong(new Date(date));
};

export const date = (date: string): string => {
  const d = new Date(date);
  if (d.getFullYear() === 1) {
    return '-';
  }
  return formatDateSimple(new Date(date));
};
