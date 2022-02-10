const fs = require('fs');



module.exports = (object,key,value) => {
    object[key] = value;
    let data = JSON.stringify(object, null, 2);
    fs.writeFile('./src/data/teamsData.json', data, (err) => {
        if (err) console.log(err);
        console.log('Data written to file');
    });

};
