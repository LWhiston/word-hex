import { Suspense, useRef, useState } from "react";
import type { Mesh } from "three";
import { useHex } from "../state/hexState";
import { Letter } from "./Letter";

type Props = {
  hexIndex: number;
};

export const Hex = (props: Props) => {
  const { hexIndex } = props;
  const mesh = useRef<Mesh>();
  const { hex, selected, letter, toggleHexSelected } = useHex(hexIndex);
  const { x, y } = hex.toPoint();
  const [hovered, setHover] = useState(false);

  return (
    <group position={[x, y, hovered ? 0.5 : 0]}>
      <mesh
        {...props}
        ref={mesh}
        scale={[1, 1, 1]}
        onClick={(_event) => {
          //console.log(hex.q, hex.r, hex.s);
          toggleHexSelected();
        }}
        onPointerOver={(_event) => setHover(true)}
        onPointerOut={(_event) => setHover(false)}
        position={[0, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderBufferGeometry
          args={[
            1, //radiusTop
            1, //radiusBottom
            0.2, //height
            6, //radialSegments
          ]}
        />
        <meshStandardMaterial color={selected ? "#cd8500" : "#8b5a2b"} />
      </mesh>
      {letter !== undefined && (
        <Suspense fallback={null}>
          <Letter letter={letter} />
        </Suspense>
      )}
    </group>
  );
};
