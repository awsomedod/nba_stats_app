import axios from 'axios';
import React, { useState, useEffect } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { Cross2Icon } from '@radix-ui/react-icons';
import * as Dialog from '@radix-ui/react-dialog';
import TeamView from '../TeamComponents/TeamView';

function StatsView({id, onClose}) {
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [selectedTeam, setSelectedTeam] = useState(null);

    const getPlayerDetails = async (id) => {
        try {
            const response = await axios.get(`https://nba-stats-app-api.azurewebsites.net/players/${id}`);
            if (response.data.length > 0) {
                // Assume the response data is an array with one object containing player details and stats
                const playerData = response.data[0];
                const playerInfo = {
                    id: playerData.player.player_id,
                    name: playerData.player.player_name,
                    picture: playerData.picture,
                    stats: playerData.stats // This is an array of stats for different seasons
                };
                setSelectedPlayer(playerInfo);
            } else {
                console.log('No data returned for this player');
            }
        } catch (error) {
            console.error('Failed to fetch player details', error);
        }
    };

    useEffect(() => {
        getPlayerDetails(id); // Fetch data when component mounts
    }, [id]);


    return (
<div className="mx-auto">
    <ScrollArea.Root className="rounded-lg overflow-hidden shadow-lg bg-white" style={{ height: '75vh' }}>
        <button aria-label="Close" onClick={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        className="absolute top-3 right-3 bg-red-500 rounded-full p-2 text-white hover:bg-red-800">
            <Cross2Icon style={{ width: '24px', height: '24px' }} />
        </button>
        <ScrollArea.Viewport className="w-full h-full rounded p-5">
            {selectedPlayer ? (
                <div>
                    <h2 className="text-3xl font-bold text-gray-700 mb-6">Player Details: {selectedPlayer.name}</h2>
                    {selectedPlayer.picture && (
                        <img src={`data:image/png;base64,${selectedPlayer.picture}`} alt={`Image of ${selectedPlayer.name}`} className="w-40 h-40 rounded-full mb-4 object-cover shadow-lg"/>
                    )}
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Team</th>
                                <th className="py-3 px-6 text-left">Age</th>
                                <th className="py-3 px-6 text-left">Games</th>
                                <th className="py-3 px-6 text-left">Games Started</th>
                                <th className="py-3 px-6 text-left">Minutes Played</th>
                                <th className="py-3 px-6 text-left">Points</th>
                                <th className="py-3 px-6 text-left">Assists</th>
                                <th className="py-3 px-6 text-left">Total Rebounds</th>
                                <th className="py-3 px-6 text-left">Offensive Rebounds</th>
                                <th className="py-3 px-6 text-left">Defensive Rebounds</th>
                                <th className="py-3 px-6 text-left">Steals</th>
                                <th className="py-3 px-6 text-left">Blocks</th>
                                <th className="py-3 px-6 text-left">Turnovers</th>
                                <th className="py-3 px-6 text-left">Personal Fouls</th>
                                <th className="py-3 px-6 text-left">Field Goals Made</th>
                                <th className="py-3 px-6 text-left">Field Goal Attempts</th>
                                <th className="py-3 px-6 text-left">Field Goal %</th>
                                <th className="py-3 px-6 text-left">Three Point Field Goals</th>
                                <th className="py-3 px-6 text-left">Three Point Attempts</th>
                                <th className="py-3 px-6 text-left">Three Point %</th>
                                <th className="py-3 px-6 text-left">Free Throws Made</th>
                                <th className="py-3 px-6 text-left">Free Throw Attempts</th>
                                <th className="py-3 px-6 text-left">Free Throw %</th>
                                <th className="py-3 px-6 text-left">Two Point Field Goals</th>
                                <th className="py-3 px-6 text-left">Two Point Attempts</th>
                                <th className="py-3 px-6 text-left">Two Point %</th>
                                <th className="py-3 px-6 text-left">Effective Field Goal %</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedPlayer.stats.map((stat, index) => (
                                <tr key={index} className="text-gray-700 leading-normal mt-2.5 pt-2.5 border-t border-gray-300 hover:bg-gray-100">
                                    <button className='hover:bg-blue-500 transition duration-300 ease-in-out transform hover:-translate-y-0.25'
                                    key={stat.team_id} onClick={() => setSelectedTeam(stat.team_id)} >
                                    <td className="py-3 px-6 text-left whitespace-nowrap">{stat.team_name || "N/A"}</td>
                                    </button>
                                    <td className="py-3 px-6 text-left">{stat.age || "N/A"}</td>
                                    <td className="py-3 px-6 text-left">{stat.games || "N/A"}</td>
                                    <td className="py-3 px-6 text-left">{stat.games_started || "N/A"}</td>
                                    <td className="py-3 px-6 text-left">{stat.minutes_played || "N/A"}</td>
                                    <td className="py-3 px-6 text-left">{stat.points || "N/A"}</td>
                                    <td className="py-3 px-6 text-left">{stat.assists || "N/A"}</td>
                                    <td className="py-3 px-6 text-left">{stat.total_rebounds || "N/A"}</td>
                                    <td className="py-3 px-6 text-left">{stat.offensive_rebounds || "N/A"}</td>
                                    <td className="py-3 px-6 text-left">{stat.defensive_rebounds || "N/A"}</td>
                                    <td className="py-3 px-6 text-left">{stat.steals || "N/A"}</td>
                                    <td className="py-3 px-6 text-left">{stat.blocks || "N/A"}</td>
                                    <td className="py-3 px-6 text-left">{stat.turnovers || "N/A"}</td>
                                    <td className="py-3 px-6 text-left">{stat.personal_fouls || "N/A"}</td>
                                    <td className="py-3 px-6 text-left">{stat.field_goals || "N/A"}</td>
                                    <td className="py-3 px-6 text-left">{stat.field_goal_attempts || "N/A"}</td>
                                    <td className="py-3 px-6 text-left">{stat.field_goal_percentage !== null ? (stat.field_goal_percentage * 100).toFixed(1) + "%" : "N/A"}</td>
                                    <td className="py-3 px-6 text-left">{stat.three_point_field_goals || "N/A"}</td>
                                    <td className="py-3 px-6 text-left">{stat.three_point_attempts || "N/A"}</td>
                                    <td className="py-3 px-6 text-left">{stat.three_point_percentage !== null ? (stat.three_point_percentage * 100).toFixed(1) + "%" : "N/A"}</td>
                                    <td className="py-3 px-6 text-left">{stat.free_throws || "N/A"}</td>
                                    <td className="py-3 px-6 text-left">{stat.free_throw_attempts || "N/A"}</td>
                                    <td className="py-3 px-6 text-left">{stat.free_throw_percentage !== null ? (stat.free_throw_percentage * 100).toFixed(1) + "%" : "N/A"}</td>
                                    <td className="py-3 px-6 text-left">{stat.two_point_field_goals || "N/A"}</td>
                                    <td className="py-3 px-6 text-left">{stat.two_point_attempts || "N/A"}</td>
                                    <td className="py-3 px-6 text-left">{stat.two_point_percentage !== null ? (stat.two_point_percentage * 100).toFixed(1) + "%" : "N/A"}</td>
                                    <td className="py-3 px-6 text-left">{stat.effective_field_goal_percentage !== null ? (stat.effective_field_goal_percentage * 100).toFixed(1) + "%" : "N/A"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>Loading player data...</p>
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
        <Dialog.Root open={selectedTeam !== null} onOpenChange={setSelectedTeam}>
                <Dialog.Portal>
                    <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                    <Dialog.Content className=" rounded-lg data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] w-3/4 max-w-none translate-x-[-50%] translate-y-[-50%] bg-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <TeamView id={selectedTeam} onClose={() => setSelectedTeam(null)} />
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
    </ScrollArea.Root>
</div>
    );
}

export default StatsView;

