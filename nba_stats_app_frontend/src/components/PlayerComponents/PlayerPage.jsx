import { Grid } from '@radix-ui/themes';
import PlayerSearch from './PlayerSearch';
import { FavoritesProvider } from './FavoritePlayers';


function PlayerPage() {
  return (
    <FavoritesProvider>
    <div className= " w-full h-fit justify-between p-8">
            <div className="text-center text-gray-600 mb-4">
                Sign in to add and view Favorite Players
            </div>
        <PlayerSearch />
    </div>
    </FavoritesProvider>
  );
}

export default PlayerPage;