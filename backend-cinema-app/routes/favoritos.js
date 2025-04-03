const express = require('express');
const router = express.Router();
const favoritosController = require('../controllers/FavoritosController');

// Rutas para favoritos
router.post('/', favoritosController.agregarFavorito);
router.get('/usuario/:usuarioId', favoritosController.obtenerFavoritosPorUsuario);
router.delete('/', favoritosController.eliminarFavorito);

module.exports = router;