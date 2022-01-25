const $ = require('jquery');
const state = require('./state');
const getState = require('./getState')

function xlimChanged(value){
    let model = getState();
    model.view.x = Number(value);
    state.setState(model);
}

function ylimChanged(value){
    let model = getState();
    model.view.y = Number(value);
    state.setState(model);
}

function problemNameChanged(value){
    let model = getState();
    model.problem = String(value).toLowerCase();
    console.log(model.problem);
    state.setState(model);
}

function assignActions() {
    $('#xdist').on('change', (e) => {
        xlimChanged(e.target.value);
    });
    $('#ydist').on('change', (e) => {
        ylimChanged(e.target.value);
    });
    $('#problem_name').on('change', (e) => {
        problemNameChanged(e.target.value);
    });
}

module.exports = {assignActions};