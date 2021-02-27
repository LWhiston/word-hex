import create from "zustand";

export type Tile = {
  readonly letter: string;
  readonly value: number;
};

type RackState = {
  tiles: Tile[];
};

const numOfTiles = 7;

export const useRackStore = create<RackState>((set) => ({
  tiles: [],
}));
