

export const UserForm = () => {
  return (
    <div className = "flex flex-col justify-center align-middle md:w-1/2 w-sm ">
    <h1 className='flex justify-center text-xl m-2 font-playwright'>Signup</h1>
    <form className='flex 
    justify-center 
    flex-col 
    items-center 
    
    gap-2
    shadow-[8px_8px_16px_#bebebe,_-8px_-8px_16px_#ffffff] 
    p-4 
    rounded-4xl 
    md:h-full 
    md:max-w-lg
    max-w-sm 
    m-auto 
    h-80'>

<label className='font-playwright px-2'> Username: 
<input 
type="text" name="username" 
className='border-amber-200 
font-playwright 
border-b-2
border-b-amber-200 
border-t-0 
border-l-0 
border-r-0 
focus:outline-none 
px-3 
py-1
'
autoComplete="none"/>
</label>

<label className='font-playwright px-2'> Email: 
<input 
type="email" name="email "  
className='border-amber-200
font-playwright 
border-b-2 
border-b-amber-200 
border-t-0 border-l-0 
border-r-0 focus:outline-none 
px-6 
py-1
'
/>
</label>


<label className='font-playwright'> Role: 
<select 
type="text" name="role" 
className='border-amber-200
font-playwright 
border-b-2 border-b-amber-200 border-t-0 border-l-0 border-r-0 focus:outline-none px-19 py-1
'>
  <option value=""></option>
  <option value="creator">Creator</option>
  <option value="contributor">Contributor</option>
  <option value="reader">Reader</option>
   </select>
</label>

<label className='font-playwright px-2'> Password: 
<input 
type="password" name="password "
className='border-amber-200
font-playwright 
border-b-2 border-b-amber-200 border-t-0 border-l-0 border-r-0 focus:outline-none px-3 py-1
'/>
</label>



<div>
        <button type="submit"
        className='rounded-xl 
        border-amber-200 
        border-2 
        hover:bg-amber-100 
        transform 
        -rotate-12 
        hover:rotate-0 
        cursor-pointer 
        p-2 mt-2 
        font-playwright 
        font-medium 
        shadow-lg '> Sign Up</button>
      </div>
      </form>
    </div>
  )
}
