import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'; 
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import useLogin from './useLogin';
import { Link, Navigate } from 'react-router';
import Input from '../../ui/Input';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import Title from '../../ui/Title';

function Login(){
    const {
        form,
        isValid,
        isLoading, 
        handleEmailChange, 
        handlePasswordChange, 
        handleLogin
    } = useLogin();
    
    const {user} = useContext(AuthContext);     
    console.log(user);
    if(user) return <Navigate to="/" /> 
  
  return (
    <div className="h-full flex flex-col justify-center">
        <Title title="Welcome Back!"/>
        <form className="flex flex-col items-center mx-auto">
            <div className='h-26 w-full grid grid-rows-[1fr_1fr]'>
                <Input id="regiter-email" label='Email' onChange={handleEmailChange}/>
                {!isValid.email && <p className="text-red-500 text-sm">Please enter a valid email address.</p>}
            </div>
            <div className='h-26 w-full grid grid-rows-[1fr_1fr]'>
                <Input id="regiter-password" label='Password' type="password" onChange={handlePasswordChange}/>
                {!isValid.password && <p className="text-red-500 text-sm"> Password: 8+ characters, at least 1 letter.
                </p>}

            </div>
            <button className={`bg-[#f24c7c] text-white p-1.5 rounded-md text-md cursor-pointer font-semibold ml-auto w-full my-12 ${!isValid.email || !isValid.password || Object.values(form).some(v => !v) ? 'opacity-50 cursor-not-allowed' : ''} ${isLoading && 'bg-blue-300'}`}  onClick={handleLogin}>
                    
                {isLoading ? <FontAwesomeIcon icon={faSpinner} className="animate-spin ml-2" /> : "Login"}
            </button>
            <div className="flex items-center gap-2">
                <Link to="/login" className="text-blue-500 hover:underline">
                    Don't have an account? Register
                </Link>
            </div>
        
        </form>
    </div>
  )
}

export default Login;