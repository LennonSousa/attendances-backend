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
userAuthRoutes.post('/users', UsersController.create);
userAuthRoutes.put('/users/:id', usersAuthMiddleware, UsersController.update);
userAuthRoutes.delete('/users/:id', usersAuthMiddleware, UsersController.delete);

userAuthRoutes.get('/user/roles', usersAuthMiddleware, UsersRolesController.generate);
userAuthRoutes.put('/users/roles/:id', usersAuthMiddleware, UsersRolesController.update);

userAuthRoutes.put('/users/new/:id', usersAuthMiddleware, UsersNewController.update);

userAuthRoutes.get('/attendances/shifts/days', usersAuthMiddleware, EmployeeShiftDaysController.index);
userAuthRoutes.get('/attendances/shifts/days/:id', usersAuthMiddleware, EmployeeShiftDaysController.show);
userAuthRoutes.post('/attendances/shifts/days', usersAuthMiddleware, EmployeeShiftDaysController.create);
userAuthRoutes.put('/attendances/shifts/days/:id', usersAuthMiddleware, EmployeeShiftDaysController.update);
userAuthRoutes.delete('/attendances/shifts/days/:id', usersAuthMiddleware, EmployeeShiftDaysController.delete);

userAuthRoutes.get('/attendances/shifts/schedules', usersAuthMiddleware, EmployeeShiftSchedulesController.index);
userAuthRoutes.get('/attendances/shifts/schedules/:id', usersAuthMiddleware, EmployeeShiftSchedulesController.show);
userAuthRoutes.post('/attendances/shifts/schedules', usersAuthMiddleware, EmployeeShiftSchedulesController.create);
userAuthRoutes.put('/attendances/shifts/schedules/:id', usersAuthMiddleware, EmployeeShiftSchedulesController.update);
userAuthRoutes.delete('/attendances/shifts/schedules/:id', usersAuthMiddleware, EmployeeShiftSchedulesController.delete);

userAuthRoutes.get('/attendances/shifts', usersAuthMiddleware, EmployeeShiftsController.index);
userAuthRoutes.get('/attendances/shifts/:id', usersAuthMiddleware, EmployeeShiftsController.show);
userAuthRoutes.post('/attendances/shifts', usersAuthMiddleware, EmployeeShiftsController.create);
userAuthRoutes.put('/attendances/shifts/:id', usersAuthMiddleware, EmployeeShiftsController.update);
userAuthRoutes.delete('/attendances/shifts/:id', usersAuthMiddleware, EmployeeShiftsController.delete);

userAuthRoutes.get('/attendances/employees', usersAuthMiddleware, EmployeesController.index);
userAuthRoutes.get('/attendances/employees/:id', usersAuthMiddleware, EmployeesController.show);
userAuthRoutes.post('/attendances/employees', usersAuthMiddleware, EmployeesController.create);
userAuthRoutes.put('/attendances/employees/:id', usersAuthMiddleware, EmployeesController.update);
userAuthRoutes.delete('/attendances/employees/:id', usersAuthMiddleware, EmployeesController.delete);

userAuthRoutes.get('attendances/employee/:id', usersAuthMiddleware, EmployeeAttendancesController.index);
userAuthRoutes.post('attendances/employee/:id', usersAuthMiddleware, EmployeeAttendancesController.create);

export default userAuthRoutes;