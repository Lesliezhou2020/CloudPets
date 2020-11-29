const express = require('express');
const cors = require('cors');
const app = express();

require('./config/mongoose.config');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./routes/game.routes')(app);

app.listen( 8000, () => {
    console.log("Server start. Listening on port 8000");
});
