import React, { useState, useRef, useEffect } from "react";
import { TiArrowBack } from "react-icons/ti";
import { TiRefreshOutline } from "react-icons/ti";

import { motion } from "motion/react";
import Button from "./Button";
import WinnerItem from "./WinnerItem";

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
    setChooseItem([]);
  }

  const handleDelete= (index:number) => {
    setRandomItems(prevItems => prevItems.filter((item,i)=> index != i && item ))
  }

  const handleChoose = () => {
    if(randomItems.length <= 1 ){
      setErrorInput(true);
      setTimeout(() => setErrorInput(false), 500);
      return
    }
    const index= Math.floor(Math.random() * randomItems.length)
    // console.log(index);
    setChooseItem(randomItems.filter((item, i)=> i === index && item))
  }

  return (
    <>
      {chooseItem.length === 0 ?
        <div className="h-screen relative flex flex-col gap-8 items-center justify-center">
        
        <div className="absolute top-0 left-0 m-5">
          {/* Bottone torna indietro */}
          <Button
            handleSelect={selectStart}>
              <TiArrowBack/>
          </Button>
        </div>
        {/* Contenitore elementi in dubbio  */}
        <div className="w-2/3 bg-amber-200 min-h-32 max-h-44 flex border rounded-2xl relative shadow-[4px_4px_0px_black]">
            <div
              className={`overflow-y-scroll flex flex-wrap gap-4 p-5`}
              ref={containerRef} // Aggiungi il riferimento qui
            >
              {randomItems.map((item: string, index: number) => {
                return(
                      <motion.div
                          key={index}
                          className='relative rounded-2xl text-sm flex justify-center items-center cursor-pointer -z-0'
                          whileHover="hover" // Quando il cursore è sopra, attiva l'animazione con la variante "hover"
                          onClick={()=>handleDelete(index)}>
                              <motion.p
                                  variants={{
                                      initial: { y: 0, opacity: 0 },
                                      hover: { y: -22, opacity: 1 }, // L'animazione si attiva quando il padre ha "hover"
                                  }}
                                  initial={{ y: 0, opacity: 0 }}
                                  transition={{ease: 'easeOut', duration: 0.1, type:'spring', stiffness:400}}
                                  className="absolute text-red-600 ">
                                      Elimina
                              </motion.p>
                              <Button >
                                <p className="text-sm">{item}</p>
                              </Button>
                    </motion.div>
              )})}
            </div>
            <div className="p-2 absolute top-0 right-0 text-base cursor-pointer z-10" onClick={handleRefresh}>
              <Button>

              <TiRefreshOutline />
              </Button>
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
            className={`text-base md:text-xl py-1 px-3 outline-none border ${errorInput ? 'border-red-600 shadow-[3px_3px_0px_red]' : 'border-black shadow-[3px_3px_0px_black]'} rounded-4xl bg-amber-200`}
            value={input}
            onChange={handleChange}
          />
          <div className="cursor-pointer rounded-4xl">
            <Button>+</Button>
          </div>
        </form>

        {/* Bottone scegli */}
        <Button handleSelect={handleChoose}>
          Pesca
        </Button>
      </div>
      :
        <WinnerItem onHome={selectStart} onRestart={handleRefresh} item={chooseItem}/>
      }
    </>
  );
}
