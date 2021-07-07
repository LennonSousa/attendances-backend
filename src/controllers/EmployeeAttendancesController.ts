import { Request, Response } from 'express';
import { Between, getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import { endOfToday, startOfToday } from 'date-fns';

import employeeView from '../views/employeeView';
import employeeAttendanceView from '../views/employeeAttendanceView';
import { EmployeeAttendancesRepository } from '../repositories/EmployeeAttendancesRepository';
import { EmployeesRepository } from '../repositories/EmployeesRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;
        const { start, end, employee } = request.query;

        if (! await UsersRolesController.can(user_id, "attendances", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const attendancesRepository = getCustomRepository(EmployeeAttendancesRepository);

        if (employee) {
            const attendances = await attendancesRepository.find({
                where: {
                    in_at: Between(start, end),
                    employee
                },
                relations: [
                    'employee',
                ],
                order: {
                    in_at: "ASC"
                }
            });

            return response.json(employeeAttendanceView.renderMany(attendances));
        }

        const attendances = await attendancesRepository.find({
            where: {
                in_at: Between(start, end),
            },
            relations: [
                'employee',
            ],
            order: {
                employee: "ASC"
            }
        });

        return response.json(employeeAttendanceView.renderMany(attendances));
    },

    async show(request: Request, response: Response) {
        const { user_id } = request.params;
        const { pin } = request.query;

        if (! await UsersRolesController.can(user_id, "attendances", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const employeesRepository = getCustomRepository(EmployeesRepository);

        const foundEmployee = await employeesRepository.findOne({
            where: { pin },
            relations: [
                'shift',
                'shift.days',
                'shift.days.schedules',
            ]
        });

        if (!foundEmployee)
            return response.status(404).json({
                error: 'Employee pin dosen\'t exists.'
            });

        const attendancesRepository = getCustomRepository(EmployeeAttendancesRepository);

        const attendancesToday = await attendancesRepository.find({
            where: {
                employee: foundEmployee.id, in_at: Between(startOfToday(), endOfToday())
            },
            order: {
                in_at: "ASC"
            }
        });

        return response.json({
            employee: employeeView.render(foundEmployee),
            attendancesToday: employeeAttendanceView.renderMany(attendancesToday),
            now: new Date(),
        });
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "attendances", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            pin,
        } = request.body;

        const employeesRepository = getCustomRepository(EmployeesRepository);

        const foundEmployee = await employeesRepository.findOne({
            where: { pin },
        });

        if (!foundEmployee)
            return response.status(404).json({
                error: 'Employee pin dosen\'t exists.'
            });

        const attendancesRepository = getCustomRepository(EmployeeAttendancesRepository);

        const attendancesToday = await attendancesRepository.find({
            where: { employee: foundEmployee.id, in_at: Between(startOfToday(), endOfToday()) },
        });

        const toUpdateToday = attendancesToday.find(attendanceToday => { return !attendanceToday.out });

        if (toUpdateToday) {
            const data = {
                out: true,
                out_at: new Date(),
            };

            const schema = Yup.object().shape({
                out: Yup.boolean().required(),
                out_at: Yup.date().required(),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const attendance = attendancesRepository.create(data);

            await attendancesRepository.update(toUpdateToday.id, attendance);

            return response.status(201).json(employeeAttendanceView.render(attendance));
        }

        const data = {
            in: true,
            employee: foundEmployee.id as any,
        };

        const schema = Yup.object().shape({
            employee: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const attendance = attendancesRepository.create(data);

        await attendancesRepository.save(attendance);

        return response.status(201).json(employeeAttendanceView.render(attendance));
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "attendances", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const attendancesRepository = getCustomRepository(EmployeeAttendancesRepository);

        await attendancesRepository.delete(id);

        return response.status(204).send();
    }
}