import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Shift from './EmployeeShiftsModel';
import Attendance from './EmployeeAttendancesModel';

@Entity('employees')
export default class EmployeesModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    pin: string;

    @Column()
    created_by: string;

    @Column()
    created_at: Date;

    @ManyToOne(() => Shift, shift => shift.employees)
    @JoinColumn({ name: 'shift_id' })
    shift: Shift;

    @OneToMany(() => Attendance, attendance => attendance.employee)
    @JoinColumn({ name: 'employee_id' })
    attendances: Attendance[];
}