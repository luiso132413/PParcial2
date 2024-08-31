
const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Corrige la importación de modelos
db.Employee = require('../models/emplo.model.js')(sequelize, Sequelize);
db.Depart = require('../models/depart.model.js')(sequelize, Sequelize);
db.Customer = require('../models/customer.model.js')(sequelize, Sequelize);
db.Supplier = require('../models/supplier.model.js')(sequelize, Sequelize);
db.Product = require('../models/product.model.js')(sequelize, Sequelize);
db.Invoice = require('../models/invoice.model.js')(sequelize, Sequelize); // Corregido
db.InvoiceDetail = require('../models/invodetail.model.js')(sequelize, Sequelize); // Corregido

module.exports = db;
