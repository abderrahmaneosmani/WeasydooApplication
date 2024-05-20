export const calculateStars = (rate: number): number[] =>
  Array.from({length: rate}, (_, index) => index + 1);
