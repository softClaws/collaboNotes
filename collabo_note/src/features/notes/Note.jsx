import { selectNoteById } from "./NoteApiSlice"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';

export const Note = ({noteId}) => {

    const note = useSelector(state =>selectNoteById(state,noteId))
    const navigate = useNavigate()
    const handleEdit =()=> navigate(`/dash/notes/${note.id}`)
    const createdAt = new Date(note.createdAt).toLocaleString('en-NG',{day: 'numeric', month: 'long', year: 'numeric'})
    const updatedAt = new Date(note.updatedAt).toLocaleString('en-NG',{day: 'numeric', month: 'long', year: 'numeric'})

    if(note){
            return <div className='flex 
            flex-col 
            gap-4 
            mb-2 
            space-x-2 
            font-playwright 
            bg-[#ffffe1] 
            
             
            p-2 
            shadow-xl
            '>
                
                <div className="flex justify-between font-roboto text-sm">
                    <p>Owner: {note.user}</p>
                    <p className =" border-b-amber-400 border-b-2">Created on: {createdAt}</p>

                    <p className=" border-b-amber-400 border-b-2"> Updated on: {createdAt}</p>
                </div>
                <div className="flex justify-between">
                    <p>Title</p>

                    <p>{note.title}</p>
                </div>

                <div className="flex justify-between">
                    <p>Completed</p>
                    <p>{note.completed.toString()}</p>
                </div>
                
                <button
                        onClick ={handleEdit}
                        >
                            <FontAwesomeIcon icon ={faPenToSquare}/>
                        </button>

            </div>
            
    }
    else
  return (
    <p>No Note</p>
  )
}
