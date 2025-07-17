import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectNoteById } from "./NoteApiSlice"
import { selectAllUsers } from "../users/UsersApiSlice"
import EditNoteForm from "./EditNoteForm"

export const EditNote = () => {
  const {id} = useParams()
  const note = useSelector(state => selectNoteById(state, id))
  const users = useSelector(selectAllUsers)
  const content = users ? <EditNoteForm users ={users} note = {note}/> : <p>Loading ...</p>
  return content
}
