let generateCode = require('./code-generation');

/** 
 * Uses the @module code-generation.js to create a new 4 character code
 * the @function checkCode checks the code with the database to make sure there is no matching code
 * otherwise the function runs from the beginning again
 */
function checkCode(result) {
    let newCode = generateCode();
    let count = 0;
    console.log(newCode);

    for (let i = 0; i < result.rows.length; i++) {
        if (newCode == result.rows[i].join_code) {
            count++;
        }
    }
    if (count >= 1) {
        checkCode(result);
    }
    return newCode;
}

module.exports = checkCode;