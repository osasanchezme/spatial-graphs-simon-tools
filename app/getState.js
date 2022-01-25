const config = require('../config.json');

function getState() {
    return JSON.parse(JSON.stringify(window[config.app_name].state));
}

module.exports = getState;