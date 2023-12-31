/* eslint-disable @typescript-eslint/no-unused-vars */

'use server';

import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { authOptions } from './app/utils/auth';
import prisma from './app/utils/db';

export async function addToWatchList(formData: FormData) {
  'use server';

  const session = await getServerSession(authOptions);
  const movieId = formData.get('movieId');
  const pathname = formData.get('pathname') as string;

  const data = await prisma.watchList.create({
    data: {
      userId: session?.user?.email as string,
      movieId: Number(movieId),

    },
  });

  revalidatePath(pathname);
}

export async function removeFromWatchList(formData: FormData) {
  'use server';

  const pathname = formData.get('pathname') as string;
  const watchListId = formData.get('watchlistId') as string;

  const data = await prisma.watchList.delete({
    where: {
      id: watchListId,
    },
  });

  revalidatePath(pathname);
}
