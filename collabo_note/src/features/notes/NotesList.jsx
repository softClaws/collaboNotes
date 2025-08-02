import { Note } from "./Note";
import { useGetNotesQuery } from "./NoteApiSlice"
const NotesList = () => {

  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error

  } = useGetNotesQuery(undefined, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
   })

  let content;

  if(isLoading){
    content = <p>Loading ...</p>
  }
  if(isSuccess){
    const {ids} = notes;
    content = ids?.length? ids.map (noteId =>{
      return(
        <Note key ={noteId} noteId = {noteId} />
      )
    }
    ): "No Note Available"
  }
  if(isError){
    content =  <p className="flex justify-center items-center align-middle">{error?.data.message}</p>
    console.log(error?.data.message)
  }
  return (
    <h1>{content}</h1>
  )
}

export default NotesList