var assert = require('assert');
import User from './../api/models/User';
import UsersCreator from './../api/services/UsersCreator';
import CreateGame from './../api/services/CreateGame';
import GameFetcher from './../api/services/GameFetcher';
import UserDeletor from './../api/services/UserDeletor';

describe('BrokerGroups Creator', () => {

  it('should create a User', async () => {
    const req = [{name: 'Player1' }, {name: 'Player2' }];
    const creator = new UsersCreator(req);
    const newUsers = await creator.create();
    assert.equal(newUsers.length, req.length);
    assert.equal(newUsers[0].attributes.name, req[0].name);
  });

  it('should create a Game', async () => {
    const req = [{name: 'Player1' }, {name: 'Player2' }];
    const creator = new UsersCreator(req);
    const newUsers = await creator.create();
    const creatorGame = new CreateGame(newUsers);
    const newGame = await creatorGame.createGame();
    const {attributes: {first_player, second_player}} = newGame;
    assert.equal(first_player.player[0].player_name, req[0].name);
    assert.equal(second_player.player[0].player_name, req[1].name);
  });

  it('should create a fetch Game', async () => {
    // create Data
    const req = [{name: 'Player1' }, {name: 'Player2' }];
    const creator = new UsersCreator(req);
    const newUsers = await creator.create();
    const creatorGame = new CreateGame(newUsers);
    await creatorGame.createGame();
    const parseData = {
      first_player_id: newUsers[0].attributes.id,
      second_player_id: newUsers[1].attributes.id,
    }
    const gameFetcher = new GameFetcher(parseData);
    const fetchedGame = await gameFetcher.fetcher();
    const {attributes: {first_player, second_player}} = fetchedGame;
    assert.equal(first_player.player[0].player_name, req[0].name);
    assert.equal(second_player.player[0].player_name, req[1].name);
  });
});