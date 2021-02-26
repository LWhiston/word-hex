export const isAlpha = (letter: string) =>
  letter.length === 1 && letter.search(/[A-Z]/) !== -1;
