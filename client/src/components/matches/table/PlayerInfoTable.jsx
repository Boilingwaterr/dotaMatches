import React, { useState, useEffect } from 'react';
import Style from './StatTable.module.css';
import Tooltip from '../../tooltip/Tooltip';
import { calculateCoordinates } from '../../../utility';
import { usePlayerWinrate } from '../../../hooks/fetchData.hook';

const PlayerInfo = props => {
    const [ showTooltip, setShowTooltip ] = useState(false);
    const [ coordinates, setCoordinates ] = useState({});// coordinates for tooltip
    const { data, color } = props;

    const [ winRate, setWinRate ] = useState(null);

    const fetchWinrate = usePlayerWinrate();

    useEffect(() => {
        fetchWinrate(setWinRate, data.getPlayerInfo.profile.account_id);
    }, [fetchWinrate, data.getPlayerInfo.profile.account_id])

    const toolTipSize = {
        height: 200,
        width: 500
    }

    return <div 
        key = { data.getPlayerInfo.profile.avatar }
        className = { Style.playerInfo }
    >
            <div style = {{ color }}>
                { data.getPlayerInfo.profile.personaname }
            </div>
            <div 
                className = { Style.playerImage }
                onMouseEnter = { () => {
                    setShowTooltip(true);
                }}
                onMouseMove = { event => {
                    setCoordinates(calculateCoordinates(event, toolTipSize))
                }}
                onMouseLeave = { () => setShowTooltip(false) }
            >
                <img
                    
                    src = { data.getPlayerInfo.profile.avatar } 
                    alt = ' '
                /> 
            </div>
            { showTooltip && <Tooltip 
                type = "player" 
                coordinates = { coordinates }
                winRate = { winRate }
                toolTipSize = { toolTipSize }
                { ...props }
            /> }

        </div>

}

export default PlayerInfo;