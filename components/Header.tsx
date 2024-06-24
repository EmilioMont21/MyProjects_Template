import React from 'react'
import { ModeToggle } from './ModeToggle'
import AuthButton from './AuthButton'

function Header() {
  return (
    <header className='w-full border-b flex justify-center'>
        <div className='flex justify-between items-center w-full max-w-7xl p-2 '>
            Logo
            <div className='flex gap-4 items-center'>
                <ModeToggle />
                <AuthButton/>
            </div>
        </div>
    </header>
  )
}

export default Header