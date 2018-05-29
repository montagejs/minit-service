'use strict';

const cors = require('cors');
const bodyParser = require('body-parser');
const Minit = require('./minit');
const path = require('path');

const MINIT_PATH = '/usr/local/bin/minit';

module.exports = (app, home) => {
    app.use(cors());
    app.use(bodyParser.json());

    const minit = new Minit(MINIT_PATH);

    // Catch unhandled exceptions
    app.use((req, res, next) => Promise.resolve(next()).catch((error) => res.status(500).json({
        error: error
    })));

    app.use((req, res, next) => {
        const pathArgument = path.join(home, req.query.path);
        if (!path) {
            res.status(400).json({
                error: 'path query is required'
            });
        }
        res.locals.path = pathArgument;
        next();
    });

    app.post('/app/:name', (req, res) => {
        minit.createApp(res.locals.path, req.params.name)
            .then(() => res.json({ created: true }))
            .catch((err) => res.status(400).json(err));
    });

    app.post('/component/:name', (req, res) => {
        minit.createComponent(res.locals.path, req.params.name)
            .then(() => res.json({ created: true }))
            .catch((err) => res.status(400).json(err));
    });

    app.post('/module/:name', (req, res) => {
        minit.createModule(res.locals.path, req.params.name)
            .then(() => res.json({ created: true }))
            .catch((err) => res.status(400).json(err));
    });

    app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
        res.json(500).json(err);
    });
};
