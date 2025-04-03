const express = require('express');
const router = express.Router();
const reseñasController = require('../controllers/ReseñasController');

// Rutas para reseñas
router.post('/', reseñasController.crearReseña);
router.get('/pelicula/:peliculaId', reseñasController.obtenerReseñasPorPelicula);
router.get('/:id', reseñasController.obtenerReseñaPorId);
router.put('/:id', reseñasController.actualizarReseña);
router.delete('/:id', reseñasController.eliminarReseña);

module.exports = router;