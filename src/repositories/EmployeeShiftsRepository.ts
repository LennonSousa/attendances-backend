import { EntityRepository, Repository } from 'typeorm';

import EmployeeShiftsModel from '../models/EmployeeShiftsModel';

@EntityRepository(EmployeeShiftsModel)
class EmployeeShiftsRepository extends Repository<EmployeeShiftsModel> { }

export { EmployeeShiftsRepository };