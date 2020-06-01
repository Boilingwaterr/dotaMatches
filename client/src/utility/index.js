// define region, hero data, etc...
export const defineData = (data, header) => {
    const obj = JSON.parse(localStorage.getItem(header));
    let modifedData;
    Object.keys(obj).filter( key => {        
        if (data.toString() === key) {
            return modifedData = obj[key];
        };
        return null;
    })
    return firstChartoUpperCase(modifedData.toLowerCase());
}      

const firstChartoUpperCase = str => {
    if (!str) return str
    return str[0].toUpperCase() + str.slice(1);
}

export const overViewHeaders = (data, type) => {
    let obj = JSON.parse(localStorage.getItem(type));
    switch (type) {
        case 'lobby_type':
            let lobby_type;
            if (data) {
                Object.keys(obj).filter( key => { 
                    if (data.toString() === key) {
                        return lobby_type = obj[key].name.replace('lobby_type_', '').replace(/_/gi, ' ');
                    };
                    return null;
                });
                return firstChartoUpperCase(lobby_type);
            };
            return "Unknown lobby type";
        case 'skill':
            let skill;
            let skillBrakcet = [
                { id: 1, skill: 'Normal skill' },
                { id: 2, skill: 'High skill' },
                { id: 3, skill: 'Very high skill' }
            ];
            if (data) {
                skillBrakcet.filter( i => {
                    if(data === i.id) return skill = i.skill;
                    return null;
                });
                return skill;
            };
            return 'Unknown skill';

        case 'game_mode':
            let game_mode;
            if (data) {
                Object.keys(obj).filter( key => { 
                    if (data.toString() === key) {
                        return game_mode = obj[key].name.replace('game_mode_', '').replace(/_/gi, ' ');
                    };
                    return null;
                });
                return firstChartoUpperCase(game_mode);
            };
            return 'Unknown game mode';
        default:
            break;
    }
}

export const getItemImgUrlFromItemKey = ItemKeys => {
    const obj = JSON.parse(localStorage.getItem('items'));
    let arr = [];    
    Object.keys(obj).filter( key => {
        ItemKeys.map(i => {
            if(obj[key].id === i){
                return arr = [...arr, obj[key].img]
            }
            return null;
        })
        return null;
    })
    return arr;
};

export const getHeroInfo = heroId => {
    const obj = JSON.parse(localStorage.getItem('heroes'));
    if(obj === null) {

        return 'error';
    } else { 
        let hero = {};
        Object.keys(obj).filter( key => {
            if (heroId === obj[key].id) return hero = obj[key]
            return null
        })
        return hero;
    }
}

export const calculateCoordinates = (event, dimensions) => {
    if (event.clientY + dimensions.height >= window.innerHeight) {//тултип не должен заходить за видимую область
        return {
            left: event.clientX + 15,
            top: window.innerHeight - dimensions.height - 1 +  window.scrollY// 1px для тени
        }
    } else {
        return {
            left: event.clientX + 15,
            top: event.clientY + window.scrollY + 15
        }
    }    
}

export const formatTime = inputTime => {
    const hours =  Math.floor((inputTime / 60) / 60);
    const minutes =  Math.floor((inputTime / 60) - hours * 60);
    const seconds = inputTime % 60;
   
    const timeDuration = hours === 0 ?
     `${ minutes }:${ seconds }` : `${ hours }:${ minutes }:${ seconds }`;

    return timeDuration;
}

//расчитать бонусы от атрибутов(взято с опендота опенсорс)
export const getStatsBonuses = heroId => {

    const hero = getHeroInfo(heroId);

    const statsBonuses = {

        str: {
          attackDamage: 1,
          armor: 0.16,
          health: 22.5,
          health_regen: 0.69,
          mana: 12,
          mana_regen: 1.8,
          mr: 0.1,
          move_speed: 0.05,
          attack_speed: 1,
        },

        int: {
          attackDamage: 1,
          armor: 0.16,
          health: 18,
          health_regen: 0.55,
          mana: 15,
          mana_regen: 2.25,
          mr: 0.08,
          move_speed: 0.05,
          attack_speed: 1,
        },

        agi: {
          attackDamage: 1,
          armor: 0.2,
          health: 18,
          health_regen: 0.55,
          mana: 12,
          mana_regen: 1.8,
          mr: 0.08,
          move_speed: 0.063,
          attack_speed: 1.25,
        },
    };

    const {
        primary_attr,
        base_attack_max,
        base_attack_min,
        base_armor,
        base_health,
        base_health_regen,
        base_mana,
        base_mana_regen,
        base_mr,
        base_move_speed,
        attack_rate,
    } = hero;
    
    const primaryAttrValue = hero[`base_${primary_attr}`];
    const [agiValue, strValue, intValue] = [hero.base_agi, hero.base_str, hero.base_int];
    
    const round = value => Math.round(value * 100) / 100;
    
    return {
        ...hero,
        base_attack_min: base_attack_min + (statsBonuses[primary_attr].attackDamage * primaryAttrValue),
        base_attack_max: base_attack_max + (statsBonuses[primary_attr].attackDamage * primaryAttrValue),
        base_armor: round(base_armor + (statsBonuses[primary_attr].armor * agiValue)),
        base_health: round(base_health + (statsBonuses[primary_attr].health * strValue)),
        base_health_regen: round(base_health_regen + (base_health_regen * (statsBonuses[primary_attr].health_regen * strValue / 100))),
        base_mana: round(base_mana + (statsBonuses[primary_attr].mana * intValue)),
        base_mana_regen: round(base_mana_regen + (base_mana_regen * (statsBonuses[primary_attr].mana_regen * intValue / 100))),
        base_mr: round(base_mr + (base_mr * (statsBonuses[primary_attr].mr * strValue / 100))),
        base_move_speed: round(base_move_speed + (base_move_speed * (statsBonuses[primary_attr].move_speed * agiValue / 100))),
        attack_rate: round(1.7 / (attack_rate / (1 + ((statsBonuses[primary_attr].attack_speed * agiValue) / 100))) * 100), // ingame representation of attack speed
    };
}

export const generateKeys = {

    keys: new Set(),

    getRandomKey(keyFor = '', min, max, size) {
        const key = new Set();
        
        while (key.size !== size) {
            const rnd = Math.floor(Math.random()*(max - min + 1) + min) + keyFor
            key.add(rnd);
            this.keys.add(rnd)
        }
        return key;
    }
}