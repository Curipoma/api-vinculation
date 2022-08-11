import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('solicitudStudents', { schema: 'core' })
export class SolicitudStudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    name: 'name',
    length: 255,
    default: 'SN',
    comment: 'Nombre de la solicitud',
  })
  name: string;
}
