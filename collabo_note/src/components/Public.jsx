import {Link} from 'react-router-dom'



const Public = () => {
    let content =(

<section className = "public">
    <header>
        <h1>Welcome to <span className = "titleWrap"> collabo Note !
            </span></h1>
    </header>
    <main className ="public_main">
        <p>Write history, one note at a time!</p>
        <Link to='/login'>Login</Link>
    </main>

</section>
    )
    



  return content
  
  
}

export default Public