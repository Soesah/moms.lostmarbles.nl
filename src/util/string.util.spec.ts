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
    it('returns more than 0 when the needle occurs at the start of the haystack', () => {
      expect(matchScore(['worst van de slager'], 'worst')).toEqual(0.52);
    });
    it('returns more than 0 when the needle is part of the haystack', () => {
      expect(matchScore(['worst van de slager'], 'verse worst')).toEqual(0.26);
    });
    it('returns 0 when the needle does not match anything in the haystack', () => {
      expect(matchScore(['worst van de slager'], 'kaas')).toEqual(0);
    });
    it('returns 0 when the needle does not match anything in the haystack [false positive]', () => {
      expect(matchScore(['sla'], 'slavink')).toEqual(0.5);
    });
    it('returns more than 0 when the needle does not match anything in the haystack', () => {
      expect(matchScore(['slavink'], 'sla')).toEqual(0.86);
    });
    it('returns 0 when the needle does not match anything in the haystack', () => {
      expect(matchScore(['verse worst van de slager'], 'verse worst')).toEqual(
        0.74,
      );
    });
    it('returns 0 when the needle does not match anything in the haystack', () => {
      expect(matchScore(['verse worst van de slager'], 'verse worst')).toEqual(
        0.74,
      );
    });
    it('returns more than 0 when the needle does not match anything in the haystack', () => {
      expect(matchScore(['verse worst van de slager'], 'worst')).toEqual(0.2);
    });
    it('returns 1 when the needle exactly matches haystack', () => {
      expect(matchScore(['Soto ayam'], 'soto ayam')).toEqual(1);
    });
    it('returns more than 0 when the needle does not match anything in the haystack', () => {
      expect(matchScore(['Ayam kobé'], 'soto ayam')).toEqual(0.44);
    });
    it('returns more than 0 when the needle does not match anything in the haystack', () => {
      expect(
        matchScore(
          ['Slavink', 'Slavinken', 'Slavink'],
          'Karbonade, aardappels in oven, broccoli',
        ),
      ).toEqual(0.13);
    });
  });
});
