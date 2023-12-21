'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import GoogleIcon from '../../public/google.svg';

export function GoogleSignInButton() {
  return (
    <Button onClick={() => signIn('google')} variant="outline" size="icon">
      <Image
        src={GoogleIcon}
        width={6}
        height={6}
        alt="Google Icon"
        className="w-6 h-6"
      />
    </Button>
  );
}
