import { useState } from "react";

import Button from "./components/Button";
import Randomizer from "./components/Reandomizer";

function App() {
  const [isStarted, setIsStarted] = useState(false)

  const handleStart = () => {
    setIsStarted(prevStart => !prevStart)
  };

  return (
    <>
    
      {!isStarted ? 
        <div className="h-screen flex flex-col justify-center items-center gap-4">
          <h1 className="text-8xl">Dubbio !?</h1>
          <Button selectStart={handleStart}> Inizia </Button>
        </div> 
        :
        <Randomizer selectStart={handleStart}/>
      }
    </>
  )
}

export default App
