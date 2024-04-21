export const matches = (haystack: string, needle: string = ''): boolean => {
  const s = haystack.toLowerCase();
  const n = needle.toLocaleLowerCase();

  return !!s && !!n && (s.startsWith(n) || s.includes(n));
};

const sum = (...nrs: number[]) =>
  nrs.reduce((acc: number, nr) => (acc += nr), 0);

export const matchScore = (haystack: string[], needle: string = ''): number => {
  const s = haystack.map((v) => v.toLowerCase());
  const n = [
    ...needle.split(' ').map((v) => v.toLowerCase()),
    needle.toLowerCase(),
  ];

  const stack = s.join(' ');

  let score = 0;
  if (stack === needle.toLowerCase()) {
    // return exact matches
    return 1;
  } else if (s.some((st) => needle.toLowerCase().startsWith(st))) {
    // additional scoring for a start
    score += 0.5;
  }

  score +=
    Math.round(
      sum(
        ...s.reduce(
          (acc: number[], v) => [...acc, ...n.map((m) => getScore(v, m))],
          [],
        ),
      ) * 100,
    ) /
    100 /
    haystack.length; // compensate for large haystacks scoring high

  return !!s.length && !!n.length && score > 0
    ? Math.round(score * 100) / 100
    : 0;
};

export const getScore = (haystack: string, needle: string): number => {
  const s = haystack.toLowerCase();
  const n = needle.toLowerCase();
  let score = 0;

  if (!s.includes(n)) {
    return 0;
  } else if (s.startsWith(n) || s.endsWith(n)) {
    score += Math.round((n.length / s.length) * 100) / 100;
  } else if (n !== s) {
    score += Math.round((n.length / s.length) * 100) / 100 / 2;
  }

  return score;
};
