import { useContext, useState, type FormEvent } from "react"
import axios from "axios";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";



const useFeedback = () => {
    const navigateTo = useNavigate();
    const {user} = useContext(AuthContext);
    const [form, setForm] = useState({
        subject: '',
        message: ''
    })

    function handleSubmit(e: FormEvent){
        e.preventDefault();
        if(!user){
            navigateTo('/signup');
            return;
        }

        axios.post(String(import.meta.env.VITE_BASE_PATH) + '/api/feedback', {
        ...form, email: user.email    
        }, { withCredentials: true})
        .then(req => console.log(req))
        .catch(err => console.log(err))
    }


    return {
        handleSubmit,
        setForm,
        form
  }
}

export default useFeedback