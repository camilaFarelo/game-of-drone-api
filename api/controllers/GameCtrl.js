
import Game from './../models/Game';
import GameFetcher from '../services/GameFetcher';
import GameUpdater from '../services/GameUpdater';
import sendError from './../utils/sendError';

class GameCtrl {
  async put(req, res) {
    try {
      const {game} = await req.body;
      let gameRecord = await Game.forge({id: game.id}).fetch();
      const updater = new GameUpdater(gameRecord, game);
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
      const gameFetcher = new GameFetcher(req.query);
      const fetchedGame = await gameFetcher.fetcher();
      res.status(200).json(fetchedGame);
    } catch (e) {
      sendError(res);
    }
  }
}

export default new GameCtrl();