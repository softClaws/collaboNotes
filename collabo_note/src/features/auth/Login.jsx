import { useRef, useState, useEffect } from "react"
import { useNavigate, } from "react-router-dom"

import { useDispatch } from "react-redux"
import { setCredentials } from "./authSlice"
import { useLoginMutation } from "./authApiSlice"

import { UserForm } from "./UserForm"

import { usePersist } from "../../hooks/persist"
const Login = () => {
  const userRef = useRef()
  const errRef = useRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [persist, setPersist] = usePersist()


  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login,{isLoading}] = useLoginMutation()

  
  useEffect(()=>{
    userRef.current.focus()
  }, [])
  useEffect(()=>{
    setErrMsg('')
  }, [username, password])
  if(isLoading) return <p>Loading...</p>
  const handleSubmit = async (e)=>{
    e.preventDefault()
    try{
      const {accessToken} = await login({username, password}).unwrap()
      dispatch(setCredentials({accessToken}))
      setUsername('')
      setPassword('')
      navigate('/dash')

    }catch(err){
      if(!err.status){
        setErrMsg('No Server Response')
      } else if(err.status == 400){
        setErrMsg('Missing Username or Password')
      } else if(err.status == 401){
        setErrMsg('Unauthorized')
      }else{
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  }
  
  const handleUserInput = (e)=>setUsername(e.target.value)
  const handleErrMsgInput = (e)=>setErrMsg(e.target.value)
  const handlePasswordInput = (e)=>setPassword(e.target.value)
  const handlePersist = ()=>setPersist(prev => !prev)

  const canLogin = [username, password].every(Boolean) && !isLoading
  const userErrRefs= {
    userRef,
    errRef
  }

  const inputData ={
    errMsg,
    username,
    password
  }

  const handlers ={
    handleSubmit,
    handleUserInput,
    handleErrMsgInput,
    handlePasswordInput,
    handlePersist
  }
  const attribute ={
    inputData,
    userErrRefs,
    handlers,
    canLogin,
    persist
  }

  if(isLoading) return <div className="flex justify-center items-center " >
      
      <PulseLoader color = {"#ff6600"}/>
      </div>
  const content = (
    <div className='flex items-center 
    justify-center  gap-4'>
      {/* <div className = "flex flex-col "> */}

        <UserForm attribute = {attribute}/>
{/* 
        <Link to='/'> <FontAwesomeIcon icon ={faHome}/></Link>
      </div> */}



      <div className=' bg-[url("/src/assets/login.jpg")]
      bg-cover
      bg-center
      h-screen
      w-1/2
      hidden md:block
      
      '></div>

    </div>
  )
  return content
    
  
}

export default Login