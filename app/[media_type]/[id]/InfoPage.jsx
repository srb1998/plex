"use client"
import useFetch from "@/hooks/useFetch"
import Banner from "@/pages/details/Banner";
import { Footer } from "@/app/components";
import Cast from "@/pages/details/Cast";
import Recommend from "@/pages/details/Recommend";
import VideosSection from "@/pages/details/VideosSection";
import Similar from "@/pages/details/Similar";


export default function InfoPage({ media_type,id }) {
  
  const { data,loading } = useFetch(`/${media_type}/${id}`)
  const { data: video, loading: videoLoading } = useFetch(`/${media_type}/${id}/videos`)
  const { data: credits, loading: creditsLoading } = useFetch(`/${media_type}/${id}/credits`)
  const { data:similar , loading: similarLoading } = useFetch(`/${media_type}/${id}/similar`)
  const { data:recommendations , loading: recommendationsLoading } = useFetch(`/${media_type}/${id}/recommendations`)

  // console.log(recommendations)
  return (
    <main className="relative flex flex-col">

      <Banner data={data} loading={loading} video={video?.results?.[0]} />

      <section className="my-6 md:contentWrapper">
        <Cast data={credits?.cast} loading={creditsLoading} />
      </section>
      <section className="mt-2  md:contentWrapper">
        <VideosSection data={video} loading={videoLoading} />
      </section>
      <section className="my-6 md:contentWrapper">
        <Similar data={similar} loading={similarLoading} mediaType={media_type} id={id} />
      </section>
      <section className="md:contentWrapper">
        <Recommend data={recommendations} loading={recommendationsLoading} mediaType={media_type} id={id} />
      </section>
      <Footer />
    </main>
    
  )
}

