
import Game from './../models/Game';
import GameFetcher from '../services/GameFetcher';
import GameUpdater from '../services/GameUpdater';
import sendError from './../utils/sendError';

class GameCtrl {
  async put(req, res) {
    const {game} = await req.body;
    console.log('round--put', game);
    try {
      let gameRecord = await Game.forge({id: game.id}).fetch();
      const updater = new GameUpdater(gameRecord, req.body);
      gameRecord = await updater.update();
      const updatedGame = await gameRecord.refresh();
      res.status(200).json(updatedGame);
    } catch (e) {
      console.log(e);
      sendError(res);
    }
  }

  async get(req, res) {
    try {
      const {first_player_id, second_player_id} = req.query;
      const gameFetcher = new GameFetcher({first_player_id, second_player_id});
      const fetchedGame = await gameFetcher.fetcher();
      res.status(200).json(fetchedGame);
    } catch (e) {
      sendError(res);
    }
  }
}

export default new GameCtrl();