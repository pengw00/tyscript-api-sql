import { Repository } from "typeorm";
import { Student } from "./entities/Student";
export declare type GenderType = "male" | "female";
export declare enum Gender {
    male = "male",
    female = "female"
}
export declare function normalizeNumber(num: number | string, errorIfNotNumber: string): number;
export declare class StudentRepository extends Repository<Student> {
    static isStudent(student: any): student is Student;
    static isStudentUpdater(updater: any): boolean;
    static isGender(gender: any): gender is Gender;
    createAndSave(student: Student): Promise<number>;
    allStudents(): Promise<Student[]>;
    findOneStudent(id: number): Promise<Student>;
    updateStudent(id: number, student: Student): Promise<number>;
    deleteStudent(student: number | Student): Promise<void>;
}
//# sourceMappingURL=StudentRepository.d.ts.map