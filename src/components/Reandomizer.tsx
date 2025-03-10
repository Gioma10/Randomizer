import React, { useState, useRef, useEffect } from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import { TiRefreshOutline } from "react-icons/ti";

import { motion } from "motion/react";
import Button from "./Button";

export default function Randomizer({ selectStart }: { selectStart: () => void }) {
  const [input, setInput] = useState('');
  const [randomItems, setRandomItems] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null); // Riferimento al contenitore
  
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight; // Scorre verso il basso
    }
  }, [randomItems]); // Questo effetto viene eseguito ogni volta che l'array cambia

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  }

  const handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setRandomItems(prevItems => [...prevItems, input]);
    setInput('');
  }

  const handleRefresh = () => {
    setRandomItems([]);
  }

  const handleDelete= (index:number) => {
    setRandomItems(prevItems => prevItems.filter((item,i)=> index != i && item ))
  }


  return (
    <div className="h-screen relative flex flex-col gap-8 items-center justify-center">
      <div className="p-2 absolute top-0 left-0 text-2xl cursor-pointer" onClick={selectStart}>
        <TiArrowBackOutline />
      </div>

      {/* Contenitore elementi in dubbio  */}
      <div className="w-1/2 min-h-20 max-h-44 flex border rounded-2xl relative">
        <div
          className="overflow-y-scroll flex flex-wrap gap-4 p-5"
          ref={containerRef} // Aggiungi il riferimento qui
        >
          {randomItems.map((item: string, index: number) => (
                <motion.div
                    key={index}
                    className="relative border bg-gray-300 px-3 py-1 rounded-2xl text-sm flex justify-center items-center cursor-pointer hover:bg-gray-400"
                    whileHover="hover" // Quando il cursore è sopra, attiva l'animazione con la variante "hover"
                    onClick={()=>handleDelete(index)}>
                        <motion.p
                            variants={{
                                initial: { y: 0, opacity: 0 },
                                hover: { y: -22, opacity: 1 }, // L'animazione si attiva quando il padre ha "hover"
                            }}
                            initial={{ y: 0, opacity: 0 }}
                            className="absolute text-red-600 -z-10">
                                Elimina
                        </motion.p>
                        <p>{item}</p>
              </motion.div>
          ))}
        </div>
        <div className="p-2 absolute top-0 right-0 text-base cursor-pointer" onClick={handleRefresh}>
          <TiRefreshOutline />
        </div>
      </div>

      {/* Input elemento in dubbio  */}
      <form onSubmit={handleAdd} className="flex gap-4 border rounded-4xl">
        <input
          type="text"
          className="py-1 px-4 outline-none"
          value={input}
          onChange={handleChange}
        />
        <button className="py-1 px-3 cursor-pointer hover:bg-amber-200 rounded-4xl" type="submit">+</button>
      </form>

      {/* Bottone scegli */}
      <Button>
        Scegli
      </Button>
    </div>
  );
}
