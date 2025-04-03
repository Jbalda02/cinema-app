const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { usuario } = require('../models');

router.post('/usuarios/registro', async (req, res) => {
  try {
    const { 
      nombre, 
      nombre_usuario, 
      apellido, 
      edad, 
      correo_electronico, 
      contrasena 
    } = req.body;

    // Validación básica de campos requeridos
    if (!nombre || !nombre_usuario || !correo_electronico || !contrasena) {
      return res.status(400).json({ 
        error: 'Nombre, nombre de usuario, correo electrónico y contraseña son campos requeridos' 
      });
    }

    // Validar fortaleza de contraseña (opcional pero recomendado)
    if (contrasena.length < 8) {
      return res.status(400).json({
        error: 'La contraseña debe tener al menos 8 caracteres'
      });
    }

    // Verificar si el correo o nombre de usuario ya están registrados
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
        error: 'El correo electrónico o nombre de usuario ya está registrado' 
      });
    }

    // Hashear la contraseña
    const saltRounds = 10;
    const contrasenaHasheada = await bcrypt.hash(contrasena, saltRounds);

    // Crear nuevo usuario con la contraseña hasheada
    const nuevoUsuario = await usuario.create({
      nombre,
      nombre_usuario,
      apellido: apellido || null,
      edad: edad || null,
      correo_electronico,
      contrasena: contrasenaHasheada // Guardamos la versión hasheada
    });

    // Responder con los datos del usuario sin la contraseña
    const usuarioResponse = {
      nombre: nuevoUsuario.nombre,
      nombre_usuario: nuevoUsuario.nombre_usuario,
      apellido: nuevoUsuario.apellido,
      edad: nuevoUsuario.edad,
      correo_electronico: nuevoUsuario.correo_electronico,
      mensaje: 'Usuario registrado exitosamente'
    };

    res.status(201).json(usuarioResponse);
    
  } catch (error) {
    console.error('Error en el registro de usuario:', error);
    res.status(500).json({ 
      error: 'Ocurrió un error al registrar el usuario',
      detalles: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;