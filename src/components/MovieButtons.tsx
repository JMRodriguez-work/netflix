'use client';

import { InfoIcon, PlayCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { PlayVideoModel } from './PlayVideoModel';

interface MovieButtonProps {
  overview: string
  youtubeUrl: string
  id: number
  age: number
  title: string
  release: number
  duration: number
}

export function MovieButtons({
  age, duration, id, overview, release, title, youtubeUrl,
} : MovieButtonProps) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <PlayCircle className="mr-2 h-6 w-6" />
        Play
      </Button>
      <Button onClick={() => setOpen(true)} className="text-lg font-medium bg-white/40 hover:bg-white/30 text-white">
        <InfoIcon className="mr-2 h-6 w-6" />
        Learn More
      </Button>

      <PlayVideoModel
        state={open}
        changeState={setOpen}
        age={age}
        duration={duration}
        overview={overview}
        release={release}
        title={title}
        youtubeUrl={youtubeUrl}
        key={id}
      />
    </>
  );
}
