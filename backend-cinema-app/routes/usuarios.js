const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { usuario } = require('../models');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

// Función para generar tokens JWT
const generarToken = (userId) => {
  return jwt.sign(
    { id: userId },
    'secret_jwt',
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
  );
};

// Middleware de validación para registro
const validarRegistro = [
  check('nombre').not().isEmpty().withMessage('El nombre es requerido'),
  check('nombre_usuario')
    .not().isEmpty().withMessage('El nombre de usuario es requerido')
    .isLength({ min: 4 }).withMessage('El nombre de usuario debe tener al menos 4 caracteres'),
  check('correo_electronico')
    .isEmail().withMessage('Debe ser un correo electrónico válido')
    .normalizeEmail(),
  check('contrasena')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
    .matches(/\d/).withMessage('La contraseña debe contener al menos un número')
];

// Middleware de validación para login
const validarLogin = [
  check('correo_electronico').isEmail().withMessage('Debe ser un correo electrónico válido'),
  check('contrasena').not().isEmpty().withMessage('La contraseña es requerida')
];

/**
 * @route POST /api/usuarios/registro
 * @desc Registra un nuevo usuario
 * @access Public
 */
router.post('/usuarios/registro', validarRegistro, async (req, res) => {
  try {
    // Validar los datos de entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { 
      nombre, 
      nombre_usuario, 
      apellido, 
      edad, 
      correo_electronico, 
      contrasena 
    } = req.body;

    // Verificar si el correo o nombre de usuario ya existen
    const usuarioExistente = await usuario.findOne({ 
      where: { 
        [Op.or]: [
          { correo_electronico },
          { nombre_usuario }
        ]
      } 
    });

    if (usuarioExistente) {
      return res.status(409).json({ 
        success: false,
        error: 'El correo electrónico o nombre de usuario ya está registrado' 
      });
    }

    // Hashear la contraseña
    const saltRounds = 10;
    const contrasenaHasheada = await bcrypt.hash(contrasena, saltRounds);

    // Crear nuevo usuario
    const nuevoUsuario = await usuario.create({
      nombre,
      nombre_usuario,
      apellido: apellido || null,
      edad: edad || null,
      correo_electronico,
      contrasena: contrasenaHasheada
    });

    // Generar token JWT
    const token = generarToken(nuevoUsuario.id);

    // Responder con los datos del usuario y token
    const usuarioResponse = {
      success: true,
      usuario: {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        nombre_usuario: nuevoUsuario.nombre_usuario,
        correo_electronico: nuevoUsuario.correo_electronico
      },
      token,
      mensaje: 'Usuario registrado exitosamente'
    };

    res.status(201).json(usuarioResponse);
    
  } catch (error) {
    console.error('Error en el registro de usuario:', error);
    res.status(500).json({ 
      success: false,
      error: 'Ocurrió un error al registrar el usuario',
      detalles: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * @route POST /api/usuarios/login
 * @desc Inicia sesión de usuario
 * @access Public
 */
router.post('/usuarios/login', validarLogin, async (req, res) => {
  try {
    // Validar los datos de entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { correo_electronico, contrasena } = req.body;

    // Buscar usuario por correo
    const usuarioEncontrado = await usuario.findOne({
      where: { correo_electronico }
    });

    if (!usuarioEncontrado) {
      return res.status(401).json({
        success: false,
        error: 'Credenciales inválidas'
      });
    }

    // Comparar contraseñas
    const contrasenaValida = await bcrypt.compare(
      contrasena,
      usuarioEncontrado.contrasena
    );

    if (!contrasenaValida) {
      return res.status(401).json({
        success: false,
        error: 'Credenciales inválidas'
      });
    }

    // Generar token JWT
    const token = generarToken(usuarioEncontrado.id);

    // Responder con datos del usuario y token
    return res.json({
      success: true,
      mensaje: 'Inicio de sesión exitoso',
      usuario: {
        id: usuarioEncontrado.id,
        nombre: usuarioEncontrado.nombre,
        nombre_usuario: usuarioEncontrado.nombre_usuario,
        correo_electronico: usuarioEncontrado.correo_electronico
      },
      token
    });

  } catch (error) {
    console.error('Error en el login:', error);
    return res.status(500).json({
      success: false,
      error: 'Error al iniciar sesión',
      detalles: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;