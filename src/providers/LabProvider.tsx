import { useState, type ReactNode } from "react"
import { LabContext, type QuizPrompt} from "../context/LabContext"

const LabProvider = ({children}: {children: ReactNode}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState<QuizPrompt>({
        subject: '',
        difficulty: 'regular',
        qTypes: ['MCQ'],
        number: 5,
        file: null,
        file_type: 'text'
    })

    return (
    <LabContext.Provider value={{form, setForm, setIsLoading, isLoading}}>
        {children}
    </LabContext.Provider>
  )
}

export default LabProvider