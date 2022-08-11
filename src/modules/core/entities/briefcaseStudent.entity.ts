import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('briefcaseStudents', { schema: 'core' })
export class BriefcaseStudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    name: 'name',
    length: 255,
    default: 'SN',
    comment: 'Nombre del portafolio',
  })
  name: string;
}
