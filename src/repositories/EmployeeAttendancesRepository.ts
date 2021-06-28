import { EntityRepository, Repository } from 'typeorm';

import EmployeeAttendancesModel from '../models/EmployeeAttendancesModel';

@EntityRepository(EmployeeAttendancesModel)
class EmployeeAttendancesRepository extends Repository<EmployeeAttendancesModel> { }

export { EmployeeAttendancesRepository };