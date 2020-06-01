const { gql } = require('apollo-server');
const { RESTDataSource } = require('apollo-datasource-rest');

class DataAPI extends RESTDataSource {
    constructor(props) {
        super(props);
        this.baseURL = 'https://api.opendota.com/api/';
    }
    async getMatchById(match_id) {
        const data = await this.get(`matches/${match_id}`);
        return data;
    }
    async getAllHeroes(limit = 10) {
        const data = await this.get('heroes', {
            per_page: limit
        });
        return data;
    }
    async getPlayerInfo(account_id) {
        const data = await this.get(`players/${account_id}`);
        return data;
    }
    async getPlayerWinRate(account_id) {
        const data = await this.get(`players/${account_id}/wl`);
        return data;
    }
    async getHeroStats() {
        const data = await this.get(`heroStats`);
        return data;
    }
    async getRegionInfo() {
        const data = await this.get(`constants/region`);
        return data;
    }
}

const typeDefs = gql`
    type Player {
        account_id: Int
        hero_id: Int!
        kda: Int
        kills: Int
        deaths: Int
        assists: Int
        hero_damage: Int
        hero_healing: Int
        gold_per_min: Int
        denies: Int
        last_hits: Int
        tower_damage: Int
        xp_per_min: Int
        total_gold: Int
        party_id: Int
        obs_placed: Int
        isRadiant: Boolean
        camps_stacked: Int
        ability_upgrades_arr: [Int]
        player_slot: Int
        item_0: Int
        item_1: Int
        item_2: Int
        item_3: Int
        item_4: Int
        item_5: Int
        item_neutral: Int
        backpack_0: Int,
        backpack_1: Int,
        backpack_2: Int,
    }

    type Profile {
        account_id: Int
        personaname: String
        name: String
        plus: Boolean
        cheese: Int
        steamid: String
        avatar: String
        avatarmedium: String
        avatarfull: String
        profileurl: String
        last_login: String
    }
    
    type Match {
        match_id: String!
        radiant_win: Boolean!
        human_players: Int
        radiant_score: Int
        dire_score: Int
        game_mode: Int
        leagueid: Int
        lobby_type: Int
        skill: Int
        region: String
        radiant_team_id: Int
        dire_team_id: Int
        duration: Int
        radiant_xp_adv: [Int]
        radiant_gold_adv: [Int]
        players: [Player!]
    }

    type Heroes {
        id: Int
        name: String
        localized_name: String
        primary_attr: String
        attack_type: String
        legs: Int
    }

    type HeroStats {
        id: Int
        name: String
        localized_name: String
        primary_attr: String
        attack_type: String
        img: String
        icon: String
    }

    type AboutPlayer {
        solo_competitive_rank: String
        competitive_rank: String
        rank_tier: Int
        leaderboard_rank: Int
        profile: Profile!
    }

    type WinRate {
        win: Int
        lose: Int
    }

    type Query {
        getPlayerInfo(id: Int!): AboutPlayer
        getMatchById(id: String!): Match
        getAllHeroes: [Heroes]
        getHeroStats: [HeroStats]
        getPlayerWinRate(id: Int!): WinRate
    }
`

const resolvers = {
    Query: {
        getMatchById: async ( _source, { id }, { dataSources } ) => {
            return dataSources.dataAPI.getMatchById(id);// обращаемся к api apollo datasources
        },
        getAllHeroes: async ( _source, { id }, { dataSources } ) => {
            return dataSources.dataAPI.getAllHeroes();
        },
        getPlayerInfo: async ( _source, { id }, { dataSources } ) => {
            return dataSources.dataAPI.getPlayerInfo(id);
        },
        getHeroStats: async ( _source, { id }, { dataSources } ) => {
            return dataSources.dataAPI.getHeroStats();
        },
        getPlayerWinRate: async ( _source, { id }, { dataSources } ) => {
            return dataSources.dataAPI.getPlayerWinRate(id);
        }
    }
}


const Schema = {
    typeDefs,
    resolvers,
    DataAPI
}

module.exports = Schema;


//        radiant_xp_adv: [Adv]
//radiant_gold_adv: [Adv]