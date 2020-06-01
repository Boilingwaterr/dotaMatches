import { gql } from "apollo-boost";

export const GET_ALL_HEROES = gql`
{
    getAllHeroes{
        id
        name
        localized_name
    }
}
`

export const GET_MATCH_BY_ID = gql`
    query($id: String!){
        getMatchById(id: $id){
            match_id
            duration
            radiant_win
            human_players
            radiant_score
            dire_score
            game_mode
            leagueid
            lobby_type
            skill
            region
            radiant_team_id
            dire_team_id
            radiant_xp_adv
            radiant_gold_adv
            players {
                account_id
                hero_id
                kills
                deaths
                assists
                hero_damage
                hero_healing
                gold_per_min
                xp_per_min
                denies
                last_hits
                tower_damage
                total_gold
                party_id
                obs_placed
                isRadiant
                camps_stacked
                ability_upgrades_arr
                player_slot
                item_0
                item_1
                item_2
                item_3
                item_4
                item_5
                item_neutral
                backpack_0
                backpack_1
                backpack_2
            }
        }
    }
`

export const GET_PLAYER_INFO = gql`
    query($id: Int!){
        getPlayerInfo(id: $id){
            solo_competitive_rank
            competitive_rank
            rank_tier
            leaderboard_rank
            profile {
                account_id
                personaname
                name
                plus
                profileurl
                avatar
                avatarmedium
                plus
                steamid
            }
        }
    }
`

export const GET_PLAYER_WINRATE = gql`
    query($id: Int!){
        getPlayerWinRate(id: $id){
            win
            lose
        }
    }
`

export const GET_HERO_STATS = gql`
    {
        getHeroStats {
            id
            name
            localized_name
            primary_attr
            attack_type
            img
            icon
        }
    }
`