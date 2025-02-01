import React from 'react'

const Footer = () => {
  return (
    <div className={`footer text-secondary p-4 text-center`}>
      Copyright &copy; {new Date().getFullYear()}. SmartScript - CPSC 2350 Team 9.
    </div>
  )
}

export default Footer
