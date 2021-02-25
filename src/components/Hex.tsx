import { useRef, useState } from "react";
import type { Mesh } from "three";
import * as Honeycomb from "honeycomb-grid";

type Props = {
  hex: Honeycomb.Hex<{}>;
};

export const Hex = (props: Props) => {
  const { hex } = props;
  const { x, y } = hex.toPoint();

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
      position={[x, y, 0]}
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
