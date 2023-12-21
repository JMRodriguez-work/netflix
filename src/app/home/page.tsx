import { Movies } from '@/components/Movies';
import { MovieVideo } from '../../components/MovieVideo';
import { RecentlyAdded } from '../../components/RecentlyAdded';

export default function HomePage() {
  return (
    <div className="p-5 mb-24 lg:p-0">
      <MovieVideo />
      <h1 className="text-3xl font-bold">Recently Added</h1>
      <RecentlyAdded />
      <h1 className="text-3xl font-bold mt-10">Movies</h1>
      <Movies />
    </div>
  );
}
