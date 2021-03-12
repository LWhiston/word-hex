import { Text } from "@react-three/drei";
import { useRackStore } from "../state/rackState";

export const Rack = () => {
  const { tiles } = useRackStore();
  const test = tiles
    .map((tile) => tile.letter)
    .sort()
    .reduce((acc, letter) => acc + letter, "");

  return (
    <Text
      color="black" // default
      anchorX="center" // default
      anchorY="middle" // default
      fontSize={1.5}
      position={[0, -12, 1]}
    >
      {test}
    </Text>
  );
};
