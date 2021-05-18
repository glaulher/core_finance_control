import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid'; // lembrar de testar sem ele e constructor
import { User } from './User';
import { CashInfusion } from './CashInfusion';
import { Category } from './Category';
import { Parcel } from './Parcel';

@Entity('flow')
class flow {
  @PrimaryColumn()
  readonly id: string; // ver se precisa de readonly

  @Column()
  readonly id_cash_infusion: string;

  @ManyToOne(() => CashInfusion)
  @JoinColumn({ name: 'id_cash_infusion' })
  cash_infusion: CashInfusion;

  @Column()
  readonly id_category: string;

  @ManyToOne(() => Category)
  category: Category;

  @Column()
  readonly id_user: string;

  @ManyToOne(() => User)
  user: User;

  @Column()
  readonly id_parcel: string;

  @ManyToOne(() => Parcel)
  parcel: Parcel;

  @Column('decimal')
  cash: number;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
export { flow };
