import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import { Student } from "./entities/Student";
export { Student } from "./entities/Student";
import { StudentRepository } from "./StudentRepository";
export { StudentRepository } from "./StudentRepository";
import { OfferedClassRepository } from "./OfferedClassRepository";
export { OfferedClassRepository } from "./OfferedClassRepository";
import { OfferedClass } from "./entities/OfferedClass";
export { OfferedClass } from "./entities/OfferedClass";

var _connection: Connection;

export async function connect() {
  _connection = await createConnection({
    type: "mssql",
    host: "localhost",
    port: 1433,
    username: "SA",
    password: "<YourStrong@Passw0rd>",
    database: "tsDB",
    entities: [Student, OfferedClass]
  });
}

export function connected() {
  console.log(_connection);
  return typeof _connection !== "undefined";
}

export function getStudentRepository(): StudentRepository {
  return _connection.getCustomRepository(StudentRepository);
}

export function getOfferedClassRepository(): OfferedClassRepository {
  return _connection.getCustomRepository(OfferedClassRepository);
}
