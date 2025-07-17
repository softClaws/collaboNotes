import { useState, useEffect } from "react"
import { useAddNoteMutation } from "./NoteApiSlice"
import { useNavigate } from "react-router-dom"

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
        <option value={user.id} key ={user.id}>{user.username}</option>
        
    ))
   const  onUserChange = (e) => setUser(e.target.value);
   const  onTitleChange = (e) => setTitle(e.target.value);
    const onTextChange = (e) => setText(e.target.value);


const canSave = [user, title, text].every(Boolean) && !isLoading

const onSaveNewNoteFunc = async (e)=>{
    e.preventDefault();
    console.log(title, user, text)

    if(canSave){
        await addNote({user, title, text})
    }
}

  return (
    <>
        <form action="" className="flex flex-col gap-2 justify-center items-center mt-2" onSubmit ={onSaveNewNoteFunc}>
            <h1 className="font-poppins text-md">New Note</h1>
            <label htmlFor="title" className="flex flex-col justify-center items-center gap-2 font-poppins"> Title
            <input type="text" name="title" 
            className="shadow-[8px_8px_16px_#bebebe,_-8px_-8px_16px_#ffffff] 
            focus:outline-amber-400 
            border-amber-300 
            border-1 p-2 h-10 
            rounded-md font-techMono"
            value={title}
            onChange={onTitleChange}
            />
            </label>
            <label htmlFor="content" className="m-8 flex flex-col justify-center items-center gap-2 font-poppins">Content
                <textarea name="content" 
                className="border-amber-400 focus:outline-amber-400 border-1 
                rounded-xl w-screen lg:w-md 
                md:w-sm 
                shadow-[8px_8px_16px_#bebebe,_-8px_-8px_16px_#ffffff] 
                p-2 
                text-sm 
                lg:h-52 
                md:h-44 h-52 
                font-techMono" value={text} onChange={onTextChange}></textarea>
            </label>
            <label htmlFor="users" className="flex flex-col justify-center items-center gap-2 font-poppins" > Assign User
            <select name="users" value={user} className="text-xs"size={2} onChange={onUserChange}>
                {userList}
            </select>
            </label>
            <button type="submit" name ="Add" className="border-amber-300 border-1 hover:border-amber-400 rounded-2xl hover:border-2 px-4 cursor-pointer" disabled ={!canSave}>Add</button>
        </form>
        {isError? <p>{error.error}</p> : null}
    </>
  )
}
