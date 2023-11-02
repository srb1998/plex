
export default function Cast({data,loading}) {

  const url = "https://image.tmdb.org/t/p/original/"
  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden md:h-[350px] h-[250px]">
      <div className=" ml-4 md:text-[32px] text-[24px] font-inter font-medium text-white mb-4">Top Cast</div>
      {!loading ? (
        <div className="flex ml-4 gap-5 overflow-y-hidden -mr-5 md:p-0 md:ml-4">
          
          {data?.map((item) => {
            let imgUrl = item.profile_path ? url+item.profile_path : <p className='text-white'>No Image</p>
            return (
              <div key={item.id} className="items-center text-white ">
                <div className=" md:w-[180px] w-[125px] md:h-[180px] h-[125px] rounded-full overflow-hidden md:mb-5 mb-3 shadow-xl transition-shadow">
                  <img src={imgUrl}className='object-cover block object-center-top'/>
                </div>
                <div className="md:text-[18px]  text-[14px] md:leading-6 leading-5 font-medium font-inter flex-center">{item.name}</div>
                <div className="md:text-[16px] text-[14px] md:leading-6 leading-5 opacity-50 font-medium flex-center">{item.character}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="castSkeleton">
          {skeleton()}
          {skeleton()}
          {skeleton()}
          {skeleton()}
          {skeleton()}
          {skeleton()}
        </div>
      )}
    </div>
  );
}

