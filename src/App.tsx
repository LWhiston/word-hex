import React from "react";
import "./App.css";
import { Canvas } from "react-three-fiber";
import { Hex } from "./components/Hex";
import { useHexStore } from "./state/hexState";
import { useEffect } from "react";
import { isAlpha } from "./util/isAlpha";
import { Rack } from "./components/Rack";
import { useWorldListInit } from "./state/wordListState";
import { useTurnStore } from "./state/turnState";
import { tileLookup } from "./state/tilePileState";

export const App = () => {
  const length = useHexStore((state) => state.grid.length);
  const { playMove, endTurn, undoMove } = useTurnStore();
  useWorldListInit();

  useEffect(() => {
    document.onkeypress = (event) => {
      if (event.key === "Enter") {
        endTurn();
      }
      const letterPressed = event.key.toUpperCase();
      const { grid, selectedHexIndex } = useHexStore.getState();
      if (isAlpha(letterPressed) && selectedHexIndex) {
        playMove({
          tile: tileLookup[letterPressed],
          hex: grid[selectedHexIndex],
        });
      }
    };

    document.onkeydown = (event) => {
      const { selectedHexIndex } = useHexStore.getState();
      if (
        (event.key === "Backspace" || event.key === "Escape") &&
        selectedHexIndex !== undefined
      ) {
        undoMove(selectedHexIndex);
      }
    };
  });

  return (
    <div className="App">
      <Canvas
        camera={{
          fov: 75,
          near: 0.1,
          far: 1000,
          position: [0, 0, 14],
        }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <group position={[0, 1, 0]}>
          {Array.from({ length }).map((_, index) => (
            <Hex key={index} hexIndex={index} />
          ))}
        </group>
        <Rack />
      </Canvas>
    </div>
  );
};
