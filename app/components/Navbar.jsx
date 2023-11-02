"use client"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { HiSearch } from "react-icons/hi"
import { RxHamburgerMenu } from "react-icons/rx"
import { VscChromeClose } from "react-icons/vsc";
import { useState,useRef } from "react"

export default function Navbar() {
  const [ toggleDropdown, setToggleDropdown ] = useState(false);
  const [ showSearch, setShowSearch ] = useState(false);
  const [ query, setQuery ] = useState("");
  const router = useRouter();
  const searchInputRef = useRef(null);

  const searchQueryHandler = (e) => {
    if(e.key=="Enter" && query.length>0){
      router.push(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false)
      },1000)
    }
  };

  return (
    <nav className={`absolute top-0 z-20 flex flex-between w-full h-[60px] backdrop-blur-sm bg-opacity-25 bg-black/25 items-center p-4`}>
    
      <Link href="/" className="flex gap-2 sm:mx-10">
          <Image
            src="/logo.svg" alt="Logo" width={35} height={40} loading="lazy"
          />
          <p className="text-[#F4900E] logo_text">Plex</p>
      </Link>
      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        <div className="flex gap-3 md:gap-5 mx-3 sm:mx-10 items-center">
          <Link href="/explore/movie" className="text-lg font-inter font-bold text-white hover:text-[#F4900E]">
              Movies
          </Link>
          <Link href="/explore/tv" className="text-lg font-inter font-bold text-white hover:text-[#F4900E]">
              TV Shows
          </Link>
          <HiSearch onClick={()=>setShowSearch((prev) => (!prev))} className="text-xl text-white font-semibold cursor-pointer hover:text-[#F4900E]" />
        </div>
      </div>
      
      {/* Searchbar */} 
      {showSearch && (
          <div className="w-full h-[60px] bg-white absolute top-[60px] animate-mobileMenu duration 300 ease-in left-0 right-0">
                  <div className="flex justify-start items-center h-10 mt-[10px]">
                      <input
                          ref={searchInputRef}
                          type="text"
                          placeholder="Search for a movie or tv show...."
                          onChange={(e) => setQuery(e.target.value)}
                          onKeyUp={searchQueryHandler}
                          className="w-full h-[50px] bg-white outline-none mx-6 rounded-l-full text-sm md:h-[60px] md:text-[20px] md:px-[30px] px-[10px]"
                      />
                      <VscChromeClose
                          onClick={() => setShowSearch(false)}
                          className="lg:text-2xl text-3xl flex justify-start cursor-pointer mr-6 "
                      />
                  </div>
          </div>
      )} 
      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative gap-4 ">
        <HiSearch onClick={()=>setShowSearch((prev) => (!prev))} className="text-[22px] text-white cursor-pointer" />
        <div className="flex">
          <RxHamburgerMenu onClick={() => setToggleDropdown((prev)=>(!prev))} className="text-[22px] font-bold text-white cursor-pointer"/>
        </div>
        {toggleDropdown && (
          <div className="dropdown">
            <Link
              href="/explore/movie"
              className="dropdown_link"
              onClick={() =>setToggleDropdown(false)}
            >
              Movies
            </Link>
            <Link
              href="/explore/tv"
              className="dropdown_link"
              onClick={() =>setToggleDropdown(false)}
            >
              TV Shows
            </Link>
          
          </div>
        )
        }
        
      </div>
    </nav>
  )
}