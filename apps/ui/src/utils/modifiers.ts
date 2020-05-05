export const addSign = (value: number) =>
  value >= 0 ? `+${value}` : `${value}`;

export const getModifier = (value: number) => Math.floor((value - 10) / 2);
