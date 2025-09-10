import { useContext, useState, type ChangeEvent } from "react"
import { difficultyLevels, type DifficultyLevels, type Quiz, type QuestionTypes, type Sorts } from "../../types/quiz";
import { deleteQuiz } from "../../services/quiz";
import { QuizesContext } from "../../context/QuizesContext";
import { MessageContext } from "../../context/MessageContext";
import { useNavigate } from "react-router-dom";


export const sorts = {
    'default': (a: Quiz, b:Quiz) => a.credits * b.credits * 0,
    'credits': (a: Quiz, b: Quiz) => b.credits - a.credits,
    'topic': (a: Quiz, b: Quiz) => a.topic.localeCompare(b.topic),
    'questions': (a: Quiz, b:Quiz) => b.questions.length - a.questions.length,
    'difficulty': (a: Quiz, b:Quiz) => { 
        return difficultyLevels.indexOf(b.difficulty.toLowerCase() as DifficultyLevels) - difficultyLevels.indexOf(a.difficulty.toLowerCase()as DifficultyLevels)
    },


}


export const levelColors = {
  basic: "text-green-500",
  regular: "text-blue-500",
  intermediate: "text-yellow-600",
  advanced: "text-orange-600",
  expert: "text-red-600",
};

const useQuizHistory = () => {
    const {sendModal} = useContext(MessageContext) 
    const {quizes, isLoading, setIsLoading, setPage, page, quizesLength: fullLength} = useContext(QuizesContext)
    const [isDeleting, setIsDeleting] = useState(false);
    const {sendMessage} = useContext(MessageContext)
    const navigateTo = useNavigate();
    const [sortedBy, setSortedBy] = useState<Sorts>('default');
    const [order, setOrder] = useState<1 | -1>(1);
    const [qTypes, setQTypes] = useState<QuestionTypes[]>([]);

      const handleDownload = (quiz: Quiz) => {
        const link = document.createElement("a");
        link.href = `${String(import.meta.env.VITE_BASE_API_PATH)}/api/export/${quiz._id}`; // calls Express
        link.download = `${quiz.topic}.png`; // suggested filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    function handleQTypes(e: ChangeEvent<HTMLInputElement>){
        const value  = e.target.value as QuestionTypes;

        console.log(e.target.checked);
        
        if(qTypes.includes(value)){
            console.log(qTypes);
            
            setQTypes([...qTypes.filter(quiz => quiz !== value)])
        }
        else setQTypes([...qTypes, value])
    }

    async function handleDelete(id: string){
        sendModal('Delete Quiz?', 'Cancel', 'Delete', async ()=>{
                setIsDeleting(true);

            try {
                await deleteQuiz(id);  
                setIsDeleting(false);
                sendMessage(
                    '✅ Delete successfull!',
                    'success'
                )
                setIsLoading(true);
                navigateTo('/history');

            } catch (error) {
                console.error(error);
                setIsDeleting(false);            
            }
        })

    }

    function nextPage(){
        if(quizes && fullLength > (page * 10) + quizes.length) setPage(prev => prev + 1)
    }
    function prevPage(){
        if(quizes && quizes.length > 0) setPage(prev => Math.max(prev - 1, 0))
    }



    return {
        isLoading,
        handleDelete,
        quizes,
        sortedBy,
        setSortedBy,
        setOrder,
        order,
        qTypes,
        handleQTypes,
        isDeleting,
        nextPage,
        prevPage,
        fullLength,
        page,
        handleDownload
    }
}

export default useQuizHistory