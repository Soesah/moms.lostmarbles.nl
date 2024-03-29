const DAYS: string[] = [
  'zondag',
  'maandag',
  'dinsdag',
  'woensdag',
  'donderdag',
  'vrijdag',
  'zaterdag',
];

const MONTHS: string[] = [
  'januari',
  'februari',
  'maart',
  'april',
  'mei',
  'juni',
  'juli',
  'augustus',
  'september',
  'oktober',
  'november',
  'december',
];

export const formatDateLong = (date: Date): string => {
  const day = date.getDate();
  const dayOfTheWeek = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${DAYS[dayOfTheWeek]} ${day} ${MONTHS[month]} ${year}`;
};

export const formatDateSimple = (date: Date): string => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${day} ${MONTHS[month]} ${year}`;
};
