const connection = require("./conexion");

const obtenerUsuarios = async (req, res) => { //req=request,PETICION; res=response,RESPUESTA//
    // A simple SELECT query
    if(!req.session.usuario) {
      res.status (401).send('No autorizado')
      return
    }
    try {
      const [results, fields] = await connection.query(
        "SELECT * FROM `usuarios`",
      );
      res.status(200).json(results)
  
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    } catch (err) {
      console.log(err);
      res.status(500).send('Error en el servidor')
    } 
  }

 const eliminarUsuario = async (req, res) => { //req=request,PETICION; res=response,RESPUESTA//
    // A simple SELECT query
    if(!req.session.usuario) {
      res.status (401).send('No autorizado')
      return
    }
    const datos = req.query;
    try {
      const [results, fields] = await connection.query(
         "DELETE FROM usuarios WHERE `usuarios`.`id` = ?",
        [datos.id]
      );
      if (results.affectedRows > 0){
        res.status(200).send('Usuario eliminado')
      }else {
        res.status(401).send( 'No se pudo eliminar el usuario')
      }
      
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    } catch (err) {
      console.log(err);
      res.status(500).send('Error en el servidor')
    } 
  }

  module.exports = {obtenerUsuarios,eliminarUsuario};