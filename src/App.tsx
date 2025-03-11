import { useState } from "react";

import Button from "./components/Button";
import Randomizer from "./components/Randomizer";

function App() {
  const [isStarted, setIsStarted] = useState(false)

  const handleStart = () => {
    setIsStarted(prevStart => !prevStart)
  };

  return (
    <>
    
      {!isStarted ? 
        <div className="h-screen flex flex-col gap-4 justify-center items-center ">
            <h1 className="text-6xl">Dubbio !?</h1>
            <Button handleSelect={handleStart}>
              Inizia
            </Button>
        </div> 
        :
        <Randomizer selectStart={handleStart}/>
      }
    </>
  )
}

export default App
