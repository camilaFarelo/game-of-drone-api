import Game from './../models/Game';;

export default class GameUpdater {
  constructor(record, request) {
    this.record = record;
    this.data = request
  }

  async update() {
    const updateData = {
      round: [
        ...this.data.round
      ]
    };
    try {
      const savedGame = await Game.forge({id: this.record.id}).save(
        {rounds: updateData},
        {method: 'update'}
      );
      return savedGame;
    } catch (e) {
      console.log(e);
      return e;
    }
    
  }
}
