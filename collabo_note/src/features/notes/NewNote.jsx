
import {NewNoteForm} from "./NewNoteForm"
import { useGetNotesQuery } from "./NoteApiSlice"
import { PulseLoader } from "react-spinners"

export const NewNote = () => {
  const {users} = useGetNotesQuery("notesList", ({
    selectFromResult: ({data})=>({
      users: data?.ids.map(id => data?.entities[id])
    })
  }))
 if(!users?.length) return <PulseLoader color ={"#000"}/>
  const content = <NewNoteForm users ={users}/>
  return content
}
