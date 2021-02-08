const moment = require("moment")

function dateToDB(date) {
    const dateSQL = moment(date).format('DD/MM/YY')
    return dateSQL
}

function sevenDays(date) {
    const dateSQL = moment(date).add(7,'days').format('DD/MM/YY')
    return dateSQL
}

module.exports = {
    dateToDB,
    sevenDays
}