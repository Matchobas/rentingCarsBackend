import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCars1655429196623 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cars',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'daily_rate',
            type: 'numeric',
          },
          {
            name: 'available',
            type: 'boolean',
            default: true,
          },
          {
            name: 'licese_plate',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'fine_amount',
            type: 'numeric',
          },
          {
            name: 'brand',
            type: 'varchar',
          },
          {
            name: 'category_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'fk_category_car',
            referencedTableName: 'categories',
            referencedColumnNames: ['id'],
            columnNames: ['category_id'],
            onDelete: 'SET_NULL',
            onUpdate: 'SET_NULL',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cars');
  }
}