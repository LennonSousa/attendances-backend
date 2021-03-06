import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import ShiftDay from './EmployeeShiftDaysModel';
import Employee from './EmployeesModel';

@Entity('employee_shifts')
export default class EmployeeShiftsModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    tolerance: number;

    @OneToMany(() => ShiftDay, shiftDay => shiftDay.shift)
    @JoinColumn({ name: 'shift_id' })
    days: ShiftDay[];

    @OneToMany(() => Employee, employee => employee.shift)
    @JoinColumn({ name: 'shift_id' })
    employees: Employee[];
}