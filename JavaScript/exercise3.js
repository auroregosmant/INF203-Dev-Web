"use strict;"

//QUESTION 3a
class Student {
  constructor (lastName, firstName,id){
    this.lastName = lastName;
    this.firstName = firstName;
    this.id = id;
  }

  toString()
  {
    var string = 'student: '+ this.lastName + ', ' + this.firstName +', '+ this.id;
    return string;
  }
}

//var student = new Student("Dupond","John",1835);
//console.log(student.toString());

class ForeignStudent extends Student{
  constructor(lastName, firstName, id, nationality){
    super(lastName, firstName, id);
    this.nationality = nationality;
  }

  toString()
  {
    var string = 'student: '+ this.lastName + ', ' + this.firstName +', '+ this.id +', '+this.nationality;
    return string;
  }
}

//var foreign = new ForeignStudent("Dupond","John",1835,"American");
//console.log(foreign.toString());

exports.Student = Student;
exports.ForeignStudent = ForeignStudent;
