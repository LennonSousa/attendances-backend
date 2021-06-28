import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createEmployeeShiftDays1624893692507 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'employee_shift_days',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'week_day',
                    type: 'integer'
                },
                {
                    name: 'shift_id',
                    type: 'varchar',
                },
            ],
            foreignKeys: [
                {
                    name: 'DayOnShifts',
                    columnNames: ['shift_id'],
                    referencedTableName: 'employee_shifts',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('employee_shift_days');
    }

}
