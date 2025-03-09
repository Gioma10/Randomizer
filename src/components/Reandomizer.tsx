import { useState } from "react"

import { TiArrowBackOutline } from "react-icons/ti";

export default function Randomizer({selectStart}:{selectStart: ()=>void}){
    const [input, setInput]= useState('')



    const arr= []

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value)
        console.log(input);
        
    }

    const handleAdd= ()=> {

    }
    
    return (
        <div className="h-screen relative flex flex-col gap-8 items-center justify-center">
            <div 
                className="p-2 absolute top-0 left-0 text-2xl cursor-pointer "
                onClick={selectStart}> 
                <TiArrowBackOutline />
            </div>
            <div className="w-1/2 min-h-10 border p-5">
                
            </div>
            <div className="flex gap-4 border rounded-4xl">
                <input 
                    type="text" 
                    className=" py-1 px-4 outline-none" 
                    value={input}
                    onChange={(e)=>handleChange(e)}/>
                <button 
                    className="py-1 px-3 cursor-pointer hover:bg-amber-200 rounded-4xl"
                    onClick={handleAdd}>+</button>
            </div>
        </div>
    )
}