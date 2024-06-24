import { ScrollArea, Box, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useState, useEffect, createContext, useCallback, useContext } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import StatsView from './StatsView';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    const fetchFavorites = useCallback(async () => {
        try {
            const response = await axios.get(`https://nba-stats-app-api.azurewebsites.net/users/${userId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const playersData = response.data.favorite_players.map(player => ({
                id: player.player_id,
                name: player.player_name,
                picture: player.picture
            }));
            setFavorites(playersData);
        } catch (error) {
            console.error('Failed to fetch favorites', error);
        }
    }, [userId, token]);

    return (
        <FavoritesContext.Provider value={{ favorites, fetchFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
};

function UserFavoritePlayers() {
    const { favorites, fetchFavorites } = useContext(FavoritesContext);
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites]);

    const removeFavoritePlayer = async (playerId) => {
        try {
            await axios.delete(`https://nba-stats-app-api.azurewebsites.net/users/${userId}/favorites/players`, {
                data: { playerId }, // Axios requires 'data' field for DELETE requests with a body
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchFavorites();  // Refresh favorites to reflect the removal
        } catch (error) {
            console.error('Failed to remove player from favorites', error);
        }
    };
    const handleCloseDialog = () => {
        setSelectedPlayer(null);  // Reset the selected player to null to close the dialog
    };

    return (
        <div className='bg-white bg-opacity-90 p-4 rounded-lg shadow-lg'>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Favorite Players</h2>
            <ScrollArea type="scroll" scrollbars="vertical" className="mt-2" style={{ width: '100%', maxHeight: 'calc(100vh - 200px)' }}>
                <Box className="p-2" style={{ width: '100%' }}>
                    <Flex direction="column" gap="2" wrap="wrap" css={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                        {favorites.map((player) => (
                            <button>
                                <Dialog.Root open={selectedPlayer === player.id} onOpenChange={() => setSelectedPlayer(player.id)}>
                                <Dialog.Trigger asChild>
                            <div key={player.id} className="bg-gray-50 hover:bg-blue-500 rounded-md p-3 border border-gray-200 shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 justify-between flex items-center m-2">
                                <img src={player.picture ? `data:image/png;base64,${player.picture}` : 'images/placeholder.jpg'} alt={`Image of ${player.name}`} className="w-16 h-16 rounded-full mr-4 object-cover"/>
                                <div className="text-gray-800 flex-grow">
                                    <div className="font-semibold text-lg">{player.name}</div>
                                </div>
                                <button 
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFavoritePlayer(player.id)}}
                                >
                                    Remove from Favorites
                                </button>
                            </div>
                            </Dialog.Trigger>
                            <Dialog.Portal>
                                    <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                                    <Dialog.Content className=" rounded-lg data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] w-3/4 max-w-none translate-x-[-50%] translate-y-[-50%] bg-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">

                                        <StatsView id={player.id} onClose={handleCloseDialog}/>

                                    </Dialog.Content>
                                </Dialog.Portal>
                            </Dialog.Root>
                            </button>
                        ))}
                    </Flex>
                </Box>
            </ScrollArea>
        </div>
    );
}

export default UserFavoritePlayers;
