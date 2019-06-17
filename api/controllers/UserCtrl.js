import User from './../models/User';
import sendError from './../utils/sendError';
import ValidateUniqueName from './../services/ValidateUniqueName';
import UserDeletor from './../services/UserDeletor';
import UsersDelete from '../services/UsersDelete';
import UsersCreator from '../services/UsersCreator';


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
      console.log(e);
      sendError(res);
    }
  }

  async post(req, res) {
    try {
      const {users} = req.body;
      const validateUniqueName = new ValidateUniqueName(users);
      await validateUniqueName.ValidateUniqueName();
      const usersCreator = new UsersCreator(users);
      const NewUsers = await usersCreator.create(); 
      res.status(200).json(NewUsers);
    } catch (e) {
      console.log(e);
      sendError(res);
    }
  }


  async delete(req, res) {
    try {
      const { id } = req.params;
      if (id) {
        const deletor = new UserDeletor(id);
        await deletor.delete();
      } else {
        const deleteUsers = new UsersDelete(req.query);
        await deleteUsers.delete();
      }      
      res.status(200).json({});
    } catch(e) {
      console.log(e);
      sendError(res);
    }
  }
}
  
export default new UserCtrl();