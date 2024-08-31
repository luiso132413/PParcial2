module.exports = (sequelize, Sequelize) => {
	const Customer = sequelize.define('customer', {	
	  id_C: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
      cname: {
            type: Sequelize.STRING,
      },
      clastname: {
        type: Sequelize.STRING,
      },
      cbusinessname: {
        type: Sequelize.STRING,
      },
      cnit: {
        type: Sequelize.STRING,
      },
      cadress: {
        type: Sequelize.STRING,
      },
      cphone: {
        type: Sequelize.STRING,
      },
      cemail: {
        type: Sequelize.STRING,
      },
      cdateofentry: {
        type: Sequelize.DATE,
      },
      cstatus: {
        type: Sequelize.NUMERIC,
      },
    copyrightby: {
      type: Sequelize.STRING,
      defaultValue: 'UMG Antigua'
    }
	});
	
	return Customer;
}