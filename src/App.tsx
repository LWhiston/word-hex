import React from "react";
import "./App.css";
import { Canvas } from "react-three-fiber";
import { Hex } from "./components/Hex";
import { useHexStore } from "./state/hexState";
import { useEffect, useRef } from "react";
import { isAlpha } from "./util/isAlpha";
import { Rack } from "./components/Rack";

export const App = () => {
  const length = useHexStore((state) => state.hexes.length);
  const setSelectedLetter = useHexStore((state) => state.setSelectedLetter);
  useEffect(() => {
    document.onkeypress = (event) => {
      if (event.key === "Enter") {
        console.log("Enter Pressed");
      }
      const letterPressed = event.key.toUpperCase();
      if (isAlpha(letterPressed)) {
        setSelectedLetter(letterPressed);
      }
    };

    document.onkeydown = (event) => {
      if (event.key === "Backspace" || event.key === "Escape") {
        setSelectedLetter(undefined);
      }
    };
  });

  const wordList = useRef<{ [word: string]: 1 | undefined }>();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/wordlist.json");
      const data = await response.json();
      wordList.current = data;
    };
    fetchData();
  });

  return (
    <div className="App" onKeyPress={(event) => console.log(event)}>
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
