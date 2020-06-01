import React from 'react';
import Style from './PlayerCard.module.css';
import { constants } from '../../constants';

const PlayerCard = props => {

    const { data, winRate } = props;
    const { colorRadiant, colorDire } = constants;
    let wr;
    winRate !== null ? wr = winRate.win / ( winRate.win + winRate.lose ) * 100 : wr = 'loading';

    const getDotaPlusBadge = plus => plus && (
        <div className = { Style.dotaPlusMedal }>
          <img
            src = "https://www.opendota.com/assets/images/dota2/dota_plus_icon.png"
            alt = "icon"
          />
        </div>
    );

    let color;

    wr > 50 ? color = colorRadiant : color = colorDire;

    const getRankMedal = (rankTier, leaderboardRank) => {
        let medalElement = null;
        let baseIconUrl = 'https://www.opendota.com/assets/images/dota2/rank_icons';
        if (rankTier) { 
            let iconPath;
            if (leaderboardRank) { 
                if (leaderboardRank <= 10) { 
                    iconPath = `${baseIconUrl}/rank_icon_8c.png`;
                } else if (leaderboardRank <= 100) {
                    iconPath = `${baseIconUrl}/rank_icon_8b.png`;
                } else {
                    iconPath = `${baseIconUrl}/rank_icon_8.png`;
                }
                medalElement = (
                    <div className = { Style.rankTierContainer }>
                        <img src = { iconPath } alt = "icon" />
                        { leaderboardRank && <span className = { Style.rankMedalBoard } >
                            { leaderboardRank }
                        </span> }
                    </div>
                );
        } else {
            const intRankTier = parseInt(rankTier, 10);

            let star = intRankTier % 10;

            if (star < 1) {
              star = 1;
            } else if (star > 7) {
              star = 7;
            }
      
            const starPath = `${baseIconUrl}/rank_star_${star}.png`;

            iconPath = `${baseIconUrl}/rank_icon_${Math.floor(intRankTier / 10)}.png`;
            medalElement = (
              <div className = { Style.rankTierContainer }>
                  <img src = { iconPath } alt = "icon" />
                  {(star !== 0) ? <img className = { Style.rankMedalStar } src = { starPath } alt = "star" /> : ''}
                  { leaderboardRank && <span className = { Style.rankMedalBoard } >
                        { leaderboardRank }
                    </span> }
              </div>
            );
        }
        } else {
            const iconPath = `${baseIconUrl}/rank_icon_0.png`;
            medalElement = (
            <div className = { Style.rankTierContainer }>
                <img src = { iconPath } alt = "icon" />
            </div>
            );
        }
        return medalElement;
    };

    if ( data !== undefined ) return <div
        key = { data.getPlayerInfo.profile.avatarmedium + data.getPlayerInfo.profile.personaname } 
        className = { Style.container }
    >
        <div className = { Style.aboutPlayer }>
            <div>
                <img src = { data.getPlayerInfo.profile.avatarmedium } alt = " "/>
            </div>
            <div>
                <h3>{ data.getPlayerInfo.profile.personaname }</h3>
            </div>
            <div className = { Style.rankTier }> 
                <div className = { Style.iconWrapper }> 
                    { getDotaPlusBadge(data.getPlayerInfo.profile.plus) } 
                </div>
                <div className = { Style.iconWrapper }> 
                    { getRankMedal(data.getPlayerInfo.rank_tier, data.getPlayerInfo.leaderboard_rank) }
                </div>
            </div>
        </div>
        <div className = { Style.playerInfo }>
        { winRate && <div className = { Style.winRate }>
            <div className = { Style.winratewrapper }>
                <h4>Побед: </h4>
                <h4 style = { { color: colorRadiant } }>{ winRate.win }</h4>
            </div>
            <div className = { Style.winratewrapper }>
                <h4>Поражений: </h4>
                <h4 style = { { color: colorDire } }>{ winRate.lose }</h4>
            </div>
            <div className = { Style.winratewrapper }>
                <h4>Доля побед: </h4>
                <h4 style = { { color } }>{`${wr.toFixed(2)}%`}</h4>
            </div>  
            </div>} 
        </div>
    </div>
    else {
        return <div>
            Error
        </div>
    }
}

export default PlayerCard; 