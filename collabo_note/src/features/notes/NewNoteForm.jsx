import { useState, useEffect } from "react"
import { useAddNoteMutation } from "./NoteApiSlice"
import { useNavigate } from "react-router-dom"
import { NoteFormTemplate } from "./NoteFormTemplate"

export const NewNoteForm = ({users}) => {
    const navigate = useNavigate()

    const [user, setUser] = useState('')
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    const [addNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNoteMutation()

    
        useEffect(()=>{
            if(isSuccess){
                setTitle('')
                setUser('')
                setText('')
                navigate('/dash/notes')
            }
        }, [isSuccess, navigate])

    const userList = users?.map(user=>(
        <option value={user.id} key ={user.id}>{user?.username}</option>
        
    ))
   const  onUserChange = (e) => setUser(e.target.value);
   const  onTitleChange = (e) => setTitle(e.target.value);
    const onTextChange = (e) => setText(e.target.value);


const canSave = [user, title, text].every(Boolean) && !isLoading

const onSaveNewNoteFunc = async (e)=>{
    e.preventDefault();

    if(canSave){
        await addNote({user, title, text})
    }
}
const attribute ={
    HeadingTitle: "New Note",
    titleValue: title,
    onSaveNewNoteFunc,
    onTitleChange,
    text,
    onTextChange,
    user,
    userList,
    canSave,
    onUserChange,
    buttonText: "Add"
}

  return (
    <>
        <NoteFormTemplate attribute ={attribute}/>
        {isError? <p>{error.error}</p> : null}
    </>
  )
}
