import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import employeeShiftDayView from '../views/employeeShiftDayView';
import { EmployeeShiftDaysRepository } from '../repositories/EmployeeShiftDaysRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "shifts", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const daysRepository = getCustomRepository(EmployeeShiftDaysRepository);

        const days = await daysRepository.find();

        return response.json(employeeShiftDayView.renderMany(days));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "shifts", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const daysRepository = getCustomRepository(EmployeeShiftDaysRepository);

        const day = await daysRepository.findOneOrFail(id, {
            relations: [
                'shift',
                'schedules',
            ]
        });

        return response.json(employeeShiftDayView.render(day));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "shifts", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            week_day,
            shift,
        } = request.body;

        const daysRepository = getCustomRepository(EmployeeShiftDaysRepository);

        const data = {
            week_day,
            shift,
        };

        const schema = Yup.object().shape({
            week_day: Yup.number().required(),
            shift: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const day = daysRepository.create(data);

        await daysRepository.save(day);

        return response.status(201).json(employeeShiftDayView.render(day));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "shifts", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            week_day,
            shift,
        } = request.body;

        const dayRepository = getCustomRepository(EmployeeShiftDaysRepository);

        const data = {
            week_day,
            shift,
        };

        const schema = Yup.object().shape({
            week_day: Yup.number().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const day = dayRepository.create(data);

        await dayRepository.update(id, day);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "shifts", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const daysRepository = getCustomRepository(EmployeeShiftDaysRepository);

        await daysRepository.delete(id);

        return response.status(204).send();
    }
}