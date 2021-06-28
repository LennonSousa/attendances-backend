import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import employeeView from '../views/employeeView';
import { EmployeesRepository } from '../repositories/EmployeesRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "customers", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const customersRepository = getCustomRepository(EmployeesRepository);

        const customers = await customersRepository.find({
            relations: [
                'shift',
            ],
            order: {
                created_at: "ASC"
            }
        });

        return response.json(employeeView.renderMany(customers));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "customers", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const customersRepository = getCustomRepository(EmployeesRepository);

        const customer = await customersRepository.findOneOrFail(id, {
            relations: [
                'shift',
                'attendances',
            ]
        });

        return response.json(employeeView.render(customer));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "customers", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            name,
            pin,
            shift,
        } = request.body;

        const customersRepository = getCustomRepository(EmployeesRepository);

        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findOneOrFail(user_id);

        const data = {
            name,
            pin,
            shift,
            created_by: user.name,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            pin: Yup.string().required(),
            shift: Yup.string().required(),
            created_by: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const customer = customersRepository.create(data);

        await customersRepository.save(customer);

        return response.status(201).json(employeeView.render(customer));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "customers", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            name,
            pin,
            shift,
        } = request.body;

        const customersRepository = getCustomRepository(EmployeesRepository);

        const data = {
            name,
            pin,
            shift,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            pin: Yup.string().required(),
            shift: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const customer = customersRepository.create(data);

        await customersRepository.update(id, customer);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "customers", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const customersRepository = getCustomRepository(EmployeesRepository);

        await customersRepository.delete(id);

        return response.status(204).send();
    }
}