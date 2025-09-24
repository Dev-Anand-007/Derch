import React, { useEffect, useState } from 'react';
import { themes } from '../../../constants/colors'
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from "react-redux";
// import { register as registerThunk } from "../AuthSlice"; // adjust path
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import FormInput from './FormInput'
import SubmitButton from './SubmitButton';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { clearRegisterError, registerAsync, resetRegisterStatus, selectRegisterError, selectRegisterStatus } from '../AuthSlice';

const RegisterForm = () => {
  const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const mode = themes.lightMode;

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const status=useSelector(selectRegisterStatus);
    const error=useSelector(selectRegisterError);
    useEffect(()=>{
      if(error){
        toast.error(error.message)
        
      }

    },[error])

    useEffect(()=>{if(status==='fulfilled' ){
          toast.success(`Registered successful`);
          navigate('/')
          reset()
        }
        return ()=>{
          dispatch(clearRegisterError())
          dispatch(resetRegisterStatus())
        }
      },[status])

    const handleRegister=(e)=>{

      e.preventDefault();
      if(confirmPassword==password){

        dispatch(registerAsync({fullname:fullname,email:email,password:password,confirmPassword:confirmPassword}))
      }
      else{
        toast.error("Please enter same password.")
      }
      
    }



  return (
    <motion.form onSubmit={handleRegister}
      className='space-y-4 sm:space-y-6 w-full'
    >
      <FormInput
        icon={User}
        type="text"
        placeholder="Full name"
        value={fullname}
        onChange={(e) => setFullName(e.target.value)}
        required
        
      />
      <FormInput
        icon={Mail}
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="new Name"
      />
      <FormInput
        icon={Lock}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="new Name"
      />
      <FormInput
        icon={Lock}
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

      <SubmitButton isLoading={isLoading} >
        Create Account
      </SubmitButton>

    </motion.form>

  )
}

export default RegisterForm