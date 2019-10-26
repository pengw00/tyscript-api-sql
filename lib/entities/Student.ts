import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable
} from "typeorm";

import { OfferedClass } from "./OfferedClass";

@Entity()
export class Student {
  @PrimaryGeneratedColumn() id: number;
  @Column({
    length: 100
  })
  name: string;
  @Column("int") entered: number;
  @Column("int") grade: number;
  @Column() gender: string;

  @ManyToMany(() => OfferedClass, oclass => oclass.students)
  @JoinTable()
  classes: OfferedClass[];
}

export function normalizeNumber(
  num: number | string,
  errorIfNotNumber: string
): number {
  if (typeof num === "undefined") {
    throw new Error(`${errorIfNotNumber} -- ${num}`);
  }
  if (typeof num === "number") return num;
  let ret = parseInt(num);
  if (isNaN(ret)) {
    throw new Error(`${errorIfNotNumber} ${ret} -- ${num}`);
  }
  return ret!;
}
