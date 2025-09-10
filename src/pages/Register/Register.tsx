import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'; 
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import useSignup from './useSignup';
import { Link, Navigate } from 'react-router';
import Input from '../../ui/Input';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import Title from '../../ui/Title';

function Signup(){
    const {
        form,
        isValid,
        isMatching,
        isLoading, 
        handleNameChange,
        handleEmailChange, 
        handlePasswordChange, 
        handleConfirmPassChange, 
        handleSignup
    } = useSignup();
    
    const {user} = useContext(AuthContext);     
    console.log(user);
    if(user) return <Navigate to="/" /> 
  
  return (
    <div className="h-full flex flex-col justify-center">
        <Title title="Welcome To....!"/>
        <form className="flex flex-col items-center mx-auto">
            <div className='h-26 w-full grid grid-rows-[1fr_1fr]'>
                <Input id="register-name" label='Name' onChange={handleNameChange}/>
                {(!isValid.name) && <p className="text-red-500 text-sm">
                    Please enter your name.
                </p>}
            </div>
            <div className='h-26 w-full grid grid-rows-[1fr_1fr]'>
                <Input id="regiter-email" label='Email' onChange={handleEmailChange}/>
                {!isValid.email && <p className="text-red-500 text-sm">Please enter a valid email address.</p>}
            </div>
            <div className='h-26 w-full grid grid-rows-[1fr_1fr]'>
                <Input id="regiter-password" label='Password' type="password" onChange={handlePasswordChange}/>
                {!isValid.password && <p className="text-red-500 text-sm"> Password: 8+ characters, at least 1 letter.
                </p>}

            </div>
            <div className='h-26 w-full grid grid-rows-[1fr_1fr]'>
                <Input id="regiter-confirm-pass" label='Confirm Password' type="password" onChange={handleConfirmPassChange}/>
                {!isMatching && <p className="text-red-500 text-sm">Passwords do not match.</p>}
            </div>
            <button className={`bg-[#f24c7c] text-white p-1.5 rounded-md text-md cursor-pointer font-semibold ml-auto w-full my-12 ${!isValid.email || !isValid.password || !isMatching || Object.values(form).some(v => !v) ? 'opacity-50 cursor-not-allowed' : ''} ${isLoading && 'bg-blue-300'}`}  onClick={handleSignup}>
                    
                {isLoading ? <FontAwesomeIcon icon={faSpinner} className="animate-spin ml-2" /> : "Register"}
            </button>
            <div className="flex items-center gap-2">
                <Link to="/login" className="text-blue-500 hover:underline">Already have an account? Login</Link>
            </div>
        
        </form>
    </div>
  )
}

export default Signup;