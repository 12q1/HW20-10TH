// src/games/entity.ts
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert} from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, Length } from 'class-validator'

const getRandomNumber = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
} //end of getRandomNumber: use this to generate a random integer, define the maximum in the parameter

const defaultBoard = [
	['o', 'o', 'o'],
	['o', 'o', 'o'],
	['o', 'o', 'o']
] 
//default board format

type color = 'red' | 'green' | 'blue' | 'yellow' | 'magenta'
//color union types

@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Length(5, 25)
  @Column('text', { nullable: false })
  name: string

  @Column('text')
  color?: color | string

  @Column('text')
  board?: string

  @BeforeInsert()
  creator() {
    const colors = ['red', 'green', 'blue', 'magenta', 'yellow']
    this.color = colors[getRandomNumber(colors.length)]
    this.board = JSON.stringify(defaultBoard)
  }
}