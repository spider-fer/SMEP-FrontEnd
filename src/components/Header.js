import {Link} from 'react-router-dom'

export default function Header() {
    return(
        <header className= "header">
            <nav className = "nav">
                <ul className="nav-items">
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/">Users</Link></li>
                    <li><Link to="/">Page 2</Link></li>
                    <li><Link to="/">Page 3</Link></li>
                </ul>
            </nav>
        </header>
    )
}