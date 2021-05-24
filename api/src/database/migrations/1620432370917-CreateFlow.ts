import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateFlow1620432370917 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'flow',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'id_cash_infusion',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'id_category',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'id_user',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'id_parcel',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'cash',
            type: 'decimal(10,2)',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'flow',
      new TableForeignKey({
        name: 'cash_flow',
        columnNames: ['id_cash_infusion'],
        referencedColumnNames: ['id'],
        referencedTableName: 'cash_infusion',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'flow',
      new TableForeignKey({
        name: 'category_flow',
        columnNames: ['id_category'],
        referencedColumnNames: ['id'],
        referencedTableName: 'category',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'flow',
      new TableForeignKey({
        name: 'user_flow',
        columnNames: ['id_user'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'flow',
      new TableForeignKey({
        name: 'parcel_flow',
        columnNames: ['id_parcel'],
        referencedColumnNames: ['id'],
        referencedTableName: 'parcels',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('flow');
  }
}
