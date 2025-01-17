import { Column, Entity } from 'typeorm';
import { DefaultEntity } from 'src/utils/entities/default.entity';
@Entity('config')
export class ConfigEntity extends DefaultEntity {
  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'value' })
  value: number;
}
