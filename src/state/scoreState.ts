import { add, append, map, pipe, reduce, split } from "ramda";
import create from "zustand";
import { tileLookup } from "./tilePileState";

type ScoreState = {
  score: number;
  previousWords: string[][];
  scoreWords: (words: string[]) => void;
};

const stringToList = split("");

const scoreWord = pipe(
  stringToList,
  map((char) => tileLookup[char].value),
  reduce(add, 0)
);

const scoreWords = pipe(map(scoreWord), reduce(add, 0));

export const useScoreStore = create<ScoreState>((set, get) => ({
  score: 0,
  previousWords: [],
  scoreWords: (words) => {
    const { previousWords, score } = get();
    set({
      previousWords: append(words, previousWords),
      score: score + scoreWords(words),
    });
  },
}));
