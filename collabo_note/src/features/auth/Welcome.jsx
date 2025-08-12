import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faFile } from '@fortawesome/free-solid-svg-icons/faFile';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import { faBook } from '@fortawesome/free-solid-svg-icons/faBook';
import { useAuth } from '../../hooks/useAuth';

const Welcome = () => {
  const date = new Date()
  const today = new Intl.DateTimeFormat('en-NG', {dateStyle: 'full', timeStyle: 'long'}).format(date)
  const {username, isContributor, isCreator} = useAuth()

  const content =(
    <section className = "welcome flex justify-center items-center flex-col">
      <p>{today}</p>
      <h1>Welcome {username}!</h1>
      <div className='p-5 w-1/2 h-1/2'>

      <div className=' text-sm flex flex-wrap justify-center space-x-4  gap-2 font-poppins '>
      {(isContributor || isCreator) &&
      <p className='space-x-3'>
      <FontAwesomeIcon icon={faUser} className='text-amber-400'/>
         <Link to="/dash/users/new">Add New User </Link>
      
      </p>
        }
      {(isContributor || isCreator) &&
      <p className='space-x-3 '>
        <FontAwesomeIcon icon={faFile} className='text-amber-400'/>
         <Link to="/dash/notes/new" >Add new  Note</Link>
        </p>
        }
      <p className='space-x-3 '>
        <FontAwesomeIcon icon={faBook} className='text-amber-400'/>
      <Link to="/dash/notes" >View Notes</Link>
      </p>

      {(isContributor || isCreator) &&
      <p className='space-x-3 '>
      <FontAwesomeIcon icon={faUsers} className='text-amber-400'/>
        <Link to="/dash/users">View Users </Link>
      </p>
      }
      </div>
        
      </div>
    </section>
  )
  return content
}

export default Welcome