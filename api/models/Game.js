import bookshelf from './../../bookshelf';
const Joi = require('@hapi/joi');

const Game = bookshelf.Model.extend({
  tableName: 'games',
  executeOnInitialize() {
    this.on('saving', this._getUsers);
  },
	validate: {
		first_player: Joi.object(),
    second_player: Joi.object(),
    rounds: Joi.object(),
  },
});

export default Game;