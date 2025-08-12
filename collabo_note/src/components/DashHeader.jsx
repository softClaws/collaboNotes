import {Link, useNavigate, useLocation} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons/faRightFromBracket'
import { faFilePen} from '@fortawesome/free-solid-svg-icons/faFilePen'
import { faUserGear } from '@fortawesome/free-solid-svg-icons/faUserGear'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons/faUserPlus'
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons/faFileCirclePlus'

import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import { useAuth } from '../hooks/useAuth'

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = () => {
    const {isContributor, isCreator} = useAuth()
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const [sendLogout, {
        isLoading,
        isError,
        error
    }] = useSendLogoutMutation()


        
        if (isLoading) return <p>Logging out...</p>
        if(isError) return <p>Error: {error?.data.message}</p>
        
        
        const canShowLogout = [!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname) && pathname != '/dash/notes/new' && pathname != '/dash/users/new' && !isLoading].every(Boolean) 


        const handleLogout = async () => {
            try {
                await sendLogout().unwrap();
                navigate('/')
            } catch (err) {
                console.error('Logout failed: ', err);
            }
        };

        const onNewNoteClicked = ()=> navigate('/dash/notes/new')
        const onNewUserClicked = ()=> navigate('/dash/users/new')
        const onNoteClicked = ()=> navigate('/dash/notes')
        const onUserClicked = ()=> navigate('/dash/users')
        let newUserButton = null
        let newNoteButton = null
        let noteButton = null
        let userButton = null
        if(USERS_REGEX.test(pathname) && (isContributor || isCreator)){
            newUserButton =(
                <button
                className = "border-0"
                onClick={onNewUserClicked}
                
                ><FontAwesomeIcon icon={faUserPlus}/></button>
            )
        }
        if(NOTES_REGEX.test(pathname) ){
            newNoteButton =(
                <button
                className = "border-0"
                onClick={onNewNoteClicked}
                
                ><FontAwesomeIcon icon={faFileCirclePlus}/></button>
            )
        }
        if(DASH_REGEX.test(pathname)){
            
            userButton =(
                (isContributor || isCreator) && <button
                className = "border-0"
                onClick={onUserClicked}
                
                ><FontAwesomeIcon icon={faUserGear}/></button>
            )
            noteButton =(
                <button
                className='border-0'
                onClick={onNoteClicked}
                
                ><FontAwesomeIcon icon={faFilePen}/></button>
            )
        }
    let content =(
        <header className = "dash-header font-techMono font-light md:text-xl text-sm bg-orange-600">
            <div className="flex justify-between">
                <Link to ="/dash">
                <h1 className ="dashHeaderTitle">
                    Collabo Note

                </h1>
                </Link>
                <nav className = "flex justify-between space-x-6 mr-2">
                    {userButton}
                    {newUserButton}
                    {noteButton}
                    {newNoteButton}
               {!canShowLogout? (
                        <button className='border-0'
                        title='Logout'
                        onClick={handleLogout}>
                        {<FontAwesomeIcon icon={faRightFromBracket}/>}
                        </button>
                        
                ) : null
                }
                </nav> 
            </div>

        </header>
    )
  return content
}

export default DashHeader