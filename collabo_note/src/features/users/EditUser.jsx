import { useParams } from "react-router-dom"
import EditUserForm from './EditUserForm'
import { useGetUsersQuery } from "./UsersApiSlice"
import { PulseLoader } from "react-spinners/PulseLoader"

export  const EditUser = () => {
  const {id} = useParams()
  const {user} = useGetUsersQuery("usersList", {
    selectFromResult:({data})=>({
      user: data?.entities[id]
    })
  })
  // console.log(user)
  if(!user) return  <PulseLoader color={"#ff6600"}/>

  const content =  <EditUserForm user={user}/> 
  return content
}
