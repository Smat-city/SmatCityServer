import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm"
import { BaseEntity } from "../interfaces"
// eslint-disable-next-line import/no-cycle
import Address from "./Address"
// eslint-disable-next-line import/no-cycle
import Media from "./Media"

@Entity()
export default class Accomodation extends BaseEntity {
  @Column()
  title: string

  @Column({
    type: "boolean",
    default: false,
  })
  verified: boolean

  @Column()
  compoundType: string

  @Column()
  houseType: string

  @Column({
    type: "boolean",
    default: false,
  })
  tiled: boolean

  @Column({
    type: "boolean",
    default: false,
  })
  waterSupply: boolean

  @Column({
    type: "boolean",
    default: false,
  })
  security: boolean

  initialFee: number

  subsequentFee: number

  @OneToMany(() => Media, (media) => media.accomodation)
  media: Media[]

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address
}
