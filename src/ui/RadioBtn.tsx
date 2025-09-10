import type { ChangeEventHandler } from "react";


type Props = {
    text: string;
    name: string; 
    id: string; 
    value: string;
    onClick: ChangeEventHandler<HTMLInputElement>;
}

const RadioBtn = ({text, name, id, value, onClick}: Props) => {
  return (
    <div className="
            w-fit 
            cursor-pointer
            active:p-0 
            relative">
        <input 
            type="radio" 
            checked={value === id}
            name={name} 
            id={id}
            onChange={onClick}
            className="peer sr-only"
        />
        <label htmlFor={id} className="
          text-md
          peer-checked:text-
          cursor-pointer py-1 px-2
          flex gap-2 items-center
        ">
          
        <div className="flex items-center justify-center border-2 border-gray-300
        bg-gray-100 rounded-full ">
              <div className={`p-1 m-1 rounded-full ${value === id && 'bg-black'}`}/>

        </div>
            <p>{text}</p>
          </label>
    </div>
  )
}

export default RadioBtn