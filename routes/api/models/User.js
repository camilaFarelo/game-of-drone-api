import bookshelf from './../../../bookshelf';
const Joi = require('@hapi/joi');

const Users = bookshelf.Model.extend({
	tableName: 'users',
	validate: {
		name: Joi.string().required(),
		total_win: Joi.string().allow(null).allow(''),
	}
});

export default Users;