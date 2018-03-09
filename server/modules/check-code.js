const generateCode = require('./code-generation');

function checkCode(result){
    let newCode;
    for (let i = 0; i < result.rows.length; i++) {
        if (newCode == result.rows[i].join_code) {
            console.log('Code match');
            newCode = generateCode();
            checkCode(result);
        } else {
            console.log('Code is good');
        }
    }
}

module.exports = checkCode;