const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

require('./middle_wares')(app);

app.get('/users', (req, res) => {



  function explorer(dir) {
    let arr = [];

    function alaki(sheft) {
      let files = fs.readdirSync(sheft);

      for (let item of files) {

        let address = path.join(sheft, item);
        let obj = fs.statSync(address);

        let status = {
          name: item,
          size: obj.size,
          path: address
        };

        if (obj.isDirectory()) {
          status.fileType = 'Folder';
          arr.push(status);
          alaki(address);
        } else {
          status.fileType = 'File';
          arr.push(status);
        }
      }
    }
    alaki(dir);
    return arr;
  }
  res.send(explorer(__dirname));
});

require('./routes')(app);

require('./error_handler')(app);



module.exports = app;
