import { useGetUsersQuery } from "./UsersApiSlice"
import { User } from "./User";

const UserList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
   } = useGetUsersQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
   })

   let content;
   if(isLoading){
    content = <p> Loading...</p>
   } 
   if(isSuccess){
    const {ids} = users;
    const list = ids?.length? 
    ids.map(userId =>{
      return(
        
        <User key ={userId} userId ={userId}/>
      )}
    ): "No users Available"

    content = (
      <div className = "flex flex-wrap justify-between  ">
        {list}
        {/* {list} */}
      </div>
    )
    

   }
    if(isError){
      content =  <p className="flex justify-center items-center align-middle">{error?.error}</p>
      console.log(error?.error)
   }
  return (
    <>{content}</>
  )
}
export default UserList