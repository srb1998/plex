"use client"
import { useState } from "react"
import SwitchTabs from "../../pages/switchtabs/SwitchTabs"
import Carousel from "../../pages/carousel/Carousel"
import useFetch from "../../hooks/useFetch"

const Popular = () => {

  const [endpoint, setEndpoint] = useState("movie")
  const {data,loading} = useFetch(`/${endpoint}/popular`)
  const onTabChange = (tabname) => {
    setEndpoint(tabname == "Movies" ? "movie": "tv");
  }

  return (
    <section className='relative mt-2 mb-8 md:h-[510px] h-[400px] '>
      <div className="w-full max-w-6xl mx-auto sm:px-0 px-4 flex items-center justify-between mb-5">
        <span className="text-white text-[25px] font-arial">What's Popular</span>
        <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
      </div>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>
    </section>
  ) 
}

export default Popular