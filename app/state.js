const $ = require('jquery');

const initial_state = {
    "problem": 'boussinesq',
    "view": {
        x: 0,
        y: 0,
        z:{
            min:0,
            max:100
        }
    },
}

function setState(state){
    
}

module.exports = {
    initial_state,
    setState
}