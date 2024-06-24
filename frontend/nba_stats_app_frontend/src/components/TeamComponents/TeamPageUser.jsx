import { Box, Grid } from '@radix-ui/themes';
import TeamSearch from './TeamSearch';
import UserFavoriteTeams from './FavoriteTeams';
import { FavoritesProvider } from './FavoriteTeams';

function TeamPageUser() {
  return (
    <FavoritesProvider>
    <Grid columns="2" gap="3" rows="1">
        <div className= " w-full h-fit justify-between p-8">
            <TeamSearch />
        </div>
        <div className= " w-full h-fit justify-between p-8">
            <UserFavoriteTeams />
        </div>
    </Grid>
    </FavoritesProvider>
  );
}

export default TeamPageUser;