import React, { useState } from 'react';
import Style from './MatchResults.module.css';
import StatTable from './table/StatTable';
import MatchInfo from './MatchInfo';
import LinearGraphsWithFill from './graphs/LinearGraphsWithFill.jsx';
import FindField from '../FindField';
import { constants } from '../constants.js';

const MatchResults = (props) => {

    const [ modeGraphs, setModeGraphs ] = useState('gold');

    const { data } = props;
    const { colorRadiant, colorDire } = constants;

    return (
        <div>
            <div className = { Style.findWrapper }>
                <FindField { ...props } />
            </div>
            <div>
                <MatchInfo 
                    { ...props }
                    colorRadiant = { colorRadiant } 
                    colorDire = { colorDire } 
                />
            </div>
            <div className = { Style.tableCard }>
                <h2 style = {{color: colorRadiant}}>Силы света</h2>
                <StatTable 
                    { ...props }
                    isRadiant = { true }
                    colorRadiant = { colorRadiant } 
                    colorDire = { colorDire } 
                />
            </div>
            <div className = { Style.tableCard }>
                <h2 style = {{color: colorDire}}>Силы тьмы</h2>
                <StatTable 
                    { ...props }
                    isRadiant = { false }
                    colorRadiant = { colorRadiant } 
                    colorDire = { colorDire } 
                />
            </div>
            <div className = { Style.graphsWrapper }>
                <div className = { Style.buttons }>
                    <span 
                        className = { modeGraphs === 'gold' ? Style.activeSpan : undefined }
                        onClick = { () => setModeGraphs('gold') }
                    >
                        <p>Золото</p>
                    </span>
                    <span 
                        className = { modeGraphs === 'exp' ? Style.activeSpan : undefined }
                        onClick = { () => setModeGraphs('exp') }
                    >
                        <p>Опыт</p>
                    </span>
                </div>
                <div className = { Style.graphs }>         
                        {
                            modeGraphs === 'gold' && 
                            <div>
                                {
                                    data.getMatchById.radiant_gold_adv ?
                                    <LinearGraphsWithFill 
                                        data = { data.getMatchById.radiant_gold_adv }
                                        width = { 700 }
                                        height = { 320 }
                                    />
                                    : <p>График еще не готов</p>
                                }
                            </div> 
                        }
                        {
                            modeGraphs === 'exp' && 
                            <div>
                                {
                                    data.getMatchById.radiant_xp_adv ?
                                    <LinearGraphsWithFill 
                                        data = { data.getMatchById.radiant_xp_adv } 
                                        width = { 700 }
                                        height = { 320 }
                                    /> : <p>График еще не готов</p>
                                }
                            </div> 
                        }
                </div> 
            </div>
        </div>
    )
}

export default MatchResults;