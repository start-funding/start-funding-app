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

function newDateFromMonthDayYear(dateString) {
    return new Date(`${dateString.split("-")[2]}-${dateString.split("-")[1]}-${dateString.split("-")[0]}`);
}

function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }

module.exports.dateFormatter = dateFormatter;
module.exports.getRandomInt = getRandomInt;
module.exports.newDateFromMonthDayYear = newDateFromMonthDayYear;
module.exports.getBase64 = getBase64;