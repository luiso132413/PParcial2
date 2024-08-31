
let express = require('express');
let router = express.Router();
 
const depart = require('../controllers/dept.controller.js');
const employee = require('../controllers/emp.controller.js');
const customer = require('../controllers/cust.controller.js');
const supplier = require('../controllers/supp.controller.js');
const product = require('../controllers/prod.controller.js');
const invoice = require('../controllers/invo.controller.js');
const invodetail = require('../controllers/invdet.controller.js');

//router de Departamentos - Departament
router.post('/api/dept/create', depart.create);
router.get('/api/dept/all', depart.retrieveAllDepart);
router.get('/api/dept/onebyid/:id', depart.getDepartById);
router.put('/api/dept/update/:id', depart.updateById);
router.delete('/api/dept/delete/:id', depart.deleteById);
//router de Empleados - Employee
router.post('/api/emp/create', employee.create);
router.get('/api/emp/all', employee.retrieveAllEmployee);
router.get('/api/emp/onebyid/:id', employee.getEmployeeById);
router.put('/api/emp/update/:id', employee.updateById);
router.delete('/api/emp/delete/:id', employee.deleteById);
//router de Clientes - Customer
router.post('/api/cust/create', customer.create);
router.get('/api/cust/all', customer.retrieveAllCustomer);
router.get('/api/cust/onebyid/:id', customer.getCustomerById);
router.put('/api/cust/update/:id', customer.updateById);
router.delete('/api/cust/delete/:id', customer.deleteById);
//router de Proveedores - Supplier
router.post('/api/supp/create', supplier.create);
router.get('/api/supp/all', supplier.retrieveAllSupplier);
router.get('/api/supp/onebyid/:id', supplier.getSupplierById);
router.put('/api/supp/update/:id', supplier.updateById);
router.delete('/api/supp/delete/:id', supplier.deleteById);
//router de Productos - Product
router.post('/api/prod/create', product.create);
router.get('/api/prod/all', product.retrieveAllProduct);
router.get('/api/prod/onebyid/:id', product.getProductById);
router.put('/api/prod/update/:id', product.updateById);
router.delete('/api/prod/delete/:id', product.deleteById);
//router de Facturas - Invoice
router.post('/api/invo/create', invoice.create);
router.get('/api/invo/all', invoice.retrieveAllInvoice);
router.get('/api/invo/onebyid/:id', invoice.getInvoiceById);
router.put('/api/invo/update/:id', invoice.updateById);
router.delete('/api/invo/delete/:id', invoice.deleteById);
//router de Detalles de Facturas - InvoiceDetail
router.post('/api/invdet/create', invodetail.create);
router.get('/api/invdet/all', invodetail.retrieveAllInvoiceDetail);
router.get('/api/invdet/onebyid/:id', invodetail.getInvoiceDetailById);
router.put('/api/invdet/update/:id', invodetail.updateById);
router.delete('/api/invdet/delete/:id', invodetail.deleteById);

module.exports = router;