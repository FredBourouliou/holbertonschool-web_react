/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!********************!*\
  !*** ./js/main.ts ***!
  \********************/

var Director = /** @class */ (function () {
    function Director() {
    }
    Director.prototype.workFromHome = function () {
        return "Working from home";
    };
    Director.prototype.getCoffeeBreak = function () {
        return "Getting a coffee break";
    };
    Director.prototype.workDirectorTasks = function () {
        return "Getting to director tasks";
    };
    return Director;
}());
var Teacher = /** @class */ (function () {
    function Teacher() {
    }
    Teacher.prototype.workFromHome = function () {
        return "Cannot work from home";
    };
    Teacher.prototype.getCoffeeBreak = function () {
        return "Cannot have a break";
    };
    Teacher.prototype.workTeacherTasks = function () {
        return "Getting to work";
    };
    return Teacher;
}());
function createEmployee(salary) {
    if (typeof salary === "number" && salary < 500) {
        return new Teacher();
    }
    return new Director();
}
// Task 6: Creating functions specific to employees
function isDirector(employee) {
    return employee instanceof Director;
}
function executeWork(employee) {
    if (isDirector(employee)) {
        return employee.workDirectorTasks();
    }
    else {
        return employee.workTeacherTasks();
    }
}
function teachClass(todayClass) {
    if (todayClass === "Math") {
        return "Teaching Math";
    }
    else {
        return "Teaching History";
    }
}
// Examples for testing
console.log(createEmployee(200)); // Teacher
console.log(createEmployee(1000)); // Director
console.log(createEmployee('$500')); // Director
console.log(executeWork(createEmployee(200))); // Getting to work
console.log(executeWork(createEmployee(1000))); // Getting to director tasks
console.log(teachClass('Math')); // Teaching Math
console.log(teachClass('History')); // Teaching History 

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQWFBO0lBQUE7SUFZQSxDQUFDO0lBWEMsK0JBQVksR0FBWjtRQUNFLE9BQU8sbUJBQW1CLENBQUM7SUFDN0IsQ0FBQztJQUVELGlDQUFjLEdBQWQ7UUFDRSxPQUFPLHdCQUF3QixDQUFDO0lBQ2xDLENBQUM7SUFFRCxvQ0FBaUIsR0FBakI7UUFDRSxPQUFPLDJCQUEyQixDQUFDO0lBQ3JDLENBQUM7SUFDSCxlQUFDO0FBQUQsQ0FBQztBQUVEO0lBQUE7SUFZQSxDQUFDO0lBWEMsOEJBQVksR0FBWjtRQUNFLE9BQU8sdUJBQXVCLENBQUM7SUFDakMsQ0FBQztJQUVELGdDQUFjLEdBQWQ7UUFDRSxPQUFPLHFCQUFxQixDQUFDO0lBQy9CLENBQUM7SUFFRCxrQ0FBZ0IsR0FBaEI7UUFDRSxPQUFPLGlCQUFpQixDQUFDO0lBQzNCLENBQUM7SUFDSCxjQUFDO0FBQUQsQ0FBQztBQUVELFNBQVMsY0FBYyxDQUFDLE1BQXVCO0lBQzdDLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLE1BQU0sR0FBRyxHQUFHLEVBQUU7UUFDOUMsT0FBTyxJQUFJLE9BQU8sRUFBRSxDQUFDO0tBQ3RCO0lBQ0QsT0FBTyxJQUFJLFFBQVEsRUFBRSxDQUFDO0FBQ3hCLENBQUM7QUFFRCxtREFBbUQ7QUFDbkQsU0FBUyxVQUFVLENBQUMsUUFBNEI7SUFDOUMsT0FBTyxRQUFRLFlBQVksUUFBUSxDQUFDO0FBQ3RDLENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxRQUE0QjtJQUMvQyxJQUFJLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUN4QixPQUFPLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0tBQ3JDO1NBQU07UUFDTCxPQUFPLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0tBQ3BDO0FBQ0gsQ0FBQztBQUtELFNBQVMsVUFBVSxDQUFDLFVBQW9CO0lBQ3RDLElBQUksVUFBVSxLQUFLLE1BQU0sRUFBRTtRQUN6QixPQUFPLGVBQWUsQ0FBQztLQUN4QjtTQUFNO1FBQ0wsT0FBTyxrQkFBa0IsQ0FBQztLQUMzQjtBQUNILENBQUM7QUFFRCx1QkFBdUI7QUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVU7QUFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVc7QUFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVc7QUFFaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQjtBQUNqRSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsNEJBQTRCO0FBRTVFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0I7QUFDakQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLG9CQUFvQiIsInNvdXJjZXMiOlsid2VicGFjazovL3R5cGVzY3JpcHRfZGVwZW5kZW5jaWVzLy4vanMvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUYXNrIDU6IEFkdmFuY2VkIHR5cGVzIFBhcnQgMVxuaW50ZXJmYWNlIERpcmVjdG9ySW50ZXJmYWNlIHtcbiAgd29ya0Zyb21Ib21lKCk6IHN0cmluZztcbiAgZ2V0Q29mZmVlQnJlYWsoKTogc3RyaW5nO1xuICB3b3JrRGlyZWN0b3JUYXNrcygpOiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBUZWFjaGVySW50ZXJmYWNlIHtcbiAgd29ya0Zyb21Ib21lKCk6IHN0cmluZztcbiAgZ2V0Q29mZmVlQnJlYWsoKTogc3RyaW5nO1xuICB3b3JrVGVhY2hlclRhc2tzKCk6IHN0cmluZztcbn1cblxuY2xhc3MgRGlyZWN0b3IgaW1wbGVtZW50cyBEaXJlY3RvckludGVyZmFjZSB7XG4gIHdvcmtGcm9tSG9tZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBcIldvcmtpbmcgZnJvbSBob21lXCI7XG4gIH1cblxuICBnZXRDb2ZmZWVCcmVhaygpOiBzdHJpbmcge1xuICAgIHJldHVybiBcIkdldHRpbmcgYSBjb2ZmZWUgYnJlYWtcIjtcbiAgfVxuXG4gIHdvcmtEaXJlY3RvclRhc2tzKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFwiR2V0dGluZyB0byBkaXJlY3RvciB0YXNrc1wiO1xuICB9XG59XG5cbmNsYXNzIFRlYWNoZXIgaW1wbGVtZW50cyBUZWFjaGVySW50ZXJmYWNlIHtcbiAgd29ya0Zyb21Ib21lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFwiQ2Fubm90IHdvcmsgZnJvbSBob21lXCI7XG4gIH1cblxuICBnZXRDb2ZmZWVCcmVhaygpOiBzdHJpbmcge1xuICAgIHJldHVybiBcIkNhbm5vdCBoYXZlIGEgYnJlYWtcIjtcbiAgfVxuXG4gIHdvcmtUZWFjaGVyVGFza3MoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gXCJHZXR0aW5nIHRvIHdvcmtcIjtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVFbXBsb3llZShzYWxhcnk6IG51bWJlciB8IHN0cmluZyk6IERpcmVjdG9yIHwgVGVhY2hlciB7XG4gIGlmICh0eXBlb2Ygc2FsYXJ5ID09PSBcIm51bWJlclwiICYmIHNhbGFyeSA8IDUwMCkge1xuICAgIHJldHVybiBuZXcgVGVhY2hlcigpO1xuICB9XG4gIHJldHVybiBuZXcgRGlyZWN0b3IoKTtcbn1cblxuLy8gVGFzayA2OiBDcmVhdGluZyBmdW5jdGlvbnMgc3BlY2lmaWMgdG8gZW1wbG95ZWVzXG5mdW5jdGlvbiBpc0RpcmVjdG9yKGVtcGxveWVlOiBEaXJlY3RvciB8IFRlYWNoZXIpOiBlbXBsb3llZSBpcyBEaXJlY3RvciB7XG4gIHJldHVybiBlbXBsb3llZSBpbnN0YW5jZW9mIERpcmVjdG9yO1xufVxuXG5mdW5jdGlvbiBleGVjdXRlV29yayhlbXBsb3llZTogRGlyZWN0b3IgfCBUZWFjaGVyKTogc3RyaW5nIHtcbiAgaWYgKGlzRGlyZWN0b3IoZW1wbG95ZWUpKSB7XG4gICAgcmV0dXJuIGVtcGxveWVlLndvcmtEaXJlY3RvclRhc2tzKCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGVtcGxveWVlLndvcmtUZWFjaGVyVGFza3MoKTtcbiAgfVxufVxuXG4vLyBUYXNrIDc6IFN0cmluZyBsaXRlcmFsIHR5cGVzXG50eXBlIFN1YmplY3RzID0gXCJNYXRoXCIgfCBcIkhpc3RvcnlcIjtcblxuZnVuY3Rpb24gdGVhY2hDbGFzcyh0b2RheUNsYXNzOiBTdWJqZWN0cyk6IHN0cmluZyB7XG4gIGlmICh0b2RheUNsYXNzID09PSBcIk1hdGhcIikge1xuICAgIHJldHVybiBcIlRlYWNoaW5nIE1hdGhcIjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gXCJUZWFjaGluZyBIaXN0b3J5XCI7XG4gIH1cbn1cblxuLy8gRXhhbXBsZXMgZm9yIHRlc3RpbmdcbmNvbnNvbGUubG9nKGNyZWF0ZUVtcGxveWVlKDIwMCkpOyAvLyBUZWFjaGVyXG5jb25zb2xlLmxvZyhjcmVhdGVFbXBsb3llZSgxMDAwKSk7IC8vIERpcmVjdG9yXG5jb25zb2xlLmxvZyhjcmVhdGVFbXBsb3llZSgnJDUwMCcpKTsgLy8gRGlyZWN0b3JcblxuY29uc29sZS5sb2coZXhlY3V0ZVdvcmsoY3JlYXRlRW1wbG95ZWUoMjAwKSkpOyAvLyBHZXR0aW5nIHRvIHdvcmtcbmNvbnNvbGUubG9nKGV4ZWN1dGVXb3JrKGNyZWF0ZUVtcGxveWVlKDEwMDApKSk7IC8vIEdldHRpbmcgdG8gZGlyZWN0b3IgdGFza3NcblxuY29uc29sZS5sb2codGVhY2hDbGFzcygnTWF0aCcpKTsgLy8gVGVhY2hpbmcgTWF0aFxuY29uc29sZS5sb2codGVhY2hDbGFzcygnSGlzdG9yeScpKTsgLy8gVGVhY2hpbmcgSGlzdG9yeSAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=