import create from "zustand";
import { validateMoves } from "../util/tileValidation";
import { Hex, useHexStore } from "./hexState";
import { Tile, useRackStore } from "./rackState";

export type Move = {
  tile: Tile;
  hex: Hex;
};

type TurnState = {
  moves: Move[];
  playMove: (move: Move) => void;
  undoMove: (hexIndex: number) => void;
  endTurn: () => void;
};

export const useTurnStore = create<TurnState>((set, get) => ({
  moves: [],
  playMove: (move) => {
    const { moves } = get();
    const { hexes, setSelectedLetter } = useHexStore.getState();
    const { tiles, removeLetter } = useRackStore.getState();
    const isValid = validateMoves([...moves, move], hexes, tiles);
    if (isValid) {
      set({ moves: [...moves, move] });
      removeLetter(move.tile.letter);
      setSelectedLetter(move.tile.letter);
    }
  },
  undoMove: (hexIndex) => {
    const { moves } = get();
    const { hexes } = useHexStore.getState();
  },
  endTurn: () => {
    const { moves } = get();
    const { hexes } = useHexStore.getState();
  },
}));
