import { NoteFormTemplate } from "./NoteFormTemplate"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./NoteApiSlice"
import { useSelector } from "react-redux"
const EditNoteForm = ({users, note}) => {
  const {id} = useParams()
  const navigate = useNavigate()
  // const noteSelected = useSelector(state => selectNoteById(state, id))

  const [title, setTitle] = useState(note.title)
  const [text, setText] = useState(note.text)
  const [user, setUser] = useState(note.user)
  const [completed, setCompleted] = useState(note.completed)
  const [updateNote,{
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdateNoteMutation()
  const [deleteNote,{
    isSuccess: delSuccess,
    isError: delIsError,
    error: delError
  }] = useDeleteNoteMutation()

  useEffect(()=>{
    if(isSuccess || delSuccess){
      setTitle('')
      setText('')
      setUser('')
      navigate('/dash/notes')
    }
  }, [isSuccess, delSuccess, navigate])

const onTitleChange = (e)=>setTitle(e.target.value)
const onTextChange = (e)=>setText(e.target.value)
const onUserChange = (e)=>setUser(e.target.value)
const onCompleteChange = ()=>setCompleted(prev => !prev)

const canSave=[user, title, text].every(Boolean) && !isLoading
const userList = users.map(user =>(
  <option value={user.id} key= {user.id}>{user.username}</option>
))
const onEditNote = async (e)=>{
  e.preventDefault()
  if(canSave){
    await updateNote({id: note.id,user,title,text, completed})
  }
}
const onDelNoteFunc = async ()=>{
  
    await deleteNote({id: note.id})

}

const onSaveNewNoteFunc =(e)=>{
  e.preventDefault()
  navigate("/dash/notes")
}
const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

  const attribute ={
    HeadingTitle: "Save",
    titleValue: title,
    onSaveNewNoteFunc, 
    onEditNote,
    onTitleChange,
    text,
    onTextChange,
    user,
    userList,
    canSave,
    onUserChange,
    onDelNoteFunc,
    complete: completed,
    onCompleteChange,
    buttonText: "Edit",
    delText: "Delete",
    created,
    updated
}
  return (
    <>
    <NoteFormTemplate attribute ={attribute}/>

    {(isError || delError)? <p>{error?.error || delIsError?.error}</p> : null}
    </>
  )
}

export default EditNoteForm