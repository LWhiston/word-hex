import { remove } from "ramda";
import create from "zustand";
import { useTilePileState } from "./tilePileState";

export type Tile = {
  readonly letter: string;
  readonly value: number;
};

type RackState = {
  tiles: Tile[];
  removeLetter: (letter: string) => void;
};

const numOfTiles = 7;

export const useRackStore = create<RackState>((set, get) => ({
  tiles: useTilePileState.getState().draw(numOfTiles),
  removeLetter: (letter) => {
    const { tiles } = get();
    const letterIndex = tiles.findIndex((tile) => tile.letter === letter);
    if (letterIndex !== -1) {
      set({ tiles: remove(letterIndex, 1, tiles) });
    }
  },
  addTiles: (tiles: Tile[]) => {
    const { tiles: oldTiles } = get();
    set({ tiles: [...oldTiles, ...tiles] });
  },
}));
