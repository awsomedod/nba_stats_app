import React, { useState } from 'react';
import StatsView from './PlayerComponents/StatsView';
import TeamView from './TeamComponents/TeamView';

function ParentComponent({ id, onClose }) {
    const [view, setView] = useState('stats'); // 'stats' or 'team'
    const [currentId, setCurrentId] = useState(id);

    const handleTeamClick = (teamId) => {
        setCurrentId(teamId);
        setView('team');
    };

    const handlePlayerClick = (playerId) => {
        setCurrentId(playerId);
        setView('stats');
    };

    return (
        <div>
            {view === 'stats' ? (
                <StatsView id={currentId} onClose={onClose} onTeamClick={handleTeamClick} />
            ) : (
                <TeamView id={currentId} onClose={onClose} onPlayerClick={handlePlayerClick} />
            )}
        </div>
    );
}

export default ParentComponent;