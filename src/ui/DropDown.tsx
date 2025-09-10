import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react";


type DropDownProp<T> = {
    options: T[] | null;
    value: T;
    label?: string;
    setter: (value: T) => void;
     
};



const DropDown = <T,>({label, options, value, setter}: DropDownProp<T>) => {

    const [expand, setExpand] = useState(false);
    const toggleExpand = () => setExpand(!expand);
    
    return (
<div className="flex flex-col gap-1 relative z-100 m-2">
        
    {label && <div className="text-sm text-zinc-600 font-semibold">{label}</div>}

    <div className="min-w-40 relative w-fit text-zinc-950  cursor-pointer z-10">    

    <div 
        className="flex items-center justify-between gap-1 px-3 py-2 border border-gray-300 rounded-lg outline-none"
        onClick={toggleExpand}
    >
        
        <p className="capitalize max-w-40 outline-0 cursor-pointer">{String(value)}</p>

        <FontAwesomeIcon className={`text-xs ${expand? 'rotate-180' : ''} transition-all `} icon={faChevronDown}/>
    </div>


    <div 
        className='absolute mt-2 ml-4 rounded-md bg-white shadow flex flex-col overflow-y-scroll transition-all h-fit w-full'
        style={{
            maxHeight: expand ? '280px' : '0',
        }}
    >
        {options && options.map((option) => {
            return (<button 
                        style={{
                            backgroundColor: (value && (option === value)) ? '#030712' : '',
                            color: (value && (option === value)) ? 'white' : '',

                        }}
                        className=" hover:bg-gray-300 capitalize  cursor-pointer px-2 py-1.5 text-left"
                        key={String(option)}
                        onClick={(e) => {
                            e.preventDefault()
                            setter(option);
                            toggleExpand();
                        }}
                    >
                        {String(option)}
                    </button>)
        })}

    </div>
    </div>
</div>
  )
}

export default DropDown