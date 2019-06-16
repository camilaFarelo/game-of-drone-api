import Game from '../models/Game';;

export default class GameFetcher {
  constructor(users) {
    this.users = users;
  }

  async fetcher() {
    if (!this.users) return true;
    const games = await Game.query((qb) => {
        qb
          .distinct()
          .groupBy('games.id')
          .joinRaw(`
            INNER JOIN (
              SELECT id, jsonb_array_elements(games.first_player->'player') AS player_obj FROM games
            ) r_a on r_a.id = games.id
          `)
          .joinRaw(`
            INNER JOIN (
              SELECT id, jsonb_array_elements(games.second_player->'player') AS player_obj FROM games
            ) r_b on r_b.id = games.id
          `)
          .whereRaw(`r_a.player_obj->>'player_id' = '${this.users.first_player_id}'`)
          .whereRaw(`r_b.player_obj->>'player_id' = '${this.users.second_player_id}'`);
      }).fetch();
      return games;
  }
  
}
