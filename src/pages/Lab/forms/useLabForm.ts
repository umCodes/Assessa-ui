import { useContext, useRef, useState, type ChangeEvent, type FormEvent, type MouseEvent } from "react"
import { difficultyLevels, questionTypes, type DifficultyLevels, type QuestionTypes } from '../../../types/quiz.ts';
import { LabContext } from "../../../context/LabContext.ts";
import { useNavigate } from "react-router";
import { clearUp, createQuiz } from "../../../services/quiz.ts";
import { AuthContext } from "../../../context/AuthContext.ts";
import { MessageContext } from "../../../context/MessageContext.ts";
import axios from "axios";

const useLabForm = () => {
    const {form, setForm, isLoading, setIsLoading} = useContext(LabContext);
    const {sendMessage} = useContext(MessageContext);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const {user, logUser} = useContext(AuthContext); //Change later
    const navigateTo = useNavigate();    
    const [totalCredits, setTotalCredits] = useState(0);


    function handleSubjectChange(e: ChangeEvent<HTMLInputElement>){
      setForm({...form, subject: e.target.value})
    }

    function handleNumberChange(e: ChangeEvent<HTMLInputElement>){

      setForm({...form, number: Math.round(Number(e.target.value))})
    }

    function handleDifficultyChange(difficulty: DifficultyLevels){

      if(difficultyLevels.includes(difficulty))
        setForm({...form, difficulty
          })
    }

    function handleQTypesChange(e: ChangeEvent<HTMLInputElement>){

      const type = e.target.value as QuestionTypes;
      
      if(!form.qTypes.includes(type) && questionTypes.includes(type))
        setForm({...form, qTypes: [...form.qTypes, type]
          })
      else if(form.qTypes.length > 1) setForm({...form, qTypes: [...form.qTypes.filter(t => t !== type)]
        })
    }

        
    async function handleFileUpload(e: ChangeEvent<HTMLInputElement>){

        const selectedFile = e.target.files?.[0] ?? null;
            setForm({
              ...form, file: selectedFile,
              file_type: 'text'
            })

          console.log(selectedFile);
        const fd = new FormData();
        
        if (selectedFile) fd.append("pdf", selectedFile)
        fd.append("difficulty", "expert")
        fd.append("qTypes", "MCQ")
        fd.append("qTypes", "TF")
        fd.append("number", "55")
        fd.append("file_type", "text")

        const data = async () => {
            await axios.post("http://localhost:5000/api/quiz", fd, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            })  
        }

        data()
          
      }

      
      const handleFileType = (e: ChangeEvent<HTMLInputElement>) => {
             setForm({
              ...form,
              file_type: (e.target as HTMLElement).id as "text" |"image"
             })
        }


      
    function handleFileUploadBtn(e: MouseEvent<HTMLButtonElement>){
        e.preventDefault()
        fileInputRef.current?.click()
    }


    
    function handleFileRemoval(e: MouseEvent<HTMLButtonElement>){
        e.preventDefault();
        setForm({
              ...form, 
              file: null, 
              file_type: 'text'
            })
        if(fileInputRef.current)
            fileInputRef.current.value = "";
    }


    async function handleSubmit(e: FormEvent, service?: string){
        e.preventDefault();
        if(!user){
          navigateTo('/register')
          return;
        }

        if(!form.subject && !form.file){
           return sendMessage('please provide a file or a prompt.', 'failure')
        }

        if(user.credits <  totalCredits){
           return sendMessage('Insufficient Credits.', 'failure')
          
        }
        
        setIsLoading(true);
        

        //if user not logged in reroute to signup page         
        const {file, ...data} = form; 
        const content = new FormData();
        
        const clearUpBody = {
          fileType: data.file_type,
          service 
        }
        content.append('data', JSON.stringify(service ? clearUpBody : data))
        content.append('file', file ?? '')
        console.log({...content});
        
        try {
            const quiz = service ? await clearUp(content) : await createQuiz(content);
            setIsLoading(false)
            sendMessage('Quiz Generated!', 'success')
            navigateTo(`/quiz/${quiz._id}`)
            logUser();
            // console.log(quiz);
        } catch (error) {
            sendMessage('A problem occured generating your quiz, please try again', 'failure')
            setIsLoading(false)
            console.error(error)
        }          
    }
               

  return {
    isLoading, 
    setIsLoading,
    fileInputRef,
    form,
    setForm,
    totalCredits,
    setTotalCredits,
    handleDifficultyChange,
    handleSubjectChange,
    handleNumberChange,
    handleQTypesChange,
    handleFileUpload,
    handleFileType,
    handleFileUploadBtn,
    handleFileRemoval,
    handleSubmit
  }
}

export default useLabForm