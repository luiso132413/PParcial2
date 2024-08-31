

const db = require('../config/db.config.js');
const Depart = db.Depart;

exports.create = (req, res) => {
    let depart = {};

    try {
        // Construir el objeto Depart a partir del cuerpo de la solicitud
        depart.description = req.body.description;
    
        // Guardar en la base de datos MySQL
        Depart.create(depart).then(result => {
            // Enviar un mensaje de éxito al cliente
            res.status(200).json({
                message: "Departamento creado con éxito con id = " + result.id_d,
                depart: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el departamento",
            error: error.message
        });
    }
}

exports.retrieveAllDepart = (req, res) => {
    // Encontrar toda la información de Depart
    Depart.findAll()
        .then(departInfos => {
            res.status(200).json({
                message: "Obtenidos todos los departamentos con éxito",
                depart: departInfos
            });
        })
        .catch(error => {
            // Registrar en la consola
            console.log(error);

            res.status(500).json({
                message: "Error al obtener departamentos",
                error: error
            });
        });
}

exports.getDepartById = (req, res) => {
    // Encontrar información de Depart por id
    let departId = req.params.id_d;
    Depart.findByPk(departId)
        .then(depart => {
            res.status(200).json({
                message: "Departamento obtenido con éxito con id = " + departId,
                depart: depart
            });
        })
        .catch(error => {
            // Registrar en la consola
            console.log(error);

            res.status(500).json({
                message: "Error al obtener el departamento",
                error: error
            });
        });
}

exports.updateById = async (req, res) => {
    try {
        let departId = req.params.id_d;
        let depart = await Depart.findByPk(departId);
    
        if (!depart) {
            // Retornar una respuesta si no se encuentra el departamento
            res.status(404).json({
                message: "Departamento no encontrado para actualizar con id = " + departId,
                error: "404"
            });
        } else {
            // Actualizar el departamento en la base de datos
            let updatedObject = {
                description: req.body.description
            };
            let result = await Depart.update(updatedObject, { returning: true, where: { id_d: departId } });
            
            // Retornar la respuesta al cliente
            if (!result[0]) {
                res.status(500).json({
                    message: "Error al actualizar el departamento con id = " + req.params.id_d,
                    error: "No se pudo actualizar"
                });
            } else {
                res.status(200).json({
                    message: "Departamento actualizado con éxito con id = " + departId,
                    depart: updatedObject,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el departamento con id = " + req.params.id_d,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let departId = req.params.id_d;
        let depart = await Depart.findByPk(departId);

        if (!depart) {
            res.status(404).json({
                message: "Departamento no encontrado con id = " + departId,
                error: "404"
            });
        } else {
            await depart.destroy();
            res.status(200).json({
                message: "Departamento eliminado con éxito con id = " + departId,
                depart: depart,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el departamento con id = " + req.params.id_d,
            error: error.message
        });
    }
}
