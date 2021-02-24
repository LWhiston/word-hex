import "./App.css";
import { Canvas } from "react-three-fiber";
import { Box } from "./components/Box";

export const App = () => {
  return (
    <div className="App">
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box />
      </Canvas>
    </div>
  );
};
