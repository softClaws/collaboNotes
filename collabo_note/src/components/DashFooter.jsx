
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faHouse} from "@fortAwesome/free-solid-svg-icons/faHouse"
import {useNavigate, useLocation} from 'react-router-dom'
import { useAuth } from "../hooks/useAuth"

const DashFooter = () => {
  const {username, status} = useAuth()
  const navigate = useNavigate()
  const {pathname} = useLocation()

  const onGoHomeClicked = ()=> navigate('/dash')
  let goHomeButton = null

  if(pathname != '/dash'){
    goHomeButton = (
      <button 
        className="dashFooterButton iconButton"
        title ="Home"
        onClick={onGoHomeClicked}
        >
        < FontAwesomeIcon icon = {faHouse}/>
      </button>
    )
  }
  const content = (
    <footer className ="dashFooter flex p-2 justify-between bg-orange-600 font-poppins">
      {goHomeButton}
      <p>Current User: {username}</p>
      <p>Status: {status}</p>
    </footer>
  )
  return content
}

export default DashFooter