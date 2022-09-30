const { Timestamp } = require("firebase-admin/firestore");

function dateFormatter(date, separator) {
    let day = `${date.getDate()}`.length === 1 ? `0${date.getDate()}` : `${date.getDate()}`;
    let month = `${date.getMonth() + 1}`.length === 1 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
    let year = `${date.getFullYear()}`
    return `${month}${separator}${day}${separator}${year}`;
}

function timeStampFromInt(millies) {
    console.log(Timestamp.fromMillis(millies))
    return Timestamp.fromMillis(millies)
}

module.exports.dateFormatter = dateFormatter;
module.exports.timeStampFromInt = timeStampFromInt;
