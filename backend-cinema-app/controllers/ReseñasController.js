const { Reseñas, peliculas, usuario } = require('../models');

// Crear una nueva reseña
exports.crearReseña = async (req, res) => {
  try {
    const reseña = await Reseñas.create(req.body); 
    res.status(201).json(reseña);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las reseñas de una película
exports.obtenerReseñasPorPelicula = async (req, res) => {
  try {
    const reseñas = await Reseñas.findAll({ 
      where: { peliculaId: req.params.peliculaId },
      include: [{ model: usuario, as: 'usuario' }] 
    });
    res.json(reseñas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una reseña por su ID
exports.obtenerReseñaPorId = async (req, res) => {
  try {
    const reseña = await Reseñas.findByPk(req.params.id, { 
      include: [{ model: usuario, as: 'usuario' }]
    });
    if (!reseña) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }
    res.json(reseña);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una reseña
exports.actualizarReseña = async (req, res) => {
  try {
    const [updated] = await Reseñas.update(req.body, { 
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedReseña = await Reseñas.findByPk(req.params.id);
      return res.json(updatedReseña);
    }
    return res.status(404).json({ message: 'Reseña no encontrada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una reseña
exports.eliminarReseña = async (req, res) => {
  try {
    const deleted = await Reseñas.destroy({ 
      where: { id: req.params.id }
    });
    if (deleted) {
      return res.status(204).send();
    }
    return res.status(404).json({ message: 'Reseña no encontrada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};