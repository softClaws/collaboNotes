import { useGetUsersQuery } from "./UsersApiSlice"
import { User } from "./User";

const UserList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
   } = useGetUsersQuery()

   let content;
   if(isLoading){
    content = <p> Loading...</p>
   } 
   if(isSuccess){
    const {ids} = users;
    content = ids?.length? 
    ids.map(userId =>{
      return(
        
        <User key ={userId} userId ={userId}/>
      )}
    ): "No users Available"

    
    

   }
    if(isError){
    <p>{error?.error}</p>
    console.log(error?.error)
   }
  return (
    <>{content}</>
  )
}
export default UserList