import React, { useState } from 'react';
import Style from './StatTable.module.css';
import Tooltip from '../../tooltip/Tooltip';
import { calculateCoordinates } from '../../../utility';

const HeroImg = props =>{

    const [ showTooltip, setShowTooltip ] = useState(false);
    const [ coordinates, setCoordinates ] = useState({});// coordinates for tooltip
    const { playerColor, result, id } = props;

    const toolTipSize = {
        height: 450,
    }

    return <div 
        key = { result[0].img + id }
        className = { Style.heroImage }
        onMouseEnter = { () => {
            setShowTooltip(true);
        }}
        onMouseMove = { event => {
            setCoordinates(calculateCoordinates(event, toolTipSize))
        }}
        onMouseLeave = { () => setShowTooltip(false) }
    >
        <div style = {{
            background: playerColor,
            height: "25px",
            width: '4px',
            marginLeft: '1px'
        }}></div>
        <img 
            src = { `https://api.opendota.com${result[0].img}` } 
            alt = ""
        />

        { showTooltip && <Tooltip 
            type = "hero" 
            coordinates = { coordinates }
            id = { result[0].id }
            toolTipSize = { toolTipSize }
        /> }

</div>
}

export default HeroImg;