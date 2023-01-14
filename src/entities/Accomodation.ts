import { Column, Entity } from "typeorm"
import { BaseEntity } from "../interfaces"

enum CompoundType {
  flat = "flat",
}

@Entity()
export default class Accomodation extends BaseEntity {
  @Column()
  title: string

  @Column({
    type: "boolean",
    default: false,
  })
  verified: boolean

  @Column({
    type: "enum",
    enum: [CompoundType.flat],
  })
  compoundType: CompoundType
}
