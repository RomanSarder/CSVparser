const stream = require('stream');
const moment = require('moment');

class Formatter {
  constructor() {
    this.data = []
  }

  processData(output) {
    /* Transforms arrays of values to objects and stores it */
    let slicedOutput = output.slice(1);
    let usersObjectsArr = slicedOutput.map((item) => {
      return {
        name: item[4],
        phone: item[5],
        person: {
          firstName: item[0],
          lastName: item[1]
        },
        amount: item[7],
        date: moment(item[item[8]]).format('YYYY-MM-DD'),
        costCenterNum: item[6].split("").slice(3).join('')
      }
    })
    this.data.push(usersObjectsArr);
    return usersObjectsArr;
  }

  getJson() {
    let result = this.data.reduce((a, b) => {
      return a.concat(b)
    })
    return JSON.stringify(result);
  }
}

module.exports = Formatter
