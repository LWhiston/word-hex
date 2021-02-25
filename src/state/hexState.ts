import create from "zustand";
import * as Honeycomb from "honeycomb-grid";
import { useCallback } from "react";

type Hex = {
  hex: Honeycomb.Hex<{ size: number }>;
  letter: string | undefined;
  selected: boolean;
};

type HexState = {
  hexes: Hex[];
  selectedHexIndex: number | undefined;
  setSelectedHexIndex: (index: number | undefined) => void;
};

const HexFactory = Honeycomb.extendHex<{ size: number }>({ size: 1.07 });
const GridFactory = Honeycomb.defineGrid(HexFactory);
const grid = GridFactory.hexagon({ radius: 4 });

//Can't use Array.map here
const hexes: Hex[] = [];
grid.forEach((hex) => hexes.push({ hex, letter: undefined, selected: false }));

export const useHexStore = create<HexState>((set, get) => ({
  hexes,
  selectedHexIndex: undefined,
  setSelectedHexIndex: (index) => {
    const { hexes, selectedHexIndex } = get();
    if (index !== undefined) {
      hexes[index] = {
        ...hexes[index],
        selected: true,
      };
    }
    if (selectedHexIndex !== undefined && index !== selectedHexIndex) {
      hexes[selectedHexIndex] = {
        ...hexes[selectedHexIndex],
        selected: false,
      };
    }
    set({
      hexes,
      selectedHexIndex: index,
    });
  },
}));

export const useHex = (index: number) => {
  const { hex, letter, selected } = useHexStore(
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
