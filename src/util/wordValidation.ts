import { reverse } from "ramda";
import { WordLookup } from "../state/wordListState";
import { WordData } from "./words";

export const getValidWords = (
  wordData: WordData,
  wordLookup: WordLookup
): string[] => {
  const { mainWord, otherWords } = wordData;
  if (mainWord) {
    const mainWordLookup = lookupWordBidirectional(wordLookup, mainWord);
    if (mainWordLookup === undefined) {
      return [];
    }
    const otherValidWords = otherWords
      .map((word) => lookupWordBidirectional(wordLookup, word))
      .filter((word) => word !== undefined) as string[];
    return [mainWordLookup, ...otherValidWords];
  }
  return otherWords
    .map((word) => lookupWordBidirectional(wordLookup, word))
    .filter((word) => word !== undefined) as string[];
};

const lookupWordBidirectional = (
  wordLookup: WordLookup,
  word: string
): string | undefined => {
  if (wordLookup[word] === 1) {
    return word;
  }
  const reversedWord = reverse(word);
  if (wordLookup[reversedWord] === 1) {
    return reversedWord;
  }
  return undefined;
};
