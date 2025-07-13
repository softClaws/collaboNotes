import { useParams } from "react-router-dom"
import { selectUsersById } from "./UsersApiSlice"
import { useSelector } from "react-redux"
import EditUserForm from './EditUserForm'

export const EditUser = () => {
  const {id} = useParams()
  const user = useSelector(state => selectUsersById(state, id));

  const content = user ? <EditUserForm user={user}/> : <p>Loading ...</p>
  return content
}
