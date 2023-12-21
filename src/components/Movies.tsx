import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/utils/auth';
import db from '../app/utils/db';
import { MovieCard } from './MovieCard';

async function getData(userId: string) {
  const data = await db.movie.findMany({
    where: {
      category: 'movie',
    },
    select: {
      age: true,
      duration: true,
      id: true,
      release: true,
      imageString: true,
      overview: true,
      youtubeString: true,
      title: true,
      WatchLists: {
        where: {
          userId,
        },
      },
    },
  });

  return data;
}

export async function Movies() {
  const session = await getServerSession(authOptions);
  const movies = await getData(session?.user?.email as string);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-6">
      {movies?.map((movie) => (
        <div key={movie.id} className="relative h-48">
          <Image
            src={movie.imageString}
            alt={movie.title}
            width={500}
            height={400}
            className="rounded-sm absolute w-full h-full object-cover"
          />

          <div className="h-60 relative z-10 w-full transform transition duration-500 hover:scale-125 opacity-0 hover:opacity-100">
            <div className="bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex items-center justify-center border">
              <Image
                src={movie.imageString}
                alt={movie.title}
                width={800}
                height={800}
                className="absolute w-full h-full -z-10 rounded-lg object-cover"
              />
              <MovieCard
                movieId={movie.id}
                overview={movie.overview}
                title={movie.title}
                watchList={movie.WatchLists.length > 0}
                watchListId={movie.WatchLists[0]?.id}
                youtubeUrl={movie.youtubeString}
                age={movie.age}
                time={movie.duration}
                year={movie.release}
              />
            </div>
          </div>
        </div>

      ))}
    </div>
  );
}