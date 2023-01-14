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

  @Column()
  username: string

  @Column()
  password: string

  @Column()
  email: string

  @Column({
    type: "enum",
    enum: [UserRole.basic, UserRole.pro, UserRole.admin],
    default: UserRole.basic,
  })
  type: UserRole
}
