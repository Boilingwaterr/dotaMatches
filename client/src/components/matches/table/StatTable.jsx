import React from 'react';
import Style from './StatTable.module.css';
import { Query } from '@apollo/react-components';
import { getItemImgUrlFromItemKey, defineData } from '../../../utility/index';
import HeroImg from './HeroImgTable';
import ItemImg from './ItemImgTable';
import PlayerInfo from './PlayerInfoTable';
import { GET_PLAYER_INFO, GET_HERO_STATS } from '../../../graphql-cli/queries';
// import SkillBuild from './SkillBuildComponent';

const StatTable = props => {

    const { data, isRadiant, colorRadiant, colorDire } = props;

    const headers = [
        'Герой', 'Игрок', 'Убийства',
        'Смерти', 'Помощь', 'ОЦ',
        'Добито', 'Н/О', 'З/М',
        'О/М', 'Урон',
        'Лечение ', 'УПС', 'Предметы'
    ];
    
    const filteredTeam = data.getMatchById.players.filter( item => {
        return item.isRadiant === isRadiant;
    });

    return (
        <article className = { Style.tableWrapper }>
            <table className = { Style.statTable }>
                <thead>
                    <tr>
                        {
                            headers.map( item => {
                                return <th key = { item } >
                                        <div className = { Style.headers }>{ item }</div>
                                    </th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                { filteredTeam.map( ( item ) => {
                    let id;
                    item.account_id ? id = item.account_id : id = 0;
                    //получаем предметы игроков 
                    const itemArray = [
                        item.item_0,
                        item.item_1,
                        item.item_2,
                        item.item_3,
                        item.item_4,
                        item.item_5
                    ];
                    
                    const itemImg = getItemImgUrlFromItemKey(itemArray);
                    const neutralItemImg = getItemImgUrlFromItemKey([item.item_neutral]);
                    const backPackItemImg = getItemImgUrlFromItemKey([
                        item.backpack_0,
                        item.backpack_1,
                        item.backpack_2
                    ]);

                    let color = '#000000';
                    item.isRadiant ?  color = colorRadiant : color = colorDire;

                    return <tr key = { item.account_id }>
                            <Query query = { GET_HERO_STATS }>
                                {({ loading, error, data }) => {
                                    if (loading) return <td><div>Loading…</div></td>;
                                    if (error) return <td><div>Error</div></td>;
                                    if (data.getHeroStats !== undefined) {
                                        //определить цвет слота игрока
                                        const playerColor = defineData(item.player_slot, 'player_colors');
                                        //фильтруем всех героев для выведения иконки героя
                                        const result = data.getHeroStats.filter( filter => {
                                            return filter.id === item.hero_id
                                        });
                                        if (result !== undefined)
                                            return <td className = { Style.firstColumn }>     
                                                    <HeroImg 
                                                        result = { result }
                                                        id = { item.account_id }
                                                        playerColor = { playerColor }
                                                    />
                                                </td>
                                    } else {
                                        return <td>
                                            <div>NOTHING TO RETURN</div>
                                        </td>
                                    }
                                }} 
                            </Query>
                            <Query query = { GET_PLAYER_INFO } variables = { { id } }>
                                {({ loading, error, data }) => {
                                    if (loading) return <td><div>Loading…</div></td>;
                                    //if (error) console.log(error)//return <td><div>Error</div></td>
                                    if (data === undefined) return <td className = { Style.playerWrapper }>
                                        <div  className = { Style.anonymWrapper }>
                                            <p>Аноним</p>
                                        </div>
                                    </td>;
                                    else {
                                        return <td
                                                key = { item.steamid }
                                                className = { Style.playerWrapper }>
                                                <PlayerInfo  
                                                    key = { item } 
                                                    data = { data }
                                                    color = { color }
                                                    id = { id }
                                                />
                                        </td>
                                    }
                                }} 
                            </Query>
                            <td>
                                <div><p>{ item.kills }</p></div>
                            </td >
                            <td>
                                <div><p>{ item.deaths }</p></div>
                            </td>
                            <td>
                                <div><p>{ item.assists }</p></div>
                            </td>
                            <td>
                                <div><p>{ item.total_gold }</p></div>
                            </td>
                            <td>
                                <div><p>{ item.last_hits }</p></div>
                            </td>
                            <td> 
                                <div><p>{ item.denies }</p></div>
                            </td>
                            <td>
                                <div><p>{ item.gold_per_min }</p></div>
                            </td>
                            <td>
                                <div><p>{ item.xp_per_min }</p></div>
                            </td>
                            <td>
                                <div><p>{ item.hero_damage }</p></div>
                            </td>
                            <td>
                                <div><p>{ item.hero_healing }</p></div>
                            </td>
                            <td>
                                <div><p>{ item.tower_damage }</p></div>
                            </td>
                            <td style = { {width: '272px'} }>
                                <ItemImg 
                                    itemImg = { itemImg }
                                    neutralItemImg = { neutralItemImg }
                                    backPackItemImg = { backPackItemImg }
                                />
                            </td>
                            <td>    
                                <div className = { Style.switchButton }>
                                </div>
                            </td>
                            {/* <SkillBuild show = { true }/> */}
                        </tr>
                })}
                </tbody>
                <tfoot>
                </tfoot>
            </table>
        </article>
    );
};

export default StatTable;