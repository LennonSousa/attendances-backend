import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import ShiftDay from './EmployeeShiftDaysModel';

@Entity('employee_shift_schedules')
export default class EmployeeShiftSchedulesModel {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    from: number;

    @Column()
    to: number;

    @ManyToOne(() => ShiftDay, shiftDay => shiftDay.schedules)
    @JoinColumn({ name: 'shift_day_id' })
    day: ShiftDay;
}