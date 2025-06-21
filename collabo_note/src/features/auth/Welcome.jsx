import {Link} from 'react-router-dom'

const Welcome = () => {
  const date = new Date()
  const today = new Intl.DateTimeFormat('en-NG', {dateStyle: 'full', timeStyle: 'long'}).format(date)

  const content =(
    <section className = "welcome flex justify-center items-center flex-col">
      <p>{today}</p>
      <h1>Welcome!</h1>
      <div className='p-5 w-1/2 h-1/2'>

      <div className=' md:text-xl text-sm flex justify-between'>
      <p className=''><Link to="/dash/notes" >View Notes</Link></p>
      <p><Link to="/dash/users">View User Settings </Link></p>
      </div>
        
      </div>
    </section>
  )
  return content
}

export default Welcome