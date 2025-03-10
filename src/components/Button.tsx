import React from "react";

interface ButtonProps {
    selectStart: () => void,
    children: any,
}

const Button: React.FC<ButtonProps> = ({selectStart, children})=>{
    return (
        <>
            <button 
            onClick={selectStart}
            className="border py-1 px-3 rounded-4xl cursorPointer text-xs">{children}</button>
        </>
    )
}

export default Button;