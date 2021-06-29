import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import employeeShiftView from '../views/employeeShiftView';
import { EmployeeShiftsRepository } from '../repositories/EmployeeShiftsRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "shifts", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const shiftsRepository = getCustomRepository(EmployeeShiftsRepository);

        const shifts = await shiftsRepository.find();

        return response.json(employeeShiftView.renderMany(shifts));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "shifts", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const shiftsRepository = getCustomRepository(EmployeeShiftsRepository);

        const shift = await shiftsRepository.findOneOrFail(id, {
            relations: [
                'days',
                'days.schedules',
                'employees',
            ]
        });

        return response.json(employeeShiftView.render(shift));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "shifts", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            name,
            tolerance,
        } = request.body;

        const shiftsRepository = getCustomRepository(EmployeeShiftsRepository);

        const data = {
            name,
            tolerance,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            tolerance: Yup.number().notRequired(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const shift = shiftsRepository.create(data);

        await shiftsRepository.save(shift);

        return response.status(201).json(employeeShiftView.render(shift));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "employees", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            name,
            tolerance,
        } = request.body;

        const shiftRepository = getCustomRepository(EmployeeShiftsRepository);

        const data = {
            name,
            tolerance,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            tolerance: Yup.number().notRequired(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const shift = shiftRepository.create(data);

        await shiftRepository.update(id, shift);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "shifts", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const shiftsRepository = getCustomRepository(EmployeeShiftsRepository);

        await shiftsRepository.delete(id);

        return response.status(204).send();
    }
}