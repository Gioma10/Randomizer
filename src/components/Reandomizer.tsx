import React, { useState, useRef, useEffect } from "react";
import { TiArrowBack } from "react-icons/ti";
import { TiRefreshOutline } from "react-icons/ti";

import { motion } from "motion/react";
import Button from "./Button";

export default function Randomizer({ selectStart }: { selectStart: () => void }) {
  const [input, setInput] = useState<string>('');
  const [randomItems, setRandomItems] = useState<string[]>([]);
  const [chooseItem, setChooseItem] = useState<string[]>([])
  const [errorInput, setErrorInput] = useState<boolean>(false)
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
    if(!input){
      setErrorInput(true);
      setTimeout(() => setErrorInput(false), 500);
      return;
    }
    setRandomItems(prevItems => [...prevItems, input]);
    setInput('');
  }

  const handleRefresh = () => {
    setRandomItems([]);
  }

  const handleDelete= (index:number) => {
    setRandomItems(prevItems => prevItems.filter((item,i)=> index != i && item ))
  }

  const handleChoose = () => {
    if(randomItems.length === 0){
      setErrorInput(true);
      setTimeout(() => setErrorInput(false), 500);
      return
    }
    const index= Math.floor(Math.random() * randomItems.length)
    // console.log(index);

    setChooseItem(randomItems.filter((item, i)=> i === index && item))
  }


  return (
    <div className="h-screen relative flex flex-col gap-8 items-center justify-center">
      
      <div className="absolute top-0 left-0 m-5">
        {/* Bottone torna indietro */}
        <Button
          selectStart={selectStart}>
            <TiArrowBack/>
        </Button>
      </div>

      {/* Contenitore elementi in dubbio  */}
      <div className="w-1/2 bg-amber-200 min-h-20 max-h-44 flex border rounded-2xl relative shadow-[4px_4px_0px_black]">
        <div className="w-full absolute h-full bottom-0 rounded-2xl bg-black -z-30"></div>
          <div
            className="overflow-y-scroll flex flex-wrap  p-5"
            ref={containerRef} // Aggiungi il riferimento qui
          >
            {randomItems.map((item: string, index: number) => (
                  <motion.div
                      key={index}
                      className={`relative px-3 py-2 rounded-2xl text-sm flex justify-center items-center cursor-pointer -z-0`}
                      whileHover="hover" // Quando il cursore è sopra, attiva l'animazione con la variante "hover"
                      onClick={()=>handleDelete(index)}>
                          <motion.p
                              variants={{
                                  initial: { y: 0, opacity: 0 },
                                  hover: { y: -20, opacity: 1 }, // L'animazione si attiva quando il padre ha "hover"
                              }}
                              initial={{ y: 0, opacity: 0 }}
                              transition={{ease: 'easeOut', duration: 0.1, type:'spring', stiffness:400}}
                              className="absolute text-red-600 ">
                                  Elimina
                          </motion.p>
                          <Button >{item}</Button>
                </motion.div>
            ))}
          </div>
          <div className="p-2 absolute top-0 right-0 text-base cursor-pointer" onClick={handleRefresh}>
            <TiRefreshOutline />
          </div>
      </div>

      {/* Input elemento in dubbio  */}
      <form onSubmit={handleAdd} className="flex gap-4 justify-center items-center">
        <motion.input
          key={JSON.stringify(errorInput)}
          animate={errorInput ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
          transition={{ duration: 0.3 }}
          placeholder="Inserisci qualcosa"
          type="text"
          className={`py-1 px-3 outline-none border ${errorInput ? 'border-red-600 shadow-[3px_3px_0px_red]' : 'border-black shadow-[3px_3px_0px_black]'} rounded-4xl bg-amber-200`}
          value={input}
          onChange={handleChange}
        />
        <div className="cursor-pointer rounded-4xl">
          <Button>+</Button>
        </div>
      </form>

      {/* Bottone scegli */}
      <Button selectStart={handleChoose}>
        Pesca
      </Button>

      <p className="absolute top-1/2 left-1/2 text-8xl">{chooseItem}</p>
    </div>
  );
}
