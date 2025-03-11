import { motion } from "motion/react"
import { useEffect, useState } from "react";

import { IoDiceSharp } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";
import Button from "./Button";

interface WinnerProps {
    
    item: string[];
    onHome: ()=> void;
    onRestart: ()=> void;
}

const WinnerItem :React.FC<WinnerProps>=({item, onHome, onRestart})=>{
    const [isLoading, setIsLoading]= useState<boolean>(true)

    useEffect(()=>{
        setTimeout(() => setIsLoading(false), 2000);
    },[])


    return(
        <div className="h-screen items-center justify-center">
            {isLoading ?
                <div className="w-full h-full bg-black opacity-60 z-10">
                    <div className="flex justify-center items-center h-full relative">
                    <motion.div 
                        animate={{rotate:[0,-360], scale:[0.8, 1, 0.8], x:[0,20,-20,0]}}
                        transition={{duration: 1,repeat: Infinity, }}
                        className="absolute"
                        >
                        <IoDiceSharp className="text-amber-200 text-4xl"/>
                    </motion.div>
                    <motion.div 
                        animate={{rotate:[0,360], scale:[1,0.8, 1], x:[0,-10, 10,0]}}
                        transition={{duration: 1, repeat: Infinity,}}
                        className="absolute"
                        >
                        <IoDiceSharp className="text-amber-200 text-4xl"/>
                    </motion.div>
                    </div>
                </div>
            :
            <div className="flex justify-center items-center h-full flex-col gap-4">
                <div className="flex flex-col justify-center items-center winner !!!">
                    <p className=" text-6xl md:text-9xl winner py-1 px-5 rounded-4xl text-center">{item[0]}</p>
                    <p className="text-base md:text-2xl">Dubbio risolto !?</p>
                </div>
                <div className="flex gap-2 text-xs">
                    <Button handleSelect={onHome}>
                        <FaHome />
                    </Button>
                    <Button handleSelect={onRestart}>
                        <TfiReload />
                    </Button>
                </div>
            </div>
            }
        </div>
       
    )
}

export default WinnerItem;