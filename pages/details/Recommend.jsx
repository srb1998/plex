import Carousel from "../carousel/Carousel"

export default function Recommend({ data,loading,mediaType }) {

  // Must return null, not undefined — React throws "Nothing was returned from
  // render" when a component returns undefined, which is what happened whenever
  // a title had no recommendations (or when the request failed).
  if (!(data?.total_pages > 0)) return null;

  return (
        <div className="relative md:mb-8 overflow-hidden md:h-[475px] h-[350px]">
          {/* <div className="my-4 text-3xl font-inter font-medium text-white ">{title}</div> */}
          <div className=" mt-4 mb-2 md:ml-4 ml-4 md:text-[32px] text-[24px] font-inter font-medium text-white ">Recommendations</div>
          <Carousel
            title="Recommendations"
            data={data?.results}
            loading={loading}
            endpoint={mediaType}
          />
        </div>
  )
}
