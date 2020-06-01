import React from 'react';
import Style from './MatchInfo.module.css';
import { defineData, formatTime, overViewHeaders } from '../../utility/index';

const MatchInfo = props => {
    const { data, colorRadiant, colorDire } = props;

    let region = defineData(data.getMatchById.region, 'region');
    let skill =  overViewHeaders(data.getMatchById.skill, 'skill');
    let lobby_type = overViewHeaders(data.getMatchById.lobby_type, 'lobby_type');
    let game_mode = overViewHeaders(data.getMatchById.game_mode, 'game_mode');

    return (
        <div className = { Style.matchInformation }>
            <div style = {{color: "#C1C1C1"}}>
                <div className = { Style.matchId }>
                    <div className = { Style.headersWrapper }>
                        <div><h2>Номер матча:</h2></div>
                        <div className = { Style.headers }>
                            {data.getMatchById.match_id}
                        </div>
                    </div>
                </div>
                <div className = { Style.headerContainer }>
                    <div className = { Style.headersWrapper }>
                        <div>Регион:</div>
                        <div className = { Style.headers }>
                            { region }
                        </div>
                    </div>
                    <div className = { Style.headersWrapper }>
                        <div>Уровень мастерства:</div>
                        <div className = { Style.headers }>
                            { skill }
                        </div>
                    </div>
                    <div className = { Style.headersWrapper }>
                        <div>Тип лобби:</div>
                        <div className = { Style.headers }>
                            { lobby_type }
                        </div>
                    </div>
                    <div className = { Style.headersWrapper }>
                        <div>Мод игры:</div>
                        <div className = { Style.headers }>
                            { game_mode }
                        </div>
                    </div>
                </div>                
            </div>
            <div className = { Style.winnerWrapper }>
                <div className = { Style.winner }>
                    { data.getMatchById.radiant_win && 
                    <h4 style = {{color: colorRadiant}}>Победа сил света!</h4> }
                </div>
                <div className = { Style.score }>
                    <h1 style = {{color: colorRadiant}}>
                        {data.getMatchById.radiant_score} 
                    </h1>
                    <h4 style = {{color: '#c1c1c1'}}>
                        { formatTime(data.getMatchById.duration) }
                    </h4>
                    <h1 style = {{color: colorDire}}>
                        {data.getMatchById.dire_score}
                    </h1>               
                </div>
                <div className = { Style.winner }>
                    { !data.getMatchById.radiant_win && 
                    <h4 style = {{color: colorDire}}>Победа сил Тьмы!</h4> }
                </div>
            </div>
        </div>
    )
}

export default MatchInfo;