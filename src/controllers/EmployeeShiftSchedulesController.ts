import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import employeeShiftScheduleView from '../views/employeeShiftScheduleView';
import { EmployeeShiftSchedulesRepository } from '../repositories/EmployeeShiftSchedulesRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "shifts", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const schedulesRepository = getCustomRepository(EmployeeShiftSchedulesRepository);

        const schedules = await schedulesRepository.find();

        return response.json(employeeShiftScheduleView.renderMany(schedules));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "shifts", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const schedulesRepository = getCustomRepository(EmployeeShiftSchedulesRepository);

        const schedule = await schedulesRepository.findOneOrFail(id, {
            relations: [
                'day',
            ]
        });

        return response.json(employeeShiftScheduleView.render(schedule));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "shifts", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            from,
            to,
            day,
        } = request.body;

        const schedulesRepository = getCustomRepository(EmployeeShiftSchedulesRepository);

        const data = {
            from,
            to,
            day,
        };

        const schema = Yup.object().shape({
            from: Yup.number().required(),
            to: Yup.number().required(),
            day: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const schedule = schedulesRepository.create(data);

        await schedulesRepository.save(schedule);

        return response.status(201).json(employeeShiftScheduleView.render(schedule));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "shifts", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            from,
            to,
        } = request.body;

        const scheduleRepository = getCustomRepository(EmployeeShiftSchedulesRepository);

        const data = {
            from,
            to,
        };

        const schema = Yup.object().shape({
            from: Yup.number().required(),
            to: Yup.number().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const schedule = scheduleRepository.create(data);

        await scheduleRepository.update(id, schedule);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "shifts", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const schedulesRepository = getCustomRepository(EmployeeShiftSchedulesRepository);

        await schedulesRepository.delete(id);

        return response.status(204).send();
    }
}