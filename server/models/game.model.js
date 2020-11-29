const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    token: {type: String},
    fullness: {type: Number},
    happiness: {type: Number},
    meals: {type: Number},
    energy: {type: Number}
}, {timestamps: true});

module.exports.Game = mongoose.model('Game', GameSchema);
