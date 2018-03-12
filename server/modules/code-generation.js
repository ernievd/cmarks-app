let badWordList = require('badwords-list').array;

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

generateCode();

module.exports = generateCode;