import Promise from 'bluebird';

import User from './../models/User';
import sendError from './../utils/sendError';
import ValidateUniqueName from './../services/ValidateUniqueName';
import CreateGame from './../services/CreateGame';


class UserCtrl {
  async get(req, res) {
    try {
      const { id } = req.params;
      const {users_name} = req.query;
      let usersResults;
      if (id) {
        usersResults = await User.forge({id: id}).fetch();
      } else {
        if (users_name.length) {
          usersResults = await users_name.forEach(async(user) => {
            const parseUser = JSON.parse(user);
            return await User.forge({
              name: parseUser.name,
            }).fetchAll();
          });
        } else {
          usersResults = await User.forge().fetchAll();
        }
      }
      res.status(200).json(usersResults);
    } catch (e) {
      sendError(res);
    }
  }

  async post(req, res) {
    try {
      const {users} = req.body;
      const validateUniqueName = new ValidateUniqueName(users);
      await validateUniqueName.ValidateUniqueName();
      const NewUsers = await Promise.map(users, async(user) => {
        return await User.forge({
          name: user.name,
          total_win: '0',
        }).save();
      });
      const createGame = new CreateGame(NewUsers);
      const game = await createGame.createGame();
      res.status(200).json(NewUsers);
    } catch (e) {
      sendError(res);
    }
  }
}
  
export default new UserCtrl();