import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddUserIdToAppointments1601736131584
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentUser',
        columnNames: ['user_id'], // Vai receber a chave estrangeira
        referencedColumnNames: ['id'], // Da coluna 'id', da tabela de 'users'
        referencedTableName: 'users',
        onDelete: 'SET NULL', // Quando deletar esse provider, vai setar o 'provider_id' como 'null'
        onUpdate: 'CASCADE', // Quando atualizar o id do provider, vai atualizar o provider_id, nas tabela que estao relacionadas, como a tabela 'users'
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

    await queryRunner.dropColumn('appointments', 'user_id');
  }
}
