type Props = {
  starsFiled: number[];
  starsNotFiled: number[];
};
export const calculateStars = (rate: number): Props => {
  return {
    starsFiled: Array.from({length: rate}, (_, index) => index + 1),
    starsNotFiled: Array.from(
      {length: Math.ceil(5 - rate)},
      (_, index) => index + 1,
    ),
  };
};
