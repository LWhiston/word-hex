import { Text } from "@react-three/drei";

type Props = {
  letter: string;
};

export const Letter = ({ letter }: Props) => {
  return (
    <Text
      color="black" // default
      anchorX="center" // default
      anchorY="middle" // default
      fontSize={1.5}
      position={[0, 0, 0.1]}
    >
      {letter}
    </Text>
  );
};
