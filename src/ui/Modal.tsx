import { useContext } from "react"
import { MessageContext } from "../context/MessageContext";



const Modal = () => {
    const {modal, setModal} = useContext(MessageContext)

    if(!modal)return;

    
    return (
        <div className="absolute top-0 left-0 flex items-center justify-center z-[1000] h-full w-full bg-[rgb(0,0,0,0.09)] ">
            
            <div className="border-2 border-gray-300 px-4 py-2 rounded-xl bg-zinc-50 text-gray-700
           shadow-[inset_2px_2px_4px_rgba(255,255,255,0.9),inset_-1px_-1px_2px_rgba(0,0,0,0.05)] min-w-60 m-auto max-w-50">
                
                <h1 className="px-2 py-1 my-2">{modal?.text}</h1>
                <div className="border-t-2 border-gray-300 px-2 py-1 text-end">
                    <button 
                    className="m-1 bg-gray-400 text-white px-2 py-1 rounded-md"
                    onClick={() => setModal(null)}>
                        {modal?.options.cancel}
                    </button>
                    <button 
                    className="m-1 bg-pink-500 text-white px-2 py-1 rounded-md"
                    onClick={modal?.options.ok.action}>
                        {modal?.options.ok.text}
                    </button>
                </div>
            </div>
        </div>)
}

export default Modal