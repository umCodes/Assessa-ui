import Title from "../../ui/Title"
import useQuizHistory, { sorts } from "./useQuizHistory"
import DropDown from "../../ui/DropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAmountDown, faSortAmountUp, faSpinner } from "@fortawesome/free-solid-svg-icons";
import CheckBox from "../../ui/CheckBox";
import Quiz from "./Quiz";


function History() {
  //  page, fullLength, prevPage, nextPage
    const {quizes, sortedBy, setSortedBy, setOrder, order, qTypes, handleQTypes} = useQuizHistory();
    
    function quizList(){
        if(!quizes) 
        return <div className="text-center text-gray-500 my-auto">
            <FontAwesomeIcon icon={faSpinner} spin/>
            <p className="text-sm">Loading...</p>
        </div>;
        if(quizes.length === 0) return <div className="text-center text-gray-500 my-auto">No quizzes generated yet.</div>;
        return [...quizes]?.sort((a,b) => order * sorts[sortedBy](a,b)).map(quiz => (qTypes.every(type => quiz.question_types.includes(type))) && <Quiz key={quiz._id} quiz={quiz}/>)
    }

  return (
  <div className="max-w-[600px] mx-auto h-full grid grid-rows-[auto_1fr]"> 
        <div>
          <Title title="Quiz History"/>
          <div className="flex items-center">
            <div className="flex items-center justify-between w-fit">
                <DropDown 
                    options={['default', 'topic', 'credits', 'questions', 'difficulty']}
                    value={sortedBy}
                    setter={setSortedBy}
                />
                <button className="cursor-pointer" onClick={() => setOrder((prev)=> -prev as  1 | -1 )}>
                        {order === 1 ? <FontAwesomeIcon icon={faSortAmountDown}/> : <FontAwesomeIcon icon={faSortAmountUp}/>}
                </button>
            </div>

            <div className="flex items-center justify-between w-fit mx-2">
                  <CheckBox
                      text="MCQ"
                      value="MCQ"
                      id="MCQ"
                      name="question-types"
                      checked={qTypes.includes("MCQ")}
                      onChange={handleQTypes}       
                  />
                  <CheckBox
                      text="True or False"
                      value="TF"
                      id="TF"
                      name="question-types"
                      checked={qTypes.includes("TF")}
                      onChange={handleQTypes}       

                  />
            </div>
        </div>

        </div>
        <div className="flex flex-col overflow-scroll">
          {quizList()}
        </div>
    </div>
  )
}

export default History