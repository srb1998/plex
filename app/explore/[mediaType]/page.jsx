import Explore from "./Explore"

export async function generateMetadata({params:{mediaType}}) {
    return {
      title:`Explore ${mediaType}`,
      description : "Explore latest Movies and Tv Shows"
    }
}

export default function ExplorePage({params:{mediaType}}) {
  return (
    <Explore mediaType={mediaType}/>
  )
}
