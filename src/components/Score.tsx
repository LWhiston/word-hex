import { Text } from "@react-three/drei";
import { useScoreStore } from "../state/scoreState";

export const Score = () => {
  const { score } = useScoreStore();

  return (
    <Text
      color="black" // default
      anchorX="left" // default
      anchorY="middle" // default
      fontSize={1.5}
      position={[8.5, 11, 1]}
    >
      {`Score: ${score}`}
    </Text>
  );
};
