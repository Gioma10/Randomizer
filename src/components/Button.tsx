export default function Button ({selectStart}:{ selectStart: () => void }, {children:any}){
    return (
        <>
            <button 
            onClick={selectStart}
            className="border py-1 px-3 rounded-4xl cursorPointer"> {children}</button>
        </>
    )
}