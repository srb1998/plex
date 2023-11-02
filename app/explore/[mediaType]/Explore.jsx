"use client"

import { useState,useEffect } from "react"

import useFetch from "@/hooks/useFetch"
import { fetchDataFromApi } from "@/utils/api"
import MovieCard from "@/pages/movieCard/MovieCard"
import Spinner from "@/pages/spinner/Spinner"
import Select from "react-select";
import InfiniteScroll from "react-infinite-scroll-component"

let filters = {};

const sortbyData = [
    { value: "popularity.desc", label:"Popularity Descending"},
    { value: "popularity.asc", label:"Popularity Ascending"},
    { value: "vote_average.desc", label:"Rating Descending"},
    { value: "vote_average.asc", label:"Rating Ascending"},
    { value: "primary_release_date.desc", label:"Release Date Descending"},
    { value: "primary_release_date.asc", label:"Release Date Ascending"},
    { value: "original_title.asc", label:"Title (A-Z)"},

]

const Explore = ({mediaType}) => {
    const [data,setData] = useState(null);
    const [pageNum,setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const [genre, setGenre] = useState(null);
    const [sortby, setSortby] = useState(null);
    
    const { data:genresData } = useFetch(`/genre/${mediaType}/list`)

    const fetchInitialData = () => {
        setLoading(true);
        fetchDataFromApi(`/discover/${mediaType}`, filters).then((res)=>{
            setData(res)
            setPageNum((prev) => prev + 1)
            setLoading(false);
        });
    };

    const fetchNextPageData = () => {
        fetchDataFromApi(`/discover/${mediaType}?page=${pageNum}`,filters)
            .then((res) => {
                if(data?.results) {
                setData({
                    ...data,results:[...data?.results, ...res.results],
                });
            } else {
                setData(res)
            }
            setPageNum((prev) => prev + 1);
        });
    };

    useEffect(() => {
        filters = {}
        setData(null);
        setPageNum(1);
        setSortby(null);
        setGenre(null);
        fetchInitialData();
    },[mediaType]);

    const onChange = (selectedItems,action) => {
        if (action.name === "sortby"){
            setSortby(selectedItems);
            if (action.action !== "clear") {
                filters.sort_by = selectedItems.value;
            } else {
                delete filters.sort_by;
            }
        }

        if (action.name === "genres") {
            setGenre(selectedItems);
            if (action.action !== "clear") {
                let genreId = selectedItems.map((g) => g.id);
                genreId = JSON.stringify(genreId).slice(1, -1);
                filters.with_genres = genreId;
            } else {
                delete filters.with_genres;
            }
        }

        setPageNum(1);
        fetchInitialData();        
    };

  return (
    <div className="pt-20">
        <div className="flex md:mb-2 mb-4 md:flex-row flex-col md:items-center justify-between md:contentWrapper font-inter font-bold">
            <div className="text-2xl md:mb-0 mb-2 px-4 text-white font-inter">
                {mediaType === "tv" ? "Explore Tv Shows":"Explore Movies"}
            </div>
            <div className="flex gap-[10px] md:flex-row flex-col px-4">
                <Select
                    isMulti
                    name="genres"
                    value={genre}
                    closeMenuOnSelect={false}
                    options={genresData?.genres}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                    onChange={onChange}
                    placeholder="Select genres"
                    className=" rounded-[50px] md:max-w-[500px] md:min-w-[250px]"
                    classNamePrefix="react-select"
                />
                <Select
                    name="sortby"
                    value={sortby}
                    options={sortbyData}
                    onChange={onChange}
                    isClearable={true}
                    placeholder="Sort by"
                    className=" rounded-[50px] flex-shrink-0 md:w-[250px]"
                    classNamePrefix="react-select"
                />
            </div>
        </div>
        
        {!loading && (
            <>
                {data?.results?.length > 0 ? (
                    <InfiniteScroll
                        className="flex flex-wrap flex-row contentWrapper md:gap-[20px] gap-[10px] mb-5"
                        dataLength={data?.results?.length || []}
                        next={fetchNextPageData}    
                        hasMore={pageNum <= data?.total_pages}
                        loader={<Spinner />}     
                    >
                        {data?.results?.map((item,index) => {
                            if(item.media_type === "person") return;
                            return (
                                <MovieCard
                                    key={index}
                                    data={item}
                                    mediaType={mediaType}
                                />
                            )
                        })}
                    </InfiniteScroll>
                ):(
                    <span className="text-2xl text-slate-200 font-inter">Sorry, Results not found!</span>
                )}
            </>
        )}
    </div>
  )
}


export default Explore
