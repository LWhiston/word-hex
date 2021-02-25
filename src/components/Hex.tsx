import { useRef, useState } from "react";
import { MeshProps } from "react-three-fiber";
import type { Mesh } from "three";

export const Hex = (props: MeshProps) => {
  const mesh = useRef<Mesh>();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={[1, 1, 1]}
      onClick={(_event) => setActive(!active)}
      onPointerOver={(_event) => setHover(true)}
      onPointerOut={(_event) => setHover(false)}
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
      <meshStandardMaterial color={hovered ? "#cd8500" : "#8b5a2b"} />
    </mesh>
  );
};
