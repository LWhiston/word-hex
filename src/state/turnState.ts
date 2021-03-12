import { equals, remove } from "ramda";
import create from "zustand";
import { validateMoves } from "../util/tileValidation";
import { getWords } from "../util/words";
import { getValidWords } from "../util/wordValidation";
import { Hex, useHexStore } from "./hexState";
import { maxNumOfTiles, Tile, useRackStore } from "./rackState";
import { useTilePileStore } from "./tilePileState";
import { useWordListStore } from "./wordListState";

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
    const { hexData, setSelectedLetter } = useHexStore.getState();
    const { tiles, removeLetter } = useRackStore.getState();
    const isValid = validateMoves([...moves, move], hexData, tiles);
    if (isValid) {
      set({ moves: [...moves, move] });
      removeLetter(move.tile.letter);
      setSelectedLetter(move.tile.letter);
    }
  },
  undoMove: (hexIndex) => {
    const { moves } = get();
    const { grid, setSelectedLetter } = useHexStore.getState();
    const { addTiles } = useRackStore.getState();
    const hex = grid[hexIndex];
    const moveToUndoIndex = moves.findIndex((move) => equals(hex, move.hex));

    if (moveToUndoIndex !== -1) {
      const moveToUndo = moves[moveToUndoIndex];
      const newMoves = remove(moveToUndoIndex, 1, moves);
      set({ moves: newMoves });
      addTiles([moveToUndo.tile]);
      setSelectedLetter(undefined);
    }
  },
  endTurn: () => {
    const { moves } = get();
    const { hexData, grid } = useHexStore.getState();
    const { wordList } = useWordListStore.getState();
    const { draw } = useTilePileStore.getState();
    const { tiles, addTiles } = useRackStore.getState();

    const wordData = getWords(moves, hexData, grid);
    const validWords = getValidWords(wordData, wordList);

    if (validWords.length > 0) {
      console.log(validWords);
      addTiles(draw(maxNumOfTiles - tiles.length));
      set({ moves: [] });
    } else {
      //TODO
    }
  },
}));
