import InfoPage from "./InfoPage";
import { fetchDataFromApi } from "@/utils/api";

export async function generateMetadata({params:{media_type,id }}) {
  const data = await fetchDataFromApi(`/${media_type}/${id}`);
  // console.log(data)
  return {
    title:data?.title || data?.name || `Plex - ${media_type}`,
    description : "Explore latest Movies and Tv Shows"
  }
}

export default function Page({ params: {media_type,id } }) {

  return (
    <InfoPage media_type={media_type} id={id}/>
  )
}


