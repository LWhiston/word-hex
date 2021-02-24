import { useFrame } from "react-three-fiber";
import { useRef, useState } from "react";
import type { Mesh } from "three";

export const Box = () => {
  const mesh = useRef<Mesh>();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x = mesh.current.rotation.x + 0.05;
      mesh.current.rotation.y = mesh.current.rotation.y + 0.05;
    }
  });

  return (
    <mesh
      ref={mesh}
      position={[0, 0, 0]}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(_event) => setActive(!active)}
      onPointerOver={(_event) => setHover(true)}
      onPointerOut={(_event) => setHover(false)}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
};
