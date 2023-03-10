import React from 'react'

function NavBar() {
  return (
    <div className='fixed w-full h-[50px] top-0 left-0 flex justify-center items-center gap-4'>
        <a href="http://" target="_blank" >

        <i className="fa-brands fa-square-github text-[2rem] text-white cursor-pointer
        hover:text-cyan-500
        "></i>
        </a>
        
        <a href="https://www.linkedin.com/in/akshay-jadhav-01737711b/" target="_blank" >
        <i className="fa-brands fa-linkedin text-[2rem] text-white cursor-pointer
        hover:text-cyan-500"></i>
        </a>
    </div>
  )
}

export default NavBar