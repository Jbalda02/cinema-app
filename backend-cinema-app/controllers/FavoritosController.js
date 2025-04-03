const { UsuarioPeliculaFavorita, peliculas } = require('../models');

// Agregar una película a favoritos
exports.agregarFavorito = async (req, res) => {
  try {
    const favorito = await UsuarioPeliculaFavorita.create(req.body); 
    res.status(201).json(favorito);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener las películas favoritas de un usuario
exports.obtenerFavoritosPorUsuario = async (req, res) => {
  try {
    const favoritos = await UsuarioPeliculaFavorita.findAll({ 
      where: { usuarioId: req.params.usuarioId },
      include: [{ model: peliculas, as: 'pelicula' }] 
    });
    res.json(favoritos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una película de favoritos
exports.eliminarFavorito = async (req, res) => {
  try {
    const deleted = await UsuarioPeliculaFavorita.destroy({ 
      where: { usuarioId: req.body.usuarioId, peliculaId: req.body.peliculaId }
    });
    if (deleted) {
      return res.status(204).send();
    }
    return res.status(404).json({ message: 'Favorito no encontrado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};