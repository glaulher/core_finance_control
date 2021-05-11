import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('parcels')
class Parcel {
  @PrimaryColumn()
  readonly id: string;

  @Column('int')
  quantity: number;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
export { Parcel };
