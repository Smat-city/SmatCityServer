import { Column, Entity, ManyToOne } from "typeorm"
import { BaseEntity } from "../interfaces"
// eslint-disable-next-line import/no-cycle
import Accomodation from "./Accomodation"

export enum MediaType {
  image = "image",
  video = "video",
}

export enum MediaTag {
  bathroom = "bathroom",
  compound = "compound",
  kitchen = "kitchen",
  room = "room",
  toilet = "toilet",
}

@Entity()
export default class Media extends BaseEntity {
  @Column()
  url: string

  @Column({
    type: "enum",
    enum: [MediaType.image, MediaType.video],
  })
  type: MediaType

  @Column({
    type: "enum",
    enum: [
      MediaTag.bathroom,
      MediaTag.compound,
      MediaTag.kitchen,
      MediaTag.room,
      MediaTag.toilet,
    ],
  })
  tag: MediaTag

  @ManyToOne(() => Accomodation, (accomodation) => accomodation.media)
  accomodation: Accomodation
}
