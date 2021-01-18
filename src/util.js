const timestampConvert = (timestamp) => {
    const date = new Date(timestamp);
    return date.getHours() + ":" + date.getMinutes() + ", " + date.toDateString();
}

module.exports = { timestampConvert }