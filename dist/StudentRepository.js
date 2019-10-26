"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var StudentRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Student_1 = require("./entities/Student");
const util = require("util");
var Gender;
(function (Gender) {
    Gender["male"] = "male";
    Gender["female"] = "female";
})(Gender = exports.Gender || (exports.Gender = {}));
function normalizeNumber(num, errorIfNotNumber) {
    if (typeof num === "undefined") {
        throw new Error(`${errorIfNotNumber} -- ${num}`);
    }
    if (typeof num === "number")
        return num;
    let ret = parseInt(num);
    if (isNaN(ret)) {
        throw new Error(`${errorIfNotNumber} ${ret} -- ${num}`);
    }
    return ret;
}
exports.normalizeNumber = normalizeNumber;
let StudentRepository = StudentRepository_1 = class StudentRepository extends typeorm_1.Repository {
    static isStudent(student) {
        return (typeof student === "object" &&
            typeof student.name === "string" &&
            typeof student.entered === "number" &&
            typeof student.grade === "number" &&
            StudentRepository_1.isGender(student.gender));
    }
    static isStudentUpdater(updater) {
        let ret = true;
        if (typeof updater !== "object") {
            throw new Error("isStudentUpdater must get object");
        }
        if (typeof updater.name !== "undefined") {
            if (typeof updater.name !== "string")
                ret = false;
        }
        if (typeof updater.entered !== "undefined") {
            if (typeof updater.entered !== "number")
                ret = false;
        }
        if (typeof updater.grade !== "undefined") {
            if (typeof updater.grade !== "number")
                ret = false;
        }
        if (typeof updater.gender !== "undefined") {
            if (!StudentRepository_1.isGender(updater.gender))
                ret = false;
        }
        return ret;
    }
    static isGender(gender) {
        return (typeof gender === "string" && (gender === "male" || gender === "female"));
    }
    async createAndSave(student) {
        let stud = new Student_1.Student();
        stud.name = student.name;
        stud.entered = normalizeNumber(student.entered, "Bad year entered");
        stud.grade = normalizeNumber(student.grade, "Bad grade");
        stud.gender = student.gender;
        await this.save(stud);
        return stud.id;
    }
    async allStudents() {
        let students = await this.find();
        return students;
    }
    async findOneStudent(id) {
        let student = await this.findOne({
            where: { id: id }
        });
        if (!StudentRepository_1.isStudent(student)) {
            throw new Error(`Student id ${util.inspect(id)} did not retrieve a Student`);
        }
        return student;
    }
    async updateStudent(id, student) {
        if (typeof student.entered !== "undefined") {
            student.entered = normalizeNumber(student.entered, "Bad year entered");
        }
        if (typeof student.grade !== "undefined") {
            student.grade = normalizeNumber(student.grade, "Bad grade");
        }
        if (!StudentRepository_1.isStudentUpdater(student)) {
            throw new Error(`Student update id ${util.inspect(id)} did not receive a Student updater ${util.inspect(student)}`);
        }
        await this.manager.update(Student_1.Student, id, student);
        return id;
    }
    async deleteStudent(student) {
        if (typeof student !== "number" && !StudentRepository_1.isStudent(student)) {
            throw new Error("Supplied student object not a Student");
        }
        await this.manager.delete(Student_1.Student, typeof student === "number" ? student : student.id);
    }
};
StudentRepository = StudentRepository_1 = __decorate([
    typeorm_1.EntityRepository(Student_1.Student)
], StudentRepository);
exports.StudentRepository = StudentRepository;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3R1ZGVudFJlcG9zaXRvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvU3R1ZGVudFJlcG9zaXRvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEscUNBQXNFO0FBQ3RFLGdEQUE2QztBQUM3Qyw2QkFBNkI7QUFFN0IsSUFBWSxNQUdYO0FBSEQsV0FBWSxNQUFNO0lBQ2hCLHVCQUFhLENBQUE7SUFDYiwyQkFBaUIsQ0FBQTtBQUNuQixDQUFDLEVBSFcsTUFBTSxHQUFOLGNBQU0sS0FBTixjQUFNLFFBR2pCO0FBRUQsU0FBZ0IsZUFBZSxDQUM3QixHQUFvQixFQUNwQixnQkFBd0I7SUFFeEIsSUFBSSxPQUFPLEdBQUcsS0FBSyxXQUFXLEVBQUU7UUFDOUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLGdCQUFnQixPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUM7S0FDbEQ7SUFDRCxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVE7UUFBRSxPQUFPLEdBQUcsQ0FBQztJQUN4QyxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEIsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDZCxNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsZ0JBQWdCLElBQUksR0FBRyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUM7S0FDekQ7SUFDRCxPQUFPLEdBQUksQ0FBQztBQUNkLENBQUM7QUFiRCwwQ0FhQztBQUdELElBQWEsaUJBQWlCLHlCQUE5QixNQUFhLGlCQUFrQixTQUFRLG9CQUFtQjtJQUN4RCxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQVk7UUFDM0IsT0FBTyxDQUNMLE9BQU8sT0FBTyxLQUFLLFFBQVE7WUFDM0IsT0FBTyxPQUFPLENBQUMsSUFBSSxLQUFLLFFBQVE7WUFDaEMsT0FBTyxPQUFPLENBQUMsT0FBTyxLQUFLLFFBQVE7WUFDbkMsT0FBTyxPQUFPLENBQUMsS0FBSyxLQUFLLFFBQVE7WUFDakMsbUJBQWlCLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FDM0MsQ0FBQztJQUNKLENBQUM7SUFDRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBWTtRQUNsQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7UUFDZixJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtZQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7U0FDckQ7UUFDRCxJQUFJLE9BQU8sT0FBTyxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUU7WUFDdkMsSUFBSSxPQUFPLE9BQU8sQ0FBQyxJQUFJLEtBQUssUUFBUTtnQkFBRSxHQUFHLEdBQUcsS0FBSyxDQUFDO1NBQ25EO1FBQ0QsSUFBSSxPQUFPLE9BQU8sQ0FBQyxPQUFPLEtBQUssV0FBVyxFQUFFO1lBQzFDLElBQUksT0FBTyxPQUFPLENBQUMsT0FBTyxLQUFLLFFBQVE7Z0JBQUUsR0FBRyxHQUFHLEtBQUssQ0FBQztTQUN0RDtRQUNELElBQUksT0FBTyxPQUFPLENBQUMsS0FBSyxLQUFLLFdBQVcsRUFBRTtZQUN4QyxJQUFJLE9BQU8sT0FBTyxDQUFDLEtBQUssS0FBSyxRQUFRO2dCQUFFLEdBQUcsR0FBRyxLQUFLLENBQUM7U0FDcEQ7UUFDRCxJQUFJLE9BQU8sT0FBTyxDQUFDLE1BQU0sS0FBSyxXQUFXLEVBQUU7WUFDekMsSUFBSSxDQUFDLG1CQUFpQixDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO2dCQUFFLEdBQUcsR0FBRyxLQUFLLENBQUM7U0FDOUQ7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFDRCxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQVc7UUFDekIsT0FBTyxDQUNMLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxDQUFDLE1BQU0sS0FBSyxNQUFNLElBQUksTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUN6RSxDQUFDO0lBQ0osQ0FBQztJQUNELEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBZ0I7UUFDbEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxpQkFBTyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUM3QixNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFDRCxLQUFLLENBQUMsV0FBVztRQUNmLElBQUksUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pDLE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFDRCxLQUFLLENBQUMsY0FBYyxDQUFDLEVBQVU7UUFDN0IsSUFBSSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQy9CLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7U0FDbEIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLG1CQUFpQixDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN6QyxNQUFNLElBQUksS0FBSyxDQUNiLGNBQWMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsNkJBQTZCLENBQzVELENBQUM7U0FDSDtRQUNELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFDRCxLQUFLLENBQUMsYUFBYSxDQUFDLEVBQVUsRUFBRSxPQUFnQjtRQUM5QyxJQUFJLE9BQU8sT0FBTyxDQUFDLE9BQU8sS0FBSyxXQUFXLEVBQUU7WUFDMUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1NBQ3hFO1FBQ0QsSUFBSSxPQUFPLE9BQU8sQ0FBQyxLQUFLLEtBQUssV0FBVyxFQUFFO1lBQ3hDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7U0FDN0Q7UUFDRCxJQUFJLENBQUMsbUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDaEQsTUFBTSxJQUFJLEtBQUssQ0FDYixxQkFBcUIsSUFBSSxDQUFDLE9BQU8sQ0FDL0IsRUFBRSxDQUNILHNDQUFzQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQy9ELENBQUM7U0FDSDtRQUNELE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsaUJBQU8sRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDaEQsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBQ0QsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUF5QjtRQUMzQyxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsSUFBSSxDQUFDLG1CQUFpQixDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN4RSxNQUFNLElBQUksS0FBSyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7U0FDMUQ7UUFDRCxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUN2QixpQkFBTyxFQUNQLE9BQU8sT0FBTyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUNuRCxDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUE7QUFwRlksaUJBQWlCO0lBRDdCLDBCQUFnQixDQUFDLGlCQUFPLENBQUM7R0FDYixpQkFBaUIsQ0FvRjdCO0FBcEZZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVudGl0eVJlcG9zaXRvcnksIFJlcG9zaXRvcnksIGdldFJlcG9zaXRvcnkgfSBmcm9tIFwidHlwZW9ybVwiO1xuaW1wb3J0IHsgU3R1ZGVudCB9IGZyb20gXCIuL2VudGl0aWVzL1N0dWRlbnRcIjtcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSBcInV0aWxcIjtcbmV4cG9ydCB0eXBlIEdlbmRlclR5cGUgPSBcIm1hbGVcIiB8IFwiZmVtYWxlXCI7XG5leHBvcnQgZW51bSBHZW5kZXIge1xuICBtYWxlID0gXCJtYWxlXCIsXG4gIGZlbWFsZSA9IFwiZmVtYWxlXCJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZU51bWJlcihcbiAgbnVtOiBudW1iZXIgfCBzdHJpbmcsXG4gIGVycm9ySWZOb3ROdW1iZXI6IHN0cmluZ1xuKTogbnVtYmVyIHtcbiAgaWYgKHR5cGVvZiBudW0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7ZXJyb3JJZk5vdE51bWJlcn0gLS0gJHtudW19YCk7XG4gIH1cbiAgaWYgKHR5cGVvZiBudW0gPT09IFwibnVtYmVyXCIpIHJldHVybiBudW07XG4gIGxldCByZXQgPSBwYXJzZUludChudW0pO1xuICBpZiAoaXNOYU4ocmV0KSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgJHtlcnJvcklmTm90TnVtYmVyfSAke3JldH0gLS0gJHtudW19YCk7XG4gIH1cbiAgcmV0dXJuIHJldCE7XG59XG5cbkBFbnRpdHlSZXBvc2l0b3J5KFN0dWRlbnQpXG5leHBvcnQgY2xhc3MgU3R1ZGVudFJlcG9zaXRvcnkgZXh0ZW5kcyBSZXBvc2l0b3J5PFN0dWRlbnQ+IHtcbiAgc3RhdGljIGlzU3R1ZGVudChzdHVkZW50OiBhbnkpOiBzdHVkZW50IGlzIFN0dWRlbnQge1xuICAgIHJldHVybiAoXG4gICAgICB0eXBlb2Ygc3R1ZGVudCA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgdHlwZW9mIHN0dWRlbnQubmFtZSA9PT0gXCJzdHJpbmdcIiAmJlxuICAgICAgdHlwZW9mIHN0dWRlbnQuZW50ZXJlZCA9PT0gXCJudW1iZXJcIiAmJlxuICAgICAgdHlwZW9mIHN0dWRlbnQuZ3JhZGUgPT09IFwibnVtYmVyXCIgJiZcbiAgICAgIFN0dWRlbnRSZXBvc2l0b3J5LmlzR2VuZGVyKHN0dWRlbnQuZ2VuZGVyKVxuICAgICk7XG4gIH1cbiAgc3RhdGljIGlzU3R1ZGVudFVwZGF0ZXIodXBkYXRlcjogYW55KTogYm9vbGVhbiB7XG4gICAgbGV0IHJldCA9IHRydWU7XG4gICAgaWYgKHR5cGVvZiB1cGRhdGVyICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpc1N0dWRlbnRVcGRhdGVyIG11c3QgZ2V0IG9iamVjdFwiKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB1cGRhdGVyLm5hbWUgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIGlmICh0eXBlb2YgdXBkYXRlci5uYW1lICE9PSBcInN0cmluZ1wiKSByZXQgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB1cGRhdGVyLmVudGVyZWQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIGlmICh0eXBlb2YgdXBkYXRlci5lbnRlcmVkICE9PSBcIm51bWJlclwiKSByZXQgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB1cGRhdGVyLmdyYWRlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBpZiAodHlwZW9mIHVwZGF0ZXIuZ3JhZGUgIT09IFwibnVtYmVyXCIpIHJldCA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHVwZGF0ZXIuZ2VuZGVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBpZiAoIVN0dWRlbnRSZXBvc2l0b3J5LmlzR2VuZGVyKHVwZGF0ZXIuZ2VuZGVyKSkgcmV0ID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH1cbiAgc3RhdGljIGlzR2VuZGVyKGdlbmRlcjogYW55KTogZ2VuZGVyIGlzIEdlbmRlciB7XG4gICAgcmV0dXJuIChcbiAgICAgIHR5cGVvZiBnZW5kZXIgPT09IFwic3RyaW5nXCIgJiYgKGdlbmRlciA9PT0gXCJtYWxlXCIgfHwgZ2VuZGVyID09PSBcImZlbWFsZVwiKVxuICAgICk7XG4gIH1cbiAgYXN5bmMgY3JlYXRlQW5kU2F2ZShzdHVkZW50OiBTdHVkZW50KTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICBsZXQgc3R1ZCA9IG5ldyBTdHVkZW50KCk7XG4gICAgc3R1ZC5uYW1lID0gc3R1ZGVudC5uYW1lO1xuICAgIHN0dWQuZW50ZXJlZCA9IG5vcm1hbGl6ZU51bWJlcihzdHVkZW50LmVudGVyZWQsIFwiQmFkIHllYXIgZW50ZXJlZFwiKTtcbiAgICBzdHVkLmdyYWRlID0gbm9ybWFsaXplTnVtYmVyKHN0dWRlbnQuZ3JhZGUsIFwiQmFkIGdyYWRlXCIpO1xuICAgIHN0dWQuZ2VuZGVyID0gc3R1ZGVudC5nZW5kZXI7XG4gICAgYXdhaXQgdGhpcy5zYXZlKHN0dWQpO1xuICAgIHJldHVybiBzdHVkLmlkO1xuICB9XG4gIGFzeW5jIGFsbFN0dWRlbnRzKCk6IFByb21pc2U8U3R1ZGVudFtdPiB7XG4gICAgbGV0IHN0dWRlbnRzID0gYXdhaXQgdGhpcy5maW5kKCk7XG4gICAgcmV0dXJuIHN0dWRlbnRzO1xuICB9XG4gIGFzeW5jIGZpbmRPbmVTdHVkZW50KGlkOiBudW1iZXIpOiBQcm9taXNlPFN0dWRlbnQ+IHtcbiAgICBsZXQgc3R1ZGVudCA9IGF3YWl0IHRoaXMuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyBpZDogaWQgfVxuICAgIH0pO1xuICAgIGlmICghU3R1ZGVudFJlcG9zaXRvcnkuaXNTdHVkZW50KHN0dWRlbnQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBTdHVkZW50IGlkICR7dXRpbC5pbnNwZWN0KGlkKX0gZGlkIG5vdCByZXRyaWV2ZSBhIFN0dWRlbnRgXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gc3R1ZGVudDtcbiAgfVxuICBhc3luYyB1cGRhdGVTdHVkZW50KGlkOiBudW1iZXIsIHN0dWRlbnQ6IFN0dWRlbnQpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgIGlmICh0eXBlb2Ygc3R1ZGVudC5lbnRlcmVkICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBzdHVkZW50LmVudGVyZWQgPSBub3JtYWxpemVOdW1iZXIoc3R1ZGVudC5lbnRlcmVkLCBcIkJhZCB5ZWFyIGVudGVyZWRcIik7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygc3R1ZGVudC5ncmFkZSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgc3R1ZGVudC5ncmFkZSA9IG5vcm1hbGl6ZU51bWJlcihzdHVkZW50LmdyYWRlLCBcIkJhZCBncmFkZVwiKTtcbiAgICB9XG4gICAgaWYgKCFTdHVkZW50UmVwb3NpdG9yeS5pc1N0dWRlbnRVcGRhdGVyKHN0dWRlbnQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBTdHVkZW50IHVwZGF0ZSBpZCAke3V0aWwuaW5zcGVjdChcbiAgICAgICAgICBpZFxuICAgICAgICApfSBkaWQgbm90IHJlY2VpdmUgYSBTdHVkZW50IHVwZGF0ZXIgJHt1dGlsLmluc3BlY3Qoc3R1ZGVudCl9YFxuICAgICAgKTtcbiAgICB9XG4gICAgYXdhaXQgdGhpcy5tYW5hZ2VyLnVwZGF0ZShTdHVkZW50LCBpZCwgc3R1ZGVudCk7XG4gICAgcmV0dXJuIGlkO1xuICB9XG4gIGFzeW5jIGRlbGV0ZVN0dWRlbnQoc3R1ZGVudDogbnVtYmVyIHwgU3R1ZGVudCkge1xuICAgIGlmICh0eXBlb2Ygc3R1ZGVudCAhPT0gXCJudW1iZXJcIiAmJiAhU3R1ZGVudFJlcG9zaXRvcnkuaXNTdHVkZW50KHN0dWRlbnQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTdXBwbGllZCBzdHVkZW50IG9iamVjdCBub3QgYSBTdHVkZW50XCIpO1xuICAgIH1cbiAgICBhd2FpdCB0aGlzLm1hbmFnZXIuZGVsZXRlKFxuICAgICAgU3R1ZGVudCxcbiAgICAgIHR5cGVvZiBzdHVkZW50ID09PSBcIm51bWJlclwiID8gc3R1ZGVudCA6IHN0dWRlbnQuaWRcbiAgICApO1xuICB9XG59XG4iXX0=