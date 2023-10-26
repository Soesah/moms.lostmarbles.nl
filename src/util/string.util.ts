export const matches = (haystack: string, needle: string = ''): boolean => {
  const n = needle.toLocaleLowerCase();
  const s = haystack.toLocaleLowerCase();

  return !!s && !!n && (s.startsWith(n) || s.includes(n));
};
