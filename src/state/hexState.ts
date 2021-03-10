import create from "zustand";
import * as Honeycomb from "honeycomb-grid";
import { useCallback } from "react";

export type Hex = Honeycomb.Hex<{}>;

export type HexData = {
  letter: string | undefined;
  selected: boolean;
};

type HexState = {
  grid: Honeycomb.Grid;
  hexes: HexData[];
  selectedHexIndex: number | undefined;
  setSelectedHexIndex: (index: number | undefined) => void;
  setSelectedLetter: (letter: string | undefined) => void;
};

const HexFactory = Honeycomb.extendHex<{ size: number }>({ size: 1.07 });
const GridFactory = Honeycomb.defineGrid(HexFactory);
const grid = GridFactory.hexagon({ radius: 5 });

//Can't use Array.map here
const hexes: HexData[] = [];
grid.forEach((hex) => hexes.push({ letter: undefined, selected: false }));

export const useHexStore = create<HexState>((set, get) => ({
  grid,
  hexes,
  selectedHexIndex: undefined,
  setSelectedHexIndex: (index) => {
    const { hexes, selectedHexIndex } = get();
    if (index !== undefined) {
      //Select current hex to selected
      hexes[index] = {
        ...hexes[index],
        selected: true,
      };
    }
    if (selectedHexIndex !== undefined && index !== selectedHexIndex) {
      //Deselect previously selected hex
      hexes[selectedHexIndex] = {
        ...hexes[selectedHexIndex],
        selected: false,
      };
    }
    set({
      selectedHexIndex: index,
    });
  },
  setSelectedLetter: (letter) => {
    const { hexes, selectedHexIndex } = get();
    if (selectedHexIndex !== undefined) {
      hexes[selectedHexIndex] = {
        ...hexes[selectedHexIndex],
        letter,
      };
      set({});
    }
  },
}));

export const useHex = (index: number) => {
  const hex = useHexStore((state) => state.grid[index]);
  const { letter, selected } = useHexStore(
    useCallback((state) => state.hexes[index], [index])
  );
  const { setSelectedHexIndex, selectedHexIndex } = useHexStore.getState();
  return {
    hex,
    letter,
    selected,
    toggleHexSelected: () => {
      if (selectedHexIndex === index) {
        setSelectedHexIndex(undefined);
      } else {
        setSelectedHexIndex(index);
      }
    },
    selectHex: () => setSelectedHexIndex(index),
    unselectHex: () => setSelectedHexIndex(undefined),
  };
};
