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

function App() {

  return (
   <Routes>
    <Route path ="/" element ={<Layout/>}>
    <Route index element = {<Public/>} />
    <Route path = "login" element = {<Login/>} />


    <Route path = "dash" element ={<DashLayout/>}>
    <Route index element ={<Welcome/>}/>

    <Route path='notes'>

    <Route index element ={<NotesList/>}/>
    <Route path =':noteId' element ={<EditNote/>}/>

    </Route>
    <Route path='users'>

    <Route index element ={<UserList/>}/>
    <Route path =':userId' element ={<EditUser/>}/>

    </Route>

    </Route>  {/* End of dash route */}

    </Route>
   </Routes>
  )
}

export default App
