import { EntityRepository, Repository } from 'typeorm';

import EmployeesModel from '../models/EmployeesModel';

@EntityRepository(EmployeesModel)
class EmployeesRepository extends Repository<EmployeesModel> { }

export { EmployeesRepository };