import Promise from 'bluebird';

import User from '../models/User';
import CreateGame from './CreateGame';
import bookshelf from './../../bookshelf';

export default class UserDeleteAll {
  constructor(users) {
    this.users = users;
  }

  async create() {
    return await bookshelf.transaction(async (transaction) => {
      const NewUsers = await Promise.map(this.users, async(user) => {
        return await User.forge({
          name: user.name,
        }).save();
      });
      await this._createGame(NewUsers);
      return NewUsers;
    });
  }

  async _createGame(NewUsers) {
    const createGame = new CreateGame(NewUsers);
    await createGame.createGame();
  }
}
