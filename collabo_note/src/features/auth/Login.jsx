import { UserForm } from "./UserForm"
const Login = () => {
  return (
    <div className='flex items-center 
    justify-center  gap-4'>

      <div className='flex justify-center flex-col items-center md:w-1/2 w-screen gap-2 '>

      
        <UserForm/>
      </div>


      <div className=' bg-[url("/src/assets/login.jpg")]
      bg-cover
      bg-center
      h-screen
      w-1/2
      hidden md:block
      
      '></div>

    </div>
  )
}

export default Login