
const db = require('../config/db.config.js');
const Customer = db.Customer;

exports.create = (req, res) => {
    let customer = {};

    try {
        // Construir el objeto Customer a partir del cuerpo de la solicitud
        customer.cname = req.body.cname;
        customer.clastname = req.body.clastname;
        customer.cbusinessname = req.body.cbusinessname;
        customer.cnit = req.body.cnit;
        customer.cadress = req.body.cadress;
        customer.cphone = req.body.cphone;
        customer.cemail = req.body.cemail;
        customer.cdateofentry = req.body.cdateofentry;
        customer.cstatus = req.body.cstatus;
    
        // Guardar en la base de datos MySQL
        Customer.create(customer).then(result => {
            // Enviar un mensaje de éxito al cliente
            res.status(200).json({
                message: "Cliente creado con éxito con id = " + result.id_C,
                customer: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el cliente",
            error: error.message
        });
    }
}

exports.retrieveAllCustomer = (req, res) => {
    // Encontrar toda la información de Customer
    Customer.findAll()
        .then(customerInfos => {
            res.status(200).json({
                message: "Obtenidos todos los clientes con éxito",
                customers: customerInfos
            });
        })
        .catch(error => {
            // Registrar en la consola
            console.log(error);

            res.status(500).json({
                message: "Error al obtener clientes",
                error: error
            });
        });
}

exports.getCustomerById = (req, res) => {
    // Encontrar información de Customer por id
    let customerId = req.params.id_C;
    Customer.findByPk(customerId)
        .then(customer => {
            res.status(200).json({
                message: "Cliente obtenido con éxito con id = " + customerId,
                customer: customer
            });
        })
        .catch(error => {
            // Registrar en la consola
            console.log(error);

            res.status(500).json({
                message: "Error al obtener el cliente",
                error: error
            });
        });
}

exports.updateById = async (req, res) => {
    try {
        let customerId = req.params.id_C;
        let customer = await Customer.findByPk(customerId);
    
        if (!customer) {
            // Retornar una respuesta si no se encuentra el cliente
            res.status(404).json({
                message: "Cliente no encontrado para actualizar con id = " + customerId,
                error: "404"
            });
        } else {
            // Actualizar el cliente en la base de datos
            let updatedObject = {
                cname: req.body.cname,
                clastname: req.body.clastname,
                cbusinessname: req.body.cbusinessname,
                cnit: req.body.cnit,
                cadress: req.body.cadress,
                cphone: req.body.cphone,
                cemail: req.body.cemail,
                cdateofentry: req.body.cdateofentry,
                cstatus: req.body.cstatus
            };
            let result = await Customer.update(updatedObject, { returning: true, where: { id_C: customerId } });
            
            // Retornar la respuesta al cliente
            if (!result[0]) {
                res.status(500).json({
                    message: "Error al actualizar el cliente con id = " + req.params.id_C,
                    error: "No se pudo actualizar"
                });
            } else {
                res.status(200).json({
                    message: "Cliente actualizado con éxito con id = " + customerId,
                    customer: updatedObject,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el cliente con id = " + req.params.id_C,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let customerId = req.params.id_C;
        let customer = await Customer.findByPk(customerId);

        if (!customer) {
            res.status(404).json({
                message: "Cliente no encontrado con id = " + customerId,
                error: "404"
            });
        } else {
            await customer.destroy();
            res.status(200).json({
                message: "Cliente eliminado con éxito con id = " + customerId,
                customer: customer,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el cliente con id = " + req.params.id_C,
            error: error.message
        });
    }
}
