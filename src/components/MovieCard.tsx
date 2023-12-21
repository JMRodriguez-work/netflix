'use client';

import { Button } from '@/components/ui/button';
import { Heart, PlayCircle } from 'lucide-react';
import { useState } from 'react';
import { addToWatchList } from '@/action';
import { usePathname } from 'next/navigation';
import { PlayVideoModel } from './PlayVideoModel';

interface MovieProps {
  title: string
  overview: string
  movieId: number
  watchList: boolean
  watchListId: string
  youtubeUrl: string
  year: number
  age: number
  time: number
}

export function MovieCard({
  movieId, overview, title, watchList, watchListId, youtubeUrl, age, time, year,
}: MovieProps) {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();

  return (
    <>
      <button onClick={() => setOpen(true)} type="button" aria-label="Play" className="-mt-14">
        <PlayCircle className="h-10 w-10 cursor-pointer transition-all duration-100 hover:scale-150" />
      </button>

      <div className="right-5 top-5 absolute z-10">
        {watchList ? (
          <form>
            <Button variant="outline" size="icon">
              <Heart className="w-4 h-4 text-red-500" fill="rgb(239 68 68)" />
            </Button>
          </form>
        ) : (
          <form action={addToWatchList}>
            <input type="hidden" name="movieId" value={movieId} />
            <input type="hidden" name="pathname" value={pathname} />
            <Button variant="outline" size="icon">
              <Heart className="w-4 h-4" />
            </Button>
          </form>
        )}
      </div>

      <div className="p-5 absolute bottom-0 left-0">
        <h1 className="font-bold text-lg line-clamp-1">{title}</h1>
        <div className="flex gap-x-2 items-center">
          <p className="font-normal text-sm">{year}</p>
          <p className="font-normal border py-0.5 border-gray-200 rounded text-sm px-1">
            {age}
            +
          </p>
          <p className="font-normal text-sm">
            {time}
            h
          </p>
        </div>

        <p className="line-clamp-1 text-sm text-gray-200 font-light">
          {overview}
        </p>
      </div>

      <PlayVideoModel
        title={title}
        youtubeUrl={youtubeUrl}
        key={movieId}
        overview={overview}
        state={open}
        changeState={setOpen}
        age={age}
        duration={time}
        release={year}
      />
    </>
  );
}
