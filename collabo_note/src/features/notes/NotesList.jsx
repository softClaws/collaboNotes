import MemoizedNote from "./Note";
import { useGetNotesQuery } from "./NoteApiSlice"
import { useAuth } from "../../hooks/useAuth";
import { PulseLoader } from "react-spinners";
const NotesList = () => {
  const {isContributor, isCreator, username} = useAuth()

  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error

  } = useGetNotesQuery("NotesList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
   })

  let content;

  if(isLoading){
    content = (
      <div className="flex justify-center items-center " >
      
      <PulseLoader color = {"#ff6600"}/>
      </div>
    
  )
  }
  if(isSuccess){
    const {ids, entities} = notes;
    let filteredIds;
    if(isContributor || isCreator){
      filteredIds =[...ids]
    }else{
      filteredIds = ids.filter(noteId => entities[noteId].username === username)
    }
    content = ids?.length && filteredIds.map (noteId =>{
      return(
        <MemoizedNote key ={noteId} noteId = {noteId} />
      )
    })
  }
  if(isError){
    content =  <p className="flex justify-center items-center align-middle">{error?.data?.message}</p>
    console.log(error?.data?.message)
  }
  return (
    <h1>{content}</h1>
  )
}

export default NotesList