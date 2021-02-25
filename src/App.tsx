import "./App.css";
import { Canvas } from "react-three-fiber";
import { Hex } from "./components/Hex";
import { useHexStore } from "./state/hexState";

export const App = () => {
  const length = useHexStore((state) => state.hexes.length);
  return (
    <div className="App">
      <Canvas
        camera={{
          fov: 75,
          near: 0.1,
          far: 1000,
          position: [0, 0, 12],
        }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {Array.from({ length }).map((_, index) => (
          <Hex key={index} hexIndex={index} />
        ))}
      </Canvas>
    </div>
  );
};
