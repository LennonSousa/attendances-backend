import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createEmployees1624893723930 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'employees',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'pin',
                    type: 'varchar',
                },
                {
                    name: 'created_by',
                    type: 'varchar',
                },
                {
                    name: 'created_at',
                    type: 'datetime',
                    default: 'Now()',
                },
                {
                    name: 'shift_id',
                    type: 'varchar',
                },
            ],
            foreignKeys: [
                {
                    name: 'EmployeeOnShift',
                    columnNames: ['shift_id'],
                    referencedTableName: 'employee_shifts',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'RESTRICT',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('employees');
    }

}
