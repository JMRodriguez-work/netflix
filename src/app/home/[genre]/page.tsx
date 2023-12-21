import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/utils/auth';
import Image from 'next/image';
import { MovieCard } from '@/components/MovieCard';
import prisma from '@/app/utils/db';

async function getData(category: string, userId: string) {
  switch (category) {
    case 'shows': {
      const data = await prisma.movie.findMany({
        where: {
          category: 'show',
        },
        select: {
          age: true,
          duration: true,
          id: true,
          title: true,
          release: true,
          imageString: true,
          overview: true,
          youtubeString: true,
          WatchLists: {
            where: {
              userId,
            },
          },
        },
      });

      return data;
    }

    case 'movies': {
      const data = await prisma.movie.findMany({
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

    case 'recently': {
      const data = prisma.movie.findMany({
        where: {
          category: 'recent',
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

    default: {
      throw new Error();
    }
  }
}

export default async function CategoryPage({ params }: { params: { genre: string } }) {
  const session = await getServerSession(authOptions);
  const data = await getData(params.genre, session?.user?.email as string);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 sm:px-0 mt-10 gap-6">
      {data.map((movie) => (
        <div key={movie.id} className="relative h-60">
          <Image
            src={movie.imageString}
            alt={movie.title}
            width={500}
            height={400}
            className="rounded-sm absolute w-full h-full object-cover"
          />

          <div className="h-60 relative z-10 wfull transform transition duration-500 hover:scale-125 opacity-0 hover:opacity-100">
            <div className="flex items-center justify-center bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg">
              <Image
                src={movie.imageString}
                alt={movie.title}
                width={800}
                height={800}
                className="object-cover absolute w-full h-full -z-10 rounded-lg"
              />

              <MovieCard
                age={movie.age}
                key={movie.id}
                movieId={movie.id}
                overview={movie.overview}
                time={movie.duration}
                title={movie.title}
                watchList={movie.WatchLists.length > 0}
                watchListId={movie.WatchLists[0]?.id}
                year={movie.release}
                youtubeUrl={movie.youtubeString}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
