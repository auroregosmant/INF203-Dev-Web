"use strict;"

let ex3 = require('./exercise3');
let Student=ex3.Student;
let ForeignStudent = ex3.ForeignStudent;

//QUESTION 4

let fs = require('fs');

class Promotion {

  constructor() {
    this.array = [];
  }

  add(student) {
    this.array.push(student);
  }

  size() {
    return this.array.length;
  }

  get(i) {
    return this.array[i];
  }

  print() {
    var s = "";
    for (var i in this.array)
      s += this.array[i].print() + '\n';
    return s;
  }

  write() {
    return JSON.stringify(this.array);
  }

  read(str) {
    var p = JSON.parse(str);
    this.array = [];
    for (var i in p) {
      var student = p[i];
      if (student.nationality == undefined)
        student = Object.assign(new Student(), student);
      else
        student = Object.assign(new ForeignStudent(), student);
      this.array.push(student);
    }
  }

  saveToFile(fileName) {
    fs.writeFile(fileName, this.write(), function (err, data) {
      if (err) console.log(err);
      else console.log("Correctly written !");
    });
  }

  readFromFile(fileName) {
    var self = this;
    fs.readFile(fileName, function (err, buf) {
      if (err) console.log(err);
      else self.read(buf.toString());
    });
  }
}

exports.Promotion = Promotion;
