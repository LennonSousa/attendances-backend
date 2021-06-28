import express from 'express';

//import { UploadsConfig } from '../config/uploads';

import EmployeesController from '../controllers/EmployeesController';
import EmployeeShiftsController from '../controllers/EmployeeShiftsController';
import EmployeeShiftDaysController from '../controllers/EmployeeShiftDaysController';
import EmployeeShiftSchedulesController from '../controllers/EmployeeShiftSchedulesController';
import EmployeeAttendancesController from '../controllers/EmployeeAttendancesController';

import UsersController from '../controllers/UsersController';
import UsersRolesController from '../controllers/UsersRolesController';
import UsersNewController from '../controllers/UsersNewController';

import usersAuthMiddleware from '../middlewares/usersAuth';

const userAuthRoutes = express.Router();

userAuthRoutes.get('/users/authenticated', usersAuthMiddleware, function (request, response) {
    return response.status(202).json();
});

userAuthRoutes.get('/users', usersAuthMiddleware, UsersController.index);
userAuthRoutes.get('/users/:id', usersAuthMiddleware, UsersController.show);
userAuthRoutes.post('/users', usersAuthMiddleware, UsersController.create);
userAuthRoutes.put('/users/:id', usersAuthMiddleware, UsersController.update);
userAuthRoutes.delete('/users/:id', usersAuthMiddleware, UsersController.delete);

userAuthRoutes.get('/user/roles', usersAuthMiddleware, UsersRolesController.generate);
userAuthRoutes.put('/users/roles/:id', usersAuthMiddleware, UsersRolesController.update);

userAuthRoutes.put('/users/new/:id', usersAuthMiddleware, UsersNewController.update);

userAuthRoutes.get('/employees/shifts', usersAuthMiddleware, EmployeeShiftsController.index);
userAuthRoutes.get('/employees/shifts/:id', usersAuthMiddleware, EmployeeShiftsController.show);
userAuthRoutes.post('/employees/shifts', usersAuthMiddleware, EmployeeShiftsController.create);
userAuthRoutes.put('/employees/shifts/:id', usersAuthMiddleware, EmployeeShiftsController.update);
userAuthRoutes.delete('/employees/shifts/:id', usersAuthMiddleware, EmployeeShiftsController.delete);

userAuthRoutes.get('/employees/shifts/days', usersAuthMiddleware, EmployeeShiftDaysController.index);
userAuthRoutes.get('/employees/shifts/days/:id', usersAuthMiddleware, EmployeeShiftDaysController.show);
userAuthRoutes.post('/employees/shifts/days', usersAuthMiddleware, EmployeeShiftDaysController.create);
userAuthRoutes.put('/employees/shifts/days/:id', usersAuthMiddleware, EmployeeShiftDaysController.update);
userAuthRoutes.delete('/employees/shifts/days/:id', usersAuthMiddleware, EmployeeShiftDaysController.delete);

userAuthRoutes.get('/employees/shifts/schedules', usersAuthMiddleware, EmployeeShiftSchedulesController.index);
userAuthRoutes.get('/employees/shifts/schedules/:id', usersAuthMiddleware, EmployeeShiftSchedulesController.show);
userAuthRoutes.post('/employees/shifts/schedules', usersAuthMiddleware, EmployeeShiftSchedulesController.create);
userAuthRoutes.put('/employees/shifts/schedules/:id', usersAuthMiddleware, EmployeeShiftSchedulesController.update);
userAuthRoutes.delete('/employees/shifts/schedules/:id', usersAuthMiddleware, EmployeeShiftSchedulesController.delete);

userAuthRoutes.get('/employees/:id/attendances', usersAuthMiddleware, EmployeeAttendancesController.index);
userAuthRoutes.post('/employees/:id/attendances', usersAuthMiddleware, EmployeeAttendancesController.create);

userAuthRoutes.get('/employees', usersAuthMiddleware, EmployeesController.index);
userAuthRoutes.get('/employees/:id', usersAuthMiddleware, EmployeesController.show);
userAuthRoutes.post('/employees', usersAuthMiddleware, EmployeesController.create);
userAuthRoutes.put('/employees/:id', usersAuthMiddleware, EmployeesController.update);
userAuthRoutes.delete('/employees/:id', usersAuthMiddleware, EmployeesController.delete);

export default userAuthRoutes;