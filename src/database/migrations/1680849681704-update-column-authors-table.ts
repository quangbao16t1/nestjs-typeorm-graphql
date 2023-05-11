import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

const tableName = 'authors';
const tableColumnName = 'password';

export class updateColumnAuthorsTable1680849681704 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.changeColumn(tableName, tableColumnName, new TableColumn( {
      name: tableColumnName,
      type: 'varchar',
      isNullable: true
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.changeColumn(tableName, tableColumnName, new TableColumn( {
      name: tableColumnName,
      type: 'varchar',
    }));
  }
}
