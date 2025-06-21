import {Link} from 'react-router-dom'



const Public = () => {
    let content =(

<section className ="flex 
flex-col
bg-[#ffddb2] 
h-screen
">
    
    <main className ="public_main 
    font-poppins 
    md:text-2xl text-md 
    flex 
    justify-center 
    items-center 
    flex-col 
    bg-[url('/src/assets/journal.jpg')]
    bg-cover
    bg-center
    h-screen
    ">
        
        <p className='font-bold text-white'> Write the moment, Write history</p>
        <p className='font-bold  text-white'> One note at a time!</p>

        <div className='flex justify-center items-center'>
        <button className='font-techMono rounded-3xl mt-4  w-32  bg-amber-50 m-2 hover:bg-[#ffdda2] cursor-pointer' ><Link to='/login'>Sign up</Link> </button>
        </div>
    </main>

</section>
    )
    



  return content
  
  
}

export default Public