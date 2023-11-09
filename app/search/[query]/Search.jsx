"use client"
import { useState,useEffect} from "react"
import { fetchDataFromApi } from "@/utils/api"
import Spinner from "@/pages/spinner/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "@/pages/movieCard/MovieCard";

const Search = ({ query }) => {
  
  const [data,setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchInitialData = () => {
    setLoading(true)
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      setData(res)
      setPageNum((prev)=> prev + 1)
      setLoading(false)
      return data
    })
  }

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      if(data?.results) {
        setData({
          ...data,results: [...data?.results, ...res.results]
        })
      } else {
        setData(res)
      }
      setPageNum((prev)=> prev + 1)
      return data;
    })
  }

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  },[query])
  
  return (
    <div className="pt-[100px] flex-center">
      <div className="relative h-[300px]"></div>
      {loading && <Spinner />}
      {!loading && data && (
        <div className="contentWrapper">
          {data.results.length > 0 ? (
            <>
              <div className="md:text-3xl text-2xl text-white mb-6">
                {`Search ${
                  data.total_results > 1 ? "results" : "result"
                } of '${query.replaceAll("%20", " ")}'`}
              </div>
              <InfiniteScroll
                className="flex flex-wrap md:gap-5 gap-[10px] mb-[50px]"
                dataLength={data.results.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data.total_pages}
                loader={<Spinner />}
              >
                {data.results.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="font-inter text-2xl text-[#173d77]">
              Results not found!
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default Search

