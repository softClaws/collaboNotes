import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import './index.css'
import Public from './components/Public'
import Login from './features/auth/Login'
import { DashLayout } from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import NotesList from './features/notes/NotesList'
import UserList  from './features/users/UserList'
import {EditUser} from './features/users/EditUser'
import {EditNote} from './features/notes/EditNote'
import { NewNote } from './features/notes/NewNote'
import { NewUserForm } from './features/users/NewUserForm'
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin'
import { RequiredAuth } from './features/auth/RequiredAuth'
import { ROLES } from './config/roles'
import { useTitle } from './hooks/useTitle'

function App() {
  useTitle("Collabo Note")

  return (
   <Routes>
    <Route path ="/" element ={<Layout/>}>
    {/* Public routes */}
    <Route index element = {<Public/>} />
    <Route path = "login" element = {<Login/>} />

    {/* Protected routes */}
<Route element={<PersistLogin/>}>
      <Route element={<RequiredAuth allowedRoles={[...Object.values(ROLES)]}/>}>
      <Route element ={<Prefetch/>}>
    
      <Route path = "dash" element ={<DashLayout/>}>
      <Route index element ={<Welcome/>}/>
      <Route element={<RequiredAuth allowedRoles={[ROLES.Contributor, ROLES.Creator]}/>}>
      <Route path='users'>

      <Route index element ={<UserList/>}/>
      <Route path =':id' element ={<EditUser/>}/>
      <Route path ='new' element ={<NewUserForm/>}/>

      </Route>
      </Route>
      
      <Route path='notes'>

      <Route index element ={<NotesList/>}/>
      <Route path =':id' element ={<EditNote/>}/>
      <Route path ='new' element ={<NewNote/>}/>

      </Route>

      </Route>  {/* End of dash route */}
    </Route>
    </Route>
    </Route>

    </Route>
   </Routes>
  )
}

export default App
