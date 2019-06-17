import Game from './../models/Game';;

export default class UserCreator {
  constructor(users) {
    this.users = users;
  }

  async createGame() {
    if (!this.users.length) return true;
    const game = await Game.forge({
      first_player: {
        player: [
          {
            player_id: this.users[0].attributes.id,
            player_name: this.users[0].attributes.name,
          },
        ]
      },
      second_player: {
        player: [
          {
            player_id: this.users[1].attributes.id,
            player_name: this.users[1].attributes.name,
          }
        ]
      },
    }).save();
    return game;
  }
}
