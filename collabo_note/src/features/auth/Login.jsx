import { useRef, useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"

import { useDispatch } from "react-redux"
import { setCredential } from "./authSlice"
import { useLoginMutation } from "./authApiSlice"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome"

import { UserForm } from "./UserForm"
const Login = () => {
  const userRef = useRef()
  const errRef = useRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login,{isLoading}] = useLoginMutation()

  if(isLoading) return <p>Loading ...</p>
  const content = (
    <div className='flex items-center 
    justify-center  gap-4'>
      {/* <div className = "flex flex-col "> */}

        <UserForm/>
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