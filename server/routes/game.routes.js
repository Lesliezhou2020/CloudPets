const GameController = require('../controllers/game.controller');
module.exports = function(app){
    app.get('/api/game/:token', GameController.loadGame);
    app.get('/api/exists/:token', GameController.exists);
    app.post('/api/newgame', GameController.createGame);
    app.put('/api/game/:id', GameController.updateGame);
}