import create from "zustand";
import { useTilePileState } from "./tilePileState";

export type Tile = {
  readonly letter: string;
  readonly value: number;
};

type RackState = {
  tiles: Tile[];
};

const numOfTiles = 7;

export const useRackStore = create<RackState>((set) => ({
  tiles: useTilePileState.getState().draw(numOfTiles),
}));
