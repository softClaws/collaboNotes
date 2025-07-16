
import { useUpdateUserMutation, useDeleteUserMutation } from "./UsersApiSlice"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faTrashCan} from "@fortawesome/free-solid-svg-icons/faTrashCan"
import {faSave} from "@fortawesome/free-solid-svg-icons/faSave"
import { ROLES } from "../../config/roles"
import { FormTemplate } from "../../config/FormTemplate"


//REGEX constants
const USER_REGEX  = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#_$%]{4,12}$/
const EditUserForm = ({user}) => {
  const [
    updateUser, {
      isLoading,
      isSuccess,
      isError,
      error
    }
  ] = useUpdateUserMutation()
  const [
    deleteUser, {
      isSuccess: isDelSuccess,
      isError: isDelError,
      error: delError
    }
  ] = useDeleteUserMutation()

  const navigate = useNavigate()
  
      //input states
      const [username, setUsername] = useState(user.username)
      const [password, setPassword] = useState('')
      const [roles, setRoles] = useState(user.roles)
      const [active, setActive] = useState(user.active)
      const [validUsername, setValidUsername] = useState(false)
      const [validPassword, setValidPassword] = useState(false)

      useEffect(()=>{
              setValidUsername(USER_REGEX.test(username))
          }, [username])
          useEffect(()=>{
              setValidPassword(PWD_REGEX.test(password))
          }, [password])

        useEffect(()=>{
          if(isSuccess || isDelSuccess){
            setUsername('')
            setPassword('')
            setRoles([])
            navigate("/dash/users")
          }
        }, [isSuccess, isDelSuccess, navigate])

        const onUsernameChanged = (e) => setUsername(e.target.value)
        const onPasswordChanged = (e) => setPassword(e.target.value)

        /**
         * 
         * @desc allows multiple options from within the select tag
         * returns an array of the selected options
         */
        const onRolesChanged = (e) =>{
          const values = Array.from( //create an array of values of selected options
            e.target.selectedOptions, 
            (options) => options.value
          )
          setRoles(values)
        }
        const onActiveChanged = ()=>setActive(prev => !prev)


        const onSaveForm = (e)=>{
          e.preventDefault()
          navigate('/dash/users')
        }
        const onSaveUserClicked = async () =>{
          if(password){
            await updateUser({id: user.id, username, password, roles, active})
          }
          else{
            await updateUser({id: user.id, username, roles, active})
          }
        }

        const onDeleteUserClicked = async ()=>{
          await deleteUser({id: user.id})
        }
        let canSave;
        if(password){
          canSave =[roles.length, validUsername, validPassword].every(Boolean) && !isLoading 
        }else{
          canSave =[roles.length, validUsername].every(Boolean) && !isLoading 
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
        const buttonProps =({icon, disable,title, clickAction})=>{
            return({icon, disable, title, clickAction})
        }
        // attribute formatted to be passed to child component(FormTemplate)
        const attribute ={
            pageTitleProps: "Edit User",
            onFormSubmit: onSaveForm,

            usernameProps: inputProps({textLabel:"Username", value: username, changeAction: onUsernameChanged}),

            activeProps: inputProps({textLabel:"Active", value: active,changeAction:onActiveChanged}),

            passwordProps: inputProps({textLabel:"Password", value: password,changeAction:onPasswordChanged}),

            rolesProps: rolesProps({textLabel:"Roles", value: roles,changeAction:onRolesChanged, options}),

            buttonIconProps:  buttonProps({icon: <FontAwesomeIcon icon ={faSave}/>, disable: !canSave, title: "Save", clickAction: onSaveUserClicked}),

            deleteButtonIconProps:  buttonProps({icon: <FontAwesomeIcon icon ={faTrashCan}/>, disable: !canSave, title: "Delete", clickAction: onDeleteUserClicked})
            
        }
      
    const content =(
      <>
      <div className="flex justify-center flex-col">
      
      <p>{(isError || isDelError)?error?.error : null}</p>
      <FormTemplate attribute= {attribute}/>
      </div>
  
      </>
  )
  return content
}

export default EditUserForm