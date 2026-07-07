const axios = require('axios');
const ExchangeRateRepository = require('../repositories/exchangeRate.repository');

module.exports = {
    async fetchAndSaveLatestRate() {
        const apiKey = process.env.FIXER_API_KEY;
        const response = await axios.get(`http://data.fixer.io/api/latest?access_key=${apiKey}&symbols=USD,IDR`);
        if (!response.data.success) throw new Error('API Fixer Error');
        const rate = response.data.rates.IDR / response.data.rates.USD;
        await ExchangeRateRepository.create('USD', 'IDR', rate);
    }
};