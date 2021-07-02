import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createEmployeeAttendances1624901879536 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'employee_attendances',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'in',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'in_at',
                    type: 'datetime',
                    default: 'Now()',
                },
                {
                    name: 'out',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'out_at',
                    type: 'datetime',
                    default: 'Now()',
                },
                {
                    name: 'employee_id',
                    type: 'varchar',
                },
            ],
            foreignKeys: [
                {
                    name: 'AttendanceOnEmployee',
                    columnNames: ['employee_id'],
                    referencedTableName: 'employees',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('employee_attendances');
    }

}
