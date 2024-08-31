module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define('employee', {
      id_em: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      emp_id: {
        type: Sequelize.INTEGER
      },
      fname: {
        type: Sequelize.STRING
      },
      sname: {
        type: Sequelize.STRING
      },
      flastname: {
        type: Sequelize.STRING
      },
      slastname: {
        type: Sequelize.STRING
      },
      nit: {
        type: Sequelize.STRING
      },
      salary: {
        type: Sequelize.NUMERIC
      },
      estatus: {
        type: Sequelize.NUMERIC
      },
      id_departamento: {
        type: Sequelize.INTEGER, // Este campo es la clave foránea
        references: {
          model: 'departs', // Nombre de la tabla a la que hace referencia (Depart)
          key: 'id_d'
        }
      },
      copyrightby: {
        type: Sequelize.STRING,
        defaultValue: 'UMG Antigua'
      }
    });
  
    Employee.associate = (models) => {
      Employee.belongsTo(models.Depart, {
        foreignKey: 'id_departamento',
        as: 'departamento'
      });
    };
  
    return Employee;
  };
  