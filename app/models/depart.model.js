
module.exports = (sequelize, Sequelize) => {
	const Depart = sequelize.define('depart', {
	  id_d: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	  },
	  description: {
		type: Sequelize.STRING
	  },
	  copyrightby: {
		type: Sequelize.STRING,
		defaultValue: 'UMG Antigua'
	  }
	});
  
	Depart.associate = (models) => {
	  Depart.hasMany(models.Employee, {
		foreignKey: 'id_departamento',
		as: 'empleados'
	  });
	};
  
	return Depart;
  };
  