const express = require('express');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const app = express();

// 1. Tentukan URL React JS Anda yang diizinkan mengakses API
const allowedOrigins = [
'http://localhost:5173', // URL bawaan jika React Anda menggunakan Vite di lokal
'http://localhost:3000', // URL bawaan jika React Anda menggunakan Create React App
'https://pastipay-frontend.vercel.app', // Daftarkan juga URL produksi frontend Anda nanti di sini jika sudah dideploy
'https://pastipay.vercel.app/',
'https://pastipay-backend.vercel.app/',
];

// 2. Pasang middleware CORS dengan konfigurasi khusus Session
app.use(cors({
origin: function (origin, callback) {
    // Mengizinkan request tanpa origin (seperti Postman atau perintah internal server)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
    const msg = 'Akses CORS diblokir untuk origin ini karena alasan keamanan.';
    return callback(new Error(msg), false);
    }
    return callback(null, true);
},
credentials: true // SANGAT WAJIB karena Anda menggunakan express-session!
}));

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