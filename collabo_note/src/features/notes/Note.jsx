import { selectNoteById } from "./NoteApiSlice"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons/faPenToSquare';

export const Note = ({noteId}) => {

    const note = useSelector(state =>selectNoteById(state,noteId))
    const navigate = useNavigate()
    const handleEdit =()=> navigate(`/dash/notes/${noteId}`)
    const createdAt = new Date(note.createdAt).toLocaleString('en-NG',{day: 'numeric', month: 'long', year: 'numeric'})
    const updatedAt = new Date(note.updatedAt).toLocaleString('en-NG',{day: 'numeric', month: 'long', year: 'numeric'})

    if(note){
            return <div className='flex 
            flex-col 
            gap-4 
            mt-2 
            space-x-2 
            font-playwright 
            bg-[#fffff7]
            p-2 
            
            shadow-[8px_8px_16px_#bebebe,_-8px_-8px_16px_#ffffff] 
            hover:scale-y-105 ease-in-out
            '>
                
                <div className="flex justify-between font-playwright text-sm">
                    
                    <p className =" border-l-amber-400 border-l-2 p-1">Created on: {createdAt}</p>

                    <p className=" border-l-amber-400 border-l-2 p-1"> Updated on: {createdAt}</p>
                </div>
                <div className="flex justify-between">
                    <p>Title</p>

                    <p>{note.title}</p>
                </div>

                <div className="flex justify-between">
                    <p>Completed</p>
                    <p className= {note.completed? 'text-green-400' : 'text-red-400'}>{note.completed.toString()}</p>
                </div>
                <p className="text-sm font-techMono">Owner: {note.username}</p>
                <button
                        className="text-amber-600"
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
