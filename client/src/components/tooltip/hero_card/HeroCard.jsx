import React from 'react';
import Style from './HeroCard.module.css';
import { getStatsBonuses } from '../../../utility';

const HeroCard = props => {
    
    const heroInfo = getStatsBonuses(props.id);

    const strng = 'https://ru.dotabuff.com/assets/hero_str-eac64b6191e66b593d7f1ac81bb262afed6565794d8f9014d66b0cbc99fa3d01.png';
    const int = 'https://ru.dotabuff.com/assets/hero_int-76ea2af3bdf60a1c92d82a1fc0845d47a071cfacfca111aa2d5e43fbae01b580.png';
    const agi = 'https://ru.dotabuff.com/assets/hero_agi-693306f455235ff5628c3429a80f2dc7e7795c013c540832dbba61ab691a73b5.png';

    const mainAttr = attr => {

        const style = {width: "30px", height: "30px"};

        switch (attr) {
            case 'agi':
                return <img style = {style} src = { agi } alt = " "/>
            case 'str':
                return <img style = {style} src = { strng } alt = " "/>
            case 'int':
                return <img  style = {style} src = { int } alt = " "/>
            default:
                break;
        }
    }
    if (heroInfo === 'error') {
        return <div className = { Style.error }>
            <h2>Error!</h2>
        </div>
    } else {
        return <div key = { heroInfo.localized_name }>
            <div className = { Style.name }>
                <div>
                    <img src = { `https://api.opendota.com${heroInfo.img}` } alt = " "/>
                </div>
                <h3>{heroInfo.localized_name}</h3>
            </div>
            <div className = { Style.mainInfo }> 
                <div>
                    <div className = { Style.mainAttr }>
                        <p>Главный атрибут: </p>
                        { mainAttr(heroInfo.primary_attr) }
                    </div>
                    <div>
                        <p>Базовый урон: {`${ heroInfo.base_attack_min } - ${ heroInfo.base_attack_max }`}</p>
                    </div>
                    <div>
                        <p>Базовая броня: { heroInfo.base_armor }</p>
                    </div>
                    <div>
                        <p>Базовая скорость передвижения: { heroInfo.move_speed }</p>
                    </div>
                </div>
            </div>
            <div className = { Style.info }>
                <h4>Роли:</h4>
                { heroInfo.roles.map( item => <p key = { item }>{ item }</p>) }
            </div>
            <div className = { Style.attr }>
                <div>
                    <img src = { strng } alt = "str"/>
                    <p>{`${heroInfo.base_str} + ${heroInfo.str_gain}`}</p>
                </div>
                <div>
                    <img src = { agi } alt = "agi"/>   
                    <p>{`${heroInfo.base_agi} + ${heroInfo.agi_gain}`}</p>
                </div>
                <div>
                    <img src = { int } alt = "int"/>
                    <p>{`${heroInfo.base_int} + ${heroInfo.int_gain}`}</p>
                </div>
            </div>
        </div>
    }
}

export default HeroCard;