
const db = require('../config/db.config.js');
const Employee = db.Employee;
const Depart = db.Depart;

exports.create = (req, res) => {
    let employee = {};

    try {
        // Construir el objeto Employee a partir del cuerpo de la solicitud
        employee.emp_id = req.body.emp_id;
        employee.fname = req.body.fname;
        employee.sname = req.body.sname;
        employee.flastname = req.body.flastname;
        employee.slastname = req.body.slastname;
        employee.nit = req.body.nit;
        employee.salary = req.body.salary;
        employee.estatus = req.body.estatus;
        employee.id_departamento = req.body.id_departamento;
    
        // Guardar en la base de datos MySQL
        Employee.create(employee).then(result => {
            // Enviar un mensaje de éxito al cliente
            res.status(200).json({
                message: "Empleado creado con éxito con id = " + result.id_em,
                employee: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el empleado",
            error: error.message
        });
    }
}

exports.retrieveAllEmployee = (req, res) => {
    // Encontrar toda la información de Employee
    Employee.findAll({
        include: [{
            model: Depart,
            as: 'departamento'
        }]
    })
        .then(employeeInfos => {
            res.status(200).json({
                message: "Obtenidos todos los empleados con éxito",
                employees: employeeInfos
            });
        })
        .catch(error => {
            // Registrar en la consola
            console.log(error);

            res.status(500).json({
                message: "Error al obtener empleados",
                error: error
            });
        });
}

exports.getEmployeeById = (req, res) => {
    // Encontrar información de Employee por id
    let employeeId = req.params.id_em;
    Employee.findByPk(employeeId, {
        include: [{
            model: Depart,
            as: 'departamento'
        }]
    })
        .then(employee => {
            res.status(200).json({
                message: "Empleado obtenido con éxito con id = " + employeeId,
                employee: employee
            });
        })
        .catch(error => {
            // Registrar en la consola
            console.log(error);

            res.status(500).json({
                message: "Error al obtener el empleado",
                error: error
            });
        });
}

exports.updateById = async (req, res) => {
    try {
        let employeeId = req.params.id_em;
        let employee = await Employee.findByPk(employeeId);
    
        if (!employee) {
            // Retornar una respuesta si no se encuentra el empleado
            res.status(404).json({
                message: "Empleado no encontrado para actualizar con id = " + employeeId,
                error: "404"
            });
        } else {
            // Actualizar el empleado en la base de datos
            let updatedObject = {
                emp_id: req.body.emp_id,
                fname: req.body.fname,
                sname: req.body.sname,
                flastname: req.body.flastname,
                slastname: req.body.slastname,
                nit: req.body.nit,
                salary: req.body.salary,
                estatus: req.body.estatus,
                id_departamento: req.body.id_departamento
            };
            let result = await Employee.update(updatedObject, { returning: true, where: { id_em: employeeId } });
            
            // Retornar la respuesta al cliente
            if (!result[0]) {
                res.status(500).json({
                    message: "Error al actualizar el empleado con id = " + req.params.id_em,
                    error: "No se pudo actualizar"
                });
            } else {
                res.status(200).json({
                    message: "Empleado actualizado con éxito con id = " + employeeId,
                    employee: updatedObject,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el empleado con id = " + req.params.id_em,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let employeeId = req.params.id_em;
        let employee = await Employee.findByPk(employeeId);

        if (!employee) {
            res.status(404).json({
                message: "Empleado no encontrado con id = " + employeeId,
                error: "404"
            });
        } else {
            await employee.destroy();
            res.status(200).json({
                message: "Empleado eliminado con éxito con id = " + employeeId,
                employee: employee,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el empleado con id = " + req.params.id_em,
            error: error.message
        });
    }
}
