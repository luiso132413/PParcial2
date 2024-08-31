module.exports = (sequelize, Sequelize) => {
    const InvoiceDetail = sequelize.define('invoiceDetail', {
      id_factura: {
        type: Sequelize.INTEGER, // Clave foránea que apunta a `Invoice`
        references: {
          model: 'invoices', // Nombre del modelo `Invoice`
          key: 'id_In'
        },
        primaryKey: true // Parte de la clave primaria compuesta
      },
      id_linea: {
        type: Sequelize.INTEGER, // Parte de la clave primaria compuesta
        primaryKey: true
      },
      id_producto: {
        type: Sequelize.INTEGER, // Clave foránea que apunta a `Product`
        references: {
          model: 'products', // Nombre del modelo `Product`
          key: 'id_P'
        }
      },
      cantidad: {
        type: Sequelize.INTEGER // Cantidad del producto en la factura
      }
    });
  
    InvoiceDetail.associate = (models) => {
      InvoiceDetail.belongsTo(models.Invoice, {
        foreignKey: 'id_factura',
        as: 'factura'
      });
      InvoiceDetail.belongsTo(models.Product, {
        foreignKey: 'id_producto',
        as: 'producto'
      });
    };
  
    return InvoiceDetail;
  };
  