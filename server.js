require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { errorHandler } = require('./helpers/error-handler');
const PORT = process.env.PORT || 8000;
// EPRESS BODY PARSER
app.use(express.json({ limit: '100mb' }), (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err)
        return res.status(400).send({ status: 404, message: err.message }); // Bad request
    next();
});
app.use(express.urlencoded({ extended: true }));
// HELMAT
app.use(helmet());
// CORS NPM
app.use(cors());
// CONNECT TO DATABASE
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(async (_conn) => {
    console.log(`\x1b[32m\x1b[1mINFO  [ MONGO ]\x1b[0m\x1b[32m Connected to ${/[^/]*$/.exec(process.env.MONGO_URI)[0].split("?")[0].toLocaleUpperCase()} DB\x1b[0m`);
}).catch(function (err) {
    console.log(err);
});

// START SERVER
app.listen(PORT, () => {
    console.log(`\x1b[32m\x1b[1mINFO  [ EXPRESS ]\x1b[0m\x1b[32m Server is running on port ${PORT}\x1b[0m`);
    // SERVER STATUS CHECK (KEEP_ALIVE)
    app.get('/', (req, res) => {
        res.status(200).send({ status: 200, message: 'Server is running' });
    });
    // API ROUTES
    const conts = fs.readdirSync(path.join(__dirname, './src/routes/controllers'));
    conts.forEach(cont => {
        app.use('/api/' + cont.replace('.controller.js', ''), require('./src/routes/controllers/' + cont)(express));
    });
    // API NOT FOUND
    app.use((req, res, next) => {
        const error = new Error('Endpoint not found');
        error.statusCode = 404;
        error.status = 'fail';
        next(error);
    });
    app.use(errorHandler);
});