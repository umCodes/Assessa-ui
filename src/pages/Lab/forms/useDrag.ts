import { useState } from "react";
import useLabForm from "./useLabForm";


const useDrag = () => {
const [isDragging, setIsDragging] = useState(false);
  const {setForm} = useLabForm()
    const handleDragEnter = (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragging(true);
        };

        const handleDragLeave = (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragging(false);
        };

        const handleDragOver = (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragging(true);

        };

        const handleDrop = (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragging(false);
            const files = e.dataTransfer.files;
            const fileInput = document.getElementById('file-upload-input') as HTMLInputElement;

            
            if(files[0].type !== 'application/pdf') return //handle error
            else if(fileInput){      
                fileInput.files = files;
                setForm(prev => ({...prev, file: files[0], file_type: 'text'}))
            }


        };


    return {
        isDragging,
        handleDrop,
        handleDragEnter,
        handleDragOver,
        handleDragLeave
    }
}

export default useDrag