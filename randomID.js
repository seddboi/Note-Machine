let ID = function () {
    return Math.random().toString(36).substr(2,9);
}

console.log(ID());
module.exports = ID;