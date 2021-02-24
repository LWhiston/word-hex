import { useRef, useState } from "react";
import type { Mesh } from "three";

export const Hex = () => {
  const mesh = useRef<Mesh>();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <mesh
      ref={mesh}
      position={[0, 0, 0]}
      scale={[1, 1, 1]}
      onClick={(_event) => setActive(!active)}
      onPointerOver={(_event) => setHover(true)}
      onPointerOut={(_event) => setHover(false)}
      rotation={[Math.PI / 2, Math.PI / 2, 0]}
    >
      <cylinderBufferGeometry args={[1, 1, 1, 6]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
};
