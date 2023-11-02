
import { Homepage, Trending, Popular, TopRated, Footer } from "./components";

export default function Home() {

  return (
    <main className="relative">
      <Homepage />
      <Trending />
      <Popular />
      <TopRated />
      <Footer />
    </main>
  );
}
