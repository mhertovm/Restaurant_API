const fs = require('fs');
function logger(api, status, error){
    console.log(error.message)
    try {
        fs.writeFileSync('./api/logger/errors.log', `ERROR API request: ${api}, status: ${status}, error message: ${error.message}` + '\n', {flag: "a+"});
    } catch (err) {
        console.error(err);
    };
};
module.exports = logger
