import { Grid } from '@radix-ui/themes';
import TeamSearch from './TeamSearch';
import { FavoritesProvider } from './FavoriteTeams';


function TeamPage() {
  return (
    <FavoritesProvider>
    <div className= " w-full h-fit justify-between p-8">
            <div className="text-center text-gray-600 mb-4">
                Sign in to add and view Favorite Teams
            </div>
        <TeamSearch />
    </div>
    </FavoritesProvider>
  );
}

export default TeamPage;