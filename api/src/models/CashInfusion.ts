import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('cash_infusion')
class CashInfusion {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  cash_infusion: number;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
export { CashInfusion };
