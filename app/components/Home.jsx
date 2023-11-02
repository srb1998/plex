"use client"
import { useRouter } from "next/navigation"
import { useEffect,useState } from "react"
import Image from "next/image"
import useFetch from "../../hooks/useFetch"

const Homepage = () => {

  const [ background, setBackground ] = useState("");
  const [ query, setQuery ] = useState("");
  const {data, loading} = useFetch("/movie/upcoming");
  const router = useRouter();
  const url = "https://image.tmdb.org/t/p/original/"

  useEffect(() => {
    const bg = url+data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path
    // const bg = "https://image.tmdb.org/t/p/original/oghHR3X0hIcvs7xqyoFjA0GAZWn.jpg"
    setBackground(bg);
  },[data]);

  const searchQueryHandler = (e) => {
    e.preventDefault();
    if (e.key === "Enter" && query.length > 0 ){
      router.push(`/search/${query}`);
    }
  }

  const handleFormSubmission = (e) => {
    e.preventDefault();
    router.push(`/search/${query}`);
  }

  return (
    <section className='w-full relative justify-center md:h-[700px] h-[450px] gap-10 max-container bg-black'>
      
        <div className="absolute md:top-[325px] top-[225px] transform -translate-y-1/2 text-white text-center w-full z-10">
            <h1 className="md:text-8xl text-4xl font-bold font-palanquin md:mb-0 mb-1">Welcome</h1>
            <span className="sm:text-2xl font-normal flex justify-center px-5 mb-5
            ">Discover a Universe of Films and Shows. Dive In!</span>
            <div className="flex justify-center">
              <form className=" w-[350px] sm:w-2/3 h-12 sm:h-14 text-black flex-center" onSubmit={handleFormSubmission}
              >
              <input
                  type="text"
                  className="rounded-l-full px-6 py-3 outline-none w-[250px] sm:w-2/3 h-12 sm:h-14 text-black text-lg flex-center"
                  placeholder="Search for movie or tv show..."
                  onChange={(e)=>setQuery(e.target.value)}
                  onKeyUp={searchQueryHandler}

                />
                <button className="bg-[#EF7E1D] text-white sm:px-10 px-2 py-3 h-12 sm:h-14 rounded-r-full flex-center font-semibold text-lg"
                >
                  Search
                </button>
              </form>

            </div>
        </div>
        <div className="w-full flex top-0 left-0 inset-0 opacity-60 ">
            <Image
            src={background}
            alt="Backdrop Image"
            loading="lazy"
            fill={true}
            className="object-cover"
            />
        </div>
        <div className="opacity-layer"></div>


    </section>
  )
}

export default Homepage