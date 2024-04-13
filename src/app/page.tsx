import getSongs from "@/actions/getSongs";
// import Header from "@/components/Header";
// import ListItem from "@/components/ListItem";

import Header from '@/app/components/Header';
import ListItem from '@/app/components/ListItem';
import PageContent from "./(site)/components/PageContent";
import MainPage from "./components/MainPage";
import SongItem from "./components/SongItem";

// import PageContent from "./components/PageContent";

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();

  return (
    <div
      className="
        bg-neutral-900 
        rounded-lg 
        h-full 
        w-auto 
        overflow-hidden 
        overflow-y-auto
        mr-2
      "
    >
      <Header className={""}>
        <div className="mb-2">
          <h1 
            className="
            text-white 
              text-3xl 
              font-semibold
            ">
              Welcome back
          </h1>
          <div 
            className="
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              xl:grid-cols-3 
              2xl:grid-cols-4 
              gap-3 
              mt-4
            "
          >
            <ListItem 
              name="Liked Songs" 
              image="/images/liked.png" 
              href="liked" 
            />
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">
            Newest songs here 
          </h1>
        </div>
        {/* <PageContent songs={songs} /> */}
        {/* {songs.map(song=><div key={song.id}>
            {song.title}
            {song.user_id}
            </div>)} */}
            {/* <ShowSongs songs={songs}/> */}
       <MainPage songs={songs}/>
      </div>

    </div>
  )
}