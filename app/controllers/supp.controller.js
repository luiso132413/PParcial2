
const db = require('../config/db.config.js');
const Supplier = db.Supplier;

exports.create = (req, res) => {
    let supplier = {};

    try {
        // Construir el objeto Supplier a partir del cuerpo de la solicitud
        supplier.company = req.body.company;
        supplier.direction = req.body.direction;
        supplier.phone = req.body.phone;
        supplier.snit = req.body.snit;
        supplier.city = req.body.city;
        supplier.country = req.body.country;
        supplier.contact = req.body.contact;
        supplier.semail = req.body.semail;
        supplier.phonecontact = req.body.phonecontact;
        supplier.s_status = req.body.s_status;
    
        // Guardar en la base de datos MySQL
        Supplier.create(supplier).then(result => {
            // Enviar un mensaje de éxito al cliente
            res.status(200).json({
                message: "Proveedor creado con éxito con id = " + result.id_S,
                supplier: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el proveedor",
            error: error.message
        });
    }
}

exports.retrieveAllSupplier = (req, res) => {
    // Encontrar toda la información de Supplier
    Supplier.findAll()
        .then(supplierInfos => {
            res.status(200).json({
                message: "Obtenidos todos los proveedores con éxito",
                suppliers: supplierInfos
            });
        })
        .catch(error => {
            // Registrar en la consola
            console.log(error);

            res.status(500).json({
                message: "Error al obtener proveedores",
                error: error
            });
        });
}

exports.getSupplierById = (req, res) => {
    // Encontrar información de Supplier por id
    let supplierId = req.params.id_S;
    Supplier.findByPk(supplierId)
        .then(supplier => {
            res.status(200).json({
                message: "Proveedor obtenido con éxito con id = " + supplierId,
                supplier: supplier
            });
        })
        .catch(error => {
            // Registrar en la consola
            console.log(error);

            res.status(500).json({
                message: "Error al obtener el proveedor",
                error: error
            });
        });
}

exports.updateById = async (req, res) => {
    try {
        let supplierId = req.params.id_S;
        let supplier = await Supplier.findByPk(supplierId);
    
        if (!supplier) {
            // Retornar una respuesta si no se encuentra el proveedor
            res.status(404).json({
                message: "Proveedor no encontrado para actualizar con id = " + supplierId,
                error: "404"
            });
        } else {
            // Actualizar el proveedor en la base de datos
            let updatedObject = {
                company: req.body.company,
                direction: req.body.direction,
                phone: req.body.phone,
                snit: req.body.snit,
                city: req.body.city,
                country: req.body.country,
                contact: req.body.contact,
                semail: req.body.semail,
                phonecontact: req.body.phonecontact,
                s_status: req.body.s_status
            };
            let result = await Supplier.update(updatedObject, { returning: true, where: { id_S: supplierId } });
            
            // Retornar la respuesta al cliente
            if (!result[0]) {
                res.status(500).json({
                    message: "Error al actualizar el proveedor con id = " + req.params.id_S,
                    error: "No se pudo actualizar"
                });
            } else {
                res.status(200).json({
                    message: "Proveedor actualizado con éxito con id = " + supplierId,
                    supplier: updatedObject,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el proveedor con id = " + req.params.id_S,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let supplierId = req.params.id_S;
        let supplier = await Supplier.findByPk(supplierId);

        if (!supplier) {
            res.status(404).json({
                message: "Proveedor no encontrado con id = " + supplierId,
                error: "404"
            });
        } else {
            await supplier.destroy();
            res.status(200).json({
                message: "Proveedor eliminado con éxito con id = " + supplierId,
                supplier: supplier,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el proveedor con id = " + req.params.id_S,
            error: error.message
        });
    }
}
