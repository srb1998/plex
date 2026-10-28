"use client"

import { useState,useEffect,useRef } from "react"

import useFetch from "@/hooks/useFetch"
import { fetchDataFromApi } from "@/utils/api"
import MovieCard from "@/pages/movieCard/MovieCard"
import Spinner from "@/pages/spinner/Spinner"
import Select from "react-select";
import InfiniteScroll from "react-infinite-scroll-component"

// `primary_release_date` and `original_title` are MOVIE-only sort keys.
// /discover/tv rejects them with HTTP 400, which is why the TV tab broke as soon
// as you picked "Release Date" or "Title (A-Z)". TV needs first_air_date /
// original_name instead.
const sortOptionsFor = (mediaType) => {
    const isTv = mediaType === "tv";
    const dateKey = isTv ? "first_air_date" : "primary_release_date";
    const titleKey = isTv ? "original_name" : "original_title";

    return [
        { value: "popularity.desc", label:"Popularity Descending"},
        { value: "popularity.asc", label:"Popularity Ascending"},
        { value: "vote_average.desc", label:"Rating Descending"},
        { value: "vote_average.asc", label:"Rating Ascending"},
        { value: `${dateKey}.desc`, label:"Release Date Descending"},
        { value: `${dateKey}.asc`, label:"Release Date Ascending"},
        { value: `${titleKey}.asc`, label:"Title (A-Z)"},
    ];
};

const Explore = ({mediaType}) => {
    const [data,setData] = useState(null);
    const [pageNum,setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const [genre, setGenre] = useState(null);
    const [sortby, setSortby] = useState(null);

    // Was a module-level `let filters = {}`, shared by the movie and TV pages.
    const filters = useRef({});

    const { data:genresData } = useFetch(`/genre/${mediaType}/list`)

    // Page is passed explicitly. Reading `pageNum` from a stale closure after
    // setPageNum(1) made "reset to page 1" fetch an old page instead.
    const loadPage = (page) => {
        setLoading(true);
        fetchDataFromApi(`/discover/${mediaType}`, { ...filters.current, page })
            .then((res) => {
                setData(res);
                setPageNum(page + 1);
                setLoading(false);
            });
    };

    const fetchNextPageData = () => {
        fetchDataFromApi(`/discover/${mediaType}`, { ...filters.current, page: pageNum })
            .then((res) => {
                if (!res?.results) return;
                setData((prev) => ({
                    ...prev,
                    ...res,
                    results: [...(prev?.results ?? []), ...res.results],
                }));
                setPageNum(pageNum + 1);
            });
    };

    useEffect(() => {
        filters.current = {}
        setData(null);
        setPageNum(1);
        setSortby(null);
        setGenre(null);
        loadPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[mediaType]);

    const onChange = (selectedItems,action) => {
        if (action.name === "sortby"){
            setSortby(selectedItems);
            if (action.action !== "clear") {
                filters.current.sort_by = selectedItems.value;
            } else {
                delete filters.current.sort_by;
            }
        }

        if (action.name === "genres") {
            setGenre(selectedItems);
            if (action.action !== "clear") {
                filters.current.with_genres = selectedItems.map((g) => g.id).join(",");
            } else {
                delete filters.current.with_genres;
            }
        }

        loadPage(1);
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
                    options={sortOptionsFor(mediaType)}
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
                        dataLength={data?.results?.length || 0}
                        next={fetchNextPageData}    
                        hasMore={pageNum <= (data?.total_pages ?? 0)}
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
