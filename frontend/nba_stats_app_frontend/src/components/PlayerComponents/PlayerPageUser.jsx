import { Box, Grid } from '@radix-ui/themes';
import PlayerSearch from './PlayerSearch';
import UserFavoritePlayers from './FavoritePlayers';
import { FavoritesProvider } from './FavoritePlayers';

function PlayerPageUser() {
  return (
    <FavoritesProvider>
    <Grid columns="2" gap="3" rows="1">
        <div className= " w-full h-fit justify-between p-8">
            <PlayerSearch />
        </div>
        <div className= " w-full h-fit justify-between p-8">
            <UserFavoritePlayers />
        </div>
    </Grid>
    </FavoritesProvider>
  );
}

export default PlayerPageUser;