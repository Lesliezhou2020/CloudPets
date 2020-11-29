const { Game } = require('../models/game.model'); 
const { response } = require('express');

module.exports.createGame = (request, response) => {
    let tok = GetToken();
    Game.create({
        token: tok,
        fullness: 20,
        happiness: 20,
        meals: 3,
        energy: 50
    })
        .then(game => response.json(game))
        .catch(err => response.json(err));
};

module.exports.exists = (request, response) => {
    Game.exists({ token: request.params.token }, function(err, result) {
        if (err) {
            console.log(err);
            response.json(err);
        } else {
            response.json(result);
        }
    });
}

module.exports.loadGame = (request, response) => {
    console.log("Retrieving " + request.params.token);
    Game.findOne({token:request.params.token})
        .then(game => response.json(game))
        .catch(err => response.json(err));
};

module.exports.updateGame = (request, response) => {
    Game.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedGame => response.json(updatedGame))
        .catch(err => response.json(err))
}

const GetToken = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return chars[Math.floor(Math.random() * chars.length)] +
        chars[Math.floor(Math.random() * chars.length)] +
        chars[Math.floor(Math.random() * chars.length)] +
        chars[Math.floor(Math.random() * chars.length)] +
        chars[Math.floor(Math.random() * chars.length)] +
        chars[Math.floor(Math.random() * chars.length)];
}