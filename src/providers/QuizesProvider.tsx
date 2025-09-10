import { useContext, useEffect, useState, type ReactNode } from "react"
import { QuizesContext } from "../context/QuizesContext"
import type { Quiz } from "../types/quiz"
import { getQuizes } from "../services/quiz";
import { AuthContext } from "../context/AuthContext";

const QuizesProvider = ({children}: {children: ReactNode}) => {
    const [quizes, setQuizes] = useState<Quiz[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [quizesLength, setQuizesLength] = useState(0);
    const {user} = useContext(AuthContext)
    


    useEffect(() => {
        
        if(!user) return;   
        if(quizesLength && quizesLength - (page * 10) <= 0) return;
        setIsLoading(true)
        async function fetchQuizes(){
            try {
                const response = await getQuizes(page)
                setQuizes(response.quizes)
                setQuizesLength(response.length)
                setIsLoading(false)
            } 
            catch (error) {
            setIsLoading(false)
            console.log(error);                
            }
        }

        fetchQuizes()

    }, [page, isLoading, quizesLength, user])
  return (
    <QuizesContext.Provider value={{
        quizes,
        setQuizes,
        isLoading,
        setIsLoading,
        page,
        setPage,
        quizesLength
    }}>
        {children}
    </QuizesContext.Provider>
  )
}

export default QuizesProvider