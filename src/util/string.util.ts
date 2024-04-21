export const matches = (haystack: string, needle: string = ''): boolean => {
  const s = haystack.toLowerCase();
  const n = needle.toLocaleLowerCase();

  return !!s && !!n && (s.startsWith(n) || s.includes(n));
};

const sum = (...nrs: number[]) =>
  nrs.reduce((acc: number, nr) => (acc += nr), 0);

export const matchScore = (haystack: string[], needle: string = ''): number => {
  const s = haystack.map((v) => v.toLowerCase());
  const n = needle.split(' ').map((v) => v.toLowerCase());

  const score = sum(
    ...s.reduce(
      (acc: number[], v) => [...acc, ...n.map((m) => getScore(v, m))],
      [],
    ),
  );
  return !!s.length && !!n.length && score > 0 ? score : 0;
};

export const getScore = (haystack: string, needle: string): number => {
  const s = haystack.toLowerCase();
  const n = needle.toLowerCase();

  if (!s.includes(n)) {
    return 0;
  } else if (n !== s) {
    return Math.round((n.length / s.length) * 100) / 100;
  }

  return 1;
};
