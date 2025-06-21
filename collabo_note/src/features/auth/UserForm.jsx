

export const UserForm = () => {
  return (
    <>
        <h1 className='text-xl m-2 font-playwright'>Signup</h1>

<label className='font-playwright px-2'> Username: 
<input 
type="text" name="username" 
className='border-amber-200 
font-playwright 
border-b-2 border-b-amber-200 border-t-0 border-l-0 border-r-0 focus:outline-none px-3 py-1
'/>
</label>

<label className='font-playwright px-2'> Email: 
<input 
type="email" name="email "  
className='border-amber-200
font-playwright 
border-b-2 border-b-amber-200 border-t-0 border-l-0 border-r-0 focus:outline-none px-6 py-1
'/>
</label>

<label className='font-playwright px-2'> Password: 
<input 
type="password" name="password "
className='border-amber-200
font-playwright 
border-b-2 border-b-amber-200 border-t-0 border-l-0 border-r-0 focus:outline-none px-3 py-1
'/>
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
   </select>
</label>
<div>
        <button type="submit"
        className='rounded-xl border-amber-200 border-2 hover:bg-amber-100 cursor-pointer p-2'> Sign Up</button>
      </div>
    </>
  )
}
