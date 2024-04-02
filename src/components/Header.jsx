import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand text-success" to="smart-script/">SmartScript</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav me-auto text-center">
                        <li className="nav-item">
                            <Link className="nav-link active" to="smart-script/">Home
                                <span className="visually-hidden">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="smart-script/chat">Chat AI</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="smart-script/docs">documentation</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="smart-script/team">Team</Link>
                        </li>
                       
                    </ul>
          
                </div>
            </div>
        </nav>
    )
}

export default Header
