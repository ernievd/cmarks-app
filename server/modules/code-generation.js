function generateCode() {
    let text = '';
    let options = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < 4; i++) {
        text += options.charAt(Math.floor(Math.random() * options.length));
    }
    return text;
}

module.exports = generateCode;