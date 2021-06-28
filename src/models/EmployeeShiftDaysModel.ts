import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Shift from './EmployeeShiftsModel';
import ShiftSchedule from './EmployeeShiftSchedulesModel';

@Entity('employee_shift_days')
export default class UsersModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    week_day: number;

    @ManyToOne(() => Shift, shift => shift.days)
    @JoinColumn({ name: 'shift_id' })
    shift: Shift;

    @OneToMany(() => ShiftSchedule, shiftDay => shiftDay.day)
    @JoinColumn({ name: 'shift_day_id' })
    schedules: ShiftSchedule[];
}