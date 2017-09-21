const fs = require('fs');
const stream = require('stream');
const csv = require('csv-string');
const unzip = require('unzip-stream');


const FormatterClass = require('./Formatter')
const Formatter = new FormatterClass();

fs.createReadStream('./users.zip')
.pipe(unzip.Parse())
.on('entry', function (entry) {
  console.log('Processing file ...', entry.path)
  entry.pipe(stream.Transform({
    transform(chunk, enc, cb) {
      Formatter.processData(csv.parse(chunk.toString(), "||"))
    }
  }))
})
.on('close', function() {
  fs.appendFile('./users.json', Formatter.getJson(), function(err) {
    if (err) throw err;
    console.log('Successfully saved')
  })
})