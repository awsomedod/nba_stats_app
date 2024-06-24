import { TextField, ScrollArea, Box, Flex, Text } from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';
import {MagnifyingGlassIcon} from '@radix-ui/react-icons'
import { useState, useEffect, useContext } from 'react'; // Import useState hook
import axios from 'axios'; // Ensure axios is imported
import { useAuth } from '../AuthComponents/AuthContext';
import StatsView from './StatsView';
import { FavoritesContext } from './FavoritePlayers';

function PlayerSearch() {
    const [players, setPlayers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const userId = localStorage.getItem('userId');  // Assume user ID is stored during login
    const token = localStorage.getItem('token');  // Retrieve the token from local storage
    const { isLoggedIn } = useAuth();
    const [topPlayers, setTopPlayers] = useState([]);
    const { favorites, fetchFavorites } = useContext(FavoritesContext);
    const [favoritePlayerIds, setFavoritePlayerIds] = useState([]);

    useEffect(() => {
        fetchFavorites();
    }, []);

    useEffect(() => {
        fetchTopPlayers();  // Fetch top players once on component mount
    }, []);

    useEffect(() => {
        const ids = favorites.map(player => player.id);
        setFavoritePlayerIds(ids);
    }, [favorites]); // Update favoritePlayerIds whenever favorites change

    const fetchTopPlayers = async () => {
        try {
            const response = await axios.get('https://nba-stats-app-api.azurewebsites.net/top-players');
            setTopPlayers(response.data);  // Assume data is directly the array of players
        } catch (error) {
            console.error('Failed to fetch top players', error);
        }
    };


    const searchPlayers = async (searchValue) => {
        try {
			const response = await axios.get('https://nba-stats-app-api.azurewebsites.net/players/search', {
				params: {
				  name: searchValue
				}
			  });
			// Transform the data into the expected format
			const playersData = response.data.players.map(player => ({
                id: player.id,
                name: player.name,
                picture: player.picture
            }));    
			setPlayers(playersData);
        } catch (error) {
            console.error('Failed to fetch players', error);
        }
    };

    const addFavoritePlayer = async (playerId) => {
        try {
            await axios.post(`https://nba-stats-app-api.azurewebsites.net/users/${userId}/favorites/players`, 
                { playerId },
                { headers: { 'Authorization': `Bearer ${token}` }}
            );
            fetchFavorites();  // Refresh favorites to reflect the addition
        } catch (error) {
            console.error('Failed to add player to favorites', error);
        }
    };

    const handleInputChange = (event) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        if (newSearchTerm) {
            searchPlayers(newSearchTerm);
        } else {
            setPlayers([]);  // Optionally clear results when input is cleared
        }
    };

    const handleTopPlayerSearch = (playerName) => {
        setSearchTerm(playerName);
        searchPlayers(playerName);
    };

    const handleCloseDialog = () => {
        setSelectedPlayer(null);  // Reset the selected player to null to close the dialog
    };

    return (
        <div className='bg-white bg-opacity-90 p-4 rounded-lg shadow-lg'>
            <TextField.Root 
                placeholder="Search for a Player" 
                className=" rounded-full text-lg placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                size="3"
                value={searchTerm}
                onChange={handleInputChange}
            >
                <TextField.Slot className="pl-2">
                    <MagnifyingGlassIcon className="text-gray-600" height="20" width="20" />
                </TextField.Slot>
            </TextField.Root>
            {!searchTerm ? (
            <div className="flex flex-col items-center mt-4">
                <h2 className="text-2xl font-bold text-gray-700 mb-3">Most Popular Players</h2>
                <div className="flex justify-around w-full px-4 overflow-auto pt-2">
                    {topPlayers.map(player => (
                        <button
                            key={player.id}
                            className="flex flex-col items-center w-28 h-40 bg-gray-800 hover:bg-blue-500 rounded-lg p-2 shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
                            onClick={() => handleTopPlayerSearch(player.name)}
                        >
                            {player.picture ? (
                                <img src={`data:image/png;base64,${player.picture}`} alt={`Image of ${player.name}`} className="w-20 h-20 rounded-full mb-2 object-cover shadow-md"/>
                            ) : (
                                <div className="w-20 h-20 rounded-full mb-2 bg-gray-400 flex items-center justify-center">
                                    <span className="text-sm text-white">No Image</span>
                                </div>
                            )}
                            <div className="text-white text-center text-sm font-semibold tracking-wide">
                                {player.name}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            ) : <></> }
            <ScrollArea type="scroll" scrollbars="vertical" className="mt-2" style={{ width: '100%', maxHeight: 'calc(100vh - 200px)' }}>
            <Box className="p-2">
                    <Flex direction="column" gap="2">
                        {players.map((player) => (
                        <button>
                        <Dialog.Root open={selectedPlayer === player.id} onOpenChange={() => setSelectedPlayer(player.id)}>
                                <Dialog.Trigger asChild>
                                    <Flex key={player.id} className="items-center bg-gray-50 hover:bg-blue-500 rounded-md p-3 shadow border border-gray-200 transition duration-300 ease-in-out transform hover:-translate-y-1 justify-between">
                                        <Flex className="items-center">
                                            <img src={player.picture ? `data:image/png;base64,${player.picture}` : 'images/placeholder.jpg'} alt={`Image of ${player.name}`} className="w-16 h-16 rounded-full mr-4 object-cover"/>
                                            <div className="text-gray-800">
                                                <div className="font-semibold text-lg">{player.name}</div>
                                            </div>
                                        </Flex>
                                        {isLoggedIn && !favoritePlayerIds.includes(player.id) && (
                                        <button 
                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addFavoritePlayer(player.id);
                                            }}
                                        >
                                            Add to Favorites
                                        </button>
                                        )}
                                    </Flex>
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

export default PlayerSearch;
