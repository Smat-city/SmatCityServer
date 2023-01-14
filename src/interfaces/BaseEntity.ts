import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export default abstract class BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column("timestamp")
  createdAt: Date

  @Column("timestamp", {
    default: null,
  })
  updatedAt: Date | null
}
