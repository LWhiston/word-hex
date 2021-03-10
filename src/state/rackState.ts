import { remove } from "ramda";
import create from "zustand";
import { useTilePileStore } from "./tilePileState";

export type Tile = {
  readonly letter: string;
  readonly value: number;
};

type RackState = {
  tiles: Tile[];
  addTiles: (tiles: Tile[]) => void;
  removeLetter: (letter: string) => void;
};

export const maxNumOfTiles = 7;

export const useRackStore = create<RackState>((set, get) => ({
  tiles: useTilePileStore.getState().draw(maxNumOfTiles),
  removeLetter: (letter) => {
    const { tiles } = get();
    const letterIndex = tiles.findIndex((tile) => tile.letter === letter);
    if (letterIndex !== -1) {
      set({ tiles: remove(letterIndex, 1, tiles) });
    }
  },
  addTiles: (tiles) => {
    const { tiles: oldTiles } = get();
    set({ tiles: [...oldTiles, ...tiles] });
  },
}));
