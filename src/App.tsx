import "./App.css";
import { Canvas } from "react-three-fiber";
import { Hex } from "./components/Hex";
import * as Honeycomb from "honeycomb-grid";

export const App = () => {
  const HexFactory = Honeycomb.extendHex({ size: 1.07 });
  const GridFactory = Honeycomb.defineGrid(HexFactory);
  const grid = GridFactory.hexagon({ radius: 4 });

  return (
    <div className="App">
      <Canvas
        camera={{
          fov: 75,
          near: 0.1,
          far: 1000,
          position: [0, 0, 12],
          rotation: [-1, Math.PI / 4, 3],
        }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {grid.map((hex) => {
          const { x, y } = hex.toPoint();
          return <Hex position={[x, y, 0]} />;
        })}
      </Canvas>
    </div>
  );
};
