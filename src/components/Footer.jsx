import React from 'react'

const Footer = ({theme}) => {
  return (
    <div className={`footer ${theme == 'light' ? 'bg-white text-black' : 'bg-dark text-light'} text-secondary p-4 text-center`}>
      Copyright &copy; {new Date().getFullYear()}. SmartScript - CPSC 2350 Team 9.
    </div>
  )
}

export default Footer
