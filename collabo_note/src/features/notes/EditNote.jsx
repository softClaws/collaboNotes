import { useParams } from "react-router-dom"
import EditNoteForm from "./EditNoteForm"
import { PulseLoader } from "react-spinners"
import { useGetNotesQuery } from "./NoteApiSlice"
import { useGetUsersQuery } from "../users/UsersApiSlice"
import { useAuth } from "../../hooks/useAuth"

export const EditNote = () => {
  const {id} = useParams()
  const {username, isContributor, isCreator} = useAuth()
  const {note} = useGetNotesQuery("notesList", {
    selectFromResult: ({data}) =>({
      note: data?.entities[id]
    })
  })
  const {users} = useGetUsersQuery("notesList", ({
    selectFromResult: ({data})=>({
      users: data?.ids.map(id => data?.entities[id])
    })
  }))
  if(!note || !users?.length) return <PulseLoader color={"#ff6600"}/>
  
  if(!isCreator || !isContributor){
    if(note.username !== username){
      return <p className= "flex justify-between">No access</p>
    }
  }
    const content = <EditNoteForm users ={users} note = {note}/> 
  return content
}
