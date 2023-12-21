import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/utils/auth';
import Image from 'next/image';
import { MovieCard } from '@/components/MovieCard';
import prisma from '@/app/utils/db';

async function getData(userId: string) {
  const data = await prisma.watchList.findMany({
    where: {
      userId,
    },
    select: {
      Movie: {
        select: {
          title: true,
          age: true,
          duration: true,
          imageString: true,
          overview: true,
          release: true,
          id: true,
          WatchLists: true,
          youtubeString: true,
        },
      },
    },
  });

  return data;
}

export default async function WatchList() {
  const session = await getServerSession(authOptions);
  const movies = await getData(session?.user?.email as string);
  return (
    <>
      <h1 className="text-white text-4xl font-bold mt-10 px-5 sm:px-0">Your watchlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 sm:px-0 mt-10 gap-6">
        {movies.map(({ Movie: movie }) => (
          <div key={movie?.id} className="relative h-60">
            <Image
              src={movie?.imageString as string}
              alt={movie?.title as string}
              width={500}
              height={400}
              className="rounded-sm absolute w-full h-full object-cover"
            />

            <div className="h-60 relative z-10 wfull transform transition duration-500 hover:scale-125 opacity-0 hover:opacity-100">
              <div className="flex items-center justify-center bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg">
                <Image
                  src={movie?.imageString as string}
                  alt={movie?.title as string}
                  width={800}
                  height={800}
                  className="object-cover absolute w-full h-full -z-10 rounded-lg"
                />

                <MovieCard
                  age={movie?.age as number}
                  key={movie?.id}
                  movieId={movie?.id as number}
                  overview={movie?.overview as string}
                  time={movie?.duration as number}
                  title={movie?.title as string}
                  watchList={movie?.WatchLists?.length as number > 0}
                  watchListId={movie?.WatchLists[0]?.id as string}
                  year={movie?.release as number}
                  youtubeUrl={movie?.youtubeString as string}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
