//@ts-nocheck
const getDb = require('../util/database').getDb;
const fs = require('fs');
const path = require('path');

const dataPath = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'persons.json'
);

const getPersonsFromFile = (cb) => {
  fs.readFile(dataPath, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Person {
  constructor(id, name, temp, sick, contact) {
    this.id = id;
    this.name = name;
    this.temp = temp;
    this.sick = sick;
    this.contact = contact;
    this.date = this.getDate();
  }

  getDate() {
    var currentdate = new Date();
    return `${currentdate.getDate()}/${
      currentdate.getMonth() + 1
    }/${currentdate.getFullYear()} @ ${currentdate.getHours()}:${currentdate.getMinutes()}`;
  }

  save() {
    getPersonsFromFile((persons) => {
      persons.push(this);
      fs.writeFile(dataPath, JSON.stringify(persons), (err) => {
        console.log(err);
      });
    });
    // const db = getDb();
    // db.collection('persons')
    //   .insertOne(this)
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  static getPersonFromFile(id) {
    var fileContents;
    try {
      fileContents = fs.readFileSync(dataPath, 'UTF8').toString();
    } catch (err) {
      console.log(err);
      fileContents = [];
    }

    let person;
    if (fileContents.length) {
      person = JSON.parse(fileContents).filter((p) => {
        return p.id === id;
      });
    } else {
      person = [];
    }

    return person;
  }
};
