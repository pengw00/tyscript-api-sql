"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var OfferedClassRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const OfferedClass_1 = require("./entities/OfferedClass");
const StudentRepository_1 = require("./StudentRepository");
const index_1 = require("./index");
const util = require("util");
const yaml = require("js-yaml");
const fs = require("fs-extra");
let OfferedClassRepository = OfferedClassRepository_1 = class OfferedClassRepository extends typeorm_1.Repository {
    async updateClasses(classFN) {
        const yamlText = await fs.readFile(classFN, "utf8");
        const offered = yaml.safeLoad(yamlText);
        if (typeof offered !== "object" || !Array.isArray(offered.classes)) {
            throw new Error(`updateClasses read incorrect data file from ${classFN}`);
        }
        let all = await this.allClasses();
        for (let cls of all) {
            let stillOffered = false;
            for (let ofrd of offered.classes) {
                if (ofrd.code === cls.code) {
                    stillOffered = true;
                    break;
                }
            }
            if (!stillOffered) {
                this.deleteOfferedClass(cls.code);
            }
        }
        for (let updater of offered.classes) {
            if (!OfferedClassRepository_1.isOfferedClassUpdater(updater)) {
                throw new Error(`updateClasses found classes entry that is not an OfferedClassUpdater ${util.inspect(updater)}`);
            }
            let cls;
            try {
                cls = await this.findOneClass(updater.code);
            }
            catch (e) {
                cls = undefined;
            }
            if (cls) {
                await this.updateOfferedClass(updater.code, updater);
            }
            else {
                await this.createAndSave(updater);
            }
        }
    }
    static isOfferedClass(offeredClass) {
        return (typeof offeredClass === "object" &&
            typeof offeredClass.code === "string" &&
            typeof offeredClass.name === "string" &&
            typeof offeredClass.hours === "number");
    }
    static isOfferedClassUpdater(updater) {
        let ret = true;
        if (typeof updater !== "object") {
            throw new Error("isOfferedClassUpdater must get object");
        }
        if (typeof updater.code !== "undefined") {
            if (typeof updater.code !== "string")
                ret = false;
        }
        if (typeof updater.name !== "undefined") {
            if (typeof updater.name !== "string")
                ret = false;
        }
        if (typeof updater.hours !== "undefined") {
            if (typeof updater.hours !== "number")
                ret = false;
        }
        return ret;
    }
    async allClasses() {
        let classes = await this.find({
            relations: ["students"]
        });
        return classes;
    }
    async createAndSave(offeredClass) {
        let cls = new OfferedClass_1.OfferedClass();
        cls.code = offeredClass.code;
        cls.name = offeredClass.name;
        cls.hours = StudentRepository_1.normalizeNumber(offeredClass.hours, "Bad number of hours");
        if (!OfferedClassRepository_1.isOfferedClass(cls)) {
            throw new Error(`Not an offered class ${util.inspect(offeredClass)}`);
        }
        await this.save(cls);
        return cls.code;
    }
    async findOneClass(code) {
        let cls = await this.findOne({
            where: { code: code },
            relations: ["students"]
        });
        if (!OfferedClassRepository_1.isOfferedClass(cls)) {
            throw new Error(`OfferedClass id ${util.inspect(code)} did not retrieve a OfferedClass`);
        }
        return cls;
    }
    async updateOfferedClass(code, offeredClass) {
        if (typeof offeredClass.hours !== "undefined") {
            offeredClass.hours = StudentRepository_1.normalizeNumber(offeredClass.hours, "Bad number of hours");
        }
        if (!OfferedClassRepository_1.isOfferedClassUpdater(offeredClass)) {
            throw new Error(`OfferedClass update id ${util.inspect(code)} did not receive a OfferedClass updater ${util.inspect(offeredClass)}`);
        }
        await this.manager.update(OfferedClass_1.OfferedClass, code, offeredClass);
        return code;
    }
    async deleteOfferedClass(offeredClass) {
        if (typeof offeredClass !== "string" &&
            !OfferedClassRepository_1.isOfferedClass(offeredClass)) {
            throw new Error("Supplied offeredClass object not a OfferedClass");
        }
        await this.manager.delete(OfferedClass_1.OfferedClass, typeof offeredClass === "string" ? offeredClass : offeredClass.code);
    }
    async enrollStudentInClass(studentid, code) {
        let offered = await this.findOneClass(code);
        if (!OfferedClassRepository_1.isOfferedClass(offered)) {
            throw new Error(`enrollStudentInClass did not find OfferedClass for ${util.inspect(code)}`);
        }
        let student = await index_1.getStudentRepository().findOneStudent(studentid);
        if (!StudentRepository_1.StudentRepository.isStudent(student)) {
            throw new Error(`enrollStudentInClass did not find Student for ${util.inspect(studentid)}`);
        }
        if (!student.classes)
            student.classes = [];
        student.classes.push(offered);
        await index_1.getStudentRepository().manager.save(student);
    }
    async updateStudentEnrolledClasses(studentid, codes) {
        let student = await index_1.getStudentRepository().findOneStudent(studentid);
        if (!StudentRepository_1.StudentRepository.isStudent(student)) {
            throw new Error(`enrollStudentInClass did not find Student for ${util.inspect(studentid)}`);
        }
        let newclasses = [];
        for (let sclazz of student.classes) {
            for (let code of codes) {
                if (sclazz.code === code) {
                    newclasses.push(sclazz);
                }
            }
        }
        for (let code of codes) {
            let found = false;
            for (let nclazz of newclasses) {
                if (nclazz.code === code) {
                    found = true;
                }
            }
            if (!found) {
                newclasses.push(await this.findOneClass(code));
            }
        }
        student.classes = newclasses;
        await index_1.getStudentRepository().save(student);
    }
};
OfferedClassRepository = OfferedClassRepository_1 = __decorate([
    typeorm_1.EntityRepository(OfferedClass_1.OfferedClass)
], OfferedClassRepository);
exports.OfferedClassRepository = OfferedClassRepository;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2ZmZXJlZENsYXNzUmVwb3NpdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9PZmZlcmVkQ2xhc3NSZXBvc2l0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHFDQUFzRTtBQUN0RSwwREFBdUQ7QUFDdkQsMkRBQXlFO0FBQ3pFLG1DQUErQztBQUMvQyw2QkFBNkI7QUFDN0IsZ0NBQWdDO0FBQ2hDLCtCQUErQjtBQUUvQixJQUFhLHNCQUFzQiw4QkFBbkMsTUFBYSxzQkFBdUIsU0FBUSxvQkFBd0I7SUFDbEUsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFlO1FBQ2pDLE1BQU0sUUFBUSxHQUFHLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDcEQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4QyxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ2xFLE1BQU0sSUFBSSxLQUFLLENBQUMsK0NBQStDLE9BQU8sRUFBRSxDQUFDLENBQUM7U0FDM0U7UUFDRCxJQUFJLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQyxLQUFLLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRTtZQUNuQixJQUFJLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDekIsS0FBSyxJQUFJLElBQUksSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO2dCQUNoQyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLElBQUksRUFBRTtvQkFDMUIsWUFBWSxHQUFHLElBQUksQ0FBQztvQkFDcEIsTUFBTTtpQkFDUDthQUNGO1lBQ0QsSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDakIsSUFBSSxDQUFDLGtCQUFrQixD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QUFDO0dBQ2xCLHNCQUFzQixDQW1MbEM7QUFuTFksd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5UmVwb3NpdG9yeSwgUmVwb3NpdG9yeSwgZ2V0UmVwb3NpdG9yeSB9IGZyb20gXCJ0eXBlb3JtXCI7XG5pbXBvcnQgeyBPZmZlcmVkQ2xhc3MgfSBmcm9tIFwiLi9lbnRpdGllcy9PZmZlcmVkQ2xhc3NcIjtcbmltcG9ydCB7IG5vcm1hbGl6ZU51bWJlciwgU3R1ZGVudFJlcG9zaXRvcnkgfSBmcm9tIFwiLi9TdHVkZW50UmVwb3NpdG9yeVwiO1xuaW1wb3J0IHsgZ2V0U3R1ZGVudFJlcG9zaXRvcnkgfSBmcm9tIFwiLi9pbmRleFwiO1xuaW1wb3J0ICogYXMgdXRpbCBmcm9tIFwidXRpbFwiO1xuaW1wb3J0ICogYXMgeWFtbCBmcm9tIFwianMteWFtbFwiO1xuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzLWV4dHJhXCI7XG5ARW50aXR5UmVwb3NpdG9yeShPZmZlcmVkQ2xhc3MpXG5leHBvcnQgY2xhc3MgT2ZmZXJlZENsYXNzUmVwb3NpdG9yeSBleHRlbmRzIFJlcG9zaXRvcnk8T2ZmZXJlZENsYXNzPiB7XG4gIGFzeW5jIHVwZGF0ZUNsYXNzZXMoY2xhc3NGTjogc3RyaW5nKSB7XG4gICAgY29uc3QgeWFtbFRleHQgPSBhd2FpdCBmcy5yZWFkRmlsZShjbGFzc0ZOLCBcInV0ZjhcIik7XG4gICAgY29uc3Qgb2ZmZXJlZCA9IHlhbWwuc2FmZUxvYWQoeWFtbFRleHQpO1xuICAgIGlmICh0eXBlb2Ygb2ZmZXJlZCAhPT0gXCJvYmplY3RcIiB8fCAhQXJyYXkuaXNBcnJheShvZmZlcmVkLmNsYXNzZXMpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVwZGF0ZUNsYXNzZXMgcmVhZCBpbmNvcnJlY3QgZGF0YSBmaWxlIGZyb20gJHtjbGFzc0ZOfWApO1xuICAgIH1cbiAgICBsZXQgYWxsID0gYXdhaXQgdGhpcy5hbGxDbGFzc2VzKCk7XG4gICAgZm9yIChsZXQgY2xzIG9mIGFsbCkge1xuICAgICAgbGV0IHN0aWxsT2ZmZXJlZCA9IGZhbHNlO1xuICAgICAgZm9yIChsZXQgb2ZyZCBvZiBvZmZlcmVkLmNsYXNzZXMpIHtcbiAgICAgICAgaWYgKG9mcmQuY29kZSA9PT0gY2xzLmNvZGUpIHtcbiAgICAgICAgICBzdGlsbE9mZmVyZWQgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIXN0aWxsT2ZmZXJlZCkge1xuICAgICAgICB0aGlzLmRlbGV0ZU9mZmVyZWRDbGFzcyhjbHMuY29kZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAobGV0IHVwZGF0ZXIgb2Ygb2ZmZXJlZC5jbGFzc2VzKSB7XG4gICAgICBpZiAoIU9mZmVyZWRDbGFzc1JlcG9zaXRvcnkuaXNPZmZlcmVkQ2xhc3NVcGRhdGVyKHVwZGF0ZXIpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgdXBkYXRlQ2xhc3NlcyBmb3VuZCBjbGFzc2VzIGVudHJ5IHRoYXQgaXMgbm90IGFuIE9mZmVyZWRDbGFzc1VwZGF0ZXIgJHt1dGlsLmluc3BlY3QoXG4gICAgICAgICAgICB1cGRhdGVyXG4gICAgICAgICAgKX1gXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBsZXQgY2xzO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY2xzID0gYXdhaXQgdGhpcy5maW5kT25lQ2xhc3ModXBkYXRlci5jb2RlKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2xzID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgaWYgKGNscykge1xuICAgICAgICBhd2FpdCB0aGlzLnVwZGF0ZU9mZmVyZWRDbGFzcyh1cGRhdGVyLmNvZGUsIHVwZGF0ZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGVBbmRTYXZlKHVwZGF0ZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBzdGF0aWMgaXNPZmZlcmVkQ2xhc3Mob2ZmZXJlZENsYXNzOiBhbnkpOiBvZmZlcmVkQ2xhc3MgaXMgT2ZmZXJlZENsYXNzIHtcbiAgICByZXR1cm4gKFxuICAgICAgdHlwZW9mIG9mZmVyZWRDbGFzcyA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgdHlwZW9mIG9mZmVyZWRDbGFzcy5jb2RlID09PSBcInN0cmluZ1wiICYmXG4gICAgICB0eXBlb2Ygb2ZmZXJlZENsYXNzLm5hbWUgPT09IFwic3RyaW5nXCIgJiZcbiAgICAgIHR5cGVvZiBvZmZlcmVkQ2xhc3MuaG91cnMgPT09IFwibnVtYmVyXCJcbiAgICApO1xuICB9XG4gIHN0YXRpYyBpc09mZmVyZWRDbGFzc1VwZGF0ZXIodXBkYXRlcjogYW55KTogYm9vbGVhbiB7XG4gICAgbGV0IHJldCA9IHRydWU7XG4gICAgaWYgKHR5cGVvZiB1cGRhdGVyICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpc09mZmVyZWRDbGFzc1VwZGF0ZXIgbXVzdCBnZXQgb2JqZWN0XCIpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHVwZGF0ZXIuY29kZSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgaWYgKHR5cGVvZiB1cGRhdGVyLmNvZGUgIT09IFwic3RyaW5nXCIpIHJldCA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHVwZGF0ZXIubmFtZSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgaWYgKHR5cGVvZiB1cGRhdGVyLm5hbWUgIT09IFwic3RyaW5nXCIpIHJldCA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHVwZGF0ZXIuaG91cnMgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIGlmICh0eXBlb2YgdXBkYXRlci5ob3VycyAhPT0gXCJudW1iZXJcIikgcmV0ID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH1cbiAgYXN5bmMgYWxsQ2xhc3NlcygpOiBQcm9taXNlPE9mZmVyZWRDbGFzc1tdPiB7XG4gICAgbGV0IGNsYXNzZXMgPSBhd2FpdCB0aGlzLmZpbmQoe1xuICAgICAgcmVsYXRpb25zOiBbXCJzdHVkZW50c1wiXVxuICAgIH0pO1xuICAgIHJldHVybiBjbGFzc2VzO1xuICB9XG4gIGFzeW5jIGNyZWF0ZUFuZFNhdmUob2ZmZXJlZENsYXNzOiBPZmZlcmVkQ2xhc3MpOiBQcm9taXNlPGFueT4ge1xuICAgIGxldCBjbHMgPSBuZXcgT2ZmZXJlZENsYXNzKCk7XG4gICAgY2xzLmNvZGUgPSBvZmZlcmVkQ2xhc3MuY29kZTtcbiAgICBjbHMubmFtZSA9IG9mZmVyZWRDbGFzcy5uYW1lO1xuICAgIGNscy5ob3VycyA9IG5vcm1hbGl6ZU51bWJlcihvZmZlcmVkQ2xhc3MuaG91cnMsIFwiQmFkIG51bWJlciBvZiBob3Vyc1wiKTtcbiAgICBpZiAoIU9mZmVyZWRDbGFzc1JlcG9zaXRvcnkuaXNPZmZlcmVkQ2xhc3MoY2xzKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3QgYW4gb2ZmZXJlZCBjbGFzcyAke3V0aWwuaW5zcGVjdChvZmZlcmVkQ2xhc3MpfWApO1xuICAgIH1cbiAgICBhd2FpdCB0aGlzLnNhdmUoY2xzKTtcbiAgICByZXR1cm4gY2xzLmNvZGU7XG4gIH1cbiAgYXN5bmMgZmluZE9uZUNsYXNzKGNvZGU6IHN0cmluZyk6IFByb21pc2U8T2ZmZXJlZENsYXNzPiB7XG4gICAgbGV0IGNscyA9IGF3YWl0IHRoaXMuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyBjb2RlOiBjb2RlIH0sXG4gICAgICByZWxhdGlvbnM6IFtcInN0dWRlbnRzXCJdXG4gICAgfSk7XG4gICAgaWYgKCFPZmZlcmVkQ2xhc3NSZXBvc2l0b3J5LmlzT2ZmZXJlZENsYXNzKGNscykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYE9mZmVyZWRDbGFzcyBpZCAke3V0aWwuaW5zcGVjdChjb2RlKX0gZGlkIG5vdCByZXRyaWV2ZSBhIE9mZmVyZWRDbGFzc2BcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBjbHM7XG4gIH1cbiAgYXN5bmMgdXBkYXRlT2ZmZXJlZENsYXNzKFxuICAgIGNvZGU6IHN0cmluZyxcbiAgICBvZmZlcmVkQ2xhc3M6IE9mZmVyZWRDbGFzc1xuICApOiBQcm9taXNlPGFueT4ge1xuICAgIGlmICh0eXBlb2Ygb2ZmZXJlZENsYXNzLmhvdXJzICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBvZmZlcmVkQ2xhc3MuaG91cnMgPSBub3JtYWxpemVOdW1iZXIoXG4gICAgICAgIG9mZmVyZWRDbGFzcy5ob3VycyxcbiAgICAgICAgXCJCYWQgbnVtYmVyIG9mIGhvdXJzXCJcbiAgICAgICk7XG4gICAgfVxuICAgIGlmICghT2ZmZXJlZENsYXNzUmVwb3NpdG9yeS5pc09mZmVyZWRDbGFzc1VwZGF0ZXIob2ZmZXJlZENsYXNzKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgT2ZmZXJlZENsYXNzIHVwZGF0ZSBpZCAke3V0aWwuaW5zcGVjdChcbiAgICAgICAgICBjb2RlXG4gICAgICAgICl9IGRpZCBub3QgcmVjZWl2ZSBhIE9mZmVyZWRDbGFzcyB1cGRhdGVyICR7dXRpbC5pbnNwZWN0KG9mZmVyZWRDbGFzcyl9YFxuICAgICAgKTtcbiAgICB9XG4gICAgYXdhaXQgdGhpcy5tYW5hZ2VyLnVwZGF0ZShPZmZlcmVkQ2xhc3MsIGNvZGUsIG9mZmVyZWRDbGFzcyk7XG4gICAgcmV0dXJuIGNvZGU7XG4gIH1cbiAgYXN5bmMgZGVsZXRlT2ZmZXJlZENsYXNzKG9mZmVyZWRDbGFzczogc3RyaW5nIHwgT2ZmZXJlZENsYXNzKSB7XG4gICAgaWYgKFxuICAgICAgdHlwZW9mIG9mZmVyZWRDbGFzcyAhPT0gXCJzdHJpbmdcIiAmJlxuICAgICAgIU9mZmVyZWRDbGFzc1JlcG9zaXRvcnkuaXNPZmZlcmVkQ2xhc3Mob2ZmZXJlZENsYXNzKVxuICAgICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU3VwcGxpZWQgb2ZmZXJlZENsYXNzIG9iamVjdCBub3QgYSBPZmZlcmVkQ2xhc3NcIik7XG4gICAgfVxuICAgIGF3YWl0IHRoaXMubWFuYWdlci5kZWxldGUoXG4gICAgICBPZmZlcmVkQ2xhc3MsXG4gICAgICB0eXBlb2Ygb2ZmZXJlZENsYXNzID09PSBcInN0cmluZ1wiID8gb2ZmZXJlZENsYXNzIDogb2ZmZXJlZENsYXNzLmNvZGVcbiAgICApO1xuICB9XG4gIGFzeW5jIGVucm9sbFN0dWRlbnRJbkNsYXNzKHN0dWRlbnRpZDogYW55LCBjb2RlOiBzdHJpbmcpIHtcbiAgICBsZXQgb2ZmZXJlZCA9IGF3YWl0IHRoaXMuZmluZE9uZUNsYXNzKGNvZGUpO1xuICAgIGlmICghT2ZmZXJlZENsYXNzUmVwb3NpdG9yeS5pc09mZmVyZWRDbGFzcyhvZmZlcmVkKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgZW5yb2xsU3R1ZGVudEluQ2xhc3MgZGlkIG5vdCBmaW5kIE9mZmVyZWRDbGFzcyBmb3IgJHt1dGlsLmluc3BlY3QoXG4gICAgICAgICAgY29kZVxuICAgICAgICApfWBcbiAgICAgICk7XG4gICAgfVxuICAgIGxldCBzdHVkZW50ID0gYXdhaXQgZ2V0U3R1ZGVudFJlcG9zaXRvcnkoKS5maW5kT25lU3R1ZGVudChzdHVkZW50aWQpO1xuICAgIGlmICghU3R1ZGVudFJlcG9zaXRvcnkuaXNTdHVkZW50KHN0dWRlbnQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBlbnJvbGxTdHVkZW50SW5DbGFzcyBkaWQgbm90IGZpbmQgU3R1ZGVudCBmb3IgJHt1dGlsLmluc3BlY3QoXG4gICAgICAgICAgc3R1ZGVudGlkXG4gICAgICAgICl9YFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoIXN0dWRlbnQuY2xhc3Nlcykgc3R1ZGVudC5jbGFzc2VzID0gW107XG4gICAgc3R1ZGVudC5jbGFzc2VzLnB1c2gob2ZmZXJlZCk7XG4gICAgYXdhaXQgZ2V0U3R1ZGVudFJlcG9zaXRvcnkoKS5tYW5hZ2VyLnNhdmUoc3R1ZGVudCk7XG4gIH1cbiAgYXN5bmMgdXBkYXRlU3R1ZGVudEVucm9sbGVkQ2xhc3NlcyhzdHVkZW50aWQ6IGFueSwgY29kZXM6IHN0cmluZ1tdKSB7XG4gICAgbGV0IHN0dWRlbnQgPSBhd2FpdCBnZXRTdHVkZW50UmVwb3NpdG9yeSgpLmZpbmRPbmVTdHVkZW50KHN0dWRlbnRpZCk7XG4gICAgaWYgKCFTdHVkZW50UmVwb3NpdG9yeS5pc1N0dWRlbnQoc3R1ZGVudCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYGVucm9sbFN0dWRlbnRJbkNsYXNzIGRpZCBub3QgZmluZCBTdHVkZW50IGZvciAke3V0aWwuaW5zcGVjdChcbiAgICAgICAgICBzdHVkZW50aWRcbiAgICAgICAgKX1gXG4gICAgICApO1xuICAgIH1cbiAgICBsZXQgbmV3Y2xhc3NlcyA9IFtdO1xuICAgIGZvciAobGV0IHNjbGF6eiBvZiBzdHVkZW50LmNsYXNzZXMpIHtcbiAgICAgIGZvciAobGV0IGNvZGUgb2YgY29kZXMpIHtcbiAgICAgICAgaWYgKHNjbGF6ei5jb2RlID09PSBjb2RlKSB7XG4gICAgICAgICAgbmV3Y2xhc3Nlcy5wdXNoKHNjbGF6eik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChsZXQgY29kZSBvZiBjb2Rlcykge1xuICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICBmb3IgKGxldCBuY2xhenogb2YgbmV3Y2xhc3Nlcykge1xuICAgICAgICBpZiAobmNsYXp6LmNvZGUgPT09IGNvZGUpIHtcbiAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgbmV3Y2xhc3Nlcy5wdXNoKGF3YWl0IHRoaXMuZmluZE9uZUNsYXNzKGNvZGUpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgc3R1ZGVudC5jbGFzc2VzID0gbmV3Y2xhc3NlcztcbiAgICBhd2FpdCBnZXRTdHVkZW50UmVwb3NpdG9yeSgpLnNhdmUoc3R1ZGVudCk7XG4gIH1cbn1cbiJdfQ==