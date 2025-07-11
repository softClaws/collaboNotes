import { useEffect, useState } from "react"
import { useAddUserMutation } from "./UsersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faSave} from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"
import { UserForm } from "../auth/UserForm"

//REGEX constants
const USER_REGEX = /^[A-z]{3,20}$/ 
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

export const NewUserForm = () => {
    const [
        addNewUser,{
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddUserMutation(); //created by the userApiSlice
    const navigate = useNavigate()

    //input states
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [roles, setRoles] = useState(['Reader'])
    const [validUsername, setValidUsername] = useState(false)
    const [validPassword, setValidPassword] = useState(false)

    useEffect(()=>{
        setValidUsername(USER_REGEX.test(username))
    }, [username])
    useEffect(()=>{
        if(isSuccess){
            setUsername('')
            setPassword('')
            setRoles([])
            navigate('/dash/users')
        }
    }, [isSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onRolesChanged = e =>{
        const values = Array.from(
            e.target.selectedOptions,
            (option) =>option.value
        )
        setRoles(values)
    }
    const canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e)=>{
        e.preventDefault()
        if(canSave){
            await addNewUser({username, password, roles})
        }
    }

    const content =(
        <>
        <p>{error?.data.message}</p>
        <form onSubmit ={onCanSaveUserClicked}>
        <div>
            <h2>New User</h2>
            <div>
                <button title = "Save" disabled={!canSave}>
                    <FontAwesomeIcon icon ={faSave}/>
                </button>
            </div>
        </div>
        <label htmlFor="username"></label>
        </form>
        </>
    )

  return content
}
