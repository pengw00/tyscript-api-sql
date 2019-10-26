"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const OfferedClass_1 = require("./OfferedClass");
let Student = class Student {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Student.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        length: 100
    }),
    __metadata("design:type", String)
], Student.prototype, "name", void 0);
__decorate([
    typeorm_1.Column("int"),
    __metadata("design:type", Number)
], Student.prototype, "entered", void 0);
__decorate([
    typeorm_1.Column("int"),
    __metadata("design:type", Number)
], Student.prototype, "grade", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Student.prototype, "gender", void 0);
__decorate([
    typeorm_1.ManyToMany(() => OfferedClass_1.OfferedClass, oclass => oclass.students),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Student.prototype, "classes", void 0);
Student = __decorate([
    typeorm_1.Entity()
], Student);
exports.Student = Student;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3R1ZGVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9lbnRpdGllcy9TdHVkZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEscUNBTWlCO0FBRWpCLGlEQUE4QztBQUc5QyxJQUFhLE9BQU8sR0FBcEIsTUFBYSxPQUFPO0NBYW5CLENBQUE7QUFaMkI7SUFBekIsZ0NBQXNCLEVBQUU7O21DQUFZO0FBSXJDO0lBSEMsZ0JBQU0sQ0FBQztRQUNOLE1BQU0sRUFBRSxHQUFHO0tBQ1osQ0FBQzs7cUNBQ1c7QUFDRTtJQUFkLGdCQUFNLENBQUMsS0FBSyxDQUFDOzt3Q0FBaUI7QUFDaEI7SUFBZCxnQkFBTSxDQUFDLEtBQUssQ0FBQzs7c0NBQWU7QUFDbkI7SUFBVCxnQkFBTSxFQUFFOzt1Q0FBZ0I7QUFJekI7SUFGQyxvQkFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLDJCQUFZLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ3pELG1CQUFTLEVBQUU7O3dDQUNZO0FBWmIsT0FBTztJQURuQixnQkFBTSxFQUFFO0dBQ0ksT0FBTyxDQWFuQjtBQWJZLDBCQUFPO0FBZXBCLFNBQWdCLGVBQWUsQ0FDN0IsR0FBb0IsRUFDcEIsZ0JBQXdCO0lBRXhCLElBQUksT0FBTyxHQUFHLEtBQUssV0FBVyxFQUFFO1FBQzlCLE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxnQkFBZ0IsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0tBQ2xEO0lBQ0QsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRO1FBQUUsT0FBTyxHQUFHLENBQUM7SUFDeEMsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLGdCQUFnQixJQUFJLEdBQUcsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0tBQ3pEO0lBQ0QsT0FBTyxHQUFJLENBQUM7QUFDZCxDQUFDO0FBYkQsMENBYUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBFbnRpdHksXG4gIENvbHVtbixcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcbiAgTWFueVRvTWFueSxcbiAgSm9pblRhYmxlXG59IGZyb20gXCJ0eXBlb3JtXCI7XG5cbmltcG9ydCB7IE9mZmVyZWRDbGFzcyB9IGZyb20gXCIuL09mZmVyZWRDbGFzc1wiO1xuXG5ARW50aXR5KClcbmV4cG9ydCBjbGFzcyBTdHVkZW50IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKSBpZDogbnVtYmVyO1xuICBAQ29sdW1uKHtcbiAgICBsZW5ndGg6IDEwMFxuICB9KVxuICBuYW1lOiBzdHJpbmc7XG4gIEBDb2x1bW4oXCJpbnRcIikgZW50ZXJlZDogbnVtYmVyO1xuICBAQ29sdW1uKFwiaW50XCIpIGdyYWRlOiBudW1iZXI7XG4gIEBDb2x1bW4oKSBnZW5kZXI6IHN0cmluZztcblxuICBATWFueVRvTWFueSgoKSA9PiBPZmZlcmVkQ2xhc3MsIG9jbGFzcyA9PiBvY2xhc3Muc3R1ZGVudHMpXG4gIEBKb2luVGFibGUoKVxuICBjbGFzc2VzOiBPZmZlcmVkQ2xhc3NbXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZU51bWJlcihcbiAgbnVtOiBudW1iZXIgfCBzdHJpbmcsXG4gIGVycm9ySWZOb3ROdW1iZXI6IHN0cmluZ1xuKTogbnVtYmVyIHtcbiAgaWYgKHR5cGVvZiBudW0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7ZXJyb3JJZk5vdE51bWJlcn0gLS0gJHtudW19YCk7XG4gIH1cbiAgaWYgKHR5cGVvZiBudW0gPT09IFwibnVtYmVyXCIpIHJldHVybiBudW07XG4gIGxldCByZXQgPSBwYXJzZUludChudW0pO1xuICBpZiAoaXNOYU4ocmV0KSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgJHtlcnJvcklmTm90TnVtYmVyfSAke3JldH0gLS0gJHtudW19YCk7XG4gIH1cbiAgcmV0dXJuIHJldCE7XG59XG4iXX0=