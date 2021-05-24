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
class Flow {
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
  @JoinColumn({ name: 'id_category' })
  category: Category;

  @Column()
  readonly id_user: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @Column()
  readonly id_parcel: string;

  @ManyToOne(() => Parcel)
  @JoinColumn({ name: 'id_parcel' })
  parcel: Parcel;

  @Column('decimal')
  cash: number;

  @Column()
  description: string;

  @Column()
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
export { Flow };
