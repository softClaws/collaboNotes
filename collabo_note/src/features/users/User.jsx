
import { useSelector } from 'react-redux'
import { selectUsersById } from './UsersApiSlice'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';

export const User = ({userId}) => {
    // selecting user by Id
    const users = useSelector(state => selectUsersById(state, userId));

    const navigate = useNavigate()


    if(users){
    
    const handleEdit =()=> navigate(`/dash/users/${users.id}`)
    const userCred=(
    <div className='flex flex-col gap-4 mb-2 space-x-2 font-poppins bg-[#fffff1] p-2 shadow-xl'>
            <div className='flex justify-between'>
                <p> Username</p>
                <p>{users.username}</p>
            </div>
            <div className='flex justify-between'>
                <p> Role</p>
                <p>{(users.roles)? users.roles : "No Role"}</p>
            </div>
            <div className='flex justify-between'>
                <p> Active</p>
                <p>{users.active.toString()}</p>
            </div>
            <button
        onClick ={handleEdit}
        >
            <FontAwesomeIcon icon ={faPenToSquare}/>
        </button>
        </div>
    )

    
        // const userRolesString = user.roles.toString().replaceAll(',', ', ')
       
        return userCred;
          

    } else{
        return null
    }
}
