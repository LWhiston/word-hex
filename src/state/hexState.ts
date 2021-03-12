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
  hexData: HexData[];
  selectedHexIndex: number | undefined;
  setSelectedHexIndex: (index: number | undefined) => void;
  setSelectedLetter: (letter: string | undefined) => void;
};

const HexFactory = Honeycomb.extendHex<{ size: number }>({ size: 1.07 });
const GridFactory = Honeycomb.defineGrid(HexFactory);
const grid = GridFactory.hexagon({ radius: 7 });

//Can't use Array.map here
const hexData: HexData[] = [];
grid.forEach((hex) => hexData.push({ letter: undefined, selected: false }));

export const useHexStore = create<HexState>((set, get) => ({
  grid,
  hexData,
  selectedHexIndex: undefined,
  setSelectedHexIndex: (index) => {
    const { hexData, selectedHexIndex } = get();
    if (index !== undefined) {
      //Set current hex to selected
      hexData[index] = {
        ...hexData[index],
        selected: true,
      };
    }
    if (selectedHexIndex !== undefined && index !== selectedHexIndex) {
      //Deselect previously selected hex
      hexData[selectedHexIndex] = {
        ...hexData[selectedHexIndex],
        selected: false,
      };
    }
    set({
      selectedHexIndex: index,
    });
  },
  setSelectedLetter: (letter) => {
    const { hexData, selectedHexIndex } = get();
    if (selectedHexIndex !== undefined) {
      hexData[selectedHexIndex] = {
        ...hexData[selectedHexIndex],
        letter,
      };
      set({});
    }
  },
}));

export const useHex = (index: number) => {
  const hex = useHexStore((state) => state.grid[index]);
  const { letter, selected } = useHexStore(
    useCallback((state) => state.hexData[index], [index])
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
