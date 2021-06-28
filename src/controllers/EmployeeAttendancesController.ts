import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import employeeAttendanceView from '../views/employeeAttendanceView';
import { EmployeeAttendancesRepository } from '../repositories/EmployeeAttendancesRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "attendances", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const attendancesRepository = getCustomRepository(EmployeeAttendancesRepository);

        const attendances = await attendancesRepository.find({
            relations: [
                'employee',
            ],
            order: {
                created_at: "ASC"
            }
        });

        return response.json(employeeAttendanceView.renderMany(attendances));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "attendances", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const attendancesRepository = getCustomRepository(EmployeeAttendancesRepository);

        const attendance = await attendancesRepository.findOneOrFail(id, {
            relations: [
                'employee',
                'attendances',
            ]
        });

        return response.json(employeeAttendanceView.render(attendance));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "attendances", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            employee,
        } = request.body;

        const attendancesRepository = getCustomRepository(EmployeeAttendancesRepository);

        const data = {
            employee,
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