
import { memo } from 'react';
import { useGetUsersQuery } from './UsersApiSlice';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons/faPenToSquare';

export const User = ({userId}) => {
    const navigate = useNavigate()
    // selecting user by Id
    const {users} = useGetUsersQuery("usersList",({
        selectFromResult: ({data})=>({
                
            users : data?.entities[userId]
    })
    }))


    if(users){
    
    const handleEdit =()=> navigate(`/dash/users/${userId}`)
    const userCred=(
        <div className='flex flex-col gap-4 mt-2 
        lg:w-xl 
        font-poppins
        bg-[#fffff7] 
            p-2 
            shadow-[8px_8px_16px_#bebebe,_-8px_-8px_16px_#ffffff] 
            hover:scale-y-105 ease-in-out justify-between md:justify-center md:w-screen w-xl'>
            <div className='flex justify-between '>
                <p> Username</p>
                <p>{users.username}</p>
            </div>
            <div className='flex justify-between'>
                <p> Roles</p>
                <p>{(users.roles)? users.roles.join(", ") : "No Role"}</p>
            </div>
            <div className='flex justify-between'>
                <p> Active</p>
                <p className= {users.active? 'text-green-400' : 'text-red-400'}>{users.active.toString()}</p>
            </div>
            <button
        onClick ={handleEdit}
        className ="hover:cursor-pointer "
        >
            <FontAwesomeIcon className= "text-amber-600  hover:translate-y-1.5" icon ={faPenToSquare}/>
        </button>
        </div>
    )

    
        // const userRolesString = user.roles.toString().replaceAll(',', ', ')
       
        return userCred;
          

    } else{
        return null
    }
}
const MemoizedUser = memo(User)
export default MemoizedUser
