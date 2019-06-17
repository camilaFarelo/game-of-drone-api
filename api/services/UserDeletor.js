import User from '../models/User';
import Game from '../models/Game';;
import bookshelf from './../../bookshelf';

export default class UserDeletor {
  constructor(id) {
    this.id = id;
  }

  async delete() {
    return await bookshelf.transaction(async (transaction) => {
      await this._removeGame(transaction);
      return await this.deleteResource(transaction);
    });
  }

  async deleteResource(transaction) {
    return await User
      .forge({id: this.id})
      .destroy(null, {transacting: transaction});
  }


  async _removeGame(transaction) {
    const game = await Game.query((qb) => {
      qb
        .distinct()
        .groupBy('games.id')
        .joinRaw(`
          INNER JOIN (
            SELECT id, jsonb_array_elements(games.first_player->'player') AS player_obj FROM games
          ) r_a on r_a.id = games.id
        `)
        .whereRaw(`r_a.player_obj->>'player_id' = '${this.id}'`)
    }).fetch();
    game.destroy(null, {transacting: transaction});
  }
}
