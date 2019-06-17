import User from '../models/User';
import Game from '../models/Game';;
import bookshelf from './../../bookshelf';

export default class UserDelete {
  constructor(users) {
    this.users = users;
  }

  async delete() {
    return await bookshelf.transaction(async (transaction) => {
      await this._removeGame(transaction);
      return await this.deleteResource(transaction);
    });
  }

  async deleteResource(transaction) {
    console.log('deleteResource', this.users);
    return await Object.values(this.users).forEach(async(user) => {
      return await User.forge({
        id: user,
      }).destroy(null, {transacting: transaction});
    });
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
        .whereRaw(`r_a.player_obj->>'player_id' = '${this.users.player_1}'`)
    }).fetch();
    if (game) game.destroy(null, {transacting: transaction});
  }
}
