import { useGetUsersQuery } from "./UsersApiSlice"
import MemoizedUser from "./User";
import { PulseLoader } from "react-spinners";

const UserList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
   } = useGetUsersQuery("UserLists", {
    pollingInterval: 60000,
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
    const {ids} = users;
    const list = ids?.length? 
    ids.map(userId =>{
      return(
        
        <MemoizedUser key ={userId} userId ={userId}/>
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
      content =  <p className="flex justify-center items-center align-middle">{error?.data?.message}</p>
      console.log(error?.data?.message)
   }
  return (
    <>{content}</>
  )
}
export default UserList