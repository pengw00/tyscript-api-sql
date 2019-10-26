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
const Student_1 = require("./Student");
let OfferedClass = class OfferedClass {
};
__decorate([
    typeorm_1.PrimaryColumn({
        length: 10
    }),
    __metadata("design:type", String)
], OfferedClass.prototype, "code", void 0);
__decorate([
    typeorm_1.Column({
        length: 100
    }),
    __metadata("design:type", String)
], OfferedClass.prototype, "name", void 0);
__decorate([
    typeorm_1.Column("int"),
    __metadata("design:type", Number)
], OfferedClass.prototype, "hours", void 0);
__decorate([
    typeorm_1.ManyToMany(type => Student_1.Student, student => student.classes),
    __metadata("design:type", Array)
], OfferedClass.prototype, "students", void 0);
OfferedClass = __decorate([
    typeorm_1.Entity()
], OfferedClass);
exports.OfferedClass = OfferedClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2ZmZXJlZENsYXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2VudGl0aWVzL09mZmVyZWRDbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHFDQUErRTtBQUMvRSx1Q0FBb0M7QUFFcEMsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtDQVl4QixDQUFBO0FBUkM7SUFIQyx1QkFBYSxDQUFDO1FBQ2IsTUFBTSxFQUFFLEVBQUU7S0FDWCxDQUFDOzswQ0FDVztBQUliO0lBSEMsZ0JBQU0sQ0FBQztRQUNOLE1BQU0sRUFBRSxHQUFHO0tBQ1osQ0FBQzs7MENBQ1c7QUFDRTtJQUFkLGdCQUFNLENBQUMsS0FBSyxDQUFDOzsyQ0FBZTtBQUU3QjtJQURDLG9CQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxpQkFBTyxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQzs7OENBQ3BDO0FBWFQsWUFBWTtJQUR4QixnQkFBTSxFQUFFO0dBQ0ksWUFBWSxDQVl4QjtBQVpZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5LCBDb2x1bW4sIFByaW1hcnlDb2x1bW4sIE9uZVRvTWFueSwgTWFueVRvTWFueSB9IGZyb20gXCJ0eXBlb3JtXCI7XG5pbXBvcnQgeyBTdHVkZW50IH0gZnJvbSBcIi4vU3R1ZGVudFwiO1xuQEVudGl0eSgpXG5leHBvcnQgY2xhc3MgT2ZmZXJlZENsYXNzIHtcbiAgQFByaW1hcnlDb2x1bW4oe1xuICAgIGxlbmd0aDogMTBcbiAgfSlcbiAgY29kZTogc3RyaW5nO1xuICBAQ29sdW1uKHtcbiAgICBsZW5ndGg6IDEwMFxuICB9KVxuICBuYW1lOiBzdHJpbmc7XG4gIEBDb2x1bW4oXCJpbnRcIikgaG91cnM6IG51bWJlcjtcbiAgQE1hbnlUb01hbnkodHlwZSA9PiBTdHVkZW50LCBzdHVkZW50ID0+IHN0dWRlbnQuY2xhc3NlcylcbiAgc3R1ZGVudHM6IFN0dWRlbnRbXTtcbn1cbiJdfQ==