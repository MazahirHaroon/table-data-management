export const numericCompare = (
  a: number,
  b: number,
  direction: 1 | -1,
  indexA: number,
  indexB: number
) => {
  if (a < b) return -1 * direction;
  if (a > b) return 1 * direction;
  return indexA - indexB;
};

export const stringCompare = (
  valueA: unknown,
  valueB: unknown,
  direction: 1 | -1,
  indexA: number,
  indexB: number
) => {
  const a = String(valueA).toLowerCase();
  const b = String(valueB).toLowerCase();
  const compareValue = a.localeCompare(b);
  return compareValue * direction || indexA - indexB;
};
