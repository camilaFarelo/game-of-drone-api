import bookshelf from './../../bookshelf';
const Joi = require('@hapi/joi');

const Users = bookshelf.Model.extend({
	tableName: 'users',
	validate: {
		name: Joi.string().required(),
	}
});

export default Users;