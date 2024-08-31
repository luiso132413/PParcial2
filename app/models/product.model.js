module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('prod', {
      id_P: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      Pdescription: {
        type: Sequelize.STRING
      },
      Stock: {
        type: Sequelize.INTEGER
      },
      MinStock: {
        type: Sequelize.INTEGER
      },
      Pprice: {
        type: Sequelize.FLOAT
      },
      id_proveedor: {
        type: Sequelize.INTEGER, // Clave foránea que apunta a `Supplier`
        references: {
          model: 'suppli', // Nombre del modelo `Supplier`
          key: 'id_S'
        }
      },
      copyrightby: {
        type: Sequelize.STRING,
        defaultValue: 'UMG Antigua'
      }
    });
  
    Product.associate = (models) => {
      Product.belongsTo(models.Supplier, {
        foreignKey: 'id_proveedor',
        as: 'proveedor'
      });
    };
  
    return Product;
  };
  