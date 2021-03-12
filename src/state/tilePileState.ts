import create from "zustand";
import { Tile } from "./rackState";
import { chain, pipe, repeat, splitAt } from "ramda";
import { shuffle } from "../util/shuffle";

type TilePile = {
  tiles: Tile[];
  draw: (drawCount: number) => Tile[];
};

type TileInfo = Tile & {
  count: number;
};

const initialTileInfo: TileInfo[] = [
  { letter: "A", count: 9, value: 1 },
  { letter: "B", count: 2, value: 3 },
  { letter: "C", count: 2, value: 3 },
  { letter: "D", count: 4, value: 2 },
  { letter: "E", count: 12, value: 1 },
  { letter: "F", count: 2, value: 4 },
  { letter: "G", count: 3, value: 2 },
  { letter: "H", count: 2, value: 4 },
  { letter: "I", count: 9, value: 1 },
  { letter: "J", count: 1, value: 8 },
  { letter: "K", count: 1, value: 5 },
  { letter: "L", count: 4, value: 1 },
  { letter: "M", count: 2, value: 3 },
  { letter: "N", count: 6, value: 1 },
  { letter: "O", count: 8, value: 1 },
  { letter: "P", count: 2, value: 3 },
  { letter: "Q", count: 1, value: 10 },
  { letter: "R", count: 6, value: 1 },
  { letter: "S", count: 4, value: 1 },
  { letter: "T", count: 6, value: 1 },
  { letter: "U", count: 4, value: 1 },
  { letter: "V", count: 2, value: 4 },
  { letter: "W", count: 2, value: 4 },
  { letter: "X", count: 1, value: 8 },
  { letter: "Y", count: 2, value: 4 },
  { letter: "Z", count: 1, value: 10 },
];

export const tileLookup: { [word: string]: Tile } = {};
initialTileInfo.forEach(({ letter, value }) => {
  tileLookup[letter] = { letter, value };
});

const createTiles: (tileInfo: TileInfo[]) => Tile[] = pipe(
  chain(({ letter, count, value }) => repeat({ letter, value }, count)),
  shuffle
);

export const useTilePileStore = create<TilePile>((set, get) => ({
  tiles: createTiles(initialTileInfo),
  draw: (drawCount) => {
    const { tiles } = get();
    const [drawnTiles, remainingTiles] = splitAt(drawCount, tiles);
    set({ tiles: remainingTiles });
    return drawnTiles;
  },
}));
