import { Text } from "@react-three/drei";
import { last, pipe, replace, toLower, toUpper } from "ramda";
import { scoreWord, useScoreStore } from "../state/scoreState";

const formatWord = pipe(toLower, replace(/^./, toUpper));

export const ScoredWords = () => {
  const { previousWords } = useScoreStore();
  const lastWords = last(previousWords);

  if (lastWords === undefined) {
    return null;
  }

  const text = `Last turn:
${lastWords
  .map((word) => `${formatWord(word)} - ${scoreWord(word)}`)
  .join("\n")}`;

  return (
    <Text
      color="black" // default
      anchorX="left" // default
      anchorY="top" // default
      fontSize={1.25}
      position={[-15, 12.5, 1]}
    >
      {text}
    </Text>
  );
};
