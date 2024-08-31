
const db = require('../config/db.config.js');
const InvoiceDetail = db.InvoiceDetail;
const Invoice = db.Invoice;
const Product = db.Product;

exports.create = (req, res) => {
    let invoiceDetail = {};

    try {
        // Construir el objeto InvoiceDetail a partir del cuerpo de la solicitud
        invoiceDetail.id_factura = req.body.id_factura;
        invoiceDetail.id_linea = req.body.id_linea;
        invoiceDetail.id_producto = req.body.id_producto;
        invoiceDetail.cantidad = req.body.cantidad;
    
        // Guardar en la base de datos MySQL
        InvoiceDetail.create(invoiceDetail).then(result => {
            // Enviar un mensaje de éxito al cliente
            res.status(200).json({
                message: "Detalle de factura creado con éxito con id_factura = " + result.id_factura + " y id_linea = " + result.id_linea,
                invoiceDetail: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el detalle de factura",
            error: error.message
        });
    }
}

exports.retrieveAllInvoiceDetail = (req, res) => {
    // Encontrar toda la información de InvoiceDetail
    InvoiceDetail.findAll({
        include: [
            {
                model: Invoice,
                as: 'factura'
            },
            {
                model: Product,
                as: 'producto'
            }
        ]
    })
        .then(invoiceDetailInfos => {
            res.status(200).json({
                message: "Obtenidos todos los detalles de factura con éxito",
                invoiceDetails: invoiceDetailInfos
            });
        })
        .catch(error => {
            // Registrar en la consola
            console.log(error);

            res.status(500).json({
                message: "Error al obtener detalles de factura",
                error: error
            });
        });
}

exports.getInvoiceDetailById = (req, res) => {
    // Encontrar información de InvoiceDetail por id
    let invoiceId = req.params.id_factura;
    let lineId = req.params.id_linea;
    InvoiceDetail.findOne({
        where: { id_factura: invoiceId, id_linea: lineId },
        include: [
            {
                model: Invoice,
                as: 'factura'
            },
            {
                model: Product,
                as: 'producto'
            }
        ]
    })
        .then(invoiceDetail => {
            if (invoiceDetail) {
                res.status(200).json({
                    message: "Detalle de factura obtenido con éxito con id_factura = " + invoiceId + " y id_linea = " + lineId,
                    invoiceDetail: invoiceDetail
                });
            } else {
                res.status(404).json({
                    message: "Detalle de factura no encontrado con id_factura = " + invoiceId + " y id_linea = " + lineId,
                    error: "404"
                });
            }
        })
        .catch(error => {
            // Registrar en la consola
            console.log(error);

            res.status(500).json({
                message: "Error al obtener el detalle de factura",
                error: error
            });
        });
}

exports.updateById = async (req, res) => {
    try {
        let invoiceId = req.params.id_factura;
        let lineId = req.params.id_linea;
        let invoiceDetail = await InvoiceDetail.findOne({ where: { id_factura: invoiceId, id_linea: lineId } });
    
        if (!invoiceDetail) {
            // Retornar una respuesta si no se encuentra el detalle de la factura
            res.status(404).json({
                message: "Detalle de factura no encontrado para actualizar con id_factura = " + invoiceId + " y id_linea = " + lineId,
                error: "404"
            });
        } else {
            // Actualizar el detalle de la factura en la base de datos
            let updatedObject = {
                id_producto: req.body.id_producto,
                cantidad: req.body.cantidad
            };
            let result = await InvoiceDetail.update(updatedObject, { returning: true, where: { id_factura: invoiceId, id_linea: lineId } });
            
            // Retornar la respuesta al cliente
            if (!result[0]) {
                res.status(500).json({
                    message: "Error al actualizar el detalle de factura con id_factura = " + req.params.id_factura + " y id_linea = " + req.params.id_linea,
                    error: "No se pudo actualizar"
                });
            } else {
                res.status(200).json({
                    message: "Detalle de factura actualizado con éxito con id_factura = " + invoiceId + " y id_linea = " + lineId,
                    invoiceDetail: updatedObject,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el detalle de factura con id_factura = " + req.params.id_factura + " y id_linea = " + req.params.id_linea,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let invoiceId = req.params.id_factura;
        let lineId = req.params.id_linea;
        let invoiceDetail = await InvoiceDetail.findOne({ where: { id_factura: invoiceId, id_linea: lineId } });

        if (!invoiceDetail) {
            res.status(404).json({
                message: "Detalle de factura no encontrado con id_factura = " + invoiceId + " y id_linea = " + lineId,
                error: "404"
            });
        } else {
            await invoiceDetail.destroy();
            res.status(200).json({
                message: "Detalle de factura eliminado con éxito con id_factura = " + invoiceId + " y id_linea = " + lineId,
                invoiceDetail: invoiceDetail,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el detalle de factura con id_factura = " + req.params.id_factura + " y id_linea = " + req.params.id_linea,
            error: error.message
        });
    }
}
