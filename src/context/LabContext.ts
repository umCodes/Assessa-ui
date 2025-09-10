import { createContext, type Dispatch, type SetStateAction } from "react";
import type { DifficultyLevels, QuestionTypes } from "../types/quiz";


type FileType =  "text" | "image"
export type QuizPrompt = {
    subject: string; 
    qTypes: QuestionTypes[];
    difficulty: DifficultyLevels; 
    number: number;
    file?: null | File;
    file_type?: FileType
}

const defaultState = {
    form: {
        subject: '',
        difficulty: 'regular' as DifficultyLevels,
        qTypes: ['MCQ'] as QuestionTypes[],
        number: 5,
        file: null,
        file_type: 'text' as FileType 
    },
    setForm: () => {},
    isLoading: false,
    setIsLoading: () => {},
}

export const LabContext = createContext<{
    form: QuizPrompt;
    setForm: Dispatch<SetStateAction<QuizPrompt>>,
    isLoading: boolean,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
}>(defaultState);