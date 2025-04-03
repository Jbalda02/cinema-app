const express = require('express');
const router = express.Router();
const { comentario, usuario } = require('../models');
const { check, validationResult } = require('express-validator');

// Middleware de validación para crear comentario
const validarComentario = [
  check('descripcion')
    .not().isEmpty().withMessage('La descripción es requerida')
    .isLength({ min: 5 }).withMessage('El comentario debe tener al menos 5 caracteres'),
  check('id_pelicula')
    .not().isEmpty().withMessage('El ID de película es requerido')
    .isInt().withMessage('El ID de película debe ser un número'),
  check('usuario_id')
    .not().isEmpty().withMessage('El ID de usuario es requerido')
    .isInt().withMessage('El ID de usuario debe ser un número')
];

/**
 * @route GET /api/comentarios/:id_pelicula
 * @desc Obtiene todos los comentarios de una película
 * @access Public
 */
router.get('/:id_pelicula', async (req, res) => {
  try {
    const { id_pelicula } = req.params;

    const comentarios = await comentario.findAll({
      where: { id_pelicula },
      include: [{
        model: usuario,
        as: 'usuario',
        attributes: ['nombre', 'nombre_usuario']
      }],
      order: [['createdAt', 'DESC']]
    });

    if (!comentarios || comentarios.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'No se encontraron comentarios para esta película'
      });
    }

    res.json({
      success: true,
      count: comentarios.length,
      data: comentarios
    });

  } catch (error) {
    console.error('Error al obtener comentarios:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener comentarios',
      detalles: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * @route POST /api/comentarios
 * @desc Crea un nuevo comentario
 * @access Private (deberías agregar autenticación JWT)
 */
router.post('/', validarComentario, async (req, res) => {
  try {
    // Validar los datos de entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { descripcion, id_pelicula, usuario_id } = req.body;

    // Verificar si el usuario existe
    const usuarioExiste = await usuario.findByPk(usuario_id);
    if (!usuarioExiste) {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }

    // Crear nuevo comentario
    const nuevoComentario = await comentario.create({
      descripcion,
      id_pelicula,
      usuario_id
    });

    // Obtener el comentario con información del usuario
    const comentarioConUsuario = await comentario.findByPk(nuevoComentario.id, {
      include: [{
        model: usuario,
        as: 'usuario',
        attributes: [ 'nombre', 'nombre_usuario']
      }]
    });

    res.status(201).json({
      success: true,
      data: comentarioConUsuario,
      mensaje: 'Comentario creado exitosamente'
    });

  } catch (error) {
    console.error('Error al crear comentario:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear comentario',
      detalles: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;