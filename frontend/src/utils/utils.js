function dateFormatter(date, separator) {
    let day = `${date.getDate()}`.length === 1 ? `0${date.getDate()}` : `${date.getDate()}`;
    let month = `${date.getMonth() + 1}`.length === 1 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
    let year = `${date.getFullYear()}`
    return `${month}${separator}${day}${separator}${year}`;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}


module.exports.dateFormatter = dateFormatter;
module.exports.getRandomInt = getRandomInt;