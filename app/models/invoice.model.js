module.exports = (sequelize, Sequelize) => {
    const Invoice = sequelize.define('invoice', {
      id_In: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      No_In: {
        type: Sequelize.INTEGER // Número de la factura
      },
      serilanum: {
        type: Sequelize.STRING // Número de serie de la factura
      },
      In_date: {
        type: Sequelize.DATE // Fecha de la factura
      },
      id_client: {
        type: Sequelize.INTEGER, // Clave foránea que apunta a `Customer`
        references: {
          model: 'customers', // Nombre del modelo `Customer`
          key: 'id_C'
        }
      },
      id_employee: {
        type: Sequelize.INTEGER, // Clave foránea que apunta a `Employee`
        references: {
          model: 'employees', // Nombre del modelo `Employee`
          key: 'id_em'
        }
      },
      copyrightby: {
        type: Sequelize.STRING,
        defaultValue: 'UMG Antigua'
      }
    });
  
    Invoice.associate = (models) => {
      Invoice.belongsTo(models.Customer, {
        foreignKey: 'id_client',
        as: 'cliente'
      });
      Invoice.belongsTo(models.Employee, {
        foreignKey: 'id_employee',
        as: 'empleado'
      });
    };
  
    return Invoice;
  };
  