const moment = require("moment")

function dateToDB(date) {
    const dateSQL = moment(date).format('YYYY/MM/DD')
    return dateSQL
}

function sevenDays(date) {
    const dateSQL = moment(date).add(7,'weeks').format('YYYY/MM/DD')
    return dateSQL
}

module.exports = {
    dateToDB,
    sevenDays
}