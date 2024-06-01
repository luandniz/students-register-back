import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("students")
export default class Student {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 254, unique: true })
  email: string;

  @Column({ length: 11, unique: true })
  cpf: string;
}
