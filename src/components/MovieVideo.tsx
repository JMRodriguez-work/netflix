import prisma from '../app/utils/db';
import { MovieButtons } from './MovieButtons';

async function getData() {
  const data = await prisma.movie.findFirst({
    select: {
      title: true,
      overview: true,
      videoSource: true,
      imageString: true,
      release: true,
      duration: true,
      id: true,
      age: true,
      youtubeString: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return data;
}

export async function MovieVideo() {
  const movie = await getData();
  return (
    <div className="h-[55vh] lg:h-[60vh] w-full flex justify-start items-center">
      <video
        poster={movie?.imageString}
        autoPlay
        muted
        loop
        src={movie?.videoSource}
        className="w-full absolute top-0 left-0 h-[60vh] object-cover -z-10 brightness-[60%]"
      />

      <div className="absolute w-[90%] lg:w-[40%] mx-auto">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold">{movie?.title}</h1>
        <p className="text-white text-lg mt-5 line-clamp-3">{movie?.overview}</p>

        <div className="flex gap-x-3 mt-4">
          <MovieButtons
            age={movie?.age as number}
            duration={movie?.duration as number}
            id={movie?.id as number}
            overview={movie?.overview as string}
            release={movie?.release as number}
            title={movie?.title as string}
            youtubeUrl={movie?.youtubeString as string}
            key={movie?.id}
          />
        </div>
      </div>
    </div>
  );
}
