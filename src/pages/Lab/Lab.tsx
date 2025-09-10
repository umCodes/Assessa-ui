import { useState } from "react"
import QuizForm from "./forms/QuizForm";
import ClearUpForm from "./forms/ClearUpForm";
import useDrag from "./forms/useDrag";
import Title from "../../ui/Title";

function Lab() {
  const [service, setService] = useState<"quiz" | "clear up">("quiz");
      const {
        isDragging,
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
        handleDrop
     } = useDrag();
  const selectedServiceStyle = "bg-[#f24c7c] text-white rounded-md";
  
  return (
    <div className={`flex flex-col ${isDragging && 'bg-zinc-50'}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
    
    >

      <Title title="Generate"/>
      <div className="border-2 border-gray-100 bg-gray-50 flex items-center w-fit mx-auto rounded-md">

        <div 
          onClick={() => setService('quiz')}
          className={`p-2 m-1 cursor-pointer ${service === 'quiz' && selectedServiceStyle}`}
        >Quiz</div>
        <div
          onClick={() => setService('clear up')} 
          className={`p-2 m-1 cursor-pointer ${service === 'clear up' && selectedServiceStyle}`}
        >Clear Up</div>
      </div>
        <div className="flex items-center justify-center p-4">
          {service === 'quiz' ? (<QuizForm />) : (<ClearUpForm />)}
        </div>
    </div>
  )
}

export default Lab