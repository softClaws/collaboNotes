

export const FormTemplate = ({attribute}) => {
    const {pageTitleProps, onFormSubmit, usernameProps, passwordProps, buttonIconProps, rolesProps} = attribute;
  return (
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
    mt-4
    h-80'
    onSubmit={onFormSubmit}>
    <h1 className='flex justify-center text-xl m-2 font-playwright'>{pageTitleProps}</h1>

<label className='font-playwright px-2 text-md' htmlFor="username"> {usernameProps?.textLabel}: 
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
value={usernameProps?.value}
onChange={usernameProps?.changeAction}
autoComplete="off"/>
</label>

{/* 
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
</label> */}





<label className='font-playwright px-2' htmlFor="password"> {passwordProps?.textLabel}: 
<input 
type="password" name="password"
className='border-amber-200
font-playwright 
border-b-2 border-b-amber-200 border-t-0 border-l-0 border-r-0 focus:outline-none px-3 py-1
'
value={passwordProps?.value}
onChange={passwordProps?.changeAction}/>

</label>
<label className='font-playwright flex' htmlFor="roles"> {rolesProps?.textLabel}: 
<select 
type="text" name="roles" 
className='border-amber-200
font-playwright 
 border-t-0 border-l-0 border-r-0 focus:outline-none px-19 py-1
'
onChange={rolesProps?.changeAction}
multiple ={true}
size ={2}
>
    {rolesProps?.options}
   </select>
   </label>

<div>
        <button type="submit"
        className='rounded-xl 
        border-amber-200 
        border-2 
        text-amber-600
        hover:bg-amber-100 
        transform 
        -rotate-12 
        hover:rotate-0 
        cursor-pointer 
        p-2 mt-2
        w-16 
        font-playwright 
        font-medium 
        shadow-lg '
        title={buttonIconProps?.title}
        disabled={buttonIconProps?.disable}
        > {buttonIconProps?.icon}</button>
      </div>
      </form>
    
  )
}
