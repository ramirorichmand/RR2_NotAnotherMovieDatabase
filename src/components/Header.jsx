import React, { useState } from 'react'
import MovixLogo from '../assets/movix-logo.svg'
import {GoSearch} from 'react-icons/go'
import {SlMenu} from 'react-icons/sl'
import {HiOutlineXMark} from 'react-icons/hi2'
import { NavLink, useNavigate } from 'react-router-dom'


const Header = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const handleQuery = (e) => {
    if(e.key === "Enter" && query){
      navigate(`/search/${query}`)
      handleSearch()
    }
  }

  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const handleNav = () => {
    if(isSearchOpen){
      setIsSearchOpen(false)
      setIsNavOpen(!isNavOpen)
    }else{
      setIsNavOpen(!isNavOpen)
    }
  }
  const handleSearch = () =>{
    if(isNavOpen){
      setIsNavOpen(false)
      setIsSearchOpen(!isSearchOpen)
    }else{
      setIsSearchOpen(!isSearchOpen)
    }
  }
  return (
    <>
    <div className='nav w-full h-[60px] fixed top-0 left-0 z-[999] bg-black/20 duration-500 backdrop-blur-sm' style={{background: isNavOpen && '#04152d'}}>
      <div className='container mx-auto px-5 h-full'>
          <div className='flex items-center justify-between h-full text-white'>
              
              {/* logo  */}
              <div onClick={() => navigate('/')} className='cursor-pointer'>
                <img src={MovixLogo} alt="Logo" />
              </div>

              {/* right section  */}
              <div className='hidden sm:block'>
                <ul className='flex items-center gap-8'>
                  <li className='text-lg cursor-pointer hover:text-[#da2f68]'><NavLink to={"/explore/movie"}>Movies</NavLink></li>
                  <li className='text-lg cursor-pointer hover:text-[#da2f68]'><NavLink to={"/explore/tv"}>TV Shows</NavLink></li>
                  <li role='button' onClick={handleSearch} className='text-lg cursor-pointer hover:text-[#da2f68]'><GoSearch /></li>
                </ul>
              </div>

              <div className='sm:hidden flex items-center gap-5 text-xl'>
                <GoSearch onClick={handleSearch} className='cursor-pointer' />
                {isNavOpen ? <HiOutlineXMark className='cursor-pointer' onClick={handleNav} /> : <SlMenu onClick={handleNav} className='cursor-pointer' />}
              </div>

          </div>
      </div>
    </div>

    {/* mobile nav  */}
    <div className={isNavOpen ? 'bg-[#020c1b] p-5 text-white fixed top-[60px] z-[999] left-0 right-0 duration-500' : 'fixed top-[-100%]'}>
      <ul className='flex flex-col space-y-7'>
      <NavLink to={"/explore/movie"}><li className='text-xl cursor-pointer hover:text-[#da2f68]'>Movies</li></NavLink>
      <NavLink to={"/explore/tv"}><li className='text-xl cursor-pointer hover:text-[#da2f68]'>TV Shows</li></NavLink>
      </ul>
    </div>

    {/* search  */}
    <div className={isSearchOpen ? 'bg-white fixed h-[80px] top-[60px] z-[999] left-0 right-0 duration-500' : 'fixed top-[-100%]'}>
      <div className='flex items-center h-full w-full justify-center'>
      <input value={query} onChange={(e) => setQuery(e.target.value)} onKeyUp={handleQuery} type="text" placeholder='Search for a movie or a TV Show' className='w-3/4 text-lg focus:outline-none focus:border-none' />
      <HiOutlineXMark onClick={handleSearch} className='inline cursor-pointer' size={30} />
      </div>
    </div>
    </>
  )
}

export default Header