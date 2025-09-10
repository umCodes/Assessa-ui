import { useContext, useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { getUser, login } from '../../services/auth';
import { AuthContext } from '../../context/AuthContext';



const useLogin = () => {
    const navigateTo = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: ''
    });    
    const [isValid, setIsValid] = useState({
        email: true,
        password: true
    });
    const {setUser} = useContext(AuthContext)


    function handleEmailChange(e: ChangeEvent<HTMLInputElement>){ 
        setForm(prev => ({
                        ...prev,
                        email: e.target.value
                    }))
        if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value) || e.target.value === ''){
            setIsValid(prev => ({...prev, email: true}))
        }else setIsValid(prev => ({...prev, email: false}))

        
    }
    function handlePasswordChange(e: ChangeEvent<HTMLInputElement>){ 
        setForm(prev => ({
                        ...prev,
                        password: e.target.value
                    }))
        if(/^^(?=.*[A-Za-z]).{8,}$/.test(e.target.value) || e.target.value === ''){
            setIsValid(prev => ({...prev, password: true}))
        }else setIsValid(prev => ({...prev, password: false}))

    }

        
    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)){
            return;
        }
        if(!/^^(?=.*[A-Za-z]).{8,}$/.test(form.password)){
            return;
        }

        setIsLoading(true)
        try {
            const response = await login(form);
            console.log(response);
            setIsLoading(false)
            navigateTo('/');    
            const user = await getUser();
            setUser(user); 
            return;
        } catch (error) {
            console.error(error);
            setIsLoading(false);
            
        }

    }
    
  
    return {
        form,
        isValid,
        isLoading,
        handleEmailChange,
        handlePasswordChange,
        handleLogin,
    }
}

export default useLogin