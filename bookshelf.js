import knex from 'knex';
import bookshelf from 'bookshelf';

const dbConfig = require('./knexfile');

const configuredKnex = knex(dbConfig.development);

export default bookshelf(configuredKnex);