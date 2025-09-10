import { faArrowLeft, faArrowRight, faExclamationCircle, faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";
import useQuiz from "./useQuiz";
import useQuizHistory, { levelColors } from "../History/useQuizHistory";
import type { DifficultyLevels } from "../../types/quiz";
import Option from "./Option";


const Quiz = () => {
    const {quiz, question, answer, index, opted, points, handleAnswer, handleNext, handleBack, handleOpted, check} = useQuiz();
    const {handleDelete} = useQuizHistory()
    
    if(!quiz || !question)return (
        <div className="h-full flex flex-col max-w-[480px] mx-auto">
            <div className="flex items-center justify-center h-full
            text-gray-500 font-semibold text-lg p-4 bg-white mx-4 my-auto">
                <FontAwesomeIcon icon={faExclamationCircle} className="text-2xl mr-2" />
                <span className="text-center">Quiz not found.</span>
            </div>
    </div>);

    

    return (

    <div className="h-full flex flex-col max-w-[480px] mx-auto">
        <header className="flex items-center my-6 ">
            <Link to='/history' className="p-2 text-2xl text-[#f24c7c] cursor-pointer">
                <FontAwesomeIcon icon={faArrowLeft}/>
            </Link>
                
            <h1 className="text-gray-800 font-semibold px-4">
                <span className="text-gray-400">Quiz / </span>{quiz.topic}
            </h1>

            <span className={`${levelColors[quiz.difficulty.toLowerCase() as DifficultyLevels]} bg-gray-50 rounded px-2 py-0.5 shadow mx-2`}>{quiz.difficulty}</span>

        </header>
        <div className="flex justify-end">
    
            <button
                onClick={()=> handleDelete(quiz._id)}
                className="text-red-500 cursor-pointer hover:underline "
            >
                <span className="text-red-500 text-sm font-semibold mx-2">Delete</span>
                {/* <FontAwesomeIcon className="text-red-500" icon={faTrash}/> */}

            </button>
        </div>
               

        <div className="h-[70%] w-full p-2  mx-auto my-auto flex flex-col justify-center">
            <div className="flex items-center justify-between py-2">
                <div className="text-lg font-bold my-2">
                    Question {index + 1} of {quiz.questions.length}
                </div>
                
                <div className="text-sm text-zinc-400 font-semibold">
                    Score: {points} / {quiz.questions.length}
                </div>
            </div>
            <h3 className="px-1">{question.question}
            </h3>

            
            <div className="mx-4 my-auto">
                {(question.type === 'MCQ' || question.type === 'TF') ? question.options.map(opt =>{
                      const style = {
                        regular: "border-2 border-gray-200",
                        opted: opt.correct ? "border-3 border-green-200" : "border-3 border-red-200"
                    }
                    
                return <Option 
                            onClick={() => handleOpted(opt)}
                            style={opted ? style.opted : style.regular}        
                            choice={opt}
                        />
                    
                }) : <><textarea value={answer} className="border border-gray-300 px-4 py-2 rounded-xl bg-gray-50 text-gray-700
           shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-1px_-1px_2px_rgba(0,0,0,0.05)]
           focus:outline-none focus:shadow-[2px_2px_4px_rgba(255,255,255,0.8),-1px_-1px_2px_rgba(0,0,0,0.05)] min-h-30 max-h-60 min-w-80"
            onChange={handleAnswer}/>
                        <button onClick={()=>check(question.question, question.explanation)}>Submit</button>
                </>}

            </div>

            <div className={`${(!opted || !question.explanation ) && "hidden"}`}>
                <span className="font-bold mx-1">Explanation: </span>
                {question.explanation}
            </div>

            <div className="flex items-center justify-between px-1 py-2">
                <button 
                onClick={handleBack}
                className="py-2 px-3 m-2 flex items-center gap-2 bg-white text-gray-600 rounded-md shadow cursor-pointer hover:bg-zinc-200">
                    <FontAwesomeIcon icon={faArrowLeft}/>
                    Back
                </button>

                <button 
                onClick={handleNext}
                className="py-2 px-3 flex items-center gap-2 bg-green-600 text-zinc-50 rounded-md shadow cursor-pointer hover:bg-green-700">
                    {
                    index + 1 < quiz.questions.length ?
                    <>
                    Next
                    <FontAwesomeIcon icon={faArrowRight}/>
                    </>
                    :
                    <>
                    <FontAwesomeIcon icon={faRotate}/>
                        Retry
                    </>
                    }
                </button>
            </div>
        </div>
    </div>
  )
}

export default Quiz;