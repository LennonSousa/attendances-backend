import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createEmployeeShiftSchedules1624893716404 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'employee_shift_schedules',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'from',
                    type: 'integer',
                    default: 0
                },
                {
                    name: 'to',
                    type: 'integer',
                    default: 0
                },
                {
                    name: 'shift_day_id',
                    type: 'integer',
                    unsigned: true,
                },
            ],
            foreignKeys: [
                {
                    name: 'ShecheduleOnShiftDay',
                    columnNames: ['shift_day_id'],
                    referencedTableName: 'employee_shift_days',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('employee_shift_schedules');
    }

}
