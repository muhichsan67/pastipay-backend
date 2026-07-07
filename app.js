const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret_key', resave: false, saveUninitialized: false }));


app.get('/', (req, res) => res.redirect('/admin/login'));
app.use('/api', require('./src/routes/api.routes'));
app.use('/admin', require('./src/routes/admin.routes'));

app.use((req, res, next) => { const e = new Error('Not Found'); e.statusCode = 404; next(e); });
app.use(require('./src/middlewares/errorHandler.middleware')); // Error Handler Global

module.exports = app;