import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LinkProps {
  name: string
  href: string
}

export const links: LinkProps[] = [
  {
    name: 'Home',
    href: '/home',
  },
  {
    name: 'Tv Shows',
    href: '/home/shows',
  },
  {
    name: 'Movies',
    href: '/home/movies',
  },
  {
    name: 'Recently Added',
    href: '/home/recently',
  },
  {
    name: 'My List',
    href: '/home/user/list',
  },
];
