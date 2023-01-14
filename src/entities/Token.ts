import { Column, Entity, ManyToOne } from "typeorm"
import { BaseEntity } from "../interfaces"
import User from "./User"

export enum TokenType {
  refresh = "refresh",
  reset = "reset",
  verification = "verification",
}

@Entity()
export default class Token extends BaseEntity {
  @Column("uuid")
  id: string

  @Column()
  token: string

  @ManyToOne(() => User)
  user: User

  @Column({
    type: "enum",
    enum: [TokenType.reset, TokenType.refresh, TokenType.verification],
  })
  type: TokenType

  @Column("timestamp", {
    default: null,
  })
  expiresAt: Date | null
}
