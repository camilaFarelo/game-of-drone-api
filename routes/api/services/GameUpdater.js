import Game from './../models/Game';;

export default class GameUpdater {
  constructor(record, request) {
    this.record = record;
    this.data = request
  }

  async update() {
    console.log(this.record);
    return await Game.forge({id: this.record.id}).save(
      {rounds: this.record},
      {method: 'update', transacting: transaction}
    );
  }
}
