import { Grid } from "honeycomb-grid";
import { equals, reverse } from "ramda";
import { Hex, HexData } from "../state/hexState";
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

export const getWords = (
  moves: Move[],
  hexData: HexData[],
  grid: Grid
): string[] => {
  if (moves.length === 1) {
    const words = moves.flatMap((move) =>
      directionPairs.map((directionPair) =>
        calculateWord(directionPair, move, grid, hexData)
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
      hexData
    );
    const otherWords = moves.flatMap((move) =>
      directionPairs
        .filter((directionPair) => !equals(directionPair, mainDirectionPair))
        .map((directionPair) =>
          calculateWord(directionPair, move, grid, hexData)
        )
    );
    return [mainWord, ...otherWords];
  }
};

const calculateWord = (
  directionPair: [number, number],
  move: Move,
  grid: Grid,
  hexData: HexData[]
) => {
  const startingLetter = move.tile.letter;
  const firstDirectionLetters = getLettersInDirection(
    directionPair[0],
    move.hex,
    grid,
    hexData
  );
  const secondDirectionLetters = getLettersInDirection(
    directionPair[1],
    move.hex,
    grid,
    hexData
  );
  return (
    reverse(firstDirectionLetters) + startingLetter + secondDirectionLetters
  );
};

const getLettersInDirection = (
  direction: number,
  startingHex: Hex,
  grid: Grid,
  hexData: HexData[]
): string => {
  const [nextHex] = grid.neighborsOf(startingHex, direction);
  if (nextHex === undefined) {
    return "";
  }
  const { letter } = hexData[grid.indexOf(nextHex)];
  if (letter === undefined) {
    return "";
  } else {
    return letter + getLettersInDirection(direction, nextHex, grid, hexData);
  }
};
