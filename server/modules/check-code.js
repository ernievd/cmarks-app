let generateCode = require('./code-generation');

function checkCode(result) {
    let newCode = generateCode();
    let count = 0;
    console.log(newCode);
    
    for (let i = 0; i < result.rows.length; i++) {
        if (newCode == result.rows[i].join_code) {
            console.log('Code match');
            count++;
        } else {
            console.log('Code is good');
        }
    }
    if (count >= 1) {
        checkCode(result);
    }
    return newCode;
}

module.exports = checkCode;