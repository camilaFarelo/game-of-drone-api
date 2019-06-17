import Promise from 'bluebird';
import User from './../models/User';

export default class ValidateUniqueName {
  constructor(users) {
    this.users = users;
  }

  async fetchUsers() {
    return Promise.map(this.users, async(user) => {
      return await User.forge({name: user.name}).fetch();
    }).reduce((newArray, arr) => {
        return newArray.concat(arr);
    }, []);
  }

  async ValidateUniqueName() {
    if (!this.users.length) return true;
    const validateUsers = await this.fetchUsers();
    const isExisting = validateUsers.filter(user => user);
    if (isExisting.length) {
      throw new Error(`User name already exists.`);
    }

    return true;
  }
}