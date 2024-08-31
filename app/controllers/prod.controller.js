
const db = require('../config/db.config.js');
const Product = db.Product;
const Supplier = db.Supplier;

exports.create = (req, res) => {
    let product = {};

    try {
        // Construir el objeto Product a partir del cuerpo de la solicitud
        product.Pdescription = req.body.Pdescription;
        product.Stock = req.body.Stock;
        product.MinStock = req.body.MinStock;
        product.Pprice = req.body.Pprice;
        product.id_proveedor = req.body.id_proveedor;
    
        // Guardar en la base de datos MySQL
        Product.create(product).then(result => {
            // Enviar un mensaje de éxito al cliente
            res.status(200).json({
                message: "Producto creado con éxito con id = " + result.id_P,
                product: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el producto",
            error: error.message
        });
    }
}

exports.retrieveAllProduct = (req, res) => {
    // Encontrar toda la información de Product
    Product.findAll({
        include: [{
            model: Supplier,
            as: 'proveedor'
        }]
    })
        .then(productInfos => {
            res.status(200).json({
                message: "Obtenidos todos los productos con éxito",
                products: productInfos
            });
        })
        .catch(error => {
            // Registrar en la consola
            console.log(error);

            res.status(500).json({
                message: "Error al obtener productos",
                error: error
            });
        });
}

exports.getProductById = (req, res) => {
    // Encontrar información de Product por id
    let productId = req.params.id_P;
    Product.findByPk(productId, {
        include: [{
            model: Supplier,
            as: 'proveedor'
        }]
    })
        .then(product => {
            res.status(200).json({
                message: "Producto obtenido con éxito con id = " + productId,
                product: product
            });
        })
        .catch(error => {
            // Registrar en la consola
            console.log(error);

            res.status(500).json({
                message: "Error al obtener el producto",
                error: error
            });
        });
}

exports.updateById = async (req, res) => {
    try {
        let productId = req.params.id_P;
        let product = await Product.findByPk(productId);
    
        if (!product) {
            // Retornar una respuesta si no se encuentra el producto
            res.status(404).json({
                message: "Producto no encontrado para actualizar con id = " + productId,
                error: "404"
            });
        } else {
            // Actualizar el producto en la base de datos
            let updatedObject = {
                Pdescription: req.body.Pdescription,
                Stock: req.body.Stock,
                MinStock: req.body.MinStock,
                Pprice: req.body.Pprice,
                id_proveedor: req.body.id_proveedor
            };
            let result = await Product.update(updatedObject, { returning: true, where: { id_P: productId } });
            
            // Retornar la respuesta al cliente
            if (!result[0]) {
                res.status(500).json({
                    message: "Error al actualizar el producto con id = " + req.params.id_P,
                    error: "No se pudo actualizar"
                });
            } else {
                res.status(200).json({
                    message: "Producto actualizado con éxito con id = " + productId,
                    product: updatedObject,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el producto con id = " + req.params.id_P,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let productId = req.params.id_P;
        let product = await Product.findByPk(productId);

        if (!product) {
            res.status(404).json({
                message: "Producto no encontrado con id = " + productId,
                error: "404"
            });
        } else {
            await product.destroy();
            res.status(200).json({
                message: "Producto eliminado con éxito con id = " + productId,
                product: product,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el producto con id = " + req.params.id_P,
            error: error.message
        });
    }
}
