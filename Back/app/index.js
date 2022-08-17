// Import du module express
const express = require('express');
// Import du router
const router = require('./routers');

// Import JS Doc Swagger
const apidocs = require('./helpers/apiDocs');

// Import API error et gestionnaire d'erreur
const ApiError = require('./errors/apiError');
const errorHandler = require('./helpers/errorHandler');

// Création du serveur express
const app = express();

// On fourni l'app au middleware API Docs
apidocs(app);

// On fourni le routeur au serveur express
app.use(router);

// 404 API
app.use((req, res, next) => {
    next(new ApiError('endpoint not found', { statusCode: 404 }));
});

// Middleware de gestion d'erreurs
app.use(errorHandler);

// Export du serveur express
module.exports = app;
