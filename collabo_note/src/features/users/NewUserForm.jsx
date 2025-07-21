import { useEffect, useState } from "react"
import { useAddUserMutation } from "./UsersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faSave} from "@fortawesome/free-solid-svg-icons/faSave"
import { ROLES } from "../../config/roles"
import { FormTemplate } from "../../config/FormTemplate"

//REGEX constants
const USER_REGEX = /^[A-z]{3,20}$/ 
const PWD_REGEX = /^[A-z0-9!@#_$%]{4,12}$/

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
        setValidPassword(PWD_REGEX.test(password))
    }, [password])
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
    
    const options = Object.values(ROLES).map(role =>{
        return (
            <option key ={role} value={role}> {role}</option>
        )
    })
    /**
     * 
     * @desc function properties
     * @returns properties object 
     */
    const inputProps =({textLabel, value,changeAction})=>{
        return({textLabel, value, changeAction})
    }
    const rolesProps =({textLabel, value,changeAction, options})=>{
        return({textLabel, value, changeAction, options})
    }
    const buttonProps =({icon, disable,title})=>{
        return({icon, disable, title})
    }
    // attribute formatted to be passed to child component(FormTemplate)
    const attribute ={
        pageTitleProps: "New User",
        onFormSubmit: onSaveUserClicked,
        usernameProps: inputProps({textLabel:"Username", value: username, changeAction: onUsernameChanged}),
        passwordProps: inputProps({textLabel:"Password", value: password,changeAction:onPasswordChanged}),
        rolesProps: rolesProps({textLabel:"Roles", value: roles,changeAction:onRolesChanged, options}),
        buttonIconProps:  buttonProps({icon: <FontAwesomeIcon icon ={faSave}/>, disable: !canSave, title: "Save"})
        
    }

    const content =(
        <>
        <div className="flex justify-center align-middle flex-col">
        
        <p className= "flex justify-center items-center">{(isError)?error?.error : null}</p>
        <FormTemplate attribute= {attribute}/>
        </div>
        
        </>
    )

  return content
}
