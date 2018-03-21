let badWordList = require('badwords-list').array;

/**
 * The @function generateCode creates a random 4 character string
 * The code is checked against the npm @module badwords-list and if there is a match a new code is generated
 */
function generateCode() {
    let count = 0;
    let text = '';
    let options = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < 4; i++) {
        text += options.charAt(Math.floor(Math.random() * options.length));
    }
    for (let i = 0; i < badWordList.length; i++) {
        if (badWordList[i].toUpperCase() === text) {
            count++;
        }
    }
    if (count > 0) {
        generateCode();
    }
    return text;
}

module.exports = generateCode;