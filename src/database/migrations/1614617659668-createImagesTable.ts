import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImagesTable1614617659668 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'images',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'name',
                    type: 'varchar',                    
                },
                {
                    name: 'size',
                    type: 'integer'
                },
                {
                    name: 'key',
                    type: 'varchar'
                },
                {
                    name: 'url',
                    type: 'varchar'
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'product_id',
                    type: 'uuid'
                }
            ],
            foreignKeys: [
                {
                    name: 'fk_images_1',
                    columnNames: ['product_id'],
                    referencedTableName: 'products',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('images');
    }

}
