module.exports = (sequelize, Sequelize) => {
	const Supplier = sequelize.define('suppli', {	
	  id_S: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  company :{
		type: Sequelize.INTEGER,
	  },
	  direction:{
		type: Sequelize.STRING,
	  },
      phone: {
        type: Sequelize.STRING,
      },
      snit: {
        type: Sequelize.NUMERIC,
      },
      city: {
        type: Sequelize.STRING,
      },
      country : {
        type: Sequelize.STRING,
      },
      contact : {
        type: Sequelize.STRING,
      },
      semail: {
        type: Sequelize.STRING,
      },
      phonecontact: {
        type: Sequelize.NUMERIC,
      },
      s_status: {
        type: Sequelize.NUMERIC,
      },
    copyrightby: {
      type: Sequelize.STRING,
      defaultValue: 'UMG Antigua'
    }
	});
	
	return Supplier;
}