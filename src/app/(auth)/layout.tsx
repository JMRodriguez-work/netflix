import Image from 'next/image';
import { ReactNode } from 'react';
import logo from '../../../public/netflix_logo.svg';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Image
        src="/login_background.jpg"
        alt="Auth Netflix Background"
        priority
        fill
        className="hidden sm:flex sm:object-cover -z-10 brightness-50"
      />

      <Image
        src={logo}
        alt="Netflix Logo"
        width={120}
        height={120}
        priority
        className="absolute left-4 top-4 object-contain md:left-10 md:top-6"
      />

      {children}
    </div>
  );
}