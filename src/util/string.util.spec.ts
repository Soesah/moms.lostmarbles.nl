import { matches, matchScore } from './string.util';

describe('String Util', () => {
  describe('matches', () => {
    it('returns true when the needle is in the start of the haystack', () => {
      expect(matches('testing', 'ting')).toEqual(true);
    });
    it('returns true when the needle is part of the haystack', () => {
      expect(matches('testing', 'test')).toEqual(true);
    });
    it('returns false when the needle is empty', () => {
      expect(matches('testing', '')).toEqual(false);
    });
    it('returns false when the haystack is empty', () => {
      expect(matches('', 'test')).toEqual(false);
    });
  });
  describe('matchScore', () => {
    it('returns true when the needle is part of the haystack', () => {
      expect(matchScore(['worst van de slager'], 'verse worst')).toEqual(0.26);
    });
    it('returns 0 when the needle does not match anything in the haystack', () => {
      expect(matchScore(['worst van de slager'], 'kaas')).toEqual(0);
    });
    it('returns 0 when the needle does not match anything in the haystack', () => {
      expect(matchScore(['sla'], 'slavink')).toEqual(0);
    });
    it('returns more than 0 when the needle does not match anything in the haystack', () => {
      expect(matchScore(['slavink'], 'sla')).toEqual(0.43);
    });
    it('returns 0 when the needle does not match anything in the haystack', () => {
      expect(matchScore(['verse worst van de slager'], 'verse worst')).toEqual(
        0.4,
      );
    });
    it('returns 0 when the needle does not match anything in the haystack', () => {
      expect(matchScore(['verse worst van de slager'], 'verse worst')).toEqual(
        0.4,
      );
    });
    it('returns false when the needle does not match anything in the haystack', () => {
      expect(matchScore(['verse worst van de slager'], 'worst')).toEqual(0.2);
    });
  });
});
