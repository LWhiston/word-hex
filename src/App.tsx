import "./App.css";
import { Canvas } from "react-three-fiber";
import { Hex } from "./components/Hex";

export const App = () => {
  return (
    <div className="App">
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Hex />
      </Canvas>
    </div>
  );
};
