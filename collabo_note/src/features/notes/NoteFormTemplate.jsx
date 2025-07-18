import React from 'react'

export const NoteFormTemplate = ({attribute}) => {
    const {HeadingTitle, onSaveNewNoteFunc, titleValue,onTitleChange, text, onTextChange, user, userList, onDelNoteFunc, canSave, onUserChange, onEditNote, buttonText, delText, complete, created,updated,onCompleteChange} = attribute
  return(
        <form action="" className="flex flex-col gap-2 justify-center items-center" onSubmit ={onSaveNewNoteFunc}>
            <h1 className="font-poppins text-md">{HeadingTitle}</h1>
            <div className='text-xs font-poppins'>
                <p >{created? `Created on ${created}` : null}</p>
                <p >{updated? `Updated on ${updated}` : null}</p>
                
            </div>
            <label htmlFor="title" className="flex flex-col justify-center items-center gap-2 font-poppins"> Title
            <input type="text" name="title" 
            className="shadow-[8px_8px_16px_#bebebe,_-8px_-8px_16px_#ffffff] 
            focus:outline-amber-400 
            border-amber-300 
            border-1 p-2 h-10 
            rounded-md font-techMono"
            value={titleValue}
            onChange={onTitleChange}
            />
            </label>
            <label htmlFor="content" className="m-8 flex flex-col justify-center items-center mb-0 font-poppins">Content
                <textarea name="content" 
                className="border-amber-400 focus:outline-amber-400 border-1 
                rounded-xl w-screen lg:w-md 
                md:w-sm 
                shadow-[8px_8px_16px_#bebebe,_-8px_-8px_16px_#ffffff] 
                p-2 
                text-sm 
                lg:h-52 
                md:h-44 h-52 
                font-techMono" value={text} onChange={onTextChange}></textarea>
            </label>
            
            {(onCompleteChange)?

            <label className='font-poppins mb-2 flex px-2  cursor-pointer' htmlFor="active"> 
            <input 
            type="checkbox"
            className='border-amber-200
            font-poppins 
            sr-only
            peer
            '
            checked={complete}
            onChange={onCompleteChange}
            />
            <span className="mr-2 ">{complete? "Open" : "Completed"}: </span>
            <div className="w-6 h-6 border-2 border-gray-300 rounded-md  peer-checked:bg-green-400 peer-checked:border-green-400 transition-all duration-300 peer-checked:scale-110" onClick={onCompleteChange}></div>
            </label>  
            : null}



            <label htmlFor="users" className="flex flex-col justify-center items-center gap-2 font-poppins mt-0" > Assign User
            <select name="users" value={user} className="text-xs focus:outline-amber-400" onChange={onUserChange}>
                <option value = ''>-Choose user--</option>
                {userList}
            </select>
            </label>

            
            
        


            <button type="submit" name ="Add" className="border-amber-300 border-1 hover:border-amber-400 rounded-2xl hover:border-2 px-4 cursor-pointer disabled:bg-gray-100 disabled:border-0 bg-white" disabled ={!canSave} onClick={onEditNote}>{buttonText}</button>
            {
            (onDelNoteFunc)?
            <button type="submit" name ="Delete" className="border-red-300 border-1 hover:border-red-400 rounded-2xl hover:border-2 px-4 cursor-pointer disabled:bg-gray-100 disabled:border-0 bg-white" onClick={onDelNoteFunc}>{delText}</button> : null
            }
        </form>
        )
}
