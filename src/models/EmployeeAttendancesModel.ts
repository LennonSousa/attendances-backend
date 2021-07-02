import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Employee from './EmployeesModel';

@Entity('employee_attendances')
export default class EmployeeAttendancesModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    in: boolean;

    @Column()
    in_at: Date;

    @Column()
    out: boolean;

    @Column()
    out_at: Date;

    @ManyToOne(() => Employee, employee => employee.attendances)
    @JoinColumn({ name: 'employee_id' })
    employee: Employee;
}