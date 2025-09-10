import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, type ChangeEventHandler } from "react";

type Props= {
    onChange: ChangeEventHandler;
    checked: boolean
    name: string; 
    text: string;
    value: string | number | undefined;
    id: string;
}

const CheckBox = ({checked, value, name, onChange, text, id}: Props) => {
    const inputElement = useRef(null)
    return (    
    <div className="flex items-center m-1 gap-1 select-none">
            <input 
                ref={inputElement}
                checked={checked}
                type="checkbox" 
                name={name} 
                value={value} 
                onChange={onChange}
                className="peer sr-only"
                id={id}
            />
            <div 
            onClick={() => inputElement.current && (inputElement.current as HTMLInputElement)?.click()}
            className="flex items-center justify-center rounded-md bg-gray-200 w-5 h-5 text-center peer-checked:bg-black cursor-pointer">
                {
                    checked &&
                    <FontAwesomeIcon className="text-white text-sm" icon={faCheck}/>
                }
            </div>
            <label htmlFor={id} className="text-sm select-none">{text}</label>
    </div>
  )
}

export default CheckBox