import { Column, Entity, OneToOne } from "typeorm"
import { BaseEntity } from "../interfaces"
// eslint-disable-next-line import/no-cycle
import Accomodation from "./Accomodation"

@Entity()
export default class Address extends BaseEntity {
  @Column()
  address: string

  @Column()
  city: string

  @Column()
  state: string

  @Column()
  country: string

  @OneToOne(() => Accomodation)
  accomodation: Accomodation
}
