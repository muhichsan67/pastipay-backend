const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    // OPTIMASI: Stack trace panjang hanya dicetak jika terjadi error internal (500)
    if (statusCode === 500) {
        console.error(`[Internal Server Error]: ${err.stack}`);
    } else {
        console.warn(`[Client Warning]: ${statusCode} - ${err.message} | URL: ${req.originalUrl}`);
    }

    if (req.originalUrl.startsWith('/api')) {
        return res.status(statusCode).json({ 
            success: false, 
            message: err.message || 'Terjadi kesalahan pada server.' 
        });
    } else {
        return res.status(statusCode).send(`
            <div style="font-family:sans-serif; padding:40px; text-align:center;">
                <h2>Error ${statusCode}</h2>
                <p>${err.message || 'Halaman tidak ditemukan.'}</p>
                <a href="/admin/dashboard" style="color:#2563eb; font-weight:bold; text-decoration:none;">Kembali ke Dashboard</a>
            </div>
        `);
    }
};

module.exports = errorHandler;