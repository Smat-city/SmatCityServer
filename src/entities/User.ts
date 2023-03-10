import { Entity, Column } from "typeorm"
import { BaseEntity } from "../interfaces"

enum UserRole {
  admin = "admin",
  basic = "basic",
  pro = "pro",
}

@Entity()
export default class User extends BaseEntity {
  @Column()
  firstname: string

  @Column()
  lastname: string

  @Column({
    unique: true,
  })
  username: string

  @Column()
  password: string

  @Column({
    unique: true,
  })
  email: string

  @Column({
    type: "bool",
    default: 0,
  })
  verified: boolean

  @Column({
    type: "enum",
    enum: [UserRole.basic, UserRole.pro, UserRole.admin],
    default: UserRole.basic,
  })
  type: UserRole
}
