import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import CheckBox from "../../../ui/CheckBox"
import DropDown from "../../../ui/DropDown"
import Input from "../../../ui/Input"
import { faCoins, faExclamationCircle, faFilePdf, faMultiply, faSpinner, faUpload } from "@fortawesome/free-solid-svg-icons"
import useLabForm from "./useLabForm"
import { difficultyLevels, type DifficultyLevels } from "../../../types/quiz"
import RadioBtn from "../../../ui/RadioBtn"
import { creditsPerPage, creditsPerQuestion } from "../../../credits/credits"

const QuizForm = () => {
    const {form, fileInputRef, isLoading, handleFileType, handleFileRemoval, handleNumberChange, handleDifficultyChange, handleQTypesChange, handleFileUpload, handleFileUploadBtn, handleSubmit} = useLabForm();

  return (
    <div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="flex flex-col">
                <Input
                  className="hidden"
                  ref={fileInputRef}
                  label="File"
                  type="file"
                  accept='.pdf'
                  onChange={handleFileUpload} 
                  id="file-upload-input"
                //   max={10}
                  />
                {form.file ? <div className="flex items-center justify-between max-w-80 ">
                
                  <div className="w-fit max-w-[300px] py-2 px-4 flex gap-2">
                    <FontAwesomeIcon icon={faFilePdf} className="text-2xl text-zinc-600"/>
                    <p className="turnicate whitespace-nowrap">{form.file.name}</p>
                  </div>
                  <button onClick={handleFileRemoval} className="text-red-500">
                    <FontAwesomeIcon icon={faMultiply}/>
                  </button>
                </div> : 
                <div className="border border-dashed w-fit max-w-[300px] py-2 px-4 mx-auto">
                    <FontAwesomeIcon className="text-4xl m-2" icon={faUpload} />
                    <p>
                         <span className="max-sm:hidden">Drag and drop to</span> upload your PDF file from your device.
                        <br />
                        <span className="text-xs text-zinc-500">Note: The file should be less than 10MB.</span>
                    </p>
                    <button
                        type="button"
                        className="text-sm text-blue-500 hover:underline mt-2 cursor-pointer"
                        onClick={handleFileUploadBtn}
                    >   
                        <FontAwesomeIcon className="text-sm mr-1" icon={faFilePdf} />
                        Upload PDF
                    </button>
                </div>} 
            </div>


            <div className="flex items-baseline-last">
                <Input 
                    label="Number" 
                    type="number" 
                    name="questions-count" 
                    id="questions-count"
                    value={form.number}
                    onChange={handleNumberChange}
                    max={60}
                    min={5}
                />
                <span className="text-sm word-spacing text-zinc-500 flex items-center gap-1">
                    <FontAwesomeIcon className="text-amber-400" icon={faCoins}/> 
                    <p>
                        {(form.number * creditsPerQuestion).toFixed(2)}
                    </p>
                </span>

            </div>
            <div>
                <DropDown
                    setter={handleDifficultyChange}
                    value={form.difficulty}
                    options={difficultyLevels as DifficultyLevels[]}
                    label="Difficulty"
                />
            </div>
            <div className="mx-2 my-4">
                <div className="text-sm text-zinc-600 font-semibold">Question Types</div>
                 <CheckBox 
                    text="True/False (TF)"
                    name="qTypes"
                    id="T/F"
                    value={'TF'}
                    checked={form.qTypes.includes('TF')}
                    onChange={handleQTypesChange}
                />
                <CheckBox 
                    text="Multiple Choice Questions (MCQ)"
                    name="qTypes"
                    id="MCQ"
                    value={'MCQ'}
                    checked={form.qTypes.includes('MCQ')}
                    onChange={handleQTypesChange}
                />
                <CheckBox 
                    text="Fill in the Blank (FIB)"
                    name="qTypes"
                    id="FIB"
                    value={'FIB'}
                    checked={form.qTypes.includes('FIB')}
                    onChange={handleQTypesChange}
                />  
                <CheckBox 
                    text="Short Answer Questions (SAQ)"
                    name="qTypes"
                    id="SAQ"
                    value={'SAQ'}
                    checked={form.qTypes.includes('SAQ')}
                    onChange={handleQTypesChange}
                />    
            </div>



            <div className="my-3 mx-2">
                <h3 className="text-sm text-zinc-600 font-semibold">PDF Type: </h3>
                <div className="flex flex-col">
                    <div className="flex items-baseline-last">
                        <RadioBtn 
                            id={"text"} 
                            name="pdf-type"
                            text="Text"
                            value={String(form.file_type)}
                            onClick={handleFileType}        
                        />

                        <span className="text-sm word-spacing text-zinc-500 flex items-center gap-1">
                            <FontAwesomeIcon className="text-amber-400" icon={faCoins}/> 
                            <p>{creditsPerPage.textPDF.toFixed(2) }/page</p>
                        </span>
                    </div>
                    <div className="flex items-baseline-last">
                        <RadioBtn 
                            id={"image"} 
                            name="pdf-type"
                            text="Image"
                            value={String(form.file_type)}
                            onClick={handleFileType}        
                        />

                        <span className="text-sm word-spacing text-zinc-500 flex items-center gap-1">
                            <FontAwesomeIcon className="text-amber-400" icon={faCoins}/> 
                            <p>{creditsPerPage.imagePDF.toFixed(2)}/page</p>
                        </span>
                    </div>
            </div>
            </div>

            <p  className="text-sm text-zinc-600 max-w-sm m-4">
                <FontAwesomeIcon icon={faExclamationCircle}/> This service will generate a quiz based on the uploaded PDF file. 
                Ensure that the file is well-structured and contains clear text.
            </p>

            <button
                disabled={isLoading} 
                className={`bg-[#f24c7c] text-white p-1.5 rounded-md text-md font-semibold ml-auto ${isLoading && 'opacity-40'}`}>
                {isLoading ? <FontAwesomeIcon icon={faSpinner} spin/> : 'Generate test'}
            </button>
        
        </form>

        
        
    </div>
  )
}

export default QuizForm