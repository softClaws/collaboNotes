import {Link, useNavigate, useLocation} from 'react-router-dom'
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons/faRightFromBracket'

import { useSendLogoutMutation } from '../features/auth/authApiSlice'

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = () => {
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const [sendLogout, {
        isLoading,
        isError,
        error
    }] = useSendLogoutMutation()


        
        if (isLoading) return <p>Logging out...</p>
        if(isError) return <p>Error: {error?.data.message}</p>
        
        
        const canShowLogout = [!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname) && !isLoading].every(Boolean) 


        const handleLogout = async () => {
            try {
                await sendLogout().unwrap();
                navigate('/')
            } catch (err) {
                console.error('Logout failed: ', err);
            }
        };

    let content =(
        <header className = "dash-header font-techMono font-light md:text-xl text-sm bg-orange-600">
            <div className="flex justify-between">
                <Link to ="/dash">
                <h1 className ="dashHeaderTitle">
                    Collabo Note

                </h1>
                </Link>
               {!canShowLogout? (
                <nav className = "dashHeaderNav">
                    <button className='border-0'
                    title='Logout'
                    onClick={handleLogout}>
                    {<FontAwesomeIcon icon={faRightFromBracket}/>}
                    </button>
                </nav> 
               ) : null
                }
            </div>

        </header>
    )
  return content
}

export default DashHeader