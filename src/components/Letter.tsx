import { useLoader } from "react-three-fiber";
import { useRef } from "react";
import { FontLoader, Mesh } from "three";

type Props = {
  letter: string;
};

export const Letter = (props: Props) => {
  const font = useLoader(FontLoader, "/bold.blob");
  const { letter } = props;
  const mesh = useRef<Mesh>();
  const config = {
    font,
    size: 1,
    height: 0.2,
    curveSegments: 32,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.01,
    bevelOffset: 0,
    bevelSegments: 8,
    rotation: [Math.PI / 2, 0, 0],
  };

  return (
    <mesh ref={mesh} position={[-0.4, -0.4, 0]} scale={[1, 1, 1]}>
      <textBufferGeometry args={[letter, config]} />
      <meshStandardMaterial color={"black"} />
    </mesh>
  );
};
