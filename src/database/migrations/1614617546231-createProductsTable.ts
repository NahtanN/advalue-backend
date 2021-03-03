import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createProductsTable1614617546231 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'products',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                },
                {
                    name: 'title',
                    type: 'varchar'
                },
                {
                    name: 'value',
                    type: 'integer'
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'category_id',
                    type: 'integer'
                },
            ],
            foreignKeys: [
                {
                    name: 'fk_publications_1',
                    columnNames: ['category_id'],
                    referencedTableName: 'categories',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE'
                }
            ]
        }));
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('products');
    }

}
