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

  // `page` is passed explicitly: the old code called setPageNum(1) and then read
  // the stale `pageNum` from the closure, so searching again fetched whatever
  // page you had scrolled to on the previous query.
  const fetchPage = (page, append) => {
    fetchDataFromApi(`/search/multi`, { query, page }).then((res) => {
      if (!res?.results) {
        if (!append) setData(res);
        setLoading(false);
        return;
      }

      if (append) {
        setData((prev) => ({
          ...prev,
          ...res,
          results: [...(prev?.results ?? []), ...res.results],
        }));
      } else {
        setData(res);
      }

      setPageNum(page + 1);
      setLoading(false);
    });
  };

  const fetchNextPageData = () => fetchPage(pageNum, true);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setPageNum(1);
    fetchPage(1, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[query]);
  
  return (
    <div className="pt-[100px] flex-center">
      <div className="relative h-[300px]"></div>
      {loading && <Spinner />}
      {!loading && data && (
        <div className="contentWrapper">
          {data.results?.length > 0 ? (
            <>
              <div className="md:text-3xl text-2xl text-white mb-6">
                {`Search ${
                  data.total_results > 1 ? "results" : "result"
                } of '${query.replaceAll("%20", " ")}'`}
              </div>
              <InfiniteScroll
                className="flex flex-wrap md:gap-5 gap-[10px] mb-[50px]"
                dataLength={data.results?.length || 0}
                next={fetchNextPageData}
                hasMore={pageNum <= (data.total_pages ?? 0)}
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

export default Search;
