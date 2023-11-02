import Search from "./Search"

export async function generateMetadata({params:{query}}) {
  return {
    title:`${query} - Search Results`,
    description : "Explore latest Movies and Tv Shows"
  }
}

export default function SearchPage({ params:{ query }}) {
  return (
    <Search query={query}/>
  )
}


