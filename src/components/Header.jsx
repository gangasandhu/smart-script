import React from 'react'

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand text-success" href="/">SmartScript</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav me-auto text-center">
                        <li className="nav-item">
                            <a className="nav-link active" href="/">Home
                                <span className="visually-hidden">(current)</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/chat">Ask AI</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/documentation">documentation</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/team">Team</a>
                        </li>
                       
                    </ul>
          
                </div>
            </div>
        </nav>
    )
}

export default Header
