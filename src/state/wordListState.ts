import { useEffect } from "react";
import create from "zustand";

type WorldListState = {
  wordList: { [word: string]: 1 | undefined };
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
