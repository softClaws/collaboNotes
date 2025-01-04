import {Link} from 'react-router-dom'

const DashHeader = () => {
    let content =(
        <header className = "dash-header">
            <div className="dash_header_container">
                <Link to ="/dash">
                <h1 className ="dashHeaderTitle">
                    Collabo Note

                </h1>
                </Link>
                <nav className = "dashHeaderNav">

                </nav>
            </div>

        </header>
    )
  return content
}

export default DashHeader