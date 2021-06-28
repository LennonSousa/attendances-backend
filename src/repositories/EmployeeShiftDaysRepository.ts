import { EntityRepository, Repository } from 'typeorm';

import EmployeeShiftDaysModel from '../models/EmployeeShiftDaysModel';

@EntityRepository(EmployeeShiftDaysModel)
class EmployeeShiftDaysRepository extends Repository<EmployeeShiftDaysModel> { }

export { EmployeeShiftDaysRepository };