
const db = require('../config/db.config.js');
const Invoice = db.Invoice;
const Customer = db.Customer;
const Employee = db.Employee;

exports.create = (req, res) => {
    let invoice = {};

    try {
        // Construir el objeto Invoice a partir del cuerpo de la solicitud
        invoice.No_In = req.body.No_In;
        invoice.serilanum = req.body.serilanum;
        invoice.In_date = req.body.In_date;
        invoice.id_client = req.body.id_client;
        invoice.id_employee = req.body.id_employee;
    
        // Guardar en la base de datos MySQL
        Invoice.create(invoice).then(result => {
            // Enviar un mensaje de éxito al cliente
            res.status(200).json({
                message: "Factura creada con éxito con id = " + result.id_In,
                invoice: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear la factura",
            error: error.message
        });
    }
}

exports.retrieveAllInvoice = (req, res) => {
    // Encontrar toda la información de Invoice
    Invoice.findAll({
        include: [
            {
                model: Customer,
                as: 'cliente'
            },
            {
                model: Employee,
                as: 'empleado'
            }
        ]
    })
        .then(invoiceInfos => {
            res.status(200).json({
                message: "Obtenidas todas las facturas con éxito",
                invoices: invoiceInfos
            });
        })
        .catch(error => {
            // Registrar en la consola
            console.log(error);

            res.status(500).json({
                message: "Error al obtener facturas",
                error: error
            });
        });
}

exports.getInvoiceById = (req, res) => {
    // Encontrar información de Invoice por id
    let invoiceId = req.params.id_In;
    Invoice.findByPk(invoiceId, {
        include: [
            {
                model: Customer,
                as: 'cliente'
            },
            {
                model: Employee,
                as: 'empleado'
            }
        ]
    })
        .then(invoice => {
            res.status(200).json({
                message: "Factura obtenida con éxito con id = " + invoiceId,
                invoice: invoice
            });
        })
        .catch(error => {
            // Registrar en la consola
            console.log(error);

            res.status(500).json({
                message: "Error al obtener la factura",
                error: error
            });
        });
}

exports.updateById = async (req, res) => {
    try {
        let invoiceId = req.params.id_In;
        let invoice = await Invoice.findByPk(invoiceId);
    
        if (!invoice) {
            // Retornar una respuesta si no se encuentra la factura
            res.status(404).json({
                message: "Factura no encontrada para actualizar con id = " + invoiceId,
                error: "404"
            });
        } else {
            // Actualizar la factura en la base de datos
            let updatedObject = {
                No_In: req.body.No_In,
                serilanum: req.body.serilanum,
                In_date: req.body.In_date,
                id_client: req.body.id_client,
                id_employee: req.body.id_employee
            };
            let result = await Invoice.update(updatedObject, { returning: true, where: { id_In: invoiceId } });
            
            // Retornar la respuesta al cliente
            if (!result[0]) {
                res.status(500).json({
                    message: "Error al actualizar la factura con id = " + req.params.id_In,
                    error: "No se pudo actualizar"
                });
            } else {
                res.status(200).json({
                    message: "Factura actualizada con éxito con id = " + invoiceId,
                    invoice: updatedObject,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar la factura con id = " + req.params.id_In,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let invoiceId = req.params.id_In;
        let invoice = await Invoice.findByPk(invoiceId);

        if (!invoice) {
            res.status(404).json({
                message: "Factura no encontrada con id = " + invoiceId,
                error: "404"
            });
        } else {
            await invoice.destroy();
            res.status(200).json({
                message: "Factura eliminada con éxito con id = " + invoiceId,
                invoice: invoice,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar la factura con id = " + req.params.id_In,
            error: error.message
        });
    }
}
