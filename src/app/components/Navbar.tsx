'use client';

import Image from 'next/image';
import Link from 'next/link';
import { links } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Bell, Search } from 'lucide-react';
import logo from '../../../public/netflix_logo.svg';
import { UserNav } from './UserNav';

export function Navbar() {
  const pathName = usePathname();

  return (
    <nav className="w-full max-w-7xl mx-auto items-center justify-between px-5 sm:px-6 py-5 lg:px-8 flex">
      <div className="flex items-center">
        <Link className="w-32" href="/home">
          <Image
            src={logo}
            alt="Netflix Logo"
            priority
          />
        </Link>

        <ul className="lg:flex gap-x-4 ml-14 hidden">
          {links.map((link) => (
            <div key={link.name}>
              {pathName === link.href ? (
                <li>
                  <Link
                    className="text-white font-semibold underline text-sm"
                    href={link.href}
                  >
                    {link.name}

                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    className="text-gray-300 font-normal text-sm"
                    href={link.href}
                  >
                    {link.name}

                  </Link>
                </li>
              )}
            </div>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-x-8">
        <Search className="w-5 h-5 text-gray-300 cursor-pointer transition-all duration-100 hover:text-white hover:scale-110" />
        <Bell className="w-5 h-5 text-gray-300 cursor-pointer transition-all duration-100 hover:text-white hover:scale-110" />
        <UserNav />
      </div>
    </nav>
  );
}
