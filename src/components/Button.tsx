import { motion } from "motion/react";
import React from "react";

interface ButtonProps {
    handleSelect?: () => void,
    children: any,
}

const Button: React.FC<ButtonProps> = ({handleSelect, children})=>{
    return (
        <motion.div 
            whileHover='hover'
            className="relative cursor-pointer">
                <div className="w-full absolute h-full bottom-0 rounded-4xl bg-black -z-10"></div>
                <motion.button
                    variants={buttonVariants}
                    initial={ {y:-3, x:-3}}
                    onClick={handleSelect}
                    className=" bg-[#fee685] border py-1 px-3 rounded-4xl text-sm md:text-xl cursor-pointer">
                        {children}
                </motion.button>
        </motion.div>
    )
}

export default Button;

const buttonVariants={
        
        hover: { y:0, x:0 }, // L'animazione si attiva quando il padre ha "hover"
}