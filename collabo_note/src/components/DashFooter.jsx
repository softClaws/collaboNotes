
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faHouse} from "@fortAwesome/free-solid-svg-icons"
import {useNavigate, useLocation} from 'react-router-dom'

const DashFooter = () => {
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
    <footer className ="dashFooter flex p-2 justify-between bg-[#ffddb2] font-poppins">
      {goHomeButton}
      <p>Current User</p>
      <p>Status</p>
    </footer>
  )
  return content
}

export default DashFooter