import { useEffect } from "react";
import create from "zustand";

export type WordLookup = {
  [word: string]: 1 | undefined;
};

type WorldListState = {
  wordList: WordLookup;
  fetchWordList: () => void;
};

export const useWordListStore = create<WorldListState>((set) => ({
  wordList: {},
  fetchWordList: async () => {
    const response = await fetch("/wordlist.json");
    const wordList = await response.json();
    set({ wordList });
  },
}));

export const useWorldListInit = () => {
  const fetchWordList = useWordListStore((state) => state.fetchWordList);
  useEffect(() => {
    fetchWordList();
    // eslint-disable-next-line
  }, []);
};
