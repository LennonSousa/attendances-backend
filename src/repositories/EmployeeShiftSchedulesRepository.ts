import { EntityRepository, Repository } from 'typeorm';

import EmployeeShiftSchedulesModel from '../models/EmployeeShiftSchedulesModel';

@EntityRepository(EmployeeShiftSchedulesModel)
class EmployeeShiftSchedulesRepository extends Repository<EmployeeShiftSchedulesModel> { }

export { EmployeeShiftSchedulesRepository };