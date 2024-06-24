import axios from 'axios';
import React, { useState, useEffect } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { Cross2Icon } from '@radix-ui/react-icons';
import * as Dialog from '@radix-ui/react-dialog';
import StatsView from '../PlayerComponents/StatsView';

function TeamView({id, onClose}) {
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    const getTeamDetails = async (id) => {
        try {
            const response = await axios.get(`https://nba-stats-app-api.azurewebsites.net/teams/${id}`);
            if (response.data.length > 0) {
                // Assume the response data is an array with one object containing player details and stats
                const teamData = response.data[0];
                const teamInfo = {
                    id: teamData.team.team_id,
                    name: teamData.team.team_name,
                    picture: teamData.picture,
                    stats: teamData.team.players // This is an array of players
                };
                setSelectedTeam(teamInfo);
            } else {
                console.log('No data returned for this team');
            }
        } catch (error) {
            console.error('Failed to fetch team details', error);
        }
    };

    useEffect(() => {
        getTeamDetails(id); // Fetch data when component mounts
    }, [id]);

    return (
<>
    <div className="mx-auto">
        <ScrollArea.Root className="rounded-lg overflow-hidden shadow-lg bg-white" style={{ height: '75vh' }}>
            <button aria-label="Close" onClick={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}
            className="absolute top-3 right-3 bg-red-500 rounded-full p-2 text-white hover:bg-red-800">
                <Cross2Icon style={{ width: '24px', height: '24px' }} />
            </button>
            <ScrollArea.Viewport className="w-full h-full rounded p-5">
                {selectedTeam ? (
                    <div>
                        <h2 className="text-3xl font-bold text-gray-700 mb-6">Team Details: {selectedTeam.name}</h2>
                        {selectedTeam.picture && (
                            <img src={`data:image/png;base64,${selectedTeam.picture}`} alt={`Image of ${selectedTeam.name}`} className="w-40 h-40 rounded-full mb-4 object-cover shadow-lg"/>
                        )}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {selectedTeam.stats.map(player => (
                                <button key={player.player_id} onClick={() => setSelectedPlayer(player.player_id)}>
                                <div key={player.player_id} className="bg-gray-800 hover:bg-blue-500 rounded-lg p-2 shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col items-center">
                                    <img src={player.picture ? `data:image/png;base64,${player.picture}` : 'images/placeholder.jpg'} alt={`Image of ${player.name}`} className="w-20 h-20 rounded-full mb-2 object-cover"/>
                                    <div className="text-white text-center text-sm font-semibold tracking-wide">
                                        {player.player_name}
                                    </div>
                                </div>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>Loading team data...</p>
                )}
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
                className="flex select-none rounded-lg touch-none p-0.5 bg-gray-700 transition-colors duration-150 ease-out hover:bg-gray-800 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                orientation="vertical"
            >
                <ScrollArea.Thumb className="flex-1 bg-gray-500 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Scrollbar
                className="flex select-none rounded-lg touch-none p-0.5 bg-gray-700 transition-colors duration-150 ease-out hover:bg-gray-800 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                orientation="horizontal"
            >
                <ScrollArea.Thumb className="flex-1 bg-gray-500 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
            </ScrollArea.Scrollbar>
            <Dialog.Root open={selectedPlayer !== null} onOpenChange={setSelectedPlayer}>
                <Dialog.Portal>
                    <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                    <Dialog.Content className=" rounded-lg data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] w-3/4 max-w-none translate-x-[-50%] translate-y-[-50%] bg-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <StatsView id={selectedPlayer} onClose={() => setSelectedPlayer(null)} />
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </ScrollArea.Root>
    </div>

</>
    );
}

export default TeamView;
