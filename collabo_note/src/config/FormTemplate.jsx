

export const FormTemplate = ({attribute}) => {
    const {pageTitleProps, onFormSubmit, usernameProps, passwordProps,activeProps, rolesProps,buttonIconProps, deleteButtonIconProps} = attribute;
  return (
    <form className='flex 
    justify-center 
    flex-col 
    items-center 
    
    gap-4
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

<label className='font-playwright px-2 text-md peer
relative' htmlFor="username"> {usernameProps?.textLabel}: 
<input 
type="text" name="username" 
className='border-amber-200 
font-playwright 
border-b-1
border-b-amber-200 
border-t-0 
border-l-0 
border-r-0 
focus:outline-none 
px-3 
py-0
relative

'
value={usernameProps?.value}
onChange={usernameProps?.changeAction}
autoComplete="off"/>
</label>
<span className=" absolute z-50 mt-0 mb-18 ml-0 mr-10 hidden peer-hover:inline peer-focus:inline text-xs font-techMono text-gray-400"> use only alphabets(Aa-Zz)</span>


<label className='font-playwright px-2 relative peer' htmlFor="password"> {passwordProps?.textLabel}: 
<input 
type="password" name="password"
className='border-amber-200
font-playwright 
border-b-1 border-b-amber-200 border-t-0 border-l-0 border-r-0 focus:outline-none px-3 py-0
relative
'
value={passwordProps?.value}
onChange={passwordProps?.changeAction}/>


</label>
<span className=" absolute z-30 p-8 mb-0 ml-0 mt-3 mr-4 hidden peer-hover:inline px-16 peer-focus:inline text-xs font-techMono text-gray-400"> must include characters and symbols, !@#_$%</span>

{(activeProps)?
<label className='font-playwright flex px-2 mr-auto cursor-pointer' htmlFor="active"> 
<input 
type="checkbox"
className='border-amber-200
font-playwright 
sr-only
peer
'
checked={activeProps?.value}
onChange={activeProps.changeAction}
/>
<span className="mr-2 font-medium">{activeProps?.textLabel}: </span>
<div className="w-6 h-6 border-2 border-gray-300 rounded-md  peer-checked:bg-green-400 peer-checked:border-green-400 transition-all duration-300 peer-checked:scale-110" onClick={activeProps.changeAction}></div>
</label> : null
}

<label className='font-playwright flex' htmlFor="roles"> {rolesProps?.textLabel}: 
<select 
type="text" name="roles" 
className='border-amber-200
font-playwright 
 border-t-0 border-l-0 border-r-0 focus:outline-none px-19 py-1
'
onChange={rolesProps?.changeAction}
defaultValue={rolesProps?.value}
multiple ={true}
size ={2}
>
    {rolesProps?.options}
   </select>
   </label>


<div className="flex space-x-3">
        <button type="submit"
        className='rounded-xl 
        border-amber-200 
        border-1 
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
        onClick={(buttonIconProps.clickAction)? buttonIconProps?.clickAction : null}
        > {buttonIconProps?.icon}</button>

      {(deleteButtonIconProps)?

           <button type="submit"
           className='rounded-xl 
           border-amber-200 
           border-1 
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
           shadow-lg
           '
           title={buttonIconProps?.title}
           disabled={buttonIconProps?.disable}
           onClick={(deleteButtonIconProps.clickAction)? deleteButtonIconProps?.clickAction : null}
           > {deleteButtonIconProps?.icon}</button>
      : null}
      </div>
      </form>
    
  )
}
