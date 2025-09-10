import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { type Quiz as QuizType } from "../../types/quiz"
import { faCoins, faFilePdf } from "@fortawesome/free-solid-svg-icons"
import { levelColors } from "./useQuizHistory"
import { Link } from "react-router-dom"
import { generateQuizPDF } from "./pdf"


const Quiz = ({quiz}: {quiz: QuizType}) => {
  return (
    <div className="m-2 p-2 rounded-xl">
        <h3 className="max-md:max-w-80 m-1 font-semibold whitespace-nowrap truncate" >{quiz.topic}</h3>
        <div className="flex items-center flex-wrap gap-2 text-sm text-zinc-600 mt-2">
            <span className={`text-xs bg-gray-200 px-2 py-1 rounded-md capitalize ${levelColors[quiz.difficulty]}`}>{quiz.difficulty}</span>
            <span className="text-xs bg-gray-200 px-2 py-1 rounded-md capitalize">{quiz.questions.length} Questions</span>
            <span className="text-xs bg-gray-200 px-2 py-1 rounded-md capitalize">{quiz.generated_from}</span>
            <span className="text-xs bg-gray-200 px-2 py-1 rounded-md capitalize"><FontAwesomeIcon className="text-amber-400" icon={faCoins}/> {quiz.credits} Credits</span>
            <span className="text-xs bg-gray-200 px-2 py-1 rounded-md capitalize">{quiz.question_types.join(', ')}</span>
            
        </div>
        <div className="flex justify-end items-center">
                <button
                  onClick={() => generateQuizPDF(quiz)}
                  className=" text-zinc-600 p-1 rounded-md text-sm font-semibold flex items-center gap-1 hover:underline cursor-pointer transition-colors">
                    <FontAwesomeIcon icon={faFilePdf}/> export
                </button>
                <Link to={`/quiz/${quiz._id}`} className="bg-[#f24c7c] text-white p-1 rounded-md mx-3 mt-1 hover:bg-blue-600">View questions</Link>
        </div>
    </div>
  )
}

export default Quiz