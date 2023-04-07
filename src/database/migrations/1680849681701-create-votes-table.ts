import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

const tableName = 'votes';

export class createVotesTable1680849681701 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            generationStrategy: 'increment',
            isNullable: false,
            isGenerated: true,
            unsigned: true,
          },
          {
            name: 'user_id',
            type: 'bigint',
            unsigned: true,
          },
          {
            name: 'post_id',
            type: 'bigint',
            unsigned: true,
          },
          {
            name: 'vote',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'datetime',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'datetime',
            isNullable: true,
            default: null,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'authors',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: ['post_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'posts',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(tableName);
  }
}
