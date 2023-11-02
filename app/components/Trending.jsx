"use client"
import { useState } from "react"
import SwitchTabs from "../../pages/switchtabs/SwitchTabs"
import Carousel from "../../pages/carousel/Carousel"
import useFetch from "../../hooks/useFetch"

const Trending = () => {

  const [endpoint, setEndpoint] = useState("day")
  const {data,loading} = useFetch(`/trending/all/${endpoint}`)
  const onTabChange = (tabname) => {
    setEndpoint(tabname == "Day" ? "day": "week");
  }

  return (
    <section className='relative my-2 w-full md:h-[510px] h-[400px] '>
      <div className="w-full max-w-6xl mx-auto sm:px-0 px-4 flex items-center justify-between mb-5">
        <span className="text-white text-[25px] font-arial">Trending</span>
        <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
      </div>
      <Carousel data={data?.results} loading={loading}/>
    </section>
  ) 
}

export default Trending