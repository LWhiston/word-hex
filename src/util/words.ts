import { Grid } from "honeycomb-grid";
import { equals, reverse } from "ramda";
import { Hex } from "../state/hexState";
import { Move } from "../state/turnState";
import { getLine } from "./tileValidation";

const directionToDirectionPair: { [coord: string]: [number, number] } = {
  q: [1, 4],
  r: [0, 3],
  s: [2, 5],
};

const directionPairs: [number, number][] = [
  [0, 3],
  [1, 4],
  [2, 5],
];

export const getWords = (moves: Move[], hexes: Hex[], grid: Grid): string[] => {
  if (moves.length === 1) {
    const words = moves.flatMap((move) =>
      directionPairs.map((directionPair) =>
        calculateWord(directionPair, move, grid, hexes)
      )
    );
    return words;
  } else {
    const line = getLine(moves[0].hex, moves[1].hex);
    const mainDirectionPair = directionToDirectionPair[line?.coordinate!];
    console.log(mainDirectionPair);
    const mainWord = calculateWord(
      directionToDirectionPair[line?.coordinate!],
      moves[0],
      grid,
      hexes
    );
    const otherWords = moves.flatMap((move) =>
      directionPairs
        .filter((directionPair) => !equals(directionPair, mainDirectionPair))
        .map((directionPair) => calculateWord(directionPair, move, grid, hexes))
    );
    return [mainWord, ...otherWords];
  }
};

const calculateWord = (
  directionPair: [number, number],
  move: Move,
  grid: Grid,
  hexes: Hex[]
) => {
  const startingLetter = move.tile.letter;
  const firstDirectionLetters = getLettersInDirection(
    directionPair[0],
    move.hex,
    grid,
    hexes
  );
  const secondDirectionLetters = getLettersInDirection(
    directionPair[1],
    move.hex,
    grid,
    hexes
  );
  return (
    reverse(firstDirectionLetters) + startingLetter + secondDirectionLetters
  );
};

const getLettersInDirection = (
  direction: number,
  startingHex: Hex,
  grid: Grid,
  hexes: Hex[]
): string => {
  const [nextHoneycombHex] = grid.neighborsOf(startingHex.hex, direction);
  if (nextHoneycombHex === undefined) {
    return "";
  }
  const nextHex = hexes[grid.indexOf(nextHoneycombHex)];
  if (nextHex.letter === undefined) {
    return "";
  } else {
    return (
      nextHex.letter + getLettersInDirection(direction, nextHex, grid, hexes)
    );
  }
};
