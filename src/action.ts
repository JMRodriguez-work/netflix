/* eslint-disable @typescript-eslint/no-unused-vars */

'use server';

import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import db from './app/utils/db';
import { authOptions } from './app/utils/auth';

export async function addToWatchList(formData: FormData) {
  'use server';

  const session = await getServerSession(authOptions);
  const movieId = formData.get('movieId');
  const pathname = formData.get('pathname') as string;

  const data = await db.watchList.create({
    data: {
      userId: session?.user?.email as string,
      movieId: Number(movieId),

    },
  });

  revalidatePath(pathname);
}
