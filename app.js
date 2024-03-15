require('dotenv').config()
const express = require("express");
const serverless = require('serverless-http');
const app = express();
const busboy  = require('busboy');
const busboyBodyParser  = require('busboy-body-parser');
const morgan = require("morgan");
const cors = require("cors");
const { route } = require('./src/routes/Clinica.routes');
require('./src/models/database');


// Middleware configuration
app.use(morgan('dev')); 
app.use(express.json());
/* app.use(busboy);
app.use(busboyBodyParser); */
app.use(cors());

// Rotas
app.use('/clinica', require('./src/routes/Clinica.routes'));
app.use('/servico', require('./src/routes/servico.route'));
app.get('/', (_req, res) => {
    res.status(200).json('Ivan cheroso <3');
  });


const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(process.env);
});

module.exports = app;