import { identity, last, uniq } from "ramda";
import { Hex } from "../state/hexState";
import { Tile } from "../state/rackState";
import { Move } from "../state/turnState";

type Line = {
  coordinate: "q" | "r" | "s";
  value: number;
};

export const getLine = (hex1: Hex, hex2: Hex): Line | undefined => {
  const { q: q1, r: r1, s: s1 } = hex1.hex;
  const { q: q2, r: r2, s: s2 } = hex2.hex;

  if (q1 === q2 && r1 === r2 && s1 === s2) {
    //Same hex
    return undefined;
  }
  if (q1 === q2) {
    return {
      coordinate: "q",
      value: q1,
    };
  }
  if (r1 === r2) {
    return {
      coordinate: "r",
      value: r1,
    };
  }
  if (s1 === s2) {
    return {
      coordinate: "s",
      value: s1,
    };
  }
  //Not on a line
  return undefined;
};

const hexesInLine = (hexes: Hex[]) => {
  if (hexes.length < 2) {
    return true;
  }
  const [firstHex, secondHex, ...restHexes] = hexes;
  const line = getLine(firstHex, secondHex);
  if (line === undefined) {
    return false;
  }
  return restHexes.every((hex) => hex.hex[line.coordinate] === line.value);
};

//checks if the count of each letter in x is less than or equal to the count of each letter in y
// const lessThanByCount = (x: string[], y: string[]) => {
//   const xCount = countBy<string>(identity)(x);
//   const yCount = countBy<string>(identity)(y);
//   const xCountPairs: [string, number][] = toPairs(xCount);
//   return xCountPairs.every(([letter, count]) => count <= (yCount[letter] ?? 0));
// };

export const validateMoves = (
  moves: Move[],
  hexes: Hex[],
  availableTiles: Tile[]
): boolean => {
  const moveHexes = moves.map((move) => move.hex);
  const tileLetters = availableTiles.map((tile) => tile.letter);

  const validation = [
    uniq(moveHexes).length === moveHexes.length,
    hexesInLine(moveHexes),
    tileLetters.includes(last(moves)!.tile.letter),
  ];

  return validation.every(identity);
};
