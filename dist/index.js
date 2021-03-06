"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Student_1 = require("./entities/Student");
var Student_2 = require("./entities/Student");
exports.Student = Student_2.Student;
const StudentRepository_1 = require("./StudentRepository");
var StudentRepository_2 = require("./StudentRepository");
exports.StudentRepository = StudentRepository_2.StudentRepository;
const OfferedClassRepository_1 = require("./OfferedClassRepository");
var OfferedClassRepository_2 = require("./OfferedClassRepository");
exports.OfferedClassRepository = OfferedClassRepository_2.OfferedClassRepository;
const OfferedClass_1 = require("./entities/OfferedClass");
var OfferedClass_2 = require("./entities/OfferedClass");
exports.OfferedClass = OfferedClass_2.OfferedClass;
var _connection;
async function connect() {
    _connection = await typeorm_1.createConnection({
        type: "mssql",
        host: "localhost",
        port: 1433,
        username: "SA",
        password: "<YourStrong@Passw0rd>",
        database: "tsDB",
        entities: [Student_1.Student, OfferedClass_1.OfferedClass]
    });
}
exports.connect = connect;
function connected() {
    console.log(_connection);
    return typeof _connection !== "undefined";
}
exports.connected = connected;
function getStudentRepository() {
    return _connection.getCustomRepository(StudentRepository_1.StudentRepository);
}
exports.getStudentRepository = getStudentRepository;
function getOfferedClassRepository() {
    return _connection.getCustomRepository(OfferedClassRepository_1.OfferedClassRepository);
}
exports.getOfferedClassRepository = getOfferedClassRepository;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0QkFBMEI7QUFDMUIscUNBQXVEO0FBQ3ZELGdEQUE2QztBQUM3Qyw4Q0FBNkM7QUFBcEMsNEJBQUEsT0FBTyxDQUFBO0FBQ2hCLDJEQUF3RDtBQUN4RCx5REFBd0Q7QUFBL0MsZ0RBQUEsaUJBQWlCLENBQUE7QUFDMUIscUVBQWtFO0FBQ2xFLG1FQUFrRTtBQUF6RCwwREFBQSxzQkFBc0IsQ0FBQTtBQUMvQiwwREFBdUQ7QUFDdkQsd0RBQXVEO0FBQTlDLHNDQUFBLFlBQVksQ0FBQTtBQUVyQixJQUFJLFdBQXVCLENBQUM7QUFFckIsS0FBSyxVQUFVLE9BQU87SUFDM0IsV0FBVyxHQUFHLE1BQU0sMEJBQWdCLENBQUM7UUFDbkMsSUFBSSxFQUFFLE9BQU87UUFDYixJQUFJLEVBQUUsV0FBVztRQUNqQixJQUFJLEVBQUUsSUFBSTtRQUNWLFFBQVEsRUFBRSxJQUFJO1FBQ2QsUUFBUSxFQUFFLHVCQUF1QjtRQUNqQyxRQUFRLEVBQUUsTUFBTTtRQUNoQixRQUFRLEVBQUUsQ0FBQyxpQkFBTyxFQUFFLDJCQUFZLENBQUM7S0FDbEMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQVZELDBCQVVDO0FBRUQsU0FBZ0IsU0FBUztJQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3pCLE9BQU8sT0FBTyxXQUFXLEtBQUssV0FBVyxDQUFDO0FBQzVDLENBQUM7QUFIRCw4QkFHQztBQUVELFNBQWdCLG9CQUFvQjtJQUNsQyxPQUFPLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxxQ0FBaUIsQ0FBQyxDQUFDO0FBQzVELENBQUM7QUFGRCxvREFFQztBQUVELFNBQWdCLHlCQUF5QjtJQUN2QyxPQUFPLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQywrQ0FBc0IsQ0FBQyxDQUFDO0FBQ2pFLENBQUM7QUFGRCw4REFFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcInJlZmxlY3QtbWV0YWRhdGFcIjtcbmltcG9ydCB7IGNyZWF0ZUNvbm5lY3Rpb24sIENvbm5lY3Rpb24gfSBmcm9tIFwidHlwZW9ybVwiO1xuaW1wb3J0IHsgU3R1ZGVudCB9IGZyb20gXCIuL2VudGl0aWVzL1N0dWRlbnRcIjtcbmV4cG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiLi9lbnRpdGllcy9TdHVkZW50XCI7XG5pbXBvcnQgeyBTdHVkZW50UmVwb3NpdG9yeSB9IGZyb20gXCIuL1N0dWRlbnRSZXBvc2l0b3J5XCI7XG5leHBvcnQgeyBTdHVkZW50UmVwb3NpdG9yeSB9IGZyb20gXCIuL1N0dWRlbnRSZXBvc2l0b3J5XCI7XG5pbXBvcnQgeyBPZmZlcmVkQ2xhc3NSZXBvc2l0b3J5IH0gZnJvbSBcIi4vT2ZmZXJlZENsYXNzUmVwb3NpdG9yeVwiO1xuZXhwb3J0IHsgT2ZmZXJlZENsYXNzUmVwb3NpdG9yeSB9IGZyb20gXCIuL09mZmVyZWRDbGFzc1JlcG9zaXRvcnlcIjtcbmltcG9ydCB7IE9mZmVyZWRDbGFzcyB9IGZyb20gXCIuL2VudGl0aWVzL09mZmVyZWRDbGFzc1wiO1xuZXhwb3J0IHsgT2ZmZXJlZENsYXNzIH0gZnJvbSBcIi4vZW50aXRpZXMvT2ZmZXJlZENsYXNzXCI7XG5cbnZhciBfY29ubmVjdGlvbjogQ29ubmVjdGlvbjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNvbm5lY3QoKSB7XG4gIF9jb25uZWN0aW9uID0gYXdhaXQgY3JlYXRlQ29ubmVjdGlvbih7XG4gICAgdHlwZTogXCJtc3NxbFwiLFxuICAgIGhvc3Q6IFwibG9jYWxob3N0XCIsXG4gICAgcG9ydDogMTQzMyxcbiAgICB1c2VybmFtZTogXCJTQVwiLFxuICAgIHBhc3N3b3JkOiBcIjxZb3VyU3Ryb25nQFBhc3N3MHJkPlwiLFxuICAgIGRhdGFiYXNlOiBcInRzREJcIixcbiAgICBlbnRpdGllczogW1N0dWRlbnQsIE9mZmVyZWRDbGFzc11cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25uZWN0ZWQoKSB7XG4gIGNvbnNvbGUubG9nKF9jb25uZWN0aW9uKTtcbiAgcmV0dXJuIHR5cGVvZiBfY29ubmVjdGlvbiAhPT0gXCJ1bmRlZmluZWRcIjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0dWRlbnRSZXBvc2l0b3J5KCk6IFN0dWRlbnRSZXBvc2l0b3J5IHtcbiAgcmV0dXJuIF9jb25uZWN0aW9uLmdldEN1c3RvbVJlcG9zaXRvcnkoU3R1ZGVudFJlcG9zaXRvcnkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0T2ZmZXJlZENsYXNzUmVwb3NpdG9yeSgpOiBPZmZlcmVkQ2xhc3NSZXBvc2l0b3J5IHtcbiAgcmV0dXJuIF9jb25uZWN0aW9uLmdldEN1c3RvbVJlcG9zaXRvcnkoT2ZmZXJlZENsYXNzUmVwb3NpdG9yeSk7XG59XG4iXX0=