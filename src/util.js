const timestampConvert = (timestamp) => {
    const date = new Date(timestamp);
    return date.getHours() + ":" + date.getMinutes() + ", " + date.toDateString();
}

const doesAHaveSetB = (A, B) => {
    if (A.some(a => {
        if (B.has(a)) {
            return true;
        }
    })) {
        return true;
    }
    return false;
}

module.exports = { timestampConvert, doesAHaveSetB }