import create from "zustand";
import { validateMoves } from "../util/tileValidation";
import { getWords } from "../util/words";
import { Hex, useHexStore } from "./hexState";
import { maxNumOfTiles, Tile, useRackStore } from "./rackState";
import { useTilePileStore } from "./tilePileState";

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
    const { hexes, grid } = useHexStore.getState();
    const words = getWords(moves, hexes, grid);
    console.log(words);
    const { draw } = useTilePileStore.getState();
    const { tiles, addTiles } = useRackStore.getState();
    addTiles(draw(maxNumOfTiles - tiles.length));
    set({ moves: [] });
  },
}));
