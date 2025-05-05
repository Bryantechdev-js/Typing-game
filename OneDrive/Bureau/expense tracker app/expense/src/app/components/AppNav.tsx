"use client"

import { headers } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function AppNav() {
    const pathName = usePathname()

    const routes =[
        {
            "label":"Dashboard",
            "path":"/app/dashboard"
        },
        {
            "label":"Account",
            "path":"/app/account"
        }
    ]
  return (
   <header className='flex justify-between items-center px-10 pt-3 pb-10'>
      <div className="logoContainer">
        <p className="logo w-auto h-auto bg-gradient bg-green-50 from-cyan-50 to-fuchsia-50 text-transparent bg-clip-text text-3xl font-bold text-shadow-black xl:text-5xl">Expenseboolt</p>
      </div>
      <nav className=''>
        <ul className='flex gap-8'>
       {routes.map((route)=>(
          <li key={route.path} className={`cursor-pointer  transition hover:scale-[1.1] px-2 py-1 ${pathName === route.path  ? "underline" : " "}   `}>
            <Link href={route.path}>{route.label}</Link>
          </li>
       ))}
        </ul>
      </nav>
   </header>
  )
}

export default AppNav
