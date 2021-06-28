import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Employee from './EmployeesModel';

@Entity('employee_attendances')
export default class UsersModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    created_at: Date;

    @ManyToOne(() => Employee, employee => employee.attendances)
    @JoinColumn({ name: 'employee_id' })
    employee: Employee;
}